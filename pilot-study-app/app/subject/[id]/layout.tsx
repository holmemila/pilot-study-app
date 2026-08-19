import type { Metadata } from "next"

const subjectNames: Record<string, string> = {
  "air-law": "Air Law",
  "agk": "Aircraft General Knowledge",
  "flight-performance": "Flight Performance & Planning",
  "human-performance": "Human Performance & Limitations",
  "meteorology": "Meteorology",
  "navigation": "Navigation",
  "operational-procedures": "Operational Procedures",
  "principles-of-flight": "Principles of Flight",
  "communications": "Communications",
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const name = subjectNames[id] || "Subject"
  return {
    title: `${name} | Squawk — Free EASA PPL Study`,
    description: `Study ${name} for your EASA PPL theory exam. Structured lessons, quizzes, and flashcards, completely free.`,
  }
}

export default function SubjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}