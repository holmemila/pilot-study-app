import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mock Exam | Free EASA PPL Practice Exam - Squawk",
  description: "Take a free, full-length EASA PPL mock exam. 120 questions across all 9 subjects, timed to match the real exam format.",
}

export default function MockExamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}