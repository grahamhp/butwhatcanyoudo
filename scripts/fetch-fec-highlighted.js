#!/usr/bin/env node
/**
 * Manual source snapshot tool.
 *
 * Fetches 2026 federal candidate records from the official FEC API for the
 * campaign's highlighted states. This is intentionally not scheduled: run it
 * manually, review the output, then commit the snapshot.
 *
 * Optional:
 *   FEC_API_KEY=...        Use a real FEC key instead of DEMO_KEY.
 *   FEC_STATES=AZ,OH,PA   Fetch only selected states.
 *   FEC_FRESH=1           Ignore any existing checkpoint file.
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const API_KEY = process.env.FEC_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.open.fec.gov/v1/candidates/search/';
const OUT_DIR = path.join(__dirname, '..', 'data', 'fec');
const OUT_FILE = path.join(OUT_DIR, 'highlighted-federal-candidates-2026.json');

const ALL_HIGHLIGHTED_STATES = [
  'AZ', 'CA', 'CO', 'IA', 'ME', 'MI', 'MO', 'NC',
  'NE', 'NM', 'NY', 'OH', 'PA', 'TX', 'UT', 'WA'
];

const HIGHLIGHTED_STATES = process.env.FEC_STATES
  ? process.env.FEC_STATES.split(',').map(s => s.trim().toUpperCase()).filter(Boolean)
  : ALL_HIGHLIGHTED_STATES;

const OFFICES = [
  { code: 'H', label: 'House' },
  { code: 'S', label: 'Senate' }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function requestJson(url, attempt = 1) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'butwhatcanyoudo-fec-snapshot/1.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return requestJson(res.headers.location, attempt).then(resolve).catch(reject);
      }
      if (res.statusCode === 429 && attempt <= 8) {
        const retryAfter = Number(res.headers['retry-after'] || 0);
        const waitMs = retryAfter > 0 ? retryAfter * 1000 : Math.min(90000, 8000 * attempt);
        res.resume();
        console.log(`rate limited; waiting ${Math.round(waitMs / 1000)}s`);
        return sleep(waitMs).then(() => requestJson(url, attempt + 1)).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`FEC API returned HTTP ${res.statusCode} for ${url}`));
      }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(new Error(`Could not parse FEC JSON for ${url}: ${error.message}`));
        }
      });
    }).on('error', reject);
  });
}

function buildUrl(state, office, page) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    election_year: '2026',
    state,
    office,
    per_page: '100',
    page: String(page),
    sort: 'name'
  });
  return `${BASE_URL}?${params.toString()}`;
}

function scrubUrl(url) {
  return url.replace(API_KEY, API_KEY === 'DEMO_KEY' ? 'DEMO_KEY' : 'FEC_API_KEY');
}

function loadOrCreateSnapshot() {
  if (!process.env.FEC_FRESH && fs.existsSync(OUT_FILE)) {
    return JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
  }

  return {
    fetchedAt: new Date().toISOString(),
    year: 2026,
    source: 'Federal Election Commission API: /v1/candidates/search/',
    sourceUrl: BASE_URL,
    updatePolicy: 'Manual run only. Review before commit. This is a source snapshot, not a final endorsement or stance assessment.',
    highlightedStates: ALL_HIGHLIGHTED_STATES,
    fetchedStates: [],
    offices: OFFICES.map(o => o.label),
    states: {}
  };
}

function saveSnapshot(snapshot) {
  snapshot.lastCheckpointAt = new Date().toISOString();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(snapshot, null, 2) + '\n');
}

async function fetchStateOffice(state, office) {
  const pages = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = buildUrl(state, office, page);
    await sleep(1600);
    const json = await requestJson(url);
    pages.push({ url: scrubUrl(url), pagination: json.pagination, results: json.results });
    totalPages = json.pagination && json.pagination.pages ? json.pagination.pages : 1;
    page += 1;
  }

  return pages;
}

async function main() {
  const snapshot = loadOrCreateSnapshot();

  for (const state of HIGHLIGHTED_STATES) {
    snapshot.states[state] ||= {};
    for (const office of OFFICES) {
      process.stdout.write(`Fetching ${state} ${office.label} candidates... `);
      const pages = await fetchStateOffice(state, office.code);
      const candidates = pages.flatMap(p => p.results || []);
      snapshot.states[state][office.code] = {
        office: office.label,
        count: candidates.length,
        pages,
        candidates
      };
      if (!snapshot.fetchedStates.includes(state)) snapshot.fetchedStates.push(state);
      saveSnapshot(snapshot);
      console.log(`${candidates.length}`);
    }
  }

  console.log(`\nSaved ${OUT_FILE}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});