import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Squawk — Free EASA PPL Theory Study App",
  description: "The free, modern way to study for your EASA PPL theory exams. 9 subjects, 2,000+ questions, mock exams, flashcards and a virtual logbook. Built for student pilots.",
  keywords: "EASA PPL theory, PPL exam prep, private pilot licence, aviation study, PPL questions, EASA exam, pilot theory test, free PPL study",
  openGraph: {
    title: "Squawk — Free EASA PPL Theory Study App",
    description: "Study for your EASA PPL theory exams for free. 9 subjects, 2,000+ questions, mock exams and flashcards.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Squawk — Free EASA PPL Theory Study App",
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
    <html lang="en" className={`${geistSans.variable}`}>
      <body style={{ margin: 0, fontFamily: "var(--font-geist-sans), sans-serif" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
