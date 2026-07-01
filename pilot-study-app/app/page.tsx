"use client"
import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { supabase } from "../supabase"

const subjects = [
  { id: "air-law", name: "Air Law", description: "Rules, regulations and legal framework", emoji: "⚖️", available: true },
  { id: "agk", name: "Aircraft General Knowledge", description: "Systems, instruments and airframes", emoji: "✈️", available: false },
  { id: "flight-performance", name: "Flight Performance & Planning", description: "Weight, balance and flight planning", emoji: "📊", available: false },
  { id: "human-performance", name: "Human Performance", description: "Physiology and decision making", emoji: "🧠", available: false },
  { id: "meteorology", name: "Meteorology", description: "Weather theory and interpretation", emoji: "🌤️", available: false },
  { id: "navigation", name: "Navigation", description: "Charts, plotting and GPS", emoji: "🗺️", available: false },
  { id: "operational-procedures", name: "Operational Procedures", description: "Standard operating procedures", emoji: "📋", available: false },
  { id: "principles-of-flight", name: "Principles of Flight", description: "Aerodynamics and theory of flight", emoji: "🛫", available: false },
  { id: "communications", name: "Communications", description: "Radiotelephony and procedures", emoji: "📻", available: false },
]

export default function Home() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session) {
          try {
            const { data } = await supabase
              .from("user_preferences")
              .select("display_name")
              .eq("id", session.user.id)
              .maybeSingle()
            setUserEmail(data?.display_name || session.user.email || null)
          } catch (err) {
            setUserEmail(session.user.email || null)
          }
        }
        setLoading(false)
      })
    }, [])

  if (loading) {
    return (
      <main style={styles.container}>
        <p style={{ color: "#666" }}>Loading...</p>
      </main>
    )
  }

  return (
    <main style={styles.container}>
      <div style={styles.inner}>

        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>EASA PPL Study</h1>
            <p style={styles.welcome}>Welcome back, {userEmail}</p>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>Choose a subject</h2>

        <div style={styles.grid}>
          {subjects.map(subject => (
            <div
              key={subject.id}
              style={{ ...styles.card, ...(subject.available ? styles.cardAvailable : styles.cardLocked) }}
              onClick={() => subject.available && (window.location.href = `/subject/${subject.id}`)}
            >
              <span style={styles.emoji}>{subject.emoji}</span>
              <h3 style={styles.cardTitle}>{subject.name}</h3>
              <p style={styles.cardDesc}>{subject.description}</p>
              {!subject.available && (
                <span style={styles.comingSoon}>Coming soon</span>
              )}
              {subject.available && (
                <span style={styles.startBtn}>Start →</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}

const styles: Record<string, CSSProperties> = {
  container: { minHeight: "100vh", background: "var(--bg)", padding: "2rem 1rem" },
  inner: { maxWidth: "800px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" },
  title: { fontSize: "1.8rem", fontWeight: 700, color: "var(--text)", margin: 0 },
  welcome: { color: "var(--text2)", margin: "0.25rem 0 0", fontSize: "0.95rem" },
  logoutBtn: { fontSize: "0.9rem", color: "var(--text2)", background: "none", border: "none", cursor: "pointer" },
  sectionTitle: { fontSize: "1.1rem", fontWeight: 600, color: "var(--text2)", marginBottom: "1rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" },
  card: { borderRadius: "14px", padding: "1.5rem", cursor: "pointer", transition: "all 0.2s" },
  cardAvailable: { background: "var(--surface)", border: "2px solid var(--border)" },
  cardLocked: { background: "var(--surface2)", border: "2px solid var(--border)", cursor: "default", opacity: 0.6 },
  emoji: { fontSize: "2rem", display: "block", marginBottom: "0.75rem" },
  cardTitle: { fontSize: "1rem", fontWeight: 600, color: "var(--text)", margin: "0 0 0.4rem" },
  cardDesc: { fontSize: "0.85rem", color: "var(--text2)", margin: "0 0 1rem", lineHeight: "1.4" },
  comingSoon: { fontSize: "0.75rem", color: "var(--text3)", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em" },
  startBtn: { fontSize: "0.9rem", color: "var(--accent)", fontWeight: 600 }
}