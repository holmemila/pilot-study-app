"use client"
import React, { useState, useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { supabase } from "../../../supabase"
import airLawQuestions from "../../../data/air-law.json"
import meteorologyQuestions from "../../../data/meteorology.json"
import { motion, AnimatePresence } from "framer-motion"
import Loading from "../../components/Loading"
import agkQuestions from "../../../data/agk.json"
import flightPerformanceQuestions from "../../../data/flight-performance.json"
import humanPerformanceQuestions from "../../../data/human-performance.json"
import navigationQuestions from "../../../data/navigation.json"
import operationalProceduresQuestions from "../../../data/operational-procedures.json"
import principlesOfFlightQuestions from "../../../data/principles-of-flight.json"
import communicationsQuestions from "../../../data/communications.json"
import { saveGuestRoundCompletion, saveGuestProgress } from "../../lib/guestStorage"

const questionBanks: Record<string, any[]> = {
  "air-law": airLawQuestions as any[],
  "meteorology": meteorologyQuestions as any[],
  "agk": agkQuestions as any[],
  "flight-performance": flightPerformanceQuestions as any[],
  "human-performance": humanPerformanceQuestions as any[],
  "navigation": navigationQuestions as any[],
  "operational-procedures": operationalProceduresQuestions as any[],
  "principles-of-flight": principlesOfFlightQuestions as any[],
  "communications": communicationsQuestions as any[],
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

type AttemptRecord = {
  question: Question
  userAnswer: number | boolean | string | number[] | null
  correct: boolean
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Quiz({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = React.use(params)
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | boolean | string | number[] | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [fillInput, setFillInput] = useState("")
  const [selectAll, setSelectAll] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [attempts, setAttempts] = useState<AttemptRecord[]>([])
  const [expandedExplanation, setExpandedExplanation] = useState<number | null>(null)
  const scoreRef = useRef(0)
  const [authChecked, setAuthChecked] = useState(false)

  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null
  const unitParam = searchParams?.get("unit") || ""
  const lessonParam = searchParams?.get("lesson") || ""
  const roundParam = searchParams?.get("round") || ""

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
  setUserId(session?.user?.id ?? null)
  setAuthChecked(true)
})

    const isUnitTest = lessonParam === "6"
    const allQuestions = questionBanks[subject] || []
    const pool = (allQuestions as Question[]).filter(q => {
      if (q.subject !== subject) return false
      if (isUnitTest) return unitParam ? q.unit === parseInt(unitParam) : true
      return (
        (unitParam ? q.unit === parseInt(unitParam) : true) &&
        (lessonParam ? q.lesson === parseInt(lessonParam) : true) &&
        (roundParam ? q.round === parseInt(roundParam) : true)
      )
    })

    const roundSizes: Record<number, number> = { 1: 5, 2: 7, 3: 10 }
    const count = isUnitTest ? Math.min(20, pool.length) : roundParam ? (roundSizes[parseInt(roundParam)] || pool.length) : pool.length
    setQuestions(shuffle(pool).slice(0, count))
    setLoading(false)
  }, [subject])

  const q = questions[current]

  function checkCorrect(q: Question, sel: any, sa: number[]): boolean {
    if (!q) return false
    if (q.type === "multiple-choice") return sel === q.correct
    if (q.type === "true-false") return sel === q.correct
    if (q.type === "fill-blank") return typeof sel === "string" && sel.trim().toLowerCase() === String(q.correct).toLowerCase()
    if (q.type === "select-all") {
      const correct = q.correct as number[]
      return JSON.stringify(sa.slice().sort()) === JSON.stringify(correct.slice().sort())
    }
    return false
  }

  function isCorrect(): boolean {
    return checkCorrect(q, selected, selectAll)
  }

  function handleSubmit() {
    if (submitted) return
    const correct = checkCorrect(q, selected, selectAll)
    setSubmitted(true)
    if (correct) {
      scoreRef.current = scoreRef.current + 1
      setScore(scoreRef.current)
    }
    setAttempts(prev => [...prev, {
      question: q,
      userAnswer: q.type === "select-all" ? [...selectAll] : selected,
      correct
    }])
    if (q) {
      if (userId) {
        supabase.from("progress").insert({
          user_id: userId,
          question_id: q.id,
          subject: q.subject,
          correct
        }).then(({ error }) => {
          if (error) console.error("Progress save error:", error)
        })
      } else {
        saveGuestProgress({ question_id: q.id, subject: q.subject, correct })
      }
    }
  }

  async function handleNext() {
    if (current + 1 >= questions.length) {
      const finalScore = scoreRef.current
      const finalTotal = questions.length
      const passed = finalScore / finalTotal >= 0.7

      if (passed && unitParam && lessonParam && roundParam) {
        if (userId) {
          await supabase.from("round_completions").upsert({
            user_id: userId,
            subject: subject,
            unit_id: parseInt(unitParam),
            lesson_id: parseInt(lessonParam),
            round_id: parseInt(roundParam),
            score: finalScore,
            total: finalTotal,
          }, { onConflict: "user_id,subject,unit_id,lesson_id,round_id" })
        } else {
          saveGuestRoundCompletion({
            subject: subject,
            unit_id: parseInt(unitParam),
            lesson_id: parseInt(lessonParam),
            round_id: parseInt(roundParam),
            score: finalScore,
            total: finalTotal,
          })
        }
      }
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setSubmitted(false)
      setFillInput("")
      setSelectAll([])
    }
  }

  function toggleSelectAll(index: number) {
    setSelectAll(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  function buildBackUrl() {
    return `/subject/${subject}?t=${Date.now()}`
  }

  function getAnswerLabel(q: Question, answer: any): string {
    if (q.type === "multiple-choice") return q.options?.[answer] ?? ""
    if (q.type === "true-false") return answer === true ? "True" : "False"
    if (q.type === "fill-blank") return String(answer)
    if (q.type === "select-all") {
      const indices = answer as number[]
      return indices.map((i: number) => q.options?.[i]).join(", ")
    }
    return ""
  }

  function getCorrectLabel(q: Question): string {
    if (q.type === "multiple-choice") return q.options?.[q.correct as number] ?? ""
    if (q.type === "true-false") return q.correct === true ? "True" : "False"
    if (q.type === "fill-blank") return String(q.correct)
    if (q.type === "select-all") {
      const indices = q.correct as number[]
      return indices.map((i: number) => q.options?.[i]).join(", ")
    }
    return ""
  }

  if (loading || questions.length === 0) {
    return (
      <main style={styles.container}>
        <div style={styles.card}>
          <p style={{ color: "var(--text2)", textAlign: "center" }}>
            {loading ? "Loading" : "No questions found for this selection."}
          </p>
          <button style={{ ...styles.button, marginTop: "1rem" }} onClick={() => window.location.href = "/"}>Back to home</button>
        </div>
      </main>
    )
  }

  if (finished) {
    const pct = Math.round((scoreRef.current / questions.length) * 100)
    const passed = pct >= 70
    console.log("Debug:", { userId, authChecked, passed })

    return (
      <main style={{ ...styles.container, alignItems: "flex-start", paddingTop: "2rem" }}>
        <div style={{ ...styles.card, maxWidth: "640px" }}>

          <h2 style={{ color: "var(--text)", marginBottom: "0.5rem" }}>
            {passed ? "✓ Passed!" : "✗ Not quite"}
          </h2>
          <p style={{ fontSize: "3rem", fontWeight: 700, margin: "0.5rem 0", color: passed ? "#34a853" : "#ea4335" }}>
            {scoreRef.current}/{questions.length}
          </p>
          <p style={{ color: passed ? "#34a853" : "#ea4335", fontWeight: 600, marginBottom: "1.5rem" }}>
            {passed ? `${pct}% — round complete!` : `${pct}% — you need 70% to pass`}
          </p>

          {authChecked && !userId && (
            <div style={{
              background: "var(--accent-light)",
              border: "1px solid var(--accent)",
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}>
              <p style={{ color: "var(--accent-text)", fontWeight: 600, fontSize: "0.95rem", margin: "0 0 0.5rem" }}>
                Your progress is saved on this device
              </p>
              <p style={{ color: "var(--accent-text)", fontSize: "0.85rem", margin: "0 0 0.75rem", opacity: 0.8 }}>
                Create a free account to sync your progress across devices and never lose it if you clear your browser.
              </p>
              <a href="/login" style={{
                display: "inline-block",
                background: "var(--accent)",
                color: "white",
                padding: "0.6rem 1.5rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
              }}>
                Sign up free →
              </a>
            </div>
          )}

          {passed ? (
            <button style={styles.button} onClick={() => window.location.href = buildBackUrl()}>
              Continue →
            </button>
          ) : (
            <button style={styles.button} onClick={() => {
              setCurrent(0); setSelected(null); setSubmitted(false); setScore(0); scoreRef.current = 0; setFinished(false); setFillInput(""); setSelectAll([]); setAttempts([]); setExpandedExplanation(null)
            }}>
              Try again
            </button>
          )}

          <button style={{ ...styles.button, background: "var(--surface2)", color: "var(--text2)", border: "1px solid var(--border)", marginTop: "0.75rem" }}
            onClick={() => window.location.href = buildBackUrl()}>
            {passed ? "Back to subject" : "Give up for now"}
          </button>

          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
              Question review
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {attempts.map((attempt, idx) => (
                <div key={idx} style={{ background: "var(--surface2)", borderRadius: "12px", border: `1px solid ${attempt.correct ? "#34a853" : "#ea4335"}`, padding: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)", margin: 0, flex: 1 }}>
                      {idx + 1}. {attempt.question.question}
                    </p>
                    <button
                      onClick={() => setExpandedExplanation(expandedExplanation === idx ? null : idx)}
                      style={{ width: "22px", height: "22px", borderRadius: "50%", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text2)", fontSize: "12px", fontWeight: 700, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      ?
                    </button>
                  </div>

                  <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div style={{ padding: "0.5rem 0.75rem", borderRadius: "8px", background: attempt.correct ? "#1a3d2b" : "#3d1a1a", border: `1px solid ${attempt.correct ? "#34a853" : "#ea4335"}` }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: attempt.correct ? "#34a853" : "#ea4335" }}>
                        {attempt.correct ? "✓ Your answer" : "✗ Your answer"}
                      </span>
                      <p style={{ fontSize: "0.85rem", color: "var(--text)", margin: "2px 0 0" }}>
                        {getAnswerLabel(attempt.question, attempt.userAnswer)}
                      </p>
                    </div>

                    {!attempt.correct && (
                      <div style={{ padding: "0.5rem 0.75rem", borderRadius: "8px", background: "#1a3d2b", border: "1px solid #34a853" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#34a853" }}>✓ Correct answer</span>
                        <p style={{ fontSize: "0.85rem", color: "var(--text)", margin: "2px 0 0" }}>
                          {getCorrectLabel(attempt.question)}
                        </p>
                      </div>
                    )}
                  </div>

                  {expandedExplanation === idx && (
                    <div style={{ marginTop: "0.75rem", padding: "0.75rem", background: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                      <p style={{ fontSize: "0.85rem", color: "var(--text2)", margin: 0, lineHeight: "1.5" }}>
                        {attempt.question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    )
  }

  const correct = isCorrect()

  return (
    <main style={styles.container}>
      <div style={styles.card}>

        <div style={styles.topBar}>
          <button style={styles.backBtn} onClick={() => window.location.href = buildBackUrl()}>← Back</button>
          <span style={styles.counter}>{current + 1} / {questions.length}</span>
        </div>

        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${(current / questions.length) * 100}%` }} />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <span style={styles.typeBadge}>
            {q.type === "multiple-choice" ? "Multiple choice" : q.type === "true-false" ? "True or false" : q.type === "fill-blank" ? "Fill in the blank" : "Select all that apply"}
          </span>
        </div>

        {(q as any).image && (
        <img
          src={(q as any).image}
          alt="Question diagram"
          style={{
            width: "100%",
            maxWidth: "480px",
            borderRadius: "12px",
            marginBottom: "16px",
            border: "1px solid var(--border)",
            display: "block",
            margin: "0 auto 16px",
          }}
        />
      )}
      <h2 style={styles.question}>{q.question}</h2>

        {q.type === "multiple-choice" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {q.options?.map((option, i) => {
              let bg = "var(--surface2)"
              let border = "1px solid var(--border)"
              if (submitted) {
                if (i === q.correct) { bg = "#1a3d2b"; border = "2px solid #34a853" }
                else if (i === selected && i !== q.correct) { bg = "#3d1a1a"; border = "2px solid #ea4335" }
              } else if (selected === i) {
                border = "2px solid var(--accent)"
              }
              return (
                <motion.button
                  key={i}
                  onClick={() => !submitted && setSelected(i)}
                  animate={
                    submitted
                      ? i === q.correct
                        ? { scale: [1, 1.03, 1], transition: { duration: 0.3 } }
                        : i === selected && i !== q.correct
                        ? { x: [0, -8, 8, -8, 8, 0], transition: { duration: 0.4 } }
                        : {}
                      : {}
                  }
                  style={{ ...styles.option, background: bg, border }}>
                  {option}
                </motion.button>
              )
            })}
          </div>
        )}

        {q.type === "true-false" && (
          <div style={{ display: "flex", gap: "1rem" }}>
            {[true, false].map(val => {
              let bg = "var(--surface2)"
              let border = "1px solid var(--border)"
              if (submitted) {
                if (val === q.correct) { bg = "#1a3d2b"; border = "2px solid #34a853" }
                else if (val === selected && val !== q.correct) { bg = "#3d1a1a"; border = "2px solid #ea4335" }
              } else if (selected === val) {
                border = "2px solid var(--accent)"
              }
              return (
                <motion.button
                  key={String(val)}
                  onClick={() => !submitted && setSelected(val)}
                  animate={
                    submitted
                      ? val === q.correct
                        ? { scale: [1, 1.03, 1], transition: { duration: 0.3 } }
                        : val === selected && val !== q.correct
                        ? { x: [0, -8, 8, -8, 8, 0], transition: { duration: 0.4 } }
                        : {}
                      : {}
                  }
                  style={{ ...styles.option, flex: 1, textAlign: "center", background: bg, border }}>
                  {val ? "True" : "False"}
                </motion.button>
              )
            })}
          </div>
        )}

        {q.type === "fill-blank" && (
          <input
            type="text"
            value={fillInput}
            onChange={e => { setFillInput(e.target.value); setSelected(e.target.value) }}
            disabled={submitted}
            placeholder="Type your answer..."
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: "10px",
              border: submitted ? (correct ? "2px solid #34a853" : "2px solid #ea4335") : "1px solid var(--border)",
              background: submitted ? (correct ? "#1a3d2b" : "#3d1a1a") : "var(--surface2)",
              color: "var(--text)",
              fontSize: "1rem",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        )}

        {q.type === "select-all" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {q.options?.map((option, i) => {
              const correctArr = q.correct as number[]
              const isSelected = selectAll.includes(i)
              const isRight = correctArr.includes(i)
              let bg = "var(--surface2)"
              let border = "1px solid var(--border)"
              if (submitted) {
                if (isRight) { bg = "#1a3d2b"; border = "2px solid #34a853" }
                else if (isSelected && !isRight) { bg = "#3d1a1a"; border = "2px solid #ea4335" }
              } else if (isSelected) {
                border = "2px solid var(--accent)"
                bg = "var(--accent-light)"
              }
              return (
                <button key={i} onClick={() => !submitted && toggleSelectAll(i)}
                  style={{ ...styles.option, background: bg, border, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "4px", border: "2px solid var(--border)", background: isSelected ? "var(--accent)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "12px", color: "white" }}>
                    {isSelected ? "✓" : ""}
                  </span>
                  {option}
                </button>
              )
            })}
          </div>
        )}

        {submitted && (
          <div style={styles.explanation}>
            <strong style={{ color: correct ? "#34a853" : "#ea4335" }}>
              {correct ? "✓ Correct" : "✗ Incorrect"}
            </strong>
            {q.type === "fill-blank" && !correct && (
              <p style={{ margin: "0.25rem 0 0", color: "var(--text2)", fontSize: "0.85rem" }}>
                Correct answer: <strong style={{ color: "var(--text)" }}>{String(q.correct)}</strong>
              </p>
            )}
            <p style={{ margin: "0.5rem 0 0", color: "var(--text2)", lineHeight: "1.5", fontSize: "0.9rem" }}>{q.explanation}</p>
          </div>
        )}

        {!submitted ? (
          <button style={{ ...styles.button, marginTop: "1.5rem", opacity: (q.type === "select-all" && selectAll.length === 0) || (q.type === "fill-blank" && !fillInput) || (q.type !== "fill-blank" && q.type !== "select-all" && selected === null) ? 0.5 : 1 }}
            onClick={handleSubmit}
            disabled={(q.type === "select-all" && selectAll.length === 0) || (q.type === "fill-blank" && !fillInput.trim()) || (q.type !== "fill-blank" && q.type !== "select-all" && selected === null)}>
            Check answer
          </button>
        ) : (
          <button style={{ ...styles.button, marginTop: "1.5rem" }} onClick={handleNext}>
            {current + 1 >= questions.length ? "See results" : "Next question →"}
          </button>
        )}

      </div>
    </main>
  )
}

const styles: Record<string, CSSProperties> = {
  container: { minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" },
  card: { background: "var(--surface)", borderRadius: "16px", padding: "2rem", maxWidth: "580px", width: "100%", border: "1px solid var(--border)" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" },
  backBtn: { fontSize: "0.9rem", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0 },
  counter: { fontSize: "0.85rem", color: "var(--text2)" },
  progressBar: { height: "6px", background: "var(--surface2)", borderRadius: "3px", marginBottom: "1.5rem" },
  progressFill: { height: "100%", background: "var(--accent)", borderRadius: "3px", transition: "width 0.3s" },
  typeBadge: { fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-text)", background: "var(--accent-light)", padding: "3px 10px", borderRadius: "20px", textTransform: "uppercase" as const, letterSpacing: "0.05em" },
  question: { fontSize: "1.15rem", fontWeight: 600, marginBottom: "1.5rem", lineHeight: "1.6", color: "var(--text)", marginTop: "0.75rem" },
  option: { padding: "1rem", borderRadius: "10px", cursor: "pointer", textAlign: "left" as const, fontSize: "0.95rem", transition: "all 0.15s", lineHeight: "1.4", color: "var(--text)", width: "100%" },
  explanation: { marginTop: "1.25rem", padding: "1rem", background: "var(--surface2)", borderRadius: "10px", fontSize: "0.9rem", border: "1px solid var(--border)" },
  button: { width: "100%", padding: "0.9rem", background: "var(--accent)", color: "white", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: 600, cursor: "pointer" },
}