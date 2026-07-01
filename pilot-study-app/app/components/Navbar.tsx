"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? null)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserEmail(session?.user?.email ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const navItems = [
    { label: "Study", href: "/" },
    { label: "Dashboard", items: ["Overview", "Progress", "Statistics"] },
    { label: "Mock exam", items: ["Air Law", "Full PPL exam"] },
    { label: "Settings", href: "/settings" },
  ]

  return (
    <nav style={{
      background: "var(--surface)",
      borderBottom: "1px solid var(--border)",
      padding: "0 24px",
      height: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <a href="/" style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)", display: "flex", alignItems: "center", gap: "8px" }}>
        ✈️ EASA PPL Study
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {navItems.map(item => (
          <div key={item.label} style={{ position: "relative" }}>
            {item.href ? (
              <a href={item.href} style={{
                fontSize: "14px",
                color: "var(--text2)",
                padding: "6px 12px",
                borderRadius: "6px",
                display: "block",
              }}>
                {item.label}
              </a>
            ) : (
              <>
                <button
                  onClick={() => setMenuOpen(menuOpen === item.label ? null : item.label)}
                  style={{
                    fontSize: "14px",
                    color: "var(--text2)",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    background: menuOpen === item.label ? "var(--surface2)" : "none",
                    border: "none",
                  }}>
                  {item.label} ▾
                </button>
                {menuOpen === item.label && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "6px",
                    minWidth: "180px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    zIndex: 200,
                  }}>
                    {item.items?.map(sub => (
                      <div key={sub} style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontSize: "13px",
                        color: "var(--text2)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                        {sub}
                        <span style={{
                          fontSize: "10px",
                          background: "var(--surface2)",
                          color: "var(--text3)",
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
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        {userEmail ? (
          <>
            <span style={{ fontSize: "13px", color: "var(--text2)" }}>{userEmail}</span>
            <button onClick={handleLogout} style={{
              fontSize: "13px",
              color: "var(--text2)",
              background: "none",
              border: "none",
            }}>Log out</button>
          </>
        ) : (
          <>
            <a href="/login" style={{ fontSize: "13px", color: "var(--text2)" }}>Log in</a>
            <a href="/login" style={{
              fontSize: "13px",
              color: "white",
              background: "var(--accent)",
              padding: "6px 14px",
              borderRadius: "6px",
              fontWeight: 600,
            }}>Sign up free</a>
          </>
        )}
      </div>
    </nav>
  )
}