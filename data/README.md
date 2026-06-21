# Data And Source Snapshots

This folder holds public source snapshots and research-support data for the site.

## Standard

- No nightly sync.
- Manual updates only.
- Review generated data before committing it.
- If a claim is not sourced, it should not appear as a fact on the public site.
- If a candidate has no voting record and no researched public stance, mark the stance unknown.

## Current Source Layers

### `rollcalls/`
Official House Clerk XML roll call snapshots for the saved weapons-funding votes used by the site.

These are the strongest source layer in the project right now because they are official vote records and already live in GitHub. `member-vote-summary-2024.json` is generated from those XML files with `scripts/build-rollcall-summary.js` for easier review and reuse.

### `fec/`
FEC candidate-search snapshots and attempted snapshots.

- `positive-examples-fec-2026.json` currently records that the FEC DEMO_KEY was rate-limited during the manual snapshot attempt.
- Use `scripts/fetch-fec-highlighted.js` with `FEC_API_KEY` for a complete highlighted-state federal candidate snapshot.

## Manual Roll Call Summary Command

```powershell
node scripts\build-rollcall-summary.js
```

## Manual FEC Snapshot Command

```powershell
$env:FEC_API_KEY='your-key-here'
node scripts\fetch-fec-highlighted.js
```

Optional smaller batch:

```powershell
$env:FEC_API_KEY='your-key-here'
$env:FEC_STATES='OH,AZ,PA,MI'
node scripts\fetch-fec-highlighted.js
```

## Human Research Needed

Governor candidates and challengers without federal voting records need individual research from:

- Official campaign websites.
- Public statements and interviews.
- Social media posts.
- FEC/state campaign finance records where applicable.
- AIPAC and other pro-government-of-Israel lobbying/endorsement trackers.
- Reliable local and national reporting.

Ohio and Arizona are the proof-of-concept states. The same structure should be pushed across all highlighted states, then all states.