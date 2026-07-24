"use client"
import React, { useState } from "react"

const synopsisData = {
  "air-law": {
    title: "Air Law",
    units: [
      {
        id: 1,
        name: "Regulatory Framework",
        content: [
            "## THE CHICAGO CONVENTION AND ICAO",
            "The foundation of all international civil aviation law is the Convention on International Civil Aviation, signed in Chicago in 1944 and entering into force in 1947. It established core principles still in force today, most importantly that every state holds complete and exclusive sovereignty over the airspace above its own territory. The Convention also created the International Civil Aviation Organization (ICAO), a specialised agency of the United Nations headquartered in Montreal, Canada, tasked with standardising the rules and practices of international aviation.",
            "ICAO does not have direct legal power over individual pilots or airlines. Instead, it develops Standards and Recommended Practices (SARPs), published in 19 technical Annexes to the Convention, covering everything from Personnel Licensing (Annex 1) to Rules of the Air (Annex 2), Airworthiness (Annex 8), and Accident Investigation (Annex 13). A Standard represents the minimum uniform practice recognised as necessary for safety; if a member state cannot comply, it must formally notify ICAO of the difference. A Recommended Practice is desirable but not mandatory.",
            "This structure means ICAO sets the global framework, but implementation and enforcement happen at the national or regional level. Understanding this three-tier relationship, ICAO at the international level, EASA at the regional level, and the National Competent Authority (NCA) at the national level, is essential to understanding how aviation law actually applies to a pilot on any given flight.",

            "## EASA AND THE REGIONAL FRAMEWORK",
            "The European Union Aviation Safety Agency (EASA), established in 2002, translates ICAO's global Standards into a single, harmonised, directly applicable set of regulations across its member states. Rather than each country writing its own separate rules (leading to inconsistency), EASA regulations apply uniformly, meaning a licence, rating, or approval issued in one EASA member state is recognised across all of them.",
            "EASA's regulatory framework is organised into numbered 'Parts', each covering a specific area. Part-FCL governs Flight Crew Licensing, setting the requirements for pilot licences and ratings, including the PPL(A). Part-M and Part-ML cover the continuing airworthiness of aircraft. Part-145 governs approved maintenance organisations. Part-ATO governs Approved Training Organisations, the flight schools certified to deliver EASA-compliant training. Part-CAT covers commercial air transport operations specifically.",
            "While EASA writes and adopts the rules, it does not directly interact with individual pilots. That responsibility falls to the National Competent Authority (NCA) of each member state, such as a national civil aviation authority, which actually issues licences, conducts oversight, and enforces the regulations day to day.",

            "## AERONAUTICAL INFORMATION AND DOCUMENTATION",
            "Every pilot needs access to reliable, current information about the airspace, aerodromes, and procedures relevant to their flight. This is provided through a structured system of aeronautical publications, each with a distinct purpose.",
            "The Aeronautical Information Publication (AIP) is the primary, permanent reference for a state's aviation infrastructure. It is organised into three main sections: GEN (General), containing national regulations, abbreviations, and units of measurement; ENR (En-Route), detailing airspace structure, ATS routes, and navigation aids outside of aerodromes; and AD (Aerodromes), providing detailed data for individual aerodromes including runway dimensions, lighting, and circuit procedures.",
            "Because aviation information changes constantly, temporary or urgent updates cannot wait for a full AIP reprint. NOTAMs (Notices to Airmen) exist for exactly this purpose, communicating short-notice or short-duration information such as a runway closure, an unserviceable navigation aid, or a temporary danger area. Checking current NOTAMs before every flight is a legal requirement, not just good practice.",
            "Between the permanent AIP and the brief NOTAM sits the AIP Supplement (SUP), used for temporary information that is too extensive or significant in duration to be effectively conveyed by a NOTAM alone, such as a major but temporary airspace restriction lasting several weeks. Aeronautical Information Circulars (AICs) serve a different purpose again: conveying explanatory or administrative information that doesn't require a NOTAM or a formal AIP amendment.",
            "Permanent changes to the AIP follow a predictable, standardised schedule known as the AIRAC (Aeronautical Information Regulation And Control) cycle, updated every 28 days. This fixed cycle gives operators, pilots, and chart producers advance, predictable notice of significant planned changes, rather than being surprised by them.",
            "Together, these documents form a layered information system: the AIP provides the stable baseline, NOTAMs and Supplements capture what has changed since, and AICs provide administrative context. A thorough pilot checks all of the relevant layers before every flight, not just one.",
        ],
        keyFacts: [
            "The Chicago Convention (1944) established ICAO and confirmed that every state has sovereignty over its own airspace",
            "There are 19 Annexes to the Chicago Convention — Annex 1 (Personnel Licensing), Annex 2 (Rules of the Air), Annex 8 (Airworthiness), and Annex 13 (Accident Investigation) are especially relevant to PPL study",
            "A Standard is mandatory (differences must be notified to ICAO); a Recommended Practice is not mandatory",
            "EASA (est. 2002) implements harmonised rules across member states — Part-FCL covers licensing, Part-M/ML covers continuing airworthiness, Part-145 covers maintenance organisations",
            "The National Competent Authority (NCA) of each state actually issues licences and enforces regulations day to day",
            "The AIP has three sections: GEN (general), ENR (en-route), and AD (aerodromes)",
            "NOTAMs convey urgent or temporary information; AIRAC amendments (every 28 days) convey permanent planned changes",
            "AIP Supplements are used for temporary information too extensive for a NOTAM; AICs convey explanatory or administrative information",
        ]
     },
      {
        id: 2,
        name: "Licences & Medical",
        content: [
            "## PPL(A) REQUIREMENTS AND STRUCTURE",
            "The Private Pilot Licence for Aeroplanes, PPL(A), is the foundational licence for most recreational and private flying under EASA. To be issued a PPL(A), an applicant must be at least 17 years old and have logged a minimum of 40 hours of flight time. This 40-hour minimum is not simply 40 hours of any flying, it must include at least 10 hours of supervised solo flight time, of which 5 hours must be solo cross-country flight, including one qualifying flight of at least 270km (150nm) with full-stop landings at two aerodromes other than the departure aerodrome.",
            "Training itself begins earlier than licence issue. A student pilot may fly solo from age 16, a full year before they are eligible for the licence itself. The course structure blends dual instruction (flying with an instructor) and supervised solo flight, with a minimum of 20 hours of dual instruction required within the 40-hour total. A limited amount of time in an approved synthetic training device or simulator may also be credited towards the total, subject to specific limits.",
            "Alongside the flying training, applicants must pass theoretical knowledge examinations covering all 9 PPL subjects: Air Law, Aircraft General Knowledge, Human Performance, Meteorology, Communications, Principles of Flight, Operational Procedures, Flight Performance and Planning, and Navigation. Each subject must be passed individually with a score of at least 75%, there is no averaging across subjects. Once an applicant begins sitting the theory exams, all 9 must be completed within 18 months of the end of the calendar month of their first attempt. Once all 9 are passed, that theoretical knowledge pass remains valid for 24 months, within which the practical skill test must be completed, or the theory pass expires and the exams must be retaken.",
            "The privileges of a PPL(A) are deliberately non-commercial: the holder may act as pilot in command or co-pilot on non-commercial flights, but may not be paid to fly. The one significant exception is cost-sharing, where a PPL holder may share the direct costs of a flight (fuel, landing fees, and similar) with up to 6 other occupants, provided no profit is made.",

            "## MEDICAL CERTIFICATION",
            "A pilot cannot legally exercise the privileges of a PPL(A), or any licence, without holding a valid medical certificate. For the PPL(A), this is a Class 2 medical certificate, issued by an Aeromedical Examiner (AME), a doctor specifically trained and authorised to conduct aviation medical examinations. A general practitioner without this specific authorisation cannot issue an aviation medical certificate.",
            "The validity period of a Class 2 medical depends on age: it is typically valid for 60 months (5 years) for pilots under 40, reducing to 24 months once the pilot turns 40, reflecting the increased likelihood of age-related medical issues. These specific periods can vary slightly by state, so a pilot should always check their own certificate for the exact expiry.",
            "Holding a valid certificate is necessary but not sufficient. The regulatory system also places an ongoing, personal responsibility on the pilot to self-assess their fitness before every individual flight, not just at the periodic medical examination. This is because day-to-day fitness can vary due to factors a formal medical exam, conducted perhaps years apart, cannot capture: a minor illness, fatigue, recent alcohol consumption, or the side effects of a newly prescribed medication. The core principle taught throughout aviation medicine is simple: if in doubt, don't fly.",
            "A pilot who experiences any significant decrease in medical fitness, a new diagnosis, a change in medication, a worsening condition, has an obligation to seek advice from their AME even if their existing certificate has not yet expired. The certificate reflects fitness at the time of the examination; it is not a guarantee of ongoing fitness regardless of what happens afterwards.",

            "## RATINGS, CURRENCY, AND REVALIDATION",
            "A PPL(A) on its own does not permit a pilot to fly any aeroplane; it must be accompanied by the appropriate class rating. The Single-Engine Piston (SEP) class rating is the standard rating obtained alongside the PPL(A) itself and permits flight in single-engine piston aeroplanes. Additional ratings extend privileges further: a Multi-Engine Piston (MEP) rating is required for twin-engine aircraft, a night rating permits flight after the end of civil twilight, and a Flight Instructor (FI) rating is required to teach other pilots.",
            "Unlike the PPL(A) itself, which does not expire, class ratings such as SEP have a limited period of validity, typically 24 months, and must be revalidated to remain current. There are two accepted routes to revalidation. The first is through recent flight experience: if the pilot has accumulated sufficient flight hours (including hours as PIC and hours within the preceding 12 months) within the validity period, an instructor can sign off the revalidation without any further test. The second route is a proficiency check with a suitably qualified examiner, which can be used regardless of recent experience.",
            "If a rating is allowed to lapse entirely, straightforward revalidation is no longer possible and the pilot must instead go through renewal, a generally more demanding process involving refresher training (as an instructor determines is necessary) and a proficiency check with an examiner. The longer a rating has lapsed, the more extensive this renewal process tends to be.",
            "Beyond the ratings themselves, a pilot must also maintain day-to-day recency to legally carry passengers. A pilot who has not carried passengers in the preceding 90 days must first complete 3 take-offs and landings before doing so again. If passengers are to be carried at night, at least one of those 3 take-offs and landings within the preceding 90 days must also have been at night. These currency requirements exist because flying skill, particularly the more perishable skills like landing judgement, genuinely deteriorates without regular practice, and the regulatory framework reflects that reality rather than treating a licence as a permanent, unchanging qualification.",
        ],
        keyFacts: [
            "PPL(A): minimum age 17, minimum 40 hours total (10 hours solo, including 5 hours solo cross-country with a 150nm qualifying flight)",
            "Solo flight can begin at 16, a year before licence issue is possible",
            "All 9 theory subjects must be passed at 75%+, completed within 18 months of the first attempt, with the pass valid for 24 months before the skill test",
            "PPL(A) privileges are non-commercial, except limited cost-sharing with up to 6 other occupants",
            "A Class 2 medical (issued by an AME) is required — typically valid 60 months under 40, 24 months from age 40",
            "The core aeromedical principle: if in doubt, don't fly — self-assessment is required before every flight, not just at the medical exam",
            "SEP class rating is valid 24 months and can be revalidated via recent experience (instructor sign-off) or a proficiency check with an examiner",
            "A lapsed rating requires renewal (refresher training + proficiency check), not simple revalidation",
            "Passenger-carrying currency: 3 take-offs and landings within the preceding 90 days (one at night if carrying passengers at night)",
        ]
     },
      {
        id: 3,
        name: "Rules of the Air",
        content: [
            "## RIGHT OF WAY",
            "When two or more aircraft are converging, sharing the sky safely depends on both pilots reacting to a common, predictable set of rules rather than each guessing what the other will do. The general converging rule states that when two aircraft are converging at approximately the same altitude, the aircraft to the other's right has right of way, and the other aircraft must give way, avoiding crossing ahead unless it can remain well clear.",
            "A head-on situation is treated differently. When two aircraft are approaching head-on, or nearly so, with a risk of collision, both pilots must alter course to the right, ensuring both aircraft pass on each other's left side. Overtaking follows its own logic too: the aircraft being overtaken always retains right of way, and the overtaking aircraft must alter course to the right to pass, never to the left, and must not resume its original course until well clear.",
            "Beyond these general rules, a hierarchy exists between different categories of aircraft, reflecting their relative ability to manoeuvre. Balloons, having essentially no directional control, sit at the top and have right of way over airships, gliders, and powered aeroplanes. Airships have right of way over gliders and aeroplanes. Gliders, unable to climb or go around under their own power, have right of way over powered aeroplanes. Powered aeroplanes, having the greatest flexibility and control, give way to all of the above.",
            "Aircraft landing, or in the final stages of approaching to land, generally have right of way over aircraft still manoeuvring in the air. Among multiple aircraft landing, the one at the lower altitude generally has priority, or the one that established itself on final approach first if the aircraft are at a similar height, though this priority must never be used to justify cutting in front of or overtaking another aircraft already on approach. An aircraft in the air always has right of way over an aircraft moving on the surface, and an aircraft known to be in distress overrides the normal right-of-way order entirely, taking absolute priority.",
            "It is worth emphasising that having right of way never removes a pilot's underlying responsibility to avoid a collision. If a collision risk develops, both pilots must act, regardless of who technically had priority under the rules.",

            "## VMC MINIMA AND THE SEMI-CIRCULAR RULE",
            "Visual flight rules depend on the pilot maintaining adequate visual reference to navigate safely and to see and avoid other traffic. The specific minima, in terms of flight visibility and distance from cloud, vary by altitude and airspeed, generally becoming stricter as either increases, reflecting the reduced time available to react at higher closing speeds.",
            "In Class G airspace below 3000ft AMSL (or 1000ft above terrain, whichever is higher) and at or below 140kt IAS, the requirement is comparatively relaxed: 1500m flight visibility, remaining clear of cloud and in sight of the surface. Above that altitude, or at higher speed, the standard requirement increases to 8km flight visibility, with the aircraft required to remain 1500m horizontally and 1000ft vertically clear of cloud. Being 'in sight of the surface' means maintaining continuous, adequate visual reference sufficient to navigate and avoid obstacles, not merely catching an occasional glimpse of the ground through gaps in cloud.",
            "Where a control zone's weather is below the standard VMC minima, VFR flight may still sometimes be possible under a Special VFR (SVFR) clearance from ATC, which permits flight at reduced minima, commonly around 1500m visibility, clear of cloud and in sight of the surface, but only with an ATC clearance and only within the control zone itself.",
            "Separately from visibility minima, the semi-circular rule (also called the quadrantal rule in some systems) governs which cruising altitude a VFR or IFR flight should use, based on magnetic track, to provide vertical separation between aircraft travelling in broadly opposite directions. Under the standard system, a magnetic track of 000° to 089° or 270° to 359° (broadly northbound or westbound) uses even thousands of feet plus 500ft for VFR (e.g. 4500ft), while a track of 090° to 269° (broadly eastbound or southbound) uses odd thousands plus 500ft (e.g. 5500ft). The additional 500ft offset compared to the equivalent IFR cruising levels provides further vertical separation between VFR and IFR traffic travelling in the same general direction.",

            "## VISUAL SIGNALS",
            "Radio communication can fail, and not every aircraft carries a radio at all, so a standardised system of visual signals exists to allow essential communication between ATC and aircraft even without voice contact. These signals use a light gun to project a coloured beam, and their meanings differ depending on whether the receiving aircraft is in flight or on the ground.",
            "For an aircraft in flight, a steady green light means cleared to land, while a flashing green light means return for landing, i.e. join the circuit and prepare to land rather than being immediately cleared. A steady red light means give way to other aircraft and continue circling, while a flashing red light is more serious still: the aerodrome is unsafe, do not land. For an aircraft on the ground, a steady green light means cleared for take-off, and a flashing green light means cleared to taxi. A steady red light on the ground means stop, and a flashing red light means taxi clear of the landing area in use.",
            "Two further signals apply in both situations. A flashing white light means return to your starting point, whether that is a position on the aerodrome (on the ground) or in the traffic circuit (in flight). Alternating red and green lights are a general caution signal, applicable to aircraft both in the air and on the ground, meaning exercise extreme caution.",
            "Acknowledgement matters too: a pilot who receives a light signal in flight during daylight acknowledges it by rocking the wings; at night, by flashing the landing or navigation lights on and off twice. Because these meanings are standardised internationally under ICAO Annex 2, a pilot does not need to check country-specific variations before relying on them, though if a signal is ever ambiguous or difficult to see clearly, the safest interpretation should always be assumed and extreme caution exercised.",
        ],
        keyFacts: [
            "Converging aircraft: the aircraft on the right has right of way; head-on aircraft both turn right; the aircraft being overtaken has right of way",
            "Right-of-way hierarchy: balloons > airships > gliders > powered aeroplanes",
            "Aircraft in flight have right of way over aircraft on the surface; an aircraft in distress overrides all normal priority",
            "Class G below 3000ft AMSL / 140kt IAS: 1500m visibility, clear of cloud, in sight of surface",
            "Above 3000ft AMSL or 140kt IAS: 8km visibility, 1500m horizontal / 1000ft vertical from cloud",
            "Special VFR (SVFR) allows reduced minima flight in a control zone with an ATC clearance",
            "Semi-circular rule: tracks 090°-269° use odd thousands + 500ft; tracks 270°-089° use even thousands + 500ft (VFR)",
            "Light signals (in flight): steady green = cleared to land; flashing red = aerodrome unsafe, do not land",
            "Light signals (on ground): steady green = cleared for take-off; flashing green = cleared to taxi; steady red = stop",
            "Acknowledge light signals by rocking wings (day) or flashing lights twice (night)",
        ]
     },
      {
        id: 4,
        name: "Airspace & Aerodromes",
        content: [
            "## AIRSPACE CLASSIFICATION",
            "ICAO's alphabetic airspace classification system, from Class A through Class G, defines what service a pilot receives and what rules apply in any given block of airspace. Understanding the practical differences between these classes, rather than simply memorising the letters, is essential for both the exam and for real flight planning.",
            "Class A is the most restrictive: only IFR flight is permitted, every flight requires an ATC clearance, and all aircraft receive full separation from all other aircraft. VFR flight is never permitted in Class A under any circumstances. Class C requires an ATC clearance for both IFR and VFR flights; VFR flights receive full separation from IFR traffic, but only traffic information, not full separation, in respect of other VFR flights. Class D also requires an ATC clearance for entry, along with two-way radio contact established before crossing the boundary, though the separation service provided to VFR flights is more limited again than in Class C.",
            "Class E permits VFR flight without requiring an ATC clearance; IFR flights receive separation from other IFR flights, and VFR flights receive traffic information where relevant, but VFR flights are not separated from each other. Class G, the least restrictive and by far the most common classification encountered by VFR light aircraft pilots, is uncontrolled airspace: no clearance is required, no separation is provided of any kind, and pilots are entirely responsible for their own separation using the see-and-avoid principle, though a Flight Information Service can be requested if desired, providing useful information without any separation guarantee.",
            "Airspace classification is not static with geography alone, it commonly changes with altitude at the same location, transitioning for example from Class G near the surface, to Class E at a mid-level, to Class A at high altitude, all directly above the same patch of ground. The relevant VFR chart, supported by the AIP, is the correct reference for identifying exactly what classification applies along any planned route, at any planned altitude.",
            "Entering controlled airspace without the required clearance is an airspace infringement, a serious event that is actively monitored and typically investigated by the relevant authority, often resulting in mandatory further education or, in more serious or repeated cases, licensing action. The most effective defence against an unintentional infringement is thorough pre-flight chart study combined with accurate, ongoing navigation and ongoing situational awareness throughout the flight, rather than any single technique in isolation.",

            "## AERODROME OPERATIONS AND THE TRAFFIC CIRCUIT",
            "An Aerodrome Traffic Zone (ATZ) is airspace of defined dimensions established around certain aerodromes specifically to protect the traffic operating in the vicinity. Where the aerodrome has an active ATC unit, two-way radio contact must generally be established before entering the ATZ.",
            "Within the traffic circuit itself, a standard, predictable pattern of legs exists specifically to make every aircraft's position and intentions predictable to every other pilot in the vicinity, which is the single greatest safety benefit of using a circuit at all rather than each pilot manoeuvring independently. The default direction, unless a specific aerodrome publishes otherwise, is left-hand turns throughout the circuit. The standard legs are, in order: the crosswind leg, flown perpendicular to the runway shortly after take-off; the downwind leg, flown parallel to, but in the opposite direction of, the landing direction; the base leg, again perpendicular to the runway, connecting downwind to final; and final approach itself, flown directly towards the runway in the landing direction.",
            "At an aerodrome without ATC, various ground signals can convey essential information to arriving pilots. A landing 'T' indicates the direction aircraft should land in. A dumbbell-shaped signal indicates that gliders and powered aircraft use different parts of the landing area, requiring extra caution. For an unfamiliar aerodrome, a common and sensible technique is to overfly above circuit height first, assessing wind direction, the runway and circuit direction in use, and other traffic, before descending on the 'dead side' (the side of the aerodrome opposite the active circuit) to join the 'live side' circuit appropriately, an approach generally known as an overhead join.",
            "Aerodromes sometimes publish non-standard circuits, most commonly a right-hand rather than left-hand pattern, typically to account for local factors such as high terrain or obstacles on one side, noise abatement requirements over nearby residential areas, or proximity to other aerodromes or controlled airspace. This published information is found in the AD section of the AIP and should always be checked before arriving anywhere unfamiliar.",

            "## SPECIAL RULES AIRSPACE",
            "Beyond the standard classification system, several specific categories of airspace exist to protect particular hazardous or sensitive activities. A Prohibited Area is airspace within which flight is not permitted under any circumstances, with no mechanism for obtaining an exemption; a route must simply be planned to avoid it entirely. A Restricted Area permits flight subject to specified conditions, commonly requiring prior permission from the controlling authority, distinguishing it clearly from the absolute nature of a Prohibited Area. A Danger Area is airspace within which activities dangerous to aircraft, such as weapons firing, parachuting, or rocket launches, may take place at specified times, and is typically only active during the periods when that hazardous activity is actually occurring, information that should always be checked via current NOTAMs before flight.",
            "A Military Air Traffic Zone (MATZ) is established around certain military aerodromes to protect the fast-moving military traffic operating in the vicinity. While the specific legal requirement can vary by state, it is strongly recommended good practice for a civilian VFR pilot to contact the relevant military unit and request a MATZ penetration service before transiting, given how significantly military fast jets' high closing speeds reduce the time available for either pilot to see and avoid a developing conflict. If radio contact cannot be established, the generally safer course of action is to route around the MATZ rather than penetrate it without any coordination.",
            "Even with a MATZ penetration service and traffic information provided, the civilian pilot remains ultimately responsible for maintaining their own separation, the service is informational, supporting the see-and-avoid principle rather than replacing it. All of these special rules airspace types, Prohibited, Restricted, Danger Areas, and MATZs, are depicted on the relevant VFR chart with a specific boundary and identifier, and their status can change over time, so current NOTAMs and the current AIP should always be checked before flight rather than relying on information remembered from a previous flight.",
        ],
        keyFacts: [
            "Class A: IFR only, clearance required, full separation for all — VFR never permitted",
            "Class C: clearance required for both IFR and VFR; VFR separated from IFR only (traffic info re: other VFR)",
            "Class D: clearance + two-way radio required before entry",
            "Class E: no clearance needed for VFR; IFR separated from IFR only",
            "Class G: uncontrolled — no clearance, no separation service, pilot self-separates (FIS available on request)",
            "Airspace class can change with altitude over the same location — always check the current chart and AIP",
            "Standard circuit direction is left-hand unless published otherwise; legs are crosswind, downwind, base, final",
            "Overhead join: cross above circuit height, descend on the 'dead side', join the 'live side' circuit",
            "Prohibited Area = no entry ever; Restricted Area = entry only under specified conditions/permission",
            "Danger Areas are active only at specified times — always check current NOTAMs",
            "MATZ penetration service is recommended good practice; the pilot remains responsible for own separation regardless",
        ]
     },
      {
        id: 5,
        name: "Limitations & Emergencies",
        content: [
            "## AIRCRAFT DOCUMENTS AND CONTINUING AIRWORTHINESS",
            "An aircraft must carry a specific set of documents on board for a flight to be legal, and the pilot in command bears ultimate responsibility for confirming these are valid and present before departure, not the aircraft owner, not the flying club, the pilot flying that day. The Certificate of Registration confirms the aircraft's registration marks, nationality, and registered owner. The Certificate of Airworthiness confirms that, at the time of issue, the aircraft conforms to its approved type design and is in a condition for safe operation. Where radio equipment is fitted, a Radio Licence is also required, and many aircraft additionally carry a Noise Certificate confirming compliance with applicable noise limits.",
            "The Certificate of Airworthiness is not a one-time, permanent stamp of approval. Its continued validity is typically supported by an Airworthiness Review Certificate (ARC), confirming that a periodic review of the aircraft's continuing airworthiness has been satisfactorily completed. If the ARC lapses, the underlying Certificate of Airworthiness is no longer effectively in force, and the aircraft must not be flown until it has been properly renewed, regardless of how minor the lapse might seem.",
            "Not every aircraft holds a standard Certificate of Airworthiness. Amateur-built (homebuilt) and other experimental aircraft that do not conform to a standard approved type design instead typically operate under a Permit to Fly, a distinct but similarly essential form of airworthiness approval.",
            "Behind these formal certificates sits the aircraft's ongoing maintenance record, often summarised in a technical log, where pilots record any defects noted during flight and maintenance personnel track and rectify issues. Not every defect grounds an aircraft immediately, many minor defects can be properly assessed and deferred under a Minimum Equipment List or equivalent procedure, but the overall system of rigorous documentation and record-keeping exists because continuing airworthiness assurance is fundamental to flight safety, given the severe consequences a genuine in-flight structural or mechanical failure can have.",

            "## PERSONAL LIMITATIONS",
            "Beyond the aircraft's documentation, a pilot's own personal fitness is subject to specific legal and practical limits. EASA sets a maximum permitted blood alcohol concentration of 0.2 g/100ml for pilots and other aviation personnel, a notably lower limit than typically applies to driving a car in many countries, reflecting how sensitive complex decision-making, spatial orientation, and multitasking are to alcohol's impairing effects, particularly at altitude. A commonly cited minimum guideline of at least 8 hours 'from bottle to throttle' after any alcohol consumption is a minimum only, not a guarantee; individual factors such as the amount consumed, personal metabolism, and accumulated fatigue mean a pilot should always assess their own fitness rather than relying purely on elapsed time.",
            "Medication, including common over-the-counter remedies, must also be considered carefully. A pilot beginning a new prescription, or even a simple antihistamine for seasonal allergies, should consider both the underlying condition being treated and any potential side effects, drowsiness being a particularly relevant one, before flying, seeking advice from their AME if there is any uncertainty. A common cold with congestion carries its own specific aeromedical concern: difficulty equalising pressure in the ears and sinuses during altitude changes, which can cause significant pain or barotrauma.",
            "Fatigue deserves particular attention because, unlike alcohol, it carries no specific legal blood-test limit, yet can impair cognitive performance, reaction time, and decision-making to a degree genuinely comparable to alcohol intoxication. Multiple contributing factors, mild fatigue, a recent minor illness, a small amount of alcohol the night before, none individually disqualifying on its own, can combine to produce a level of impairment considerably greater than any single factor considered in isolation, which is why an honest, holistic self-assessment matters more than mechanically checking a single specific rule.",
            "The unifying principle behind all of this is straightforward: if in doubt, don't fly. Since no external system reliably confirms a pilot's personal fitness on any given day, this ongoing responsibility for honest self-assessment before every individual flight rests with the pilot in command alone, and applies equally whether the flight is a short local circuit or a demanding cross-country trip.",

            "## DISTRESS, URGENCY, AND SEARCH AND RESCUE",
            "When a situation in flight becomes serious, standardised radiotelephony procedures exist to communicate exactly how serious, clearly and immediately, to ATC and to any other aircraft listening. MAYDAY, spoken three times, is reserved for grave and imminent danger requiring immediate assistance. PAN PAN, also spoken three times, is used for a serious situation that does not, at that time, involve grave and imminent danger, for example a partial engine failure where the aircraft remains controllable and a safe landing still appears achievable. A PAN PAN call takes priority over all routine communications, second only to an active MAYDAY.",
            "An aircraft that has declared a MAYDAY generally retains priority handling from ATC and from other aircraft until the emergency is resolved, downgraded, or formally cancelled by the pilot; once resolved, the pilot should inform ATC so the emergency status can be properly stood down. Other stations hearing a distress call are expected to maintain silence on that frequency unless they can offer direct assistance or communication becomes operationally necessary, and a pilot who overhears a MAYDAY call but is uncertain whether ATC has received it should attempt to relay the details.",
            "Alongside voice procedures, the transponder provides a parallel, independent means of signalling an emergency via ATC radar. Squawking 7700 indicates a general emergency. Squawking 7600 indicates a radio communication failure, allowing ATC to remain aware of the aircraft's situation via radar even though voice contact has been lost. Squawking 7500 indicates unlawful interference, such as a hijacking, prompting an immediate and serious response from ATC and security authorities. These specific codes should never be set accidentally, and every pilot should be able to recall them instantly under pressure.",
            "Beyond the immediate radio and transponder procedures, search and rescue (SAR) organisations, typically coordinated through a Rescue Coordination Centre (RCC), are responsible for actually locating and rescuing an aircraft in distress, working alongside ATC. An Emergency Locator Transmitter (ELT), fitted to many aircraft, is designed to activate automatically upon significant impact forces, transmitting a distress signal that can substantially improve the speed and success of a rescue after an accident.",
            "Ultimately, all of these formal procedures, phraseology, squawk codes, and organisations, exist to support one underlying priority, not to replace it: aviate, navigate, then communicate. Flying the aircraft and managing the actual situation always comes first; the standardised distress and urgency system exists purely to make the communication and coordination that follows as fast and unambiguous as possible, precisely when workload and stress are already at their highest.",
        ],
        keyFacts: [
            "Required aircraft documents: Certificate of Registration, Certificate of Airworthiness, Radio Licence (if fitted), often a Noise Certificate",
            "An Airworthiness Review Certificate (ARC) supports ongoing validity of the Certificate of Airworthiness — if it lapses, the aircraft must not be flown",
            "Amateur-built/experimental aircraft typically fly under a Permit to Fly rather than a standard Certificate of Airworthiness",
            "Maximum blood alcohol limit for pilots: 0.2 g/100ml — 8 hours 'bottle to throttle' is a minimum guideline, not a guarantee",
            "Core aeromedical principle: if in doubt, don't fly — applies to alcohol, medication, illness, and fatigue alike",
            "Fatigue can impair performance comparably to alcohol, despite having no specific legal limit",
            "MAYDAY (x3) = grave and imminent danger; PAN PAN (x3) = serious but not immediately dangerous",
            "Squawk 7700 = general emergency; 7600 = radio failure; 7500 = unlawful interference",
            "An aircraft in distress retains priority until the pilot cancels or downgrades the emergency",
            "ELT = Emergency Locator Transmitter, assists SAR by automatically broadcasting after significant impact",
            "Underlying priority in any emergency: aviate, navigate, then communicate",
        ]
     },
    ]
  },
    "agk": {
    title: "Aircraft General Knowledge",
    units: [
        {
        id: 1,
        name: "Airframes & Systems",
        content: [
        "## AIRFRAME STRUCTURE",
        "An aircraft's airframe is the complete structural assembly that gives the aircraft its shape and carries all loads. Understanding airframe construction is essential not just for the exam but for recognising airworthiness issues during pre-flight inspection.",
        "There are two principal construction methods used in light aircraft. Truss construction uses a framework of welded steel tubes forming triangular structures (trusses) which are inherently rigid. The skin is non-structural and simply covers the frame. This method is strong and easy to repair but heavy. Semi-monocoque construction — the standard for modern light aircraft — uses a stressed skin which carries structural loads in combination with an internal framework of frames (or formers), bulkheads, stringers, and longerons. This produces a strong, lightweight structure. The term monocoque means the skin carries all loads alone (rare in practice); semi-monocoque means the skin shares loads with internal members.",

        "## WINGS",
        "The wing is the primary lift-generating structure and must withstand bending, twisting, and shear forces simultaneously. The internal structure consists of spars (the main longitudinal load-bearing members running spanwise — most wings have two spars, front and rear), ribs (transverse members that maintain the aerofoil cross-section shape), and stringers (longitudinal members between spars that stiffen the skin and transmit loads).",
        "Wings are classified by their attachment method. Cantilever wings are self-supporting with no external bracing — all loads are carried internally. This is the most aerodynamically efficient design. Strut-braced wings use external struts or wires to transfer some wing loads to the fuselage — common on high-wing aircraft such as the Cessna 172. While slightly less aerodynamically clean, they allow a lighter internal wing structure.",
        "Wing loading (weight divided by wing area) determines stall speed and handling characteristics. A higher wing loading means higher stall speed and less sensitivity to gusts. Wing sweep, dihedral (upward angle of wing from horizontal), and washout (decreasing angle of incidence from root to tip) are all design features that affect stability.",

        "## FLIGHT CONTROLS",
        "Primary flight controls directly control the three axes of rotation. Ailerons are hinged surfaces on the outboard trailing edge of each wing, operated differentially (one goes up, the other goes down) to control roll about the longitudinal axis. The elevator is a hinged surface on the horizontal stabiliser controlling pitch about the lateral axis. The rudder is a hinged surface on the vertical stabiliser (fin) controlling yaw about the normal (vertical) axis. All primary controls are connected to the cockpit controls via cables, pushrods, or a fly-by-wire system.",
        "Adverse yaw occurs when the aircraft rolls — the lowered aileron (generating more lift) also generates more induced drag, yawing the nose towards the raised wing (opposite to the intended turn direction). This is countered by differential ailerons (the up-going aileron deflects more than the down-going one), Frise ailerons (the leading edge of the up-going aileron protrudes below the wing, creating drag on the descending side), or by application of coordinated rudder in the direction of turn.",
        "Secondary or auxiliary controls modify the performance or flying characteristics of the primary control surfaces. Trim tabs are small hinged surfaces on the trailing edge of primary control surfaces. When deflected, they create a force that balances the aerodynamic load on the main surface, relieving the pilot of the need to apply continuous force. A fixed trim tab is bent on the ground for correction; an adjustable trim tab is controlled from the cockpit. An anti-servo tab moves in the same direction as the control surface (fitted to some stabilators) to increase control forces and prevent over-control.",

        "## FLAPS",
        "Flaps are the most important high-lift device on light aircraft. They increase the camber of the wing and in some designs also increase the wing area, producing more lift at any given speed. This allows the aircraft to fly safely at lower speeds for approach and landing.",
        "Plain flaps are a simple hinged section of the trailing edge that deflects downward. Straightforward and reliable but the least efficient type — significant turbulence forms at the hinge line.",
        "Split flaps deflect only the lower surface of the trailing edge. They produce more drag than a plain flap for a similar lift increase — sometimes desirable for steep approaches.",
        "Slotted flaps have a slot (gap) between the flap leading edge and the wing that allows high-energy air from below the wing to flow over the top of the flap, re-energising the boundary layer and delaying separation. This maintains lift to higher flap angles. The most common type on light training aircraft.",
        "Fowler flaps move rearward on tracks as they deploy, increasing the wing chord (and therefore area) before also deflecting downward. This provides the greatest increase in lift for the least increase in drag at partial deployment — highly efficient. Found on more advanced light aircraft and most airliners.",
        "The effect of flap extension: small flap angles (0-20°) produce a large lift increase with modest drag — useful for take-off. Large flap angles (20-40°+) produce comparatively less additional lift but significantly more drag — useful for landing as they steepen the approach path without increasing speed. The stall speed decreases as flap is extended but the stall itself may be more abrupt. Always retract flaps progressively after take-off to avoid a sudden loss of lift.",

        "## LANDING GEAR",
        "The landing gear supports the aircraft on the ground, absorbs landing loads, and provides steering capability. Tricycle (nosewheel) gear has two main wheels aft of the CG and one nosewheel forward. This is the most common configuration in modern light aircraft. Advantages include excellent forward visibility on the ground, natural deceleration without the tendency to nose-over, and straightforward ground handling. The nosewheel provides steering connected to the rudder pedals.",
        "Conventional (tailwheel) gear has two main wheels forward of the CG and a small tailwheel. Found on older designs, aerobatic aircraft, and bush planes. Requires more skill for ground handling — the aircraft is inherently unstable on the ground and prone to groundlooping (rapid uncontrolled swing). Better for rough or unprepared surfaces as the propeller has greater ground clearance.",
        "Shock absorption types: Oleo-pneumatic struts (most common) use a combination of hydraulic oil and compressed nitrogen — the oil provides damping, the gas provides the spring effect. Solid spring steel legs (common on Cessna aircraft) flex on landing providing shock absorption without any fluid. Rubber bungee cords are found on older tailwheel designs.",
        "Retractable gear reduces aerodynamic drag in flight, improving cruise speed and fuel efficiency. Safety features include gear warning systems (horn and light if gear is not down when power is reduced), gear position indicators, and manual extension systems for emergencies. Before every landing, confirm gear is down and locked using the checklist.",

        "## FUEL SYSTEM",
        "Aviation fuel must match the engine specification exactly. AVGAS (aviation gasoline) grades are identified by colour: AVGAS 100LL (Low Lead) is dyed blue and is the most common grade worldwide, suitable for most piston aircraft engines. AVGAS 100 is dyed green and has a higher lead content (now rare). Mogas (automotive gasoline) may be approved for use in some aircraft under a supplemental type certificate but must never be used without explicit approval.",
        "Fuel tanks are usually located in the wings, either as wet wings (the wing structure itself forms the tank, sealed with sealant) or bladder tanks (flexible rubber tanks inside the wing structure). Fuel quantity gauges are float-operated and are only required to be accurate at the empty position — always visually verify fuel quantity during pre-flight by opening the tank and checking with a calibrated dipstick or by direct visual inspection.",
        "The fuel selector valve allows the pilot to select which tank feeds the engine (LEFT, RIGHT, BOTH, or OFF). High-wing aircraft typically gravity-feed fuel to the engine. Low-wing aircraft require a fuel pump — they have both an engine-driven pump and an electric auxiliary pump. The auxiliary pump is used for start, take-off, and landing as a backup.",
        "The gascolator (fuel strainer or fuel/water separator) collects water and sediment at the lowest point of the fuel system and must be drained during pre-flight. Water contamination is the most common fuel system hazard — water sinks below AVGAS (which is less dense) and collects at low points. Water in the fuel causes engine roughness and can cause complete engine failure. Fuel should be clear and bright with the correct colour — cloudy or discoloured fuel indicates contamination and must not be used.",
        ],
        keyFacts: [
            "Semi-monocoque structure — skin carries structural loads alongside frames and stringers",
            "Cantilever wings have no external bracing; strut-braced wings use external struts",
            "Fowler flaps are most efficient — they increase both camber and wing area",
            "Tricycle gear gives better visibility and ground stability than tailwheel",
            "AVGAS 100LL is blue — always visually check fuel grade and quantity pre-flight",
            "Gascolator/fuel strainer removes water and sediment — drain during pre-flight",
            "Oleo-pneumatic struts use oil and nitrogen gas to absorb landing loads",
            "Flap drag increases more rapidly than lift at higher deflection angles",
        ]
        },
        {
        id: 2,
        name: "Piston Engines",
        content: [
        "## THE FOUR-STROKE CYCLE",
        "The vast majority of light aircraft are powered by four-stroke, spark-ignition, air-cooled, horizontally-opposed piston engines. Understanding how these engines work — and what can go wrong — is fundamental to safe operation and essential for the EASA PPL exam.",
        "Induction stroke: The piston moves downward, the intake valve opens, and the fuel-air mixture is drawn into the cylinder from the carburettor or fuel injection system. The exhaust valve remains closed. The mixture is typically 15 parts air to 1 part fuel by weight (the stoichiometric ratio) but varies with mixture control position.",
        "Compression stroke: Both valves close. The piston moves upward, compressing the fuel-air mixture into the combustion chamber above the piston. The compression ratio is typically 7:1 to 9:1 in naturally aspirated piston aircraft engines. High compression ratios improve efficiency but require higher octane fuel to prevent detonation.",
        "Power stroke: Just before the piston reaches Top Dead Centre (TDC), both spark plugs fire simultaneously. The burning mixture expands rapidly, forcing the piston downward with great force. This is the only stroke that produces power — the other three consume power. The crankshaft converts the linear motion of the piston into rotational motion.",
        "Exhaust stroke: The exhaust valve opens and the piston moves upward, expelling the burned gases through the exhaust system. At the end of the exhaust stroke, the intake valve begins to open (valve overlap) to start the next induction stroke.",

        "## ENGINE CONFIGURATION AND NAMING",
        "Light aircraft engines are described by a standard naming convention. The letters before the displacement describe the configuration: O = Horizontally Opposed (cylinders on opposite sides of the crankshaft — the most common type in light aircraft), I = Fuel Injected (e.g. IO-360), T = Turbocharged (e.g. TIO-540), G = Geared (reduction gearbox between crankshaft and propeller).",
        "The number following refers to total displacement in cubic inches. For example, a Lycoming O-320 is a normally aspirated, horizontally opposed engine with 320 cubic inches displacement. Common engines include the Lycoming O-320 (150-160 HP), O-360 (180 HP), and Continental O-200 (100 HP).",
        "Engine power is quoted in brake horsepower (BHP) at a specific RPM. At altitude, power decreases with air density — a normally aspirated engine loses approximately 3% power per 1000ft of altitude gain. This is why turbocharging is used on aircraft intended for high-altitude operations — it compresses the induction air to maintain sea-level density at altitude.",

        "## THE CARBURETTOR",
        "The carburettor mixes fuel and air in the correct proportion before delivering the mixture to the cylinders. It operates on the Venturi principle — as air accelerates through a narrowed throat (the venturi), its velocity increases and pressure decreases. This pressure drop draws fuel from the float chamber (which maintains a constant fuel level via a float-operated needle valve) through a jet into the airstream where it vaporises and mixes with the air.",
        "The throttle butterfly valve controls the volume of mixture entering the engine, directly controlling power output. The mixture control (red knob) allows the pilot to adjust the fuel-air ratio. At sea level the mixture is set rich for maximum power. At altitude, air density decreases but the carburettor continues to deliver the same volume of air — which now contains fewer molecules — while fuel delivery remains the same, causing the mixture to become progressively richer and inefficient. Leaning the mixture reduces fuel flow to restore the correct ratio, improving efficiency and reducing fuel consumption.",
        "Leaning is typically performed at cruise power settings above 3000ft. The mixture must always be set to full rich for take-off, go-around, and landing, and before increasing power above cruise settings. Failure to enrich the mixture before a go-around at altitude can cause the engine to run excessively lean at high power — a dangerous situation.",

        "## CARBURETTOR ICING",
        "Carburettor icing is one of the most insidious hazards in light aircraft operations and is responsible for a significant number of engine failures. Ice can form inside the carburettor venturi even when the outside air temperature is as high as +25°C with high relative humidity. This occurs because two separate cooling processes take place simultaneously.",
        "Fuel vaporisation cooling: As liquid fuel vaporises in the venturi, it absorbs latent heat from the surrounding air, causing a temperature drop of approximately 5-10°C.",
        "Pressure drop cooling (adiabatic cooling): As air accelerates through the venturi and pressure drops, the temperature falls by a further 15-20°C.",
        "The combined effect can cause a local temperature drop of 20-25°C, sufficient to freeze water vapour from the air onto the walls of the venturi. Ice accumulates and progressively restricts airflow, reducing power. If not treated, the ice can completely block the venturi causing total engine failure.",
        "Conditions most conducive to carburettor icing: temperatures between -15°C and +25°C OAT with the highest risk between 0°C and +15°C, relative humidity above 50%, and during descent at low power settings where the venturi effect is strongest. Crucially, carburettor icing can occur on warm, apparently clear days — it is not limited to cold or visually obvious icing conditions.",
        "Symptoms of carburettor icing: In an aircraft with a fixed-pitch propeller, RPM decreases gradually without any throttle change. In a constant-speed propeller aircraft, manifold pressure decreases. In both cases the engine may run rough. Because the onset is gradual, carburettor icing can go unnoticed until it becomes serious.",
        "Carburettor heat directs exhaust-heated unfiltered air into the carburettor intake, raising the temperature sufficiently to prevent ice formation or melt existing ice. When carb heat is applied: initially RPM may decrease further (hot air is less dense, reducing power). If ice was present, RPM will then increase as the ice melts and airflow is restored — confirming icing had occurred. If no ice was present, RPM will simply decrease and remain lower. Carburettor heat should always be applied fully — partial heat can actually produce temperatures in the optimum icing range, making the situation worse. Carburettor heat reduces power by approximately 50-100 RPM, slightly richens the mixture, and uses unfiltered air — so it must not be used during ground operations where dust ingestion could damage the engine.",

        "## THE IGNITION SYSTEM",
        "Aircraft piston engines use a dual magneto ignition system completely independent of the aircraft's electrical system. This is a critical safety feature — the engine continues to run even with a complete electrical failure. Each magneto is a self-contained, engine-driven electrical generator that produces high-voltage sparks. Magneto 1 fires one spark plug in each cylinder; Magneto 2 fires the other. Each cylinder therefore has two spark plugs fired by separate magnetos.",
        "The dual plug system provides redundancy (the engine continues on one magneto if the other fails, with some power reduction), improved combustion efficiency (two flame fronts propagate from each side of the combustion chamber, burning the mixture more completely), and reduced likelihood of detonation.",
        "The ignition switch positions are: OFF, RIGHT (Mag 1 only), LEFT (Mag 2 only), BOTH, and START. During normal flight, BOTH is selected. RIGHT or LEFT are used only during the magneto check at run-up.",
        "The magneto check is performed at the manufacturer's recommended RPM (typically 1800-2000 RPM). The pilot switches from BOTH to RIGHT, notes the RPM drop, returns to BOTH, then switches to LEFT. A normal RPM drop is 25-75 RPM on each magneto. The maximum permissible drop is typically 125 RPM with a maximum differential between the two magnetos of 50 RPM. An excessive drop indicates a problem with that magneto or associated spark plugs. Rough running can indicate fouled spark plugs.",
        "P-leads: When the ignition switch is turned to OFF, a P-lead grounds the magneto, preventing it from firing. If the P-lead is broken or disconnected, the magneto cannot be grounded — the engine could fire even with the switch OFF. This is a serious hazard when hand-propping. Always treat a propeller as if the engine could fire at any moment.",

        "## FUEL INJECTION",
        "Fuel injection replaces the carburettor with direct injection of metered fuel into each cylinder's intake port. An engine-driven fuel pump pressurises fuel and a flow divider distributes it equally to each injector nozzle.",
        "Advantages over carburettors: no risk of carburettor icing (though induction system icing can still occur at the air intake), better fuel distribution between cylinders, more precise mixture control, better throttle response, and improved performance at all altitudes.",
        "Disadvantages: vapour lock can occur when the engine is hot and shut down — residual fuel in the lines vaporises, making the engine difficult to restart. Hot starts require specific procedures to purge vapour from the fuel lines before cranking. Fuel injection systems are also more complex and expensive to maintain.",

        "## THE OIL SYSTEM",
        "Engine oil serves multiple critical functions: lubrication (reducing friction between moving parts), cooling (transferring heat away from internal components), cleaning (suspending contaminants and carrying them to the filter), sealing (helping piston rings seal against cylinder walls), and corrosion protection.",
        "The oil system consists of an oil sump (reservoir at the bottom of the crankcase), engine-driven oil pump, oil filter (removes particles), oil cooler (air-cooled heat exchanger), and oil temperature and pressure gauges in the cockpit.",
        "Oil pressure is the most critical engine parameter. Normal oil pressure for most light aircraft engines is 25-90 PSI (varies by engine). Low oil pressure in flight is an immediate emergency — it indicates loss of lubrication which will rapidly destroy the engine. Actions: reduce power, identify a landing area, and land as soon as possible. High oil pressure indicates cold, thick oil — warm the engine gradually before applying high power.",
        "Oil temperature provides additional information about engine health. High oil temperature combined with low oil pressure is a clear sign of impending engine failure. High oil temperature alone may indicate low oil quantity, a blocked oil cooler, excessively high power, or reduced cooling airflow during a prolonged climb.",
        "Always check oil quantity during pre-flight — never depart with oil below the minimum level marked on the dipstick. Most aircraft piston engines use ashless dispersant (AD) oil for normal operations, which contains additives that keep contaminants in suspension for removal by the filter. New engines initially use straight mineral oil to allow piston rings to bed in correctly.",

        "## THE COOLING SYSTEM",
        "Aircraft piston engines are air-cooled — they rely on airflow over finned cylinders to remove excess heat. Cooling fins on each cylinder greatly increase the surface area available for heat transfer. Sheet metal baffles inside the engine cowling direct incoming air from the propeller over the cylinders in a controlled path ensuring uniform cooling.",
        "Cowl flaps (fitted to some aircraft) control the outlet area for cooling air. Open cowl flaps increase cooling airflow and are used during climb when airspeed is low and power is high — the most thermally demanding phase of flight. Closed cowl flaps reduce drag and are used during cruise when sufficient airspeed provides adequate cooling.",
        "Cylinder Head Temperature (CHT) is the primary cooling parameter. Normal CHT is typically 150-230°C; the maximum is usually around 240-260°C (varies by engine). Excessive CHT causes accelerated wear and can lead to detonation. Oil temperature provides a secondary indication of cooling adequacy.",
        "Shock cooling occurs when a hot engine is rapidly cooled by a sudden reduction in power or a rapid descent. The sudden temperature drop causes differential thermal contraction of cylinder components which can cause cracking. To avoid shock cooling, reduce power gradually and maintain a reasonable power setting during descent. Prolonged idle-power descents should be avoided, particularly in cold conditions.",

        "## DETONATION AND PRE-IGNITION",
        "Detonation is a critical abnormal combustion phenomenon that can destroy an engine in seconds. Under normal conditions, the spark plugs ignite the fuel-air mixture and a smooth flame front propagates across the combustion chamber. In detonation, the unburned portion of the mixture ahead of the flame front spontaneously ignites due to excessive heat and pressure, causing an almost instantaneous explosion rather than a controlled burn. This creates extreme pressure spikes that can crack pistons, damage valves, and destroy connecting rods.",
        "Causes of detonation: use of fuel with insufficient octane rating (using a lower grade than specified), excessively lean mixture (insufficient fuel to absorb heat), high manifold pressure combined with low RPM, and excessively high CHT before applying high power.",
        "Symptoms of detonation: rough running, high CHT, possible smoke from the engine, and loss of power. Detonation can cause serious damage before it is detected. Prevention: always use the correct grade of fuel (AVGAS 100LL for most piston aircraft), maintain proper mixture settings, avoid low RPM at high manifold pressure, and monitor CHT continuously.",
        "Pre-ignition occurs when the fuel-air mixture ignites before the spark plugs fire — caused by a hot spot in the combustion chamber such as a glowing carbon deposit, an overheated valve, or a damaged spark plug. Pre-ignition causes power loss and severe engine damage and is distinct from detonation, though both can occur simultaneously. Symptoms are similar: rough running and high CHT.",

        "## ENGINE HANDLING PRINCIPLES",
        "Warm up before flight: Allow oil pressure to stabilise and oil temperature to enter the green arc before applying high power. Cold oil does not lubricate effectively and high power on a cold engine causes excessive wear.",
        "Power changes: Make all power changes smoothly and progressively. Rapid throttle advancement can cause mixture disruption in carburettor engines and mechanical stress on engine components.",
        "Mixture management: Lean above 3000ft at cruise power. Always use full rich for take-off, go-around, and landing. Enrich mixture before increasing power above cruise settings to prevent a dangerously lean condition at high power.",
        "Continuous monitoring: Monitor oil pressure, oil temperature, CHT, fuel quantity, and RPM or manifold pressure throughout the flight. Investigate any parameter outside the green arc immediately — do not continue to destination and hope for the best.",
        "Engine-driven accessories: Many aircraft systems depend on the engine: the vacuum pump (gyroscopic instruments), alternator (electrical power), and hydraulic pump (if fitted). An engine failure simultaneously affects all engine-driven systems — this is why battery backup and electric standby instruments are important.",
        ],
        keyFacts: [
            "Four strokes: Induction → Compression → Power → Exhaust (suck, squeeze, bang, blow)",
            "Carburettor icing can occur at outside temperatures up to +20°C in humid conditions",
            "RPM drop then recovery after carb heat confirms ice was present and has melted",
            "Dual magneto system provides redundancy — each fires one plug per cylinder",
            "RPM drop during magneto check should be 50-75 RPM maximum",
            "Low oil pressure = immediate emergency — land as soon as possible",
            "Detonation is abnormal combustion — can destroy an engine rapidly",
            "Mixture must be leaned at altitude to compensate for lower air density",
            "Fuel injection has no carb icing risk but can suffer vapour lock on hot starts",
            "Air-cooled engines use fins and baffles — cowl flaps open during climb",
        ]
        },
        {
        id: 3,
        name: "Propellers & Weight and Balance",
        content: [
        "## THE PROPELLER",
        "The propeller is a rotating aerofoil that converts engine torque into thrust. Each blade has an aerofoil cross-section and generates a lift force acting in the forward direction — this forward lift is thrust. The efficiency of the propeller depends on its design, the blade angle, and the relationship between engine RPM and forward airspeed.",
        "The blade angle (pitch) is the angle between the chord line of the propeller blade and the plane of rotation. A fine pitch (small angle) takes a small bite of air per revolution, allowing the engine to spin at high RPM. This produces high thrust at low airspeeds — ideal for take-off. A coarse pitch (large angle) takes a larger bite of air per revolution, requiring more torque but producing efficient thrust at high airspeeds and low RPM — ideal for cruise.",
        "Propeller efficiency is expressed as the ratio of useful thrust power to engine shaft power. A propeller is most efficient when the relative airflow meets the blade at a small angle of attack. As airspeed changes, the angle at which air meets the blade changes — a fixed pitch propeller is therefore only optimal at one specific combination of airspeed and RPM.",

        "## FIXED PITCH PROPELLERS",
        "A fixed pitch propeller has blades set at a single angle that cannot be changed in flight. The pitch is a compromise selected by the manufacturer for the intended use of the aircraft. A climb propeller is set at a finer pitch, optimising performance at lower speeds and during take-off and climb. A cruise propeller is set at a coarser pitch, optimising performance at higher cruise speeds at the expense of take-off performance.",
        "Fixed pitch propellers are simple, light, cheap, and require no additional systems. They are standard on most basic training aircraft. The disadvantage is that they operate efficiently only over a narrow range of conditions — at any other combination of power and speed, they are a compromise. On a fixed pitch propeller aircraft, the throttle directly controls both power and RPM simultaneously.",

        "## VARIABLE PITCH AND CONSTANT SPEED PROPELLERS",
        "A variable pitch propeller allows the blade angle to be changed in flight, enabling the propeller to maintain an efficient angle of attack across a wide range of airspeeds and power settings. The most common type is the constant speed propeller, which uses a governor to automatically vary the blade pitch to maintain a pilot-selected RPM regardless of changes in airspeed or power.",
        "The propeller governor senses actual RPM and compares it to the selected RPM. If the engine tends to speed up (e.g. during a dive), the governor increases pitch (coarsens the blades) to absorb more power and maintain the selected RPM. If the engine tends to slow down (e.g. during climb), it decreases pitch (fines the blades) to reduce the load and allow the engine to maintain RPM.",
        "On a constant speed propeller aircraft, the pilot controls engine power using two levers: the throttle (black knob) sets manifold pressure (a measure of engine power), and the propeller control (blue knob) sets the desired RPM. The general rule is to always increase RPM before increasing manifold pressure (to avoid over-stressing the engine at low RPM), and to decrease manifold pressure before decreasing RPM.",
        "During the pre-flight run-up, the constant speed propeller is exercised by moving the propeller control from the high RPM (fine pitch) position to low RPM (coarse pitch) and back, two or three times. This verifies the governor is functioning, circulates warm oil through the propeller hub mechanism, and ensures the pitch change mechanism is free. The RPM should drop when the control is moved to coarse and recover when returned to fine.",
        "A feathering propeller can rotate its blades to approximately 90° — parallel to the airflow — to minimise drag in the event of an engine failure. This is essential on multi-engine aircraft where a windmilling propeller (blades at a flat pitch, spinning freely in the airflow) creates enormous drag and severely degrades performance. Feathering is not normally fitted to single-engine aircraft.",

        "## PROPELLER EFFECTS",
        "A rotating propeller creates several asymmetric forces that affect aircraft handling, particularly at high power and low airspeed. Understanding these effects is important for maintaining control during take-off, climb, and go-around.",
        "Torque reaction: By Newton's third law, if the engine rotates the propeller clockwise (viewed from the cockpit), the engine and airframe experience an equal and opposite reaction tending to rotate the aircraft anticlockwise — rolling to the left. This effect is most pronounced at high power and low airspeed.",
        "Slipstream effect: The propeller imparts a rotational (helical) motion to the air behind it. This rotating slipstream strikes the left side of the vertical fin and fuselage, producing a yawing force to the left. The effect is most noticeable at high power and low speed.",
        "P-factor (asymmetric blade effect): When the aircraft is at a high angle of attack (as in a climb), the descending propeller blade (on the right side, for a clockwise-rotating propeller) has a greater angle of attack than the ascending blade (on the left side). The descending blade therefore generates more thrust than the ascending blade, producing a net thrust offset to the right of the propeller disc — this yaws the aircraft to the left. P-factor is most pronounced at high angles of attack and high power.",
        "Gyroscopic precession: The spinning propeller acts as a gyroscope and exhibits precession — when a force is applied to tilt the spin axis, the resulting movement occurs 90° later in the direction of rotation. In practice this is most noticeable when the tail is raised during the take-off roll in a tailwheel aircraft — the pitch-down force on the propeller disc results in a yawing force to the left.",
        "The combined effect of all four forces — torque, slipstream, P-factor, and precession — is a strong tendency to yaw and roll to the left during high-power, low-speed flight. Right rudder input is required to maintain directional control during take-off and climb. Pilots transitioning to higher-powered aircraft must be aware of the increased magnitude of these effects.",

        "## WEIGHT AND BALANCE — PRINCIPLES",
        "Weight and balance is one of the most critical pre-flight calculations a pilot must perform. Operating an aircraft outside its approved weight and balance envelope is illegal, dangerous, and has caused numerous fatal accidents. The calculation must be performed before every flight and verified to be within limits throughout the flight — including as fuel is burned.",
        "Weight affects every aspect of aircraft performance: stall speed, take-off and landing distance, climb rate, range, and structural limits. The maximum certificated weights are defined in the Aircraft Flight Manual (AFM) and must never be exceeded.",
        "Balance (centre of gravity position) determines the aircraft's stability and handling characteristics. The centre of gravity (CG) is the single point through which the total weight of the aircraft acts, and about which the aircraft would balance if suspended. The CG must remain within the manufacturer's approved limits (the CG envelope) throughout the flight.",

        "## WEIGHT DEFINITIONS",
        "Basic Empty Weight (BEW): The weight of the aircraft as manufactured, including all permanently installed equipment, unusable fuel, full hydraulic fluid, and full engine oil. It excludes usable fuel, pilot, passengers, and baggage. The BEW and its associated CG position are found in the aircraft's Weight and Balance documentation and must be updated after any modification or repair.",
        "Maximum Zero Fuel Weight (MZFW): The maximum permissible weight of the aircraft with no usable fuel. Wing bending loads are highest when fuel (which relieves wing bending) is absent — MZFW exists to limit structural stress in the wing root. Not all light aircraft have a defined MZFW.",
        "Maximum Landing Weight (MLW): The maximum certificated weight for landing. Landing imposes significant structural loads; some aircraft have a lower MLW than MTOW, requiring fuel to be burned or jettisoned before landing if above MLW. Most light aircraft have the same MTOW and MLW.",
        "Maximum Take-Off Weight (MTOW): The maximum certificated weight at the start of the take-off roll. Performance data in the AFM is based on MTOW — exceeding it invalidates all published performance figures.",
        "Useful Load: MTOW minus BEW. This is the total load available for fuel, pilot, passengers, and baggage. It defines the practical payload capability of the aircraft.",
        "Payload: The weight of occupants and baggage (usable load minus fuel weight). Increasing fuel reduces available payload.",

        "## CENTRE OF GRAVITY — CALCULATIONS",
        "The CG position is calculated using the moment method. A moment is the product of a weight and its arm (horizontal distance from a reference point called the datum). The datum is an arbitrary reference point defined by the manufacturer — often the firewall, the leading edge of the wing, or the nose of the aircraft. Arms forward of the datum are negative; arms aft of the datum are positive (or vice versa, depending on the manufacturer's convention).",
        "The calculation: for each item (BEW, pilot, passengers, baggage, fuel), multiply weight by arm to get the moment. Sum all weights to get total weight. Sum all moments to get total moment. Divide total moment by total weight to get the CG position (expressed as a distance from the datum in inches or metres).",
        "The CG position is then plotted on the CG envelope chart from the AFM. The envelope defines the forward and aft CG limits at various weights. The CG must fall within the envelope at the calculated total weight. If the CG is outside the envelope — even if the weight is within limits — the flight must not be made without adjusting the loading.",
        "Fuel burn must also be considered — as fuel is consumed, both weight and CG change. In most light aircraft, burning fuel moves the CG forward slightly (as wing tanks drain). The CG must remain within limits throughout the entire flight, not just at the start.",

        "## EFFECTS OF CG POSITION",
        "Forward CG: The aircraft is more stable longitudinally — the tail needs to produce more downward force to maintain equilibrium, which increases the effective wing loading. Effects include: higher stall speed, longer take-off and landing distances, higher fuel burn (from increased trim drag), heavier stick forces, and reduced manoeuvrability. A forward CG that is too far forward can make the aircraft impossible to rotate on take-off or flare for landing. However, forward CG is always safer than aft CG.",
        "Aft CG: The aircraft becomes less stable longitudinally — in the extreme, the aircraft is uncontrollable. Effects include: lower stall speed (slightly), lighter stick forces, reduced stability, and potential inability to recover from a stall or spin. An aft CG beyond the aft limit is the most dangerous loading condition in aviation — the aircraft may not be recoverable from an upset. Never fly with an aft CG beyond the approved limit.",
        "Lateral CG: Weight imbalance left-to-right (e.g. asymmetric fuel loading) creates a rolling tendency that must be counteracted with aileron. This reduces control authority and causes additional drag. Fuel should be consumed symmetrically or cross-fed where the system allows.",

        "## LOADING AND PRACTICAL CONSIDERATIONS",
        "Baggage compartment limits: Aircraft have a maximum weight limit for each baggage area, defined in the AFM. The baggage arm is usually far aft — heavy baggage has a large moment and can move the CG aft very rapidly. Never exceed compartment limits even if total weight is within MTOW.",
        "Passenger seating: Moving passengers between front and rear seats has a significant effect on CG. Always calculate with the actual seating arrangement.",
        "Fuel planning: Standard fuel density for AVGAS 100LL is approximately 0.72 kg/litre (6 lb/US gallon). When converting between volume and weight, use the actual density — fuel density varies slightly with temperature.",
        "Aircraft modification: Any modification to the aircraft (fitting additional equipment, removing seats) changes the BEW and its CG. The aircraft's weight and balance documentation must be updated by a licensed engineer before the aircraft is returned to service. Always use current documentation.",
        "Practical tip: If the calculated CG is close to a limit, consider how it will change as fuel burns. An aircraft that starts at the aft limit with full fuel may move further aft (or return to limits) as fuel is consumed, depending on the tank location. Always check both the initial and final (fuel burned) CG positions.",
        ],
        keyFacts: [
            "Fine pitch = high RPM, good for take-off; coarse pitch = low RPM, good for cruise",
            "Constant speed propeller maintains selected RPM by varying blade pitch automatically",
            "P-factor, torque, and slipstream all tend to yaw the aircraft to the left",
            "Right rudder required to counteract propeller effects during take-off and climb",
            "CG = Total moment / Total weight; moment = weight × arm",
            "Forward CG = more stable but less performance; aft CG = dangerous, reduced stability",
            "MTOW - BEW = useful load (pilots, passengers, fuel, baggage)",
            "CG must remain within limits throughout the entire flight including fuel burn",
            "Constant speed propeller is cycled during run-up to check governor operation",
        ]
        },
        {
        id: 4,
        name: "Instruments",
        content: [
        "## INSTRUMENT GROUPS",
        "Aircraft instruments are divided into three groups based on their operating principle. Pitot-static instruments use air pressure to measure airspeed, altitude, and rate of climb or descent. Gyroscopic instruments use the properties of a spinning gyroscope to indicate attitude, heading, and rate of turn. Magnetic instruments use the Earth's magnetic field to indicate direction. Understanding the operating principles, errors, and limitations of each instrument is essential for safe flight — particularly in degraded visibility where the instruments become the primary reference.",

        "## THE PITOT-STATIC SYSTEM",
        "The pitot-static system provides the pressure inputs for three flight instruments: the airspeed indicator, altimeter, and vertical speed indicator. It uses two pressure sources. Pitot pressure (also called stagnation or total pressure) is measured by the pitot tube, which faces directly into the relative airflow. The pitot tube measures the total pressure of the air — static pressure plus dynamic pressure (the pressure created by the aircraft's forward motion). Static pressure is the ambient atmospheric pressure of the surrounding air, measured by static ports located on the side of the fuselage where the airflow is undisturbed. Some aircraft have a standby static source inside the cockpit as an emergency backup.",
        "Blockages of the pitot-static system are a serious hazard. A blocked pitot tube (e.g. by ice, insects, or a forgotten pitot cover) causes the ASI to stop working correctly — it may read zero or freeze at the last indicated speed. A blocked static port causes all three pitot-static instruments to be affected. The ASI will over-read when climbing and under-read when descending (as the trapped static pressure no longer reflects the actual ambient pressure). The altimeter will freeze at the altitude when the blockage occurred. The VSI will read zero. On aircraft with a standby static source, selecting it restores function — note that cockpit static pressure is slightly lower than external static (due to venturi effect of air passing the cockpit), so instrument readings may be slightly affected.",
        "Pitot heat electrically heats the pitot tube to prevent ice formation. It should be switched on before entering icing conditions or when icing is anticipated. Extended use of pitot heat on the ground can damage the heating element — check the AFM for ground operation limitations.",

        "## THE AIRSPEED INDICATOR",
        "The Airspeed Indicator (ASI) measures the difference between pitot pressure and static pressure — this difference is dynamic pressure, which is proportional to the square of the airspeed and the air density. The instrument converts this pressure difference into an airspeed reading in knots.",
        "Indicated Airspeed (IAS) is what the instrument shows. It is subject to instrument error (small inaccuracies in the instrument mechanism) and position error (disturbance of the airflow at the pitot tube or static port due to the aircraft's attitude or configuration). IAS corrected for these errors is Calibrated Airspeed (CAS). The correction is usually small and found in the AFM.",
        "Equivalent Airspeed (EAS) is CAS corrected for compressibility effects. This becomes significant at high speeds (above approximately 200 knots) and is not relevant for most PPL training.",
        "True Airspeed (TAS) is EAS corrected for air density. At altitude, air is less dense — the same dynamic pressure is created by a higher true velocity. TAS is approximately 2% higher than IAS per 1000ft of altitude. At 10,000ft, TAS is approximately 20% higher than IAS. TAS is used for navigation calculations (flight planning, wind correction). The conversion can be made using a flight computer or the formula: TAS = IAS × (1 + 0.02 × altitude in thousands of feet).",
        "Groundspeed is TAS corrected for wind. It is not shown on any cockpit instrument (except GPS) and must be calculated.",
        "The ASI displays colour-coded arcs and markings that define the aircraft's speed limits and operating ranges. These are defined in EASA regulations and must be understood precisely:",
        "White arc: The full flap operating range. The lower limit is Vs0 (stall speed in the landing configuration — full flap, gear down if applicable). The upper limit is Vfe (maximum speed with flaps extended). Operations within the white arc with flaps extended are safe.",
        "Green arc: The normal operating range. The lower limit is Vs1 (stall speed in the clean configuration — flaps up). The upper limit is Vno (maximum structural cruising speed). Normal operations should remain within the green arc.",
        "Yellow arc: The caution range, from Vno to Vne. Flight in the yellow arc is permitted only in smooth air. Turbulence at these speeds may cause structural damage.",
        "Red line: Vne — the Never Exceed Speed. This is the absolute maximum speed in any condition. Exceeding Vne risks structural failure.",
        "Additional speed markings: Vx (best angle of climb speed) and Vy (best rate of climb speed) may be marked. Va (manoeuvring speed) is usually in the AFM but may not appear on the ASI — it is the maximum speed at which full deflection of a single control surface will not cause structural damage. Va decreases with decreasing weight.",

        "## THE ALTIMETER",
        "The altimeter measures atmospheric static pressure and converts it to an altitude reading using the known relationship between pressure and altitude in the International Standard Atmosphere. It contains an aneroid capsule (a sealed, flexible metal capsule) that expands as pressure decreases (with increasing altitude) and contracts as pressure increases (with decreasing altitude). This movement is magnified by a mechanical linkage and displayed on the instrument face.",
        "The altimeter subscale (Kollsman window) allows the pilot to set a pressure reference. Different pressure settings give different altitude references:",
        "QNH: The altimeter is set to the mean sea level pressure at the aerodrome (or the regional pressure setting). With QNH set, the altimeter reads altitude above mean sea level (AMSL). This is the standard setting for flight below the transition altitude in controlled airspace and is used for terrain clearance.",
        "QFE: The altimeter is set to the actual pressure at the aerodrome elevation. With QFE set, the altimeter reads zero on the ground at that aerodrome and shows height above the aerodrome during flight. QFE is used at some aerodromes for circuit flying and approaches. Its use is declining.",
        "Standard pressure (1013.25 hPa / 29.92 inHg): Above the transition altitude (which varies by country — typically FL045 to FL195 depending on the state), all aircraft set standard pressure. This eliminates the need to update the subscale continuously and ensures all aircraft are using the same reference for vertical separation. With 1013 set, the altimeter reads pressure altitude — expressed as a Flight Level (FL). FL100 = 10,000ft on the 1013 scale.",
        "The transition altitude is the altitude at or below which QNH is used. The transition level is the lowest Flight Level available for use at or above the transition altitude. Between the transition altitude and transition level there may be a transition layer — aircraft climbing through this layer switch from QNH to 1013 when passing the transition altitude; aircraft descending switch from 1013 to QNH at the transition level.",
        "Altimeter errors: Scale error — small inaccuracies in calibration across the range of the instrument. Position error — disturbance of static pressure at the port. Lag — the altimeter lags slightly behind rapid altitude changes. Barometric error — if the subscale is not updated to current QNH, the altimeter will display an incorrect altitude. Each 1 hPa difference between set and actual pressure causes approximately 30ft of error. Temperature error — the ISA assumes a standard temperature lapse rate; actual atmospheric temperatures differ from ISA. In air colder than ISA, the altimeter over-reads — the aircraft is lower than indicated. This is the basis of the cold temperature correction required at certified cold temperature aerodromes. In warmer than ISA air, the altimeter under-reads.",
        "Flying from high pressure to low pressure without updating QNH: the altimeter will over-read — the aircraft is lower than the instrument indicates. The mnemonic HIGH to LOW, LOOK OUT BELOW captures this hazard.",

        "## THE VERTICAL SPEED INDICATOR",
        "The Vertical Speed Indicator (VSI) measures the rate of change of static pressure and displays it as rate of climb or descent in feet per minute (fpm). It contains a calibrated leak — static pressure is connected directly to one side of a capsule and through a calibrated restriction to the other side (the case). When altitude is constant, pressure on both sides equalises and the instrument reads zero. During a climb, static pressure decreases — the direct connection causes the capsule to respond immediately, but the restricted connection lags, creating a pressure difference that deflects the needle upward.",
        "The VSI has an inherent lag of approximately 6-9 seconds. It indicates the correct rate of climb or descent only after a steady state has been reached — during rapidly changing climb or descent rates, it is unreliable. An Instantaneous VSI (IVSI) uses accelerometer-driven pumps to eliminate most of the lag. During straight and level flight at constant altitude, the VSI should read zero — a small steady-state error indicates a calibration issue.",
        "The VSI is useful for maintaining a constant rate of climb or descent and for identifying the onset of unintended climbs or descents in IMC. It is a trend instrument rather than a precise measurement device and should be used alongside the altimeter.",

        "## GYROSCOPIC INSTRUMENTS — PRINCIPLES",
        "Gyroscopic instruments exploit two fundamental properties of a spinning mass (gyroscope). Rigidity in space (gyroscopic inertia): A spinning gyroscope resists any force that tries to change the direction of its spin axis. The faster it spins and the greater its mass, the stronger this resistance. This property allows the gyroscope to maintain a fixed reference in space regardless of aircraft movement.",
        "Precession: When a force is applied to the rim of a spinning gyroscope, the gyroscope does not move in the direction of the applied force. Instead it moves 90° later in the direction of rotation. This property is used in the turn coordinator and causes unwanted drift in the DI.",
        "Gyroscopes in aircraft instruments may be driven by a vacuum (suction) system or electrically. The vacuum system uses an engine-driven vacuum pump to create suction that spins small turbines (gyros) in the AI and DI. Vacuum-driven instruments are affected by vacuum pump failure — if the pump fails, both the AI and DI become unreliable. The vacuum gauge should be monitored in flight. Normal vacuum is typically 4.5-5.5 inHg. Electric gyros are powered by the aircraft's electrical system and are affected by electrical failures. Having a mix of vacuum and electric gyros provides redundancy.",

        "## THE ATTITUDE INDICATOR",
        "The Attitude Indicator (AI), also called the Artificial Horizon, uses a gyroscope with its spin axis vertical (earth gyro). The gyro maintains its orientation in space as the aircraft manoeuvres, causing the horizon bar to remain level while the aircraft symbol (fixed to the instrument case) moves with the aircraft. The result is a display showing the aircraft's pitch and bank attitude relative to the natural horizon.",
        "The AI is the most important instrument for attitude flying in IMC. It provides an immediate, direct indication of aircraft attitude — unlike other instruments which only infer attitude from secondary effects (speed changes, altitude changes, rate of turn). Instrument flying technique is based on cross-checking the AI with supporting instruments.",
        "AI errors and limitations: Gyro toppling — if the aircraft is manoeuvred beyond the gimbal limits of the AI (typically ±60° bank and ±85° pitch), the gyro can tumble, giving completely false indications. After recovery from extreme attitudes, the AI may show erroneous information until it re-erects. Erection time — after initial power application (or after gyro toppling), the AI takes approximately 5 minutes to erect to the correct position. Never rely on a recently powered AI for attitude reference. Precession errors — minor mechanical imperfections cause slow drift in AI indications over time. This is usually negligible over a normal flight but may be noticeable on long flights. Turning errors — the AI may show a slight pitch change during sustained turns due to the Earth's rotation and the gyro's rigidity in space. This is minor and usually ignored.",

        "## THE DIRECTIONAL INDICATOR",
        "The Directional Indicator (DI), also called the Heading Indicator or Direction Indicator, uses a gyroscope with its spin axis horizontal. The gyro maintains its orientation in space, providing a stable heading reference displayed against a compass card. Unlike the magnetic compass, the DI is unaffected by acceleration errors and turning errors — making it the primary heading reference for manoeuvring flight.",
        "The DI must be manually aligned with the magnetic compass before flight and periodically re-checked and updated in flight. It should be set during straight and level flight when the magnetic compass is steady and reliable. Re-check and re-align every 10-15 minutes.",
        "Gyroscopic drift: The DI drifts from its set heading due to two causes. Apparent drift is caused by the Earth's rotation — the Earth rotates beneath the gyro, making the gyro appear to precess. At the poles, apparent drift is maximum (15° per hour); at the equator it is zero. Real drift is caused by mechanical imperfections in the gyro bearings and gimbal system. The combined drift is typically 3° per 15 minutes (roughly 12° per hour). Always re-align after significant drift is noticed.",
        "DI failure: If the vacuum system fails, the DI gyro slows down and the instrument becomes unreliable. It may appear to work but can precess rapidly, giving dangerously false heading information. Monitor the vacuum gauge and cross-check the DI with the magnetic compass regularly. If the two disagree significantly, suspect DI failure and revert to the magnetic compass for heading reference.",

        "## THE TURN COORDINATOR AND TURN AND SLIP INDICATOR",
        "The Turn Coordinator shows rate of turn and, due to its canted gyro axis, also responds to roll rate. The gyro axis is tilted approximately 30° from horizontal — this means the gyro reacts to both roll and yaw. The miniature aircraft symbol indicates rate of turn: when the wing tip aligns with the standard rate mark (L or R), the aircraft is turning at Rate 1 (3° per second), completing a full 360° turn in exactly 2 minutes. Rate 1 is the standard turn rate used for all timed turns in instrument flying.",
        "The Turn and Slip Indicator is an older design that uses a needle (not a miniature aircraft) connected to a rate gyro to show yaw rate (rate of turn). It does not respond to roll rate. Both instruments include an inclinometer — the balance ball.",
        "The inclinometer (balance ball or slip indicator) is a curved glass tube filled with liquid containing a small ball. It indicates whether the turn is coordinated (aerodynamically correct) or uncoordinated. In a coordinated turn, the total reaction force is parallel to the aircraft's vertical axis — the ball remains centred. A slip (insufficient bank for the rate of turn) causes the ball to move towards the inside of the turn — the aircraft is slipping towards the inside. A skid (excessive bank for the rate of turn) causes the ball to move towards the outside of the turn. The correction is always to step on the ball — apply rudder pressure in the direction the ball has moved. An uncoordinated turn increases the risk of a spin entry, particularly at low speed.",
        "The turn coordinator is electrically driven in most aircraft, providing a backup instrument independent of the vacuum system. This makes it particularly valuable if the vacuum system fails, as it provides the only gyroscopic attitude reference (rate of turn) when the AI and DI have become unreliable.",

        "## THE MAGNETIC COMPASS",
        "The magnetic compass is a direct-reading instrument requiring no power — it will function regardless of electrical or vacuum failures. It consists of magnets attached to a float suspended in a liquid (compass fluid), free to rotate and align with the Earth's magnetic field. The card is graduated in degrees and reads against a lubber line fixed to the case.",
        "Magnetic variation: The Earth's geographic North Pole and Magnetic North Pole are not co-located. The angular difference between True North and Magnetic North at any given location is called variation (or declination). Variation is East if Magnetic North is east of True North, and West if Magnetic North is west of True North. The value and direction of variation are shown on aeronautical charts as isogonic lines. To convert between true and magnetic: Variation East, Magnetic Least (subtract East variation from true to get magnetic); Variation West, Magnetic Best (add West variation to true to get magnetic). The memory aid is CADET: Compass Add East for True.",
        "Magnetic deviation: The aircraft itself contains magnetic materials (engine, avionics, structure) that distort the Earth's magnetic field at the compass location. The resulting error is called deviation and varies with aircraft heading. Deviation is minimised by compass swinging (a maintenance procedure that adjusts compensating magnets in the compass) and the residual error is recorded on a deviation card displayed in the cockpit. Deviation is typically small (±5°) but must be applied to get a correct magnetic heading.",
        "Compass errors in flight: The magnetic compass is subject to significant errors during accelerations and turns due to the dip angle of the Earth's magnetic field (the field is not horizontal — it dips downward towards the magnetic poles). These errors are most pronounced at higher latitudes.",
        "Acceleration errors occur on East-West headings. On a heading of East or West, acceleration causes an apparent turn towards North; deceleration causes an apparent turn towards South. The mnemonic ANDS (Accelerate North, Decelerate South) summarises this. On North-South headings there is no acceleration error.",
        "Turning errors occur when turning through North or South. In the northern hemisphere, when turning through North the compass lags — it under-reads the turn (the compass card appears to rotate in the opposite direction to the turn, showing less turn than has actually occurred). When turning through South, the compass leads — it over-reads. The mnemonic ONUS (Overshoot North, Undershoot South) or UNOS (Undershoot North, Overshoot South) are used to remember this (check which version your school uses). To roll out on North, continue the turn past the required heading; to roll out on South, roll out before reaching South. On East or West headings, turning errors are minimal.",
        "Compass unreliability: The magnetic compass is unreliable during manoeuvres. It should only be read during straight, level, unaccelerated flight. During turns and acceleration it gives false readings and must be disregarded. The DI is used for heading reference during manoeuvres; the compass is used only to set and check the DI when straight and level.",

        "## INSTRUMENT SYSTEM FAILURES AND PARTIAL PANEL FLYING",
        "A complete understanding of how instruments fail — and what continues to work — is essential for safe instrument operations. The most common failures are vacuum system failure (affecting AI and DI) and pitot-static blockages (affecting ASI, altimeter, and VSI).",
        "Vacuum system failure: The AI and DI gyros slow down and eventually become unreliable. Initially they may appear to work but will precess increasingly rapidly. Indications of vacuum failure include the vacuum gauge reading outside the green arc and a gradual divergence between the DI and magnetic compass. In vacuum failure, the pilot must revert to the magnetic compass for heading and use the turn coordinator (electrically driven) for bank reference.",
        "Partial panel technique: Flying without the AI and DI requires use of the turn coordinator, magnetic compass, ASI, altimeter, and VSI. Bank is controlled using the turn coordinator (wings level when the miniature aircraft is level). Heading is maintained using timed turns and the magnetic compass. Pitch is inferred from the altimeter and VSI. Partial panel flying requires a higher workload and practice — it is a required skill for the EASA PPL instrument meteorological conditions rating.",
        "Pitot-static failures and their effects on each instrument have been described above. The key point is that pitot-static blockages may not be immediately obvious — the instruments continue to show readings, just incorrect ones. If instruments disagree or behave unexpectedly, suspect a system failure and cross-check all available instruments.",
        ],
        keyFacts: [
            "ASI uses pitot minus static pressure — white arc = flaps, green = normal, yellow = caution, red = Vne",
            "TAS increases approximately 2% per 1000ft above sea level compared to IAS",
            "QNH = altitude AMSL; QFE = height above aerodrome; 1013 = pressure altitude/Flight Levels",
            "VSI has 6-9 second lag — indicates rate change after static pressure has changed",
            "DI must be aligned with compass every 10-15 minutes due to gyroscopic drift (~3° per 15 min)",
            "Rate 1 turn = 3° per second = 360° in 2 minutes",
            "Ball in centre = coordinated; step on the ball to correct slip or skid",
            "Compass turning error: Overshoot North, Undershoot South (ONUS) in northern hemisphere",
            "AI takes ~5 minutes to erect after power applied; can topple beyond ±60° bank",
            "Variation East Magnetic Least; Variation West Magnetic Best (CADET mnemonic)",
        ]
        },
        {
        id: 5,
        name: "Electrics & Avionics",
        content: [
        "## THE AIRCRAFT ELECTRICAL SYSTEM",
        "Most light aircraft use a direct current (DC) electrical system operating at either 14 volts (12V nominal) or 28 volts (24V nominal). The 14V system is standard on most single-engine light aircraft; the 28V system is more common on larger aircraft and those with higher electrical loads. Understanding the electrical system is important not just for the exam but for managing electrical failures in flight — a situation that requires prompt, systematic action.",
        "The electrical system has three main components: the battery, the alternator (or generator), and the bus bar distribution system. These work together to generate, store, and distribute electrical power to all aircraft systems.",

        "## THE BATTERY",
        "The aircraft battery stores electrical energy in chemical form and provides power for engine starting, powers all electrical systems when the engine is not running, and provides emergency backup power if the alternator fails. Most light aircraft use a lead-acid battery, though sealed absorbed glass mat (AGM) and lithium-ion batteries are increasingly common in modern aircraft.",
        "Battery capacity is rated in ampere-hours (Ah) — a 35Ah battery can theoretically supply 35 amps for one hour, or 1 amp for 35 hours, before becoming fully discharged. In practice, battery capacity is reduced by age, temperature (cold reduces capacity significantly), and discharge rate. Battery voltage drops progressively as it discharges.",
        "In the event of alternator failure, the battery becomes the sole power source for all electrical systems. The time available before the battery is exhausted depends on battery capacity and the load imposed by connected systems. Shedding non-essential electrical loads (lighting, avionics not required for flight, heating elements) immediately after alternator failure extends battery life. Land as soon as reasonably practicable — do not continue to destination if it requires more than 30 minutes of flight.",
        "Battery condition must be checked during pre-flight. Low battery voltage before start can result in a slow start or failed start. After engine start, the ammeter should show a positive (charging) reading as the alternator replenishes the battery — if it does not, suspect alternator or charging system failure.",

        "## THE ALTERNATOR",
        "The alternator is driven by the engine via a belt or direct coupling and is the primary source of electrical power during normal flight. It generates alternating current (AC) which is converted to DC by a solid-state rectifier before distribution. The alternator output voltage is regulated to maintain approximately 14V or 28V (slightly above battery voltage) to ensure continuous battery charging.",
        "The alternator is more efficient than the older generator design — it produces useful output at lower RPM and provides more power for its size and weight. The voltage regulator maintains constant output voltage regardless of engine RPM (within limits) and electrical load.",
        "An over-voltage protection relay disconnects the alternator from the bus if output voltage rises excessively (which would damage avionics). If the over-voltage relay trips, the alternator must be reset — check the AFM for the procedure. Some installations require the alternator to be switched off and back on; others require a circuit breaker to be reset.",
        "Alternator failure indications: the ammeter shows zero or negative (discharging) reading; the low-voltage warning light illuminates (if fitted); avionics may show reduced performance as voltage drops. On some aircraft, the alternator warning light illuminates when output falls below a threshold.",

        "## THE BUS BAR SYSTEM",
        "The bus bar (or bus) is a common electrical connection point from which multiple circuits are fed. All generating and storage sources connect to the bus, and all consuming circuits draw from it. Most light aircraft have a single main bus bar, though some have split bus systems or essential bus arrangements for fault isolation.",
        "An essential (or emergency) bus connects only the most critical systems — typically the primary flight instruments, radio, and navigation lights. In a fault condition, the main bus can be isolated while the essential bus remains powered, ensuring critical systems remain available.",
        "The master switch controls connection of the battery to the bus and often incorporates an alternator switch as a split rocker. The battery side of the master switch connects the battery to the bus; the alternator side connects the alternator field circuit. Turning off the alternator side disconnects the alternator (useful for resetting after an over-voltage trip) without disconnecting the battery.",

        "## CIRCUIT PROTECTION",
        "Every electrical circuit in the aircraft is protected against overcurrent by either a circuit breaker (CB) or a fuse. Fuses are one-time protection devices — once blown they must be replaced with a fuse of identical rating. Spare fuses of each rating used in the aircraft should be carried on board.",
        "Circuit breakers are resettable protection devices. When current exceeds the rated value, the breaker trips (pops out) and disconnects the circuit. A tripped breaker can be reset once by pushing it back in after allowing a short cooling period. If it trips again immediately, a fault exists in that circuit and the breaker must be left out — do not continue to reset a repeatedly tripping breaker as this risks starting an electrical fire.",
        "In an emergency, specific circuit breakers may be pulled intentionally to disable a malfunctioning system (e.g. a continuously transmitting radio, a runaway electric trim). The location and function of all circuit breakers must be known to the pilot. Circuit breaker panels are typically located on the instrument panel or a side panel within easy reach.",
        "During pre-flight, verify all circuit breakers are in (not tripped). A tripped breaker on the ground before flight indicates a fault that must be investigated before departure.",

        "## VOR — VHF OMNIDIRECTIONAL RANGE",
        "The VOR (VHF Omnidirectional Range) is the primary short-range radio navigation aid used in European and North American airspace. It operates in the VHF band between 108.00 MHz and 117.95 MHz — the lower portion of this band (108.00-111.95 MHz, odd tenths only) is shared with ILS. VOR frequencies are selected on the NAV radio.",
        "Operating principle: The VOR ground station transmits two signals simultaneously — a reference signal (omnidirectional) and a rotating directional signal that rotates at 30 revolutions per second. The phase difference between these two signals at the receiving aircraft determines the aircraft's bearing from the VOR — called a radial. A radial is defined as a magnetic bearing FROM the VOR. For example, an aircraft on the 090 radial is due east of the VOR.",
        "The VOR receiver in the aircraft drives a Course Deviation Indicator (CDI). The pilot selects a course (the OBS — Omni Bearing Selector) and the CDI needle shows whether the aircraft is on that course, to the left, or to the right. Each dot of deflection typically represents 2° of course deviation. The TO/FROM flag indicates whether the selected course is taking the aircraft towards (TO) or away from (FROM) the VOR. If the flag shows TO and the needle is deflected to the right, the station is to the right of the selected course — turn right to intercept.",
        "VOR accuracy and range: VOR accuracy is typically ±1° at the station. Range is line-of-sight and increases with altitude — at 5000ft AGL, range is approximately 80-100nm for a high-power VOR (VOR or VORTAC). Terminal VORs (TVOR) have lower power and shorter range, typically 25nm, and are used for approaches. VORs are subject to reflections (multipath errors) near terrain and buildings — always use VOR indications with an awareness of local terrain.",
        "VORTAC combines a VOR with a military TACAN (Tactical Air Navigation) transponder beacon. The TACAN provides DME for both military and civilian users. VOR/DME combines VOR with a co-located civilian DME. These co-located stations allow the pilot to determine a precise position fix from a single station.",

        "## NDB AND ADF",
        "The Non-Directional Beacon (NDB) is a ground-based radio station that transmits an omnidirectional signal in the Low Frequency (LF) and Medium Frequency (MF) bands between 190 kHz and 1750 kHz. The signal carries an identification code in Morse. NDBs are used for en-route navigation, initial approach fixes, and as locators on instrument approaches.",
        "The Automatic Direction Finder (ADF) in the aircraft detects the direction of the NDB signal and displays it on the ADF indicator or Radio Magnetic Indicator (RMI). The ADF needle always points towards the NDB regardless of the aircraft's heading. On a fixed-card ADF indicator, the needle shows the relative bearing to the station (bearing relative to the nose of the aircraft). On an RMI, the needle shows the magnetic bearing to the station.",
        "To track to an NDB: turn to place the ADF needle on the nose (0° relative bearing). The aircraft is now heading directly towards the NDB but wind will cause drift — the aircraft will track a curved path. To maintain a straight track, the pilot must apply a wind correction angle and accept that the ADF needle will be deflected slightly from the nose.",
        "NDB errors and limitations: Night effect — at night, sky waves (signals reflected from the ionosphere) combine with the ground wave at the receiver, causing erratic needle oscillations and increased range but unreliable bearings. This effect is most pronounced at dawn and dusk. Coastal refraction — NDB signals refract (bend) as they cross a coastline at an angle, causing bearing errors. Mountain effect — high terrain can reflect NDB signals, causing false bearing indications. Precipitation static — rain, snow, or flying through charged clouds can cause the ADF needle to point towards areas of precipitation rather than the NDB. Thunderstorm effect — ADF needles point towards areas of lightning activity. NDB accuracy is typically ±5°, significantly less precise than VOR.",

        "## DME — DISTANCE MEASURING EQUIPMENT",
        "Distance Measuring Equipment (DME) operates in the Ultra High Frequency (UHF) band between 962 MHz and 1213 MHz. DME provides the pilot with a continuous readout of slant range distance to the DME ground station in nautical miles, and often also groundspeed and time to station.",
        "Operating principle: The aircraft's DME interrogator transmits paired pulses to the ground transponder. The ground station receives the interrogation and responds with paired reply pulses on a different frequency after a fixed delay of 50 microseconds. The airborne equipment measures the total time between transmission and receipt of the reply, subtracts the fixed 50-microsecond ground delay, and converts the remaining time to a distance.",
        "DME distance is slant range — the straight-line distance between the aircraft and the ground station, not the horizontal distance over the ground. At high altitude directly overhead the station, DME reads the aircraft's altitude above the station (in nautical miles), not zero. The difference between slant range and horizontal distance is only significant at low altitude and close to the station — beyond approximately 5nm, the difference is negligible for practical navigation.",
        "DME is co-located with VOR, ILS, or TACAN at most stations. When paired with a VOR, the combination allows a position fix from a single ground station (a range and a radial). DME is also used during instrument approaches to identify distance from the threshold.",

        "## GPS — GLOBAL POSITIONING SYSTEM",
        "GPS (Global Positioning System) is a satellite-based navigation system operated by the United States Department of Defense. It uses a constellation of at least 24 satellites in medium Earth orbit (approximately 20,200 km altitude) broadcasting precise timing signals. Other global satellite navigation systems (GNSS) exist: GLONASS (Russia), Galileo (European Union), and BeiDou (China). Modern aviation receivers often use multiple constellations simultaneously for improved accuracy and availability.",
        "Operating principle: The GPS receiver measures the time taken for signals from multiple satellites to reach the antenna. Since the signals travel at the speed of light, the time delay determines the distance (range) from each satellite. With three satellites, a two-dimensional position fix is possible; with four or more satellites, a three-dimensional fix (latitude, longitude, and altitude) is obtained. The more satellites visible, the more accurate the position.",
        "GPS accuracy: A standard GPS receiver achieves accuracy of approximately 15 metres. WAAS (Wide Area Augmentation System, used in North America) and EGNOS (European Geostationary Navigation Overlay Service, used in Europe) are Satellite Based Augmentation Systems (SBAS) that use a network of precisely surveyed ground stations to detect and correct GPS errors, improving accuracy to approximately 1-3 metres. WAAS/EGNOS-enabled GPS receivers can be used for precision approaches (LPV — Localiser Performance with Vertical guidance).",
        "GPS limitations and vulnerabilities: GPS signals are extremely weak (the satellites are very distant) and can be affected by solar activity, atmospheric disturbances, and multipath errors (reflections from terrain or buildings). GPS is vulnerable to jamming (deliberate transmission of interfering signals) and spoofing (transmission of false GPS signals to mislead receivers). These are real threats in certain areas. GPS can also fail due to satellite failures, receiver malfunction, or antenna issues. For these reasons, GPS should always be used in conjunction with other navigation methods, and pilots must maintain proficiency in conventional navigation. GPS altitude is based on an ellipsoidal Earth model and may differ from barometric altitude — always use barometric altitude for vertical separation.",
        "RAIM (Receiver Autonomous Integrity Monitoring) is a feature of aviation GPS receivers that monitors the consistency of the satellite signals being received. If RAIM detects an error or insufficient satellites for integrity monitoring, it provides a warning to the pilot. RAIM availability must be checked for IFR GPS approaches — it must be confirmed available for the intended approach time and location.",

        "## THE TRANSPONDER",
        "The transponder is an aircraft radio transmitter-receiver that responds automatically to interrogation signals from ground-based Secondary Surveillance Radar (SSR) or from Traffic Collision Avoidance Systems (TCAS) in other aircraft. When interrogated, the transponder transmits a reply that allows ATC to identify the aircraft on radar and determine its position and altitude.",
        "Mode A: The transponder transmits a 4-digit octal squawk code (digits 0-7 only, no 8 or 9). The squawk code is assigned by ATC and allows the controller to identify the specific aircraft on radar. Mode A provides position information only — no altitude.",
        "Mode C: Mode C adds automatic pressure altitude encoding to the Mode A reply. The transponder reads the aircraft's encoding altimeter and transmits the pressure altitude (in 100ft increments) to ATC. ATC radar systems display this altitude alongside the radar return, allowing controllers to verify aircraft altitude. Mode C is mandatory in many airspace classes and transponder mandatory zones.",
        "Mode S: Mode S (Mode Select) is an advanced transponder mode that assigns every aircraft a unique 24-bit ICAO address — analogous to a permanent registration number transmitted by the transponder. Unlike Modes A and C which respond to all interrogations simultaneously (causing garbling when multiple aircraft respond together), Mode S uses selective interrogation — the ground station interrogates specific aircraft individually using their unique address. This eliminates garbling and greatly increases the capacity of SSR systems. Mode S also transmits additional data including aircraft identification (callsign), selected altitude, indicated airspeed, and track angle.",
        "ADS-B (Automatic Dependent Surveillance — Broadcast): Mode S Extended Squitter (Mode S ES) enables ADS-B, in which the transponder continuously broadcasts the aircraft's GPS-derived position, altitude, velocity, and identification approximately twice per second on 1090 MHz — without waiting for interrogation. This information is received by ATC ground stations (ADS-B Out) and by other aircraft equipped with ADS-B In receivers, enabling traffic awareness displays in the cockpit (known as TIS-B traffic or direct ADS-B traffic). ADS-B is increasingly mandated in various airspace types and is replacing conventional radar in some areas.",
        "Special squawk codes that must be memorised: 7700 is the emergency code — it triggers an immediate alert at all ATC radar stations and should be set as soon as an emergency is declared. 7600 is the radio failure code — set this if radio communication is lost. It alerts ATC to the communication failure and triggers lost communication procedures. 7500 is the hijack code — setting this triggers an immediate and serious security response from ATC and law enforcement; it should never be set accidentally. 7000 is the VFR conspicuity code used in European airspace by VFR flights not in receipt of an ATC service — it makes the aircraft visible to ATC radar without requiring a specific assigned code.",
        "Transponder operation: The transponder should be set to STANDBY on the ground (to avoid interfering with ground radar during taxiing) and switched to ALT (Mode C) before take-off. At some aerodromes, ATC may instruct the transponder to be turned on before taxiing for surface movement radar. IDENT: When instructed to IDENT by ATC, press the IDENT button. This causes a special identification pulse (SPI) that makes the aircraft's radar return bloom or highlight temporarily on the controller's screen for approximately 30 seconds — allowing the controller to positively identify the specific aircraft.",

        "## ELECTRONIC FLIGHT INSTRUMENTS AND GLASS COCKPITS",
        "Modern light aircraft increasingly use glass cockpit avionics systems in place of traditional electromechanical instruments. These systems use solid-state sensors (accelerometers, rate gyros, air data computers) to measure aircraft state, and LCD displays to present the information in a highly integrated format.",
        "The Primary Flight Display (PFD) replaces the six primary flight instruments (AI, ASI, altimeter, VSI, DI/HSI, and turn coordinator) with a single large screen showing all of this information in an integrated format. The PFD typically shows a large artificial horizon in the centre, with digital airspeed and altitude tapes on the left and right, vertical speed indication, heading display, and autopilot status.",
        "The Multi-Function Display (MFD) shows moving map navigation, engine instruments, weather, terrain awareness, traffic information, and other data. In a twin-display system, the PFD is on the left and MFD on the right. Some systems use three displays.",
        "Advantages of glass cockpit systems: integrated presentation reduces scan time, trend information is immediately visible, GPS navigation is deeply integrated, weather and terrain data can be overlaid, and automated alerts reduce pilot workload. Disadvantages: a single display failure can remove multiple instruments simultaneously (though backup instruments are required); pilots may become over-reliant on automation; and the complexity of the interface requires significant training.",
        "Backup instruments are mandatory in glass cockpit aircraft. These are typically a small, battery-powered standby AI and ASI/altimeter, completely independent of the main avionics. In the event of a total avionics failure (e.g. loss of electrical power), the standby instruments provide essential attitude and airspeed information.",
        "AHRS (Attitude and Heading Reference System) replaces the vacuum-driven gyroscopes in glass cockpit aircraft. It uses solid-state rate sensors (MEMS gyroscopes) and accelerometers, combined with magnetometers and GPS, to compute attitude and heading. AHRS is more reliable than vacuum gyros (no mechanical failure modes), faster to align, and provides additional data. However, AHRS requires electrical power and can be affected by strong magnetic fields or GPS outages.",
        "The Air Data Computer (ADC) processes pitot and static pressure inputs digitally to compute airspeed, altitude, vertical speed, Mach number, and TAS. It replaces the individual pitot-static instruments with calculated values displayed on the PFD. ADC failures can affect all airspeed and altitude information simultaneously — another reason why standby instruments are essential.",
        ],
        keyFacts: [
            "14V or 28V DC systems; alternator charges battery and powers loads during flight",
            "Negative ammeter or warning light = alternator failure — battery is only source, land soon",
            "VOR operates 108-117.95 MHz; CDI shows deviation from selected radial; TO/FROM flag indicates direction",
            "NDB operates 190-1750 kHz; ADF needle points TO the NDB",
            "DME gives slant range distance in nm — not horizontal distance",
            "Mode A = squawk code; Mode C = altitude; Mode S = unique address + data",
            "7700 = emergency; 7600 = radio failure; 7500 = hijack; 7000 = VFR conspicuity",
            "GPS accurate to ~15m; WAAS improves precision for approaches",
            "Circuit breaker trips = reset once only — if it trips again, leave out",
            "ADS-B broadcasts GPS position continuously to ATC and other aircraft",
        ]
        },
    ]
    },
}

export default function Synopsis({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = React.use(params)
  const data = synopsisData[subject as keyof typeof synopsisData]
  const [activeUnit, setActiveUnit] = useState(1)

  function scrollToUnit(id: number) {
    const el = document.getElementById(`unit-${id}`)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    setActiveUnit(id)
  }
  

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text2)" }}>Synopsis not available yet.</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "2rem 1rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative" }}>

            <button onClick={() => window.location.href = "/"} style={{ background: "none", border: "none", color: "var(--text2)", fontSize: "14px", cursor: "pointer", padding: 0, marginBottom: "1.5rem" }}>
            ← Back
            </button>

            <div style={{ background: "#0f172a", borderRadius: "16px", padding: "1.5rem", marginBottom: "2rem" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>
                Study notes
            </p>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
                {data.title}
            </h1>
            </div>

            {/* Mobile unit menu */}
            <div className="synopsis-mobile-menu" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "12px", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Contents</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {data.units.map(unit => (
                <button key={unit.id} onClick={() => scrollToUnit(unit.id)} style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--text2)", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: '"Futura", "Century Gothic", "Trebuchet MS", sans-serif' }}>
                    {unit.id}. {unit.name}
                </button>
                ))}
            </div>
            </div>

            {data.units.map(unit => (
            <div key={unit.id} id={`unit-${unit.id}`} style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
                <span style={{ background: "#f59e0b", color: "#0f172a", fontSize: "16px", fontWeight: 900, padding: "3px 10px", borderRadius: "4px", letterSpacing: "0.06em" }}>
                    UNIT {unit.id}
                </span>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text)" }}>
                    {unit.name}
                </h2>
                </div>

                <div style={{ background: "var(--surface)", borderRadius: "14px", border: "1px solid var(--border)", padding: "1.5rem", marginBottom: "1rem" }}>
                <div style={{ color: "var(--text2)", lineHeight: "1.8", fontSize: "0.95rem" }}>
                    {Array.isArray(unit.content)
                    ? unit.content.map((paragraph, i) =>
                        paragraph.startsWith("##") ? (
                            <h3 key={i} style={{ fontWeight: 700, color: "var(--text)", fontSize: "15px", margin: "1.5rem 0 0.5rem", fontFamily: '"Futura", "Century Gothic", "Trebuchet MS", sans-serif', letterSpacing: "0.04em" }}>
                            {paragraph.replace("## ", "")}
                            </h3>
                        ) : (
                            <p key={i} style={{ marginBottom: "1rem", margin: "0 0 1rem" }}>
                            {paragraph}
                            </p>
                        )
                        )
                    : <p>{unit.content}</p>
                    }
                </div>
                </div>

                <div style={{ background: "#0f172a", borderRadius: "14px", padding: "1.25rem 1.5rem" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, color: "#f59e0b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    Key facts
                </p>
                {unit.keyFacts.map((fact, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                    <span style={{ color: "#f59e0b", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>→</span>
                    <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: "1.5", margin: 0 }}>{fact}</p>
                    </div>
                ))}
                </div>
            </div>
            ))}

        </div>

        {/* Desktop sidebar */}
        <div className="synopsis-sidebar" style={{ width: "180px", position: "fixed", top: "100px", left: "calc(50% + 360px)" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Contents</div>
            {data.units.map(unit => (
            <button key={unit.id} onClick={() => scrollToUnit(unit.id)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "6px 10px", borderRadius: "8px", fontSize: "13px", fontWeight: activeUnit === unit.id ? 700 : 400, color: activeUnit === unit.id ? "var(--accent)" : "var(--text2)", borderLeft: `2px solid ${activeUnit === unit.id ? "var(--accent)" : "var(--border)"}`, marginBottom: "4px", fontFamily: '"Futura", "Century Gothic", "Trebuchet MS", sans-serif' }}>
                Unit {unit.id} — {unit.name}
            </button>
            ))}
        </div>

        </div>
    )
}