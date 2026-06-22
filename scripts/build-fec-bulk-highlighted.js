#!/usr/bin/env node
/**
 * Official FEC bulk-data snapshot for highlighted federal races.
 *
 * This does not require an API key. It downloads the FEC 2026 candidate master
 * and candidate financial summary bulk files, filters them to highlighted
 * states, and writes both a JSON source snapshot and a small browser module.
 *
 * Manual update only: run, review, commit.
 */

const fs = require('fs');
const https = require('https');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'data', 'fec');
const RAW_DIR = path.join(OUT_DIR, 'raw');
const JSON_OUT = path.join(OUT_DIR, 'highlighted-federal-candidates-2026-bulk.json');
const JS_OUT = path.join(ROOT, 'js', 'fec-candidate-snapshot.js');

const SOURCES = {
  candidateMaster: {
    label: 'FEC 2026 candidate master bulk file',
    url: 'https://www.fec.gov/files/bulk-downloads/2026/cn26.zip',
    local: path.join(RAW_DIR, 'cn26.zip')
  },
  candidateSummary: {
    label: 'FEC 2026 all candidates financial summary bulk file',
    url: 'https://www.fec.gov/files/bulk-downloads/2026/weball26.zip',
    local: path.join(RAW_DIR, 'weball26.zip')
  }
};

const HIGHLIGHTED_STATES = [
  'AZ', 'CA', 'CO', 'IA', 'ME', 'MI', 'MO', 'NC',
  'NE', 'NM', 'NY', 'OH', 'PA', 'TX', 'UT', 'WA'
];

const OFFICE_LABELS = { H: 'House', S: 'Senate', P: 'President' };
const PARTY_LABELS = { DEM: 'Democrat', REP: 'Republican', IND: 'Independent', LIB: 'Libertarian', GRE: 'Green' };
const STATUS_LABELS = { C: 'Statutory candidate', F: 'Statutory candidate for future election', N: 'Not yet statutory candidate', P: 'Statutory candidate in prior cycle' };
const INCUMBENT_STATUS_LABELS = { I: 'Incumbent', C: 'Challenger', O: 'Open seat' };

const CN_FIELDS = [
  'candidateId', 'name', 'party', 'electionYear', 'officeState', 'office',
  'officeDistrict', 'incumbentChallengerStatus', 'candidateStatus',
  'principalCommitteeId', 'street1', 'street2', 'city', 'state', 'zip'
];

const WEBALL_FIELDS = [
  'candidateId', 'name', 'incumbentChallengerStatus', 'party', 'partyCode',
  'totalReceipts', 'transfersFromAuthorized', 'totalDisbursements', 'transfersToAuthorized',
  'cashOnHand', 'loansAndDebtsOwedByCommittee', 'coverageEndDate', 'candidateContribution',
  'candidateLoans', 'otherLoans', 'candidateLoanRepayments', 'otherLoanRepayments',
  'debtsOwedByCommittee', 'totalIndividualContributions', 'candidateState',
  'candidateDistrict', 'electionYear', 'electionFull', 'electionGeneral', 'electionPrimary',
  'coverageStartDate', 'candidateOffice', 'candidateOfficeDistrict', 'candidateStatus',
  'principalCommitteeId', 'principalCommitteeName'
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function download(url, outPath) {
  ensureDir(path.dirname(outPath));
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outPath);
    https.get(url, { headers: { 'User-Agent': 'butwhatcanyoudo-fec-bulk-snapshot/1.0' } }, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        fs.rmSync(outPath, { force: true });
        return download(response.headers.location, outPath).then(resolve, reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.rmSync(outPath, { force: true });
        reject(new Error(`Download failed ${response.statusCode}: ${url}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', error => {
      file.close();
      fs.rmSync(outPath, { force: true });
      reject(error);
    });
  });
}

function readZipFirstText(zipPath) {
  const buffer = fs.readFileSync(zipPath);
  const eocdSig = 0x06054b50;
  let eocdOffset = -1;
  for (let i = buffer.length - 22; i >= Math.max(0, buffer.length - 66000); i--) {
    if (buffer.readUInt32LE(i) === eocdSig) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset < 0) throw new Error(`Could not find zip directory in ${zipPath}`);

  const totalEntries = buffer.readUInt16LE(eocdOffset + 10);
  let centralOffset = buffer.readUInt32LE(eocdOffset + 16);

  for (let entry = 0; entry < totalEntries; entry++) {
    if (buffer.readUInt32LE(centralOffset) !== 0x02014b50) throw new Error(`Bad central directory in ${zipPath}`);
    const method = buffer.readUInt16LE(centralOffset + 10);
    const compressedSize = buffer.readUInt32LE(centralOffset + 20);
    const nameLen = buffer.readUInt16LE(centralOffset + 28);
    const extraLen = buffer.readUInt16LE(centralOffset + 30);
    const commentLen = buffer.readUInt16LE(centralOffset + 32);
    const localOffset = buffer.readUInt32LE(centralOffset + 42);
    const name = buffer.slice(centralOffset + 46, centralOffset + 46 + nameLen).toString('utf8');

    centralOffset += 46 + nameLen + extraLen + commentLen;
    if (!/\.txt$/i.test(name)) continue;

    if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw new Error(`Bad local header for ${name}`);
    const localNameLen = buffer.readUInt16LE(localOffset + 26);
    const localExtraLen = buffer.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLen + localExtraLen;
    const compressed = buffer.slice(dataStart, dataStart + compressedSize);
    if (method === 0) return compressed.toString('utf8');
    if (method === 8) return zlib.inflateRawSync(compressed).toString('utf8');
    throw new Error(`Unsupported zip compression method ${method} in ${name}`);
  }

  throw new Error(`No text file found in ${zipPath}`);
}

function parseDelimited(text, fields) {
  return text
    .split(/\r?\n/)
    .filter(Boolean)
    .map(line => {
      const cols = line.split('|');
      const item = {};
      fields.forEach((field, index) => item[field] = (cols[index] || '').trim());
      return item;
    });
}

function toNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(String(value).replace(/,/g, ''));
  return Number.isFinite(num) ? num : null;
}

function districtLabel(row) {
  if (row.office !== 'H') return null;
  const district = String(row.officeDistrict || '').trim();
  if (!district) return null;
  const num = Number(district);
  if (!Number.isFinite(num) || num === 0) return `${row.officeState}-AL`;
  return `${row.officeState}-${String(num).padStart(2, '0')}`;
}

function normalizeCandidate(row, financeByCandidate) {
  const finance = financeByCandidate.get(row.candidateId) || null;
  const item = {
    candidateId: row.candidateId,
    name: row.name,
    party: row.party,
    partyLabel: PARTY_LABELS[row.party] || row.party || 'Unknown',
    electionYear: row.electionYear,
    office: row.office,
    officeLabel: OFFICE_LABELS[row.office] || row.office,
    state: row.officeState,
    district: row.office === 'H' ? Number(row.officeDistrict || 0) : null,
    districtLabel: districtLabel(row),
    incumbentChallengerStatus: row.incumbentChallengerStatus,
    incumbentChallengerLabel: INCUMBENT_STATUS_LABELS[row.incumbentChallengerStatus] || row.incumbentChallengerStatus || 'Unknown',
    candidateStatus: row.candidateStatus,
    candidateStatusLabel: STATUS_LABELS[row.candidateStatus] || row.candidateStatus || 'Unknown',
    principalCommitteeId: row.principalCommitteeId || null,
    principalCommitteeName: finance ? finance.principalCommitteeName || null : null,
    finance: finance ? {
      totalReceipts: toNumber(finance.totalReceipts),
      totalDisbursements: toNumber(finance.totalDisbursements),
      cashOnHand: toNumber(finance.cashOnHand),
      totalIndividualContributions: toNumber(finance.totalIndividualContributions),
      debtsOwedByCommittee: toNumber(finance.debtsOwedByCommittee),
      coverageStartDate: finance.coverageStartDate || null,
      coverageEndDate: finance.coverageEndDate || null
    } : null
  };
  return item;
}

function sortCandidates(a, b) {
  const office = String(a.office).localeCompare(String(b.office));
  if (office) return office;
  const district = (a.district || 0) - (b.district || 0);
  if (district) return district;
  const inc = String(a.incumbentChallengerStatus).localeCompare(String(b.incumbentChallengerStatus));
  if (inc) return inc;
  return String(a.name).localeCompare(String(b.name));
}

async function main() {
  ensureDir(OUT_DIR);
  ensureDir(RAW_DIR);

  for (const source of Object.values(SOURCES)) {
    process.stdout.write(`Downloading ${source.label}... `);
    await download(source.url, source.local);
    console.log(`${fs.statSync(source.local).size} bytes`);
  }

  const candidateRows = parseDelimited(readZipFirstText(SOURCES.candidateMaster.local), CN_FIELDS);
  const financeRows = parseDelimited(readZipFirstText(SOURCES.candidateSummary.local), WEBALL_FIELDS);
  const financeByCandidate = new Map(financeRows.map(row => [row.candidateId, row]));

  const highlighted = candidateRows
    .filter(row => row.electionYear === '2026')
    .filter(row => row.office === 'H' || row.office === 'S')
    .filter(row => HIGHLIGHTED_STATES.includes(row.officeState))
    .map(row => normalizeCandidate(row, financeByCandidate))
    .sort(sortCandidates);

  const states = {};
  HIGHLIGHTED_STATES.forEach(state => {
    const stateCandidates = highlighted.filter(c => c.state === state);
    const house = stateCandidates.filter(c => c.office === 'H');
    const senate = stateCandidates.filter(c => c.office === 'S');
    const houseDistricts = {};
    house.forEach(candidate => {
      const key = candidate.districtLabel || `${state}-unknown`;
      houseDistricts[key] ||= [];
      houseDistricts[key].push(candidate);
    });
    states[state] = {
      counts: {
        houseCandidates: house.length,
        houseDistricts: Object.keys(houseDistricts).length,
        senateCandidates: senate.length,
        totalFederalCandidates: stateCandidates.length
      },
      houseDistricts,
      senateCandidates: senate
    };
  });

  const snapshot = {
    generatedAt: new Date().toISOString(),
    electionYear: 2026,
    sourceType: 'Official FEC bulk downloads; filed federal candidates, not ballot-certified candidate lists.',
    updatePolicy: 'Manual update only. Run this script, review the generated data, then commit it to GitHub.',
    caveats: [
      'FEC candidate filings are not the same as final ballot access or nominee status.',
      'Governor candidates are not included in FEC federal files and require state-level candidate portals plus individual stance research.',
      'Funding totals here are broad FEC candidate financial summaries, not issue-specific AIPAC/pro-government-of-Israel contribution analysis.'
    ],
    sources: SOURCES,
    highlightedStates: HIGHLIGHTED_STATES,
    counts: {
      highlightedCandidates: highlighted.length,
      highlightedHouseCandidates: highlighted.filter(c => c.office === 'H').length,
      highlightedSenateCandidates: highlighted.filter(c => c.office === 'S').length
    },
    states
  };

  fs.writeFileSync(JSON_OUT, JSON.stringify(snapshot, null, 2) + '\n');

  const browserSnapshot = {
    generatedAt: snapshot.generatedAt,
    electionYear: snapshot.electionYear,
    sourceType: snapshot.sourceType,
    caveats: snapshot.caveats,
    sourceUrls: Object.fromEntries(Object.entries(SOURCES).map(([key, source]) => [key, source.url])),
    highlightedStates: snapshot.highlightedStates,
    counts: snapshot.counts,
    states: snapshot.states
  };
  fs.writeFileSync(
    JS_OUT,
    '/* Generated by scripts/build-fec-bulk-highlighted.js. Manual source snapshot; review before commit. */\n' +
      'const FEC_HIGHLIGHTED_CANDIDATES_2026 = ' + JSON.stringify(browserSnapshot, null, 2) + ';\n'
  );

  console.log(`Wrote ${JSON_OUT}`);
  console.log(`Wrote ${JS_OUT}`);
  console.log(`Highlighted federal candidates: ${snapshot.counts.highlightedCandidates}`);
}

main().then(() => {
  process.exit(0);
}).catch(error => {
  console.error(error);
  process.exit(1);
});