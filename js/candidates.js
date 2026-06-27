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
    notableActions: 'Freshman — won 2024 by only 187 votes. Broke with Democrats to end a government shutdown. Predecessor John Duarte (R) voted Yes on all three weapons packages.',
    challenger: 'Kevin Lincoln (R)',
    redistricted: true,
    demographics: {
      type: 'rural-agricultural',
      religionDominant: 'Christian',
      urbanRural: 'Rural',
      notes: 'Central Valley agricultural district. Won 2024 by 187 votes. Redistricted under Prop 50.'
    },
    source: 'Cook Political Report, Ballotpedia, CalMatters'
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
    rating: 'Lean D',
    aipacFunding: null,
    aipacEndorsed: false,
    aipacTrip: false,
    keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null },
    quotes: [],
    notableActions: 'Freshman — flipped seat from Republican Michelle Steel in 2024. Vietnamese-American attorney and Army veteran.',
    challenger: 'Chuong Vo (R)',
    redistricted: true,
    demographics: {
      type: 'suburban',
      religionDominant: 'Mixed',
      urbanRural: 'Suburban',
      notes: 'Orange County, diverse suburban district. Predecessor Steel voted Yes on all three weapons packages.'
    },
    source: 'Cook Political Report, Ballotpedia, NBC News'
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
    challenger: 'Paul LePage (R) — former two-term governor',
    redistricted: false,
    demographics: {
      type: 'rural-veteran',
      religionDominant: 'Christian',
      urbanRural: 'Rural',
      notes: 'Rural Maine. Golden was a Marine veteran and major recipient of funding from the foreign lobby for the government of Israel (~$800K+ career). Open seat. Matt Dunlap (D) won Democratic primary via ranked-choice voting. Paul LePage (R), former governor, ran unopposed.'
    },
    isOpenSeat: true,
    openSeatDemocrat: 'Matt Dunlap — former Maine State Auditor and Secretary of State',
    openSeatRepublican: 'Paul LePage — former two-term Governor of Maine (2011–2019)',
    source: 'Cook Political Report, Ballotpedia, OpenSecrets, NBC News'
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
    keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' },
    quotes: [],
    notableActions: 'Voted No on first Israel aid bill (Nov 2023), switched to Yes on $26.38B package (April 2024), then voted No on H.R. 8369 bomb delivery bill (May 2024). Boycotted Netanyahu\'s address to Congress. Called for ceasefire. ~$5.5K in foreign lobby-aligned PAC contributions.',
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
    aipacFunding: 3760000,
    aipacEndorsed: true,
    aipacTrip: false,
    keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' },
    quotes: [],
    notableActions: '#8 highest recipient of foreign lobby funding in all of Congress (~$3.76M career including $846K direct + $313K+ in United Democracy Project Super PAC ads). Voted Yes on every weapons package. Endorsed by the foreign lobby for the government of Israel. Visited Israel in January 2024.',
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
    keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' },
    quotes: [],
    notableActions: 'Voted No on first Israel aid bill (Nov 2023), switched to Yes on $26.38B package (April 2024), then voted No on H.R. 8369 bomb delivery bill (May 2024). Longest-serving woman in House history. ~$5.5K in foreign lobby-aligned PAC contributions.',
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
    keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' },
    quotes: [],
    notableActions: 'Voted No on first weapons package (Nov 2023), switched to Yes on $26.38B package (April 2024), then voted No on H.R. 8369 bomb delivery bill (May 2024). Went on a trip sponsored by the foreign lobby. ~$35K in foreign lobby contributions. Endorsed by the foreign lobby.',
    challenger: 'Carey Coleman (R)',
    redistricted: true,
    demographics: {
      type: 'urban',
      religionDominant: 'Christian',
      urbanRural: 'Urban',
      notes: 'Akron area. Considered "must-win" for Democrats. Redistricted to be more competitive.'
    },
    source: 'Cook Political Report, Ballotpedia, Ohio Capital Journal'
  },
  {
    id: 'oh1-landsman',
    name: 'Greg Landsman',
    party: 'D',
    state: 'OH',
    district: 1,
    districtLabel: 'OH-01',
    incumbent: true,
    running: true,
    rating: 'Toss-up',
    aipacFunding: 1730000,
    aipacEndorsed: true,
    aipacTrip: false,
    keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' },
    quotes: [],
    notableActions: 'Voted Yes on every weapons package — all three House bills. One of only 22 Democrats who voted to censure Rep. Tlaib for criticizing the government of Israel. Received ~$1.73M from the foreign lobby and aligned donors. One of only 16 Democrats who voted to force delivery of 2,000-lb bombs after Biden paused the shipment.',
    challenger: 'Eric Conroy (R)',
    redistricted: true,
    demographics: {
      type: 'suburban-urban',
      religionDominant: 'Christian-Mixed',
      urbanRural: 'Urban-Suburban',
      notes: 'Cincinnati area. District shifted from Biden+6.5 to Trump+2.5 after redistricting. Conroy is Air Force vet, former CIA case officer, Trump-endorsed.'
    },
    source: 'Cook Political Report, Ballotpedia, clerk.house.gov, Mondoweiss, FEC'
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
    keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: null },
    quotes: [],
    notableActions: 'Voted No on first weapons package, then Yes on the $26.38B package. Not Voting on the forced bomb delivery bill (H.R. 8369). Co-sponsored anti-UN commission bills.',
    challenger: 'Eric Flores (R)',
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
    notableActions: 'Freshman — won 2024 by 3.7 points after losing to Elissa Slotkin in 2022. No 118th Congress voting record on weapons packages. Predecessor district represented by Slotkin who ran for Senate.',
    challenger: 'TBD (Dem primary Aug 4 — frontrunner Bridget Brink)',
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
    challenger: 'Brinker Harding (R) — Omaha City Council member, ran unopposed in GOP primary',
    redistricted: false,
    isOpenSeat: true,
    openSeatDemocrat: 'Denise Powell — won competitive Democratic primary. Led all candidates in fundraising ($1.04M raised in 2025).',
    openSeatRepublican: 'Brinker Harding — Omaha City Council member. Ran unopposed in Republican primary.',
    demographics: {
      type: 'urban-suburban',
      religionDominant: 'Christian',
      urbanRural: 'Urban-Suburban',
      notes: 'Omaha area. Swing district — D+3 PVI. Gave its electoral vote to Biden in 2020 and Harris in 2024. Open seat. Democrats view this as essential for retaking the House.'
    },
    source: 'Cook Political Report, Ballotpedia, Nebraska Examiner'
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
    notableActions: 'Freshman (elected 2024). No 118th Congress voting record. Sits on House Foreign Affairs Committee. Introduced the Solidify Iran Sanctions Act of 2025 (H.R. 1800) to permanently extend Iran sanctions. Publicly applauded Israel-Hamas hostage deal. Unopposed in May 19, 2026 primary.',
    challenger: 'Bob Brooks (D)',
    redistricted: false,
    demographics: {
      type: 'suburban',
      religionDominant: 'Christian',
      urbanRural: 'Suburban',
      notes: 'Lehigh Valley, Pennsylvania. Suburban swing district.'
    },
    source: 'Cook Political Report, Ballotpedia, mackenzie.house.gov'
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
    aipacEndorsed: true,
    aipacTrip: false,
    keyVotes: { hr6126: 'Yes', hr8034: 'No', hr815: null, hr8369: 'Yes' },
    quotes: [],
    notableActions: 'Former Freedom Caucus chair. Voted Yes on first weapons package (Nov 2023), No on combined $26.38B Israel/Ukraine/Taiwan package (April 2024), then Yes on H.R. 8369 bomb delivery bill (May 2024). The foreign lobby for the government of Israel paused fundraising for Perry after his No vote but did not withdraw their endorsement. Perry stated his objection was to humanitarian aid provisions he described as "funding for Hamas." Career foreign lobby funding ~$132K.',
    challenger: 'Janelle Stelson (D) — rematch from 2024',
    redistricted: false,
    demographics: {
      type: 'suburban-rural',
      religionDominant: 'Christian',
      urbanRural: 'Mixed',
      notes: 'Harrisburg/York area. Former Freedom Caucus chair.'
    },
    source: 'Cook Political Report, Ballotpedia, Jewish Insider, Just the News'
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
    description: 'Michigan\'s 7th district near Lansing. Barrett is a freshman endorsed by the Republican Jewish Coalition for the third consecutive cycle. He co-sponsored the U.S.–Israel Defense Partnership Act and pressured Michigan State University to adopt a controversial definition of antisemitism backed by the foreign lobby. Michigan has a large Arab-American population deeply engaged on this issue.',
    whyItMatters: 'Michigan is ground zero for this issue. A toss-up seat with an organized Arab-American community means every vote counts.',
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
  // ── 2025 wave (6 states) ──
  { state: 'California', abbreviation: 'CA', notes: 'Proposition 50 approved Nov 4, 2025 with 64.4% support. Neutralizes several competitive districts. Projected +5 Democratic advantage.' },
  { state: 'Texas', abbreviation: 'TX', notes: 'Signed Aug 29, 2025. Supreme Court stayed a lower court ruling in Dec 2025, allowing the map. Projected +5 Republican advantage.' },
  { state: 'Ohio', abbreviation: 'OH', notes: 'Approved Oct 31, 2025 by the redistricting commission after court challenges. Projected +2 Republican shift.' },
  { state: 'North Carolina', abbreviation: 'NC', notes: 'Passed Oct 22, 2025. Shifts NC-01 toward Republicans. Projected +1 Republican advantage.' },
  { state: 'Missouri', abbreviation: 'MO', notes: 'Signed Sep 28, 2025. Dilutes Rep. Cleaver\'s district from 62% to 41% Democratic. Projected +1 Republican advantage.' },
  { state: 'Utah', abbreviation: 'UT', notes: 'Adopted Nov 10, 2025 after state Supreme Court ruled against partisan gerrymander. Plaintiff-submitted map adopted. Projected +1 Democratic shift.' },
  // ── 2026 wave (5 states, triggered by Louisiana v. Callais) ──
  { state: 'Virginia', abbreviation: 'VA', notes: 'Ballot referendum approved Apr 21, 2026 (51.6% to 48.4%). Democratic-led redraw projected to yield +4 Democratic seat advantage.' },
  { state: 'Florida', abbreviation: 'FL', notes: 'Special session called by Gov. DeSantis in anticipation of Callais ruling. Signed May 4, 2026. Projected +4 Republican shift.' },
  { state: 'Tennessee', abbreviation: 'TN', notes: 'Signed May 7, 2026 by Gov. Lee. Fractures the Memphis-based 9th district — the state\'s only majority-Black, Democratic-held seat. Projected +1 Republican.' },
  { state: 'Louisiana', abbreviation: 'LA', notes: 'Signed May 29, 2026 by Gov. Landry, directly utilizing Callais precedent. Projected +1 Republican shift.' },
  { state: 'Alabama', abbreviation: 'AL', notes: 'Finalized Jun 2, 2026 following racial gerrymandering litigation. Eliminates a previous Democratic advantage. Projected +1 Republican shift.' }
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
  if (vote === 'N/A (Senate vote)') return { text: 'N/A (Senate vote)', class: 'text-muted', icon: '—' };
  if (vote === 'Did not vote') return { text: 'Did not vote', class: 'text-muted', icon: '—' };
  return { text: '—', class: 'text-muted', icon: '—' };
}

function canWriteIn(stateName) {
  if (WRITE_IN_PROHIBITED.includes(stateName)) return false;
  return true;
}

// ============================================
// GAZA TIMELINE — Casualty data at each congressional vote date
// Sources: UN OCHA, Gaza Ministry of Health, UNRWA, ICJ/ICC Press Releases
// LAST UPDATED: June 20, 2026
// ============================================
const GAZA_TIMELINE = {
  hr6126: {
    voteDate: 'November 2, 2023',
    daysIntoConflict: 26,
    killed: 8805,
    children: 3648,
    women: 2187,
    injured: 22240,
    displaced: 1400000,
    keyEvents: [
      'Ground invasion of northern Gaza began October 27',
      'Jabalia refugee camp struck multiple times (Oct 31–Nov 1)',
      'Communications blackout imposed across Gaza',
      'Hospitals overwhelmed, surgeries without anesthesia reported'
    ],
    legalContext: 'No international legal proceedings had yet been filed.',
    source: 'Gaza Ministry of Health via UN OCHA, Nov 2 2023 report'
  },
  hr8034: {
    voteDate: 'April 20, 2024',
    daysIntoConflict: 196,
    killed: 34049,
    children: 14500,
    women: 9500,
    injured: 77000,
    displaced: 1700000,
    keyEvents: [
      'Al-Shifa Hospital besieged and destroyed (March 18–April 1)',
      'World Central Kitchen aid workers killed by Israeli strike (April 1)',
      'Flour massacre at aid distribution point killed over 100 (Feb 29)',
      'Mass graves discovered at Nasser and Al-Shifa Hospitals (April)'
    ],
    legalContext: 'ICJ had ordered provisional measures on Jan 26, finding plausible risk of genocide. Second ICJ order on March 28 demanded unhindered humanitarian aid delivery.',
    source: 'Gaza Ministry of Health via UN OCHA, ICJ Press Releases'
  },
  hr8369: {
    voteDate: 'May 16, 2024',
    daysIntoConflict: 222,
    killed: 35272,
    children: 15000,
    women: 9800,
    injured: 79000,
    displaced: 1700000,
    keyEvents: [
      'Rafah ground invasion preparations underway',
      'UN warned of imminent famine across northern Gaza',
      'Over 100 UNRWA staff members killed',
      'Over 100 journalists killed (CPJ count)',
      'Al-Mawasi "safe zone" struck repeatedly'
    ],
    legalContext: 'Two ICJ provisional measures orders already issued. ICC prosecutor would request arrest warrants for Netanyahu and Gallant 4 days later (May 20).',
    source: 'Gaza Ministry of Health via UN OCHA, CPJ, UNRWA, ICC Press Releases'
  }
};

const LEGAL_TIMELINE = [
  { date: 'December 29, 2023', event: 'South Africa files genocide case against the government of Israel at the ICJ', type: 'icj' },
  { date: 'January 26, 2024', event: 'ICJ orders provisional measures: finds plausible risk of genocide, orders Israel to prevent genocidal acts and ensure humanitarian aid', type: 'icj' },
  { date: 'March 28, 2024', event: 'ICJ orders additional provisional measures: Israel must ensure unhindered provision of humanitarian aid at scale', type: 'icj' },
  { date: 'May 20, 2024', event: 'ICC Prosecutor requests arrest warrants for Netanyahu and Gallant for war crimes and crimes against humanity', type: 'icc' },
  { date: 'May 24, 2024', event: 'ICJ orders Israel to immediately halt its military offensive in Rafah', type: 'icj' },
  { date: 'July 19, 2024', event: 'ICJ advisory opinion: Israeli occupation of Palestinian territories is illegal under international law', type: 'icj' },
  { date: 'November 21, 2024', event: 'ICC issues arrest warrants for Netanyahu and Gallant for war crimes including using starvation as a method of warfare, and crimes against humanity', type: 'icc' }
];

// ============================================
// STATE RACES — Comprehensive state-level race data
// Proof of concept: Ohio and Arizona
// ============================================
const STATE_RACES = {
  OH: {
    name: 'Ohio',
    redistricted: true,
    redistrictingNote: 'New congressional maps approved October 31, 2025. Three Democrat-held seats (OH-1, OH-9, OH-13) became significantly more competitive after districts were redrawn to favor Republicans.',
    governor: {
      rating: 'Lean R',
      candidates: [
        { name: 'Vivek Ramaswamy', party: 'R', background: 'Biotech billionaire, 2024 presidential candidate. Running with Senate President Rob McColley.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Broadly hawkish on foreign policy. Supported military aid to the government of Israel during 2024 presidential campaign.', lobbyConnection: null, source: 'Ballotpedia, campaign statements' },
        { name: 'Amy Acton', party: 'D', background: 'Former Ohio Health Director who led COVID-19 response. Running with David Pepper (former OH Democratic Party chair).', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'Ballotpedia, Ohio Capital Journal' }
      ]
    },
    senate: {
      type: 'special',
      note: 'Special election to fill the seat vacated by VP JD Vance. Term through January 2029.',
      rating: 'Lean R',
      candidates: [
        { name: 'Jon Husted', party: 'R', background: 'Appointed to fill Vance\'s seat in January 2025. Former Lt. Governor and Secretary of State.', incumbentOrChallenger: 'incumbent', foreignPolicyPosition: 'Has not cast votes on weapons-transfer legislation as a Senator (appointed after key votes).', lobbyConnection: null, source: 'Ballotpedia, NBC News' },
        { name: 'Sherrod Brown', party: 'D', background: 'Former longtime Senator (2007–2025). Lost 2024 Senate race to Bernie Moreno. Seeking return.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'As Senator, voted for H.R. 815 (National Security Supplemental, April 23, 2024). Generally supported weapons transfers but expressed concern about civilian casualties.', senateVotes: { hr815: 'Yes' }, lobbyConnection: 'Received significant lobby-aligned PAC contributions during Senate tenure', source: 'Ballotpedia, congress.gov, Roll Call' }
      ]
    },
    competitiveHouse: [
      {
        district: 1, label: 'OH-01', area: 'Cincinnati', rating: 'Toss-up', redistricted: true,
        redistrictingImpact: 'Shifted from Biden+6.5 (2024) to Trump+2.5 under new map.',
        incumbent: { name: 'Greg Landsman', party: 'D', termStart: 2023, keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, lobbyFunding: 1730000, lobbyEndorsed: true, lobbyTrip: false, notableActions: ['Voted Yes on every weapons package — all three House bills', 'One of only 22 Democrats who voted to censure Rep. Rashida Tlaib for criticizing the government of Israel', 'Received approximately $1.73 million from the foreign lobby for the government of Israel and aligned donors', 'One of only 16 Democrats who voted Yes on H.R. 8369 to force delivery of 2,000-lb bombs after Biden paused the shipment'], source: 'clerk.house.gov Roll Call 577, 152, and 217; Mondoweiss, FEC filings, OpenSecrets' },
        challenger: { name: 'Eric Conroy', party: 'R', background: 'Air Force veteran, former CIA case officer. Won Republican primary. Endorsed by President Trump (April 14, 2026).', foreignPolicyPosition: 'Explicitly supports continued military aid to the government of Israel.', quotes: [{ text: 'Eric strongly supports the U.S.-Israel relationship and Israel\'s right to defend itself against terrorism and threats to its existence. He supports continued military aid to Israel.', source: 'ericconroyforcongress.com', date: '2026' }], lobbyFunding: null, lobbyEndorsed: false, source: 'Ballotpedia, The Hill, ericconroyforcongress.com' }
      },
      {
        district: 9, label: 'OH-09', area: 'Toledo / Northwest Ohio', rating: 'Toss-up', redistricted: true,
        redistrictingImpact: 'District redrawn to Trump+11 under new map. Kaptur\'s toughest race in 40+ years.',
        incumbent: { name: 'Marcy Kaptur', party: 'D', termStart: 1983, keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, lobbyFunding: 5500, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Longest-serving woman in U.S. House history', 'Voted No on first weapons package (Nov 2023, 8,805 dead), then Yes on $26.38B package (April 2024, 34,000+ dead)', 'Voted No on H.R. 8369 bomb delivery bill (May 2024, 35,000+ dead)', 'Approximately $5,500 in foreign lobby-aligned PAC contributions'], source: 'clerk.house.gov Roll Call 577, 152, and 217; kaptur.house.gov, FEC' },
        challenger: { name: 'Derek Merrin', party: 'R', background: 'Former state representative. Lost to Kaptur by ~2,400 votes in 2024. Won 2026 Republican primary. Rematch.', foreignPolicyPosition: 'Strongly supports the government of Israel. Signed solidarity statements and co-sponsored state legislation recognizing Jerusalem as Israel\'s capital.', lobbyFunding: null, lobbyEndorsed: true, source: 'Ballotpedia, Republican Jewish Coalition, Ohio Jewish Communities' }
      },
      {
        district: 13, label: 'OH-13', area: 'Akron / Canton', rating: 'Toss-up', redistricted: true,
        redistrictingImpact: 'Redrawn slightly bluer but still highly competitive. "Must-win" for Democrats.',
        incumbent: { name: 'Emilia Sykes', party: 'D', termStart: 2023, keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, lobbyFunding: 35000, lobbyEndorsed: true, lobbyTrip: true, notableActions: ['Voted No on first weapons package (Nov 2023), switched to Yes on $26.38B package (April 2024), then voted No on H.R. 8369 bomb delivery bill (May 2024)', 'Accepted a trip sponsored by the foreign lobby for the government of Israel', 'Approximately $35,000 in foreign lobby contributions', 'Endorsed by the foreign lobby for the government of Israel'], source: 'clerk.house.gov Roll Call 577, 152, and 217; Ballotpedia, FEC' },
        challenger: { name: 'Carey Coleman', party: 'R', background: 'Won Republican primary May 5, 2026 with 47.3% of the vote. Conservative radio commentator.', foreignPolicyPosition: 'Campaign focuses heavily on "strong national security" and conservative principles, though no specific policy paper on Israel was published.', lobbyFunding: null, lobbyEndorsed: false, source: 'Ohio Capital Journal, Ballotpedia, campaign website' }
      }
    ],
    otherNotableMembers: [
      { name: 'Jim Jordan', party: 'R', district: 4, label: 'OH-04', keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, note: 'Voted Yes on all three weapons packages. One of the most high-profile Republicans in Congress. Former House Judiciary Committee chair. Consistent supporter of military aid to the government of Israel.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Joyce Beatty', party: 'D', district: 3, label: 'OH-03', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'Voted No on the first and third weapons packages, Yes on the $26.38B combined package. Standard Ohio Democratic pattern — only Landsman broke ranks to vote Yes on all three.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Warren Davidson', party: 'R', district: 8, label: 'OH-08', keyVotes: { hr6126: 'Yes', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'UNUSUAL REPUBLICAN DISSENTER — voted Yes on the first standalone weapons package but No on both subsequent bills (H.R. 8034 and H.R. 8369). One of the few Republicans to vote No on the forced bomb delivery bill. His opposition is rooted in fiscal conservatism and non-interventionism, not concern for Palestinian civilians.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  AZ: {
    name: 'Arizona',
    redistricted: false,
    redistrictingNote: null,
    governor: {
      rating: 'Toss-up',
      note: 'Republican primary July 21, 2026. Key candidates include Andy Biggs and David Schweikert — both current House members with voting records on Israel.',
      candidates: [
        { name: 'Katie Hobbs', party: 'D', background: 'Incumbent governor seeking re-election. Former Secretary of State.', incumbentOrChallenger: 'incumbent', foreignPolicyPosition: null, lobbyConnection: null, source: 'Ballotpedia' },
        { name: 'Andy Biggs', party: 'R', background: 'U.S. Representative AZ-5. Voted Yes on standalone weapons packages but No on the combined weapons/Ukraine/Taiwan package.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Voted Yes on H.R. 6126 (Nov 2023) and Yes on H.R. 8369 (May 2024), but No on H.R. 8034 — the combined weapons/Ukraine/Taiwan package (April 2024). Opposition to H.R. 8034 rooted in fiscal conservatism and opposition to Ukraine aid, not opposition to weapons transfers.', houseVotes: { hr6126: 'Yes', hr8034: 'No', hr8369: 'Yes' }, lobbyConnection: null, source: 'clerk.house.gov Roll Call 577, 152, and 217; Ballotpedia, public statements' },
        { name: 'David Schweikert', party: 'R', background: 'U.S. Representative AZ-1 (leaving for governor race). Voted Yes on all three weapons packages.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Voted Yes on H.R. 6126 (Nov 2023), H.R. 8034 (April 2024), and H.R. 8369 (May 2024) — supported every weapons package.', houseVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'Yes' }, lobbyConnection: 'Significant lobby-aligned PAC contributions tracked by OpenSecrets', source: 'clerk.house.gov Roll Call 577, 152, and 217; Ballotpedia, OpenSecrets' }
      ]
    },
    senate: null,
    senateNote: 'No U.S. Senate race in Arizona in 2026. Sen. Mark Kelly (D) up in 2028, Sen. Ruben Gallego (D) up in 2030.',
    competitiveHouse: [
      {
        district: 1, label: 'AZ-01', area: 'Phoenix suburbs / Scottsdale', rating: 'Toss-up', redistricted: false, isOpenSeat: true,
        openSeatReason: 'David Schweikert running for Governor',
        predecessorVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'Yes' },
        note: 'Republican primary July 21. 13+ candidates filed — one of the most contested open seats nationally. R+5 lean, but Schweikert won by only 4 points in 2024.',
        democraticCandidates: [
          { name: 'Amish Shah', note: 'Lost to Schweikert by ~4 points in 2024. Early frontrunner. Maintained supportive stance on the government of Israel and received lobby-aligned endorsements in 2024.' },
          { name: 'Marlene Galan Woods', note: 'Finished third in 2024 Democratic primary.' },
          { name: 'Mark Robert Gordon', note: 'Attorney and activist.' }
        ],
        republicanCandidates: [
          { name: 'Matt Gress', note: 'State Representative.' },
          { name: 'Justin Wilmeth', note: 'State Representative.' },
          { name: 'Joseph Chaplik', note: 'State Representative.' }
        ],
        source: 'Ballotpedia, Inside Elections, Arizona Mirror'
      },
      {
        district: 6, label: 'AZ-06', area: 'Tucson area', rating: 'Toss-up', redistricted: false,
        incumbent: { name: 'Juan Ciscomani', party: 'R', termStart: 2023, keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, lobbyFunding: 618522, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['The foreign lobby for the government of Israel is his largest campaign donor (~$619K in 2024 cycle)', 'Voted Yes on every weapons package to the government of Israel', 'Seeking third term in a Toss-up district with R+3 lean'], source: 'clerk.house.gov Roll Call 152 and 577, OpenSecrets, FEC' },
        challengerNote: 'Democratic primary July 21, 2026',
        democraticCandidates: [
          { name: 'Johnathan Buma', note: 'Democratic primary candidate.' },
          { name: 'Chris Donat', note: 'Democratic primary candidate.' },
          { name: 'JoAnna Mendoza', note: 'Democratic primary candidate.' },
          { name: 'Carter Weeks', note: 'Democratic primary candidate.' }
        ],
        source: 'Ballotpedia, USPollingData.com'
      }
    ],
    otherNotableMembers: [
      { name: 'Eli Crane', party: 'R', district: 2, label: 'AZ-02', keyVotes: { hr6126: 'Yes', hr8034: 'No', hr815: null, hr8369: 'Yes' }, note: 'Former Navy SEAL. Voted Yes on standalone Israel weapons packages (Nov 2023, May 2024) but No on H.R. 8034, the combined Israel/Ukraine/Taiwan package (April 2024).', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Paul Gosar', party: 'R', district: 9, label: 'AZ-09', keyVotes: { hr6126: 'Yes', hr8034: 'No', hr815: null, hr8369: 'Yes' }, note: 'Voted Yes on standalone Israel weapons packages (Nov 2023, May 2024) but No on H.R. 8034, the combined Israel/Ukraine/Taiwan package (April 2024). Often characterized as non-interventionist but voted for Israel-specific aid.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  PA: {
    name: 'Pennsylvania',
    redistricted: false,
    redistrictingNote: null,
    governor: {
      rating: 'Likely D',
      note: 'Both candidates are strong supporters of the government of Israel. Josh Shapiro is one of the most vocal Democratic governors in the country on this issue. Stacy Garrity invested state treasury funds in Israel Bonds.',
      candidates: [
        { name: 'Josh Shapiro', party: 'D', background: 'Incumbent governor seeking second term. Jewish faith is central to his public life. Was vetted as VP candidate in 2024; his views on Israel were a major factor in that process.', incumbentOrChallenger: 'incumbent', foreignPolicyPosition: 'Strong supporter of the government of Israel. Supported the government of Israel\'s right to take action against Hamas. Called use of military aid as "leverage" to ensure the government of Israel acts in accordance with "American values." In May 2026, warned Democrats against vilifying the foreign lobby, calling it "dangerous." Centers his Jewish faith in governance.', lobbyConnection: 'Has actively defended the foreign lobby against Democratic Party criticism. Described as supporting candidates favored by lobby-aligned groups in state-level Democratic primaries.', source: 'Times of Israel, Jewish Insider, Algemeiner, WHYY, Common Dreams' },
        { name: 'Stacy Garrity', party: 'R', background: 'Pennsylvania State Treasurer. Ran unopposed in Republican primary. Army Reserve veteran. Endorsed by President Trump. Trump hosted a fundraiser for Garrity at Mar-a-Lago in March 2026.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Strong supporter of the government of Israel as State Treasurer. Invested $45 million in taxpayer money into Israel Bonds (official investment product name) since the Oct. 7, 2023 attacks, overriding earlier concerns within the Treasury that the bonds could be a risky investment. Participated in virtual briefings to "Support Israel Bonds During Its War Effort." Described the government of Israel as "our greatest ally in the Middle East."', lobbyConnection: 'Invested $45M of PA state treasury funds in Israel Bonds. Faced ethics questions from Spotlight PA about attending events hosted by firms tied to state bond investments.', source: 'PA Treasury, Spotlight PA, Times of Israel, Jewish Exponent, WHYY' }
      ]
    },
    senate: null,
    senateNote: 'No regularly scheduled U.S. Senate race in Pennsylvania in 2026.',
    competitiveHouse: [
      {
        district: 7, label: 'PA-07', area: 'Lehigh Valley', rating: 'Toss-up', redistricted: false,
        incumbent: { name: 'Ryan Mackenzie', party: 'R', termStart: 2025, keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null }, lobbyFunding: null, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Freshman — elected 2024, no 118th Congress voting record on weapons packages', 'Sits on House Foreign Affairs Committee', 'Introduced the Solidify Iran Sanctions Act of 2025 (H.R. 1800) to permanently extend Iran sanctions and restrict Iran\'s ability to finance terrorist proxies', 'Publicly applauded Israel-Hamas hostage deal, stating: "We join the peoples of Israel, Gaza, and the entire world in praying for peace to finally touch this region"', 'Unopposed in May 19, 2026 Republican primary'], source: 'mackenzie.house.gov, Ballotpedia, Cook Political Report' },
        challenger: { name: 'Bob Brooks', party: 'D', background: 'Union leader and president of the Pennsylvania Professional Fire Fighters Association. Won Democratic primary May 19, 2026.', foreignPolicyPosition: 'Did not solicit donations from the foreign lobby during primary campaign. Endorsed by JStreetPAC — a pro-peace organization that supports a two-state solution and often opposes candidates backed by the foreign lobby for the government of Israel. Faced controversy when his campaign deleted a social media post expressing condolences to the Jewish community following a tragedy in Australia, then reposted a version without the Jewish mention. Campaign stated the posts were separated to "condemn antisemitism as a separate issue."', quotes: [{ text: 'Posts were separated to condemn antisemitism as a separate issue to highlight its seriousness.', source: 'Brooks campaign statement via JNS', date: '2025' }], lobbyFunding: null, lobbyEndorsed: false, source: 'City & State PA, JStreetPAC, JNS, Spotlight PA' }
      },
      {
        district: 10, label: 'PA-10', area: 'Harrisburg / York', rating: 'Toss-up', redistricted: false,
        redistrictingImpact: null,
        incumbent: { name: 'Scott Perry', party: 'R', termStart: 2019, keyVotes: { hr6126: 'Yes', hr8034: 'No', hr815: null, hr8369: 'Yes' }, lobbyFunding: 132000, lobbyEndorsed: true, lobbyTrip: false, notableActions: ['Former Freedom Caucus chair', 'Voted Yes on H.R. 6126 standalone weapons package (Nov 2023)', 'Voted No on H.R. 8034 combined $26.38B weapons/Ukraine/Taiwan package (April 2024) — stated objection was to humanitarian aid provisions he described as "funding for Hamas"', 'Voted Yes on H.R. 8369 to force delivery of paused 2,000-lb bombs (May 2024)', 'The foreign lobby for the government of Israel paused fundraising for Perry after his No vote on H.R. 8034 but did not withdraw their endorsement', 'Career foreign lobby funding approximately $132,000'], source: 'clerk.house.gov Roll Call 577, 152, and 217; Jewish Insider, Just the News, FEC, OpenSecrets' },
        challenger: { name: 'Janelle Stelson', party: 'D', background: 'Former WGAL TV news anchor (30-year career). Lost to Perry by ~5,133 votes (49.4% to 50.6%) in 2024. Won Democratic primary May 19, 2026 with 69% of the vote. Raised $2.1M in Q1 2026; $3.3M cash on hand.', foreignPolicyPosition: 'Strong supporter of the government of Israel. Endorsed by Democratic Majority for Israel (DMFI) PAC in both 2024 and 2026. Has criticized Perry for voting against supplemental weapons aid. Doubled down on support for the government of Israel\'s military operations when pressed on arms shipment pauses.', quotes: [{ text: 'I have got to say, I also agree absolutely with Israel\'s right to root out Hamas and decimate it.', source: 'Jewish Insider', date: 'June 2024' }, { text: 'Israel needs to do what it needs to do to defend itself. I support Israel\'s right to decimate Hamas however it sees fit.', source: 'Jewish Insider', date: 'June 2024' }], lobbyFunding: null, lobbyEndorsed: true, source: 'Jewish Insider, DMFI PAC, janellestelson.com, Jewish Federation of Greater Harrisburg' }
      }
    ],
    otherNotableMembers: [
      { name: 'Summer Lee', party: 'D', district: 12, label: 'PA-12', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'POSITIVE EXAMPLE — Voted No on all three House weapons packages. One of the most consistent voices against weapons transfers to the government of Israel. Survived a primary challenge backed by the foreign lobby for the government of Israel in 2024. If she is on the 2026 ballot, she is a candidate this campaign can recommend.', source: 'clerk.house.gov Roll Call 577, 152, and 217; data/rollcalls/member-vote-summary-2024.json' },
      { name: 'Brian Fitzpatrick', party: 'R', district: 1, label: 'PA-01', keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, note: 'Voted Yes on all three House weapons packages. Bucks County moderate Republican — represents a swing district but has been consistent in supporting every weapons transfer.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Matt Cartwright', party: 'D', district: 8, label: 'PA-08', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, note: 'Voted No on first weapons package (Nov 2023) but Yes on both subsequent bills including the bomb delivery bill (H.R. 8369). One of only 16 Democrats who voted to force delivery of paused 2,000-lb bombs.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  NC: {
    name: 'North Carolina',
    redistricted: true,
    redistrictingNote: 'NC-01 redrawn by state Republicans in October 2025 to lean more Republican. Shifted from Trump+1 (2024) to roughly Trump+5 under new map. Don Davis is widely considered the most vulnerable House Democrat in the country.',
    governor: null,
    governorNote: 'No governor race in 2026. Gov. Josh Stein (D) won in November 2024.',
    senate: {
      type: 'open',
      note: 'Open seat — Thom Tillis (R) not seeking re-election after Trump threatened to back a primary challenger. One of Democrats\' best pickup opportunities.',
      rating: 'Lean D',
      candidates: [
        { name: 'Roy Cooper', party: 'D', background: 'Former two-term governor of North Carolina (2017–2025). High name recognition and favorability. Won Democratic primary with 92% of the vote. Led May 2026 polls by 11 points.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Endorsed by Democratic Majority for Israel (DMFI) PAC. His campaign told Jewish Insider he "generally does not believe we should withhold aid from a critical ally like Israel when they have to defend themselves against countries like Iran." Rejected the NC Democratic Party\'s resolution calling Israel guilty of apartheid and genocide — but only after entering the Senate race. Did not take a public stance on the resolution during his final year as governor.', quotes: [{ text: 'The Governor generally does not believe we should withhold aid from a critical ally like Israel when they have to defend themselves against countries like Iran.', source: 'Cooper campaign statement to Jewish Insider', date: 'August 2025' }], lobbyFunding: null, lobbyEndorsed: true, source: 'Jewish Insider, DMFI PAC, NC Newsline, Carolina Journal' },
        { name: 'Michael Whatley', party: 'R', background: 'Former chairman of the Republican National Committee (2024–2025) and NC Republican Party (2019–2024). Endorsed by President Trump. Won primary with 64.6%. Lower name recognition than Cooper — a major challenge.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Asked social media followers to pray after October 7. Aligns with standard Republican supportive stance toward the government of Israel. No detailed policy papers or specific statements found on arms transfers.', lobbyFunding: null, lobbyEndorsed: false, source: 'Ballotpedia, Roll Call, WUNC, Carolina Journal' }
      ]
    },
    competitiveHouse: [
      {
        district: 1, label: 'NC-01', area: 'Northeastern NC / Greenville / Outer Banks', rating: 'Toss-up', redistricted: true,
        redistrictingImpact: 'Redrawn from Trump+1 to roughly Trump+5. Makes Davis the single most vulnerable Democrat in the U.S. House.',
        incumbent: { name: 'Don Davis', party: 'D', termStart: 2023, keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, lobbyFunding: 3760000, lobbyEndorsed: true, lobbyTrip: false, notableActions: ['Voted Yes on every weapons package — all three House bills', '#8 highest recipient of foreign lobby funding in all of Congress', 'Received approximately $3.76 million from the foreign lobby for the government of Israel and aligned groups, including over $846,000 in direct contributions and $313,000+ in United Democracy Project Super PAC ads', 'Visited Israel in January 2024', 'Endorsed by the foreign lobby for the government of Israel'], source: 'clerk.house.gov Roll Call 577, 152, and 217; OpenSecrets, TrackAIPAC, FEC filings, boughtbyzionism.org' },
        challenger: { name: 'Laurie Buckhout', party: 'R', background: 'Retired U.S. Army Colonel, Bronze Star and Distinguished Service Medal recipient. Served as DOD acting assistant secretary of cybersecurity (March–September 2025). Lost to Davis 47.8% to 49.5% in 2024. Won 2026 Republican primary with 39.4%. Added to NRCC "MAGA Majority" program.', foreignPolicyPosition: 'Stated the U.S. "must have the strength by all means necessary to protect itself from countries like China, Iran, and Russia and to defend its allies like Israel." Pointed to the Hamas attack on October 7 as evidence that "projecting weakness emboldens adversaries." Standard Republican posture — strong military, defend allies.', quotes: [{ text: 'The United States must have the strength by all means necessary to protect itself from countries like China, Iran, and Russia and to defend its allies like Israel.', source: 'WCTI12 candidate profile', date: '2026' }], lobbyFunding: null, lobbyEndorsed: false, source: 'Ballotpedia, WCTI12, NC Newsline, NRCC, WUNC' }
      }
    ],
    otherNotableMembers: [
      { name: 'Chuck Edwards', party: 'R', district: 11, label: 'NC-11', keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, note: 'Voted Yes on all three weapons packages. Facing well-funded Democratic challenger Jamie Ager in a race that Cook Political Report says is trending toward Democrats. R+9 district but Ager outraised Edwards in Q1 2026 ($1.6M+). DCCC "Red to Blue" program. House Majority PAC reserved $4.3M in ads.', source: 'clerk.house.gov Roll Call 577, 152, and 217; Cook Political Report, WLOS, Carolina Journal' },
      { name: 'Valerie Foushee', party: 'D', district: 4, label: 'NC-04', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'Voted No on first weapons package (Nov 2023), Yes on $26.38B combined package (April 2024), then No on H.R. 8369 bomb delivery bill (May 2024). Received foreign lobby-aligned funding to boost her campaign.', source: 'clerk.house.gov Roll Call 577, 152, and 217; Business North Carolina, FEC' },
      { name: 'Alma Adams', party: 'D', district: 12, label: 'NC-12', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'NOTABLE PATTERN — Like every NC Democrat except Davis, voted No on the first and third weapons packages but Yes on the combined package. This is the common NC Democratic pattern: only Davis broke ranks to vote Yes on all three.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  MI: {
    name: 'Michigan',
    redistricted: false,
    redistrictingNote: null,
    governor: {
      rating: 'Toss-up',
      note: 'Open seat — Gov. Gretchen Whitmer (D) is term-limited. Primary August 4, 2026. The Republican frontrunner, John James, is a sitting U.S. Representative with a voting record on weapons packages to the government of Israel.',
      candidates: [
        { name: 'Jocelyn Benson', party: 'D', background: 'Michigan Secretary of State (2019–present). Leading in Democratic primary polling and fundraising. Former dean of Wayne State University Law School. Visited Israel in 2019 with a bipartisan cybersecurity delegation organized by the American Jewish Committee\'s Project Interchange.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Has not publicly articulated detailed positions on arms transfers to the government of Israel. State-level office does not involve foreign policy votes.', lobbyConnection: 'Participated in AJC-organized Israel delegation trip (2019)', source: 'Ballotpedia, Michigan Secretary of State, AJC' },
        { name: 'John James', party: 'R', background: 'U.S. Representative MI-10 (2023–present). West Point graduate, Army Apache helicopter pilot with combat tours in Iraq. Running for governor creates an open seat in MI-10 (R+3 district). Republican frontrunner.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Voted Yes on all three House weapons packages to the government of Israel: H.R. 6126 (Nov 2023), H.R. 8034 (April 2024), and H.R. 8369 (May 2024). Consistent supporter of military aid.', houseVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'Yes' }, lobbyConnection: null, source: 'clerk.house.gov Roll Call 577, 152, and 217; Ballotpedia, congress.gov' }
      ]
    },
    senate: {
      type: 'open',
      note: 'Open seat — Sen. Gary Peters (D) not seeking re-election. Michigan is ground zero for this issue — largest Arab-American population in the country, and the Democratic primary is a direct referendum on whether the foreign lobby for the government of Israel can buy Senate seats. Primary August 4, 2026.',
      rating: 'Toss-up',
      candidates: [
        { name: 'Abdul El-Sayed', party: 'D', background: 'Physician and epidemiologist. Former Detroit Health Director. Leading Democratic primary polls by ~10 points. Endorsed by Sen. Bernie Sanders, Rep. Alexandria Ocasio-Cortez, and Rep. Summer Lee. Would be the first Muslim U.S. Senator from Michigan.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Characterized the government of Israel\'s actions in Gaza as genocide. Called it a "public health catastrophe" and demanded a ceasefire (January 2024). Said Netanyahu is a war criminal. Questioned whether Israel should exist as a Jewish state — said the question "overlooks the rights of people who\'ve been displaced by Israeli action." Does not accept foreign lobby funding.', lobbyFunding: null, lobbyEndorsed: false, source: 'Jewish Insider, Mondoweiss, Forward, abdulforsenate.com' },
        { name: 'Haley Stevens', party: 'D', background: 'U.S. Representative MI-11 (2019–present). Four-term congresswoman from Birmingham. Self-described "Zionist" and "proud pro-Israel Democrat." Booed at the 2026 Michigan Democratic Party State Endorsement Convention over her positions on the government of Israel.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Voted Yes on H.R. 6126 (Nov 2023) and H.R. 8034 (April 2024), No on H.R. 8369 bomb delivery bill (May 2024). Received over $1.2 million from the foreign lobby for the government of Israel since 2022, plus $5 million in independent expenditures from aligned groups in 2022 alone. In 2026, United Democracy Project reserved $2.3 million in Michigan ad buys to boost her candidacy. Endorsed by DMFI PAC. Stated she would "support Israel\'s security" and "ensure the ceasefire holds in Gaza."', houseVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'No' }, lobbyFunding: 1200000, lobbyEndorsed: true, source: 'clerk.house.gov Roll Call 577, 152, and 217; Jewish Insider, Detroit News, Metro Times, OpenSecrets' },
        { name: 'Mallory McMorrow', party: 'D', background: 'Michigan State Senator. Went viral in 2022 for speech defending LGBTQ community. Positioning herself between Stevens and El-Sayed. Endorsed by J Street PAC (pro-Israel, pro-peace).', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Believes the government of Israel\'s actions in Gaza meet "the legal definition" of genocide but avoids the word publicly. Supports legislation to block offensive weapons sales to the government of Israel. Proposed an "Iron Dome for Palestinians" — defensive systems for Palestinian civilians. Stated: "We need to be able to state very clearly that what the Netanyahu government is doing is wrong." J Street endorsed.', lobbyFunding: null, lobbyEndorsed: false, source: 'Jewish Insider, Bridge Michigan, J Street PAC' },
        { name: 'Mike Rogers', party: 'R', background: 'Former U.S. Representative and former chairman of the House Intelligence Committee. Lost 2024 Senate race to Elissa Slotkin. Republican frontrunner. Strong supporter of the government of Israel.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Staunch supporter of the government of Israel. Described opposition to the war in Gaza as "very short-sighted and politically naive." Told the Republican Jewish Coalition: "We\'re trying to do outreach in the Muslim community, but I also tell them where I\'m at. I never walk away from where I\'m at on Israel." Called Iran\'s multi-front assault on Israel "the existential threat we all wondered about."', quotes: [{ text: 'It is very short-sighted and politically naive to walk in and say we\'re not going to allow Israel to defend itself.', source: 'Jewish Insider', date: 'April 2026' }], lobbyFunding: null, lobbyEndorsed: false, source: 'Jewish Insider, Republican Jewish Coalition, Washington Examiner' }
      ]
    },
    competitiveHouse: [
      {
        district: 7, label: 'MI-07', area: 'Lansing / Livingston County', rating: 'Toss-up', redistricted: false,
        note: 'Barrett won by only 3.7 points in 2024. Democratic primary August 4 — frontrunner is Bridget Brink, former U.S. Ambassador to Ukraine who resigned under Trump.',
        incumbent: { name: 'Tom Barrett', party: 'R', termStart: 2025, keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null }, lobbyFunding: null, lobbyEndorsed: true, lobbyTrip: false, notableActions: ['Republican Jewish Coalition endorsed — 3rd consecutive cycle (first as incumbent)', 'Co-sponsored H.R.1229, U.S.–Israel Defense Partnership Act of 2025', 'Pressured Michigan State University to adopt IHRA definition of antisemitism (Nov 2025)', 'Freshman — elected 2024, no 118th Congress voting record on weapons packages'], source: 'RJC, Congress.gov, State News, Ballotpedia, Cook Political Report' },
        challengerNote: 'Democratic primary August 4, 2026',
        democraticCandidates: [
          { name: 'Bridget Brink', note: 'Former U.S. Ambassador to Ukraine (2022–2025). Resigned under Trump. Career diplomat (28 years). Endorsed by EMILY\'s List and Michigan Education Association. Frontrunner in fundraising and endorsements.' },
          { name: 'Matt Maarsdam', note: 'Former Navy SEAL, former Obama White House aide.' },
          { name: 'William Lawrence', note: 'Progressive activist.' }
        ],
        predecessorVotes: { hr6126: 'No', hr8034: 'Yes', hr8369: 'No' },
        retiredIncumbent: 'Elissa Slotkin',
        predecessorNote: 'Slotkin (now Senator) voted No/Yes/No — voted No on the first weapons package and the bomb delivery bill, but Yes on the combined $26.38B package.',
        source: 'Ballotpedia, Detroit News, Michigan Advance, Cook Political Report'
      }
    ],
    otherNotableMembers: [
      { name: 'Rashida Tlaib', party: 'D', district: 12, label: 'MI-12', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'POSITIVE EXAMPLE — The only Palestinian-American in Congress. Voted No on all three House weapons packages. Censured by the House for criticizing the government of Israel. If she is on the 2026 ballot, she is a candidate this campaign can recommend.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Dan Kildee', party: 'D', district: 8, label: 'MI-08', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three House weapons packages. One of only a handful of Democrats to vote No on every bill. Retiring — not seeking re-election in 2026.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Debbie Dingell', party: 'D', district: 6, label: 'MI-06', keyVotes: { hr6126: 'No', hr8034: null, hr815: null, hr8369: 'No' }, note: 'Voted No on first and third weapons packages. Did Not Vote on H.R. 8034 (April 2024). Represents Dearborn area — one of the largest Arab-American communities in the country.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  CA: {
    name: 'California',
    redistricted: true,
    redistrictingNote: 'Voters approved new congressional map (Proposition 50) in November 2025, replacing the independent commission map with one drawn by state legislators. Generally described as favoring Democrats. Several districts significantly redrawn.',
    governor: {
      rating: 'Likely D',
      note: 'Open seat — Gov. Gavin Newsom (D) is term-limited. Primary was June 2, 2026. Xavier Becerra (D) and Steve Hilton (R) advanced to general election.',
      candidates: [
        { name: 'Xavier Becerra', party: 'D', background: 'Former U.S. Secretary of Health and Human Services under Biden (2021–2025). Former California Attorney General and longtime congressman (1993–2017). Advanced from primary.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Moderate on the government of Israel. Supports U.S.-Israel relations but not uncritically. Supports two-state solution. Has signaled support for a ceasefire. Voted against recognizing Jerusalem as capital when in Congress. Did not attend a Jewish governor forum where other candidates pledged to deepen ties with the government of Israel and oppose BDS. Opposes BDS but frames the conflict as requiring humanitarian concern for both Palestinians and Israelis.', lobbyConnection: null, source: 'Factually.co, Jewish Weekly, Jewish Insider, ISideWith' },
        { name: 'Steve Hilton', party: 'R', background: 'British-American political commentator. Former Fox News host. Former senior advisor to UK Prime Minister David Cameron. Advanced from primary.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Strongly supportive of the government of Israel. Pledged to deepen California-Israel ties, oppose BDS, and direct his attorney general to sue municipalities that violate California\'s anti-BDS law (AB 715). Called antisemitism a "cancer within the Democratic Party." Praised the California-Israel business relationship.', quotes: [{ text: 'That foundation of prosperity and cooperation is how we build a stronger future for Israel and for us here in California.', source: 'Jewish governor candidate forum', date: 'February 2026' }], lobbyConnection: null, source: 'JNS, Jewish Insider, Jewish Weekly' }
      ]
    },
    senate: null,
    senateNote: 'No U.S. Senate race in California in 2026. Sen. Adam Schiff (D) elected 2024; Sen. Alex Padilla (D) up in 2028.',
    competitiveHouse: [
      {
        district: 22, label: 'CA-22', area: 'Central Valley / Kern County', rating: 'Toss-up', redistricted: true,
        note: 'THIS RACE IS A PROOF POINT — the foreign lobby spent $2M+ backing Jasmeet Bains (the moderate Democrat who walked back calling Gaza a genocide) in the primary, and she LOST to progressive Randy Villegas who explicitly opposes weapons transfers. Another example that lobby money loses when voters have a real choice.',
        incumbent: { name: 'David Valadao', party: 'R', termStart: 2013, keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, lobbyFunding: null, lobbyEndorsed: true, lobbyTrip: false, notableActions: ['Voted Yes on every weapons package — all three House bills', 'Backed by the foreign lobby for the government of Israel', 'One of 10 Republicans who voted to impeach Trump in 2021 — survived Republican primary challenges since', 'Only Republican loss was in 2018; considered most vulnerable CA Republican'], source: 'clerk.house.gov Roll Call 577, 152, and 217; CalMatters, Ballotpedia, TrackAIPAC' },
        challenger: { name: 'Randy Villegas', party: 'D', background: 'College professor and school board trustee. Progressive Democrat endorsed by Sen. Bernie Sanders and the Congressional Progressive Caucus. Beat DMFI-backed Assemblymember Jasmeet Bains in the June 2 primary despite $2M+ in spending against him. Bains had received ~$500K in DMFI ad buys.', foreignPolicyPosition: 'Vows to vote against sending additional weapons or military aid to the government of Israel. Called for a ceasefire in Gaza in January 2024. Called the government of Israel a "genocidal regime." Won the primary over the foreign lobby-backed candidate.', lobbyFunding: null, lobbyEndorsed: false, source: 'CalMatters, Jewish Telegraphic Agency, Jacobin, American Prospect' }
      },
      {
        district: 13, label: 'CA-13', area: 'Central Valley / Stockton', rating: 'Toss-up', redistricted: true,
        redistrictingImpact: 'Redrawn under Prop 50 to include arm into Stockton. Considered more favorable to Democrats than previous version.',
        incumbent: { name: 'Adam Gray', party: 'D', termStart: 2025, keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null }, lobbyFunding: null, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Freshman — won 2024 by only 187 votes over Republican John Duarte', 'Broke with Democrats to end a government shutdown — positions himself as moderate/bipartisan'], source: 'Ballotpedia, Cook Political Report, CalMatters' },
        challenger: { name: 'Kevin Lincoln', party: 'R', background: 'Former mayor of Stockton. Second attempt at Congress — lost to Josh Harder in CA-09 in 2024. Advanced from June 2 primary.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Ballotpedia, ABC10, CalMatters' },
        predecessorVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'Yes' },
        retiredIncumbent: 'John Duarte',
        predecessorNote: 'Duarte (R, lost 2024) voted Yes on all three weapons packages.'
      },
      {
        district: 45, label: 'CA-45', area: 'Orange County', rating: 'Lean D', redistricted: true,
        incumbent: { name: 'Derek Tran', party: 'D', termStart: 2025, keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null }, lobbyFunding: null, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Freshman — flipped seat from Republican Michelle Steel in 2024', 'Vietnamese-American attorney and Army veteran'], source: 'Ballotpedia, Cook Political Report' },
        challenger: { name: 'Chuong Vo', party: 'R', background: 'Former mayor of Cerritos. Vietnamese-American Republican. Advanced from June 2 primary.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Ballotpedia, NBC News' },
        predecessorVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'Yes' },
        retiredIncumbent: 'Michelle Steel',
        predecessorNote: 'Steel (R, lost 2024) voted Yes on all three weapons packages.'
      }
    ],
    otherNotableMembers: [
      { name: 'Juan Vargas', party: 'D', district: 52, label: 'CA-52', keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'No' }, lobbyFunding: 295000, note: 'ONE OF ONLY 12 DEMOCRATS to vote Yes on H.R. 6126, the standalone $14.3B weapons package. Also voted Yes on the $26.38B combined package. Received $295,000+ career total from the foreign lobby for the government of Israel — then publicly denied ever receiving a penny, contradicting FEC records. Also one of only four House Democrats to vote against the Iran War Powers Resolution in March 2026 — all four received lobby donations. His district (San Diego/Imperial Valley) is safe D, meaning voters could pressure him without risk of losing the seat.', source: 'clerk.house.gov Roll Call 577, 152, and 217; TrackAIPAC, KPBS, OpenSecrets, OB Rag' },
      { name: 'Brad Sherman', party: 'D', district: 32, label: 'CA-32', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, lobbyFunding: 693000, note: 'Received $693,000+ career total from the foreign lobby for the government of Israel — one of the highest-funded Democrats in the House. Called the lobby "the single most important organization in promoting the U.S.-Israel alliance." Secured over $21 million in U.S.-Israel cooperative research funding. Introduced a resolution supporting military action against Iran in 2026. Safe D district — accountability without electoral risk.', source: 'clerk.house.gov Roll Call 577, 152, and 217; TrackAIPAC, OpenSecrets, Sludge, Common Dreams' },
      { name: 'Maxine Waters', party: 'D', district: 43, label: 'CA-43', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three weapons packages. One of the most senior and prominent voices in Congress opposing military aid to the government of Israel.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Ro Khanna', party: 'D', district: 17, label: 'CA-17', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: null }, note: 'Voted No on both weapons packages he was present for. One of the most vocal House progressives on arms transfers to the government of Israel. Not Voting on H.R. 8369.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Barbara Lee', party: 'D', district: 12, label: 'CA-12', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three House weapons packages. The only member of Congress to vote against the 2001 AUMF. Consistently opposes military aid to the government of Israel.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Nancy Pelosi', party: 'D', district: 11, label: 'CA-11', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'Former Speaker. Voted No on first weapons package (Nov 2023), then Yes on the combined $26.38B package (April 2024), then No on the bomb delivery bill (May 2024). The shift to Yes on H.R. 8034 is notable given her stature — she voted Yes when the package included Ukraine and Taiwan aid alongside weapons for the government of Israel.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Mark Takano', party: 'D', district: 39, label: 'CA-39', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three weapons packages. One of the few California Democrats who voted No on the combined $26.38B package (H.R. 8034) — most California Democrats voted Yes when Ukraine aid was bundled in.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  TX: {
    name: 'Texas',
    redistricted: true,
    redistrictingNote: 'Texas Republicans passed an aggressive mid-decade redistricting map in August 2025 (signed by Gov. Abbott). The Supreme Court allowed the new map in December 2025. Expected to net GOP 3–5 additional seats. Rep. Greg Casar (D), who voted No on all three weapons packages, was redistricted from TX-35 into the new TX-37. His old seat (TX-35) went from D+40 to R+7 — effectively silencing one of the strongest anti-weapons voices in the House.',
    governor: {
      rating: 'Likely R',
      note: 'Incumbent Gov. Greg Abbott (R) seeks a fourth term. Abbott declared "Anybody who is an enemy of Israel is an enemy of Texas" and signed anti-BDS legislation. His challenger, state Rep. Gina Hinojosa (D), supports BDS and blocking weapons sales to the government of Israel — one of the starkest contrasts in the country on this issue.',
      candidates: [
        { name: 'Greg Abbott', party: 'R', background: 'Incumbent governor since 2015. Former Texas Attorney General. Won 2022 re-election by 11 points over Beto O\'Rourke.', incumbentOrChallenger: 'incumbent', foreignPolicyPosition: 'One of the most aggressively supportive governors of the government of Israel in the country. Signed Texas anti-BDS law barring state contracts with companies boycotting the government of Israel. Visited the government of Israel multiple times. Threatened to cut state grants to San Marcos for passing a ceasefire resolution in April 2025. Received the "Friends of Zion Award" in Jerusalem.', quotes: [{ text: 'Anti-Israel policies are anti-Texas policies.', source: 'Official Governor statement', date: 'April 2025' }, { text: 'Anybody who is an enemy of Israel is an enemy of Texas.', source: 'Friends of Zion Heritage Center, Jerusalem', date: null }], lobbyConnection: 'Signed anti-BDS legislation. Received Friends of Zion Award.', source: 'Office of the Texas Governor, Friends of Zion Museum, Texas Tribune, FOX 7 Austin' },
        { name: 'Gina Hinojosa', party: 'D', background: 'State representative from Austin (District 49). Won nine-way Democratic primary with 59.9% of the vote. Runs on lifting working-class Texans and taking on billionaires.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Supports the BDS movement to pressure the government of Israel to withdraw from occupied territories. Supports blocking weapons sales to the government of Israel. In debate, agreed on using congressional power to counteract the Trump administration\'s foreign policy and block weapons sales.', lobbyConnection: null, source: 'Ballotpedia, iSideWith, KWTX, The Patriot Talon' }
      ]
    },
    senate: {
      rating: 'Likely R',
      note: 'THIS RACE IS A MAJOR STORY — State Rep. James Talarico (D) won the Democratic primary partly on his criticism of the government of Israel\'s actions in Gaza. He raised a record $27 million in Q1 2026 — more than any Senate campaign ever for that period. He opposes offensive weapons sales and pledged to take no PAC money from either side of the conflict. His opponent, AG Ken Paxton (R), defeated four-term incumbent Sen. John Cornyn in the GOP primary runoff with 63.8% after Trump\'s endorsement. Paxton enforced Texas\'s anti-BDS law as Attorney General.',
      candidates: [
        { name: 'Ken Paxton', party: 'R', background: 'Texas Attorney General since 2015. Defeated four-term incumbent Sen. John Cornyn in the May 2026 GOP primary runoff with 63.8% of the vote. Trump endorsed him on May 19. Was impeached by the TX House in 2023 but acquitted by the TX Senate. Under federal indictment on securities fraud charges since 2015.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Strongly supportive of the government of Israel. As Attorney General, enforced Texas anti-BDS law barring contracts with companies that boycott the government of Israel. Visited the government of Israel in 2017 with a delegation "to promote business development and cultural ties." Supported Trump\'s strikes on Iran in 2026. Reaffirmed anti-BDS enforcement after October 7, 2023.', lobbyConnection: 'Enforced state anti-BDS law as AG.', source: 'Texas Tribune, ISideWith, TrackAIPAC, KSAT, NPR' },
        { name: 'James Talarico', party: 'D', background: 'State representative and former teacher. Won Democratic primary with 52.4% over Rep. Jasmine Crockett. Raised a record $27 million in Q1 2026 — more than any Senate campaign in history for that period. His faith-forward progressive politics have drawn national attention.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'Condemned what he called the government of Israel\'s "atrocities in Palestine" and "war crimes." Opposes offensive weapons sales to the government of Israel. Supports banning sale of offensive weapons while maintaining defensive systems like Iron Dome. Supports a two-state solution. Pledged not to take campaign contributions from any PACs on either side of the conflict. Stopped short of using the word genocide.', lobbyConnection: 'Refuses all PAC money from both sides of the conflict.', source: 'San Antonio Current, The Intercept, Lone Star Left, Times of Israel, Factually.co, Yahoo News' }
      ]
    },
    competitiveHouse: [
      {
        district: 15, label: 'TX-15', area: 'South Texas / Rio Grande Valley', rating: 'Lean R', redistricted: false,
        note: 'The only Texas seat on the DCCC\'s initial 2026 target list. South Texas border district with a large Hispanic-Catholic population. De La Cruz flipped this seat in 2022 — the first Republican to represent South Texas in over 100 years.',
        incumbent: { name: 'Monica De La Cruz', party: 'R', termStart: 2023, keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, lobbyFunding: 85000, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Voted Yes on all three weapons packages', 'Received over $85,000 from the foreign lobby for the government of Israel in her first term', 'First Republican to represent South Texas in over 100 years — flipped seat in 2022'], source: 'clerk.house.gov Roll Call 577, 152, and 217; TrackAIPAC, Texas Tribune, Ballotpedia' },
        challenger: { name: 'Bobby Pulido', party: 'D', background: 'Two-time Latin Grammy Award-winning Tejano music star. Household name in South Texas and the Rio Grande Valley. Won Democratic primary over Dr. Ada Cuellar.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'CBS News, Texas Tribune, Ballotpedia' }
      },
      {
        district: 28, label: 'TX-28', area: 'Laredo / South San Antonio', rating: 'Lean D', redistricted: false,
        note: 'Henry Cuellar is the most lobby-aligned Democrat in the Texas delegation. He received $3.2M in career donations from the foreign lobby for the government of Israel and its aligned donors. In March 2026, he was one of only four House Democrats to vote against a War Powers Resolution to curb Trump\'s military actions against Iran — all four had received lobby donations. A Democratic incumbent worth targeting.',
        incumbent: { name: 'Henry Cuellar', party: 'D', termStart: 2005, keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, lobbyFunding: 3200000, lobbyEndorsed: true, lobbyTrip: false, notableActions: ['Voted Yes on two of three weapons packages — the $26.38B package and the forced bomb delivery bill', 'Received $3.2M career total from the foreign lobby for the government of Israel and aligned donors', 'One of only 4 House Democrats to vote against Iran War Powers Resolution in March 2026 — all 4 received lobby donations', 'United Democracy Project (lobby super-PAC) spent $1.8M defending him in the 2022 primary', 'Most conservative Democrat in the House on foreign policy'], source: 'clerk.house.gov Roll Call 577, 152, and 217; OpenSecrets, JTA, San Antonio Current, TrackAIPAC' },
        challenger: { name: 'Tano Tijerina', party: 'R', background: 'Webb County Judge. Won Republican primary. Running in a district that has trended more competitive in recent cycles.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Ballotpedia, KSAT' }
      },
      {
        district: 34, label: 'TX-34', area: 'Brownsville / Rio Grande Valley', rating: 'Lean D', redistricted: true,
        note: 'Gonzalez voted No on the first weapons package but switched to Yes on the $26.38B package. Trump-endorsed Eric Flores is the Republican challenger.',
        incumbent: { name: 'Vicente Gonzalez', party: 'D', termStart: 2017, keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: null }, lobbyFunding: null, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Voted No on first weapons package, then Yes on the $26.38B package', 'Not Voting on the forced bomb delivery bill (H.R. 8369)'], source: 'clerk.house.gov Roll Call 577, 152, and 217; Ballotpedia' },
        challenger: { name: 'Eric Flores', party: 'R', background: 'Trump-endorsed Republican. Won GOP primary for TX-34.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Ballotpedia, NBC News' }
      },
      {
        district: 35, label: 'TX-35', area: 'San Antonio exurbs / Guadalupe County', rating: 'Lean R', redistricted: true,
        redistrictingImpact: 'Massively redistricted — was D+40 under old lines, now R+7 after 2025 mid-decade redistricting. Rep. Greg Casar (D), who voted No on all three weapons packages, was drawn out and moved to TX-37. The redistricting effectively eliminated one of the strongest anti-weapons voices from a competitive district.',
        note: 'Open seat. This district is a textbook example of gerrymandering silencing dissent — Casar was one of the strongest No votes in Congress and was redistricted into a different seat. The D candidate, Johnny Garcia, won the Democratic runoff after his opponent Maureen Galindo was rejected by voters following antisemitic comments.',
        incumbent: null,
        openSeatCandidates: [
          { name: 'Johnny Garcia', party: 'D', background: 'Bexar County Sheriff\'s Deputy. Won Democratic runoff over housing activist Maureen Galindo. First-time candidate.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Texas Tribune, KSAT' },
          { name: 'Carlos De La Cruz', party: 'R', background: 'Brother of Rep. Monica De La Cruz (TX-15). Won Republican runoff over state Rep. John Lujan.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Texas Tribune, KSAT' }
        ],
        predecessorVotes: { hr6126: 'No', hr8034: 'No', hr8369: 'No' },
        retiredIncumbent: 'Greg Casar',
        predecessorNote: 'Casar (D, redistricted to TX-37) voted No on all three weapons packages. One of the strongest anti-weapons voices in Congress — the legislature drew him out of this district.'
      },
      {
        district: 32, label: 'TX-32', area: 'Dallas suburbs to deep East Texas', rating: 'Safe R', redistricted: true,
        redistrictingImpact: 'Massively redistricted — was a competitive suburban Dallas district won by both parties in recent cycles. Now stretches from Dallas suburbs deep into rural East Texas, making it solidly Republican. Rep. Julie Johnson (D) abandoned it for the bluer TX-33.',
        note: 'ANOTHER GERRYMANDERING STORY. This was a competitive district until the 2025 redistricting stretched it into deep-red East Texas. The sitting Democratic representative, Julie Johnson, was forced to abandon it. Jace Yarbrough (R) won the Republican primary unopposed after his only opponent dropped out. Democrats have little chance here under the new map.',
        incumbent: null,
        openSeatCandidates: [
          { name: 'TBD', party: 'D', background: 'Democratic candidates for the redrawn TX-32 are running but face an extremely uphill battle in the new R-leaning configuration.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Ballotpedia, The Texan' },
          { name: 'Jace Yarbrough', party: 'R', background: 'Won the nine-way Republican primary. Opponent Ryan Binkley dropped out of the runoff, making Yarbrough the nominee.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'The Texan, Ballotpedia' }
        ],
        predecessorVotes: { hr6126: null, hr8034: null, hr8369: null },
        retiredIncumbent: 'Julie Johnson',
        predecessorNote: 'Johnson (D, moved to TX-33) was a freshman with no 118th Congress voting record on weapons packages. The district was redrawn out from under her.'
      }
    ],
    otherNotableMembers: [
      { name: 'Greg Casar', party: 'D', district: 37, label: 'TX-37', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three weapons packages. Progressive champion. Was redistricted from TX-35 (D+40) to the new TX-37 — one of the clearest examples of gerrymandering targeting an anti-weapons voice.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Lloyd Doggett', party: 'D', district: 37, label: 'TX-37', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three weapons packages. The longest-serving Texas Democrat in the House. First Democratic member of Congress to publicly call on President Biden to withdraw from the 2024 race. Consistently opposes military aid to the government of Israel.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Al Green', party: 'D', district: 9, label: 'TX-09', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three weapons packages. Senior Houston-area Democrat. First introduced articles of impeachment against Trump in 2017.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Joaquin Castro', party: 'D', district: 20, label: 'TX-20', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three weapons packages. Vocal critic of U.S. military aid to the government of Israel. Former chair of the Congressional Hispanic Caucus.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Colin Allred', party: 'D', district: 33, label: 'TX-33', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'Returning to Congress after losing the 2024 Senate race to Ted Cruz. Won the May 2026 TX-33 Democratic primary runoff over Julie Johnson (the sitting incumbent) after redistricting shuffled both into the same district. Voted No on the standalone package and bomb delivery bill, but Yes on the $26.38B combined package. His Senate race gave him statewide name recognition.', source: 'clerk.house.gov Roll Call 577, 152, and 217; Texas Tribune, NBC News' },
      { name: 'Jasmine Crockett', party: 'D', district: 30, label: 'TX-30', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'Voted No on the standalone package and bomb delivery bill, Yes on the $26.38B combined package. Lost the 2026 Democratic Senate primary to James Talarico — Talarico\'s anti-weapons stance was a key differentiator. Rose to national prominence through fiery committee performances.', source: 'clerk.house.gov Roll Call 577, 152, and 217; Texas Tribune' },
      { name: 'Dan Crenshaw', party: 'R', district: 2, label: 'TX-02', keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, note: 'Voted Yes on all three weapons packages. High-profile Republican and vocal advocate for military aid to the government of Israel.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Michael McCaul', party: 'R', district: 10, label: 'TX-10', keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, note: 'Voted Yes on all three weapons packages. Former chair of the House Foreign Affairs Committee — shepherded the weapons packages through committee.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Chip Roy', party: 'R', district: 21, label: 'TX-21', keyVotes: { hr6126: 'Yes', hr8034: 'No', hr815: null, hr8369: 'Yes' }, note: 'UNUSUAL REPUBLICAN DISSENTER — voted No on the $26.38B combined package (H.R. 8034) because it included $9 billion in humanitarian aid to Gaza, which he said would reach Hamas. He supported the standalone weapons-only packages. His No vote came from the opposite direction of the progressive No votes — he wanted more weapons, not fewer. Important to understand this distinction.', source: 'clerk.house.gov Roll Call 577, 152, and 217; Rep. Roy press release, Texas Tribune' },
      { name: 'Troy Nehls', party: 'R', district: 22, label: 'TX-22', keyVotes: { hr6126: 'Yes', hr8034: 'No', hr815: null, hr8369: 'Yes' }, note: 'Same pattern as Chip Roy — voted No on H.R. 8034 because of the humanitarian aid component, not because he opposed weapons transfers. Voted Yes on both standalone weapons packages.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  IA: {
    name: 'Iowa',
    redistricted: false,
    redistrictingNote: null,
    governor: {
      rating: 'Toss-up',
      note: 'Open seat — Gov. Kim Reynolds (R) is term-limited. Businessman Zach Lahn upset Rep. Randy Feenstra (who voted Yes/Yes/Yes on all weapons packages) in the Republican primary. State Auditor Rob Sand (D) ran unopposed. Forecasters shifted this race to Toss-up.',
      candidates: [
        { name: 'Zach Lahn', party: 'R', background: 'Iowa businessman. Upset Rep. Randy Feenstra in the Republican primary. First-time candidate.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'NPR, Iowa Capital Dispatch, Ballotpedia' },
        { name: 'Rob Sand', party: 'D', background: 'Iowa State Auditor. Ran unopposed in the Democratic primary. Has won statewide office in a red-trending state.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'NPR, Iowa Capital Dispatch, Ballotpedia' }
      ]
    },
    senate: {
      rating: 'Lean R',
      note: 'Open seat — Sen. Joni Ernst (R) is not seeking re-election. Rep. Ashley Hinson (R), who voted Yes on all three weapons packages as a House member, won the GOP primary with Trump\'s endorsement. State Rep. Josh Turek (D) won the Democratic primary. Turek pushed for conditions on U.S. military support for the government of Israel in the Iowa Statehouse but ultimately voted for an unconditional resolution when his amendment failed. His campaign declined to comment on suspending arms sales.',
      candidates: [
        { name: 'Ashley Hinson', party: 'R', background: 'U.S. Representative from IA-02 (2021–2027). Won GOP primary with 73.9% of the vote. Trump-endorsed. Leaving her House seat to run for Senate.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'As a House member, voted Yes on all three weapons packages to the government of Israel (H.R. 6126, H.R. 8034, H.R. 8369). Privately acknowledged the ongoing U.S. conflict with Iran could become a "political liability" but publicly said she trusts Trump to end it.', houseVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'Yes' }, lobbyConnection: null, source: 'clerk.house.gov Roll Call 577, 152, and 217; CBS News, NewsNation, Ballotpedia' },
        { name: 'Josh Turek', party: 'D', background: 'State representative. Self-described "prairie populist." Won Democratic primary with 62.6% over state Sen. Zach Wahls.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'In the Iowa Statehouse, proposed an amendment conditioning support for the government of Israel on "adherence to international humanitarian law and protection of innocent civilian lives." The amendment failed. He then voted for the unconditional resolution. His campaign declined to comment on suspending arms sales to the government of Israel.', lobbyConnection: null, source: 'Jewish Insider, The Gazette, Iowa Capital Dispatch, Ballotpedia' }
      ]
    },
    competitiveHouse: [
      {
        district: 1, label: 'IA-01', area: 'Southeast Iowa / Davenport / Iowa City', rating: 'Toss-up', redistricted: false,
        note: 'Third consecutive matchup between Miller-Meeks and Bohannan. Miller-Meeks won in 2020 by 6 votes and in 2024 by ~800 votes. Bohannan is out-fundraising the incumbent. One of the most competitive House races in the country.',
        incumbent: { name: 'Mariannette Miller-Meeks', party: 'R', termStart: 2021, keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, lobbyFunding: 66243, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Voted Yes on all three weapons packages', 'Received ~$66,000 in career funding from the foreign lobby for the government of Israel', 'Won 2020 race by only 6 votes — one of the narrowest House victories in history'], source: 'clerk.house.gov Roll Call 577, 152, and 217; OpenSecrets, Cook Political Report, Ballotpedia' },
        challenger: { name: 'Christina Bohannan', party: 'D', background: 'University of Iowa law professor. Former Iowa state representative. Lost to Miller-Meeks by ~800 votes in 2024. Won Democratic primary with 81.5%. Out-fundraising Miller-Meeks — raised $1.06M in latest period with $1.6M cash on hand.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Iowa Capital Dispatch, KFGO, Ballotpedia' }
      },
      {
        district: 2, label: 'IA-02', area: 'Northeast Iowa / Cedar Rapids / Waterloo', rating: 'Lean R', redistricted: false,
        note: 'Open seat — Rep. Ashley Hinson (R) left to run for Senate. Hinson voted Yes on all three weapons packages.',
        incumbent: null,
        openSeatCandidates: [
          { name: 'Lindsay James', party: 'D', background: 'Won Democratic primary over Kathy Dolter and Clint Twedt-Ball.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'KCRG, Ballotpedia' },
          { name: 'Joe Mitchell', party: 'R', background: 'Won Republican primary for the open IA-02 seat.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Ballotpedia, Iowa Public Radio' }
        ],
        predecessorVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'Yes' },
        retiredIncumbent: 'Ashley Hinson',
        predecessorNote: 'Hinson (R, running for Senate) voted Yes on all three weapons packages.'
      },
      {
        district: 3, label: 'IA-03', area: 'Des Moines metro / Western Iowa suburbs', rating: 'Lean R', redistricted: false,
        note: 'Nunn won in 2024 by only 4 points. State Sen. Sarah Trone Garriott is a strong challenger who has won tough races in Republican-heavy state legislative districts. Cook rates Lean R; Sabato\'s Crystal Ball rates Toss-up.',
        incumbent: { name: 'Zach Nunn', party: 'R', termStart: 2023, keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, lobbyFunding: null, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Voted Yes on all three weapons packages', 'Won 2024 by only 4 points — running about even with Trump\'s margin in the district'], source: 'clerk.house.gov Roll Call 577, 152, and 217; Cook Political Report, Ballotpedia' },
        challenger: { name: 'Sarah Trone Garriott', party: 'D', background: 'Iowa state senator. Has won multiple tough races in Republican-heavy districts in the Iowa State Legislature. Strong fundraiser.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Iowa Public Radio, Cook Political Report, Ballotpedia' }
      }
    ],
    otherNotableMembers: [
      { name: 'Randy Feenstra', party: 'R', district: 4, label: 'IA-04', keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, note: 'Voted Yes on all three weapons packages. Lost the Republican gubernatorial primary to Zach Lahn — even his own party\'s primary voters rejected him.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  NE: {
    name: 'Nebraska',
    redistricted: false,
    redistrictingNote: null,
    governor: {
      rating: 'Safe R',
      note: 'Incumbent Gov. Jim Pillen (R) seeking re-election. Won primary with 76%. Democrat Lynne Walz won her primary with 91%. Not competitive.',
      candidates: [
        { name: 'Jim Pillen', party: 'R', background: 'Incumbent governor since 2023. Cattle rancher and former Nebraska Regent.', incumbentOrChallenger: 'incumbent', foreignPolicyPosition: null, lobbyConnection: null, source: 'Ballotpedia' },
        { name: 'Lynne Walz', party: 'D', background: 'Former state senator. Won Democratic primary with 91%.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'Ballotpedia' }
      ]
    },
    senate: {
      rating: 'Lean R',
      note: 'Sen. Pete Ricketts (R) is seeking his first full term (was appointed in 2023 to replace retiring Ben Sasse). Independent Dan Osborn, a union leader, is the wildcard — he nearly won in 2024 running as an independent and could draw crossover support.',
      candidates: [
        { name: 'Pete Ricketts', party: 'R', background: 'Appointed senator in 2023. Former Nebraska governor (2015–2023). Heir to TD Ameritrade fortune. Won 2024 special election.', incumbentOrChallenger: 'incumbent', foreignPolicyPosition: 'Strongly supportive of military aid to the government of Israel. Voted against blocking weapons transfers in the Senate.', lobbyConnection: null, source: 'Ballotpedia, CAIR' },
        { name: 'Dan Osborn', party: 'I', background: 'Union leader and independent candidate. Nearly won the 2024 Senate race as an independent — a remarkable showing in deep-red Nebraska. Running again.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'Ballotpedia, Nebraska Examiner' }
      ]
    },
    competitiveHouse: [
      {
        district: 2, label: 'NE-02', area: 'Omaha metro / Douglas & Sarpy Counties', rating: 'Toss-up', redistricted: false,
        note: 'THE most important House race in Nebraska — and one of the most important in the country. This is the "blue dot" district that awards one of Nebraska\'s split electoral votes. It went for Biden in 2020 and Harris in 2024 while simultaneously re-electing Republican Don Bacon by 6 points. Bacon retired after voting Yes on all three weapons packages. Cook PVI is D+3. Democrats view this as essential for retaking the House.',
        incumbent: null,
        openSeatCandidates: [
          { name: 'Denise Powell', party: 'D', background: 'Won the competitive Democratic primary over State Sen. John Cavanaugh. Led all candidates in fundraising — raised $1.04M in 2025 with $624K cash on hand entering 2026.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Nebraska Examiner, Washington Post, Ballotpedia' },
          { name: 'Brinker Harding', party: 'R', background: 'Omaha City Council member. Ran unopposed in the Republican primary.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Nebraska Examiner, Nebraska Public Media, Ballotpedia' }
        ],
        predecessorVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'Yes' },
        retiredIncumbent: 'Don Bacon',
        predecessorNote: 'Bacon (R, retired June 2025) voted Yes on all three weapons packages. Was endorsed by the foreign lobby for the government of Israel.'
      }
    ],
    otherNotableMembers: [
      { name: 'Mike Flood', party: 'R', district: 1, label: 'NE-01', keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, note: 'Voted Yes on all three weapons packages.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Adrian Smith', party: 'R', district: 3, label: 'NE-03', keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, note: 'Voted Yes on all three weapons packages. Safe R district — western Nebraska.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  ME: {
    name: 'Maine',
    redistricted: false,
    redistrictingNote: null,
    governor: {
      rating: 'Lean D',
      note: 'Open seat — Gov. Janet Mills (D) is term-limited. Hannah Pingree (D), daughter of Rep. Chellie Pingree (ME-01), won the Democratic primary through ranked-choice voting. Bobby Charles (R) won the Republican primary. Independent Rick Bennett is also running.',
      candidates: [
        { name: 'Hannah Pingree', party: 'D', background: 'Former Maine House Speaker. Daughter of U.S. Rep. Chellie Pingree (ME-01). Won five-way Democratic primary through ranked-choice voting — trailed on first-round votes but won in the final round 56%–44%.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'Press Herald, WABI, Ballotpedia' },
        { name: 'Bobby Charles', party: 'R', background: 'Won Republican primary. Former Bush administration official.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'NBC News, Ballotpedia' }
      ]
    },
    senate: {
      rating: 'Toss-up',
      note: 'THIS IS ONE OF THE MOST IMPORTANT SENATE RACES IN THE COUNTRY. Sen. Susan Collins (R), first elected in 1996, is seeking a sixth term. Polling shows a dead heat with Democratic challenger Graham Platner, an oyster farmer and Marine Corps veteran. Collins has consistently voted against blocking weapons transfers to the government of Israel. Maine voters oppose U.S. military aid to the government of Israel and are critical of Trump\'s foreign policy, particularly the Iran war.',
      candidates: [
        { name: 'Susan Collins', party: 'R', background: 'Five-term incumbent senator since 1997. Running for a sixth term. Ran unopposed in the Republican primary. Considered a moderate Republican.', incumbentOrChallenger: 'incumbent', foreignPolicyPosition: 'Consistently voted to continue military aid and weapons transfers to the government of Israel. Voted against blocking weapons transfers in the Senate. Along with Sen. Lindsey Graham, asked the State and Defense departments for details about withheld bomb shipments — pressuring the Biden administration to release paused weapons.', lobbyConnection: 'Voted against every Senate resolution to block weapons sales to the government of Israel.', source: 'CAIR, Newsweek, Time, Senate.gov Roll Call Votes' },
        { name: 'Graham Platner', party: 'D', background: 'Oyster farmer and Marine Corps veteran. Won the June 9 Democratic primary with 72% of the vote after Gov. Janet Mills suspended her campaign. Apologized for old Reddit posts where he called himself a "communist" and agreed with posts critical of rural Americans — attributed them to struggles with PTSD. Record-breaking grassroots fundraising.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'NBC News, PBS News, UMass Lowell Poll, Newsweek, Wikipedia' }
      ]
    },
    competitiveHouse: [
      {
        district: 2, label: 'ME-02', area: 'Rural Maine / Bangor / Lewiston / Aroostook County', rating: 'Toss-up', redistricted: false,
        note: 'Open seat — Rep. Jared Golden (D) retired, citing family safety concerns. Golden was one of the few Democrats who voted Yes on all three weapons packages and received over $800,000 in career funding from the foreign lobby for the government of Israel. His retirement removes a lobby-aligned Democrat, creating an opportunity. Former Republican Gov. Paul LePage is the GOP nominee.',
        incumbent: null,
        openSeatCandidates: [
          { name: 'Matt Dunlap', party: 'D', background: 'Former Maine State Auditor and former Secretary of State. Won the four-way Democratic primary through ranked-choice voting — trailed on first-round votes but won in the final tabulation over State Sen. Joe Baldacci and Jordan Wood.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'NBC News, WABI, Preti Flaherty, Ballotpedia' },
          { name: 'Paul LePage', party: 'R', background: 'Former two-term Governor of Maine (2011–2019). Ran unopposed in the Republican primary. Known for controversial statements during his governorship. Lost the 2022 governor\'s race to Janet Mills.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'NBC News, WABI, Ballotpedia' }
        ],
        predecessorVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'Yes' },
        retiredIncumbent: 'Jared Golden',
        predecessorNote: 'Golden (D, retired) voted Yes on all three weapons packages — one of the few Democrats to do so on all three. Received over $800,000 in career funding from the foreign lobby for the government of Israel.'
      }
    ],
    otherNotableMembers: [
      { name: 'Chellie Pingree', party: 'D', district: 1, label: 'ME-01', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three weapons packages. Progressive champion — consistent opponent of military aid to the government of Israel. Her daughter Hannah Pingree is the Democratic nominee for governor.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  NY: {
    name: 'New York',
    redistricted: false,
    redistrictingNote: null,
    governor: {
      rating: 'Likely D',
      note: 'Incumbent Gov. Kathy Hochul (D) ran uncontested in the June 23 Democratic primary (Delgado withdrew). Nassau County Executive Bruce Blakeman (R), endorsed by Trump after Stefanik withdrew, ran uncontested in the Republican primary. General election: Hochul (D) vs. Blakeman (R).',
      candidates: [
        { name: 'Kathy Hochul', party: 'D', background: 'Incumbent governor since August 2021 (succeeded Cuomo). Won 2022 election. First woman to serve as New York governor.', incumbentOrChallenger: 'incumbent', foreignPolicyPosition: null, lobbyConnection: null, source: 'Ballotpedia, City & State NY' },
        { name: 'Bruce Blakeman', party: 'R', background: 'Nassau County Executive. Trump-endorsed after Stefanik withdrew in December 2025.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'Ballotpedia, City & State NY' }
      ]
    },
    senate: null,
    senateNote: 'No U.S. Senate race in New York in 2026. Sen. Chuck Schumer (D) up in 2028; Sen. Kirsten Gillibrand (D) re-elected 2024.',
    competitiveHouse: [
      {
        district: 4, label: 'NY-04', area: 'Long Island / Nassau County', rating: 'Toss-up', redistricted: false,
        note: 'Freshman Rep. Laura Gillen (D) unseated Anthony D\'Esposito (R) in 2024 by only 8,600 votes (2.3 points). D\'Esposito voted Yes on all three weapons packages. Gillen endorsed by and went on a trip sponsored by the foreign lobby. Gillen was uncontested in the June 23 Democratic primary after Taylor Darling and other challengers withdrew. District has a significant Jewish population.',
        incumbent: { name: 'Laura Gillen', party: 'D', termStart: 2025, keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null }, lobbyFunding: null, lobbyEndorsed: true, lobbyTrip: true, notableActions: ['Freshman — no 118th Congress voting record on weapons packages', 'Went on a trip sponsored by the foreign lobby for the government of Israel (August 2025)', 'Publicly supports the government of Israel\'s "right to defend itself"', 'Uncontested in June 23 Democratic primary after challengers withdrew'], source: 'Cook Political Report, Ballotpedia, Jewish Insider' },
        challenger: { name: 'Jeanine Driscoll', party: 'R', background: 'Hempstead Town Receiver of Taxes since 2019. Attorney and former associate village justice in Bellerose. Fordham Law graduate. Won the Republican primary on June 23, 2026 with over 90% of the vote after four other candidates withdrew or were disqualified. Running on tax relief, border security, and small business deregulation.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Patch, NBC News, LI Herald, North Shore Leader, Ballotpedia' },
        predecessorVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'Yes' },
        retiredIncumbent: 'Anthony D\'Esposito',
        predecessorNote: 'D\'Esposito (R, lost 2024) voted Yes on all three weapons packages.'
      },
      {
        district: 17, label: 'NY-17', area: 'Hudson Valley / Rockland County', rating: 'Toss-up', redistricted: false,
        note: 'Mike Lawler (R) is the #26 highest recipient of funding from the foreign lobby for the government of Israel in Congress — $685,000+ career total. Voted Yes on all three weapons packages. Introduced the "Stand With Israel Act." One of only 3 districts nationally held by a Republican that Kamala Harris won in 2024. Democrat Cait Conley won the June 23 primary and will challenge Lawler in November.',
        incumbent: { name: 'Mike Lawler', party: 'R', termStart: 2023, keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, lobbyFunding: 685000, lobbyEndorsed: true, lobbyTrip: false, notableActions: ['Voted Yes on all three weapons packages', 'Received $685,000+ career total from the foreign lobby for the government of Israel', 'Introduced the bipartisan "Stand With Israel Act" at the UN', 'One of only 3 Rs in a district Harris won in 2024'], source: 'clerk.house.gov Roll Call 577, 152, and 217; TrackAIPAC, Jewish Insider, Cook Political Report' },
        challenger: { name: 'Cait Conley', party: 'D', background: 'Army veteran with 16 years active duty including Iraq and Afghanistan deployments. West Point graduate with master\'s degrees from MIT and Harvard. Former Director of Counterterrorism on the National Security Council. Former CISA senior official. Won five-way Democratic primary June 23, 2026.', foreignPolicyPosition: 'Supports a two-state solution. Views the government of Israel as a "critical national security ally." Described as pro-Israel by the Jewish Telegraphic Agency.', lobbyFunding: null, lobbyEndorsed: false, source: 'Jewish Telegraphic Agency, River Journal Online, City & State NY, Ballotpedia' }
      },
      {
        district: 19, label: 'NY-19', area: 'Hudson Valley / Catskills / Ithaca', rating: 'Lean D', redistricted: false,
        note: 'Freshman Rep. Josh Riley (D) narrowly defeated Marc Molinaro (R) in 2024 in a rematch from 2022. Molinaro voted Yes on all three weapons packages. Republican state Sen. Peter Oberacker, endorsed by Trump, won the June 23 primary with 77.6% and will challenge Riley in November. Less competitive than NY-04 and NY-17.',
        incumbent: { name: 'Josh Riley', party: 'D', termStart: 2025, keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null }, lobbyFunding: null, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Freshman — no 118th Congress voting record on weapons packages'], source: 'Cook Political Report, Ballotpedia' },
        challenger: { name: 'Peter Oberacker', party: 'R', background: 'New York state senator since 2021. Former Otsego County legislator and Town of Maryland supervisor. Food industry businessman and research chef. Trump-endorsed. Won Republican primary June 23, 2026 with 77.6% over Alex Portelli.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Spectrum News, WBNG, News10, Ballotpedia' },
        predecessorVotes: { hr6126: 'Yes', hr8034: 'Yes', hr8369: 'Yes' },
        retiredIncumbent: 'Marc Molinaro',
        predecessorNote: 'Molinaro (R, lost 2024) voted Yes on all three weapons packages.'
      }
    ],
    otherNotableMembers: [
      { name: 'Tom Suozzi', party: 'D', district: 3, label: 'NY-03', keyVotes: { hr6126: null, hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, lobbyFunding: 322000, note: 'Received $322,000+ career total from the foreign lobby for the government of Israel. Went on a lobby-sponsored trip. Said "I like the lobby. I think they\'re very smart. They do a good job." One of only two NY Democrats to vote Yes on both H.R. 8034 and H.R. 8369 (the other is Ritchie Torres). Won 2024 special election in Santos\' old seat with heavy backing from the Democratic Majority for Israel. Safe D district.', source: 'clerk.house.gov Roll Call 577, 152, and 217; TrackAIPAC, OpenSecrets, The Intercept' },
      { name: 'George Latimer', party: 'D', district: 16, label: 'NY-16', keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null }, lobbyFunding: null, note: 'PROOF POINT FOR THIS CAMPAIGN. Latimer was installed in 2024 after the foreign lobby for the government of Israel spent $14.5 million to defeat Rep. Jamaal Bowman in the most expensive House primary in American history. Bowman (who voted No on all three weapons packages) was replaced by a self-described "strong supporter" of the government of Israel. This is the clearest example of what happens when the lobby targets an anti-weapons voice — and why this campaign exists.', source: 'Rolling Stone, The Intercept, Jewish Insider, Responsible Statecraft' },
      { name: 'Alexandria Ocasio-Cortez', party: 'D', district: 14, label: 'NY-14', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three weapons packages. One of the most high-profile voices against military aid to the government of Israel. Introduced resolution calling for ceasefire.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Hakeem Jeffries', party: 'D', district: 8, label: 'NY-08', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'House Democratic Leader. Voted No on the first weapons package, then Yes on the $26.38B combined package that included Ukraine and Taiwan aid, then No on the forced bomb delivery bill. His Yes vote on H.R. 8034 is significant given his leadership role — he whipped Democrats to support the combined package.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Gregory Meeks', party: 'D', district: 5, label: 'NY-05', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'Ranking Member of the House Foreign Affairs Committee — the most senior Democrat on the committee that oversees arms transfers. Voted No on the standalone package but Yes on the $26.38B combined package. His position on the committee means he has direct influence over weapons transfer policy.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Jerry Nadler', party: 'D', district: 13, label: 'NY-13', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'Senior House Democrat representing the Upper West Side and parts of Brooklyn. Voted No on the standalone package and the bomb delivery bill, but Yes on the $26.38B combined package. Ranking Member of the Judiciary Committee.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Ritchie Torres', party: 'D', district: 15, label: 'NY-15', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, note: 'One of only two NY Democrats (with Suozzi) to vote Yes on both H.R. 8034 and H.R. 8369. Among the most vocal supporters of the government of Israel in the Democratic caucus. Represents the South Bronx — one of the poorest districts in the country.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Nydia Velazquez', party: 'D', district: 7, label: 'NY-07', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three weapons packages. Senior progressive representing parts of Brooklyn, Queens, and the Lower East Side.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  CO: {
    name: 'Colorado',
    redistricted: false,
    redistrictingNote: null,
    governor: {
      rating: 'Likely D',
      note: 'Open seat — Gov. Jared Polis (D) is term-limited. Democratic primary June 30: U.S. Sen. Michael Bennet vs AG Phil Weiser. Republican primary June 30: state Sen. Barbara Kirkmeyer, state Rep. Scott Bottoms, Victor Marx.',
      candidates: [
        { name: 'TBD (D primary June 30)', party: 'D', background: 'U.S. Sen. Michael Bennet and AG Phil Weiser are competing in the Democratic primary on June 30, 2026.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'CPR News, Colorado Politics, Ballotpedia' },
        { name: 'TBD (R primary June 30)', party: 'R', background: 'State Sen. Barbara Kirkmeyer, state Rep. Scott Bottoms, and Victor Marx are competing in the Republican primary on June 30, 2026.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'CPR News, Colorado Politics, Ballotpedia' }
      ]
    },
    senate: {
      rating: 'Likely D',
      note: 'Sen. John Hickenlooper (D) is seeking re-election to a second term. Colorado has shifted strongly Democratic at the federal level. Not expected to be competitive.',
      candidates: [
        { name: 'John Hickenlooper', party: 'D', background: 'Incumbent senator since 2021. Former Colorado governor (2011–2019). Former Denver mayor.', incumbentOrChallenger: 'incumbent', foreignPolicyPosition: null, lobbyConnection: null, source: 'Ballotpedia' },
        { name: 'TBD', party: 'R', background: 'Republican nominees TBD after June 30 primary.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'Ballotpedia' }
      ]
    },
    competitiveHouse: [
      {
        district: 8, label: 'CO-08', area: 'North Denver suburbs / Thornton / Greeley', rating: 'Toss-up', redistricted: false,
        note: 'Freshman Rep. Gabe Evans (R) unseated Yadira Caraveo (D, who voted No/Yes/No) in 2024 by one of the closest margins in the country. Evans is unopposed in the R primary. Democratic primary is June 30 — state Rep. Manny Rutinel is the frontrunner over former state Rep. Shannon Bird. Caraveo dropped out of the rematch.',
        incumbent: { name: 'Gabe Evans', party: 'R', termStart: 2025, keyVotes: { hr6126: null, hr8034: null, hr815: null, hr8369: null }, lobbyFunding: null, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Freshman — no 118th Congress voting record on weapons packages', 'Unseated Caraveo in 2024 by razor-thin margin', 'Unopposed in Republican primary'], source: 'Cook Political Report, Colorado Pols, Ballotpedia' },
        challenger: { name: 'TBD (D primary June 30)', party: 'D', background: 'State Rep. Manny Rutinel is the frontrunner in the Democratic primary on June 30. Former state Rep. Shannon Bird is also competing. Former Rep. Yadira Caraveo dropped out.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Colorado Pols, CPR News, Axios Denver, Ballotpedia' },
        predecessorVotes: { hr6126: 'No', hr8034: 'Yes', hr8369: 'No' },
        retiredIncumbent: 'Yadira Caraveo',
        predecessorNote: 'Caraveo (D, lost 2024) voted No on first and third weapons packages but Yes on the $26.38B combined package.'
      }
    ],
    otherNotableMembers: [
      { name: 'Lauren Boebert', party: 'R', district: 4, label: 'CO-04', keyVotes: { hr6126: 'Yes', hr8034: 'No', hr815: null, hr8369: null }, note: 'Unusual voting pattern — voted Yes on the first weapons package but No on the $26.38B combined package (H.R. 8034). Not Voting on H.R. 8369. One of the few Republicans to break with the party on H.R. 8034. Moved from CO-03 to CO-04 after redistricting.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  NM: {
    name: 'New Mexico',
    redistricted: false,
    redistrictingNote: null,
    governor: {
      rating: 'Lean D',
      note: 'Open seat — Gov. Michelle Lujan Grisham (D) is term-limited. Former Interior Secretary Deb Haaland (D) won the Democratic primary with 72% on June 2. She could be the first Native American woman governor. Republican nominee is former Rio Rancho Mayor Gregg Hull.',
      candidates: [
        { name: 'Deb Haaland', party: 'D', background: 'Former U.S. Secretary of the Interior under Biden (2021–2025). Former U.S. Representative from NM-01 (2019–2021). First Native American to serve as a Cabinet secretary. Won Democratic primary with 72%.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: 'As a congresswoman, was generally progressive on foreign policy. Supported Palestinian rights as part of broader human rights framework.', lobbyConnection: null, source: 'Source New Mexico, NBC News, Washington Post, Ballotpedia' },
        { name: 'Gregg Hull', party: 'R', background: 'Former mayor of Rio Rancho. Won three-way Republican primary with 48% over Doug Turner (36%) and Duke Rodriguez (16%).', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'NBC News, Ballotpedia' }
      ]
    },
    senate: {
      rating: 'Likely D',
      note: 'Sen. Ben Ray Lujan (D) is seeking re-election. Republican challenger Larry Marker. Not expected to be competitive in blue-trending New Mexico.',
      candidates: [
        { name: 'Ben Ray Lujan', party: 'D', background: 'Incumbent senator since 2021. Former U.S. Representative from NM-03 (2009–2021). Former DCCC chair.', incumbentOrChallenger: 'incumbent', foreignPolicyPosition: null, lobbyConnection: null, source: 'Ballotpedia' },
        { name: 'Larry Marker', party: 'R', background: 'Businessman. Republican nominee for NM Senate.', incumbentOrChallenger: 'challenger', foreignPolicyPosition: null, lobbyConnection: null, source: 'Ballotpedia, Politics1' }
      ]
    },
    competitiveHouse: [
      {
        district: 2, label: 'NM-02', area: 'Southern New Mexico / Las Cruces / Roswell', rating: 'Toss-up', redistricted: false,
        note: 'Vasquez voted No on the first and third weapons packages but Yes on the $26.38B combined package. Boycotted Netanyahu\'s address to Congress. Called for a ceasefire in Gaza. Minimal lobby funding (~$5.5K). Facing retired police officer and Marine vet Greg Cunningham (R).',
        incumbent: { name: 'Gabe Vasquez', party: 'D', termStart: 2023, keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, lobbyFunding: 5500, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Voted No on first and third weapons packages, Yes on the $26.38B combined package', 'Boycotted Netanyahu\'s address to Congress', 'Called for ceasefire in Gaza', 'Only ~$5,500 in lobby-aligned PAC contributions'], source: 'clerk.house.gov Roll Call 577, 152, and 217; Ballotpedia, Cook Political Report' },
        challenger: { name: 'Greg Cunningham', party: 'R', background: 'Retired police officer and USMC veteran. Republican nominee for NM-02.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'Ballotpedia, Source New Mexico' }
      }
    ],
    otherNotableMembers: [
      { name: 'Teresa Leger Fernandez', party: 'D', district: 3, label: 'NM-03', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'Voted No on first and third weapons packages, Yes on the $26.38B combined package. Same pattern as all NM Democrats — voted Yes when Ukraine/Taiwan aid was bundled in.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Melanie Stansbury', party: 'D', district: 1, label: 'NM-01', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'Same No/Yes/No pattern. All three New Mexico House members voted identically on these bills.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  WA: {
    name: 'Washington',
    redistricted: false,
    redistrictingNote: null,
    governor: null,
    governorNote: 'No governor race in Washington in 2026. Gov. Bob Ferguson (D) elected 2024.',
    senate: null,
    senateNote: 'No U.S. Senate race in Washington in 2026. Sen. Patty Murray (D) re-elected 2022; Sen. Maria Cantwell (D) re-elected 2024.',
    competitiveHouse: [
      {
        district: 3, label: 'WA-03', area: 'Southwest Washington / Vancouver / rural', rating: 'Toss-up', redistricted: false,
        note: 'Marie Gluesenkamp Perez holds an R+6 district with a ~10–12 point personal premium over the generic Democratic label — the most improbable individual performance in the current Congress. She runs as a working-class, non-ideological auto-shop owner. However, she voted Yes on two of three weapons packages AND received $285,000+ from the foreign lobby for the government of Israel. She has been confronted at town halls about this. WA primary is August 4, 2026 — state Senate Minority Leader John Braun (R) is the likely Republican challenger.',
        incumbent: { name: 'Marie Gluesenkamp Perez', party: 'D', termStart: 2023, keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, lobbyFunding: 285128, lobbyEndorsed: true, lobbyTrip: false, notableActions: ['Voted Yes on two of three weapons packages — the $26.38B package AND the forced bomb delivery bill', 'Received $285,000+ career funding from the foreign lobby for the government of Israel', 'Confronted at town halls about accepting lobby money', 'One of the few Democrats who voted Yes on H.R. 8369 (bomb delivery)'], source: 'clerk.house.gov Roll Call 577, 152, and 217; TrackAIPAC, USPollingData, Cook Political Report' },
        challenger: { name: 'TBD (WA primary August 4)', party: 'R', background: 'State Senate Minority Leader John Braun is the likely Republican challenger. Washington uses a top-two primary system — primary August 4, 2026.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'USPollingData, Cook Political Report, Ballotpedia' }
      }
    ],
    otherNotableMembers: [
      { name: 'Pramila Jayapal', party: 'D', district: 7, label: 'WA-07', keyVotes: { hr6126: 'No', hr8034: 'No', hr815: null, hr8369: 'No' }, note: 'Voted No on all three weapons packages. Chair of the Congressional Progressive Caucus. One of the most vocal House members against military aid to the government of Israel.', source: 'clerk.house.gov Roll Call 577, 152, and 217' },
      { name: 'Kim Schrier', party: 'D', district: 8, label: 'WA-08', keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: 'No' }, note: 'Voted No on first and third weapons packages, Yes on the $26.38B combined package. WA-08 is rated Lean D — competitive but less so than WA-03.', source: 'clerk.house.gov Roll Call 577, 152, and 217' }
    ]
  },
  MO: {
    name: 'Missouri',
    redistricted: true,
    redistrictingNote: 'Missouri Republicans passed an aggressive mid-decade redistricting in a September 2025 special session at Trump\'s urging. The new map targets MO-05 Rep. Emanuel Cleaver (D), the only Democrat in the delegation, by splitting Kansas City along Troost Avenue — the city\'s historic racial dividing line — and stretching the district east through 14 rural counties to Columbia. Cleaver called this "the most psychologically painful thing that happened, not just to me, but the African American community in Kansas City." The Missouri Supreme Court upheld the map in May 2026 despite over 300,000 signatures gathered for a repeal referendum.',
    governor: null,
    governorNote: 'Gov. Mike Kehoe (R) took office in 2025. Not up for re-election until 2028.',
    senate: null,
    senateNote: 'No U.S. Senate race in Missouri in 2026. Sen. Josh Hawley (R) re-elected 2024; Sen. Eric Schmitt (R) up 2028.',
    competitiveHouse: [
      {
        district: 5, label: 'MO-05', area: 'Kansas City (east of Troost) to Columbia', rating: 'Lean R', redistricted: true,
        redistrictingImpact: 'Massively redistricted in 2025 — previously included nearly all of Kansas City as a safe D seat. Now split along Troost Avenue (the city\'s historic racial dividing line) and stretched east through 14 rural counties. Went from safe D to solid R advantage. The partisan advantage is so strong that even a longtime incumbent in a favorable climate almost certainly cannot overcome it.',
        note: 'THIS IS A GERRYMANDERING STORY, NOT A COMPETITIVE RACE. Rep. Emanuel Cleaver (D) is running but is almost certain to lose. The legislature specifically targeted the only Black Democrat in the Missouri delegation by splitting Kansas City along its historic racial dividing line. Cleaver voted No on the first weapons package and Yes on the $26.38B package.',
        incumbent: { name: 'Emanuel Cleaver', party: 'D', termStart: 2005, keyVotes: { hr6126: 'No', hr8034: 'Yes', hr815: null, hr8369: null }, lobbyFunding: null, lobbyEndorsed: false, lobbyTrip: false, notableActions: ['Voted No on first weapons package, Yes on the $26.38B combined package', 'Not Voting on the forced bomb delivery bill (H.R. 8369)', 'Targeted by gerrymandering — his district was split along Kansas City\'s historic racial dividing line', 'Former Kansas City mayor and pastor'], source: 'clerk.house.gov Roll Call 577, 152, and 217; KCUR, Missouri Independent, Ballotpedia' },
        challenger: { name: 'TBD (R primary August 4)', party: 'R', background: 'Five Republicans filed to exploit the partisan advantage created by the new gerrymandered map.', foreignPolicyPosition: null, lobbyFunding: null, lobbyEndorsed: false, source: 'KCUR, Missouri Independent, Ballotpedia' }
      }
    ],
    otherNotableMembers: []
  },
  UT: {
    name: 'Utah',
    redistricted: true,
    redistrictingNote: 'A court-ordered redistricting established a heavily Democratic Salt Lake City-centered district, reducing the number of Republican-leaning districts from four to three. Rep. Burgess Owens (R, who voted Yes on all three weapons packages) retired rather than compete under the new lines. Reps. Celeste Maloy and Mike Kennedy chose new districts to avoid incumbent-on-incumbent primaries.',
    governor: null,
    governorNote: 'Gov. Spencer Cox (R) re-elected 2024. Not up until 2028.',
    senate: null,
    senateNote: 'No U.S. Senate race in Utah in 2026. Sen. John Curtis (R) elected 2024; Sen. Mike Lee (R) up 2028.',
    competitiveHouse: [],
    competitiveHouseNote: 'No competitive U.S. House races in Utah in 2026. The court-ordered redistricting created one safe D district and three safe R districts. The campaign has no targets or allies in Utah\'s House delegation to highlight.',
    otherNotableMembers: [
      { name: 'Burgess Owens', party: 'R', district: 4, label: 'UT-04', keyVotes: { hr6126: 'Yes', hr8034: 'Yes', hr815: null, hr8369: 'Yes' }, note: 'Voted Yes on all three weapons packages. Retired March 2026 after court-ordered redistricting made his seat unwinnable for Republicans. His retirement is a side-effect of the redistricting — not related to the weapons votes.', source: 'clerk.house.gov Roll Call 577, 152, and 217; Deseret News' }
    ]
  }
};

// ============================================
// CONFRONTATION QUESTION GENERATOR
// Generates data-driven questions for town halls/rallies
// ============================================
function generateConfrontationQuestions(candidate, race) {
  const questions = [];
  const votes = candidate.keyVotes || {};
  const funding = candidate.lobbyFunding;

  const votedNoFirst = votes.hr6126 === 'No';
  const votedYesLater = votes.hr8034 === 'Yes' || votes.hr8369 === 'Yes';
  const switchedVote = votedNoFirst && votedYesLater;

  if (votes.hr8034 === 'Yes') {
    const t = GAZA_TIMELINE.hr8034;
    let q = 'On ' + t.voteDate + ', you voted to send $26.38 billion in weapons to the government of Israel. By that date, more than ' + t.killed.toLocaleString() + ' Palestinians had been killed, including over ' + t.children.toLocaleString() + ' children. The International Court of Justice had already found a plausible risk of genocide and ordered provisional measures.';
    if (funding && funding > 100000) q += ' You have also received ' + formatCurrency(funding) + ' from the foreign lobby for the government of Israel.';
    q += ' How do you explain that vote to your constituents?';
    questions.push({ text: q, context: 'H.R. 8034 — $26.38B Israel weapons package', severity: 'high', dataPoints: [t.killed.toLocaleString() + ' killed', t.children.toLocaleString() + ' children', 'ICJ genocide warning issued', funding ? formatCurrency(funding) + ' in lobby funding' : null].filter(Boolean) });
  }

  if (switchedVote) {
    const t1 = GAZA_TIMELINE.hr6126, t2 = GAZA_TIMELINE.hr8034;
    let q = 'In November 2023, when ' + t1.killed.toLocaleString() + ' Palestinians had been killed, you voted No on sending weapons to the government of Israel. By April 2024, more than ' + t2.killed.toLocaleString() + ' had been killed — including over ' + t2.children.toLocaleString() + ' children — the ICJ had found a plausible risk of genocide, and mass graves had been discovered at hospitals. What changed between those two votes that made you decide to send more weapons?';
    questions.push({ text: q, context: 'Vote switch: No on H.R. 6126 → Yes on H.R. 8034', severity: 'high', dataPoints: [t1.killed.toLocaleString() + ' killed at first vote', t2.killed.toLocaleString() + ' killed at second vote', 'ICJ genocide finding between votes', 'Mass graves discovered between votes'] });
  }

  if (votes.hr8369 === 'Yes') {
    const t = GAZA_TIMELINE.hr8369;
    let q = 'On ' + t.voteDate + ', you voted to force the delivery of 2,000-pound bombs to the government of Israel after President Biden had paused the shipment due to concerns about civilian casualties. By that date, over ' + t.killed.toLocaleString() + ' Palestinians had been killed, including ' + t.children.toLocaleString() + ' children. The ICC prosecutor was about to request arrest warrants for Israeli leaders. Why did you vote to override a pause meant to protect civilians?';
    questions.push({ text: q, context: 'H.R. 8369 — Force weapons delivery despite Biden pause', severity: 'critical', dataPoints: [t.killed.toLocaleString() + ' killed', t.children.toLocaleString() + ' children', 'Biden paused bombs over civilian concerns', 'ICC warrants requested 4 days later'] });
  }

  if (funding && funding > 50000) {
    const area = race ? race.area : 'your district';
    let q = 'You have received ' + formatCurrency(funding) + ' from the foreign lobby for the government of Israel';
    if (candidate.lobbyEndorsed) q += ' and are endorsed by them';
    q += '. Every dollar of that money comes with an expectation. When you vote on weapons packages, are you representing the people of ' + area + ', or the interests of your largest donor?';
    questions.push({ text: q, context: 'Foreign lobby funding: ' + formatCurrency(funding), severity: 'high', dataPoints: [formatCurrency(funding) + ' in lobby funding', candidate.lobbyEndorsed ? 'Endorsed by the foreign lobby' : null, candidate.lobbyTrip ? 'Accepted lobby-funded trip' : null].filter(Boolean) });
  }

  if (votes.hr6126 === 'Yes') {
    const t = GAZA_TIMELINE.hr6126;
    let q = 'On ' + t.voteDate + ', just ' + t.daysIntoConflict + ' days into the conflict, you voted to send $14.3 billion in weapons to the government of Israel. By that date, ' + t.killed.toLocaleString() + ' Palestinians had already been killed, including ' + t.children.toLocaleString() + ' children. Hospitals were being bombed and refugee camps were being struck. Looking back, with over 100,000 now dead, do you still stand by that vote?';
    questions.push({ text: q, context: 'H.R. 6126 — $14.3B emergency weapons package, 26 days into conflict', severity: 'medium', dataPoints: [t.killed.toLocaleString() + ' killed (26 days in)', t.children.toLocaleString() + ' children killed', 'Refugee camps being struck', 'Hospitals under bombardment'] });
  }

  if (candidate.notableActions && Array.isArray(candidate.notableActions) && candidate.notableActions.some(a => a.toLowerCase().includes('censure') && a.toLowerCase().includes('tlaib'))) {
    questions.push({ text: 'You voted to censure Representative Rashida Tlaib for speaking out against the killing of Palestinian civilians. Since that vote, the International Court of Justice has found a plausible risk of genocide, the ICC has issued arrest warrants for Israeli leaders, and the death toll has surpassed 100,000. Was Tlaib wrong to raise concerns?', context: 'Voted to censure the only Palestinian-American in Congress', severity: 'high', dataPoints: ['Voted to silence Palestinian-American colleague', 'ICJ later found plausible genocide', 'ICC issued arrest warrants', 'Death toll exceeded 100,000'] });
  }

  return questions;
}

// ============================================
// CHALLENGER QUESTION GENERATOR
// Generates questions for challengers based on public statements
// ============================================
function generateChallengerQuestions(challenger, race) {
  const questions = [];
  if (!challenger) return questions;

  if (challenger.quotes && challenger.quotes.length > 0) {
    challenger.quotes.forEach(q => {
      const qText = 'On your website, you state: "' + q.text + '" Since that statement, over 100,000 Palestinians have been killed, including tens of thousands of children. The International Court of Justice has found a plausible risk of genocide, and the ICC has issued arrest warrants for Israeli leaders for war crimes. Given what has happened, do you still support sending weapons that are being used to kill civilians, including children?';
      questions.push({ text: qText, context: 'Public statement supporting military aid', severity: 'high', dataPoints: ['Stated support for military aid', 'Over 100,000 killed', 'ICJ found plausible genocide', 'ICC arrest warrants issued'] });
    });
  }

  if (challenger.foreignPolicyPosition && !challenger.quotes) {
    questions.push({ text: 'You have publicly stated your support for continued military aid to the government of Israel. Over 100,000 Palestinians have been killed, including tens of thousands of children. The International Court of Justice has found a plausible risk of genocide. The ICC has issued arrest warrants for Israeli leaders. Under what circumstances, if any, would you vote to stop sending weapons?', context: 'Stated support for military aid', severity: 'high', dataPoints: ['Supports continued military aid', 'Over 100,000 killed', 'ICJ found plausible genocide', 'ICC arrest warrants issued'] });
  }

  if (challenger.lobbyFunding && challenger.lobbyFunding > 50000) {
    const area = race ? race.area : 'your district';
    questions.push({ text: 'You have received ' + formatCurrency(challenger.lobbyFunding) + ' from the foreign lobby for the government of Israel. Will you represent the people of ' + area + ', or the interests of your donors?', context: 'Foreign lobby funding: ' + formatCurrency(challenger.lobbyFunding), severity: 'high', dataPoints: [formatCurrency(challenger.lobbyFunding) + ' in lobby funding'] });
  }

  return questions;
}

// ============================================
// BOTH-BAD ASSESSMENT
// Determines if both candidates in a race are problematic
// Returns guidance text or null
// ============================================
function assessBothCandidates(incumbent, challenger, stateAbbr) {
  if (!incumbent || !challenger) return null;

  const incVotes = incumbent.keyVotes || {};
  const incYesCount = Object.values(incVotes).filter(v => v === 'Yes').length;
  const incFunding = incumbent.lobbyFunding || 0;
  const incBad = incYesCount > 0 || incFunding > 50000;

  const chalBad = (challenger.foreignPolicyPosition && challenger.foreignPolicyPosition.toLowerCase().includes('support')) ||
                  (challenger.quotes && challenger.quotes.length > 0) ||
                  (challenger.lobbyFunding && challenger.lobbyFunding > 50000);

  if (incBad && chalBad) {
    const writeIn = (typeof canWriteIn === 'function') ? canWriteIn(stateAbbr) : true;
    let guidance = 'Both candidates in this race have indicated support for sending weapons to the government of Israel while it faces charges of genocide at the International Court of Justice. ';
    guidance += 'That does not mean your voice doesn\'t matter — it means it matters more. Show up to their town halls and rallies. Ask the questions above, in public, on camera. Make them answer for their positions. See if either has reconsidered.';
    if (writeIn) {
      guidance += ' If neither candidate represents your values, you can write in a candidate — the founder of your faith, a historical figure you consider a moral example, or anyone who represents the kind of leadership you believe in. A write-in is not a wasted vote. It is a statement that you showed up, and neither option was acceptable.';
    } else {
      guidance += ' This state does not allow write-in candidates for federal races. But you can still make your voice heard — show up, ask questions publicly, and make it clear that support for sending weapons used to kill civilians has a political cost.';
    }
    return guidance;
  }
  return null;
}
