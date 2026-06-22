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
  '56': 'WY'
};

function normalizeDistrictLabel(state, districtNumber) {
  if (!state || districtNumber === null || districtNumber === undefined || districtNumber === '') return null;
  const stateCode = String(state).trim().toUpperCase();
  const rawDistrict = String(districtNumber).trim().toUpperCase();
  if (rawDistrict === 'AL' || rawDistrict === 'AT LARGE') return stateCode + '-AL';
  const numericDistrict = parseInt(rawDistrict.replace(/[^0-9]/g, ''), 10);
  if (Number.isNaN(numericDistrict) || numericDistrict < 0) return null;
  if (numericDistrict === 0 || (stateCode === 'DC' && numericDistrict === 98)) return stateCode + '-AL';
  return stateCode + '-' + String(numericDistrict).padStart(2, '0');
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
    if (Array.isArray(geographies[layer]) && geographies[layer].length > 0) return geographies[layer][0];
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
  return normalizeDistrictLabel(state, district);
}

exports.handler = async function handler(event) {
  const address = event.queryStringParameters && event.queryStringParameters.address
    ? String(event.queryStringParameters.address).trim()
    : '';

  if (!address || address.length < 8) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Address is required.' })
    };
  }

  const params = new URLSearchParams({
    address,
    benchmark: 'Public_AR_Current',
    vintage: 'Current_Current',
    layers: 'all',
    format: 'json'
  });
  const endpoint = 'https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?' + params.toString();

  try {
    const response = await fetch(endpoint, {
      headers: { 'User-Agent': 'butwhatcanyoudo-address-lookup/1.0' }
    });
    if (!response.ok) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Census geocoder did not respond.' })
      };
    }

    const data = await response.json();
    const matches = data && data.result && Array.isArray(data.result.addressMatches)
      ? data.result.addressMatches
      : [];
    if (!matches.length) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ district: null, matchedAddress: null })
      };
    }

    const geo = getCensusDistrictGeography(matches[0].geographies);
    const district = districtLabelFromCensusGeo(geo);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ district, matchedAddress: matches[0].matchedAddress || null })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};