#!/usr/bin/env node
/**
 * Builds a browser-friendly ZIP/ZCTA centroid lookup from the official Census
 * Gazetteer file. This powers privacy-friendly ZIP estimates.
 *
 * Source snapshot:
 * data/geo/2024_Gaz_zcta_national.zip
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'data', 'geo', 'zcta-2024-gazetteer', '2024_Gaz_zcta_national.txt');
const OUT = path.join(__dirname, '..', 'data', 'geo', 'zcta-centroids-2024.json');

const text = fs.readFileSync(SRC, 'utf8').trim();
const lines = text.split(/\r?\n/);
const header = lines.shift().trim().split(/\t/).map(h => h.trim());
const idx = Object.fromEntries(header.map((h, i) => [h, i]));

const lookup = {};
for (const line of lines) {
  const cols = line.split(/\t/).map(c => c.trim());
  const zip = cols[idx.GEOID];
  const lat = Number(cols[idx.INTPTLAT]);
  const lon = Number(cols[idx.INTPTLONG]);
  if (/^\d{5}$/.test(zip) && Number.isFinite(lat) && Number.isFinite(lon)) {
    lookup[zip] = [Number(lat.toFixed(6)), Number(lon.toFixed(6))];
  }
}

const payload = {
  generatedAt: new Date().toISOString(),
  source: 'U.S. Census Bureau Gazetteer Files, 2024 ZIP Code Tabulation Areas',
  sourceFile: 'data/geo/2024_Gaz_zcta_national.zip',
  warning: 'ZIP/ZCTA centroids are estimates. ZIP codes can cross congressional district lines and USPS ZIPs are not the same as Census ZCTAs. Use full address for the most precise result.',
  count: Object.keys(lookup).length,
  centroids: lookup
};

fs.writeFileSync(OUT, JSON.stringify(payload));
console.log(`Wrote ${OUT}`);
console.log(`ZCTAs: ${payload.count}`);