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
Official Federal Election Commission snapshots for federal candidate discovery.

- `highlighted-federal-candidates-2026-bulk.json` is generated from official FEC 2026 bulk downloads and does not require an API key. It covers filed House and Senate candidates in all highlighted states. This is not a final ballot-certified list and is not a stance assessment.
- `raw/cn26.zip` and `raw/weball26.zip` are the downloaded official FEC bulk source files used for that snapshot.
- `positive-examples-fec-2026.json` records that the FEC DEMO_KEY was rate-limited during the earlier manual API attempt.
- Use `scripts/fetch-fec-highlighted.js` with `FEC_API_KEY` later for API-enriched federal candidate details.

### `geo/`
Official Census ZIP-estimate support data.

- `2024_Gaz_zcta_national.zip` is the official Census 2024 ZCTA Gazetteer download.
- `zcta-centroids-2024.json` is generated from that Gazetteer for geographic review/support data.
- `tab20_cd11920_zcta520_natl.txt` is the official Census 119th Congressional District-to-ZCTA relationship file.
- `zcta-to-district-119.json` is generated from that relationship file and powers browser-safe ZIP estimates without calling Census from the browser.
- ZIP estimates are approximate because USPS ZIPs and Census ZCTAs are not identical, and ZIP/ZCTA areas can cross congressional district lines.

## Manual Roll Call Summary Command

```powershell
node scripts\build-rollcall-summary.js
```

## Manual FEC Bulk Snapshot Command

No API key required:

```powershell
node scripts\build-fec-bulk-highlighted.js
```

This refreshes:

- `data/fec/raw/cn26.zip`
- `data/fec/raw/weball26.zip`
- `data/fec/highlighted-federal-candidates-2026-bulk.json`
- `js/fec-candidate-snapshot.js`

## Manual FEC API Snapshot Command

Use this when the real FEC API key is available:

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

## Manual Census ZIP Snapshot Command

```powershell
node scripts\build-zcta-centroids.js
node scripts\build-zcta-districts.js
```

## Human Research Needed

Governor candidates and challengers without federal voting records need individual research from official state portals first. The site source map for those portals lives in `js/race-context.js` as `STATE_OFFICIAL_RESEARCH_SOURCES`.

Research should then use:

- Official campaign websites.
- Public statements and interviews.
- Social media posts.
- FEC/state campaign finance records where applicable.
- AIPAC and other pro-government-of-Israel lobbying/endorsement trackers.
- Reliable local and national reporting.

Ohio and Arizona are the proof-of-concept states. The same structure should be pushed across all highlighted states, then all states.