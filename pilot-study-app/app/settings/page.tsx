"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import Loading from "../components/Loading"

export default function Settings() {
  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [examDate, setExamDate] = useState("")
  const [dailyGoal, setDailyGoal] = useState(20)
  const [dark, setDark] = useState(false)
  const [flashcardMC, setFlashcardMC] = useState(true)
  const [flashcardTF, setFlashcardTF] = useState(true)
  const [flashcardFB, setFlashcardFB] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") setDark(true)

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { window.location.href = "/login"; return }
      setUserId(session.user.id)
      setEmail(session.user.email ?? "")

      const { data } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle()

      if (data) {
        setDisplayName(data.display_name || "")
        setExamDate(data.exam_date || "")
        setDailyGoal(data.daily_goal || 20)
        setFlashcardMC(data.flashcard_mc ?? true)
        setFlashcardTF(data.flashcard_tf ?? true)
        setFlashcardFB(data.flashcard_fb ?? true)
      }
      setLoading(false)
    })
  }, [])

  function toggleDark() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light")
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  async function handleSave() {
    if (!userId) return
    setSaving(true)
    setSaved(false)
    await supabase.from("user_preferences").upsert({
      id: userId,
      display_name: displayName,
      exam_date: examDate || null,
      daily_goal: dailyGoal,
      flashcard_mc: flashcardMC,
      flashcard_tf: flashcardTF,
      flashcard_fb: flashcardFB,
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  if (loading) {
    return <Loading />
  }

  let daysUntilExam: number | null = null
  if (examDate) {
    const diff = new Date(examDate).getTime() - new Date().setHours(0, 0, 0, 0)
    daysUntilExam = Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>

        <button onClick={() => window.location.href = "/"} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: "14px", marginBottom: "1.5rem", padding: 0, cursor: "pointer" }}>
          ← Back
        </button>

        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text)", margin: "0 0 4px" }}>Settings</h1>
        <p style={{ color: "var(--text2)", fontSize: "14px", margin: "0 0 2rem" }}>{email}</p>

        {/* Account */}
        <div style={card}>
          <div style={sectionTitle}>Account</div>

          <label style={labelStyle}>Display name</label>
          <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your name" style={inputStyle} />

          <label style={{ ...labelStyle, marginTop: "1.25rem" }}>Expected exam date</label>
          <input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} style={inputStyle} />
          {daysUntilExam !== null && (
            <p style={{ fontSize: "12px", color: daysUntilExam < 0 ? "var(--text3)" : "#f59e0b", margin: "0.5rem 0 0", fontWeight: 600 }}>
              {daysUntilExam < 0 ? "Exam date has passed" : daysUntilExam === 0 ? "Exam is today!" : `${daysUntilExam} days until your exam`}
            </p>
          )}

          <label style={{ ...labelStyle, marginTop: "1.25rem" }}>Daily question goal</label>
          <input type="number" value={dailyGoal} onChange={e => setDailyGoal(parseInt(e.target.value) || 0)} min={5} max={200} style={inputStyle} />
        </div>

        {/* Dark mode */}
        <div style={card}>
          <div style={sectionTitle}>Appearance</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>Dark mode</p>
              <p style={{ fontSize: "0.8rem", color: "var(--text2)", margin: "2px 0 0" }}>Switch between light and dark theme</p>
            </div>
            <button onClick={toggleDark} style={toggleBtn(dark)}>
              <span style={toggleKnob(dark)} />
            </button>
          </div>
        </div>

        {/* Flashcard preferences */}
        <div style={card}>
          <div style={sectionTitle}>Flashcard question types</div>
          {[
            { label: "Multiple choice", sub: "4-option questions", value: flashcardMC, set: setFlashcardMC },
            { label: "True / False", sub: "Quick binary questions", value: flashcardTF, set: setFlashcardTF },
            { label: "Fill in the blank", sub: "Type the answer", value: flashcardFB, set: setFlashcardFB },
          ].map((item, idx) => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: idx < 2 ? "1rem" : 0 }}>
              <div>
                <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>{item.label}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--text2)", margin: "2px 0 0" }}>{item.sub}</p>
              </div>
              <button onClick={() => item.set(!item.value)} style={toggleBtn(item.value)}>
                <span style={toggleKnob(item.value)} />
              </button>
            </div>
          ))}
        </div>

        {/* Support */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px" }}>
        <h3 style={{ fontWeight: 700, color: "var(--text)", marginBottom: "4px", fontSize: "16px" }}>Support</h3>
        <p style={{ color: "var(--text2)", fontSize: "14px", marginBottom: "16px" }}>Having trouble or found a bug? Get in touch and we'll help you out.</p>
        <div style={{ textAlign: "center" }}>
            <a href="mailto:holmemila@gmail.com" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--text)", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
            holmemila@gmail.com
            </a>
        </div>
        </div>

        {/* Privacy Policy */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px" }}>
        <h3 style={{ fontWeight: 700, color: "var(--text)", marginBottom: "4px", fontSize: "16px" }}>Legal</h3>
        <p style={{ color: "var(--text2)", fontSize: "14px", marginBottom: "16px" }}>Read our privacy policy to understand how we handle your data.</p>
        <div style={{ textAlign: "center" }}>
            <a href="/privacy" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--text)", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
            📄 Privacy Policy
            </a>
        </div>
        </div>

        {/* Save */}
        <div style={card}>
          <button onClick={handleSave} disabled={saving} style={{
            width: "100%",
            padding: "0.85rem",
            background: saved ? "#34a853" : "#0f172a",
            color: saved ? "white" : "#f59e0b",
            border: `2px solid ${saved ? "#34a853" : "#f59e0b"}`,
            borderRadius: "10px",
            fontSize: "0.95rem",
            fontWeight: 700,
            cursor: "pointer",
          }}>
            {saving ? "Saving..." : saved ? "✓ Saved" : "Save changes"}
          </button>
        </div>

        {/* Log out */}
        <div style={card}>
          <button onClick={handleLogout} style={{
            width: "100%",
            padding: "0.85rem",
            background: "var(--surface2)",
            color: "var(--text2)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
          }}>
            Log out
          </button>
        </div>

      </div>
    </div>
  )
}

const card: React.CSSProperties = {
  background: "var(--surface)",
  borderRadius: "16px",
  border: "1px solid var(--border)",
  padding: "1.5rem",
  marginBottom: "1rem",
}

const sectionTitle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  color: "var(--text3)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: "1.25rem",
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "var(--text2)",
  marginBottom: "0.5rem",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "var(--surface2)",
  color: "var(--text)",
  fontSize: "0.95rem",
  boxSizing: "border-box",
  outline: "none",
}

function toggleBtn(on: boolean): React.CSSProperties {
  return {
    width: "52px",
    height: "30px",
    borderRadius: "15px",
    border: "1px solid var(--border)",
    background: on ? "#0f172a" : "var(--surface2)",
    position: "relative",
    cursor: "pointer",
    transition: "background 0.2s",
    flexShrink: 0,
  }
}

function toggleKnob(on: boolean): React.CSSProperties {
  return {
    position: "absolute",
    top: "2px",
    left: on ? "24px" : "2px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: on ? "#f59e0b" : "var(--text3)",
    transition: "left 0.2s",
    display: "block",
  }
}