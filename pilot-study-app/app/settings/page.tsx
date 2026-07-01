"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"

export default function Settings() {
  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [examDate, setExamDate] = useState("")
  const [dailyGoal, setDailyGoal] = useState(20)
  const [dark, setDark] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") setDark(true)

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        window.location.href = "/login"
        return
      }
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
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text2)" }}>Loading...</p>
      </div>
    )
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

        {/* Account section */}
        <div style={{ background: "var(--surface)", borderRadius: "16px", border: "1px solid var(--border)", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 1.25rem" }}>
            Account
          </h2>

          <label style={labelStyle}>Display name</label>
          <input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder="Your name"
            style={inputStyle}
          />

          <label style={{ ...labelStyle, marginTop: "1.25rem" }}>Expected exam date</label>
          <input
            type="date"
            value={examDate}
            onChange={e => setExamDate(e.target.value)}
            style={inputStyle}
          />
          {daysUntilExam !== null && (
            <p style={{ fontSize: "12px", color: daysUntilExam < 0 ? "var(--text3)" : "var(--accent-text)", margin: "0.5rem 0 0" }}>
              {daysUntilExam < 0 ? "Exam date has passed" : daysUntilExam === 0 ? "Exam is today!" : `${daysUntilExam} days until your exam`}
            </p>
          )}

          <label style={{ ...labelStyle, marginTop: "1.25rem" }}>Daily question goal</label>
          <input
            type="number"
            value={dailyGoal}
            onChange={e => setDailyGoal(parseInt(e.target.value) || 0)}
            min={5}
            max={200}
            style={inputStyle}
          />

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              width: "100%",
              padding: "0.85rem",
              background: saved ? "#34a853" : "var(--accent)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "1.5rem",
            }}>
            {saving ? "Saving..." : saved ? "✓ Saved" : "Save changes"}
          </button>
        </div>

        {/* Preferences section */}
        <div style={{ background: "var(--surface)", borderRadius: "16px", border: "1px solid var(--border)", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 1.25rem" }}>
            Preferences
          </h2>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", margin: 0 }}>Dark mode</p>
              <p style={{ fontSize: "0.8rem", color: "var(--text2)", margin: "2px 0 0" }}>Switch between light and dark theme</p>
            </div>
            <button
              onClick={toggleDark}
              style={{
                width: "52px",
                height: "30px",
                borderRadius: "15px",
                border: "1px solid var(--border)",
                background: dark ? "var(--accent)" : "var(--surface2)",
                position: "relative",
                cursor: "pointer",
                transition: "background 0.2s",
              }}>
              <span style={{
                position: "absolute",
                top: "2px",
                left: dark ? "24px" : "2px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "white",
                transition: "left 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }} />
            </button>
          </div>
        </div>

        {/* Account actions */}
        <div style={{ background: "var(--surface)", borderRadius: "16px", border: "1px solid var(--border)", padding: "1.5rem" }}>
          <button
            onClick={handleLogout}
            style={{
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

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "var(--text2)",
  marginBottom: "0.5rem",
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "var(--surface2)",
  color: "var(--text)",
  fontSize: "0.95rem",
  boxSizing: "border-box" as const,
  outline: "none",
}