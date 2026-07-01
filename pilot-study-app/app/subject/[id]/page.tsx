"use client"
import React, { useEffect, useState } from "react"
import { supabase } from "../../../supabase"
import allQuestions from "../../../data/air-law.json"

const units = [
  {
    id: 1, name: "Licences & Medical",
    lessons: [
      { id: 1, name: "PPL basics", emoji: "⚖️" },
      { id: 2, name: "Medical", emoji: "🏥" },
      { id: 3, name: "Ratings", emoji: "📋" },
    ],
    testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
  },
  {
    id: 2, name: "Airspace & Rules",
    lessons: [
      { id: 1, name: "Right of way", emoji: "🔄" },
      { id: 2, name: "VFR minima", emoji: "👁️" },
      { id: 3, name: "Airspace classes", emoji: "🗺️" },
    ],
    testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
  },
  {
    id: 3, name: "Signals & Comms",
    lessons: [
      { id: 1, name: "Light signals", emoji: "💡" },
      { id: 2, name: "Transponder", emoji: "🔢" },
      { id: 3, name: "MAYDAY & PAN PAN", emoji: "📻" },
    ],
    testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
  },
  {
    id: 4, name: "Docs & Regs",
    lessons: [
      { id: 1, name: "Documents", emoji: "📄" },
      { id: 2, name: "Fitness & alcohol", emoji: "👨‍✈️" },
      { id: 3, name: "Regulations", emoji: "📋" },
    ],
    testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
  },
  {
    id: 5, name: "Full Review",
    lessons: [
      { id: 1, name: "Mixed review", emoji: "🎯" },
    ],
    testLesson: { id: 6, name: "Final Test", emoji: "🏆" }
  },
]

function SegmentRing({ completedRounds, total = 3, size = 82 }: { completedRounds: number, total?: number, size?: number }) {
  const cx = size / 2
  const cy = size / 2
  const r = (size / 2) - 5
  const circumference = 2 * Math.PI * r
  const gap = 6
  const segmentLength = (circumference - gap * total) / total

  return (
    <svg width={size} height={size} style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
      {Array.from({ length: total }).map((_, i) => {
        const offset = i * (segmentLength + gap)
        const filled = i < completedRounds
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={filled ? "#6366f1" : "rgba(99,102,241,0.2)"}
            strokeWidth={5}
            strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export default function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [roundsCompleted, setRoundsCompleted] = useState<Record<string, number>>({})
  const [lessonsCompleted, setLessonsCompleted] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState(false)
  const [roundScores, setRoundScores] = useState<Record<string, { score: number, total: number }>>({})

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { setLoaded(true); return }

      const { data } = await supabase
        .from("round_completions")
        .select("unit_id, lesson_id, round_id")
        .eq("user_id", session.user.id)
        .eq("subject", "air-law")

      const rounds: Record<string, number> = {}
      const done = new Set<string>()

      ;(data || []).forEach((row: any) => {
        const key = `${row.unit_id}-${row.lesson_id}`
        rounds[key] = (rounds[key] || 0) + 1
        if (rounds[key] >= 3) done.add(key)
      })

      setRoundsCompleted(rounds)
      setLessonsCompleted(done)
      setLoaded(true)
    })
  }, [])

  function getLessonState(unitId: number, lessonId: number): "done" | "active" | "locked" {
    const key = `${unitId}-${lessonId}`
    if (lessonsCompleted.has(key)) return "done"
    return "active"
  }

  function getTestState(unit: typeof units[0]): "done" | "active" | "locked" {
    const testKey = `${unit.id}-${unit.testLesson.id}`
    if (lessonsCompleted.has(testKey)) return "done"
    return "active"
  }

  const totalLessons = units.reduce((a, u) => a + u.lessons.length + 1, 0)
  const completedCount = lessonsCompleted.size
  const progressPct = Math.round((completedCount / totalLessons) * 100)

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text2)" }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "4rem" }}>
      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "2rem 1rem" }}>

        <button onClick={() => window.location.href = "/"} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: "14px", marginBottom: "1.5rem", padding: 0, cursor: "pointer" }}>
          ← All subjects
        </button>

        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text)", margin: "0 0 4px" }}>⚖️ Air Law</h1>
        <p style={{ color: "var(--text2)", fontSize: "14px", margin: "0 0 1.5rem" }}>
          {completedCount} of {totalLessons} lessons complete
        </p>

        <div style={{ height: "8px", background: "var(--surface2)", borderRadius: "4px", marginBottom: "2.5rem", border: "1px solid var(--border)" }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: "var(--accent)", borderRadius: "4px", transition: "width 0.4s" }} />
        </div>

        {units.map((unit, unitIdx) => {
          const testState = getTestState(unit)
          const unitDone = unit.lessons.every(l => lessonsCompleted.has(`${unit.id}-${l.id}`)) && lessonsCompleted.has(`${unit.id}-${unit.testLesson.id}`)
          const hasQuestionsForUnit = (allQuestions as any[]).some(q => q.unit === unit.id)

          return (
            <div key={unit.id} style={{ marginBottom: "2.5rem" }}>
              <div style={{ textAlign: "center", color: "var(--text3)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>
                Unit {unit.id} — {unit.name}
              </div>

              {!hasQuestionsForUnit ? (
                <div style={{ background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)", padding: "2rem 1.5rem", textAlign: "center" }}>
                  <span style={{ fontSize: "11px", color: "var(--text3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Coming soon</span>
                </div>
              ) : (
                <>
                  <div style={{ background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)", padding: "2rem 1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>

                    {/* Row 1 — lessons 1 and 2 side by side */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "64px" }}>
                      {unit.lessons.slice(0, 2).map((lesson, lessonIdx) => {
                        const state = getLessonState(unit.id, lesson.id)
                        const key = `${unit.id}-${lesson.id}`
                        const rounds = roundsCompleted[key] || 0
                        return (
                          <LessonCircle
                            key={lesson.id}
                            lesson={lesson}
                            state={state}
                            roundsDone={rounds}
                            onClick={() => {
                                if (state === "locked") return
                                const nextRound = Math.min(rounds + 1, 3)
                                window.location.href = `/quiz/air-law?unit=${unit.id}&lesson=${lesson.id}&round=${nextRound}`
                            }}
                            />
                        )
                      })}
                    </div>

                    {/* Row 2 — lesson 3 centered */}
                    {unit.lessons[2] && (() => {
                      const lesson = unit.lessons[2]
                      const state = getLessonState(unit.id, lesson.id)
                      const key = `${unit.id}-${lesson.id}`
                      const rounds = roundsCompleted[key] || 0
                      return (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <LessonCircle
                            lesson={lesson}
                            state={state}
                            roundsDone={rounds}
                            onClick={() => {
                                if (state === "locked") return
                                const nextRound = Math.min(rounds + 1, 3)
                                window.location.href = `/quiz/air-law?unit=${unit.id}&lesson=${lesson.id}&round=${nextRound}`
                            }}
                            />
                        </div>
                      )
                    })()}

                    {/* Unit test centered below */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <LessonCircle
                        lesson={unit.testLesson}
                        state={testState}
                        roundsDone={0}
                        isTest
                        onClick={() => {
                            if (testState === "locked") return
                            window.location.href = `/quiz/air-law?unit=${unit.id}&lesson=${unit.testLesson.id}&round=1`
                        }}
                        />
                    </div>

                  </div>
                  </div>

                  {unitDone && (
                    <div style={{ margin: "1.5rem auto 0", background: "var(--accent-light)", border: "1px solid var(--accent)", borderRadius: "10px", padding: "10px 20px", textAlign: "center", maxWidth: "200px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent-text)", textTransform: "uppercase", letterSpacing: "0.06em" }}>✓ Unit complete</div>
                    </div>
                  )}
                </>
              )}

              {unitIdx < units.length - 1 && (
                <div style={{ width: "2px", height: "32px", background: "var(--border)", margin: "1.5rem auto 0" }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function LessonCircle({ lesson, state, roundsDone, isTest = false, onClick }: {
  lesson: { name: string, emoji: string }
  state: "done" | "active" | "locked"
  roundsDone: number
  isTest?: boolean
  onClick: () => void
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
      <div style={{ position: "relative", width: "82px", height: "82px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {!isTest && (
          <SegmentRing completedRounds={roundsDone} total={3} size={82} />
        )}
        {isTest && (
          <SegmentRing completedRounds={state === "done" ? 1 : 0} total={1} size={82} />
        )}
        <button
          onClick={onClick}
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            fontSize: "26px",
            border: "none",
            background: state === "locked" ? "var(--surface2)" : "var(--accent)",
            cursor: state === "locked" ? "default" : "pointer",
            opacity: state === "locked" ? 0.35 : 1,
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}>
          {state === "done" ? "✓" : lesson.emoji}
        </button>
      </div>
      <span style={{
        fontSize: "12px",
        fontWeight: 600,
        color: state === "locked" ? "var(--text3)" : state === "done" ? "var(--accent-text)" : "var(--text)",
        textAlign: "center",
        maxWidth: "80px",
      }}>
        {lesson.name}
      </span>
      {!isTest && (
        <span style={{ fontSize: "11px", color: "var(--text3)" }}>
          {roundsDone}/3 rounds
        </span>
      )}
    </div>
  )
}