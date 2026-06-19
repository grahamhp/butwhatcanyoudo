/* ============================================
   BUT WHAT CAN YOU DO? — Candidate Database
   All data sourced from verified public records.
   
   SOURCES:
   - AIPAC endorsements & funding: trackaipac.com, OpenSecrets.org, FEC.gov
   - Vote records: clerk.house.gov, congress.gov (roll call records)
   - Race ratings: Cook Political Report, June 2026
   - District info: Ballotpedia, Census Bureau
   - Massie primary data: Kentucky Secretary of State, AP
   - Mamdani election data: NYC Board of Elections, AP
   
   DATA INTEGRITY NOTES:
   - Dollar amounts marked [VERIFIED] come from FEC filings or OpenSecrets
   - Dollar amounts marked [ESTIMATED] are derived from Track AIPAC's 
     aggregation of FEC data and may include PAC + earmarked contributions
   - Vote records are from clerk.house.gov roll call records
   - Where data could not be verified, fields are set to null
   
   LAST UPDATED: June 18, 2026
   ============================================ */

// AIPAC spending overview (verified from OpenSecrets/FEC)
const AIPAC_OVERVIEW = {
  pac2024Total: 45200000,        // $45.2M direct PAC contributions, 2024 cycle [VERIFIED - FEC]
  udp2024Total: 81700000,        // ~$81.7M UDP super PAC spending, 2024 cycle [VERIFIED - OpenSecrets]
  combined2024: 126900000,       // ~$126.9M total, 2024 cycle [VERIFIED]
  pac2026ToDate: 28000000,       // ~$28M delivered to campaigns as of early 2026 [ESTIMATED - OpenSecrets]
  antiMassieSpending: 9000000,   // $9M+ from AIPAC-affiliated groups against Massie [VERIFIED - AP/FEC]
  massieRaceTotalOutside: 32000000, // $32M total outside spending in Massie primary [VERIFIED - AP]
  pacFecId: 'C00797670',        // AIPAC PAC FEC Committee ID
  source: 'OpenSecrets.org, FEC.gov, Associated Press'
};

// Key votes on weapons transfers / aid to the government of Israel
const KEY_VOTES = [
  {
    id: 'hr6126',
    title: 'H.R. 6126 — Israel Security Supplemental Appropriations Act',
    date: 'November 2, 2023',
    description: '$14.3 billion standalone aid package for the government of Israel, offset by cuts to IRS funding. Only 12 Democrats voted yes. Thomas Massie and Marjorie Taylor Greene were the only Republicans to vote no.',
    result: 'Passed 226-196',
    resultDetail: { yes: 226, no: 196 },
    source: 'clerk.house.gov'
  },
  {
    id: 'hr8034',
    title: 'H.R. 8034 — Israel Security Supplemental Appropriations Act, 2024',
    date: 'April 20, 2024',
    description: '$26.38 billion in aid to the government of Israel, including $4 billion for Iron Dome/David\'s Sling and $1.2 billion for Iron Beam. Roll Call 152.',
    result: 'Passed 366-58',
    resultDetail: { yes: 366, no: 58, repYes: 193, repNo: 21, demYes: 173, demNo: 37 },
    source: 'clerk.house.gov, Roll Call 152'
  },
  {
    id: 'hr815',
    title: 'H.R. 815 — National Security Supplemental',
    date: 'April 23, 2024',
    description: 'Senate vehicle combining Ukraine and Israel aid. Signed by President Biden on April 24, 2024.',
    result: 'Passed 79-18 (Senate)',
    resultDetail: { yes: 79, no: 18 },
    source: 'senate.gov'
  },
  {
    id: 'hr8369',
    title: 'H.R. 8369 — Israel Security Assistance Support Act',
    date: 'May 16, 2024',
    description: 'Bill to force weapons delivery to the government of Israel after President Biden paused shipments of 2,000-lb and 500-lb bombs. 208 Republicans and 16 Democrats voted yes. Biden issued veto threat; Senate never took it up.',
    result: 'Passed 224-187',
    resultDetail: { yes: 224, no: 187, repYes: 208, demYes: 16 },
    source: 'clerk.house.gov'
  }
];

// All 50 US States for dropdown
const US_STATES = [
  { abbr: 'AL', name: 'Alabama' }, { abbr: 'AK', name: 'Alaska' },
  { abbr: 'AZ', name: 'Arizona' }, { abbr: 'AR', name: 'Arkansas' },
  { abbr: 'CA', name: 'California' }, { abbr: 'CO', name: 'Colorado' },
  { abbr: 'CT', name: 'Connecticut' }, { abbr: 'DE', name: 'Delaware' },
  { abbr: 'FL', name: 'Florida' }, { abbr: 'GA', name: 'Georgia' },
  { abbr: 'HI', name: 'Hawaii' }, { abbr: 'ID', name: 'Idaho' },
  { abbr: 'IL', name: 'Illinois' }, { abbr: 'IN', name: 'Indiana' },
  { abbr: 'IA', name: 'Iowa' }, { abbr: 'KS', name: 'Kansas' },
  { abbr: 'KY', name: 'Kentucky' }, { abbr: 'LA', name: 'Louisiana' },
  { abbr: 'ME', name: 'Maine' }, { abbr: 'MD', name: 'Maryland' },
  { abbr: 'MA', name: 'Massachusetts' }, { abbr: 'MI', name: 'Michigan' },
  { abbr: 'MN', name: 'Minnesota' }, { abbr: 'MS', name: 'Mississippi' },
  { abbr: 'MO', name: 'Missouri' }, { abbr: 'MT', name: 'Montana' },
  { abbr: 'NE', name: 'Nebraska' }, { abbr: 'NV', name: 'Nevada' },
  { abbr: 'NH', name: 'New Hampshire' }, { abbr: 'NJ', name: 'New Jersey' },
  { abbr: 'NM', name: 'New Mexico' }, { abbr: 'NY', name: 'New York' },
  { abbr: 'NC', name: 'North Carolina' }, { abbr: 'ND', name: 'North Dakota' },
  { abbr: 'OH', name: 'Ohio' }, { abbr: 'OK', name: 'Oklahoma' },
  { abbr: 'OR', name: 'Oregon' }, { abbr: 'PA', name: 'Pennsylvania' },
  { abbr: 'RI', name: 'Rhode Island' }, { abbr: 'SC', name: 'South Carolina' },
  { abbr: 'SD', name: 'South Dakota' }, { abbr: 'TN', name: 'Tennessee' },
  { abbr: 'TX', name: 'Texas' }, { abbr: 'UT', name: 'Utah' },
  { abbr: 'VT', name: 'Vermont' }, { abbr: 'VA', name: 'Virginia' },
  { abbr: 'WA', name: 'Washington' }, { abbr: 'WV', name: 'West Virginia' },
  { abbr: 'WI', name: 'Wisconsin' }, { abbr: 'WY', name: 'Wyoming' }
];

// Candidate database — toss-up and competitive races
// ⚠️ CORRECTIONS APPLIED from verified research:
// - Jared Golden (ME-2): RETIRED November 2025, not running
// - David Schweikert (AZ-1): Running for AZ Governor, not House reelection  
// - Don Bacon (NE-2): RETIRED June 2025, open seat
const CANDIDATES = [
  // ==========================================
  // DEMOCRATIC-HELD TOSS-UPS
  // ==========================================
  {
    id: 'ca13-gray',
    name: 'Adam Gray',
    party: 'D',
    state: 'CA',
    district: 13,
    districtLabel: 'CA-13',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: null,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null },
    quotes: [],
    challenger: 'TBD',
    redistricted: true,
    demographics: {
      type: 'rural-agricultural',
      religionDominant: 'Christian',
      urbanRural: 'Rural',
      notes: 'Central Valley agricultural district. Advanced from June 2 primary.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'ca45-tran',
    name: 'Derek Tran',
    party: 'D',
    state: 'CA',
    district: 45,
    districtLabel: 'CA-45',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: null,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null },
    quotes: [],
    challenger: 'TBD',
    redistricted: true,
    demographics: {
      type: 'suburban',
      religionDominant: 'Mixed',
      urbanRural: 'Suburban',
      notes: 'Orange County, diverse suburban district. Freshman representative. Advanced from June 2 primary.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'me2-open',
    name: 'Open Seat (Golden retired)',
    party: 'D',
    state: 'ME',
    district: 2,
    districtLabel: 'ME-02',
    incumbent: false,
    running: false,
    rating: 'Toss-up',
    retiredIncumbent: 'Jared Golden',
    retiredReason: 'Retired November 2025, cited family safety concerns',
    aipacFunding: 800000, // ~$800K+ career AIPAC funding to Golden
    aipacEndorsed: true,
    aipacTrip: false,
    keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, // Golden's votes (predecessor)
    quotes: [],
    challenger: 'TBD',
    redistricted: false,
    demographics: {
      type: 'rural-veteran',
      religionDominant: 'Christian',
      urbanRural: 'Rural',
      notes: 'Rural Maine. Golden was a Marine veteran and major recipient of funding from the foreign lobby for the government of Israel (~$800K+ career). Open seat — both parties\' nominees TBD.'
    },
    isOpenSeat: true,
    source: 'Cook Political Report, Ballotpedia, OpenSecrets'
  },
  {
    id: 'nm2-vasquez',
    name: 'Gabe Vasquez',
    party: 'D',
    state: 'NM',
    district: 2,
    districtLabel: 'NM-02',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: 5500,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'Yes' },
    quotes: [],
    notableActions: 'Voted No on first Israel aid bill, then switched to Yes on subsequent packages. Boycotted Netanyahu\'s address to Congress. Called for ceasefire. ~$5.5K in foreign lobby-aligned PAC contributions.',
    challenger: 'Gregory G. Cunningham (R)',
    redistricted: false,
    demographics: {
      type: 'border-community',
      religionDominant: 'Christian-Catholic',
      urbanRural: 'Mixed',
      notes: 'Southern New Mexico border district, large Hispanic population'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'ny4-gillen',
    name: 'Laura Gillen',
    party: 'D',
    state: 'NY',
    district: 4,
    districtLabel: 'NY-04',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: null,
    aipacEndorsed: true,
    aipacTrip: true,
    keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null },
    quotes: [],
    notableActions: 'Went on a trip sponsored by the foreign lobby for the government of Israel in August 2025. Made statements supporting the government of Israel.',
    challenger: 'TBD',
    primaryChallenger: 'Taylor Darling (D) — primary June 23, 2026',
    redistricted: false,
    demographics: {
      type: 'suburban',
      religionDominant: 'Mixed-Jewish-Christian',
      urbanRural: 'Suburban',
      notes: 'Long Island, Nassau County. Significant Jewish population. Facing primary challenge.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'nc1-davis',
    name: 'Don Davis',
    party: 'D',
    state: 'NC',
    district: 1,
    districtLabel: 'NC-01',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: 4000000,
    aipacEndorsed: true,
    aipacTrip: false,
    keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' },
    quotes: [],
    notableActions: '#8 highest recipient of foreign lobby funding in all of Congress (~$4M career). Voted Yes on every weapons package. Endorsed by the foreign lobby for the government of Israel.',
    challenger: 'Laurie Buckhout (R)',
    redistricted: true,
    demographics: {
      type: 'mixed',
      religionDominant: 'Christian-Baptist',
      urbanRural: 'Mixed',
      notes: 'Heavily redistricted — northeastern North Carolina, large Black population. District redrawn to lean more Republican.'
    },
    source: 'Cook Political Report, Ballotpedia, clerk.house.gov, TrackAIPAC/FEC'
  },
  {
    id: 'oh9-kaptur',
    name: 'Marcy Kaptur',
    party: 'D',
    state: 'OH',
    district: 9,
    districtLabel: 'OH-09',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: 5500,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'Yes' },
    quotes: [],
    notableActions: 'Voted No on first Israel aid bill, then switched to Yes on subsequent weapons packages. Longest-serving woman in House history. ~$5.5K in foreign lobby-aligned PAC contributions.',
    challenger: 'Derek Merrin (R)',
    redistricted: true,
    demographics: {
      type: 'working-class',
      religionDominant: 'Christian-Catholic',
      urbanRural: 'Urban-Suburban',
      notes: 'Toledo area. Longest-serving woman in House history. Working-class district.'
    },
    source: 'Cook Political Report, Ballotpedia, clerk.house.gov'
  },
  {
    id: 'oh13-sykes',
    name: 'Emilia Sykes',
    party: 'D',
    state: 'OH',
    district: 13,
    districtLabel: 'OH-13',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: 35000,
    aipacEndorsed: true,
    aipacTrip: true,
    keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'Yes' },
    quotes: [],
    notableActions: 'Voted No on first weapons package, then switched to Yes on subsequent packages. Went on a trip sponsored by the foreign lobby. ~$35K in foreign lobby contributions. Unopposed in May 5 primary.',
    challenger: 'TBD',
    redistricted: true,
    demographics: {
      type: 'urban',
      religionDominant: 'Christian',
      urbanRural: 'Urban',
      notes: 'Akron area. Considered "must-win" for Democrats. Redistricted to be more competitive.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'tx34-gonzalez',
    name: 'Vicente Gonzalez',
    party: 'D',
    state: 'TX',
    district: 34,
    districtLabel: 'TX-34',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: null,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'Yes' },
    quotes: [],
    notableActions: 'Voted No on first Israel aid bill, then switched to Yes on subsequent weapons packages. Co-sponsored anti-UN commission bills.',
    challenger: 'Mayra Flores (R)',
    redistricted: true,
    demographics: {
      type: 'border-community',
      religionDominant: 'Christian-Catholic',
      urbanRural: 'Mixed',
      notes: 'South Texas border district, heavily redistricted, large Hispanic population. Rematch against Flores.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'wa3-perez',
    name: 'Marie Gluesenkamp Perez',
    party: 'D',
    state: 'WA',
    district: 3,
    districtLabel: 'WA-03',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: 285128,
    aipacEndorsed: true,
    aipacTrip: false,
    keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'Yes' },
    quotes: [],
    notableActions: 'Voted No on first Israel aid bill, then switched to Yes on subsequent weapons packages. ~$285K career funding from the foreign lobby for the government of Israel. Confronted at town halls about accepting foreign lobby money.',
    challenger: 'TBD — primary August 4, 2026',
    redistricted: false,
    demographics: {
      type: 'rural-working-class',
      religionDominant: 'Christian',
      urbanRural: 'Rural',
      notes: 'Rural southwestern Washington. Working-class, auto-shop owner. Moderate Democrat in deep-red district.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },

  // ==========================================
  // REPUBLICAN-HELD TOSS-UPS
  // ==========================================
  {
    id: 'az1-open',
    name: 'Open Seat (Schweikert running for Governor)',
    party: 'R',
    state: 'AZ',
    district: 1,
    districtLabel: 'AZ-01',
    incumbent: false,
    running: false,
    rating: 'Toss-up',
    retiredIncumbent: 'David Schweikert',
    retiredReason: 'Running for Arizona Governor (announced October 2025)',
    aipacFunding: null,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, // Schweikert's votes (predecessor)
    quotes: [],
    challenger: 'TBD',
    redistricted: false,
    isOpenSeat: true,
    demographics: {
      type: 'suburban',
      religionDominant: 'Christian-Mormon',
      urbanRural: 'Suburban',
      notes: 'Phoenix suburbs, Scottsdale area. Open seat after Schweikert announced gubernatorial run.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'az6-ciscomani',
    name: 'Juan Ciscomani',
    party: 'R',
    state: 'AZ',
    district: 6,
    districtLabel: 'AZ-06',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: 618522,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' },
    quotes: [],
    notableActions: 'Received ~$619K from the foreign lobby for the government of Israel in 2024 cycle. Voted Yes on every weapons package. Seeking 3rd term.',
    challenger: 'TBD',
    redistricted: false,
    demographics: {
      type: 'suburban-diverse',
      religionDominant: 'Christian-Catholic',
      urbanRural: 'Suburban',
      notes: 'Tucson area. Significant Hispanic population.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'co8-evans',
    name: 'Gabe Evans',
    party: 'R',
    state: 'CO',
    district: 8,
    districtLabel: 'CO-08',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: null,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null },
    quotes: [],
    challenger: 'TBD — CO primary June 30, 2026',
    redistricted: false,
    demographics: {
      type: 'suburban-diverse',
      religionDominant: 'Christian',
      urbanRural: 'Suburban',
      notes: 'North Denver suburbs. Relatively new district created after 2020 census. Unopposed in R primary.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'ia1-miller-meeks',
    name: 'Mariannette Miller-Meeks',
    party: 'R',
    state: 'IA',
    district: 1,
    districtLabel: 'IA-01',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: 66243,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' },
    quotes: [],
    notableActions: 'Voted Yes on every weapons package. ~$66K career funding from the foreign lobby for the government of Israel. Won June 2 primary with ~71.6%.',
    challenger: 'Christina Bohannan (D) — rematch from 2024',
    redistricted: false,
    demographics: {
      type: 'rural',
      religionDominant: 'Christian-Protestant',
      urbanRural: 'Rural',
      notes: 'Southeast Iowa, farming communities. Won previous race by only 6 votes.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'mi7-barrett',
    name: 'Tom Barrett',
    party: 'R',
    state: 'MI',
    district: 7,
    districtLabel: 'MI-07',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: null,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null },
    quotes: [],
    notableActions: 'Freshman — won 2024 after losing to Elissa Slotkin in 2022. No 118th Congress voting record on weapons packages. Predecessor district represented by Slotkin who ran for Senate.',
    challenger: 'TBD',
    redistricted: false,
    demographics: {
      type: 'suburban-rural',
      religionDominant: 'Christian',
      urbanRural: 'Mixed',
      notes: 'Lansing-area district. Michigan has large Arab-American population deeply engaged on this issue.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'ne2-open',
    name: 'Open Seat (Bacon retired)',
    party: 'R',
    state: 'NE',
    district: 2,
    districtLabel: 'NE-02',
    incumbent: false,
    running: false,
    rating: 'Toss-up',
    retiredIncumbent: 'Don Bacon',
    retiredReason: 'Retired June 2025',
    aipacFunding: null,
    aipacEndorsed: true,
    aipacTrip: false,
    keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, // Bacon's votes (predecessor)
    quotes: [],
    notableActions: 'Bacon voted Yes on every weapons package. Was a strong ally of the government of Israel and RJC supporter.',
    challenger: 'TBD',
    redistricted: false,
    isOpenSeat: true,
    demographics: {
      type: 'urban-suburban',
      religionDominant: 'Christian',
      urbanRural: 'Urban-Suburban',
      notes: 'Omaha area. Swing district — gave its electoral vote to Biden in 2020. Open seat.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'pa7-mackenzie',
    name: 'Ryan Mackenzie',
    party: 'R',
    state: 'PA',
    district: 7,
    districtLabel: 'PA-07',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: null,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null },
    quotes: [],
    notableActions: 'Freshman. Unopposed in May 19 primary. Won 2024 race narrowly.',
    challenger: 'Bob Brooks (D)',
    redistricted: false,
    demographics: {
      type: 'suburban',
      religionDominant: 'Christian',
      urbanRural: 'Suburban',
      notes: 'Lehigh Valley, Pennsylvania. Suburban swing district.'
    },
    source: 'Cook Political Report, Ballotpedia'
  },
  {
    id: 'pa10-perry',
    name: 'Scott Perry',
    party: 'R',
    state: 'PA',
    district: 10,
    districtLabel: 'PA-10',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: 132000,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: 'Yes', hr8034: 'No', hr815: null, hr8369: 'No' },
    quotes: [],
    notableActions: 'Former Freedom Caucus chair. Voted Yes on first weapons package, then No on subsequent packages. The foreign lobby for the government of Israel paused fundraising for Perry after his No votes. Career foreign lobby funding ~$132K.',
    challenger: 'Janelle Stelson (D) — rematch from 2024',
    redistricted: false,
    demographics: {
      type: 'suburban-rural',
      religionDominant: 'Christian',
      urbanRural: 'Mixed',
      notes: 'Harrisburg/York area. Former Freedom Caucus chair.'
    },
    source: 'Cook Political Report, Ballotpedia'
  }
];

// The Thomas Massie Story — key data for the campaign narrative
const MASSIE_STORY = {
  name: 'Thomas Massie',
  party: 'R',
  state: 'KY',
  district: 4,
  status: 'Lost primary May 19, 2026',
  defeatedBy: 'Ed Gallrein',
  gallreinVotes: 57822,
  massieVotes: 47539,
  trumpEndorsed: true,
  aipacSpendingAgainst: 9000000,
  totalOutsideSpending: 32000000,
  keyContext: 'Massie was consistently the ONLY Republican to vote against Israel-related legislation. He introduced a bill to require the foreign lobby for the government of Israel to register as a foreign agent under FARA. He voted against H.Res. 888 (affirming Israel\'s right to exist) — one of only 14 total members to do so.',
  campaignNarrative: 'The Republican establishment and foreign lobby groups for the government of Israel spent over $32 million — including $9 million from foreign lobby-affiliated groups alone — to defeat one of their own members because he voted against weapons packages to the government of Israel. This proves the issue crosses party lines: BOTH parties punish dissent.',
  source: 'Kentucky Secretary of State, AP, FEC, OpenSecrets'
};

// The Mamdani Story — key data for the campaign narrative
const MAMDANI_STORY = {
  name: 'Zohran Mamdani',
  office: 'Mayor of New York City',
  electionDate: 'November 4, 2025',
  result: 'Won',
  votePercentage: 50.78,
  opponentName: 'Andrew Cuomo',
  opponentPercentage: 41.32,
  thirdCandidate: 'Curtis Sliwa',
  thirdPercentage: 7.01,
  previousOffice: 'State Assemblyman, Queens',
  historicFirsts: 'First Muslim mayor of NYC. First of South Asian heritage. Youngest mayor in over a century.',
  succeeds: 'Eric Adams',
  tookOffice: 'January 1, 2026',
  campaignNarrative: 'The Democratic establishment poured millions into backing Andrew Cuomo against Mamdani, who opposed weapons packages to the government of Israel. Voters chose Mamdani anyway — proving that when people show up, the money loses.',
  source: 'NYC Board of Elections, AP'
};

// Races to Watch — narrative summaries for featured section
const RACES_TO_WATCH = [
  {
    title: 'Don Davis — NC-01',
    party: 'D',
    candidateId: 'nc1-davis',
    description: 'Heavily redistricted seat in northeastern North Carolina. Davis received significant financial support from the foreign lobby for the government of Israel and voted yes on weapons packages. New district lines redrawn by state Republicans to lean more Republican — bringing in voters who haven\'t locked in yet.',
    whyItMatters: 'New voters + new lines + foreign lobby funding = maximum impact for grassroots pressure.',
    color: 'blue'
  },
  {
    title: 'Tom Barrett — MI-07',
    party: 'R',
    candidateId: 'mi7-barrett',
    description: 'Michigan\'s 7th district near Lansing. Barrett voted yes on all weapons packages and received support from the Republican Jewish Coalition PAC. Michigan has a large Arab-American population deeply engaged on this issue.',
    whyItMatters: 'Michigan is ground zero for this issue. The Arab-American community here is organized and voting.',
    color: 'red'
  },
  {
    title: 'Emilia Sykes — OH-13',
    party: 'D',
    candidateId: 'oh13-sykes',
    description: 'Akron-area district, redistricted to be more competitive. Sykes went on a trip sponsored by the foreign lobby and signed statements supporting the government of Israel. Considered a "must-win" for Democrats.',
    whyItMatters: 'Redistricting made this seat competitive. A strong challenger could flip it.',
    color: 'yellow'
  },
  {
    title: 'Marie Gluesenkamp Perez — WA-03',
    party: 'D',
    candidateId: 'wa3-perez',
    description: 'Rural southwestern Washington. Perez received campaign contributions from the foreign lobby for the government of Israel and has been confronted at town halls about it. A moderate Democrat in a deep-red district — she depends on swing voters.',
    whyItMatters: 'When constituents show up at town halls and ask about foreign lobby money, representatives notice.',
    color: 'blue'
  },
  {
    title: 'Open Seat — NE-02 (Omaha)',
    party: 'R',
    candidateId: 'ne2-open',
    description: 'Don Bacon retired after years as a strong ally of the government of Israel. This Omaha-area seat gave its electoral vote to Biden in 2020 — it is genuinely persuadable. Both parties will fight hard for it.',
    whyItMatters: 'An open seat in a swing district. The ultimate opportunity to elect someone who represents you, not a foreign lobby.',
    color: 'red'
  }
];

// States with new district maps for 2026 — ALL CONFIRMED
const REDISTRICTED_STATES = [
  { state: 'California', abbreviation: 'CA', notes: 'Voters approved new map November 2025. Described as favoring Democrats.' },
  { state: 'Missouri', abbreviation: 'MO', notes: 'Redrawn September 2025. Includes changes to Emanuel Cleaver\'s district.' },
  { state: 'North Carolina', abbreviation: 'NC', notes: 'Redrawn October 2025 by state Republicans. NC-01 (Don Davis) now leans more Republican.' },
  { state: 'Texas', abbreviation: 'TX', notes: 'Governor Abbott signed new maps August 2025. Creates more Republican-friendly seats.' },
  { state: 'Ohio', abbreviation: 'OH', notes: 'New maps finalized after court challenges to previous gerrymander.' },
  { state: 'Utah', abbreviation: 'UT', notes: 'New map finalized. Subject to ongoing court involvement.' }
];

// States where write-in votes are PROHIBITED for federal elections
const WRITE_IN_PROHIBITED = [
  'Arkansas', 'Hawaii', 'Louisiana', 'Mississippi', 'Nevada',
  'New Mexico', 'Oklahoma', 'South Carolina', 'South Dakota'
];

// States with most permissive write-in rules (no candidate registration required)
const WRITE_IN_UNRESTRICTED = [
  'Alabama', 'Iowa', 'New Hampshire', 'New Jersey', 'Pennsylvania', 'Rhode Island'
];

// Helper functions
function getCandidatesByState(state) {
  return CANDIDATES.filter(c => c.state === state);
}

function getCandidatesByParty(party) {
  return CANDIDATES.filter(c => c.party === party);
}

function getRunningCandidates() {
  return CANDIDATES.filter(c => c.running !== false);
}

function getCandidateById(id) {
  return CANDIDATES.find(c => c.id === id);
}

function searchCandidates(query) {
  const q = query.toLowerCase().trim();
  if (!q) return CANDIDATES;
  return CANDIDATES.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.state.toLowerCase().includes(q) ||
    c.districtLabel.toLowerCase().includes(q) ||
    (c.party === 'D' && ('democrat'.includes(q) || 'democratic'.includes(q))) ||
    (c.party === 'R' && 'republican'.includes(q)) ||
    (c.challenger && c.challenger.toLowerCase().includes(q)) ||
    (c.retiredIncumbent && c.retiredIncumbent.toLowerCase().includes(q))
  );
}

function filterCandidates(query, party, state) {
  let results = CANDIDATES;
  if (query && query.trim()) {
    results = searchCandidates(query);
  }
  if (party && party !== 'all') {
    results = results.filter(c => c.party === party);
  }
  if (state && state !== 'all') {
    results = results.filter(c => c.state === state);
  }
  return results;
}

function formatCurrency(amount) {
  if (amount === null || amount === undefined) return 'Data pending';
  if (amount >= 1000000) return '$' + (amount / 1000000).toFixed(1) + 'M';
  if (amount >= 1000) return '$' + (amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1) + 'K';
  return '$' + amount.toLocaleString();
}

function getVoteLabel(vote) {
  if (vote === 'Yes') return { text: 'Voted Yes', class: 'text-red', icon: '✗' };
  if (vote === 'No') return { text: 'Voted No', class: 'text-blue', icon: '✓' };
  return { text: '—', class: 'text-muted', icon: '—' };
}

function canWriteIn(stateName) {
  if (WRITE_IN_PROHIBITED.includes(stateName)) return false;
  return true;
}
