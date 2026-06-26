const airLawMultipleChoice = [
  {
    id: "al-mc-001",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the minimum age to obtain an EASA PPL(A)?",
    options: ["14 years", "16 years", "17 years", "18 years"],
    correct: 2,
    explanation: "EASA FCL.100 requires a minimum age of 17 years to be issued a PPL(A)."
  },
  {
    id: "al-mc-002",
    type: "multiple-choice",
    subject: "air-law",
    question: "How long is an EASA PPL(A) valid?",
    options: ["1 year", "2 years", "5 years", "It does not expire"],
    correct: 3,
    explanation: "The PPL(A) licence itself does not expire. However the ratings within it, such as class ratings, require periodic renewal."
  },
  {
    id: "al-mc-003",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the minimum total flight time required to obtain an EASA PPL(A)?",
    options: ["25 hours", "35 hours", "40 hours", "45 hours"],
    correct: 2,
    explanation: "EASA FCL.110.A requires a minimum of 40 hours total flight time, of which at least 10 hours must be solo flight time."
  },
  {
    id: "al-mc-004",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the minimum solo flight time required for an EASA PPL(A)?",
    options: ["5 hours", "10 hours", "15 hours", "20 hours"],
    correct: 1,
    explanation: "Of the 40 hours minimum total flight time, at least 10 hours must be solo, including 5 hours solo cross-country."
  },
  {
    id: "al-mc-005",
    type: "multiple-choice",
    subject: "air-law",
    question: "A pilot holds an EASA PPL(A). Without a valid medical certificate, may they act as pilot in command?",
    options: ["Yes, for private flights only", "Yes, if carrying no passengers", "No, a valid medical is always required", "Yes, within their home country only"],
    correct: 2,
    explanation: "A valid medical certificate is required to exercise the privileges of any EASA pilot licence at all times."
  },
  {
    id: "al-mc-006",
    type: "multiple-choice",
    subject: "air-law",
    question: "What class of medical certificate is required for an EASA PPL(A)?",
    options: ["Class 1", "Class 2", "Class 3", "LAPL Medical"],
    correct: 1,
    explanation: "A PPL(A) requires at minimum a Class 2 medical certificate issued by an Aero Medical Examiner (AME)."
  },
  {
    id: "al-mc-007",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the validity period of a Class 2 medical for a pilot under 40 years of age?",
    options: ["12 months", "24 months", "36 months", "48 months"],
    correct: 1,
    explanation: "For pilots under 40, a Class 2 medical is valid for 60 months — except when carrying passengers, when it reduces to 24 months."
  },
  {
    id: "al-mc-008",
    type: "multiple-choice",
    subject: "air-law",
    question: "A PPL(A) holder wishes to fly a Single Engine Piston aircraft. What rating do they require?",
    options: ["TMG rating", "SEP(land) rating", "MEP rating", "IR rating"],
    correct: 1,
    explanation: "A Single Engine Piston land (SEP(land)) class rating is required to fly single engine piston aeroplanes."
  },
  {
    id: "al-mc-009",
    type: "multiple-choice",
    subject: "air-law",
    question: "How long is an SEP(land) class rating valid?",
    options: ["12 months", "18 months", "24 months", "36 months"],
    correct: 2,
    explanation: "An SEP(land) class rating is valid for 24 months. Revalidation requires either a proficiency check or meeting the experience requirements within the validity period."
  },
  {
    id: "al-mc-010",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the minimum cross-country solo flight time required for a PPL(A)?",
    options: ["3 hours", "5 hours", "8 hours", "10 hours"],
    correct: 1,
    explanation: "EASA requires at least 5 hours solo cross-country flight time as part of the PPL(A) training requirements."
  },
  {
    id: "al-mc-011",
    type: "multiple-choice",
    subject: "air-law",
    question: "Under EASA rules, what is the definition of a commercial air transport operation?",
    options: ["Any flight carrying passengers", "Any flight for remuneration or hire", "Any flight beyond national borders", "Any flight in IMC conditions"],
    correct: 1,
    explanation: "Commercial air transport means any operation for remuneration or hire. A PPL holder may not conduct commercial air transport operations."
  },
  {
    id: "al-mc-012",
    type: "multiple-choice",
    subject: "air-law",
    question: "A PPL(A) holder may share the direct costs of a flight with passengers under what condition?",
    options: ["At any time", "Only with family members", "As long as the pilot pays at least an equal share", "Only on domestic flights"],
    correct: 2,
    explanation: "PPL holders may share direct costs with passengers provided the pilot pays at least an equal share of those costs. They must not profit from the flight."
  },
  {
    id: "al-mc-013",
    type: "multiple-choice",
    subject: "air-law",
    question: "What does the Chicago Convention primarily establish?",
    options: ["International air traffic control procedures", "The principles governing international civil aviation", "Rules for military airspace", "Standards for aircraft maintenance"],
    correct: 1,
    explanation: "The Chicago Convention of 1944 established the principles and arrangements for international civil aviation and created ICAO."
  },
  {
    id: "al-mc-014",
    type: "multiple-choice",
    subject: "air-law",
    question: "What organisation was established by the Chicago Convention?",
    options: ["EASA", "ICAO", "Eurocontrol", "JAA"],
    correct: 1,
    explanation: "The International Civil Aviation Organisation (ICAO) was established by the Chicago Convention in 1944 to manage international civil aviation standards."
  },
  {
    id: "al-mc-015",
    type: "multiple-choice",
    subject: "air-law",
    question: "ICAO Standards and Recommended Practices are published in which documents?",
    options: ["AIP supplements", "NOTAMs", "Annexes to the Chicago Convention", "EASA regulations"],
    correct: 2,
    explanation: "ICAO publishes Standards and Recommended Practices (SARPs) in the Annexes to the Chicago Convention, of which there are 19."
  },
  {
    id: "al-mc-016",
    type: "multiple-choice",
    subject: "air-law",
    question: "Which ICAO Annex covers Rules of the Air?",
    options: ["Annex 1", "Annex 2", "Annex 6", "Annex 11"],
    correct: 1,
    explanation: "ICAO Annex 2 covers Rules of the Air, including right of way rules, flight plans, and signals."
  },
  {
    id: "al-mc-017",
    type: "multiple-choice",
    subject: "air-law",
    question: "When two aircraft are on a collision course at approximately the same altitude, which gives way?",
    options: ["The slower aircraft", "The aircraft on the left gives way to the aircraft on the right", "The aircraft on the right gives way to the aircraft on the left", "The higher aircraft"],
    correct: 1,
    explanation: "When two aircraft converge at approximately the same altitude, the aircraft on the left must give way to the aircraft on the right."
  },
  {
    id: "al-mc-018",
    type: "multiple-choice",
    subject: "air-law",
    question: "An aircraft in flight must give way to which of the following?",
    options: ["All other aircraft", "Aircraft that are overtaking", "Aircraft that are landing or on final approach", "Helicopters only"],
    correct: 2,
    explanation: "Aircraft that are landing or on final approach to land have right of way over aircraft in flight or on the ground."
  },
  {
    id: "al-mc-019",
    type: "multiple-choice",
    subject: "air-law",
    question: "When overtaking another aircraft, in which direction should you pass?",
    options: ["To the left", "To the right", "Above", "Below"],
    correct: 1,
    explanation: "When overtaking another aircraft, you should alter course to the right and pass well clear. The aircraft being overtaken has right of way."
  },
  {
    id: "al-mc-020",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the cruising level rule for VFR flights above 3000ft AMSL in EASA airspace?",
    options: ["Odd thousands heading East, even thousands heading West", "Odd thousands plus 500ft heading 000-179, even thousands plus 500ft heading 180-359", "Any altitude the pilot chooses", "Even thousands heading East, odd thousands heading West"],
    correct: 1,
    explanation: "VFR semi-circular cruising levels: odd thousands plus 500ft (e.g. 3500, 5500) when on magnetic tracks 000-179 degrees, even thousands plus 500ft (e.g. 4500, 6500) on tracks 180-359 degrees."
  },
  {
    id: "al-mc-021",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the standard VFR visibility minimum in Class G airspace below 3000ft AMSL?",
    options: ["1500m", "3000m", "5km", "8km"],
    correct: 0,
    explanation: "In Class G airspace at and below 3000ft AMSL or 1000ft AGL (whichever is higher), the minimum flight visibility for VFR is 1500 metres."
  },
  {
    id: "al-mc-022",
    type: "multiple-choice",
    subject: "air-law",
    question: "What are the VFR minima for Class G airspace below 3000ft — distance from cloud?",
    options: ["Clear of cloud", "1000ft below, 1000ft above, 1nm horizontal", "500ft below, 1000ft above, 1500m horizontal", "1000ft below, 500ft above, 2000m horizontal"],
    correct: 0,
    explanation: "In Class G airspace below 3000ft AMSL or 1000ft AGL, aircraft must remain clear of cloud and in sight of the surface."
  },
  {
    id: "al-mc-023",
    type: "multiple-choice",
    subject: "air-law",
    question: "What are the standard VFR visibility minima above 3000ft in Classes C, D, E, F and G?",
    options: ["3km", "5km", "8km", "10km"],
    correct: 1,
    explanation: "Above 3000ft AMSL or 1000ft AGL in Classes C, D, E, F and G airspace, the minimum flight visibility for VFR is 5km."
  },
  {
    id: "al-mc-024",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the lowest altitude a pilot may fly over a congested area of a city?",
    options: ["500ft AGL", "1000ft above the highest obstacle within 600m", "1500ft AGL", "2000ft above the highest obstacle within 1nm"],
    correct: 1,
    explanation: "Over congested areas, towns or settlements, aircraft must not fly below 1000ft above the highest obstacle within 600 metres of the aircraft."
  },
  {
    id: "al-mc-025",
    type: "multiple-choice",
    subject: "air-law",
    question: "Outside congested areas, what is the minimum altitude rule under EASA?",
    options: ["200ft AGL", "500ft AGL", "Not below a height that would allow an emergency landing without undue hazard to persons or property", "1000ft AGL"],
    correct: 2,
    explanation: "Outside congested areas, the rule is that aircraft must not fly so low as to create a hazard to persons or property on the surface, or below 500ft AGL except for take-off and landing."
  },
  {
    id: "al-mc-026",
    type: "multiple-choice",
    subject: "air-law",
    question: "What does a steady red light signal from ATC mean to an aircraft in flight?",
    options: ["Return to start", "Give way to other aircraft and continue circling", "Land at this aerodrome", "Do not land"],
    correct: 1,
    explanation: "A steady red light to an aircraft in flight means 'give way to other aircraft and continue circling'."
  },
  {
    id: "al-mc-027",
    type: "multiple-choice",
    subject: "air-law",
    question: "What does a green flashing light signal from ATC mean to an aircraft on the ground?",
    options: ["Cleared for take-off", "Cleared to taxi", "Return to starting point", "Stop"],
    correct: 1,
    explanation: "A flashing green light directed at an aircraft on the ground means 'cleared to taxi'."
  },
  {
    id: "al-mc-028",
    type: "multiple-choice",
    subject: "air-law",
    question: "What does a red flashing light signal from ATC mean to an aircraft on the ground?",
    options: ["Stop immediately", "Taxi clear of the runway in use", "Return to starting point", "Cleared for take-off"],
    correct: 1,
    explanation: "A flashing red light to an aircraft on the ground means 'taxi clear of the landing area or runway in use'."
  },
  {
    id: "al-mc-029",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is a NOTAM?",
    options: ["A weather report issued before flight", "A notice containing information about the establishment or condition of aeronautical facilities", "A mandatory ATC clearance", "A navigation chart amendment"],
    correct: 1,
    explanation: "A NOTAM (Notice to Airmen) is a notice containing information concerning the establishment, condition or change of any aeronautical facility, service, procedure or hazard."
  },
  {
    id: "al-mc-030",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the purpose of an AIP (Aeronautical Information Publication)?",
    options: ["To provide en-route weather forecasts", "To contain aeronautical information of a lasting character essential to air navigation", "To issue temporary flight restrictions", "To publish air traffic control frequencies only"],
    correct: 1,
    explanation: "The AIP contains aeronautical information of a lasting character essential to air navigation. It is published by each state's aviation authority."
  },
  {
    id: "al-mc-031",
    type: "multiple-choice",
    subject: "air-law",
    question: "What airspace class requires a clearance for both IFR and VFR flights?",
    options: ["Class C", "Class D", "Class A", "Class E"],
    correct: 2,
    explanation: "Class A airspace is IFR only — VFR flight is not permitted. All flights require an ATC clearance."
  },
  {
    id: "al-mc-032",
    type: "multiple-choice",
    subject: "air-law",
    question: "In which class of airspace can VFR flights operate without an ATC clearance?",
    options: ["Class A", "Class B", "Class C", "Class G"],
    correct: 3,
    explanation: "Class G is uncontrolled airspace. VFR flights do not require an ATC clearance, though radio contact may still be advisable."
  },
  {
    id: "al-mc-033",
    type: "multiple-choice",
    subject: "air-law",
    question: "What service is provided to all flights in Class D airspace?",
    options: ["No service", "Flight information service only", "Air traffic control service", "Advisory service only"],
    correct: 2,
    explanation: "Class D is controlled airspace. ATC service is provided to all flights, and both IFR and VFR flights require a clearance."
  },
  {
    id: "al-mc-034",
    type: "multiple-choice",
    subject: "air-law",
    question: "What does a VFR flight plan allow in an emergency?",
    options: ["Priority landing at any aerodrome", "Search and rescue to be initiated if overdue", "Automatic IFR clearance", "Access to Class A airspace"],
    correct: 1,
    explanation: "Filing a VFR flight plan means that if you are overdue at your destination, search and rescue operations can be initiated. It is strongly recommended for cross-country flights."
  },
  {
    id: "al-mc-035",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the universal emergency frequency?",
    options: ["118.0 MHz", "121.5 MHz", "123.45 MHz", "122.8 MHz"],
    correct: 1,
    explanation: "121.5 MHz is the international aeronautical emergency frequency. All aircraft are encouraged to monitor it when possible."
  },
  {
    id: "al-mc-036",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the correct order of priority for radio calls?",
    options: ["Distress, urgency, direction finding, safety", "Safety, urgency, distress, direction finding", "Urgency, distress, safety, direction finding", "Distress, safety, urgency, direction finding"],
    correct: 0,
    explanation: "The order of priority for radio transmissions is: distress (MAYDAY), urgency (PAN PAN), direction finding, meteorological, and then flight safety messages."
  },
  {
    id: "al-mc-037",
    type: "multiple-choice",
    subject: "air-law",
    question: "What prefix is used for a distress call?",
    options: ["PAN PAN", "SECURITE", "MAYDAY", "EMERGENCY"],
    correct: 2,
    explanation: "MAYDAY, spoken three times, is the international distress signal indicating a grave and imminent danger requiring immediate assistance."
  },
  {
    id: "al-mc-038",
    type: "multiple-choice",
    subject: "air-law",
    question: "What prefix indicates an urgency message?",
    options: ["MAYDAY", "PAN PAN", "SECURITE", "PRIORITY"],
    correct: 1,
    explanation: "PAN PAN, spoken three times, indicates an urgency condition — a serious situation that does not require immediate assistance but may do so if it deteriorates."
  },
  {
    id: "al-mc-039",
    type: "multiple-choice",
    subject: "air-law",
    question: "What does the prefix SECURITE indicate?",
    options: ["Distress", "Urgency", "A safety message containing important navigational or meteorological information", "An ATC clearance"],
    correct: 2,
    explanation: "SECURITE (spoken three times) is used for safety messages, typically important navigational warnings or meteorological information broadcast by ATC."
  },
  {
    id: "al-mc-040",
    type: "multiple-choice",
    subject: "air-law",
    question: "What transponder code should be selected in the event of a radio failure?",
    options: ["7500", "7600", "7700", "2000"],
    correct: 1,
    explanation: "Transponder code 7600 indicates radio failure. 7500 indicates unlawful interference (hijack), and 7700 indicates a general emergency."
  },
  {
    id: "al-mc-041",
    type: "multiple-choice",
    subject: "air-law",
    question: "What transponder code indicates an emergency?",
    options: ["7500", "7600", "7700", "7000"],
    correct: 2,
    explanation: "Squawk 7700 is the general emergency code. It alerts ATC immediately and triggers priority handling."
  },
  {
    id: "al-mc-042",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the standard VFR conspicuity transponder code in European airspace?",
    options: ["1200", "2000", "7000", "0000"],
    correct: 2,
    explanation: "In European airspace, 7000 is the standard VFR conspicuity code when no other code has been assigned by ATC."
  },
  {
    id: "al-mc-043",
    type: "multiple-choice",
    subject: "air-law",
    question: "A pilot is flying VFR and enters IMC inadvertently. What is the correct action?",
    options: ["Continue and descend below cloud", "Maintain heading and call ATC", "Execute a 180 degree turn to exit IMC and advise ATC", "Climb above cloud"],
    correct: 2,
    explanation: "The correct action is to execute a 180 degree turn to exit IMC as quickly as possible, then advise ATC of the situation. Continuing into IMC without an IR rating is extremely dangerous."
  },
  {
    id: "al-mc-044",
    type: "multiple-choice",
    subject: "air-law",
    question: "What document must be carried on board the aircraft at all times?",
    options: ["Pilot's logbook", "Certificate of airworthiness, registration, noise certificate, and radio licence", "Only the certificate of airworthiness", "Insurance documents only"],
    correct: 1,
    explanation: "The required documents on board are: Certificate of Airworthiness (C of A), Certificate of Registration, Noise Certificate (if applicable), Radio Licence, and proof of insurance."
  },
  {
    id: "al-mc-045",
    type: "multiple-choice",
    subject: "air-law",
    question: "Who is responsible for ensuring the aircraft is airworthy before flight?",
    options: ["The aircraft owner", "The maintenance organisation", "The pilot in command", "The CAA"],
    correct: 2,
    explanation: "The pilot in command is responsible for ensuring the aircraft is airworthy before flight, including conducting a pre-flight inspection."
  },
  {
    id: "al-mc-046",
    type: "multiple-choice",
    subject: "air-law",
    question: "Under EASA rules, what is the definition of night?",
    options: ["30 minutes after sunset to 30 minutes before sunrise", "The period between end of evening civil twilight and beginning of morning civil twilight", "When the sun is below the horizon", "1 hour after sunset to 1 hour before sunrise"],
    correct: 1,
    explanation: "Night is defined as the period between the end of evening civil twilight and the beginning of morning civil twilight. Civil twilight ends when the sun is 6 degrees below the horizon."
  },
  {
    id: "al-mc-047",
    type: "multiple-choice",
    subject: "air-law",
    question: "A PPL holder without a night rating may fly how long after sunset?",
    options: ["Not at all after sunset", "30 minutes after sunset", "Until end of civil twilight", "1 hour after sunset"],
    correct: 2,
    explanation: "Without a night rating, a PPL holder may fly until the end of civil twilight. Flying in the hours of darkness requires a night rating."
  },
  {
    id: "al-mc-048",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the alcohol limit for pilots under EASA regulations?",
    options: ["0.2 mg/ml blood alcohol", "0.2 g/100ml blood alcohol", "Same as the road driving limit", "Zero tolerance — no alcohol permitted"],
    correct: 1,
    explanation: "EASA regulations specify that pilots must not fly with a blood alcohol level of 0.2 grams per 100ml or more. Many authorities recommend zero alcohol before flying."
  },
  {
    id: "al-mc-049",
    type: "multiple-choice",
    subject: "air-law",
    question: "What action must a pilot take if they become aware of a medical condition that may affect flight safety?",
    options: ["Continue flying but inform passengers", "Cease exercising licence privileges and seek medical advice", "Reduce workload by flying only in good weather", "Inform ATC before each flight"],
    correct: 1,
    explanation: "If a pilot becomes aware of any medical condition that may affect their ability to fly safely, they must immediately cease exercising their licence privileges and seek medical advice."
  },
  {
    id: "al-mc-050",
    type: "multiple-choice",
    subject: "air-law",
    question: "What is the purpose of EASA?",
    options: ["To provide air traffic control across Europe", "To ensure a high uniform level of civil aviation safety across Europe", "To manage European military airspace", "To issue pilot licences directly to all European pilots"],
    correct: 1,
    explanation: "The European Union Aviation Safety Agency (EASA) is responsible for ensuring a high and uniform level of civil aviation safety across Europe through common standards and regulations."
  },
]

export default airLawMultipleChoice