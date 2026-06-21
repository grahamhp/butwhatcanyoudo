#!/usr/bin/env node
/**
 * sync-votes.js — Downloads official roll call XML from clerk.house.gov,
 * saves it locally, and auto-updates candidates.js with verified vote data.
 *
 * Usage:
 *   node scripts/sync-votes.js           # Download XMLs + update candidates.js
 *   node scripts/sync-votes.js --verify  # Verify only (no writes, just report mismatches)
 *   node scripts/sync-votes.js --download-only  # Download XMLs without updating
 *
 * Manual update tool only: do not schedule this as a nightly job.
 * The XMLs are saved to data/rollcalls/ so the site stays fully static,
 * reviewable in GitHub, and backed by source snapshots.
 * This script is the single source of truth for House vote data.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION — Add new roll calls here
// ============================================
const ROLL_CALLS = [
  { id: 'hr6126', year: 2023, rollCall: 577, bill: 'H R 6126', label: 'Israel Security Supplemental Appropriations Act' },
  { id: 'hr8034', year: 2024, rollCall: 152, bill: 'H R 8034', label: 'Israel Security Supplemental Appropriations Act, 2024' },
  { id: 'hr8369', year: 2024, rollCall: 217, bill: 'H R 8369', label: 'Israel Security Assistance Support Act' }
];

const DATA_DIR = path.join(__dirname, '..', 'data', 'rollcalls');
const CANDIDATES_PATH = path.join(__dirname, '..', 'js', 'candidates.js');

// ============================================
// FETCH XML
// ============================================
function fetchXML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'butwhatcanyoudo-vote-sync/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchXML(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function downloadRollCalls() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  for (const rc of ROLL_CALLS) {
    const url = `https://clerk.house.gov/evs/${rc.year}/roll${rc.rollCall}.xml`;
    const filePath = path.join(DATA_DIR, `${rc.id}_roll${rc.rollCall}_${rc.year}.xml`);

    process.stdout.write(`Downloading ${rc.id} (Roll Call ${rc.rollCall}, ${rc.year})... `);
    try {
      const xml = await fetchXML(url);

      // Verify this is the right bill
      const billMatch = xml.match(/<legis-num>([^<]+)<\/legis-num>/);
      if (billMatch) {
        const fetchedBill = billMatch[1].trim();
        if (fetchedBill !== rc.bill) {
          console.log(`WARNING: Expected ${rc.bill}, got ${fetchedBill}`);
        }
      }

      fs.writeFileSync(filePath, xml);
      console.log(`OK (${(xml.length / 1024).toFixed(1)}KB)`);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
  }
}

// ============================================
// PARSE XML — Extract votes by member
// ============================================
function parseRollCallXML(xml) {
  const votes = {};
  const voteRegex = /<recorded-vote><legislator[^>]*sort-field="([^"]*)"[^>]*party="([^"]*)"[^>]*state="([^"]*)"[^>]*>[^<]*<\/legislator><vote>([^<]+)<\/vote><\/recorded-vote>/g;

  let match;
  while ((match = voteRegex.exec(xml)) !== null) {
    const [, sortField, party, state, vote] = match;
    const key = `${sortField}_${state}_${party}`;
    votes[key] = {
      name: sortField,
      party,
      state,
      vote: vote.trim() // Yea, Nay, Not Voting, Present
    };
  }

  return votes;
}

function normalizeVote(clerkVote) {
  switch (clerkVote) {
    case 'Yea': return 'Yes';
    case 'Nay': return 'No';
    case 'Not Voting': return null;
    case 'Present': return null;
    default: return null;
  }
}

// ============================================
// MATCH members to our candidates
// ============================================
function findMemberVote(votes, lastName, state, party) {
  // Try exact match first
  const key = `${lastName}_${state}_${party}`;
  if (votes[key]) return normalizeVote(votes[key].vote);

  // Try case-insensitive
  const lowerName = lastName.toLowerCase();
  for (const [k, v] of Object.entries(votes)) {
    if (v.name.toLowerCase() === lowerName && v.state === state) {
      return normalizeVote(v.vote);
    }
  }

  return undefined; // Not found at all
}

function extractLastName(fullName) {
  // "Greg Landsman" → "Landsman"
  // "Marcy Kaptur" → "Kaptur"
  // "Juan Ciscomani" → "Ciscomani"
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1];
}

// ============================================
// UPDATE candidates.js
// ============================================
function loadVoteData() {
  const allVotes = {};

  for (const rc of ROLL_CALLS) {
    const filePath = path.join(DATA_DIR, `${rc.id}_roll${rc.rollCall}_${rc.year}.xml`);
    if (!fs.existsSync(filePath)) {
      console.log(`  Skipping ${rc.id}: XML not found at ${filePath}`);
      continue;
    }
    const xml = fs.readFileSync(filePath, 'utf8');
    allVotes[rc.id] = parseRollCallXML(xml);
    console.log(`  Loaded ${rc.id}: ${Object.keys(allVotes[rc.id]).length} members`);
  }

  return allVotes;
}

// ============================================
// FIND ALL keyVotes IN SOURCE (comprehensive)
// ============================================
// Instead of fragile structural regex, find every `keyVotes: { ... }` block
// and determine the associated name/party/state from surrounding context.
function findAllKeyVotesBlocks(source) {
  const blocks = [];

  // Match any keyVotes or houseVotes object — greedy enough to get the full { ... }
  const kvRegex = /(?:keyVotes|houseVotes|predecessorVotes):\s*\{([^}]+)\}/g;
  let m;
  while ((m = kvRegex.exec(source)) !== null) {
    const kvStr = m[1];
    const kvOffset = m.index;

    // Look back up to 1000 chars for name, party, state context
    const before = source.substring(Math.max(0, kvOffset - 1500), kvOffset);

    // Try multiple patterns for name
    let name = null, party = null, state = null, location = null;

    // Pattern 1: name: '...' (STATE_RACES incumbent, otherNotableMembers, candidates array)
    const nameMatch = before.match(/name:\s*'([^']+)'\s*(?:,\s*(?:party|incumbentOrChallenger))/g);
    if (nameMatch) {
      const last = nameMatch[nameMatch.length - 1];
      const nm = last.match(/name:\s*'([^']+)'/);
      if (nm) name = nm[1];
    }

    // Pattern 2: party
    const partyMatches = before.match(/party:\s*'([RD])'/g);
    if (partyMatches) {
      const last = partyMatches[partyMatches.length - 1];
      party = last.match(/party:\s*'([RD])'/)[1];
    }

    // Pattern 3: state from various contexts
    const stateFromProp = before.match(/state:\s*'([A-Z]{2})'/g);
    const stateFromLabel = before.match(/label:\s*'([A-Z]{2})-/g);
    if (stateFromProp) {
      const last = stateFromProp[stateFromProp.length - 1];
      state = last.match(/state:\s*'([A-Z]{2})'/)[1];
    } else if (stateFromLabel) {
      const last = stateFromLabel[stateFromLabel.length - 1];
      state = last.match(/label:\s*'([A-Z]{2})-/)[1];
    }

    // Determine location type
    if (before.includes('otherNotableMembers')) location = 'otherNotableMembers';
    else if (before.includes('incumbent:')) location = 'STATE_RACES.incumbent';
    else if (before.includes('predecessorVotes')) { location = 'STATE_RACES.predecessorVotes'; }
    else if (/id:\s*'[^']*'/.test(before)) location = 'CANDIDATES';
    else location = 'unknown';

    // Check if this is predecessorVotes (different key name)
    const isPredecessor = source.substring(kvOffset - 20, kvOffset).includes('predecessorVotes');

    if (isPredecessor) {
      // predecessorVotes use a different key, skip for verification but log
      // The retiredIncumbent name is what we'd match against
      const retiredMatch = before.match(/retiredIncumbent:\s*'([^']+)'/);
      if (retiredMatch) {
        name = retiredMatch[1];
        location = 'predecessorVotes';
      }
    }

    if (name && state) {
      blocks.push({
        name,
        party: party || '?',
        state,
        keyVotesStr: kvStr,
        fullKeyVotesMatch: m[0],
        offset: kvOffset,
        location
      });
    }
  }

  return blocks;
}

function verifyAndUpdate(verifyOnly) {
  console.log('\nLoading roll call data...');
  const allVotes = loadVoteData();

  if (Object.keys(allVotes).length === 0) {
    console.log('No roll call data loaded. Run without --verify first to download XMLs.');
    return;
  }

  console.log('\nReading candidates.js...');
  let candidatesSource = fs.readFileSync(CANDIDATES_PATH, 'utf8');

  const blocks = findAllKeyVotesBlocks(candidatesSource);
  console.log(`Found ${blocks.length} keyVotes blocks to verify.\n`);

  let mismatches = 0;
  let confirmed = 0;
  let updates = [];

  for (const block of blocks) {
    const lastName = extractLastName(block.name);

    for (const rc of ROLL_CALLS) {
      if (!allVotes[rc.id]) continue;

      const officialVote = findMemberVote(allVotes[rc.id], lastName, block.state, block.party);

      if (officialVote === undefined) continue; // Not in this roll call

      // Parse current value from keyVotes string
      const currentMatch = block.keyVotesStr.match(new RegExp(rc.id + ":\\s*'([^']*)'"));
      const currentNullMatch = block.keyVotesStr.match(new RegExp(rc.id + ":\\s*null"));
      let currentValue;
      if (currentMatch) {
        currentValue = currentMatch[1];
      } else if (currentNullMatch) {
        currentValue = null;
      } else {
        currentValue = undefined; // Vote ID not present in this block
      }

      // Skip if vote ID not tracked in this block
      if (currentValue === undefined) continue;

      if (officialVote === currentValue || (officialVote === null && currentValue === null)) {
        confirmed++;
      } else {
        mismatches++;
        const status = verifyOnly ? 'MISMATCH' : 'FIXING';
        console.log(`  ${status}: ${block.name} (${block.party}-${block.state}) ${rc.id}: ours="${currentValue}" official="${officialVote}" [${block.location}]`);

        if (!verifyOnly) {
          updates.push({
            block,
            voteId: rc.id,
            oldValue: currentValue,
            newValue: officialVote
          });
        }
      }
    }
  }

  console.log(`\n--- SUMMARY ---`);
  console.log(`Confirmed correct: ${confirmed}`);
  console.log(`Mismatches: ${mismatches}`);

  if (verifyOnly) {
    if (mismatches === 0) {
      console.log('\n✓ All vote data matches official records.');
    } else {
      console.log(`\n✗ ${mismatches} mismatches found. Run without --verify to fix.`);
    }
    return;
  }

  // Apply updates — work on the source text using the fullKeyVotesMatch context
  if (updates.length > 0) {
    console.log(`\nApplying ${updates.length} fixes to candidates.js...`);

    for (const upd of updates) {
      const oldVoteEntry = `${upd.voteId}: ${upd.oldValue === null ? 'null' : "'" + upd.oldValue + "'"}`;
      const newVoteEntry = `${upd.voteId}: ${upd.newValue === null ? 'null' : "'" + upd.newValue + "'"}`;

      // Find the specific keyVotes block in source and replace within it
      const oldKV = upd.block.fullKeyVotesMatch;
      const newKV = oldKV.replace(oldVoteEntry, newVoteEntry);

      if (newKV !== oldKV) {
        // Replace only the first occurrence of this specific block
        const idx = candidatesSource.indexOf(oldKV);
        if (idx !== -1) {
          candidatesSource = candidatesSource.substring(0, idx) + newKV + candidatesSource.substring(idx + oldKV.length);
          // Update the block's fullKeyVotesMatch for subsequent updates to same block
          upd.block.fullKeyVotesMatch = newKV;
          console.log(`  Fixed: ${upd.block.name} ${upd.voteId}: ${upd.oldValue} → ${upd.newValue} [${upd.block.location}]`);
        } else {
          console.log(`  WARNING: Could not locate block for ${upd.block.name} ${upd.voteId}`);
        }
      } else {
        console.log(`  WARNING: Could not apply fix for ${upd.block.name} ${upd.voteId}`);
      }
    }

    fs.writeFileSync(CANDIDATES_PATH, candidatesSource);
    console.log(`\n✓ candidates.js updated. ${updates.length} votes corrected.`);
  } else {
    console.log('\n✓ No fixes needed — all data matches official records.');
  }
}

// ============================================
// MAIN
// ============================================
async function main() {
  const args = process.argv.slice(2);
  const verifyOnly = args.includes('--verify');
  const downloadOnly = args.includes('--download-only');

  console.log('=== Vote Sync: clerk.house.gov → candidates.js ===\n');
  console.log(`Roll calls tracked: ${ROLL_CALLS.map(r => r.id).join(', ')}`);
  console.log(`Source: clerk.house.gov official XML records\n`);

  if (!downloadOnly) {
    // Check if XMLs exist; if not, download first
    const missing = ROLL_CALLS.filter(rc => {
      const filePath = path.join(DATA_DIR, `${rc.id}_roll${rc.rollCall}_${rc.year}.xml`);
      return !fs.existsSync(filePath);
    });

    if (missing.length > 0) {
      console.log(`Downloading ${missing.length} missing roll call XML(s)...\n`);
      await downloadRollCalls();
    }
  } else {
    await downloadRollCalls();
    console.log('\nDownload complete. Run without --download-only to verify/update.');
    return;
  }

  verifyAndUpdate(verifyOnly);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
