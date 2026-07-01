import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EASA PPL Study",
  description: "Gamified study app for EASA pilot licence exams",
};

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
