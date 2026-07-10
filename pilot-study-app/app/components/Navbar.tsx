"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        setUserEmail(session.user.email ?? null)
        const { data } = await supabase
          .from("user_preferences")
          .select("display_name")
          .eq("id", session.user.id)
          .maybeSingle()
        setDisplayName(data?.display_name || null)
      }
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserEmail(session?.user?.email ?? null)
      if (!session) setDisplayName(null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const navItems: { label: string; href?: string; items?: string[] }[] = [
  { label: "Study", href: "/" },
  { label: "Logbook", href: "/logbook" },
  { label: "Mock exam", href: "/mock-exam" },
  { label: "Settings", href: "/settings" },
]

  return (
  <nav style={{
    background: "#0f172a",
    padding: "0 16px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
    overflow: "hidden",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
      <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <span style={{
          background: "#f59e0b",
          color: "#0f172a",
          fontSize: "11px",
          fontWeight: 900,
          padding: "3px 10px",
          borderRadius: "5px",
          letterSpacing: "0.06em",
        }}>SQUAWK</span>
      </a>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        background: "transparent",
        border: "1px solid #334155",
        borderRadius: "6px",
        padding: "3px 10px",
        cursor: "default",
      }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.04em" }}>EASA PPL</span>
        <span style={{ fontSize: "9px", color: "#475569" }}>▾</span>
      </div>
    </div>

    {/* Nav links — hidden on mobile */}
    <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {navItems.map((item, index) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {index > 0 && (
            <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.15)" }} />
          )}
          <div style={{ position: "relative" }}>
            {item.href ? (
              <a href={item.href} style={{
                fontSize: "13px",
                color: "#64748b",
                padding: "6px 10px",
                borderRadius: "6px",
                display: "block",
                textDecoration: "none",
              }}>
                {item.label}
              </a>
            ) : (
              <>
                <button
                  onClick={() => setMenuOpen(menuOpen === item.label ? null : item.label)}
                  style={{
                    fontSize: "13px",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    background: menuOpen === item.label ? "#1e293b" : "none",
                    border: "none",
                    color: menuOpen === item.label ? "#f1f5f9" : "#64748b",
                  } as React.CSSProperties}>
                  {item.label} ▾
                </button>
                {menuOpen === item.label && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "10px",
                    padding: "6px",
                    minWidth: "180px",
                    zIndex: 200,
                  }}>
                    {item.items?.map(sub => (
                      <div key={sub} style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontSize: "13px",
                        color: "#94a3b8",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                        {sub}
                        <span style={{
                          fontSize: "10px",
                          background: "#0f172a",
                          color: "#475569",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          fontWeight: 600,
                        }}>Soon</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
      {userEmail ? (
        <a href="/settings" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span className="nav-username" style={{ fontSize: "13px", color: "#64748b" }}>
            {displayName || userEmail}
          </span>
          <div style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "#f59e0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 800,
            color: "#0f172a",
            flexShrink: 0,
          }}>
            {(displayName || userEmail || "?")[0].toUpperCase()}
          </div>
        </a>
      ) : (
        <a href="/login" style={{
          fontSize: "13px",
          color: "#0f172a",
          background: "#f59e0b",
          padding: "6px 14px",
          borderRadius: "6px",
          fontWeight: 700,
          textDecoration: "none",
        }}>Sign up free</a>
      )}
    </div>
  </nav>
)
}