import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/next"


export const metadata: Metadata = {
  title: "SquawkPPL | Free EASA PPL Theory Study Platform",
  description: "The free, modern way to study for your EASA PPL theory exams. 9 subjects, 2,000+ verified questions, mock exams, flashcards and a more features. Built by student pilots for student pilots.",
  keywords: "EASA PPL theory, PPL exam prep, private pilot licence, aviation study, PPL questions, EASA exam, pilot theory test, free PPL study",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Squawk | Free EASA PPL Theory Study Platform",
    description: "Study for your EASA PPL theory exams for free. 9 subjects, 2,000+ questions, mock exams and flashcards.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Squawk | Free EASA PPL Theory Study Platform",
    description: "Study for your EASA PPL theory exams for free. 9 subjects, 2,000+ questions, mock exams and flashcards.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: '"Futura", "Century Gothic", "Trebuchet MS", sans-serif' }}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

