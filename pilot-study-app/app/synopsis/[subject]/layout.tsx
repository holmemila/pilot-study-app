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
  const name = subjectNames[subject] || "Study Notes"
  return {
    title: `${name} Study Notes | Squawk`,
    description: `Complete study notes and summaries for ${name}, covering the full EASA PPL syllabus.`,
  }
}

export default function SynopsisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}