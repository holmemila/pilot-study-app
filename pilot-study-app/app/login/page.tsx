"use client"
import { useState } from "react"
import { supabase } from "../../supabase"
import type { CSSProperties } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    setMessage("")

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage("Check your email to confirm your account.")
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else window.location.href = "/"
    }
    setLoading(false)
  }

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isSignUp ? "Create account" : "Welcome back"}
        </h2>
        <p style={styles.subtitle}>
          {isSignUp ? "Start studying for your EASA PPL" : "Continue your study session"}
        </p>

        <input
          style={styles.input}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {message && (
          <p style={{ color: message.includes("Check") ? "#34a853" : "#ea4335", fontSize: "0.9rem", margin: "0 0 1rem" }}>
            {message}
          </p>
        )}

        <button style={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait..." : isSignUp ? "Create account" : "Log in"}
        </button>

        <p style={styles.toggle}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span style={styles.link} onClick={() => { setIsSignUp(!isSignUp); setMessage("") }}>
            {isSignUp ? "Log in" : "Sign up"}
          </span>
        </p>
      </div>
    </main>
  )
}

const styles: Record<string, CSSProperties> = {
  container: { minHeight: "100vh", background: "#f0f2f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" },
  card: { background: "white", borderRadius: "16px", padding: "2rem", maxWidth: "400px", width: "100%", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
  title: { fontSize: "1.5rem", fontWeight: "700", color: "#1a1a1a", marginBottom: "0.25rem" },
  subtitle: { color: "#666", marginBottom: "1.5rem", fontSize: "0.95rem" },
  input: { width: "100%", padding: "0.85rem", borderRadius: "10px", border: "2px solid #e0e0e0", fontSize: "1rem", marginBottom: "0.75rem", boxSizing: "border-box" as const, outline: "none" },
  button: { width: "100%", padding: "0.9rem", background: "#4f46e5", color: "white", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", marginBottom: "1rem" },
  toggle: { textAlign: "center", color: "#666", fontSize: "0.9rem" },
  link: { color: "#4f46e5", cursor: "pointer", fontWeight: "600" }
}