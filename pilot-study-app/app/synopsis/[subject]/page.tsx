"use client"
import React from "react"

const synopsisData = {
  "air-law": {
    title: "Air Law",
    units: [
      {
        id: 1,
        name: "Licences & Medical",
        content: "Content coming soon — paste your synopsis text here.",
        keyFacts: [
          "Minimum age for PPL(A) is 17 years",
          "Minimum 40 hours total flight time required",
          "Class 2 medical required, issued by an AME",
          "SEP rating valid for 24 months",
        ]
      },
      {
        id: 2,
        name: "Airspace & Rules",
        content: "Content coming soon — paste your synopsis text here.",
        keyFacts: [
          "Aircraft on left gives way to aircraft on right",
          "Aircraft landing have right of way over all others",
          "1500m visibility minimum in Class G below 3000ft",
          "1000ft above obstacles within 600m over congested areas",
        ]
      },
      {
        id: 3,
        name: "Signals & Comms",
        content: "Content coming soon — paste your synopsis text here.",
        keyFacts: [
          "Steady green in flight = cleared to land",
          "7700 = emergency, 7600 = radio failure, 7500 = hijack",
          "MAYDAY spoken three times for distress",
          "PAN PAN spoken three times for urgency",
        ]
      },
      {
        id: 4,
        name: "Docs & Regulations",
        content: "Content coming soon — paste your synopsis text here.",
        keyFacts: [
          "C of A, Registration, Radio Licence and insurance required on board",
          "EASA blood alcohol limit is 0.2 g/100ml",
          "Night begins at end of civil twilight (sun 6° below horizon)",
          "AIRAC cycle runs every 28 days",
        ]
      },
      {
        id: 5,
        name: "Full Review",
        content: "Content coming soon — paste your synopsis text here.",
        keyFacts: [
          "Chicago Convention 1944 established ICAO",
          "ICAO has 19 Annexes to the Chicago Convention",
          "7000 is the VFR conspicuity squawk in European airspace",
          "121.5 MHz is the international distress frequency",
        ]
      },
    ]
  }
}

export default function Synopsis({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = React.use(params)
  const data = synopsisData[subject as keyof typeof synopsisData]

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text2)" }}>Synopsis not available yet.</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>

        <button onClick={() => window.location.href = "/"} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: "14px", cursor: "pointer", padding: 0, marginBottom: "1.5rem" }}>
          ← Back
        </button>

        <div style={{ background: "#0f172a", borderRadius: "16px", padding: "1.5rem", marginBottom: "2rem" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>
            Study notes
          </p>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            ⚖️ {data.title}
          </h1>
        </div>

        {data.units.map(unit => (
          <div key={unit.id} style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
              <span style={{ background: "#f59e0b", color: "#0f172a", fontSize: "10px", fontWeight: 900, padding: "3px 10px", borderRadius: "4px", letterSpacing: "0.06em" }}>
                UNIT {unit.id}
              </span>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text)" }}>
                {unit.name}
              </h2>
            </div>

            <div style={{ background: "var(--surface)", borderRadius: "14px", border: "1px solid var(--border)", padding: "1.5rem", marginBottom: "1rem" }}>
              <p style={{ color: "var(--text2)", lineHeight: "1.8", fontSize: "0.95rem" }}>
                {unit.content}
              </p>
            </div>

            <div style={{ background: "#0f172a", borderRadius: "14px", padding: "1.25rem 1.5rem" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: "#f59e0b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Key facts
              </p>
              {unit.keyFacts.map((fact, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                  <span style={{ color: "#f59e0b", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>→</span>
                  <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: "1.5", margin: 0 }}>{fact}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}