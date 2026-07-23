// Guest storage utility — mimics Supabase round_completions and progress tables using localStorage
// Used when a user is not logged in, so they can still study and track progress locally.

const ROUND_COMPLETIONS_KEY = "squawk_guest_round_completions"
const PROGRESS_KEY = "squawk_guest_progress"

export interface GuestRoundCompletion {
  subject: string
  unit_id: number
  lesson_id: number
  round_id: number
  score: number
  total: number
  attempted_at: string
}

export interface GuestProgress {
  question_id: string
  subject: string
  correct: boolean
  answered_at: string
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function getGuestRoundCompletions(): GuestRoundCompletion[] {
  if (typeof window === "undefined") return []
  return safeParse<GuestRoundCompletion[]>(localStorage.getItem(ROUND_COMPLETIONS_KEY), [])
}

export function saveGuestRoundCompletion(entry: Omit<GuestRoundCompletion, "attempted_at">) {
  if (typeof window === "undefined") return
  const existing = getGuestRoundCompletions()
  // Remove any previous attempt for the same unit/lesson/round, then add the new one (like an upsert)
  const filtered = existing.filter(
    r => !(r.subject === entry.subject && r.unit_id === entry.unit_id && r.lesson_id === entry.lesson_id && r.round_id === entry.round_id)
  )
  filtered.push({ ...entry, attempted_at: new Date().toISOString() })
  localStorage.setItem(ROUND_COMPLETIONS_KEY, JSON.stringify(filtered))
}

export function getGuestProgress(): GuestProgress[] {
  if (typeof window === "undefined") return []
  return safeParse<GuestProgress[]>(localStorage.getItem(PROGRESS_KEY), [])
}

export function saveGuestProgress(entry: Omit<GuestProgress, "answered_at">) {
  if (typeof window === "undefined") return
  const existing = getGuestProgress()
  existing.push({ ...entry, answered_at: new Date().toISOString() })
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(existing))
}

export function clearGuestData() {
  if (typeof window === "undefined") return
  localStorage.removeItem(ROUND_COMPLETIONS_KEY)
  localStorage.removeItem(PROGRESS_KEY)
}