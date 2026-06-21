/* ============================================
   BUT WHAT CAN YOU DO? - Statewide Race Context
   Manual, source-backed context for national + governor coverage.

   This file is not a substitute for candidate research. It tells the site
   which races need attention, where source-backed data exists, and where
   stances still require individual review.
   ============================================ */

const HIGHLIGHTED_STATE_KEYS = [
  'AZ', 'CA', 'CO', 'IA', 'ME', 'MI', 'MO', 'NC',
  'NE', 'NM', 'NY', 'OH', 'PA', 'TX', 'UT', 'WA'
];

const RACE_EVIDENCE_STANDARD = {
  sourceFirst: 'Votes, funding, endorsements, and quotes must be source-linked before they are used as claims.',
  noNightlySync: 'No nightly sync. Official/public datasets are refreshed manually, reviewed, then committed.',
  unknownMeansUnknown: 'If a candidate has no voting record and no clear public statement, the stance is marked unknown until researched.',
  distinction: 'The campaign targets votes, funding, weapons policy, and lobbying pressure - never Jewish people or any identity group.'
};

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
    id: 'warren-davidson-oh08',
    name: 'Warren Davidson',
    party: 'R',
    office: 'U.S. House',
    state: 'OH',
    district: 'OH-08',
    recommendation: 'Issue-relevant Republican example to support or pressure where he is confirmed on the ballot, depending on local alternatives.',
    why: 'Voted Nay on H.R. 8034 and H.R. 8369, including the bill to force paused bomb shipments. He voted Yea on H.R. 6126, so the record is not perfect.',
    caveat: 'Use carefully: this shows the campaign is not partisan, but the recommendation should stay tied to the weapons-funding record and any 2026 challenger research.',
    votes: { hr6126: 'Yea', hr8034: 'Nay', hr8369: 'Nay' },
    sources: ['Official House Clerk XML snapshots and generated data/rollcalls/member-vote-summary-2024.json', 'FEC candidate-filing snapshot is pending after DEMO_KEY rate limiting; verify ballot status before public endorsement copy.']
  },
  {
    id: 'thomas-massie-proof-point',
    name: 'Thomas Massie',
    party: 'R',
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
  }
};

if (typeof STATE_RACES !== 'undefined') {
  Object.keys(STATE_RACE_EXPANSIONS).forEach(state => {
    STATE_RACES[state] = Object.assign({}, STATE_RACE_EXPANSIONS[state], STATE_RACES[state] || {});
  });
}