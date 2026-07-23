"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "../supabase"
import Loading from "./components/Loading"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getGuestRoundCompletions, getGuestProgress } from "./lib/guestStorage"

const allSubjects = [
  { id: "air-law", name: "Air Law", num: "01", available: true },
  { id: "agk", name: "Aircraft General Knowledge", num: "02", available: true },
  { id: "flight-performance", name: "Flight Performance & Planning", num: "03", available: true },
  { id: "human-performance", name: "Human Performance", num: "04", available: true },
  { id: "meteorology", name: "Meteorology", num: "05", available: true },
  { id: "navigation", name: "Navigation", num: "06", available: true },
  { id: "operational-procedures", name: "Operational Procedures", num: "07", available: true },
  { id: "principles-of-flight", name: "Principles of Flight", num: "08", available: true },
  { id: "communications", name: "Communications", num: "09", available: true },
]

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [questionsThisWeek, setQuestionsThisWeek] = useState(0)
  const [flashcardsThisWeek, setFlashcardsThisWeek] = useState(0)
  const [activeSubjects, setActiveSubjects] = useState<string[]>([])
  const [subjectProgress, setSubjectProgress] = useState<Record<string, number>>({})
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null)
  const router = useRouter()
  const [showLanding, setShowLanding] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        setUserId(session.user.id)
        try {
          const { data: prefs } = await supabase
            .from("user_preferences")
            .select("display_name")
            .eq("id", session.user.id)
            .maybeSingle()
          setDisplayName(prefs?.display_name || null)
        } catch {}

        const weekAgo = new Date()
        weekAgo.setUTCDate(weekAgo.getUTCDate() - 7)
        weekAgo.setUTCHours(0, 0, 0, 0)

        try {
          const { data: progress } = await supabase
            .from("progress")
            .select("subject, answered_at, question_id")
            .eq("user_id", session.user.id)
            .gte("answered_at", weekAgo.toISOString())

          if (progress) {
            const flashcards = progress.filter((p: any) => p.question_id?.startsWith("flashcard-"))
            const questions = progress.filter((p: any) => !p.question_id?.startsWith("flashcard-"))
            setQuestionsThisWeek(questions.length)
            setFlashcardsThisWeek(flashcards.length)
            const subjects = [...new Set(progress.map((p: any) => p.subject))]
            setActiveSubjects(subjects)
          }
        } catch {}

        try {
          const { data: rounds } = await supabase
            .from("round_completions")
            .select("subject, lesson_id")
            .eq("user_id", session.user.id)

          if (rounds) {
            const lessonMap: Record<string, Set<number>> = {}
            rounds.forEach((r: any) => {
              if (!lessonMap[r.subject]) lessonMap[r.subject] = new Set()
              lessonMap[r.subject].add(r.lesson_id)
            })
            const pct: Record<string, number> = {}
            Object.entries(lessonMap).forEach(([subject, lessons]) => {
              pct[subject] = Math.round((lessons.size / 15) * 100)
            })
            setSubjectProgress(pct)
          }
        } catch {}
      } else {
        // Guest — read progress from localStorage instead
        const weekAgo = new Date()
        weekAgo.setUTCDate(weekAgo.getUTCDate() - 7)

        const guestProgress = getGuestProgress().filter(p => new Date(p.answered_at) >= weekAgo)
        const flashcards = guestProgress.filter(p => p.question_id?.startsWith("flashcard-"))
        const questions = guestProgress.filter(p => !p.question_id?.startsWith("flashcard-"))
        setQuestionsThisWeek(questions.length)
        setFlashcardsThisWeek(flashcards.length)

        const guestRounds = getGuestRoundCompletions()
        const lessonMap: Record<string, Set<number>> = {}
        guestRounds.forEach(r => {
          if (!lessonMap[r.subject]) lessonMap[r.subject] = new Set()
          lessonMap[r.subject].add(r.lesson_id)
        })
        const pct: Record<string, number> = {}
        Object.entries(lessonMap).forEach(([subject, lessons]) => {
          pct[subject] = Math.round((lessons.size / 15) * 100)
        })
        setSubjectProgress(pct)
      }
      setLoading(false)
    }) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("t") : ""])

  useEffect(() => {
  if (!loading && !userId) {
    const seen = sessionStorage.getItem("squawk_seen_landing")
    if (!seen) {
      setShowLanding(true)
      sessionStorage.setItem("squawk_seen_landing", "true")
    }
  }
}, [loading, userId])

  function handleCardClick(subjectId: string, available: boolean) {
    if (!available) return
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId)
  }

  if (loading) {
  return <Loading />
}

if (!userId && showLanding) {
  return <LandingPage onContinue={() => setShowLanding(false)} />
}

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {userId && (
          <div style={{
            background: "#0f172a",
            borderRadius: "16px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "2rem",
          }}>
            <div style={{
              width: "44px", height: "44px", background: "#1e293b", borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round">
                <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.9.6-.6 1.1l1.4 2.3c.3.5.9.7 1.5.5L8 9l-2 3H4l-1 1 3 2 2 3 1-1v-2l3-2-.5 3.5c-.1.6.1 1.2.6 1.5l2.3 1.4c.5.3 1 0 1.1-.6z"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                Study altitude {displayName ? `· ${displayName}` : ""}
              </div>
              <div style={{ display: "flex", gap: "24px" }}>
                <div>
                  <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 600 }}>Active subjects</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#f59e0b", lineHeight: "1.1" }}>{Object.keys(subjectProgress).length}</div>
                </div>
                <div style={{ width: "1px", background: "#1e293b" }} />
                <div>
                  <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 600 }}>Questions this week</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#f1f5f9", lineHeight: "1.1" }}>{questionsThisWeek}</div>
                </div>
                <div style={{ width: "1px", background: "#1e293b" }} />
                <div>
                  <div style={{ fontSize: "10px", color: "#64748b", fontWeight: 600 }}>Flashcards this week</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#f1f5f9", lineHeight: "1.1" }}>{flashcardsThisWeek}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginBottom: "0.5rem"}}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
            Choose your subject
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text2)" }}>
            9 subjects · All EASA PPL topics
          </p>
        </div>
        {/* Mock exam banner */}
        <div
          onClick={() => router.push("/mock-exam")}
          style={{ maxWidth: "900px", margin: "24px auto 24px", cursor: "pointer" }}
        >
          <div style={{ background: "var(--navy)", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "4px" }}>Mock Exam</div>
              <div style={{ color: "white", fontWeight: 700, fontSize: "18px", marginBottom: "2px" }}>Ready to test yourself?</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>120 questions · 9 subjects · EASA format</div>
            </div>
            <div style={{ color: "#f59e0b", fontSize: "28px" }}>→</div>
          </div>
        </div>

        <div style={{
          height: "10px", borderRadius: "6px", margin: "1.5rem 0",
          background: "linear-gradient(90deg, #f59e0b 0px, #f59e0b 20px, #0f172a 20px, #0f172a 40px, #f59e0b 40px, #f59e0b 60px, #0f172a 60px, #0f172a 80px, #f59e0b 80px, #f59e0b 100px, #0f172a 100px, #0f172a 120px, #f59e0b 120px, #f59e0b 140px, #0f172a 140px, #0f172a calc(100% - 40px), #f59e0b calc(100% - 40px), #f59e0b calc(100% - 20px), #0f172a calc(100% - 20px), #0f172a 100%)",
        }} />

        <motion.div
          layout
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}
        >
          {allSubjects.map(subject => {
            const progress = subjectProgress[subject.id] || 0
            const started = progress > 0
            const available = subject.available
            const isExpanded = expandedSubject === subject.id

            return (
              <motion.div
                key={subject.id}
                layout
                animate={{
                  opacity: expandedSubject && !isExpanded ? 0.4 : 1,
                  scale: expandedSubject && !isExpanded ? 0.97 : 1,
                }}
                transition={{ duration: 0.2 }}
                onClick={() => handleCardClick(subject.id, available)}
                style={{
                  background: isExpanded ? "#fffbeb" : started ? "#fffbeb" : "var(--surface)",
                  border: isExpanded ? "2px solid #f59e0b" : started ? "2px solid #f59e0b" : available ? "1.5px solid var(--border)" : "1.5px solid var(--border)",
                  borderRadius: "14px",
                  padding: "18px",
                  cursor: available ? "pointer" : "default",
                  opacity: available ? 1 : 0.45,
                  gridColumn: isExpanded ? "span 2" : "span 1",
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: started ? 700 : 500, color: "var(--text3)", letterSpacing: "0.08em", marginBottom: "6px" }}>
                  {subject.num}
                </div>
                <div style={{ fontSize: "16px", fontWeight: started ? 800 : 500, color: "var(--text)", marginBottom: "4px" }}>
                  {subject.name}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text2)", marginBottom: available ? "12px" : "0" }}>
                  {!available ? "Coming soon" : started ? `${progress}% complete` : "0 of 5 lessons"}
                </div>
                {available && (
                  <div style={{ height: "3px", background: "var(--border)", borderRadius: "2px", marginBottom: isExpanded ? "16px" : "0" }}>
                    <div style={{ height: "100%", width: `${progress}%`, background: "#f59e0b", borderRadius: "2px" }} />
                  </div>
                )}

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={e => { e.stopPropagation(); window.location.href = `/subject/${subject.id}` }}
                          style={actionBtn("#0f172a", "#f59e0b")}>
                          Study
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); window.location.href = `/flashcards/${subject.id}` }}
                          style={actionBtn("var(--surface)", "var(--text)")}>
                          Flashcards
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); window.location.href = `/synopsis/${subject.id}` }}
                          style={actionBtn("var(--surface)", "var(--text)")}>
                          Read
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </div>
  )
}

function actionBtn(bg: string, color: string): React.CSSProperties {
  return {
    flex: 1,
    padding: "0.6rem 0",
    background: bg,
    color: color,
    border: "1px solid var(--border)",
    borderRadius: "8px",
    fontSize: "0.8rem",
    fontWeight: 700,
    cursor: "pointer",
    textAlign: "center" as const,
  }
}

function LandingPage({ onContinue }: { onContinue: () => void }) {
  useEffect(() => {
    const steps = [
      { rotation: -50, title: "Choose your subject", desc: "Pick from all 9 EASA PPL subjects. Each is broken into 5 units with individual lessons — study at your own pace.", amber: [] as number[] },
      { rotation: 0, title: "Work through lessons", desc: "Each lesson has multiple question rounds — multiple choice, true/false, fill in the blank. Progress tracked automatically as you go.", amber: [1] },
      { rotation: 50, title: "Take the mock exam", desc: "When you feel ready, sit the full 120-question EASA-format mock exam. Each subject is timed. You need 75% to pass — just like the real thing.", amber: [1, 2] },
    ]
    let current = 0

    function update() {
      const step = steps[current]
      const ptr = document.getElementById("hw-pointer")
      const title = document.getElementById("how-step-title")
      const desc = document.getElementById("how-step-desc")
      const textWrap = document.getElementById("how-step-text")
      const knob = document.getElementById("hw-knob")
      if (!ptr || !title || !desc || !textWrap || !knob) return

      ptr.style.transform = `rotate(${step.rotation}deg)`

      textWrap.style.opacity = "0"
      setTimeout(() => {
        title.textContent = step.title
        desc.textContent = step.desc
        textWrap.style.opacity = "1"
      }, 200)

      ;[1, 2, 3].forEach(n => {
        const tick = document.getElementById(`hw-tick${n}`)
        const num = document.getElementById(`hw-num${n}`)
        const lit = step.amber.includes(n)
        if (tick) { tick.setAttribute("stroke", lit ? "#f59e0b" : "#94a3b8"); tick.setAttribute("stroke-width", lit ? "2.2" : "1.8") }
        if (num) num.setAttribute("fill", lit ? "#f59e0b" : "#94a3b8")
      })

      knob.setAttribute("stroke", current > 0 ? "#f59e0b" : "#aab4be")

      ;[0, 1, 2].forEach(i => {
        const dot = document.getElementById(`hw-dot-${i}`)
        if (dot) {
          dot.style.background = i === current ? "#f59e0b" : "#1e293b"
          dot.style.borderColor = i === current ? "#f59e0b" : "#334155"
        }
      })
    }

    ;(window as any).howDialAdvance = () => { current = (current + 1) % 3; update() }
    ;(window as any).howDialSetStep = (i: number) => { current = i; update() }
  }, [])
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a" }}>

      {/* Hero */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
        }}
      >
        {/* Dark overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15, 23, 42, 0.75)",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, padding: "80px 32px 72px", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ background: "#10b981", color: "white", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.05em" }}>100% FREE</span>
          </div>
          <h1 style={{ fontSize: "48px", fontWeight: 800, color: "white", lineHeight: 1.15, marginBottom: "16px", letterSpacing: "-0.02em" }}>
            Pass your EASA PPL<br /><span style={{ color: "#f59e0b" }}>theory exams.</span>
          </h1>
          <p style={{ fontSize: "17px", color: "#94a3b8", maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.6 }}>
            The smarter way to study for your Private Pilot Licence. 9 subjects, thousands of questions, built around how pilots actually learn.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/login" style={{ background: "#f59e0b", color: "#0f172a", border: "none", borderRadius: "10px", padding: "14px 32px", fontSize: "15px", fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>Sign up free →</a>
            <a href="/login" style={{ background: "transparent", color: "#94a3b8", border: "1px solid #334155", borderRadius: "10px", padding: "14px 32px", fontSize: "15px", fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>Log in</a>
          </div>
          <button onClick={onContinue} style={{ background: "none", border: "none", color: "#64748b", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginTop: "16px", textDecoration: "underline" }}>
            Continue without an account →
          </button>
          <p style={{ color: "#475569", fontSize: "12px", marginTop: "20px" }}>No credit card · No download · Works on any device</p>

          {/* Stats strip */}
          <div style={{ display: "flex", justifyContent: "center", gap: "48px", marginTop: "56px", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.1)", flexWrap: "wrap" }}>
            {[
              { value: "9", label: "EASA subjects" },
              { value: "2,000+", label: "Unique questions" },
              { value: "120", label: "Mock exam questions" },
              { value: "£0", label: "Forever free" },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "30px", fontWeight: 800, color: stat.value === "£0" ? "white" : "#f59e0b" }}>{stat.value}</div>
                <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600, marginTop: "2px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: "var(--bg)", padding: "64px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.05em" }}>FEATURES</span>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text)", marginTop: "12px", letterSpacing: "-0.01em" }}>Studying Simplified</h2>
            <p style={{ color: "var(--text2)", marginTop: "8px", fontSize: "15px" }}>Built for actual learning, with multiple options to choose</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {[
              { emoji: "🎯", title: "Structured study", desc: "5 units per subject, broken into lessons and rounds. Progress tracked automatically as you go.", live: true },
              { emoji: "🃏", title: "Flashcard mode", desc: "Flashcards for every subject. Mark what you know, revisit what you don't. Filter by unit.", live: true },
              { emoji: "📋", title: "Mock exam", desc: "Full 120-question EASA-format mock exam with per-subject timing and 75% pass mark tracking.", live: true },
              { emoji: "📒", title: "Virtual logbook", desc: "Log every flight — aircraft, route, PIC time, dual, landings. Track your total hours as you build experience.", live: true },
              { emoji: "📻", title: "Phonetic alphabet trainer", desc: "Interactive drills for the ICAO phonetic alphabet. Essential for radio communication.", live: false },
              { emoji: "🗺️", title: "Aeronautical charts", desc: "Interactive chart reading and airspace explanation. Learn to read VFR charts like a real pilot.", live: false },
            ].map(feature => (
              <div key={feature.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "24px", position: "relative", opacity: feature.live ? 1 : 0.7 }}>
                {!feature.live && (
                  <div style={{ position: "absolute", top: "14px", right: "14px", background: "var(--surface2)", color: "var(--text2)", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", letterSpacing: "0.04em" }}>COMING SOON</div>
                )}
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: feature.live ? "rgba(245,158,11,0.12)" : "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", fontSize: "22px" }}>{feature.emoji}</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: feature.live ? "var(--text)" : "var(--text2)", marginBottom: "6px" }}>{feature.title}</div>
                <div style={{ fontSize: "13px", color: "var(--text2)", lineHeight: 1.6 }}>{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div style={{ background: "var(--surface)", padding: "64px 32px", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.05em" }}>ALL 9 SUBJECTS</span>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text)", marginTop: "12px", marginBottom: "28px", letterSpacing: "-0.01em" }}>Complete EASA PPL coverage</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {[
              "Air Law",
              "Aircraft General Knowledge",
              "Flight Performance & Planning",
              "Human Performance",
              "Meteorology",
              "Navigation",
              "Operational Procedures",
              "Principles of Flight",
              "Communications",
            ].map(subject => (
              <span key={subject} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", fontWeight: 500, color: "var(--text2)" }}>{subject}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Free CTA */}
      <div style={{ background: "#0f172a", padding: "80px 32px", textAlign: "center" }}>
        <span style={{ background: "#10b981", color: "white", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.05em" }}>ALWAYS FREE</span>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "white", marginTop: "20px", marginBottom: "12px", letterSpacing: "-0.01em" }}>No paywalls. No subscriptions.<br />No catch.</h2>
        <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "420px", margin: "0 auto 32px", lineHeight: 1.6 }}>
          Squawk is free because we know that getting a PPL is already expensive enough, and passing your PPL theory shouldn't depend on your budget.
        </p>
        <a href="/login" style={{ background: "#f59e0b", color: "#0f172a", border: "none", borderRadius: "10px", padding: "16px 36px", fontSize: "16px", fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>Create your free account →</a>
        <p style={{ color: "#475569", fontSize: "12px", marginTop: "20px" }}>Join hundreds of student pilots studying smarter</p>
        <p style={{ color: "#334155", fontSize: "12px", marginTop: "12px" }}>
          <a href="/privacy" style={{ color: "#475569", textDecoration: "none" }}>Privacy Policy</a>
          {" · "}
          <a href="mailto:holmemila@gmail.com" style={{ color: "#475569", textDecoration: "none" }}>Contact</a>
        </p>
      </div>

      {/* How it works */}
      <div style={{ background: "var(--bg)", padding: "72px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.05em" }}>HOW IT WORKS</span>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text)", marginTop: "12px", marginBottom: "8px", letterSpacing: "-0.01em" }}>Three steps to your theory pass</h2>
          <p style={{ color: "var(--text2)", fontSize: "14px", marginBottom: "40px" }}>Click the dial to advance</p>

          <div id="how-step-text" style={{ minHeight: "80px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "32px", transition: "opacity 0.3s ease" }}>
            <div id="how-step-title" style={{ fontSize: "20px", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>Choose your subject</div>
            <div id="how-step-desc" style={{ fontSize: "14px", color: "var(--text2)", maxWidth: "400px", lineHeight: 1.6 }}>Pick from all 9 EASA PPL subjects. Each is broken into 5 units with individual lessons — study at your own pace.</div>
          </div>

          {/* Dial */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <svg id="how-dial" onClick={() => {
              if (typeof window !== "undefined") {
                const w = window as any
                if (w.howDialAdvance) w.howDialAdvance()
              }
            }} style={{ cursor: "pointer", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))", width: "200px", height: "220px" }} viewBox="-20 -26 140 150">
              <defs>
                <radialGradient id="hw-knobBg" cx="42%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#f4f6f8"/>
                  <stop offset="100%" stopColor="#b8c2cc"/>
                </radialGradient>
                <radialGradient id="hw-ptrBg" cx="50%" cy="10%" r="85%">
                  <stop offset="0%" stopColor="#eef0f3"/>
                  <stop offset="40%" stopColor="#d4dce4"/>
                  <stop offset="100%" stopColor="#9daab6"/>
                </radialGradient>
                <filter id="hw-ksh">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#00000030"/>
                </filter>
              </defs>
              <line x1="50" y1="5" x2="50" y2="14" id="hw-tick1" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" transform="rotate(-50 50 55)"/>
              <text x="5" y="22" id="hw-num1" fontFamily="system-ui" fontSize="12" fontWeight="800" fill="#94a3b8" textAnchor="middle">1</text>
              <line x1="50" y1="5" x2="50" y2="14" id="hw-tick2" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round"/>
              <text x="50" y="2" id="hw-num2" fontFamily="system-ui" fontSize="12" fontWeight="800" fill="#94a3b8" textAnchor="middle">2</text>
              <line x1="50" y1="5" x2="50" y2="14" id="hw-tick3" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" transform="rotate(50 50 55)"/>
              <text x="95" y="22" id="hw-num3" fontFamily="system-ui" fontSize="12" fontWeight="800" fill="#94a3b8" textAnchor="middle">3</text>
              <circle id="hw-knob" cx="50" cy="55" r="34" fill="url(#hw-knobBg)" stroke="#aab4be" strokeWidth="1.5" filter="url(#hw-ksh)"/>
              <g id="hw-pointer" style={{ transformOrigin: "50px 55px", transform: "rotate(-50deg)", transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                <path d="M40,77 Q40,83 50,83 Q60,83 60,77 L60,43 L50,17 L40,43 Z" fill="#00000020" transform="translate(2 5)" style={{ filter: "blur(4px)" }}/>
                <path d="M40,77 Q40,83 50,83 Q60,83 60,77 L60,43 L50,17 L40,43 Z" fill="url(#hw-ptrBg)" stroke="#8a96a2" strokeWidth="0.8" strokeLinejoin="round"/>
                <path d="M46,21 L46,46 L50,50 L54,46 L54,21 L50,17 Z" fill="#1e2530"/>
                <line x1="50" y1="19" x2="50" y2="48" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              </g>
            </svg>

            {/* Dots */}
            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
              {[0, 1, 2].map(i => (
                <div key={i} id={`hw-dot-${i}`} onClick={() => {
                  if (typeof window !== "undefined") {
                    const w = window as any
                    if (w.howDialSetStep) w.howDialSetStep(i)
                  }
                }} style={{ width: "8px", height: "8px", borderRadius: "50%", background: i === 0 ? "#f59e0b" : "#1e293b", border: `1.5px solid ${i === 0 ? "#f59e0b" : "#334155"}`, cursor: "pointer", transition: "all 0.3s" }} />
              ))}
            </div>

            <p style={{ fontSize: "12px", color: "#334155", letterSpacing: "0.04em" }}>CLICK DIAL TO ADVANCE</p>
          </div>
        </div>
      </div>

      {/* About */}
      <div style={{ background: "#0f172a", padding: "72px 32px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.05em" }}>ABOUT</span>
          </div>

          <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "20px", padding: "40px" }}>

            {/* Avatar */}

            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "white", marginBottom: "24px", letterSpacing: "-0.01em" }}>
              Built by a student pilot,<br />for student pilots.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.8, margin: 0 }}>
                Hi, I'm Emil, a student pilot working towards becoming a career pilot. Afer studying for my PPL theory exams I realized how antiquated, old school, and static almost all online studying resources were. So I built Squawk myself to help modernize aviation studying.
              </p>
              <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.8, margin: 0 }}>
                I wanted to make Squawk free for everyone since I know how expensive flight training can be. Here only ads support me and this site, I just want it to help some future pilots out there.
              </p>
            </div>

            <div style={{ marginTop: "28px", paddingTop: "28px", borderTop: "1px solid #334155", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 900, color: "#0f172a", flexShrink: 0 }}>E</div>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: "14px" }}>Emil</div>
                <div style={{ color: "#64748b", fontSize: "13px" }}>Student pilot · Founder of Squawk</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <a href="mailto:holmemila@gmail.com" style={{ color: "#f59e0b", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>Get in touch →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", padding: "72px 32px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.05em" }}>FAQ</span>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text)", marginTop: "12px", letterSpacing: "-0.01em" }}>Common questions</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              {
                q: "Is Squawk really free?",
                a: "Yep, completely free, forever. No credit card, no trial period, no premium tier. Every subject, every question, every feature is available to every user at no cost."
              },
              {
                q: "Which countries does it cover?",
                a: "Squawk covers the EASA PPL(A) syllabus, which applies across all EASA member states including the UK (via the UK CAA equivalent syllabus), Ireland, Germany, France, Spain, and most of Europe."
              },
              {
                q: "How is this different from other question banks?",
                a: "Most PPL study tools are just question banks. Squawk combines structured lesson-based study, flashcards, a full mock exam in EASA format, and a virtual pilot logbook, all in one free app built specifically for how pilots actually learn."
              },
              {
                q: "Are the questions based on the real EASA exam?",
                a: "The questions are written to the EASA PPL syllabus learning objectives and cover the same topics, difficulty level, and style as the real exam. They are written and checked by a certified EASA PPL Holder. They are not the official EASA question bank questions, but are designed to prepare you for them."
              },
              {
                q: "Do I need to download anything?",
                a: "No. Squawk runs entirely in your browser wether on desktop, tablet, or mobile. Create a free account and start studying immediately."
              },
              {
                q: "How long does it take to prepare for the PPL theory exams?",
                a: "Most students need 80-150 hours of theory study spread over 2-4 months. Squawk's structured approach with lessons, flashcards, then mock exam is designed to make that time as efficient as possible."
              },
            ].map((faq, i) => (
              <div key={i} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px 24px" }}>
                <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "15px", marginBottom: "8px" }}>{faq.q}</div>
                <div style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.7 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#0d1117", borderTop: "1px solid #1e293b", padding: "48px 32px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          {/* Top row */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>

            {/* Brand */}
            <div>
              <div style={{ marginBottom: "12px" }}>
                <span style={{ background: "#f59e0b", color: "#0f172a", fontSize: "11px", fontWeight: 900, padding: "3px 10px", borderRadius: "5px", letterSpacing: "0.06em" }}>SQUAWK</span>
              </div>
              <p style={{ color: "#475569", fontSize: "13px", lineHeight: 1.7, maxWidth: "280px", marginTop: "12px" }}>
                The free, modern way to study for your EASA PPL theory exams. Built by a student pilot, for student pilots.
              </p>
              <a href="mailto:holmemila@gmail.com" style={{ display: "inline-block", marginTop: "16px", color: "#64748b", fontSize: "13px", textDecoration: "none" }}>holmemila@gmail.com</a>
            </div>

            {/* Study */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#334155", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Study</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Air Law", href: "/subject/air-law" },
                  { label: "Meteorology", href: "/subject/meteorology" },
                  { label: "Navigation", href: "/subject/navigation" },
                  { label: "All subjects", href: "/login" },
                ].map(link => (
                  <a key={link.label} href={link.href} style={{ color: "#475569", fontSize: "13px", textDecoration: "none" }}>{link.label}</a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#334155", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Products</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Mock exam", href: "/mock-exam" },
                  { label: "Logbook", href: "/logbook" },
                  { label: "Sign up free", href: "/login" },
                  { label: "Privacy policy", href: "/privacy" },
                ].map(link => (
                  <a key={link.label} href={link.href} style={{ color: "#475569", fontSize: "13px", textDecoration: "none" }}>{link.label}</a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom row */}
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ color: "#334155", fontSize: "12px" }}>© {new Date().getFullYear()} SquawkPPL. All rights reserved.</p>
            <div style={{ display: "flex", gap: "20px" }}>
              <a href="/privacy" style={{ color: "#334155", fontSize: "12px", textDecoration: "none" }}>Privacy policy</a>
              <a href="mailto:holmemila@gmail.com" style={{ color: "#334155", fontSize: "12px", textDecoration: "none" }}>Contact</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}