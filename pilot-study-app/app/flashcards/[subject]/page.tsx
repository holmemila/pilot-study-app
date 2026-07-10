"use client"
import React, { useState, useEffect } from "react"
import { supabase } from "../../../supabase"
import airLawQuestions from "../../../data/air-law.json"
import meteorologyQuestions from "../../../data/meteorology.json"
import agkQuestions from "../../../data/agk.json"
import flightPerformanceQuestions from "../../../data/flight-performance.json"
import humanPerformanceQuestions from "../../../data/human-performance.json"
import navigationQuestions from "../../../data/navigation.json"
import operationalProceduresQuestions from "../../../data/operational-procedures.json"
import principlesOfFlightQuestions from "../../../data/principles-of-flight.json"
import communicationsQuestions from "../../../data/communications.json"

const questionBanks: Record<string, any[]> = {
  "air-law": airLawQuestions,
  "meteorology": meteorologyQuestions,
  "agk": agkQuestions,
  "flight-performance": flightPerformanceQuestions,
  "human-performance": humanPerformanceQuestions,
  "navigation": navigationQuestions,
  "operational-procedures": operationalProceduresQuestions,
  "principles-of-flight": principlesOfFlightQuestions,
  "communications": communicationsQuestions,
}

type Question = {
  id: string
  type: "multiple-choice" | "true-false" | "fill-blank" | "select-all"
  subject: string
  unit: number
  lesson: number
  round: number
  question: string
  options?: string[]
  correct: number | boolean | string | number[]
  explanation: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Flashcards({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = React.use(params)
  const [deck, setDeck] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fillInput, setFillInput] = useState("")
  const [gotItCount, setGotItCount] = useState(0)
  const [totalCards, setTotalCards] = useState(0)
  const [selectedUnit, setSelectedUnit] = useState<number | "all">("all")

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      let allowMC = true
      let allowTF = true
      let allowFB = true

      if (session) {
        const { data: prefs } = await supabase
          .from("user_preferences")
          .select("flashcard_mc, flashcard_tf, flashcard_fb")
          .eq("id", session.user.id)
          .maybeSingle()

        if (prefs) {
          allowMC = prefs.flashcard_mc ?? true
          allowTF = prefs.flashcard_tf ?? true
          allowFB = prefs.flashcard_fb ?? true
        }
      }

      const pool = ( questionBanks[subject] || [] as Question[]).filter(q =>
        q.subject === subject &&
        q.type !== "select-all" &&
        (q.type === "multiple-choice" ? allowMC : true) &&
        (q.type === "true-false" ? allowTF : true) &&
        (q.type === "fill-blank" ? allowFB : true) &&
        (selectedUnit === "all" ? true : q.unit === selectedUnit)
      )

      const shuffled = shuffle(pool)
      setDeck(shuffled)
      setTotalCards(shuffled.length)
      setLoading(false)
    })
  }, [subject])

  const card = deck[current]

  function getCorrectLabel(): string {
    if (!card) return ""
    if (card.type === "multiple-choice") return card.options?.[card.correct as number] ?? ""
    if (card.type === "true-false") return card.correct === true ? "True" : "False"
    if (card.type === "fill-blank") return String(card.correct)
    return ""
  }

  async function handleGotIt() {
    const newDeck = [...deck]
    newDeck.splice(current, 1)
    setGotItCount(c => c + 1)
    setDeck(newDeck)
    setFlipped(false)
    setFillInput("")
    if (current >= newDeck.length) setCurrent(Math.max(0, newDeck.length - 1))

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from("progress").insert({
        user_id: session.user.id,
        question_id: `flashcard-${card.id}`,
        subject: card.subject,
        correct: true,
      })
    }
  }

  function handlePracticeMore() {
    const newDeck = [...deck]
    const [removed] = newDeck.splice(current, 1)
    const insertAt = Math.min(
      current + Math.floor(Math.random() * 5) + 3,
      newDeck.length
    )
    newDeck.splice(insertAt, 0, removed)
    setDeck(newDeck)
    setFlipped(false)
    setFillInput("")
    if (current >= newDeck.length) setCurrent(0)
  }

  async function filterByUnit(unit: number | "all") {
    setSelectedUnit(unit)
    const { data: { session } } = await supabase.auth.getSession()
    let allowMC = true, allowTF = true, allowFB = true
    if (session) {
      const { data: prefs } = await supabase
        .from("user_preferences")
        .select("flashcard_mc, flashcard_tf, flashcard_fb")
        .eq("id", session.user.id)
        .maybeSingle()
      if (prefs) {
        allowMC = prefs.flashcard_mc ?? true
        allowTF = prefs.flashcard_tf ?? true
        allowFB = prefs.flashcard_fb ?? true
      }
    }
    const pool = ( questionBanks[subject] || [] as Question[]).filter(q =>
      q.subject === subject &&
      q.type !== "select-all" &&
      (q.type === "multiple-choice" ? allowMC : true) &&
      (q.type === "true-false" ? allowTF : true) &&
      (q.type === "fill-blank" ? allowFB : true) &&
      (unit === "all" ? true : q.unit === unit)
    )
    const shuffled = shuffle(pool)
    setDeck(shuffled)
    setTotalCards(shuffled.length)
    setCurrent(0)
    setFlipped(false)
    setFillInput("")
    setGotItCount(0)
  }

  function handleRestart() {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      let allowMC = true, allowTF = true, allowFB = true
      if (session) {
        const { data: prefs } = await supabase
          .from("user_preferences")
          .select("flashcard_mc, flashcard_tf, flashcard_fb")
          .eq("id", session.user.id)
          .maybeSingle()
        if (prefs) {
          allowMC = prefs.flashcard_mc ?? true
          allowTF = prefs.flashcard_tf ?? true
          allowFB = prefs.flashcard_fb ?? true
        }
      }
      const pool = ( questionBanks[subject] || [] as Question[]).filter(q =>
        q.subject === subject && q.type !== "select-all" &&
        (q.type === "multiple-choice" ? allowMC : true) &&
        (q.type === "true-false" ? allowTF : true) &&
        (q.type === "fill-blank" ? allowFB : true)
      )
      const shuffled = shuffle(pool)
      setDeck(shuffled)
      setTotalCards(shuffled.length)
      setCurrent(0)
      setFlipped(false)
      setFillInput("")
      setGotItCount(0)
    })
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text2)" }}>Loading flashcards...</p>
      </div>
    )
  }

  if (deck.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ background: "var(--surface)", borderRadius: "20px", padding: "2rem", maxWidth: "480px", width: "100%", border: "1px solid var(--border)", textAlign: "center" }}>
          <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎯</p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.5rem" }}>All cards done!</h2>
          <p style={{ color: "var(--text2)", marginBottom: "0.5rem" }}>You got through all {totalCards} flashcards.</p>
          <p style={{ color: "#34a853", fontWeight: 700, fontSize: "1.1rem", marginBottom: "2rem" }}>✓ {gotItCount} got it · ↩ {totalCards - gotItCount} practised more</p>
          <button onClick={handleRestart} style={primaryBtn}>Start again</button>
          <button onClick={() => window.location.href = "/"} style={{ ...secondaryBtn, marginTop: "0.75rem" }}>
            Back to home
          </button>
        </div>
      </div>
    )
  }

  const remaining = deck.length
  const progress = ((totalCards - remaining) / totalCards) * 100

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <button onClick={() => window.location.href = `/?t=${Date.now()}`} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: "14px", cursor: "pointer", padding: 0 }}>
            ← Back
          </button>
          <select
            value={selectedUnit}
            onChange={e => filterByUnit(e.target.value === "all" ? "all" : parseInt(e.target.value))}
            style={{
              background: "#0f172a",
              color: "#f59e0b",
              border: "1px solid #f59e0b",
              borderRadius: "8px",
              padding: "6px 12px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              outline: "none",
            }}>
            <option value="all">All units</option>
            {(subject === "meteorology" ? [
            { value: 1, label: "Unit 1 — The Atmosphere" },
            { value: 2, label: "Unit 2 — Wind" },
            { value: 3, label: "Unit 3 — Clouds & Precipitation" },
            { value: 4, label: "Unit 4 — Hazards & Services" },
            { value: 5, label: "Unit 5 — Air Masses & Fronts" },
            ] : subject === "agk" ? [
            { value: 1, label: "Unit 1 — Airframes & Systems" },
            { value: 2, label: "Unit 2 — Piston Engines" },
            { value: 3, label: "Unit 3 — Propellers & Performance" },
            { value: 4, label: "Unit 4 — Instruments" },
            { value: 5, label: "Unit 5 — Electrics & Avionics" },
            ] : subject === "flight-performance" ? [
            { value: 1, label: "Unit 1 — Aerodynamics" },
            { value: 2, label: "Unit 2 — Aircraft Performance" },
            { value: 3, label: "Unit 3 — Flight Planning" },
            { value: 4, label: "Unit 4 — Mass & Balance" },
            { value: 5, label: "Unit 5 — Navigation Calculations" },
            ] : subject === "human-performance" ? [
            { value: 1, label: "Unit 1 — Human Factors Basics" },
            { value: 2, label: "Unit 2 — Physiology" },
            { value: 3, label: "Unit 3 — Psychology & Performance" },
            { value: 4, label: "Unit 4 — Health & Fitness" },
            { value: 5, label: "Unit 5 — Cockpit Hazards" },
            ] : subject === "navigation" ? [
            { value: 1, label: "Unit 1 — Charts & Projections" },
            { value: 2, label: "Unit 2 — Dead Reckoning" },
            { value: 3, label: "Unit 3 — Radio Navigation" },
            { value: 4, label: "Unit 4 — In-flight Navigation" },
            { value: 5, label: "Unit 5 — Flight Planning & Airspace" },
            ] : subject === "operational-procedures" ? [
            { value: 1, label: "Unit 1 — Normal Operations" },
            { value: 2, label: "Unit 2 — Emergency Procedures" },
            { value: 3, label: "Unit 3 — Hazards" },
            { value: 4, label: "Unit 4 — Safety" },
            { value: 5, label: "Unit 5 — Special Operations" },
            ] : subject === "principles-of-flight" ? [
            { value: 1, label: "Unit 1 — Aerofoil Theory" },
            { value: 2, label: "Unit 2 — Forces in Flight" },
            { value: 3, label: "Unit 3 — Stability" },
            { value: 4, label: "Unit 4 — Control" },
            { value: 5, label: "Unit 5 — Limitations" },    
            ] : subject === "communications" ? [
            { value: 1, label: "Unit 1 — RT Basics" },
            { value: 2, label: "Unit 2 — RT Procedures" },
            { value: 3, label: "Unit 3 — Aerodrome Communications" },
            { value: 4, label: "Unit 4 — En-Route and ATC" },
            { value: 5, label: "Unit 5 — Emergency & Special" }, 
            ] : [
            { value: 1, label: "Unit 1 — Licences & Medical" },
            { value: 2, label: "Unit 2 — Airspace & Rules" },
            { value: 3, label: "Unit 3 — Signals & Comms" },
            { value: 4, label: "Unit 4 — Docs & Regs" },
            { value: 5, label: "Unit 5 — Full Review" },
            ]).map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "13px", color: "var(--text2)" }}>{deck.length} remaining</span>
            <span style={{ fontSize: "13px", color: "#34a853", marginLeft: "12px" }}>✓ {gotItCount}</span>
          </div>
        </div>

        <div style={{ height: "6px", background: "var(--surface2)", borderRadius: "3px", marginBottom: "2rem", border: "1px solid var(--border)" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "#f59e0b", borderRadius: "3px", transition: "width 0.3s" }} />
        </div>

        <div style={{ background: "#0f172a", borderRadius: "20px", padding: "2rem", marginBottom: "1.5rem", minHeight: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {card.type === "multiple-choice" ? "Multiple choice" : card.type === "true-false" ? "True or false" : "Fill in the blank"}
            </span>
            <p style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f1f5f9", marginTop: "0.75rem", lineHeight: "1.6" }}>
              {card.question}
            </p>
          </div>

          {card.type === "fill-blank" && !flipped && (
            <div style={{ marginTop: "1rem" }}>
              <input
                type="text"
                value={fillInput}
                onChange={e => setFillInput(e.target.value)}
                placeholder="Type your answer..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "10px",
                  border: "1px solid #334155",
                  background: "#1e293b",
                  color: "#f1f5f9",
                  fontSize: "0.95rem",
                  boxSizing: "border-box" as const,
                  outline: "none",
                }}
              />
            </div>
          )}
        </div>

        {!flipped ? (
          <button onClick={() => setFlipped(true)} style={primaryBtn}>
            {card.type === "fill-blank" ? "Reveal answer" : "Show answer"}
          </button>
        ) : (
          <div style={{ background: "var(--surface)", borderRadius: "20px", padding: "1.5rem", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, color: "#f59e0b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Correct answer
            </p>

            <div style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: "#1a3d2b", border: "1px solid #34a853", marginBottom: "1.25rem" }}>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "#34a853", margin: 0 }}>
                ✓ {getCorrectLabel()}
              </p>
              {card.type === "fill-blank" && fillInput && (
                <p style={{ fontSize: "0.85rem", marginTop: "0.4rem", color: fillInput.trim().toLowerCase() === String(card.correct).toLowerCase() ? "#34a853" : "#ea4335" }}>
                  Your answer: {fillInput} {fillInput.trim().toLowerCase() === String(card.correct).toLowerCase() ? "✓" : "✗"}
                </p>
              )}
            </div>

            <p style={{ fontSize: "10px", fontWeight: 700, color: "var(--text3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
              Explanation
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--text2)", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              {card.explanation}
            </p>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={handlePracticeMore} style={{ ...secondaryBtn, flex: 1 }}>
                ↩ Need more practice
              </button>
              <button onClick={handleGotIt} style={{ ...primaryBtn, flex: 1 }}>
                Got it ✓
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

const primaryBtn: React.CSSProperties = {
  width: "100%",
  padding: "0.9rem",
  background: "#0f172a",
  color: "#f59e0b",
  border: "2px solid #f59e0b",
  borderRadius: "10px",
  fontSize: "1rem",
  fontWeight: 700,
  cursor: "pointer",
}

const secondaryBtn: React.CSSProperties = {
  width: "100%",
  padding: "0.9rem",
  background: "var(--surface2)",
  color: "var(--text2)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
}