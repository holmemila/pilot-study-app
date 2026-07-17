"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const router = useRouter()

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>

        {/* Icon */}
        <div style={{ fontSize: "64px", marginBottom: "24px" }}>✈️</div>

        {/* Squawk badge */}
        <div style={{ marginBottom: "16px" }}>
          <span style={{ background: "#f59e0b", color: "#0f172a", fontSize: "11px", fontWeight: 900, padding: "3px 10px", borderRadius: "5px", letterSpacing: "0.06em" }}>SQUAWK</span>
        </div>

        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text)", marginBottom: "12px", letterSpacing: "-0.01em" }}>
          Something went wrong
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "15px", lineHeight: 1.6, marginBottom: "32px" }}>
          We hit some unexpected turbulence. The error has been logged and we'll look into it. Try again or head back to the home screen.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            style={{ padding: "12px 24px", borderRadius: "10px", border: "none", background: "#f59e0b", color: "#0f172a", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}
          >
            Try again
          </button>
          <button
            onClick={() => router.push("/")}
            style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}
          >
            Back to home
          </button>
        </div>

        <p style={{ color: "var(--text2)", fontSize: "12px", marginTop: "32px" }}>
          Still having trouble? Contact us at{" "}
          <a href="mailto:holmemila@gmail.com" style={{ color: "#f59e0b", textDecoration: "none" }}>holmemila@gmail.com</a>
        </p>
      </div>
    </div>
  )
}