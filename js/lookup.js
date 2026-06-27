/* ============================================
   BUT WHAT CAN YOU DO? — District Lookup Engine
   Zip-to-district mapping + demographic messaging
   ============================================ */

// Zip code to congressional district mapping
// Source: US Census Bureau ZCTA-to-CD relationship files
// Note: Some zip codes span multiple districts. In those cases,
// we map to the most likely district based on population weight.
// For precise results, users should use their full address.

// This is a subset covering the priority/toss-up districts.
// Full mapping will be expanded before launch.

const ZIP_TO_DISTRICT = {
  // === ARIZONA ===
  // AZ-06 (Ciscomani - Tucson suburbs)
  '85701': 'AZ-06', '85702': 'AZ-06', '85704': 'AZ-06', '85705': 'AZ-06',
  '85706': 'AZ-06', '85708': 'AZ-06', '85710': 'AZ-06', '85711': 'AZ-06',
  '85712': 'AZ-06', '85713': 'AZ-06', '85714': 'AZ-06', '85715': 'AZ-06',
  '85716': 'AZ-06', '85718': 'AZ-06', '85719': 'AZ-06', '85730': 'AZ-06',
  '85741': 'AZ-06', '85742': 'AZ-06', '85743': 'AZ-06', '85745': 'AZ-06',
  '85746': 'AZ-06', '85747': 'AZ-06', '85748': 'AZ-06', '85749': 'AZ-06',
  '85750': 'AZ-06', '85641': 'AZ-06', '85614': 'AZ-06',
  // AZ-01 (Schweikert area - Scottsdale/Phoenix suburbs)
  '85250': 'AZ-01', '85251': 'AZ-01', '85252': 'AZ-01', '85253': 'AZ-01',
  '85254': 'AZ-01', '85255': 'AZ-01', '85256': 'AZ-01', '85257': 'AZ-01',
  '85258': 'AZ-01', '85259': 'AZ-01', '85260': 'AZ-01', '85261': 'AZ-01',
  '85262': 'AZ-01', '85266': 'AZ-01', '85268': 'AZ-01',

  // === CALIFORNIA ===
  // CA-13 (Adam Gray - Central Valley)
  '95301': 'CA-13', '95307': 'CA-13', '95313': 'CA-13', '95315': 'CA-13',
  '95316': 'CA-13', '95319': 'CA-13', '95322': 'CA-13', '95323': 'CA-13',
  '95326': 'CA-13', '95328': 'CA-13', '95334': 'CA-13', '95336': 'CA-13',
  '95337': 'CA-13', '95340': 'CA-13', '95341': 'CA-13', '95348': 'CA-13',
  '95350': 'CA-13', '95351': 'CA-13', '95354': 'CA-13', '95355': 'CA-13',
  '95356': 'CA-13', '95358': 'CA-13', '95360': 'CA-13', '95363': 'CA-13',
  '95367': 'CA-13', '95368': 'CA-13', '95380': 'CA-13', '95382': 'CA-13',
  // CA-45 (Derek Tran - Orange County)
  '92604': 'CA-45', '92606': 'CA-45', '92612': 'CA-45', '92614': 'CA-45',
  '92618': 'CA-45', '92620': 'CA-45', '92626': 'CA-45', '92627': 'CA-45',
  '92646': 'CA-45', '92647': 'CA-45', '92648': 'CA-45', '92649': 'CA-45',
  '92651': 'CA-45', '92653': 'CA-45', '92656': 'CA-45', '92657': 'CA-45',
  '92660': 'CA-45', '92661': 'CA-45', '92663': 'CA-45',

  // === COLORADO ===
  // CO-08 (Gabe Evans - North Denver suburbs)
  '80601': 'CO-08', '80602': 'CO-08', '80603': 'CO-08', '80614': 'CO-08',
  '80621': 'CO-08', '80640': 'CO-08', '80642': 'CO-08', '80643': 'CO-08',
  '80644': 'CO-08', '80651': 'CO-08', '80654': 'CO-08',
  '80022': 'CO-08', '80023': 'CO-08', '80024': 'CO-08',
  '80514': 'CO-08', '80516': 'CO-08', '80520': 'CO-08',

  // === IOWA ===
  // IA-01 (Miller-Meeks - Southeast Iowa)
  '52240': 'IA-01', '52241': 'IA-01', '52242': 'IA-01', '52245': 'IA-01',
  '52246': 'IA-01', '52317': 'IA-01', '52302': 'IA-01', '52314': 'IA-01',
  '52333': 'IA-01', '52338': 'IA-01', '52353': 'IA-01',
  '52601': 'IA-01', '52627': 'IA-01', '52632': 'IA-01',
  '52722': 'IA-01', '52732': 'IA-01', '52753': 'IA-01', '52761': 'IA-01',

  // === MAINE ===
  // ME-02 (Jared Golden - Rural Maine)
  '04210': 'ME-02', '04240': 'ME-02', '04250': 'ME-02', '04330': 'ME-02',
  '04401': 'ME-02', '04402': 'ME-02', '04468': 'ME-02', '04469': 'ME-02',
  '04473': 'ME-02', '04605': 'ME-02', '04609': 'ME-02', '04730': 'ME-02',
  '04769': 'ME-02', '04901': 'ME-02', '04953': 'ME-02',

  // === MICHIGAN ===
  // MI-07 (Tom Barrett - Lansing area)
  '48823': 'MI-07', '48824': 'MI-07', '48825': 'MI-07', '48842': 'MI-07',
  '48854': 'MI-07', '48864': 'MI-07', '48906': 'MI-07', '48910': 'MI-07',
  '48911': 'MI-07', '48912': 'MI-07', '48915': 'MI-07', '48917': 'MI-07',
  '48933': 'MI-07', '49224': 'MI-07', '49245': 'MI-07',

  // === NEBRASKA ===
  // NE-02 (Don Bacon - Omaha)
  '68102': 'NE-02', '68104': 'NE-02', '68105': 'NE-02', '68106': 'NE-02',
  '68107': 'NE-02', '68108': 'NE-02', '68110': 'NE-02', '68111': 'NE-02',
  '68112': 'NE-02', '68114': 'NE-02', '68116': 'NE-02', '68117': 'NE-02',
  '68118': 'NE-02', '68122': 'NE-02', '68124': 'NE-02', '68127': 'NE-02',
  '68130': 'NE-02', '68131': 'NE-02', '68132': 'NE-02', '68134': 'NE-02',
  '68135': 'NE-02', '68137': 'NE-02', '68138': 'NE-02', '68142': 'NE-02',
  '68144': 'NE-02', '68147': 'NE-02', '68152': 'NE-02', '68154': 'NE-02',
  '68157': 'NE-02', '68164': 'NE-02',

  // === NEW MEXICO ===
  // NM-02 (Gabe Vasquez - Southern NM)
  '88001': 'NM-02', '88003': 'NM-02', '88005': 'NM-02', '88007': 'NM-02',
  '88011': 'NM-02', '88012': 'NM-02', '88201': 'NM-02', '88203': 'NM-02',
  '88210': 'NM-02', '88220': 'NM-02', '88240': 'NM-02', '88310': 'NM-02',
  '87901': 'NM-02',

  // === NEW YORK ===
  // NY-04 (Laura Gillen - Long Island/Nassau)
  '11510': 'NY-04', '11514': 'NY-04', '11516': 'NY-04', '11520': 'NY-04',
  '11530': 'NY-04', '11542': 'NY-04', '11545': 'NY-04', '11547': 'NY-04',
  '11549': 'NY-04', '11550': 'NY-04', '11552': 'NY-04', '11553': 'NY-04',
  '11554': 'NY-04', '11557': 'NY-04', '11558': 'NY-04', '11559': 'NY-04',
  '11561': 'NY-04', '11563': 'NY-04', '11565': 'NY-04', '11566': 'NY-04',
  '11570': 'NY-04', '11572': 'NY-04', '11575': 'NY-04', '11580': 'NY-04',
  '11581': 'NY-04', '11590': 'NY-04', '11596': 'NY-04',

  // === NORTH CAROLINA ===
  // NC-01 (Don Davis)
  '27530': 'NC-01', '27534': 'NC-01', '27804': 'NC-01', '27801': 'NC-01',
  '27858': 'NC-01', '27889': 'NC-01', '27893': 'NC-01', '27896': 'NC-01',
  '27834': 'NC-01', '27837': 'NC-01', '27864': 'NC-01',

  // === OHIO ===
  // OH-09 (Marcy Kaptur - Toledo)
  '43601': 'OH-09', '43604': 'OH-09', '43605': 'OH-09', '43606': 'OH-09',
  '43607': 'OH-09', '43608': 'OH-09', '43609': 'OH-09', '43610': 'OH-09',
  '43611': 'OH-09', '43612': 'OH-09', '43613': 'OH-09', '43614': 'OH-09',
  '43615': 'OH-09', '43616': 'OH-09', '43617': 'OH-09', '43620': 'OH-09',
  '43623': 'OH-09', '43528': 'OH-09',
  // OH-13 (Emilia Sykes - Akron)
  '44301': 'OH-13', '44302': 'OH-13', '44303': 'OH-13', '44304': 'OH-13',
  '44305': 'OH-13', '44306': 'OH-13', '44307': 'OH-13', '44308': 'OH-13',
  '44310': 'OH-13', '44311': 'OH-13', '44312': 'OH-13', '44313': 'OH-13',
  '44314': 'OH-13', '44319': 'OH-13', '44320': 'OH-13', '44321': 'OH-13',
  '44333': 'OH-13',

  // === PENNSYLVANIA ===
  // PA-07 (Ryan Mackenzie - Lehigh Valley)
  '18001': 'PA-07', '18002': 'PA-07', '18011': 'PA-07', '18015': 'PA-07',
  '18017': 'PA-07', '18018': 'PA-07', '18020': 'PA-07', '18031': 'PA-07',
  '18032': 'PA-07', '18034': 'PA-07', '18035': 'PA-07', '18036': 'PA-07',
  '18040': 'PA-07', '18042': 'PA-07', '18045': 'PA-07', '18049': 'PA-07',
  '18052': 'PA-07', '18062': 'PA-07', '18064': 'PA-07', '18067': 'PA-07',
  '18069': 'PA-07', '18078': 'PA-07', '18080': 'PA-07', '18101': 'PA-07',
  '18102': 'PA-07', '18103': 'PA-07', '18104': 'PA-07', '18106': 'PA-07',
  // PA-10 (Scott Perry - Harrisburg/York)
  '17101': 'PA-10', '17102': 'PA-10', '17103': 'PA-10', '17104': 'PA-10',
  '17109': 'PA-10', '17110': 'PA-10', '17111': 'PA-10', '17112': 'PA-10',
  '17113': 'PA-10', '17201': 'PA-10', '17325': 'PA-10',
  '17401': 'PA-10', '17402': 'PA-10', '17403': 'PA-10', '17404': 'PA-10',
  '17406': 'PA-10', '17407': 'PA-10',

  // === TEXAS ===
  // TX-34 (Vicente Gonzalez - South Texas)
  '78501': 'TX-34', '78502': 'TX-34', '78503': 'TX-34', '78504': 'TX-34',
  '78516': 'TX-34', '78520': 'TX-34', '78521': 'TX-34', '78526': 'TX-34',
  '78539': 'TX-34', '78541': 'TX-34', '78542': 'TX-34', '78550': 'TX-34',
  '78552': 'TX-34', '78557': 'TX-34', '78560': 'TX-34', '78570': 'TX-34',
  '78572': 'TX-34', '78573': 'TX-34', '78574': 'TX-34', '78577': 'TX-34',
  '78578': 'TX-34', '78579': 'TX-34', '78580': 'TX-34',

  // === WASHINGTON ===
  // WA-03 (Marie Gluesenkamp Perez - SW Washington)
  '98601': 'WA-03', '98604': 'WA-03', '98606': 'WA-03', '98607': 'WA-03',
  '98632': 'WA-03', '98642': 'WA-03', '98660': 'WA-03', '98661': 'WA-03',
  '98662': 'WA-03', '98663': 'WA-03', '98664': 'WA-03', '98665': 'WA-03',
  '98666': 'WA-03', '98668': 'WA-03', '98671': 'WA-03', '98674': 'WA-03',
  '98682': 'WA-03', '98683': 'WA-03', '98684': 'WA-03', '98685': 'WA-03',
  '98686': 'WA-03', '98687': 'WA-03'
};

// Demographic-based messaging templates
// Each template type corresponds to district demographics
const MESSAGING_TEMPLATES = {
  'christian': {
    headline: 'They bombed the churches too.',
    subtext: 'The government of Israel has destroyed Christian holy sites across the region — churches in Gaza and Lebanon where communities have worshipped for centuries. Your representative voted to keep sending them weapons.',
    talkingPoints: [
      'Christian communities in Gaza and Lebanon have been bombed with American weapons.',
      'The Holy Family Catholic Parish in Gaza — one of the oldest churches in the world — was damaged by military strikes.',
      'As people of faith, we are called to protect the vulnerable, not arm those who attack them.',
      'Your representative took foreign lobby money and voted yes. You can vote no in November.'
    ],
    tone: 'faith-based-accountability'
  },
  'veteran': {
    headline: 'Our weapons. Their civilians.',
    subtext: 'As veterans, we swore an oath to defend — not to arm governments using our weapons against hospitals and schools. Your tax dollars are funding this.',
    talkingPoints: [
      'American-made bombs, paid for with your tax dollars, have been dropped on hospitals and schools.',
      'Veterans know what it means to follow rules of engagement. What\'s happening violates every standard we were taught.',
      'Your representative voted to send more weapons with no conditions on how they\'re used.',
      'This isn\'t about politics. It\'s about what\'s right. And your vote in November can change it.'
    ],
    tone: 'duty-honor'
  },
  'suburban-parent': {
    headline: 'What will you tell your kids?',
    subtext: 'Thousands of children have been killed with weapons your representative voted to send. When your children ask what you did — what will you say?',
    talkingPoints: [
      'Over 10,000 children have been killed in Gaza since October 2023, according to the UN.',
      'American-made weapons, funded by your tax dollars, were used in these attacks.',
      'Your representative accepted money from the foreign lobby for the government of Israel and voted to keep sending weapons.',
      'You can\'t control what happens overseas. But you can control your vote in November.'
    ],
    tone: 'moral-personal'
  },
  'fiscal-conservative': {
    headline: '$26 billion of your money.',
    subtext: 'Your representative voted to send $26 billion of your tax dollars to a foreign government — while American infrastructure, schools, and veterans\' services go underfunded.',
    talkingPoints: [
      'Congress approved $26.4 billion in aid to the government of Israel in April 2024 alone.',
      'That\'s on top of the $3.8 billion sent every year as baseline aid.',
      'Meanwhile, American bridges are crumbling, schools are underfunded, and veterans wait months for care.',
      'Your representative chose a foreign lobby over your community. Vote accordingly.'
    ],
    tone: 'fiscal-accountability'
  },
  'college': {
    headline: 'History is watching. So are you.',
    subtext: 'Every generation faces a moral test. This is yours. Your representative chose foreign lobby money over human lives. November is your chance to hold them accountable.',
    talkingPoints: [
      'Your representative took money from the foreign lobby for the government of Israel and voted to arm a government committing mass atrocities.',
      'This isn\'t ancient history — it\'s happening now, with weapons your taxes paid for.',
      'Previous generations asked "how did people let it happen?" Now you know.',
      'You can vote in November. It takes 10 minutes. And it matters more than you think.'
    ],
    tone: 'generational-accountability'
  },
  'libertarian': {
    headline: 'Why are we funding foreign wars?',
    subtext: 'The government takes your money and sends it to arm a foreign country — no strings attached, no accountability, no oversight. And your representative voted for it.',
    talkingPoints: [
      '$26 billion of taxpayer money sent to a foreign government without conditions.',
      'No oversight on how the weapons are used. No accountability when civilians die.',
      'Your representative didn\'t ask you. They just voted yes and took the foreign lobby money.',
      'This isn\'t a partisan issue — it\'s a government accountability issue. Vote in November.'
    ],
    tone: 'government-overreach'
  },
  'default': {
    headline: 'Your representative voted yes.',
    subtext: 'They accepted money from the foreign lobby for the government of Israel and voted to send your tax dollars to a government responsible for tens of thousands of civilian deaths. Now it\'s your turn to vote.',
    talkingPoints: [
      'Your representative in Congress accepted money from lobbying groups tied to the government of Israel.',
      'They then voted to send billions in weapons — your tax dollars — with no conditions on civilian harm.',
      'The lobbying money is public record. The votes are public record. The death toll is on the news.',
      'November 2026 is your chance to replace them with someone who represents you, not a foreign lobby.'
    ],
    tone: 'general-accountability'
  }
};

// Map district demographic types to messaging templates
function getMessagingForDistrict(candidate) {
  if (!candidate || !candidate.demographics) return MESSAGING_TEMPLATES['default'];

  const type = candidate.demographics.type;
  const religion = candidate.demographics.religionDominant || '';

  if (religion.toLowerCase().includes('christian') || religion.toLowerCase().includes('catholic') || religion.toLowerCase().includes('baptist')) {
    return MESSAGING_TEMPLATES['christian'];
  }
  if (type.includes('veteran') || type.includes('military')) {
    return MESSAGING_TEMPLATES['veteran'];
  }
  if (type.includes('suburban') && !type.includes('rural')) {
    return MESSAGING_TEMPLATES['suburban-parent'];
  }
  if (type.includes('rural') || type.includes('libertarian')) {
    return MESSAGING_TEMPLATES['libertarian'];
  }
  if (type.includes('college') || type.includes('university')) {
    return MESSAGING_TEMPLATES['college'];
  }
  if (type.includes('working-class') || type.includes('urban')) {
    return MESSAGING_TEMPLATES['fiscal-conservative'];
  }

  return MESSAGING_TEMPLATES['default'];
}

// State voter registration deadlines and election dates (2026)
// Source: NCSL, individual Secretary of State offices
// Note: Dates are approximate and should be verified before Election Day
const STATE_DEADLINES = {
  'AZ': { regDeadline: '2026-10-05', earlyVoteStart: '2026-10-07', electionDay: '2026-11-03', sameDay: false, online: true },
  'CA': { regDeadline: '2026-10-19', earlyVoteStart: '2026-10-05', electionDay: '2026-11-03', sameDay: true, online: true },
  'CO': { regDeadline: '2026-10-26', earlyVoteStart: '2026-10-09', electionDay: '2026-11-03', sameDay: true, online: true },
  'IA': { regDeadline: '2026-10-24', earlyVoteStart: '2026-10-05', electionDay: '2026-11-03', sameDay: true, online: true },
  'ME': { regDeadline: '2026-10-19', earlyVoteStart: null, electionDay: '2026-11-03', sameDay: true, online: false },
  'MI': { regDeadline: '2026-10-19', earlyVoteStart: '2026-10-24', electionDay: '2026-11-03', sameDay: true, online: true },
  'NE': { regDeadline: '2026-10-16', earlyVoteStart: '2026-10-05', electionDay: '2026-11-03', sameDay: false, online: true },
  'NM': { regDeadline: '2026-10-06', earlyVoteStart: '2026-10-17', electionDay: '2026-11-03', sameDay: true, online: true },
  'NY': { regDeadline: '2026-10-09', earlyVoteStart: '2026-10-24', electionDay: '2026-11-03', sameDay: false, online: true },
  'NC': { regDeadline: '2026-10-09', earlyVoteStart: '2026-10-15', electionDay: '2026-11-03', sameDay: false, online: false },
  'OH': { regDeadline: '2026-10-05', earlyVoteStart: '2026-10-06', electionDay: '2026-11-03', sameDay: false, online: true },
  'PA': { regDeadline: '2026-10-05', earlyVoteStart: null, electionDay: '2026-11-03', sameDay: false, online: true },
  'TX': { regDeadline: '2026-10-05', earlyVoteStart: '2026-10-19', electionDay: '2026-11-03', sameDay: false, online: false },
  'WA': { regDeadline: '2026-10-26', earlyVoteStart: '2026-10-15', electionDay: '2026-11-03', sameDay: true, online: true }
};

// Get urgency and deadline info for a state
function getStateDeadlineInfo(stateCode) {
  const deadlines = STATE_DEADLINES[stateCode];
  if (!deadlines) return null;

  const now = new Date();
  const regDate = new Date(deadlines.regDeadline + 'T23:59:59');
  const electionDate = new Date(deadlines.electionDay + 'T23:59:59');
  const daysUntilReg = Math.ceil((regDate - now) / (1000 * 60 * 60 * 24));
  const daysUntilElection = Math.ceil((electionDate - now) / (1000 * 60 * 60 * 24));

  let urgency = 'normal';
  if (daysUntilReg <= 0) urgency = 'passed';
  else if (daysUntilReg <= 14) urgency = 'urgent';
  else if (daysUntilReg <= 30) urgency = 'soon';

  const earlyVoteDate = deadlines.earlyVoteStart ? new Date(deadlines.earlyVoteStart + 'T00:00:00') : null;
  const daysUntilEarly = earlyVoteDate ? Math.ceil((earlyVoteDate - now) / (1000 * 60 * 60 * 24)) : null;

  return {
    ...deadlines,
    daysUntilReg,
    daysUntilElection,
    daysUntilEarly,
    urgency,
    regDeadlineFormatted: new Date(deadlines.regDeadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    earlyVoteFormatted: earlyVoteDate ? earlyVoteDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null,
    electionDayFormatted: new Date(deadlines.electionDay).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  };
}

function normalizeStateCode(state) {
  const rawState = String(state || '').trim();
  if (!rawState) return null;

  const upperState = rawState.toUpperCase();
  const states = typeof US_STATES !== 'undefined' && Array.isArray(US_STATES)
    ? US_STATES
    : [];
  const knownState = states.find(s =>
    s.abbr === upperState || s.name.toUpperCase() === upperState
  );
  if (knownState) return knownState.abbr;

  return Object.values(STATE_FIPS_TO_ABBR).includes(upperState) ? upperState : null;
}

// Normalize district input into labels like "OH-01" or "AK-AL"
function normalizeDistrictLabel(state, districtNumber) {
  if (!state || districtNumber === null || districtNumber === undefined || districtNumber === '') return null;

  const stateCode = normalizeStateCode(state);
  const rawDistrict = String(districtNumber).trim().toUpperCase();
  if (!stateCode) return null;
  if (rawDistrict === 'AL' || rawDistrict === 'AT LARGE') return stateCode + '-AL';

  const numericDistrict = parseInt(rawDistrict.replace(/[^0-9]/g, ''), 10);
  if (Number.isNaN(numericDistrict) || numericDistrict < 0) return null;
  if (numericDistrict === 0 || (stateCode === 'DC' && numericDistrict === 98)) return stateCode + '-AL';

  return stateCode + '-' + String(numericDistrict).padStart(2, '0');
}

function parseDistrictLabel(districtLabel) {
  const match = String(districtLabel || '').trim().toUpperCase().match(/^([A-Z]{2})-?(AL|AT LARGE|\d{1,2})$/);
  if (!match) return null;
  const district = normalizeDistrictLabel(match[1], match[2]);
  if (!district) return null;
  const isAtLarge = district.endsWith('-AL');

  return {
    state: district.split('-')[0],
    districtNumber: isAtLarge ? 0 : parseInt(match[2], 10),
    district
  };
}

// Lookup a congressional district label and return full district info
function lookupDistrictLabel(districtLabel, options = {}) {
  const parsed = parseDistrictLabel(districtLabel);
  if (!parsed) return null;

  const candidates = CANDIDATES.filter(c =>
    c.state === parsed.state && c.district === parsed.districtNumber
  );
  const primaryCandidate = candidates[0] || null;
  const messaging = getMessagingForDistrict(primaryCandidate);
  const deadlineInfo = getStateDeadlineInfo(parsed.state);

  return {
    district: parsed.district,
    state: parsed.state,
    districtNumber: parsed.districtNumber,
    candidates,
    primaryCandidate,
    messaging,
    deadlines: deadlineInfo,
    lookupMethod: options.lookupMethod || 'district',
    isEstimate: !!options.isEstimate,
    precisionNote: options.precisionNote || null,
    sourceLabel: options.sourceLabel || parsed.district
  };
}

function lookupByDistrict(state, districtNumber) {
  const district = normalizeDistrictLabel(state, districtNumber);
  if (!district) return null;
  return lookupDistrictLabel(district, {
    lookupMethod: 'district',
    isEstimate: false,
    precisionNote: 'You entered the congressional district directly.'
  });
}

// Lookup a zip code and return full district info
function lookupDistrict(zip) {
  const cleanZip = String(zip || '').trim();
  const district = ZIP_TO_DISTRICT[cleanZip];
  if (!district) {
    return null; // Zip not in our hand-reviewed priority coverage yet
  }

  const result = lookupDistrictLabel(district, {
    lookupMethod: 'zip',
    isEstimate: true,
    sourceLabel: 'ZIP ' + cleanZip,
    precisionNote: 'ZIP codes can cross congressional district lines. This is our hand-reviewed estimate for a priority district. Use address for the most precise result, or enter your district directly.'
  });

  if (result) result.zip = cleanZip;
  return result;
}

let zctaDistrictDataPromise = null;

async function loadZctaDistricts() {
  if (!zctaDistrictDataPromise) {
    zctaDistrictDataPromise = fetch('/data/geo/zcta-to-district-119.json')
      .then(response => {
        if (!response.ok) throw new Error('Could not load Census ZIP-to-district data.');
        return response.json();
      });
  }
  return zctaDistrictDataPromise;
}

async function lookupZipEstimate(zip) {
  const cleanZip = String(zip || '').trim();
  if (!/^\d{5}$/.test(cleanZip)) return null;

  const reviewed = lookupDistrict(cleanZip);
  if (reviewed) {
    reviewed.lookupMethod = 'zip';
    reviewed.isEstimate = true;
    reviewed.estimateSource = 'hand-reviewed priority ZIP mapping';
    return reviewed;
  }

  const zctaData = await loadZctaDistricts();
  const entry = zctaData && zctaData.zctas ? zctaData.zctas[cleanZip] : null;
  if (!entry || !entry.district) return null;

  const result = lookupDistrictLabel(entry.district, {
    lookupMethod: 'zip',
    isEstimate: true,
    sourceLabel: 'ZIP estimate ' + cleanZip,
    precisionNote: 'ZIP estimates use the official Census 119th Congressional District-to-ZCTA relationship file. ZIPs can cross district lines, and USPS ZIPs are not identical to Census ZCTAs. Use address for the most precise result, or enter your district directly.'
  });

  if (result) {
    result.zip = cleanZip;
    result.estimateSource = 'Census CD119-to-ZCTA relationship file';
    result.zipAlternatives = entry.alternatives || [];
    result.zipSpansMultipleDistricts = !!entry.spansMultipleDistricts;
  }
  return result;
}

function getCensusDistrictGeography(geographies) {
  if (!geographies) return null;
  const preferredLayers = [
    '119th Congressional Districts',
    '118th Congressional Districts',
    '117th Congressional Districts',
    '116th Congressional Districts',
    'Congressional Districts'
  ];

  for (const layer of preferredLayers) {
    if (Array.isArray(geographies[layer]) && geographies[layer].length > 0) {
      return geographies[layer][0];
    }
  }

  const fallbackLayer = Object.keys(geographies).find(key => key.toLowerCase().includes('congressional district'));
  return fallbackLayer && geographies[fallbackLayer] && geographies[fallbackLayer][0]
    ? geographies[fallbackLayer][0]
    : null;
}

function districtLabelFromCensusGeo(geo) {
  if (!geo) return null;

  const geoid = geo.GEOID || geo.GEOIDFQ || '';
  const stateFips = geo.STATE || geoid.slice(0, 2);
  const state = STATE_FIPS_TO_ABBR[stateFips];
  if (!state) return null;

  let district = geo.CD119 || geo.CD118 || geo.CD117 || geo.CD116 || geo.CD || geo.DISTRICT;
  if (!district && geoid.length >= 4) district = geoid.slice(-2);
  if (!district && geo.BASENAME) {
    const match = String(geo.BASENAME).match(/\d+/);
    if (match) district = match[0];
  }
  if (!district && geo.NAMELSAD) {
    const match = String(geo.NAMELSAD).match(/(\d+|at large)/i);
    if (match) district = match[1].toLowerCase() === 'at large' ? '0' : match[1];
  }

  if (district === null || district === undefined || district === '') return null;
  return normalizeDistrictLabel(state, district);
}

async function lookupAddress(address) {
  const cleanAddress = String(address || '').trim();
  if (!cleanAddress) return null;

  const params = new URLSearchParams({ address: cleanAddress });
  try {
    const response = await fetch('/.netlify/functions/district-lookup?' + params.toString());
    if (response.ok) {
      const data = await response.json();
      if (!data || !data.district) return null;

      const result = lookupDistrictLabel(data.district, {
        lookupMethod: 'address',
        isEstimate: false,
        sourceLabel: 'Address lookup',
        precisionNote: 'Most precise result. We do not save your address or anything you enter here.'
      });

      if (result) result.matchedAddress = data.matchedAddress || null;
      return result;
    }
  } catch (error) {
    // Fall through to ZIP fallback below for static local previews.
  }

  // Use the LAST 5-digit match — house numbers can be 5 digits too,
  // and the ZIP code is always at the end of a US address.
  const zipMatches = cleanAddress.match(/\b\d{5}(?:-\d{4})?\b/g);
  const zipMatch = zipMatches ? zipMatches[zipMatches.length - 1] : null;
  if (zipMatch) {
    const fallback = await lookupZipEstimate(zipMatch.slice(0, 5));
    if (fallback) {
      fallback.lookupMethod = 'address';
      fallback.isEstimate = true;
      fallback.sourceLabel = 'Address ZIP estimate';
      fallback.precisionNote = 'Precise address lookup requires the same-origin Census lookup function. This result uses the ZIP in the address as an estimate; ZIPs can cross district lines.';
      fallback.addressFallback = true;
      return fallback;
    }
  }

  throw new Error('The precise address lookup service is not available from this static preview.');
}


  
