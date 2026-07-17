export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>

        <div style={{ fontSize: "64px", marginBottom: "24px" }}>🧭</div>

        <div style={{ marginBottom: "16px" }}>
          <span style={{ background: "#f59e0b", color: "#0f172a", fontSize: "11px", fontWeight: 900, padding: "3px 10px", borderRadius: "5px", letterSpacing: "0.06em" }}>SQUAWK</span>
        </div>

        <div style={{ fontSize: "72px", fontWeight: 900, color: "#f59e0b", lineHeight: 1, marginBottom: "8px" }}>404</div>

        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "var(--text)", marginBottom: "12px", letterSpacing: "-0.01em" }}>
          Page not found
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "15px", lineHeight: 1.6, marginBottom: "32px" }}>
          Looks like you've flown off the chart. The page you're looking for doesn't exist or has been moved.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/" style={{ padding: "12px 24px", borderRadius: "10px", border: "none", background: "#f59e0b", color: "#0f172a", fontWeight: 700, fontSize: "15px", cursor: "pointer", textDecoration: "none", display: "inline-block" }}>
            Back to home
          </a>
          <a href="/login" style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontWeight: 600, fontSize: "15px", cursor: "pointer", textDecoration: "none", display: "inline-block" }}>
            Log in
          </a>
        </div>

        <p style={{ color: "var(--text2)", fontSize: "12px", marginTop: "32px" }}>
          Need help? Contact us at{" "}
          <a href="mailto:holmemila@gmail.com" style={{ color: "#f59e0b", textDecoration: "none" }}>holmemila@gmail.com</a>
        </p>

      </div>
    </div>
  )
}