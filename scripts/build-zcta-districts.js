#!/usr/bin/env node
/**
 * Builds a static ZIP/ZCTA -> 119th Congressional District estimate from the
 * official Census CD119-to-ZCTA relationship file.
 *
 * Manual update only. Source:
 * https://www2.census.gov/geo/docs/maps-data/data/rel2020/cd-sld/tab20_cd11920_zcta520_natl.txt
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IN_FILE = path.join(ROOT, 'data', 'geo', 'tab20_cd11920_zcta520_natl.txt');
const OUT_FILE = path.join(ROOT, 'data', 'geo', 'zcta-to-district-119.json');

const STATE_FIPS_TO_ABBR = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
  '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL',
  '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN',
  '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME',
  '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS',
  '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
  '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND',
  '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
  '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
  '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI',
  '56': 'WY', '60': 'AS', '66': 'GU', '69': 'MP', '72': 'PR', '78': 'VI'
};

function normalizeDistrict(geoid) {
  const stateFips = geoid.slice(0, 2);
  const cd = geoid.slice(2);
  const state = STATE_FIPS_TO_ABBR[stateFips];
  if (!state) return null;
  const num = Number(cd);
  if (!Number.isFinite(num)) return null;
  if (num === 0 || num === 98) return `${state}-AL`;
  return `${state}-${String(num).padStart(2, '0')}`;
}

function main() {
  if (!fs.existsSync(IN_FILE)) {
    throw new Error(`Missing source file: ${IN_FILE}`);
  }

  const lines = fs.readFileSync(IN_FILE, 'utf8').split(/\r?\n/).filter(Boolean);
  const header = lines.shift().split('|');
  const index = Object.fromEntries(header.map((name, i) => [name, i]));
  const byZcta = new Map();

  for (const line of lines) {
    const cols = line.split('|');
    const zcta = cols[index.GEOID_ZCTA5_20];
    if (!/^\d{5}$/.test(zcta || '')) continue;

    const district = normalizeDistrict(cols[index.GEOID_CD119_20] || '');
    if (!district) continue;

    const partArea = Number(cols[index.AREALAND_PART] || 0) + Number(cols[index.AREAWATER_PART] || 0);
    const zctaArea = Number(cols[index.AREALAND_ZCTA5_20] || 0) + Number(cols[index.AREAWATER_ZCTA5_20] || 0);
    if (!Number.isFinite(partArea) || partArea <= 0) continue;

    if (!byZcta.has(zcta)) byZcta.set(zcta, []);
    byZcta.get(zcta).push({ district, partArea, zctaArea });
  }

  const zctas = {};
  for (const [zcta, overlaps] of byZcta.entries()) {
    const totalOverlap = overlaps.reduce((sum, item) => sum + item.partArea, 0);
    const merged = new Map();
    for (const item of overlaps) {
      const existing = merged.get(item.district) || { district: item.district, partArea: 0, zctaArea: item.zctaArea };
      existing.partArea += item.partArea;
      merged.set(item.district, existing);
    }
    const alternatives = Array.from(merged.values())
      .map(item => ({
        district: item.district,
        overlapShare: totalOverlap > 0 ? Number((item.partArea / totalOverlap).toFixed(4)) : null
      }))
      .sort((a, b) => (b.overlapShare || 0) - (a.overlapShare || 0));
    zctas[zcta] = {
      district: alternatives[0].district,
      alternatives,
      spansMultipleDistricts: alternatives.length > 1
    };
  }

  const output = {
    generatedAt: new Date().toISOString(),
    source: 'U.S. Census Bureau CD119-to-ZCTA 2020 relationship file',
    sourceUrl: 'https://www2.census.gov/geo/docs/maps-data/data/rel2020/cd-sld/tab20_cd11920_zcta520_natl.txt',
    warning: 'ZIP/ZCTA estimates are approximate. ZCTAs can span more than one congressional district and are not identical to USPS ZIP delivery areas.',
    count: Object.keys(zctas).length,
    zctas
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote ${OUT_FILE}`);
  console.log(`ZCTAs: ${output.count}`);
}

main();