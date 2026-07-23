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
import { getGuestRoundCompletions } from "../../lib/guestStorage"

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

function KnobCircle({ rounds, completedRounds, size = 80 }: { rounds: number; completedRounds: number; size?: number }) {
  const cx = size / 2
  const cy = size / 2
  const isComplete = completedRounds >= rounds
  const isStarted = completedRounds > 0

  // -50deg = 1 round done, 0deg = 2 rounds done, +50deg = 3 rounds done, default pointing up (0) when not started
  const rotation = completedRounds === 0 ? -50 : completedRounds === 1 ? -50 : completedRounds === 2 ? 0 : 50

  const knobR = size * 0.36
  const pW = size * 0.12  // half width of pointer base
  const pTip = size * 0.11 // y position of tip (from top)
  const pMid = size * 0.48 // y where taper begins
  const pBot = size * 0.72 // y of rounded base

  // Tick line positions — just outside knob circle
  const tickOuter = cy - knobR - size * 0.03
  const tickInner = cy - knobR - size * 0.11

  // Number positions — further out from ticks, no overlap
  const num1x = cx - size * 0.46
  const num1y = cy - size * 0.35
  const num2x = cx
  const num2y = -size * 0.05
  const num3x = cx + size * 0.45
  const num3y = cy - size * 0.36
  const fontSize = size * 0.13

  return (
    <svg width={size} height={size} viewBox={`0 -10 ${size} ${size + 10}`}>
      <defs>
        <radialGradient id={`knobBg_${completedRounds}_${size}`} cx="42%" cy="35%" r="65%">
          <stop offset="0%" stopColor={isComplete ? "#fffbeb" : "#f4f6f8"}/>
          <stop offset="100%" stopColor={isComplete ? "#fcd34d" : "#b8c2cc"}/>
        </radialGradient>
        <radialGradient id={`ptrBg_${completedRounds}_${size}`} cx="50%" cy="10%" r="85%">
          <stop offset="0%" stopColor={isComplete ? "#fef9c3" : "#eef0f3"}/>
          <stop offset="40%" stopColor={isComplete ? "#fde68a" : "#d4dce4"}/>
          <stop offset="100%" stopColor={isComplete ? "#f59e0b" : "#9daab6"}/>
        </radialGradient>
        <filter id={`ksh_${size}`}>
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#00000022"/>
        </filter>
      </defs>

      {/* Tick 1 — left, -50deg */}
      <line x1={cx} y1={tickInner} x2={cx} y2={tickOuter}
        stroke={completedRounds >= 1 ? "#f59e0b" : "#94a3b8"}
        strokeWidth={size * 0.02} strokeLinecap="round"
        transform={`rotate(-50 ${cx} ${cy})`}
      />
      {/* Number 1 */}
      <text x={num1x} y={num1y}
        fontFamily="system-ui,sans-serif" fontSize={fontSize} fontWeight="800"
        fill={completedRounds >= 1 ? "#f59e0b" : "#94a3b8"}
        textAnchor="middle" dominantBaseline="middle">1</text>

      {/* Tick 2 — top, 0deg */}
      <line x1={cx} y1={tickInner} x2={cx} y2={tickOuter}
        stroke={completedRounds >= 2 ? "#f59e0b" : "#94a3b8"}
        strokeWidth={size * 0.02} strokeLinecap="round"
      />
      {/* Number 2 */}
      <text x={num2x} y={num2y}
        fontFamily="system-ui,sans-serif" fontSize={fontSize} fontWeight="800"
        fill={completedRounds >= 2 ? "#f59e0b" : "#94a3b8"}
        textAnchor="middle" dominantBaseline="middle">2</text>

      {/* Tick 3 — right, +50deg */}
      <line x1={cx} y1={tickInner} x2={cx} y2={tickOuter}
        stroke={completedRounds >= 3 ? "#f59e0b" : "#94a3b8"}
        strokeWidth={size * 0.02} strokeLinecap="round"
        transform={`rotate(50 ${cx} ${cy})`}
      />
      {/* Number 3 */}
      <text x={num3x} y={num3y}
        fontFamily="system-ui,sans-serif" fontSize={fontSize} fontWeight="800"
        fill={completedRounds >= 3 ? "#f59e0b" : "#94a3b8"}
        textAnchor="middle" dominantBaseline="middle">3</text>

      {/* Knob circle */}
      <circle cx={cx} cy={cy} r={knobR}
        fill={`url(#knobBg_${completedRounds}_${size})`}
        stroke={isStarted ? "#f59e0b" : "#aab4be"}
        strokeWidth={isComplete ? 2 : 1.5}
        filter={`url(#ksh_${size})`}
      />

      {/* Pointer — rotates based on completedRounds */}
      <g transform={`rotate(${rotation} ${cx} ${cy})`}>
        {/* Shadow */}
        <path
          d={`M${cx - pW} ${pBot} Q${cx - pW} ${pBot + size * 0.05} ${cx} ${pBot + size * 0.05} Q${cx + pW} ${pBot + size * 0.05} ${cx + pW} ${pBot} L${cx + pW} ${pMid} L${cx + size * 0.045} ${pTip} L${cx - size * 0.045} ${pTip} L${cx - pW} ${pMid} Z`}
          fill="#00000020"
          transform="translate(2 6)"
          style={{ filter: "blur(4px)" }}
        />
        {/* Pointer body */}
        <path
          d={`M${cx - pW} ${pBot} Q${cx - pW} ${pBot + size * 0.05} ${cx} ${pBot + size * 0.05} Q${cx + pW} ${pBot + size * 0.05} ${cx + pW} ${pBot} L${cx + pW} ${pMid} L${cx + size * 0.045} ${pTip} L${cx - size * 0.045} ${pTip} L${cx - pW} ${pMid} Z`}
          fill={`url(#ptrBg_${completedRounds}_${size})`}
          stroke={isComplete ? "#d97706" : "#8a96a2"}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Black indicator strip */}
        <path
          d={`M${cx - size * 0.045} ${pTip + size * 0.01} L${cx - size * 0.045} ${pMid - size * 0.02} L${cx} ${pMid + size * 0.02} L${cx + size * 0.045} ${pMid - size * 0.02} L${cx + size * 0.045} ${pTip + size * 0.01} L${cx} ${pTip} Z`}
          fill="#1e2530"
        />
        {/* White centre line */}
        <line
          x1={cx} y1={pTip + size * 0.01}
          x2={cx} y2={pMid}
          stroke="white"
          strokeWidth={size * 0.013}
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

export default function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)

  const unitsMap: Record<string, any[]> = {
  "air-law": [
    {
        id: 1, name: "International Law & Regulatory Framework",
        lessons: [
        { id: 1, name: "ICAO", emoji: "🌍" },
        { id: 2, name: "EASA", emoji: "🏛️" },
        { id: 3, name: "Documentation", emoji: "📄" },
        ],
        testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
        id: 2, name: "Licences, Medical & Currency",
        lessons: [
        { id: 1, name: "PPL Requirements & Privileges", emoji: "🎓" },
        { id: 2, name: "Medicals", emoji: "🏥" },
        { id: 3, name: "Ratings", emoji: "📋" },
        ],
        testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
        id: 3, name: "Rules of the Air",
        lessons: [
        { id: 1, name: "Flight Rules", emoji: "🔄" },
        { id: 2, name: "VFR Minima", emoji: "👁️" },
        { id: 3, name: "Visual", emoji: "💡" },
        ],
        testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
        id: 4, name: "Airspace & Aerodromes",
        lessons: [
        { id: 1, name: "Airspace Classification", emoji: "🗺️" },
        { id: 2, name: "Aerodrome Ops", emoji: "🛬" },
        { id: 3, name: "Special Rules Airspace", emoji: "⚠️" },
        ],
        testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
    },
    {
        id: 5, name: "Documents, Regulations & Emergencies",
        lessons: [
        { id: 1, name: "Aircraft Documents", emoji: "📑" },
        { id: 2, name: "Personal Limitations", emoji: "👨‍✈️" },
        { id: 3, name: "Distress", emoji: "🆘" },
        ],
        testLesson: { id: 6, name: "Unit Test", emoji: "🏆" }
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
        const rounds: Record<string, number> = {}
        const done = new Set<string>()

        if (session) {
        const { data } = await supabase
            .from("round_completions")
            .select("unit_id, lesson_id, round_id")
            .eq("user_id", session.user.id)
            .eq("subject", id)

        ;(data || []).forEach((row: any) => {
            const key = `${row.unit_id}-${row.lesson_id}`
            rounds[key] = (rounds[key] || 0) + 1
            if (rounds[key] >= 3) done.add(key)
        })
        } else {
        const guestRounds = getGuestRoundCompletions().filter(r => r.subject === id)
        guestRounds.forEach(row => {
            const key = `${row.unit_id}-${row.lesson_id}`
            rounds[key] = (rounds[key] || 0) + 1
            if (rounds[key] >= 3) done.add(key)
        })
        }

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
    <div style={{ maxWidth: "520px", margin: "0 auto", padding: "1rem 1rem" }}>
    </div>

  <div style={{ maxWidth: "520px", margin: "0 auto", padding: "2rem 1rem", position: "relative", zIndex: 1 }}>

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
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                <div style={{ color: "var(--text3)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                    Unit {unit.id} — {unit.name}
                </div>
                <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
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

function LessonCircle({ lesson, state, roundsDone, isTest = false, onClick }: {
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <span style={{
        fontSize: "13px",
        fontWeight: 600,
        color: roundsDone > 0 ? "#f59e0b" : "var(--text2)",
        textAlign: "center",
        maxWidth: "90px",
        lineHeight: 1.3,
        }}>
        {lesson.name}
        </span>
        <div onClick={onClick} style={{ cursor: "pointer" }}>
        {isTest ? (
            <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "8px",
            background: roundsDone > 0 ? "#0f172a" : "#f1f5f9",
            border: `2px solid ${roundsDone > 0 ? "#f59e0b" : "#cbd5e1"}`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}>
            <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: `1px solid ${roundsDone > 0 ? "#f59e0b33" : "#e2e8f0"}`,
            }}>
                <span style={{
                fontFamily: "'Futura', 'Century Gothic', 'Trebuchet MS', sans-serif",
                fontSize: "8px",
                fontWeight: 700,
                color: roundsDone > 0 ? "#f59e0b" : "#94a3b8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                }}>
                {roundsDone > 0 ? "COMPLETE" : "UNIT TEST"}
                </span>
            </div>
            <div style={{
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div style={{
                width: "32px",
                height: "8px",
                borderRadius: "2px",
                background: roundsDone > 0 ? "#f59e0b" : "#e2e8f0",
                boxShadow: roundsDone > 0 ? "0 0 6px #f59e0b" : "none",
                }} />
            </div>
            </div>
        ) : (
            <KnobCircle rounds={3} completedRounds={roundsDone} size={90} />
        )}
        </div>
        {!isTest && (
        <span style={{ fontSize: "11px", color: "var(--text3)", marginTop: "-8px" }}>
            {roundsDone}/3
        </span>
        )}
    </div>
  )
}