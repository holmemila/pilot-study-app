"use client"
import { useState } from "react"
import questions from "../data/questions/air-law/multiple-choice"

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[current]

  function handleAnswer(index) {
    if (selected !== null) return
    setSelected(index)
    if (index === q.correct) setScore(s => s + 1)
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  if (finished) {
    return (
      <main style={styles.container}>
        <div style={styles.card}>
          <h2 style={{ marginBottom: "0.5rem" }}>Session complete</h2>
          <p style={{ fontSize: "3rem", fontWeight: "bold", margin: "1rem 0" }}>
            {score}/{questions.length}
          </p>
          <p style={{ color: "#666", marginBottom: "2rem" }}>
            {score === questions.length ? "Perfect score!" : score >= questions.length * 0.75 ? "Good effort — review your weak areas." : "Keep practising — you'll get there."}
          </p>
          <button style={styles.button} onClick={() => { setCurrent(0); setSelected(null); setScore(0); setFinished(false) }}>
            Try again
          </button>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.container}>
      <div style={styles.card}>

        <div style={styles.topBar}>
          <span style={styles.subject}>Air Law</span>
          <span style={styles.counter}>{current + 1} / {questions.length}</span>
        </div>

        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${(current / questions.length) * 100}%` }} />
        </div>

        <h2 style={styles.question}>{q.question}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {q.options.map((option, i) => {
            let bg = "#f5f5f5"
            let border = "2px solid #e0e0e0"
            if (selected !== null) {
              if (i === q.correct) { bg = "#e6f4ea"; border = "2px solid #34a853" }
              else if (i === selected && i !== q.correct) { bg = "#fce8e6"; border = "2px solid #ea4335" }
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} style={{ ...styles.option, background: bg, border }}>
                {option}
              </button>
            )
          })}
        </div>

        {selected !== null && (
          <div style={styles.explanation}>
            <strong style={{ color: selected === q.correct ? "#34a853" : "#ea4335" }}>
              {selected === q.correct ? "✓ Correct" : "✗ Incorrect"}
            </strong>
            <p style={{ margin: "0.5rem 0 0", color: "#444", lineHeight: "1.5" }}>{q.explanation}</p>
          </div>
        )}

        {selected !== null && (
          <button style={{ ...styles.button, marginTop: "1.5rem" }} onClick={handleNext}>
            {current + 1 >= questions.length ? "See results" : "Next question →"}
          </button>
        )}

      </div>
    </main>
  )
}

const styles = {
  container: { minHeight: "100vh", background: "#f0f2f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" },
  card: { background: "white", borderRadius: "16px", padding: "2rem", maxWidth: "560px", width: "100%", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" },
  subject: { fontSize: "0.85rem", fontWeight: "600", color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.05em" },
  counter: { fontSize: "0.85rem", color: "#999" },
  progressBar: { height: "6px", background: "#e0e0e0", borderRadius: "3px", marginBottom: "1.75rem" },
  progressFill: { height: "100%", background: "#4f46e5", borderRadius: "3px", transition: "width 0.3s" },
  question: { fontSize: "1.15rem", fontWeight: "600", marginBottom: "1.5rem", lineHeight: "1.6", color: "#1a1a1a" },
  option: { padding: "1rem", borderRadius: "10px", cursor: "pointer", textAlign: "left", fontSize: "0.95rem", transition: "all 0.15s", lineHeight: "1.4" },
  explanation: { marginTop: "1.25rem", padding: "1rem", background: "#f8f8f8", borderRadius: "10px", fontSize: "0.9rem" },
  button: { width: "100%", padding: "0.9rem", background: "#4f46e5", color: "white", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" }
}