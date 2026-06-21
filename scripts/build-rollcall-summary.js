#!/usr/bin/env node
/**
 * Builds a reviewed local summary from official House Clerk XML snapshots.
 * Manual/generated source helper only. Commit the output after review.
 */

const fs = require('fs');
const path = require('path');

const ROLL_CALLS = [
  { id: 'hr6126', file: 'hr6126_roll577_2023.xml', label: 'H.R. 6126' },
  { id: 'hr8034', file: 'hr8034_roll152_2024.xml', label: 'H.R. 8034' },
  { id: 'hr8369', file: 'hr8369_roll217_2024.xml', label: 'H.R. 8369' }
];

const DATA_DIR = path.join(__dirname, '..', 'data', 'rollcalls');
const OUT_FILE = path.join(DATA_DIR, 'member-vote-summary-2024.json');

function normalizeVote(vote) {
  if (vote === 'Yea' || vote === 'Aye' || vote === 'Yes') return 'Yea';
  if (vote === 'Nay' || vote === 'No') return 'Nay';
  return vote;
}

function parseVotes(xml) {
  const votes = [];
  const re = /<recorded-vote><legislator name-id="([^"]*)" sort-field="([^"]*)" unaccented-name="([^"]*)" party="([^"]*)" state="([^"]*)" role="legislator">[^<]*<\/legislator><vote>([^<]+)<\/vote><\/recorded-vote>/g;
  let match;
  while ((match = re.exec(xml))) {
    votes.push({
      bioguideId: match[1],
      sortField: match[2],
      name: match[3],
      party: match[4],
      state: match[5],
      vote: normalizeVote(match[6])
    });
  }
  return votes;
}

const members = {};
const rollCalls = {};

for (const rollCall of ROLL_CALLS) {
  const filePath = path.join(DATA_DIR, rollCall.file);
  const xml = fs.readFileSync(filePath, 'utf8');
  const votes = parseVotes(xml);
  rollCalls[rollCall.id] = {
    label: rollCall.label,
    file: rollCall.file,
    totalVotes: votes.length,
    yea: votes.filter(v => v.vote === 'Yea').length,
    nay: votes.filter(v => v.vote === 'Nay').length,
    notVoting: votes.filter(v => v.vote === 'Not Voting').length
  };

  votes.forEach(v => {
    const key = `${v.name}|${v.party}|${v.state}`;
    members[key] ||= {
      name: v.name,
      party: v.party,
      state: v.state,
      bioguideIds: Array.from(new Set([v.bioguideId].filter(Boolean))),
      votes: {}
    };
    if (v.bioguideId && !members[key].bioguideIds.includes(v.bioguideId)) members[key].bioguideIds.push(v.bioguideId);
    members[key].votes[rollCall.id] = v.vote;
  });
}

const memberRows = Object.values(members).map(member => {
  const voteValues = Object.values(member.votes);
  return {
    ...member,
    nayCount: voteValues.filter(v => v === 'Nay').length,
    yeaCount: voteValues.filter(v => v === 'Yea').length,
    notVotingCount: voteValues.filter(v => v === 'Not Voting').length
  };
}).sort((a, b) => b.nayCount - a.nayCount || a.party.localeCompare(b.party) || a.state.localeCompare(b.state) || a.name.localeCompare(b.name));

const summary = {
  generatedAt: new Date().toISOString(),
  source: 'Official House Clerk XML snapshots committed in data/rollcalls/',
  updatePolicy: 'Generated manually from saved XML. Review before commit.',
  rollCalls,
  members: memberRows,
  allNayMembers: memberRows.filter(m => m.nayCount === ROLL_CALLS.length),
  republicanAllNayMembers: memberRows.filter(m => m.party === 'R' && m.nayCount === ROLL_CALLS.length),
  democratAllNayMembers: memberRows.filter(m => m.party === 'D' && m.nayCount === ROLL_CALLS.length)
};

fs.writeFileSync(OUT_FILE, JSON.stringify(summary, null, 2) + '\n');
console.log(`Wrote ${OUT_FILE}`);
console.log(`Members summarized: ${memberRows.length}`);
console.log(`All-Nay members: ${summary.allNayMembers.length}`);