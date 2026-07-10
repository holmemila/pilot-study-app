"use client"
import { motion } from "framer-motion"

export default function Loading({ message = "Loading" }: { message?: string }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.5rem",
    }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#f59e0b",
            }}
          />
        ))}
      </div>
      <p style={{ fontSize: "13px", color: "var(--text3)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {message}
      </p>
    </div>
  )
}