/* ============================================
   BUT WHAT CAN YOU DO? - Statewide Race Context
   Manual, source-backed context for national + governor coverage.

   This file is not a substitute for candidate research. It tells the site
   which races need attention, where source-backed data exists, and where
   stances still require individual review.
   ============================================ */

const HIGHLIGHTED_STATE_KEYS = [
  'AL', 'AZ', 'CA', 'CO', 'FL', 'IA', 'IL', 'LA', 'ME', 'MI', 'MO', 'NC',
  'NE', 'NM', 'NY', 'OH', 'PA', 'TN', 'TX', 'UT', 'VA', 'WA'
];

const CAMPAIGN_POSITIVE_EXAMPLES = [
  {
    id: 'summer-lee-pa12',
    name: 'Summer Lee',
    party: 'D',
    office: 'U.S. House',
    state: 'PA',
    district: 'PA-12',
    recommendation: 'Issue-aligned Democrat to support where she is confirmed on the ballot.',
    why: 'Voted Nay on all three saved House weapons votes: H.R. 6126, H.R. 8034, and H.R. 8369.',
    caveat: 'This is an issue-specific campaign signal, not a blanket statement about every policy position.',
    votes: { hr6126: 'Nay', hr8034: 'Nay', hr8369: 'Nay' },
    sources: ['Official House Clerk XML snapshots and generated data/rollcalls/member-vote-summary-2024.json', 'FEC candidate-filing snapshot is pending after DEMO_KEY rate limiting; verify ballot status before public endorsement copy.']
  },
  {
    id: 'niki-conforti-il06',
    name: 'Niki Conforti',
    party: 'R',
    office: 'U.S. House',
    state: 'IL',
    district: 'IL-06',
    recommendation: 'Issue-aligned Republican to support. Won her primary and is on the November ballot.',
    why: 'Publicly refused foreign lobby funding: "I\'m not somebody who can be bought." Advocates redirecting military aid spending to domestic needs — veterans, healthcare, infrastructure. Running against a Democrat who accepted nearly $300,000 from the foreign lobby.',
    caveat: 'No congressional voting record yet. The recommendation is based on public statements and her refusal of foreign lobby money, not a legislative track record. Verify her positions remain consistent as the campaign progresses.',
    votes: null,
    sources: ['Arab News interview, Jan 12 2026', 'FEC candidate filings, Ballotpedia IL-06 2026']
  },
  {
    id: 'thomas-massie-proof-point',
    name: 'Thomas Massie',
    party: 'R',
    color: 'yellow',
    office: 'U.S. House',
    state: 'KY',
    district: 'KY-04',
    recommendation: 'Proof point, not a current general-election recommendation.',
    why: 'Voted Nay on all three saved House weapons votes and became the clearest Republican example of dissent being punished.',
    caveat: 'He lost his 2026 primary, so he should be used as evidence that both parties punish dissent, not as an active November recommendation.',
    votes: { hr6126: 'Nay', hr8034: 'Nay', hr8369: 'Nay' },
    sources: ['Official House Clerk XML snapshots and generated data/rollcalls/member-vote-summary-2024.json', 'Kentucky primary reporting and election results require final source review before public claim pages.']
  }
];

const STATE_RACE_EXPANSIONS = {
  CA: {
    name: 'California',
    redistricted: true,
    redistrictingNote: 'California is highlighted because new maps affect the 2026 House landscape and multiple close districts are already in the database.',
    contextNotes: [
      'Governor race is open because Gov. Gavin Newsom is term-limited.',
      'California uses a top-two primary system, so party labels alone do not tell the full story.',
      'Candidate stances for open statewide candidates need individual research from campaign sites, public statements, donors, and endorsements.'
    ],
    governor: {
      rating: 'Open seat - research pending',
      note: '2026 governor race. Do not make a recommendation until candidate stances and funding are researched.',
      researchStatus: 'Needs candidate stance research',
      source: 'State election calendar/context; candidate-level verification pending.'
    },
    senateNote: 'No regularly scheduled U.S. Senate race in California in 2026.'
  },
  CO: {
    name: 'Colorado',
    redistricted: false,
    contextNotes: [
      'Colorado has both a governor race and a U.S. Senate race in 2026.',
      'CO-08 is already tracked as a competitive House race; statewide candidate stances still need research.'
    ],
    governor: {
      rating: 'Open seat - research pending',
      note: '2026 governor race. Gov. Jared Polis is term-limited.',
      researchStatus: 'Needs candidate stance research',
      source: 'State election calendar/context; candidate-level verification pending.'
    },
    senate: {
      type: 'regular',
      rating: 'Research pending',
      note: 'U.S. Senate race is on the 2026 ballot. Candidate records and lobbying/funding relationships need review before recommendations.',
      researchStatus: 'Needs federal candidate and stance research',
      source: 'FEC/API snapshot pending; public election context.'
    }
  },
  IA: {
    name: 'Iowa',
    redistricted: false,
    contextNotes: [
      'Iowa has a governor race, a U.S. Senate race, and IA-01 in the competitive House database.',
      'This is a high-value state for economic, rural, veteran, and fiscal-accountability messaging.'
    ],
    governor: {
      rating: 'Open/competitive - research pending',
      note: '2026 governor race. Candidate field and stances need verification from state sources and campaign materials.',
      researchStatus: 'Needs candidate stance research',
      source: 'State election context; candidate-level verification pending.'
    },
    senate: {
      type: 'regular',
      rating: 'Research pending',
      note: 'U.S. Senate race is on the 2026 ballot. Candidate records and lobbying/funding relationships need review before recommendations.',
      researchStatus: 'Needs federal candidate and stance research',
      source: 'FEC/API snapshot pending; public election context.'
    }
  },
  ME: {
    name: 'Maine',
    redistricted: false,
    contextNotes: [
      'Maine has an open governor race, a U.S. Senate race, and ME-02 as an open competitive House seat.',
      'ME-02 is especially important because Jared Golden retired after holding a complicated weapons-funding record.'
    ],
    governor: {
      rating: 'Open seat - research pending',
      note: '2026 governor race. Gov. Janet Mills is term-limited.',
      researchStatus: 'Needs candidate stance research',
      source: 'State election context; candidate-level verification pending.'
    },
    senate: {
      type: 'regular',
      rating: 'Research pending',
      note: 'U.S. Senate race is on the 2026 ballot. Candidate records and lobbying/funding relationships need review before recommendations.',
      researchStatus: 'Needs federal candidate and stance research',
      source: 'FEC/API snapshot pending; public election context.'
    }
  },
  MI: {
    name: 'Michigan',
    redistricted: false,
    contextNotes: [
      'Michigan has an open governor race, an open U.S. Senate race, and MI-07 in the competitive House database.',
      'Michigan also has Jewish, Arab, Muslim, labor, college, and suburban audiences that require precise, careful messaging.'
    ],
    governor: {
      rating: 'Open seat - research pending',
      note: '2026 governor race. Gov. Gretchen Whitmer is term-limited.',
      researchStatus: 'Needs candidate stance research',
      source: 'State election context; candidate-level verification pending.'
    },
    senate: {
      type: 'open',
      rating: 'Research pending',
      note: 'Open U.S. Senate race in 2026. Candidate records, public statements, and funding relationships need research before recommendation.',
      researchStatus: 'Needs federal candidate and stance research',
      source: 'FEC/API snapshot pending; public election context.'
    }
  },
  MO: {
    name: 'Missouri',
    redistricted: true,
    redistrictingNote: 'Missouri is highlighted for new congressional maps and national redistricting context, even though it is not currently a governor-race state for 2026.',
    contextNotes: [
      'No 2026 governor race is expected under the normal cycle.',
      'The immediate research need is congressional map impact and candidate/funding review in affected districts.'
    ],
    governorNote: 'No regularly scheduled governor race in Missouri in 2026.',
    senateNote: 'No regularly scheduled U.S. Senate race in Missouri in 2026.'
  },
  NC: {
    name: 'North Carolina',
    redistricted: true,
    redistrictingNote: 'North Carolina is highlighted because new maps and NC-01 make it one of the clearest redistricting-impact states.',
    contextNotes: [
      'No 2026 governor race is expected under the normal cycle.',
      'NC-01 is already in the competitive House database and needs continued candidate/funding review.'
    ],
    governorNote: 'No regularly scheduled governor race in North Carolina in 2026.',
    senate: {
      type: 'regular',
      rating: 'Research pending',
      note: 'U.S. Senate race is on the 2026 ballot. Candidate records and lobbying/funding relationships need review before recommendations.',
      researchStatus: 'Needs federal candidate and stance research',
      source: 'FEC/API snapshot pending; public election context.'
    }
  },
  NE: {
    name: 'Nebraska',
    redistricted: false,
    contextNotes: [
      'Nebraska has a governor race, a U.S. Senate race, and NE-02 as a high-value competitive House race.',
      'NE-02 is a persuasion district where nonpartisan and fiscal-accountability language may matter more than activist framing.'
    ],
    governor: {
      rating: 'Research pending',
      note: '2026 governor race. Candidate stances and funding need verification.',
      researchStatus: 'Needs candidate stance research',
      source: 'State election context; candidate-level verification pending.'
    },
    senate: {
      type: 'regular',
      rating: 'Research pending',
      note: 'U.S. Senate race is on the 2026 ballot. Candidate records and lobbying/funding relationships need review before recommendations.',
      researchStatus: 'Needs federal candidate and stance research',
      source: 'FEC/API snapshot pending; public election context.'
    }
  },
  NM: {
    name: 'New Mexico',
    redistricted: false,
    contextNotes: [
      'New Mexico has an open governor race, a U.S. Senate race, and NM-02 as a competitive House race.',
      'Border-community, Catholic, rural, and working-class frames need careful district-specific testing.'
    ],
    governor: {
      rating: 'Open seat - research pending',
      note: '2026 governor race. Gov. Michelle Lujan Grisham is term-limited.',
      researchStatus: 'Needs candidate stance research',
      source: 'State election context; candidate-level verification pending.'
    },
    senate: {
      type: 'regular',
      rating: 'Research pending',
      note: 'U.S. Senate race is on the 2026 ballot. Candidate records and lobbying/funding relationships need review before recommendations.',
      researchStatus: 'Needs federal candidate and stance research',
      source: 'FEC/API snapshot pending; public election context.'
    }
  },
  NY: {
    name: 'New York',
    redistricted: false,
    contextNotes: [
      'New York has a governor race in 2026 and NY-04 in the competitive House database.',
      'The state is also important for the campaign story because of the Mamdani proof point, but the site must keep city and statewide races distinct.'
    ],
    governor: {
      rating: 'Research pending',
      note: '2026 governor race. Candidate stances and funding need verification before recommendation.',
      researchStatus: 'Needs candidate stance research',
      source: 'State election context; candidate-level verification pending.'
    },
    senateNote: 'No regularly scheduled U.S. Senate race in New York in 2026.'
  },
  PA: {
    name: 'Pennsylvania',
    redistricted: false,
    contextNotes: [
      'Pennsylvania has a governor race in 2026 and PA-07 / PA-10 in the competitive House database.',
      'Summer Lee is a positive Democratic issue example from PA, but PA statewide and competitive-seat candidates still need separate research.'
    ],
    governor: {
      rating: 'Research pending',
      note: '2026 governor race. Candidate stances and funding need verification before recommendation.',
      researchStatus: 'Needs candidate stance research',
      source: 'State election context; candidate-level verification pending.'
    },
    senateNote: 'No regularly scheduled U.S. Senate race in Pennsylvania in 2026.'
  },
  TX: {
    name: 'Texas',
    redistricted: true,
    redistrictingNote: 'Texas is highlighted for new congressional maps, a governor race, a U.S. Senate race, and TX-34 as a competitive/redistricted House race.',
    contextNotes: [
      'Texas requires both federal and governor-race research.',
      'Messaging should include working-class tax accountability, border-community nuance, faith audiences, and military/weapons accountability.'
    ],
    governor: {
      rating: 'Research pending',
      note: '2026 governor race. Candidate stances and funding need verification before recommendation.',
      researchStatus: 'Needs candidate stance research',
      source: 'State election context; candidate-level verification pending.'
    },
    senate: {
      type: 'regular',
      rating: 'Research pending',
      note: 'U.S. Senate race is on the 2026 ballot. Candidate records and lobbying/funding relationships need review before recommendations.',
      researchStatus: 'Needs federal candidate and stance research',
      source: 'FEC/API snapshot pending; public election context.'
    }
  },
  UT: {
    name: 'Utah',
    redistricted: true,
    redistrictingNote: 'Utah is highlighted for redistricting context. Candidate-level research still needs to identify which districts and races should be prioritized.',
    contextNotes: [
      'No 2026 governor race is expected under the normal cycle.',
      'The immediate research need is congressional map impact, write-in rules, and candidate stances in affected districts.'
    ],
    governorNote: 'No regularly scheduled governor race in Utah in 2026.',
    senateNote: 'No regularly scheduled U.S. Senate race in Utah in 2026.'
  },
  WA: {
    name: 'Washington',
    redistricted: false,
    contextNotes: [
      'Washington has WA-03 in the competitive House database.',
      'No 2026 governor race is expected under the normal cycle, so the immediate focus is House candidate record and district messaging.'
    ],
    governorNote: 'No regularly scheduled governor race in Washington in 2026.',
    senateNote: 'No regularly scheduled U.S. Senate race in Washington in 2026.'
  },
  // ── 2026 redistricting wave (post-Callais) ──
  AL: {
    name: 'Alabama',
    redistricted: true,
    redistrictingNote: 'New map finalized June 2, 2026 following racial gerrymandering litigation. Eliminates a previous Democratic advantage. Projected +1 Republican shift.',
    contextNotes: [
      'The Supreme Court\'s Louisiana v. Callais decision weakened Section 2 of the Voting Rights Act, enabling this redraw.',
      'Candidate stances and affected districts need research.'
    ],
    governorNote: 'No regularly scheduled governor race in Alabama in 2026.',
    senateNote: 'No regularly scheduled U.S. Senate race in Alabama in 2026.'
  },
  FL: {
    name: 'Florida',
    redistricted: true,
    redistrictingNote: 'Gov. DeSantis called a special session in anticipation of the Callais ruling. Map signed May 4, 2026. Projected +4 Republican shift across four districts.',
    contextNotes: [
      'One of the most aggressive redraws of the 2026 wave.',
      'Candidate stances and affected districts need research.'
    ],
    governorNote: 'No regularly scheduled governor race in Florida in 2026.',
    senateNote: 'No regularly scheduled U.S. Senate race in Florida in 2026.'
  },
  IL: {
    name: 'Illinois',
    redistricted: false,
    contextNotes: [
      'Illinois is highlighted because IL-06 features Niki Conforti (R), who publicly refused foreign lobby money, running against incumbent Sean Casten (D) who accepted nearly $300,000 from the foreign lobby.'
    ],
    governorNote: 'No regularly scheduled governor race in Illinois in 2026.',
    senateNote: 'No regularly scheduled U.S. Senate race in Illinois in 2026.'
  },
  LA: {
    name: 'Louisiana',
    redistricted: true,
    redistrictingNote: 'Gov. Landry signed new map May 29, 2026, directly utilizing the Callais precedent. Projected +1 Republican shift.',
    contextNotes: [
      'Louisiana v. Callais was the Supreme Court case that triggered the 2026 redistricting wave.',
      'Candidate stances and affected districts need research.'
    ],
    governorNote: 'No regularly scheduled governor race in Louisiana in 2026.',
    senateNote: 'No regularly scheduled U.S. Senate race in Louisiana in 2026.'
  },
  TN: {
    name: 'Tennessee',
    redistricted: true,
    redistrictingNote: 'Signed May 7, 2026 by Gov. Lee. Fractures the Memphis-based 9th district — the state\'s only majority-Black, Democratic-held seat. Projected +1 Republican.',
    contextNotes: [
      'This redraw targets the state\'s sole remaining Democratic-held congressional district.',
      'Candidate stances and affected districts need research.'
    ],
    governorNote: 'No regularly scheduled governor race in Tennessee in 2026.',
    senateNote: 'No regularly scheduled U.S. Senate race in Tennessee in 2026.'
  },
  VA: {
    name: 'Virginia',
    redistricted: true,
    redistrictingNote: 'Voters approved a Democratic-led map via ballot referendum on April 21, 2026 (51.6% to 48.4%). Projected +4 Democratic seat advantage.',
    contextNotes: [
      'Virginia is the only 2026 redistricting state where the new map favors Democrats.',
      'Candidate stances and affected districts need research.'
    ],
    governorNote: 'No regularly scheduled governor race in Virginia in 2026.',
    senateNote: 'No regularly scheduled U.S. Senate race in Virginia in 2026.'
  }
};


const STATE_OFFICIAL_RESEARCH_SOURCES = {
  AZ: [
    { label: 'Arizona Secretary of State elections portal', url: 'https://azsos.gov/elections', useFor: 'Governor ballot/candidate verification, state election calendar, official filings.' }
  ],
  CA: [
    { label: 'California Secretary of State elections portal', url: 'https://www.sos.ca.gov/elections', useFor: 'Top-two primary results, governor candidate verification, statewide election rules.' }
  ],
  CO: [
    { label: 'Colorado Secretary of State elections portal', url: 'https://www.coloradosos.gov/pubs/elections/main.html', useFor: 'Governor and Senate candidate verification, ballot access, official election calendar.' }
  ],
  IA: [
    { label: 'Iowa Secretary of State elections portal', url: 'https://sos.iowa.gov/elections/', useFor: 'Governor and Senate candidate verification, official filings, voter deadlines.' }
  ],
  ME: [
    { label: 'Maine Bureau of Corporations, Elections and Commissions', url: 'https://www.maine.gov/sos/cec/elec/', useFor: 'Governor, Senate, and House ballot/candidate verification.' }
  ],
  MI: [
    { label: 'Michigan Department of State elections portal', url: 'https://www.michigan.gov/sos/elections', useFor: 'Governor, Senate, and House candidate verification, official ballot information.' }
  ],
  MO: [
    { label: 'Missouri Secretary of State elections portal', url: 'https://www.sos.mo.gov/elections', useFor: 'Congressional candidate verification and redistricting-related ballot checks.' }
  ],
  NC: [
    { label: 'North Carolina State Board of Elections', url: 'https://www.ncsbe.gov/', useFor: 'Senate and House candidate verification, NC-01 ballot information, official election notices.' }
  ],
  NE: [
    { label: 'Nebraska Secretary of State elections portal', url: 'https://sos.nebraska.gov/elections', useFor: 'Governor, Senate, and NE-02 candidate verification.' }
  ],
  NM: [
    { label: 'New Mexico Secretary of State voting and elections portal', url: 'https://www.sos.nm.gov/voting-and-elections/', useFor: 'Governor, Senate, and NM-02 candidate verification.' }
  ],
  NY: [
    { label: 'New York State Board of Elections', url: 'https://elections.ny.gov/', useFor: 'Governor and House candidate verification, official election information.' }
  ],
  OH: [
    { label: 'Ohio Secretary of State elections portal', url: 'https://www.ohiosos.gov/elections/', useFor: 'Governor, special Senate, and redistricted House candidate verification.' }
  ],
  PA: [
    { label: 'Pennsylvania voting and elections portal', url: 'https://www.pa.gov/agencies/vote.html', useFor: 'Governor and House candidate verification, state election rules.' }
  ],
  TX: [
    { label: 'Texas Secretary of State elections portal', url: 'https://www.sos.state.tx.us/elections/', useFor: 'Governor, Senate, and redistricted House candidate verification.' }
  ],
  UT: [
    { label: 'Utah elections portal', url: 'https://vote.utah.gov/', useFor: 'Redistricting-impact candidate verification, write-in and ballot rules.' }
  ],
  WA: [
    { label: 'Washington Secretary of State elections portal', url: 'https://www.sos.wa.gov/elections', useFor: 'House candidate verification and official election information.' }
  ]
};
if (typeof STATE_RACES !== 'undefined') {
  Object.keys(STATE_RACE_EXPANSIONS).forEach(state => {
    STATE_RACES[state] = Object.assign({}, STATE_RACE_EXPANSIONS[state], STATE_RACES[state] || {});
  });
}