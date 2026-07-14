"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "../supabase"
import Loading from "./components/Loading"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
      }
      setLoading(false)
    }) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("t") : ""])

  function handleCardClick(subjectId: string, available: boolean) {
    if (!available) return
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId)
  }

  if (loading) {
  return <Loading />
}

if (!userId) {
  return <LandingPage />
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
                          🎯 Study
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); window.location.href = `/flashcards/${subject.id}` }}
                          style={actionBtn("var(--surface)", "var(--text)")}>
                          🃏 Flashcards
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); window.location.href = `/synopsis/${subject.id}` }}
                          style={actionBtn("var(--surface)", "var(--text)")}>
                          📖 Read
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

function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a" }}>

      {/* Hero */}
      <div style={{ padding: "80px 32px 72px", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
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
          <a href="/login" style={{ background: "#f59e0b", color: "#0f172a", border: "none", borderRadius: "10px", padding: "14px 32px", fontSize: "15px", fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>Start studying free →</a>
          <a href="/login" style={{ background: "transparent", color: "#94a3b8", border: "1px solid #334155", borderRadius: "10px", padding: "14px 32px", fontSize: "15px", fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>Log in</a>
        </div>
        <p style={{ color: "#475569", fontSize: "12px", marginTop: "20px" }}>No credit card · No download · Works on any device</p>

        {/* Stats strip */}
        <div style={{ display: "flex", justifyContent: "center", gap: "48px", marginTop: "56px", paddingTop: "40px", borderTop: "1px solid #1e293b", flexWrap: "wrap" }}>
          {[
            { value: "9", label: "EASA subjects" },
            { value: "2,000+", label: "Unique questions" },
            { value: "120", label: "Mock exam questions" },
            { value: "£0", label: "Forever free" },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "30px", fontWeight: 800, color: stat.value === "£0" ? "white" : "#f59e0b" }}>{stat.value}</div>
              <div style={{ fontSize: "12px", color: "#475569", fontWeight: 600, marginTop: "2px" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ background: "var(--bg)", padding: "64px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.05em" }}>FEATURES</span>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text)", marginTop: "12px", letterSpacing: "-0.01em" }}>Everything you need to pass</h2>
            <p style={{ color: "var(--text2)", marginTop: "8px", fontSize: "15px" }}>Built for EASA PPL students, not just exam cramming</p>
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
          Squawk is free because passing your PPL theory shouldn't depend on your budget. Every feature, every subject, every question completely free.
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
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.05em" }}>HOW IT WORKS</span>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text)", marginTop: "12px", letterSpacing: "-0.01em" }}>Three steps to your theory pass</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px", alignItems: "start" }}>

            {/* Step 1 */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#f59e0b", color: "#0f172a", fontWeight: 800, fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>1</div>
              <h3 style={{ fontWeight: 700, color: "var(--text)", fontSize: "17px", marginBottom: "8px" }}>Choose your subject</h3>
              <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>Pick from all 9 EASA PPL subjects. Each is broken into 5 units with individual lessons so you can study at your own pace.</p>
            </div>

            {/* Step 2 — fake subject preview */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#334155", color: "#94a3b8", fontWeight: 800, fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>2</div>
              <h3 style={{ fontWeight: 700, color: "var(--text)", fontSize: "17px", marginBottom: "8px" }}>Work through lessons</h3>
              <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>Each lesson has multiple question rounds of multiple choice, true/false, fill in the blank. Earn completion rings as you progress.</p>

              {/* Fake subject page snippet */}
              <div style={{ background: "#0f172a", borderRadius: "14px", padding: "20px", textAlign: "left" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#475569", letterSpacing: "0.08em", marginBottom: "16px" }}>UNIT 1 — AEROFOIL THEORY</div>

                {/* Row 1 — 2 circles */}
                <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginBottom: "16px" }}>

                  {/* Lesson 1 — completed */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <div style={{ position: "relative", width: "52px", height: "52px" }}>
                      <svg width="52" height="52" viewBox="0 0 52 52">
                        <circle cx="26" cy="26" r="22" fill="none" stroke="#1e293b" strokeWidth="3"/>
                        <circle cx="26" cy="26" r="22" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="138" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 26 26)"/>
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>✈️</div>
                    </div>
                    <div style={{ fontSize: "9px", color: "#f59e0b", fontWeight: 600, textAlign: "center", maxWidth: "56px", lineHeight: 1.3 }}>Aerofoil shape</div>
                  </div>

                  {/* Lesson 2 — 1/3 complete */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <div style={{ position: "relative", width: "52px", height: "52px" }}>
                      <svg width="52" height="52" viewBox="0 0 52 52">
                        <circle cx="26" cy="26" r="22" fill="none" stroke="#1e293b" strokeWidth="3"/>
                        <circle cx="26" cy="26" r="22" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="138" strokeDashoffset="92" strokeLinecap="round" transform="rotate(-90 26 26)"/>
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#94a3b8" }}>📐</div>
                    </div>
                    <div style={{ fontSize: "9px", color: "#94a3b8", fontWeight: 600, textAlign: "center", maxWidth: "56px", lineHeight: 1.3 }}>Angle of attack</div>
                  </div>

                </div>

                {/* Row 2 — 1 circle centered */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <div style={{ position: "relative", width: "52px", height: "52px" }}>
                      <svg width="52" height="52" viewBox="0 0 52 52">
                        <circle cx="26" cy="26" r="22" fill="none" stroke="#1e293b" strokeWidth="3"/>
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", opacity: 0.3 }}>💨</div>
                    </div>
                    <div style={{ fontSize: "9px", color: "#475569", fontWeight: 600, textAlign: "center", maxWidth: "56px", lineHeight: 1.3 }}>Drag types</div>
                  </div>
                </div>

                {/* Unit test */}
                <div style={{ borderTop: "1px solid #1e293b", paddingTop: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "8px", border: "2px solid #334155", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🧭</div>
                  <div style={{ fontSize: "9px", color: "#475569", fontWeight: 600, letterSpacing: "0.06em" }}>UNIT TEST</div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#064e3b", border: "2px solid #10b981", color: "#10b981", fontWeight: 800, fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>3</div>
              <h3 style={{ fontWeight: 700, color: "var(--text)", fontSize: "17px", marginBottom: "8px" }}>Take the mock exam</h3>
              <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.6 }}>When you feel ready, sit the full 120-question EASA-format mock exam. Each subject is timed. You need 75% to pass — just like the real thing.</p>
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

    </div>
  )
}