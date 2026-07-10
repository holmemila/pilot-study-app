"use client"
import React, { useEffect, useState } from "react"
import { supabase } from "../../../supabase"
import airLawQuestions from "../../../data/air-law.json"
import meteorologyQuestions from "../../../data/meteorology.json"
import { motion } from "framer-motion"
import Loading from "../../components/Loading"
import agkQuestions from "../../../data/agk.json"
import flightPerformanceQuestions from "../../../data/flight-performance.json"
import humanPerformanceQuestions from "../../../data/human-performance.json"
import navigationQuestions from "../../../data/navigation.json"
import operationalProceduresQuestions from "../../../data/operational-procedures.json"
import principlesOfFlightQuestions from "../../../data/principles-of-flight.json"
import communicationsQuestions from "../../../data/communications.json"

const questionBanks: Record<string, any[]> = {
  "air-law": airLawQuestions,
  "meteorology": meteorologyQuestions,
  "agk": agkQuestions,
  "flight-performance": flightPerformanceQuestions,
  "human-performance": humanPerformanceQuestions,
  "navigation": navigationQuestions,
  "operational-procedures": operationalProceduresQuestions as any[],
  "principles-of-flight": principlesOfFlightQuestions as any[],
  "communications": communicationsQuestions as any[],
}

function SegmentRing({ completedRounds, total = 3, size = 82 }: { completedRounds: number, total?: number, size?: number }) {
  const cx = size / 2
  const cy = size / 2
  const r = (size / 2) - 5
  const circumference = 2 * Math.PI * r
  const gap = 6
  const segmentLength = (circumference - gap * total) / total
  

  return (
    <svg width={size} height={size} style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
      {Array.from({ length: total }).map((_, i) => {
        const offset = i * (segmentLength + gap)
        const filled = i < completedRounds
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={filled ? "#6366f1" : "rgba(99,102,241,0.2)"}
            strokeWidth={5}
            strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: -(offset - segmentLength) }}
            animate={{ strokeDashoffset: -offset }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
          />
        )
      })}
    </svg>
  )
}

export default function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)

  const unitsMap: Record<string, any[]> = {
  "air-law": [
    {
      id: 1, name: "Licences & Medical",
      lessons: [
        { id: 1, name: "PPL Basics", emoji: "⚖️" },
        { id: 2, name: "Medical", emoji: "🏥" },
        { id: 3, name: "Ratings", emoji: "📋" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 2, name: "Airspace & Rules",
      lessons: [
        { id: 1, name: "Right of way", emoji: "🔄" },
        { id: 2, name: "VFR Minima", emoji: "👁️" },
        { id: 3, name: "Airspace Classes", emoji: "🗺️" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 3, name: "Signals & Comms",
      lessons: [
        { id: 1, name: "Light Signals", emoji: "💡" },
        { id: 2, name: "Transponder", emoji: "🔢" },
        { id: 3, name: "MAYDAY & PAN PAN", emoji: "📻" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 4, name: "Docs & Regs",
      lessons: [
        { id: 1, name: "Documents", emoji: "📄" },
        { id: 2, name: "Fitness & Alcohol", emoji: "👨‍✈️" },
        { id: 3, name: "Regulations", emoji: "📋" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 5, name: "Full Review",
      lessons: [
        { id: 1, name: "Mixed review", emoji: "🎯" },
      ],
      testLesson: { id: 6, name: "Final Test", emoji: "🏆" }
    },
  ],
  "meteorology": [
    {
      id: 1, name: "The Atmosphere",
      lessons: [
        { id: 1, name: "Structure", emoji: "🌍" },
        { id: 2, name: "Temperature", emoji: "🌡️" },
        { id: 3, name: "Pressure", emoji: "⏱️" },
        { id: 4, name: "Density", emoji: "💨" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 2, name: "Wind",
      lessons: [
        { id: 1, name: "Pressure Systems", emoji: "🌀" },
        { id: 2, name: "Local Winds", emoji: "🏔️" },
        { id: 3, name: "Jet Streams", emoji: "✈️" },
        { id: 4, name: "Wind Reporting", emoji: "📡" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 3, name: "Clouds & Precipitation",
      lessons: [
        { id: 1, name: "Cloud Formation", emoji: "☁️" },
        { id: 2, name: "Precipitation", emoji: "🌧️" },
        { id: 3, name: "Fog", emoji: "🌫️" },
        { id: 4, name: "Stability", emoji: "📊" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 4, name: "Hazards & Services",
      lessons: [
        { id: 1, name: "Thunderstorms & Icing", emoji: "⛈️" },
        { id: 2, name: "Turbulence", emoji: "💥" },
        { id: 3, name: "METARs & TAFs", emoji: "📋" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 5, name: "Air Masses & Fronts",
      lessons: [
        { id: 1, name: "Air Masses", emoji: "🌐" },
        { id: 2, name: "Warm & Cold Fronts", emoji: "🌦️" },
        { id: 3, name: "Occlusions", emoji: "🔄" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
  ],
  "agk": [
    {
      id: 1, name: "Airframes & Systems",
      lessons: [
        { id: 1, name: "Structures", emoji: "🔩" },
        { id: 2, name: "Flight Controls", emoji: "🕹️" },
        { id: 3, name: "Landing Gear", emoji: "⚙️" },
        { id: 4, name: "Fuel Systems", emoji: "⛽" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 2, name: "Piston Engines",
      lessons: [
        { id: 1, name: "Engine Principles", emoji: "🔥" },
        { id: 2, name: "Carb & Fuel Injection", emoji: "💉" },
        { id: 3, name: "Oil & Cooling", emoji: "🌡️" },
        { id: 4, name: "Ignition & Electrics", emoji: "⚡" },
        { id: 5, name: "Turbocharging", emoji: "🚀" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 3, name: "Propellers & Performance",
      lessons: [
        { id: 1, name: "Propellers", emoji: "🌀" },
        { id: 2, name: "Weight & Balance", emoji: "⚖️" },
        { id: 3, name: "Performance", emoji: "📈" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 4, name: "Instruments",
      lessons: [
        { id: 1, name: "Pitot-Static", emoji: "📡" },
        { id: 2, name: "Gyroscopic", emoji: "🔄" },
        { id: 3, name: "Magnetic Compass", emoji: "🧭" },
        { id: 4, name: "Engine Instruments", emoji: "🎛️" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 5, name: "Electrics & Avionics",
      lessons: [
        { id: 1, name: "Electrical Systems", emoji: "🔋" },
        { id: 2, name: "Radio & Nav Aids", emoji: "📻" },
        { id: 3, name: "Avionics & Automation", emoji: "💻" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
  ],
  "flight-performance": [
    {
      id: 1, name: "Aerodynamics",
      lessons: [
        { id: 1, name: "Lift & drag", emoji: "✈️" },
        { id: 2, name: "Stalling & spinning", emoji: "🌀" },
        { id: 3, name: "Stability", emoji: "⚖️" },
        { id: 4, name: "High lift devices", emoji: "🛫" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 2, name: "Aircraft Performance",
      lessons: [
        { id: 1, name: "Take-off performance", emoji: "🛣️" },
        { id: 2, name: "Climb & cruise", emoji: "📈" },
        { id: 3, name: "Landing performance", emoji: "🛬" },
        { id: 4, name: "Performance charts", emoji: "📊" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 3, name: "Flight Planning",
      lessons: [
        { id: 1, name: "Charts & NOTAMs", emoji: "🗺️" },
        { id: 2, name: "Fuel planning", emoji: "⛽" },
        { id: 3, name: "Weather planning", emoji: "🌤️" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 4, name: "Mass & Balance",
      lessons: [
        { id: 1, name: "Weight limits", emoji: "⚖️" },
        { id: 2, name: "CG calculations", emoji: "📐" },
        { id: 3, name: "Loading", emoji: "📦" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 5, name: "Navigation Calculations",
      lessons: [
        { id: 1, name: "Time, speed & distance", emoji: "⏱️" },
        { id: 2, name: "Wind correction", emoji: "💨" },
        { id: 3, name: "Fuel calculations", emoji: "🔢" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
  ],
  "human-performance": [
    {
      id: 1, name: "Human Factors Basics",
      lessons: [
        { id: 1, name: "SHELL model", emoji: "🧩" },
        { id: 2, name: "Threat & Error Management", emoji: "⚠️" },
        { id: 3, name: "Hazardous Attitudes", emoji: "🧠" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 2, name: "Physiology",
      lessons: [
        { id: 1, name: "Respiratory & Cardiovascular", emoji: "❤️" },
        { id: 2, name: "Vision & Hearing", emoji: "👁️" },
        { id: 3, name: "Spatial Disorientation", emoji: "🌀" },
        { id: 4, name: "Hypoxia & TUC", emoji: "💨" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 3, name: "Psychology & Performance",
      lessons: [
        { id: 1, name: "Attention & Memory", emoji: "🎯" },
        { id: 2, name: "Stress", emoji: "📊" },
        { id: 3, name: "Fatigue", emoji: "😴" },
        { id: 4, name: "Decision Making", emoji: "🤔" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 4, name: "Health & Fitness",
      lessons: [
        { id: 1, name: "Alcohol, Drugs & Medication", emoji: "💊" },
        { id: 2, name: "Medical Fitness", emoji: "🏥" },
        { id: 3, name: "Bends & Barotrauma", emoji: "🤿" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 5, name: "Cockpit Hazards",
      lessons: [
        { id: 1, name: "Hypoxia in depth & TUC", emoji: "⛰️" },
        { id: 2, name: "Toxic Hazards", emoji: "☠️" },
        { id: 3, name: "G-forces & Environment", emoji: "🚀" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
  ],
  "navigation": [
    {
      id: 1, name: "Charts & Projections",
      lessons: [
        { id: 1, name: "Maps & projections", emoji: "🗺️" },
        { id: 2, name: "Chart symbols", emoji: "🔍" },
        { id: 3, name: "Plotting & measuring", emoji: "📐" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 2, name: "Dead Reckoning",
      lessons: [
        { id: 1, name: "Triangle of velocities", emoji: "📐" },
        { id: 2, name: "Wind correction", emoji: "💨" },
        { id: 3, name: "Speed, time & distance", emoji: "⏱️" },
        { id: 4, name: "Nav computer", emoji: "🖩" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 3, name: "Radio Navigation",
      lessons: [
        { id: 1, name: "VOR", emoji: "📡" },
        { id: 2, name: "NDB & ADF", emoji: "📻" },
        { id: 3, name: "DME & transponder", emoji: "🔢" },
        { id: 4, name: "GPS & radar", emoji: "🛰️" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 4, name: "In-flight Navigation",
      lessons: [
        { id: 1, name: "Visual navigation", emoji: "👁️" },
        { id: 2, name: "Position fixing", emoji: "📍" },
        { id: 3, name: "Track error & 1 in 60", emoji: "🎯" },
        { id: 4, name: "Diversions & lost", emoji: "🔄" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 5, name: "Flight Planning & Airspace",
      lessons: [
        { id: 1, name: "Flight plans & ATIS", emoji: "📋" },
        { id: 2, name: "Altimetry", emoji: "⏱️" },
        { id: 3, name: "Rhumb lines & great circles", emoji: "🌍" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
  ],
  "operational-procedures": [
    {
      id: 1, name: "Normal Operations",
      lessons: [
        { id: 1, name: "Pre-flight & airworthiness", emoji: "✅" },
        { id: 2, name: "Aerodromes & taxiing", emoji: "🛣️" },
        { id: 3, name: "Departure & arrival", emoji: "🛫" },
        { id: 4, name: "Fuel management", emoji: "⛽" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 2, name: "Emergency Procedures",
      lessons: [
        { id: 1, name: "Engine failure", emoji: "⚠️" },
        { id: 2, name: "Fire in flight", emoji: "🔥" },
        { id: 3, name: "Systems failures", emoji: "⚡" },
        { id: 4, name: "Emergency comms", emoji: "📻" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 3, name: "Hazards",
      lessons: [
        { id: 1, name: "Wake turbulence", emoji: "🌀" },
        { id: 2, name: "Windshear & microbursts", emoji: "💨" },
        { id: 3, name: "Icing & contamination", emoji: "🧊" },
        { id: 4, name: "Bird strike", emoji: "🐦" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 4, name: "Safety",
      lessons: [
        { id: 1, name: "CFIT & terrain", emoji: "⛰️" },
        { id: 2, name: "Runway incursions", emoji: "🚧" },
        { id: 3, name: "Collision avoidance", emoji: "👁️" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 5, name: "Special Operations",
      lessons: [
        { id: 1, name: "Low visibility ops", emoji: "🌫️" },
        { id: 2, name: "Mountain flying", emoji: "🏔️" },
        { id: 3, name: "Search & rescue", emoji: "🆘" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
  ],
  "principles-of-flight": [
    {
      id: 1, name: "Aerofoil Theory",
      lessons: [
        { id: 1, name: "Aerofoil shape & lift", emoji: "✈️" },
        { id: 2, name: "Angle of attack & CL", emoji: "📐" },
        { id: 3, name: "Drag types", emoji: "💨" },
        { id: 4, name: "Boundary layer & stall", emoji: "🌊" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 2, name: "Forces in Flight",
      lessons: [
        { id: 1, name: "Four forces & level flight", emoji: "⚖️" },
        { id: 2, name: "Climb & descent", emoji: "📈" },
        { id: 3, name: "Turning flight", emoji: "🔄" },
        { id: 4, name: "Ground effect & sideslip", emoji: "🛬" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 3, name: "Stability",
      lessons: [
        { id: 1, name: "Longitudinal stability", emoji: "↕️" },
        { id: 2, name: "Lateral & directional", emoji: "↔️" },
        { id: 3, name: "Dynamic stability", emoji: "〰️" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 4, name: "Control",
      lessons: [
        { id: 1, name: "Axes & primary controls", emoji: "🎮" },
        { id: 2, name: "Secondary controls & trim", emoji: "🔧" },
        { id: 3, name: "Propeller effects", emoji: "🌀" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 5, name: "Limitations",
      lessons: [
        { id: 1, name: "Load factors", emoji: "⚡" },
        { id: 2, name: "V speeds & envelope", emoji: "📊" },
        { id: 3, name: "Wing design & Mach", emoji: "🚀" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
  ],
  "communications": [
    {
      id: 1, name: "RT Basics",
      lessons: [
        { id: 1, name: "Equipment & Frequencies", emoji: "📻" },
        { id: 2, name: "Alphabet, Numbers & Time", emoji: "🔤" },
        { id: 3, name: "Procedure Words", emoji: "💬" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 2, name: "RT Procedures",
      lessons: [
        { id: 1, name: "Read-back Requirements", emoji: "🔁" },
        { id: 2, name: "Standard Phraseology", emoji: "📖" },
        { id: 3, name: "Blocked Calls", emoji: "🚫" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 3, name: "Aerodrome Communications",
      lessons: [
        { id: 1, name: "Ground", emoji: "🛣️" },
        { id: 2, name: "Take-off & Departure", emoji: "🛫" },
        { id: 3, name: "Approach & Landing", emoji: "🛬" },
        { id: 4, name: "ATIS", emoji: "📡" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 4, name: "En-route & ATC",
      lessons: [
        { id: 1, name: "FIS & Radar Services", emoji: "🎯" },
        { id: 2, name: "Position Reports", emoji: "📍" },
        { id: 3, name: "ATC Clearances", emoji: "✅" },
        { id: 4, name: "Transponder Procedures", emoji: "📟" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
      id: 5, name: "Emergency & Special",
      lessons: [
        { id: 1, name: "Mayday & Light Signals", emoji: "🆘" },
        { id: 2, name: "Radio Failure", emoji: "⚡" },
        { id: 3, name: "Interception & Language", emoji: "✈️" },
      ],
      testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
  ],
}

const units = unitsMap[id] || []

  const [roundsCompleted, setRoundsCompleted] = useState<Record<string, number>>({})
  const [lessonsCompleted, setLessonsCompleted] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState(false)
  const [roundScores, setRoundScores] = useState<Record<string, { score: number, total: number }>>({})

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { setLoaded(true); return }

      const { data } = await supabase
        .from("round_completions")
        .select("unit_id, lesson_id, round_id")
        .eq("user_id", session.user.id)
        .eq("subject", id)

      const rounds: Record<string, number> = {}
      const done = new Set<string>()

      ;(data || []).forEach((row: any) => {
        const key = `${row.unit_id}-${row.lesson_id}`
        rounds[key] = (rounds[key] || 0) + 1
        if (rounds[key] >= 3) done.add(key)
      })

      setRoundsCompleted(rounds)
      setLessonsCompleted(done)
      setLoaded(true)
    })
  }, [])

  function getLessonState(unitId: number, lessonId: number): "done" | "active" | "locked" {
    const key = `${unitId}-${lessonId}`
    if (lessonsCompleted.has(key)) return "done"
    return "active"
  }

  function getTestState(unit: typeof units[0]): "done" | "active" | "locked" {
    const testKey = `${unit.id}-${unit.testLesson.id}`
    if (lessonsCompleted.has(testKey)) return "done"
    return "active"
  }

  const totalLessons = units.reduce((a, u) => a + u.lessons.length + 1, 0)
  const completedCount = lessonsCompleted.size
  const progressPct = Math.round((completedCount / totalLessons) * 100)

  if (!loaded) {
    return <Loading />
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: "4rem" }}>
      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "2rem 1rem" }}>

        <button onClick={() => window.location.href = "/"} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: "14px", marginBottom: "1.5rem", padding: 0, cursor: "pointer" }}>
          ← All subjects
        </button>

        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text)", margin: "0 0 4px" }}>
        {id === "air-law" ? "Air Law" : id === "meteorology" ? "Meteorology" : id === "agk" ? "Aircraft General Knowledge" : id === "flight-performance" ? "Flight Performance & Planning" : id === "human-performance" ? "Human Performance & Limitations" : id === "navigation" ? "Navigation" : id === "operational-procedures" ? "Operational Procedures" : id === "principles-of-flight" ? "Principles of Flight" : id === "communications" ? "Communications" : id}
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "14px", margin: "0 0 1.5rem" }}>
          {completedCount} of {totalLessons} lessons complete
        </p>

        <div style={{ height: "8px", background: "var(--surface2)", borderRadius: "4px", marginBottom: "2.5rem", border: "1px solid var(--border)" }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: "var(--accent)", borderRadius: "4px", transition: "width 0.4s" }} />
        </div>

        {units.map((unit, unitIdx) => {
          const testState = getTestState(unit)
          const unitDone = unit.lessons.every((l: any) => lessonsCompleted.has(`${unit.id}-${l.id}`)) && lessonsCompleted.has(`${unit.id}-${unit.testLesson.id}`)
          const subjectQuestions = questionBanks[id] || []
          const hasQuestionsForUnit = subjectQuestions.some((q: any) => q.unit === unit.id)

          return (
            <div key={unit.id} style={{ marginBottom: "2.5rem" }}>
              <div style={{ textAlign: "center", color: "var(--text3)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>
                Unit {unit.id} — {unit.name}
              </div>

              {!hasQuestionsForUnit ? (
                <div style={{ background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)", padding: "2rem 1.5rem", textAlign: "center" }}>
                  <span style={{ fontSize: "11px", color: "var(--text3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Coming soon</span>
                </div>
              ) : (
                <>
                  <div style={{ background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)", padding: "2rem 1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
                   {/* Row 1 — lessons 1 and 2 */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "64px" }}>
                      {unit.lessons.slice(0, 2).map((lesson: any) => {
                        const state = getLessonState(unit.id, lesson.id)
                        const key = `${unit.id}-${lesson.id}`
                        const rounds = roundsCompleted[key] || 0
                        return (
                          <LessonCircle
                            key={lesson.id}
                            lesson={lesson}
                            state={state}
                            roundsDone={rounds}
                            onClick={() => {
                              if (state === "locked") return
                              const nextRound = Math.min(rounds + 1, 3)
                              window.location.href = `/quiz/${id}?unit=${unit.id}&lesson=${lesson.id}&round=${nextRound}`
                            }}
                            roundScores={roundScores}
                            unitId={unit.id}
                            lessonId={lesson.id}
                          />
                        )
                      })}
                    </div>

                    {/* Row 2 — lessons 3 and 4 */}
                    {unit.lessons.length >= 3 && (
                      <div style={{ display: "flex", justifyContent: "center", gap: "64px" }}>
                        {unit.lessons.slice(2, 4).map((lesson: any) => {
                          const state = getLessonState(unit.id, lesson.id)
                          const key = `${unit.id}-${lesson.id}`
                          const rounds = roundsCompleted[key] || 0
                          return (
                            <LessonCircle
                              key={lesson.id}
                              lesson={lesson}
                              state={state}
                              roundsDone={rounds}
                              onClick={() => {
                                if (state === "locked") return
                                const nextRound = Math.min(rounds + 1, 3)
                                window.location.href = `/quiz/${id}?unit=${unit.id}&lesson=${lesson.id}&round=${nextRound}`
                              }}
                              roundScores={roundScores}
                              unitId={unit.id}
                              lessonId={lesson.id}
                            />
                          )
                        })}
                      </div>
                    )}

                    {/* Row 3 — lesson 5 if exists, centered */}
                    {unit.lessons.length >= 5 && (
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        {unit.lessons.slice(4, 5).map((lesson: any) => {
                          const state = getLessonState(unit.id, lesson.id)
                          const key = `${unit.id}-${lesson.id}`
                          const rounds = roundsCompleted[key] || 0
                          return (
                            <LessonCircle
                              key={lesson.id}
                              lesson={lesson}
                              state={state}
                              roundsDone={rounds}
                              onClick={() => {
                                if (state === "locked") return
                                const nextRound = Math.min(rounds + 1, 3)
                                window.location.href = `/quiz/${id}?unit=${unit.id}&lesson=${lesson.id}&round=${nextRound}`
                              }}
                              roundScores={roundScores}
                              unitId={unit.id}
                              lessonId={lesson.id}
                            />
                          )
                        })}
                      </div>
                    )}

                    {/* Unit test centered below */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <LessonCircle
                        lesson={unit.testLesson}
                        state={testState}
                        roundsDone={0}
                        isTest
                        onClick={() => {
                          if (testState === "locked") return
                          window.location.href = `/quiz/${id}?unit=${unit.id}&lesson=${unit.testLesson.id}&round=1`
                        }}
                        roundScores={roundScores}
                        unitId={unit.id}
                        lessonId={unit.testLesson.id}
                      />
                    </div>
                  </div>
                  </div>

                  {unitDone && (
                    <div style={{ margin: "1.5rem auto 0", background: "var(--accent-light)", border: "1px solid var(--accent)", borderRadius: "10px", padding: "10px 20px", textAlign: "center", maxWidth: "200px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent-text)", textTransform: "uppercase", letterSpacing: "0.06em" }}>✓ Unit complete</div>
                    </div>
                  )}
                </>
              )}

              {unitIdx < units.length - 1 && (
                <div style={{ width: "2px", height: "32px", background: "var(--border)", margin: "1.5rem auto 0" }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function LessonCircle({ lesson, state, roundsDone, isTest = false, onClick, roundScores, unitId, lessonId }: {
  lesson: { name: string, emoji: string }
  state: "done" | "active" | "locked"
  roundsDone: number
  isTest?: boolean
  onClick: () => void
  roundScores: Record<string, { score: number, total: number }>
  unitId: number
  lessonId: number
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
      <div style={{ position: "relative", width: "82px", height: "82px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {!isTest && (
          <SegmentRing completedRounds={roundsDone} total={3} size={82} />
        )}
        {isTest && (
          <div style={{
            position: "absolute",
            top: 0, left: 0,
            width: "82px",
            height: "82px",
            borderRadius: "18px",
            border: `3px solid ${state === "done" ? "#f59e0b" : state === "active" ? "#f59e0b" : "var(--border)"}`,
            opacity: state === "locked" ? 0.3 : 1,
            pointerEvents: "none",
          }} />
        )}
        <button
          onClick={onClick}
          style={{
            width: "68px",
            height: "68px",
            borderRadius: isTest ? "14px" : "50%",
            fontSize: "26px",
            border: isTest ? `2px solid ${state === "locked" ? "var(--border)" : "#f59e0b"}` : "none",
            background: isTest ? "#0f172a" : state === "locked" ? "var(--surface2)" : "var(--accent)",
            cursor: state === "locked" ? "default" : "pointer",
            opacity: state === "locked" ? 0.35 : 1,
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}>
          {isTest ? (
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <polygon points="18,4 21,14 18,12 15,14" fill="#f59e0b"/>
              <polygon points="18,32 21,22 18,24 15,22" fill="#475569"/>
              <polygon points="4,18 14,15 12,18 14,21" fill="#475569"/>
              <polygon points="32,18 22,15 24,18 22,21" fill="#f59e0b"/>
              <circle cx="18" cy="18" r="4" fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
              <circle cx="18" cy="18" r="1.5" fill="#f59e0b"/>
            </svg>
          ) : state === "done" ? "✓" : lesson.emoji}
        </button>
      </div>
      <span style={{
        fontSize: "12px",
        fontWeight: 600,
        color: state === "locked" ? "var(--text3)" : state === "done" ? "var(--accent-text)" : "var(--text)",
        textAlign: "center",
        maxWidth: "80px",
      }}>
        {lesson.name}
      </span>
      {!isTest && (
        <span style={{ fontSize: "11px", color: "var(--text3)" }}>
          {roundsDone}/3 rounds
        </span>
      )}
    </div>
  )
}