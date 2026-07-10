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
    <main style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>

      {/* Background squawk badge top left */}
      <div style={{ position: "absolute", top: "24px", left: "24px" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ background: "#f59e0b", color: "#0f172a", fontSize: "11px", fontWeight: 900, padding: "3px 10px", borderRadius: "5px", letterSpacing: "0.06em" }}>SQUAWK</span>
        </a>
      </div>

      <div style={{ width: "100%", maxWidth: "400px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "white", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px" }}>
            {isSignUp ? "Start studying for your EASA PPL — free" : "Continue your study session"}
          </p>
        </div>

        {/* Card */}
        <div style={{ background: "#1e293b", borderRadius: "20px", padding: "32px", border: "1px solid #334155" }}>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "15px", marginBottom: "12px", boxSizing: "border-box", outline: "none" }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "15px", marginBottom: "20px", boxSizing: "border-box", outline: "none" }}
          />

          {message && (
            <p style={{ color: message.includes("Check") ? "#10b981" : "#ef4444", fontSize: "13px", marginBottom: "16px", padding: "10px 14px", background: message.includes("Check") ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", borderRadius: "8px", border: `1px solid ${message.includes("Check") ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}` }}>
              {message}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: "100%", padding: "14px", background: "#f59e0b", color: "#0f172a", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginBottom: "20px" }}
          >
            {loading ? "Please wait..." : isSignUp ? "Create free account →" : "Log in →"}
          </button>

          <div style={{ textAlign: "center", borderTop: "1px solid #334155", paddingTop: "20px" }}>
            <span style={{ color: "#64748b", fontSize: "14px" }}>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
            </span>
            <span
              onClick={() => { setIsSignUp(!isSignUp); setMessage("") }}
              style={{ color: "#f59e0b", cursor: "pointer", fontWeight: 700, fontSize: "14px" }}
            >
              {isSignUp ? "Log in" : "Sign up free"}
            </span>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "#334155", fontSize: "12px", marginTop: "24px" }}>
          No credit card · No download · Free forever
        </p>
      </div>
    </main>
  )
}