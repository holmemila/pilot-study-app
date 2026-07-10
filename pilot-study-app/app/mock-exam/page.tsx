"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

import airLawQuestions from "../../data/air-law.json"
import meteorologyQuestions from "../../data/meteorology.json"
import agkQuestions from "../../data/agk.json"
import flightPerformanceQuestions from "../../data/flight-performance.json"
import humanPerformanceQuestions from "../../data/human-performance.json"
import navigationQuestions from "../../data/navigation.json"
import operationalProceduresQuestions from "../../data/operational-procedures.json"
import principlesOfFlightQuestions from "../../data/principles-of-flight.json"
import communicationsQuestions from "../../data/communications.json"

const EXAM_SUBJECTS = [
  { id: "air-law", name: "Air Law", questions: 16, minutes: 25},
  { id: "human-performance", name: "Human Factors", questions: 8, minutes: 15},
  { id: "meteorology", name: "Meteorology", questions: 8, minutes: 15},
  { id: "communications", name: "Communications", questions: 8, minutes: 15},
  { id: "principles-of-flight", name: "Principles of Flight", questions: 16, minutes: 25},
  { id: "operational-procedures", name: "Operational Procedures", questions: 12, minutes: 20},
  { id: "flight-performance", name: "Flight Performance & Planning", questions: 16, minutes: 35},
  { id: "agk", name: "Aircraft General Knowledge", questions: 24, minutes: 40},
  { id: "navigation", name: "Navigation", questions: 12, minutes: 25},
]

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

type Phase = "settings" | "between" | "exam" | "subject-results" | "final-results"

interface SubjectResult {
  subjectId: string
  subjectName: string
  score: number
  total: number
  passed: boolean
  questions: any[]
  answers: (number | null)[]
}

function getRandomMCQuestions(subjectId: string, count: number): any[] {
  const bank = questionBanks[subjectId] || []
  const mc = bank.filter((q: any) => q.type === "multiple-choice")
  const shuffled = [...mc].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function MockExamPage() {
  const router = useRouter()

  // Settings
  const [mode, setMode] = useState<"full" | "single">("full")
  const [selectedSubject, setSelectedSubject] = useState(EXAM_SUBJECTS[0].id)
  const [timerEnabled, setTimerEnabled] = useState(true)

  // Exam state
  const [phase, setPhase] = useState<Phase>("settings")
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0)
  const [examSubjects, setExamSubjects] = useState<typeof EXAM_SUBJECTS>([])
  const [currentQuestions, setCurrentQuestions] = useState<any[]>([])
  const [currentAnswers, setCurrentAnswers] = useState<(number | null)[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [results, setResults] = useState<SubjectResult[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startTimer = useCallback((seconds: number) => {
    stopTimer()
    setTimeLeft(seconds)
    if (!timerEnabled) return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          stopTimer()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [timerEnabled, stopTimer])

  useEffect(() => {
    return () => stopTimer()
  }, [stopTimer])

  // Auto-submit when timer hits 0
  useEffect(() => {
  if (phase === "exam" && timerEnabled && timeLeft === 0 && currentQuestions.length > 0) {
    handleSubmitSubject()
    }
  }, [timeLeft, phase, timerEnabled, currentQuestions])

  const startExam = () => {
    const subjects = mode === "full" ? EXAM_SUBJECTS : EXAM_SUBJECTS.filter(s => s.id === selectedSubject)
    setExamSubjects(subjects)
    setCurrentSubjectIndex(0)
    setResults([])
    beginSubject(subjects, 0)
  }

  const beginSubject = (subjects: typeof EXAM_SUBJECTS, index: number) => {
    const subject = subjects[index]
    const questions = getRandomMCQuestions(subject.id, subject.questions)
    setCurrentQuestions(questions)
    setCurrentAnswers(new Array(questions.length).fill(null))
    setCurrentQuestion(0)
    setShowExplanation(false)
    setExpandedQuestion(null)
    setPhase("exam")
    startTimer(subject.minutes * 60)
  }

  const handleAnswer = (optionIndex: number) => {
    setCurrentAnswers(prev => {
      const updated = [...prev]
      updated[currentQuestion] = optionIndex
      return updated
    })
  }

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setShowExplanation(false)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setShowExplanation(false)
    }
  }

  const handleSubmitSubject = useCallback(() => {
    stopTimer()
    const subject = examSubjects[currentSubjectIndex]
    let score = 0
    currentAnswers.forEach((answer, i) => {
      if (answer === currentQuestions[i]?.correct) score++
    })
    const passed = score / currentQuestions.length >= 0.75
    const result: SubjectResult = {
      subjectId: subject.id,
      subjectName: subject.name,
      score,
      total: currentQuestions.length,
      passed,
      questions: currentQuestions,
      answers: currentAnswers,
    }
    setResults(prev => [...prev, result])
    setPhase("subject-results")
  }, [stopTimer, examSubjects, currentSubjectIndex, currentAnswers, currentQuestions])

  const handleContinue = () => {
    const nextIndex = currentSubjectIndex + 1
    if (nextIndex >= examSubjects.length) {
      setPhase("final-results")
    } else {
      setCurrentSubjectIndex(nextIndex)
      setPhase("between")
    }
  }

  const handleStartNext = () => {
    beginSubject(examSubjects, currentSubjectIndex + 1)
    setCurrentSubjectIndex(prev => prev + 1)
  }

  const totalScore = results.reduce((sum, r) => sum + r.score, 0)
  const totalQuestions = results.reduce((sum, r) => sum + r.total, 0)
  const allPassed = results.every(r => r.passed)
  const overallPercent = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0

  const currentSubject = examSubjects[currentSubjectIndex]
  const timerWarning = timerEnabled && timeLeft < 120 && timeLeft > 0
  const timerDanger = timerEnabled && timeLeft < 60 && timeLeft > 0
  const answeredCount = currentAnswers.filter(a => a !== null).length

  // ─── SETTINGS ────────────────────────────────────────────────────────────────
  if (phase === "settings") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ marginBottom: "32px" }}>
            <button onClick={() => router.push("/")} style={{ background: "none", border: "none", color: "var(--text2)", cursor: "pointer", fontSize: "14px", padding: 0, marginBottom: "16px" }}>← Back</button>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text)", margin: 0 }}>Mock Exam</h1>
            <p style={{ color: "var(--text2)", marginTop: "8px", fontSize: "15px" }}>Simulate the real EASA PPL theoretical knowledge exam</p>
          </div>

          {/* Mode selector */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", marginBottom: "16px" }}>
            <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "16px", fontSize: "15px" }}>Exam mode</p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { value: "full", label: "Full exam", desc: "All 9 subjects · 120 questions · 3h 35min" },
                { value: "single", label: "Single subject", desc: "One subject at a time" },
              ].map(opt => (
                <button key={opt.value} onClick={() => setMode(opt.value as any)} style={{ flex: 1, padding: "16px", borderRadius: "12px", border: `2px solid ${mode === opt.value ? "var(--accent)" : "var(--border)"}`, background: mode === opt.value ? "var(--accent-light)" : "var(--surface2)", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ fontWeight: 600, color: mode === opt.value ? "var(--accent)" : "var(--text)", fontSize: "14px" }}>{opt.label}</div>
                  <div style={{ color: "var(--text2)", fontSize: "12px", marginTop: "4px" }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Subject picker for single mode */}
          {mode === "single" && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", marginBottom: "16px" }}>
              <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "16px", fontSize: "15px" }}>Select subject</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {EXAM_SUBJECTS.map(s => (
                  <button key={s.id} onClick={() => setSelectedSubject(s.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: "10px", border: `2px solid ${selectedSubject === s.id ? "var(--accent)" : "var(--border)"}`, background: selectedSubject === s.id ? "var(--accent-light)" : "var(--surface2)", cursor: "pointer", textAlign: "left" }}>
                    <span style={{ fontWeight: 500, color: selectedSubject === s.id ? "var(--accent)" : "var(--text)", fontSize: "14px" }}> {s.name}</span>
                    <span style={{ color: "var(--text2)", fontSize: "12px" }}>{s.questions}q · {s.minutes}min</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Timer toggle */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontWeight: 600, color: "var(--text)", margin: 0, fontSize: "15px" }}>Timer</p>
                <p style={{ color: "var(--text2)", fontSize: "13px", marginTop: "4px" }}>{timerEnabled ? "Exam simulation — time limits apply" : "Relaxed practice — no time pressure"}</p>
              </div>
              <button onClick={() => setTimerEnabled(!timerEnabled)} style={{ width: "48px", height: "28px", borderRadius: "14px", border: "none", background: timerEnabled ? "var(--accent)" : "var(--border)", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "11px", background: "white", position: "absolute", top: "3px", left: timerEnabled ? "23px" : "3px", transition: "left 0.2s" }} />
              </button>
            </div>
          </div>

          {/* Subject overview for full exam */}
          {mode === "full" && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
              <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "16px", fontSize: "15px" }}>Exam overview</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {EXAM_SUBJECTS.map(s => (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--text)", fontSize: "14px" }}>{s.name}</span>
                    <span style={{ color: "var(--text2)", fontSize: "13px" }}>{s.questions}q · {s.minutes}min</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", fontWeight: 600 }}>
                  <span style={{ color: "var(--text)", fontSize: "14px" }}>Total</span>
                  <span style={{ color: "var(--accent)", fontSize: "13px" }}>120q · 215min</span>
                </div>
              </div>
            </div>
          )}

          <button onClick={startExam} style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "none", background: "var(--navy)", color: "white", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}>
            Start {mode === "full" ? "Full Exam" : "Subject Exam"} →
          </button>
        </div>
      </div>
    )
  }

  // ─── BETWEEN SUBJECTS ────────────────────────────────────────────────────────
  if (phase === "between") {
    const nextSubject = examSubjects[currentSubjectIndex + 1]
    const lastResult = results[results.length - 1]
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>☕</div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>Subject complete</h2>
          <p style={{ color: "var(--text2)", marginBottom: "32px" }}>Take a breath before the next subject</p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
            <p style={{ color: "var(--text2)", fontSize: "13px", marginBottom: "4px" }}>Completed</p>
            <p style={{ fontWeight: 700, color: "var(--text)", fontSize: "18px", marginBottom: "16px" }}>{lastResult?.subjectName}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
              <div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: lastResult?.passed ? "#10b981" : "#ef4444" }}>{lastResult ? Math.round((lastResult.score / lastResult.total) * 100) : 0}%</div>
                <div style={{ color: "var(--text2)", fontSize: "12px" }}>{lastResult?.score}/{lastResult?.total} correct</div>
              </div>
              <div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: lastResult?.passed ? "#10b981" : "#ef4444" }}>{lastResult?.passed ? "PASS" : "FAIL"}</div>
                <div style={{ color: "var(--text2)", fontSize: "12px" }}>75% required</div>
              </div>
            </div>
          </div>

          {nextSubject && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
              <p style={{ color: "var(--text2)", fontSize: "13px", marginBottom: "4px" }}>Next up</p>
              <p style={{ fontWeight: 700, color: "var(--text)", fontSize: "18px" }}>{nextSubject.name}</p>
              <p style={{ color: "var(--text2)", fontSize: "14px", marginTop: "4px" }}>{nextSubject.questions} questions · {nextSubject.minutes} minutes</p>
            </div>
          )}

          <button onClick={handleStartNext} style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "none", background: "var(--navy)", color: "white", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}>
            Start {nextSubject?.name} →
          </button>
        </div>
      </div>
    )
  }

  // ─── EXAM ───────────────────────────────────────────────────────────────────
  if (phase === "exam" && currentSubject) {
    const q = currentQuestions[currentQuestion]
    if (!q) return null
    const selectedAnswer = currentAnswers[currentQuestion]

    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "100px" }}>
        {/* Header */}
        <div style={{ background: "var(--navy)", padding: "16px 20px", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>{currentSubject.name}</div>
              <div style={{ color: "white", fontWeight: 600, fontSize: "14px" }}>Question {currentQuestion + 1} of {currentQuestions.length}</div>
            </div>
            {timerEnabled && (
              <div style={{ background: timerDanger ? "#ef4444" : timerWarning ? "#f59e0b" : "rgba(255,255,255,0.15)", borderRadius: "8px", padding: "8px 14px", textAlign: "center" }}>
                <div style={{ color: "white", fontWeight: 700, fontSize: "18px", fontFamily: "monospace" }}>{formatTime(timeLeft)}</div>
              </div>
            )}
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>Answered</div>
              <div style={{ color: "white", fontWeight: 600, fontSize: "14px" }}>{answeredCount}/{currentQuestions.length}</div>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ maxWidth: "720px", margin: "12px auto 0", background: "rgba(255,255,255,0.2)", borderRadius: "4px", height: "4px" }}>
            <div style={{ width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%`, background: "#f59e0b", height: "100%", borderRadius: "4px", transition: "width 0.3s" }} />
          </div>
        </div>

        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 20px" }}>
          {/* Question */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", marginBottom: "20px" }}>
            <p style={{ fontSize: "17px", fontWeight: 500, color: "var(--text)", lineHeight: 1.6, margin: 0 }}>{q.question}</p>
          </div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            {q.options?.map((option: string, i: number) => {
              const isSelected = selectedAnswer === i
              return (
                <button key={i} onClick={() => handleAnswer(i)} style={{ padding: "16px 20px", borderRadius: "12px", border: `2px solid ${isSelected ? "var(--accent)" : "var(--border)"}`, background: isSelected ? "var(--accent-light)" : "var(--surface)", cursor: "pointer", textAlign: "left", fontSize: "15px", color: isSelected ? "var(--accent)" : "var(--text)", fontWeight: isSelected ? 600 : 400, transition: "all 0.15s", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "50%", border: `2px solid ${isSelected ? "var(--accent)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0, background: isSelected ? "var(--accent)" : "transparent", color: isSelected ? "white" : "var(--text2)" }}>
                    {["A", "B", "C", "D"][i]}
                  </span>
                  {option}
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={handlePrev} disabled={currentQuestion === 0} style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", cursor: currentQuestion === 0 ? "not-allowed" : "pointer", opacity: currentQuestion === 0 ? 0.4 : 1, fontWeight: 500 }}>← Previous</button>

            {currentQuestion < currentQuestions.length - 1 ? (
              <button onClick={handleNext} style={{ padding: "12px 24px", borderRadius: "10px", border: "none", background: "var(--navy)", color: "white", cursor: "pointer", fontWeight: 600 }}>Next →</button>
            ) : (
              <button onClick={handleSubmitSubject} style={{ padding: "12px 28px", borderRadius: "10px", border: "none", background: "#10b981", color: "white", cursor: "pointer", fontWeight: 700 }}>Submit {currentSubject.name} ✓</button>
            )}
          </div>

          {/* Question dots */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "24px", justifyContent: "center" }}>
            {currentQuestions.map((_, i) => (
              <button key={i} onClick={() => { setCurrentQuestion(i); setShowExplanation(false) }} style={{ width: "32px", height: "32px", borderRadius: "8px", border: `2px solid ${i === currentQuestion ? "var(--accent)" : currentAnswers[i] !== null ? "var(--accent)" : "var(--border)"}`, background: i === currentQuestion ? "var(--accent)" : currentAnswers[i] !== null ? "var(--accent-light)" : "var(--surface)", cursor: "pointer", fontSize: "12px", fontWeight: 600, color: i === currentQuestion ? "white" : currentAnswers[i] !== null ? "var(--accent)" : "var(--text2)" }}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ─── SUBJECT RESULTS ─────────────────────────────────────────────────────────
  if (phase === "subject-results") {
    const result = results[results.length - 1]
    const percent = Math.round((result.score / result.total) * 100)
    const isLast = currentSubjectIndex >= examSubjects.length - 1

    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 20px" }}>
          {/* Score card */}
          <div style={{ background: result.passed ? "var(--surface)" : "var(--surface)", border: `2px solid ${result.passed ? "#10b981" : "#ef4444"}`, borderRadius: "20px", padding: "32px", marginBottom: "24px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "8px" }}>{result.passed ? "✅" : "❌"}</div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>{result.subjectName}</h2>
            <div style={{ fontSize: "48px", fontWeight: 800, color: result.passed ? "#10b981" : "#ef4444", marginBottom: "4px" }}>{percent}%</div>
            <p style={{ color: "var(--text2)", fontSize: "15px" }}>{result.score} of {result.total} correct · {result.passed ? "PASS" : "FAIL — 75% required"}</p>
          </div>

          {/* Question review */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontWeight: 700, color: "var(--text)", marginBottom: "16px", fontSize: "16px" }}>Question review</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {result.questions.map((q, i) => {
                const userAnswer = result.answers[i]
                const correct = userAnswer === q.correct
                return (
                  <div key={i} style={{ border: `1px solid ${correct ? "#10b981" : "#ef4444"}`, borderRadius: "12px", overflow: "hidden" }}>
                    <button onClick={() => setExpandedQuestion(expandedQuestion === i ? null : i)} style={{ width: "100%", padding: "14px 16px", background: correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
                      <span style={{ fontSize: "16px" }}>{correct ? "✅" : "❌"}</span>
                      <span style={{ flex: 1, color: "var(--text)", fontSize: "14px", fontWeight: 500 }}>{i + 1}. {q.question}</span>
                      <span style={{ color: "var(--text2)", fontSize: "12px" }}>{expandedQuestion === i ? "▲" : "▼"}</span>
                    </button>
                    {expandedQuestion === i && (
                      <div style={{ padding: "16px", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
                        {q.options?.map((opt: string, j: number) => {
                          const isCorrect = j === q.correct
                          const isUser = j === userAnswer
                          return (
                            <div key={j} style={{ padding: "8px 12px", borderRadius: "8px", marginBottom: "6px", background: isCorrect ? "rgba(16,185,129,0.1)" : isUser && !isCorrect ? "rgba(239,68,68,0.1)" : "transparent", border: `1px solid ${isCorrect ? "#10b981" : isUser && !isCorrect ? "#ef4444" : "transparent"}`, fontSize: "14px", color: "var(--text)" }}>
                              {["A","B","C","D"][j]}. {opt}
                              {isCorrect && <span style={{ marginLeft: "8px", color: "#10b981", fontWeight: 600 }}>✓ Correct</span>}
                              {isUser && !isCorrect && <span style={{ marginLeft: "8px", color: "#ef4444", fontWeight: 600 }}>✗ Your answer</span>}
                            </div>
                          )
                        })}
                        {q.explanation && (
                          <div style={{ marginTop: "12px", padding: "12px", background: "var(--surface2)", borderRadius: "8px", fontSize: "13px", color: "var(--text2)", lineHeight: 1.6 }}>
                            <strong style={{ color: "var(--text)" }}>Explanation: </strong>{q.explanation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <button onClick={handleContinue} style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "none", background: "var(--navy)", color: "white", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}>
            {isLast ? "View final results →" : `Continue to ${examSubjects[currentSubjectIndex + 1]?.name} →`}
          </button>
        </div>
      </div>
    )
  }

  // ─── FINAL RESULTS ───────────────────────────────────────────────────────────
  if (phase === "final-results") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 20px" }}>
          {/* Overall score */}
          <div style={{ background: "var(--surface)", border: `2px solid ${allPassed ? "#10b981" : "#ef4444"}`, borderRadius: "20px", padding: "32px", marginBottom: "24px", textAlign: "center" }}>
            <div style={{ fontSize: "56px", marginBottom: "8px" }}>{allPassed ? "🏆" : "📚"}</div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text)", marginBottom: "8px" }}>{allPassed ? "All subjects passed!" : "Keep studying"}</h1>
            <div style={{ fontSize: "52px", fontWeight: 800, color: allPassed ? "#10b981" : "#ef4444", marginBottom: "4px" }}>{overallPercent}%</div>
            <p style={{ color: "var(--text2)", fontSize: "15px" }}>{totalScore} of {totalQuestions} questions correct</p>
          </div>

          {/* Per-subject breakdown */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontWeight: 700, color: "var(--text)", marginBottom: "16px", fontSize: "16px" }}>Subject breakdown</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {results.map(r => {
                const pct = Math.round((r.score / r.total) * 100)
                return (
                  <div key={r.subjectId} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "16px" }}>{r.passed ? "✅" : "❌"}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text)" }}>{r.subjectName}</span>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: r.passed ? "#10b981" : "#ef4444" }}>{pct}% · {r.score}/{r.total}</span>
                      </div>
                      <div style={{ height: "6px", background: "var(--border)", borderRadius: "3px" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: r.passed ? "#10b981" : "#ef4444", borderRadius: "3px", transition: "width 0.5s" }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Failed subjects callout */}
          {!allPassed && (
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
              <p style={{ fontWeight: 600, color: "#ef4444", marginBottom: "8px", fontSize: "14px" }}>Subjects to revise:</p>
              {results.filter(r => !r.passed).map(r => (
                <p key={r.subjectId} style={{ color: "var(--text)", fontSize: "14px", margin: "4px 0" }}>• {r.subjectName} — {Math.round((r.score / r.total) * 100)}% (need 75%)</p>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => setPhase("settings")} style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>Retake exam</button>
            <button onClick={() => router.push("/")} style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "none", background: "var(--navy)", color: "white", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>Back to study</button>
          </div>
        </div>
      </div>
    )
  }

  return null
}