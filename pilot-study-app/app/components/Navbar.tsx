"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    flexWrap: "wrap",
    }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
      <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src="/logo.png" alt="Squawk" style={{ height: "64px", width: "auto" }} />
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
            <>
                <a
                href="https://buymeacoffee.com/squawkstudy"
                target="_blank"
                rel="noopener noreferrer"
                className="bmc-btn"
                style={{
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#0f172a",
                background: "#FFDD00",
                padding: "6px 12px",
                borderRadius: "6px",
                textDecoration: "none",
                flexShrink: 0,
                }}
            >
                <svg width="24" height="24" viewBox="0 0 140 140" fill="none">
                    <path d="M62 30 Q65 24 62 18" stroke="#0f172a" strokeWidth="4" strokeLinecap="round"/>
                    <path d="M82 30 Q85 24 82 18" stroke="#0f172a" strokeWidth="4" strokeLinecap="round"/>
                    <rect x="38" y="40" width="64" height="16" rx="6" fill="none" stroke="#0f172a" strokeWidth="6"/>
                    <path d="M42 56 L48 106 Q49 114 57 114 L83 114 Q91 114 92 106 L98 56 Z" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinejoin="round"/>
                    <path d="M52 70 Q70 64 88 70 L85 102 Q84.5 106 80 106 L60 106 Q55.5 106 55 102 Z" fill="#0f172a"/>
                </svg>
                Buy me a coffee
            </a>
            <a href="/settings" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                <span className="nav-username" style={{ fontSize: "13px", color: "#64748b" }}>
                {displayName || userEmail}
                </span>
                <div style={{
                width: "30px", height: "30px", borderRadius: "50%", background: "#f59e0b",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: 800, color: "#0f172a", flexShrink: 0,
                }}>
                {(displayName || userEmail || "?")[0].toUpperCase()}
                </div>
            </a>
            <button
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "6px", flexDirection: "column", gap: "5px" }}
            >
                <div style={{ width: "22px", height: "2px", background: "#94a3b8", borderRadius: "2px" }} />
                <div style={{ width: "22px", height: "2px", background: "#94a3b8", borderRadius: "2px" }} />
                <div style={{ width: "22px", height: "2px", background: "#94a3b8", borderRadius: "2px" }} />
            </button>
            </>
        ) : (
        <>
            <a
            href="https://buymeacoffee.com/squawkstudy"
            target="_blank"
            rel="noopener noreferrer"
            className="bmc-btn"
            style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#0f172a",
                background: "#FFDD00",
                padding: "6px 12px",
                borderRadius: "6px",
                textDecoration: "none",
                flexShrink: 0,
            }}
            >
            <svg width="16" height="16" viewBox="0 0 140 140" fill="none">
                <path d="M62 30 Q65 24 62 18" stroke="#0f172a" strokeWidth="4" strokeLinecap="round"/>
                <path d="M82 30 Q85 24 82 18" stroke="#0f172a" strokeWidth="4" strokeLinecap="round"/>
                <rect x="38" y="40" width="64" height="16" rx="6" fill="none" stroke="#0f172a" strokeWidth="6"/>
                <path d="M42 56 L48 106 Q49 114 57 114 L83 114 Q91 114 92 106 L98 56 Z" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinejoin="round"/>
                <path d="M52 70 Q70 64 88 70 L85 102 Q84.5 106 80 106 L60 106 Q55.5 106 55 102 Z" fill="#0f172a"/>
            </svg>
            Buy me a coffee
            </a>
            <a href="/login" style={{
            fontSize: "13px", color: "#0f172a", background: "#f59e0b",
            padding: "6px 14px", borderRadius: "6px", fontWeight: 700, textDecoration: "none",
            }} className="nav-signup">Sign up free</a>
            <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "6px", flexDirection: "column", gap: "5px" }}
            >
            <div style={{ width: "22px", height: "2px", background: "#94a3b8", borderRadius: "2px" }} />
            <div style={{ width: "22px", height: "2px", background: "#94a3b8", borderRadius: "2px" }} />
            <div style={{ width: "22px", height: "2px", background: "#94a3b8", borderRadius: "2px" }} />
            </button>
        </>
        )}
    </div>

    {/* Mobile dropdown */}
    {mobileMenuOpen && (
      <div className="mobile-dropdown" style={{
        position: "absolute", top: "64px", left: 0, right: 0,
        background: "#1e293b", borderBottom: "1px solid #334155", zIndex: 200, padding: "8px",
      }}>
        {navItems.map(item => (
          <a key={item.label} href={item.href || "#"}
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: "block", padding: "12px 16px", color: "#94a3b8", textDecoration: "none", fontSize: "15px", fontWeight: 500, borderRadius: "8px" }}>
            {item.label}
          </a>
        ))}
        {userEmail ? (
          <a href="/settings"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: "block", padding: "12px 16px", color: "#94a3b8", textDecoration: "none", fontSize: "15px", borderRadius: "8px" }}>
            Settings
          </a>
        ) : (
          <a href="/login"
            style={{ display: "block", padding: "12px 16px", color: "#f59e0b", textDecoration: "none", fontSize: "15px", fontWeight: 700, borderRadius: "8px" }}>
            Log in / Sign up
          </a>
        )}
      </div>
    )}
  </nav>
)
}