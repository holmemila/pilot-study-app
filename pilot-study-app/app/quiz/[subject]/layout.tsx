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

export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }): Promise<Metadata> {
  const { subject } = await params
  const name = subjectNames[subject] || "Quiz"
  return {
    title: `${name} Quiz | Squawk`,
    description: `Practice ${name} questions for your EASA PPL theory exam.`,
  }
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}