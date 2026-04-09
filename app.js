// ===== MORTH Road Safety Dashboard =====
// Blackspot & Accident Analysis — India

// ===== MORTH Data =====
const MORTH_DATA = {
  summary: {
    total_length_processed: "11,379.9",
    fatal_grievous_covered: "1,33,765",
    blackspots: "10,867",
    fg_coverage: "69,672"
  },
  states: [
    {
      name: "KERALA", fg_covered: 18502, blackspots: 395, corridors: 133,
      total_fatalities: 2208, total_grievous: 18996, total_fg: 21204,
      spot_distribution: [{ label: "0-10", value: 136 }, { label: "10-20", value: 101 }, { label: "20+", value: 158 }],
      violations: [
        { name: "No Violation", count: 11379, pct: 61.5 },
        { name: "Rash Driving", count: 2470, pct: 13.3 },
        { name: "High Speed", count: 1728, pct: 9.3 }
      ],
      crash_types: [
        { name: "Vehicle to Vehicle", count: 12385, pct: 66.9 },
        { name: "Vehicle to Pedestrian", count: 4034, pct: 21.8 },
        { name: "No Collision", count: 582, pct: 3.1 }
      ],
      crash_natures: [
        { name: "Hit from Side", count: 7479, pct: 40.4 },
        { name: "Head on Collision", count: 4615, pct: 24.9 },
        { name: "Hit from Back", count: 4227, pct: 22.8 }
      ]
    },
    {
      name: "TAMIL NADU", fg_covered: 18202, blackspots: 1320, corridors: 169,
      total_fatalities: 9764, total_grievous: 12724, total_fg: 22488,
      spot_distribution: [{ label: "0-10", value: 790 }, { label: "10-20", value: 352 }, { label: "20+", value: 178 }],
      violations: [
        { name: "No Violation", count: 12850, pct: 70.6 },
        { name: "High Speed", count: 2255, pct: 12.4 },
        { name: "High Speed, Rash Driving", count: 461, pct: 2.5 }
      ],
      crash_types: [
        { name: "Vehicle to Vehicle", count: 10127, pct: 55.6 },
        { name: "Vehicle to Pedestrian", count: 4714, pct: 25.9 },
        { name: "No Collision", count: 779, pct: 4.3 }
      ],
      crash_natures: [
        { name: "Hit from Side", count: 4994, pct: 27.4 },
        { name: "Hit from Back", count: 4987, pct: 27.4 },
        { name: "Head on Collision", count: 4127, pct: 22.7 }
      ]
    },
    {
      name: "UTTAR PRADESH", fg_covered: 13400, blackspots: 1436, corridors: 299,
      total_fatalities: 8965, total_grievous: 8865, total_fg: 17830,
      spot_distribution: [{ label: "0-10", value: 1037 }, { label: "10-20", value: 310 }, { label: "20+", value: 89 }],
      violations: [
        { name: "No Violation", count: 8506, pct: 63.5 },
        { name: "High Speed", count: 1074, pct: 8.0 },
        { name: "High Speed, Rash Driving", count: 499, pct: 3.7 }
      ],
      crash_types: [
        { name: "Vehicle to Vehicle", count: 6703, pct: 50.0 },
        { name: "Vehicle to Pedestrian", count: 4546, pct: 33.9 },
        { name: "Vehicle to Bicycle", count: 566, pct: 4.2 }
      ],
      crash_natures: [
        { name: "Hit from Back", count: 5578, pct: 41.6 },
        { name: "Hit from Side", count: 2476, pct: 18.5 },
        { name: "Head on Collision", count: 2412, pct: 18.0 }
      ]
    },
    {
      name: "KARNATAKA", fg_covered: 10255, blackspots: 778, corridors: 195,
      total_fatalities: 4395, total_grievous: 8398, total_fg: 12793,
      spot_distribution: [{ label: "0-10", value: 493 }, { label: "10-20", value: 185 }, { label: "20+", value: 100 }],
      violations: [
        { name: "No Violation", count: 3423, pct: 33.4 },
        { name: "High Speed", count: 2947, pct: 28.7 },
        { name: "High Speed, Rash Driving", count: 1151, pct: 11.2 }
      ],
      crash_types: [
        { name: "Vehicle to Vehicle", count: 5909, pct: 57.6 },
        { name: "Vehicle to Pedestrian", count: 2515, pct: 24.5 },
        { name: "No Collision", count: 559, pct: 5.5 }
      ],
      crash_natures: [
        { name: "Hit from Back", count: 3036, pct: 29.6 },
        { name: "Hit from Side", count: 2700, pct: 26.3 },
        { name: "Head on Collision", count: 2158, pct: 21.0 }
      ]
    },
    {
      name: "MAHARASHTRA", fg_covered: 8434, blackspots: 932, corridors: 328,
      total_fatalities: 5177, total_grievous: 6275, total_fg: 11452,
      spot_distribution: [{ label: "0-10", value: 723 }, { label: "10-20", value: 152 }, { label: "20+", value: 57 }],
      violations: [
        { name: "No Violation", count: 5755, pct: 68.2 },
        { name: "High Speed", count: 909, pct: 10.8 },
        { name: "Rash Driving", count: 239, pct: 2.8 }
      ],
      crash_types: [
        { name: "Vehicle to Vehicle", count: 4828, pct: 57.2 },
        { name: "Vehicle to Pedestrian", count: 2117, pct: 25.1 },
        { name: "Vehicle to Bicycle", count: 362, pct: 4.3 }
      ],
      crash_natures: [
        { name: "Hit from Back", count: 3122, pct: 37.0 },
        { name: "Hit from Side", count: 1824, pct: 21.6 },
        { name: "Head on Collision", count: 1486, pct: 17.6 }
      ]
    },
    {
      name: "WEST BENGAL", fg_covered: 5058, blackspots: 500, corridors: 267,
      total_fatalities: 2689, total_grievous: 4226, total_fg: 6915,
      spot_distribution: [{ label: "0-10", value: 345 }, { label: "10-20", value: 110 }, { label: "20+", value: 45 }],
      violations: [
        { name: "No Violation", count: 3502, pct: 69.2 },
        { name: "Rash Driving", count: 456, pct: 9.0 },
        { name: "High Speed", count: 280, pct: 5.5 }
      ],
      crash_types: [
        { name: "Vehicle to Vehicle", count: 2176, pct: 43.0 },
        { name: "Vehicle to Pedestrian", count: 1810, pct: 35.8 },
        { name: "Vehicle to Bicycle", count: 295, pct: 5.8 }
      ],
      crash_natures: [
        { name: "Hit from Back", count: 2581, pct: 51.0 },
        { name: "Hit from Side", count: 1007, pct: 19.9 },
        { name: "Head on Collision", count: 558, pct: 11.0 }
      ]
    },
    {
      name: "ASSAM", fg_covered: 4980, blackspots: 450, corridors: 212,
      total_fatalities: 1860, total_grievous: 5060, total_fg: 6920,
      spot_distribution: [{ label: "0-10", value: 320 }, { label: "10-20", value: 92 }, { label: "20+", value: 38 }],
      violations: [
        { name: "No Violation", count: 2463, pct: 49.5 },
        { name: "High Speed", count: 701, pct: 14.1 },
        { name: "High Speed, Rash Driving", count: 477, pct: 9.6 }
      ],
      crash_types: [
        { name: "Vehicle to Vehicle", count: 2057, pct: 41.3 },
        { name: "Vehicle to Pedestrian", count: 1443, pct: 29.0 },
        { name: "Vehicle to Bicycle", count: 245, pct: 4.9 }
      ],
      crash_natures: [
        { name: "Hit from Back", count: 1832, pct: 36.8 },
        { name: "Hit from Side", count: 1005, pct: 20.2 },
        { name: "Head on Collision", count: 757, pct: 15.2 }
      ]
    },
    {
      name: "MADHYA PRADESH", fg_covered: 4836, blackspots: 588, corridors: 239,
      total_fatalities: 2866, total_grievous: 4001, total_fg: 6867,
      spot_distribution: [{ label: "0-10", value: 467 }, { label: "10-20", value: 94 }, { label: "20+", value: 27 }],
      violations: [
        { name: "No Violation", count: 3211, pct: 66.4 },
        { name: "High Speed", count: 437, pct: 9.0 },
        { name: "Dangerous Overtaking", count: 94, pct: 1.9 }
      ],
      crash_types: [
        { name: "Vehicle to Vehicle", count: 2768, pct: 57.2 },
        { name: "Vehicle to Pedestrian", count: 1023, pct: 21.2 },
        { name: "Vehicle to Object / Property", count: 142, pct: 2.9 }
      ],
      crash_natures: [
        { name: "Hit from Back", count: 1931, pct: 39.9 },
        { name: "Head on Collision", count: 1128, pct: 23.3 },
        { name: "Hit from Side", count: 576, pct: 11.9 }
      ]
    },
    {
      name: "RAJASTHAN", fg_covered: 4634, blackspots: 498, corridors: 271,
      total_fatalities: 2827, total_grievous: 3369, total_fg: 6196,
      spot_distribution: [{ label: "0-10", value: 393 }, { label: "10-20", value: 81 }, { label: "20+", value: 24 }],
      violations: [
        { name: "No Violation", count: 2990, pct: 64.5 },
        { name: "High Speed", count: 665, pct: 14.4 },
        { name: "Changing lane without care", count: 75, pct: 1.6 }
      ],
      crash_types: [
        { name: "Vehicle to Vehicle", count: 2697, pct: 58.2 },
        { name: "Vehicle to Pedestrian", count: 1212, pct: 26.2 },
        { name: "Vehicle to Object / Property", count: 88, pct: 1.9 }
      ],
      crash_natures: [
        { name: "Hit from Back", count: 1852, pct: 40.0 },
        { name: "Hit from Side", count: 939, pct: 20.3 },
        { name: "Head on Collision", count: 797, pct: 17.2 }
      ]
    },
    {
      name: "TELANGANA", fg_covered: 4340, blackspots: 426, corridors: 201,
      total_fatalities: 2755, total_grievous: 2407, total_fg: 5162,
      spot_distribution: [{ label: "0-10", value: 315 }, { label: "10-20", value: 89 }, { label: "20+", value: 22 }],
      violations: [
        { name: "No Violation", count: 2877, pct: 66.3 },
        { name: "High Speed", count: 437, pct: 10.1 },
        { name: "High Speed, Rash Driving", count: 277, pct: 6.4 }
      ],
      crash_types: [
        { name: "Vehicle to Vehicle", count: 2320, pct: 53.5 },
        { name: "Vehicle to Pedestrian", count: 1267, pct: 29.2 },
        { name: "No Collision", count: 202, pct: 4.7 }
      ],
      crash_natures: [
        { name: "Hit from Back", count: 1343, pct: 30.9 },
        { name: "Hit from Side", count: 1190, pct: 27.4 },
        { name: "Head on Collision", count: 867, pct: 20.0 }
      ]
    }
  ],
  agencies: [
    { name: "NHAI", length: "8,163.7", corridors: "7,411", accidents: "99,626", fatalities: "52,299" },
    { name: "State PWD", length: "3,071.3", corridors: "3,309", accidents: "32,667", fatalities: "16,898" },
    { name: "NHIDCL", length: "144.1", corridors: "146", accidents: "1,465", fatalities: "474" },
    { name: "BRO", length: "0.8", corridors: "1", accidents: "7", fatalities: "1" }
  ],
  rankings: [
    {
      title: "Top NH (Longest Length)",
      rows: [
        { name: "NH-44", value: "757.2 km" },
        { name: "NH-48", value: "673.6 km" },
        { name: "NH-66", value: "505.3 km" }
      ]
    },
    {
      title: "Top NH (Fatal + Grievous)",
      rows: [
        { name: "NH-66", value: "9,652" },
        { name: "NH-44", value: "8,654" },
        { name: "NH-48", value: "7,738" }
      ]
    },
    {
      title: "Top Districts (Fatal + Grievous)",
      rows: [
        { name: "ALAPPUZHA", value: "2,836" },
        { name: "ERNAKULAM CITY", value: "2,678" },
        { name: "THRISSUR RURAL", value: "2,592" }
      ]
    }
  ],
  bars: [
    {
      title: "Crashes per Corridor/Spot",
      rows: [
        { label: "0-10", value: 6641 },
        { label: "10-20", value: 1940 },
        { label: "20+", value: 846 }
      ]
    },
    {
      title: "Fatalities per Corridor/Spot",
      rows: [
        { label: "Low", value: 4582 },
        { label: "Medium", value: 4366 },
        { label: "High", value: 479 }
      ]
    }
  ]
};

// Build lookup: state name (lowercase) → MORTH state data
const STATE_DATA_MAP = {};
MORTH_DATA.states.forEach(s => {
  STATE_DATA_MAP[s.name.toLowerCase()] = s;
});

// ===== Map State =====
let map = null;
let statesData = null;
let districtsData = null;
let currentGeoLayer = null;
let countMarkers = [];
let viewLevel = 'country';
let selectedStateName = null;

// ===== Known Indian States =====
const KNOWN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'NCT of Delhi', 'Jammu and Kashmir', 'Ladakh', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Puducherry'
];

const SYNONYMS = {
  nctofdelhi: 'delhi', delhi: 'delhi',
  uttaranchal: 'uttarakhand', orissa: 'odisha'
};

const normalize = (s) => String(s || '').toLowerCase().replace(/[^a-z]/g, '');
const canon = (s) => {
  const n = normalize(s);
  return SYNONYMS[n] || n;
};

// ===== Name Extractors =====
function getStateName(feature) {
  const props = feature?.properties || {};
  const keys = ['STNAME', 'STNAME_SH', 'STATE_NAME', 'STATE', 'ST_NM', 'STATENAME', 'State', 'NAME_1', 'NAME'];
  for (const k of keys) {
    if (props[k]) return props[k];
  }
  for (const v of Object.values(props)) {
    if (KNOWN_STATES.some(st => normalize(v) === normalize(st))) return v;
  }
  return 'Unknown';
}

function getDistrictName(props) {
  const preferred = ['DISTNAME', 'DISTRICT', 'DTNAME', 'DIST_NAME', 'DISTRICT_NAME', 'DIST_NM', 'DISTRICT_N', 'NAME', 'NAME_1', 'NAME_2', 'district', 'distname', 'dtname'];
  for (const k of preferred) {
    if (props?.[k]) return props[k];
  }
  for (const [k, v] of Object.entries(props || {})) {
    if (typeof v === 'string' && /dist|dt/i.test(k) && !/state/i.test(k)) return v;
  }
  return 'District';
}

function districtMatchesState(props, stateName) {
  if (!props || !stateName) return false;
  const cs = canon(stateName);
  const stateKeys = ['ST_NM', 'st_nm', 'STATE_NAME', 'STATE', 'STNAME', 'STATE/UT', 'STATE_UT', 'STATEUT', 'State', 'stname'];
  for (const key of stateKeys) {
    if (key in props && props[key] && canon(props[key]) === cs) return true;
  }
  for (const [k, v] of Object.entries(props)) {
    if ((/state/i.test(k) || /^st(_?nm|name)$/i.test(k)) && v && canon(v) === cs) return true;
  }
  return false;
}

// ===== Format Number =====
function formatNumber(n) {
  return Number(n || 0).toLocaleString('en-IN');
}

// ===== Color by Severity =====
function getColorBySeverity(fg) {
  if (!fg || fg === 0) return '#e0e0e0';
  if (fg > 15000) return '#b71c1c';
  if (fg > 10000) return '#F44336';
  if (fg > 5000) return '#FF9800';
  return '#FFC107';
}

// ===== Match GeoJSON state name to MORTH data =====
function getMorthStateData(geoStateName) {
  if (!geoStateName) return null;
  const key = geoStateName.toUpperCase();
  // Direct match
  if (STATE_DATA_MAP[key.toLowerCase()]) return STATE_DATA_MAP[key.toLowerCase()];
  // Fuzzy: normalize and compare
  const geoNorm = normalize(geoStateName);
  for (const [k, v] of Object.entries(STATE_DATA_MAP)) {
    if (normalize(k) === geoNorm) return v;
  }
  return null;
}

// ===== Build Hover Tooltip =====
function buildHoverTooltip(stateName, morthData) {
  if (!morthData) {
    return `<div class="state-hover-card">
      <div class="state-card-title">${stateName}</div>
      <div class="state-card-row" style="color:#999">No MORTH data available</div>
    </div>`;
  }
  return `
    <div class="state-hover-card">
      <div class="state-card-title">${stateName}</div>
      <div class="state-card-row">Accidents (F&G): ${formatNumber(morthData.fg_covered)}</div>
      <div class="state-card-row">Fatalities: ${formatNumber(morthData.total_fatalities)}</div>
      <div class="state-card-row">Grievous Injuries: ${formatNumber(morthData.total_grievous)}</div>
      <div class="state-card-row">Black Corridors: ${formatNumber(morthData.corridors)}</div>
      <div class="state-card-row">Blackspots: ${formatNumber(morthData.blackspots)}</div>
    </div>
  `;
}

// ===== Get Feature Style =====
function getFeatureStyle(feature) {
  const stateName = getStateName(feature);
  const mData = getMorthStateData(stateName);
  const fillColor = mData ? getColorBySeverity(mData.total_fg) : '#e0e0e0';
  return {
    color: '#455a64',
    weight: 1,
    fillColor: fillColor,
    fillOpacity: 0.85,
  };
}

// ===== Render GeoJSON on Map =====
// ===== Clear Count Markers =====
function clearCountMarkers() {
  countMarkers.forEach(m => map.removeLayer(m));
  countMarkers = [];
}

// ===== Add Count Labels on Map for MORTH States =====
function addCountLabels(geojsonData) {
  clearCountMarkers();
  (geojsonData.features || []).forEach(feature => {
    const stateName = getStateName(feature);
    const mData = getMorthStateData(stateName);
    if (!mData) return;
    const bounds = L.geoJSON(feature).getBounds();
    const center = bounds.getCenter();
    const icon = L.divIcon({
      className: 'map-count-label',
      html: `<span class="label-name">${mData.name}</span><span class="label-count">${formatNumber(mData.fg_covered)}</span>`,
      iconSize: [60, 28],
      iconAnchor: [30, 14],
    });
    countMarkers.push(L.marker(center, { icon: icon, interactive: false }).addTo(map));
  });
}

// ===== Render GeoJSON on Map =====
function renderGeoJSON(geojsonData, onEachFeature) {
  if (currentGeoLayer) {
    map.removeLayer(currentGeoLayer);
    currentGeoLayer = null;
  }
  currentGeoLayer = L.geoJSON(geojsonData, {
    style: (feature) => getFeatureStyle(feature),
    onEachFeature: onEachFeature,
  }).addTo(map);
  return currentGeoLayer;
}

// ===== On Each State Feature =====
function onEachStateFeature(feature, layer) {
  const stateName = getStateName(feature);
  const mData = getMorthStateData(stateName);
  layer.on({
    mouseover: (e) => {
      layer.setStyle({ weight: 3, fillOpacity: 1 });
      const content = buildHoverTooltip(stateName, mData);
      layer.bindTooltip(content, { sticky: true, direction: 'top', opacity: 1, className: 'state-hover-tooltip' }).openTooltip(e.latlng);
    },
    mouseout: () => {
      layer.setStyle(getFeatureStyle(feature));
      layer.closeTooltip();
    },
    click: () => {
      // Always drill into districts on click
      openStateMapView(stateName);
    }
  });
}

// ===== Show State Detail Panel =====
function showStateDetail(stateData) {
  const title = document.getElementById('state-detail-title');
  const body = document.getElementById('state-detail-body');
  title.textContent = stateData.name;

  let html = '';

  // Summary metrics
  html += `<div class="detail-summary">
    <div class="detail-metric">
      <span class="detail-metric-label">Fatalities</span>
      <span class="detail-metric-value red-text">${formatNumber(stateData.total_fatalities)}</span>
    </div>
    <div class="detail-metric">
      <span class="detail-metric-label">Grievous Injuries</span>
      <span class="detail-metric-value orange-text">${formatNumber(stateData.total_grievous)}</span>
    </div>
    <div class="detail-metric">
      <span class="detail-metric-label">Fatal + Grievous</span>
      <span class="detail-metric-value">${formatNumber(stateData.total_fg)}</span>
    </div>
    <div class="detail-metric">
      <span class="detail-metric-label">Blackspots</span>
      <span class="detail-metric-value">${formatNumber(stateData.blackspots)}</span>
    </div>
    <div class="detail-metric">
      <span class="detail-metric-label">Corridors</span>
      <span class="detail-metric-value">${formatNumber(stateData.corridors)}</span>
    </div>
    <div class="detail-metric">
      <span class="detail-metric-label">F&G Covered</span>
      <span class="detail-metric-value">${formatNumber(stateData.fg_covered)}</span>
    </div>
  </div>`;

  // Spot Distribution
  html += buildMiniBarSection('Blackspot Distribution (Crashes)', stateData.spot_distribution, '#2196f3');

  // Traffic Violations
  html += buildDataListSection('Top Traffic Violations', stateData.violations, '#e53935');

  // Crash Types
  html += buildDataListSection('Top Crash Types', stateData.crash_types, '#ff9800');

  // Crash Natures
  html += buildDataListSection('Top Crash Natures', stateData.crash_natures, '#7b1fa2');

  body.innerHTML = html;

  // Show panel
  document.getElementById('view-analytics').className = 'panel-view slide-left';
  document.getElementById('view-state-detail').className = 'panel-view active';
  document.getElementById('view-districts').className = 'panel-view slide-right';
}

// ===== Build Mini Bar Section =====
function buildMiniBarSection(title, rows, color) {
  if (!rows || rows.length === 0) return '';
  const maxVal = Math.max(...rows.map(r => r.value));
  let html = `<div class="detail-section">
    <div class="detail-section-title">${title}</div>`;
  rows.forEach(r => {
    const pct = maxVal > 0 ? (r.value / maxVal) * 100 : 0;
    html += `<div class="mini-bar-row">
      <span class="mini-bar-label">${r.label}</span>
      <div class="mini-bar-track">
        <div class="mini-bar-fill" style="width:${pct}%;background:${color}"></div>
      </div>
      <span class="mini-bar-value">${formatNumber(r.value)}</span>
    </div>`;
  });
  html += '</div>';
  return html;
}

// ===== Build Data List Section =====
function buildDataListSection(title, items, accentColor) {
  if (!items || items.length === 0) return '';
  let html = `<div class="detail-section">
    <div class="detail-section-title">${title}</div>`;
  items.forEach(item => {
    html += `<div class="data-list-item">
      <div class="data-list-bar-track">
        <div class="data-list-bar-fill" style="width:${item.pct}%;background:${accentColor}20;border-left:3px solid ${accentColor}"></div>
      </div>
      <div class="data-list-info">
        <span class="data-list-name">${item.name}</span>
        <span class="data-list-stats">${formatNumber(item.count)} <span class="data-list-pct">(${item.pct}%)</span></span>
      </div>
    </div>`;
  });
  html += '</div>';
  return html;
}

// ===== Pincode data (lazy loaded) =====
let pincodesData = null;
let pincodesLoadPromise = null;
let selectedDistrictName = null;

function ensurePincodesLoaded() {
  if (pincodesData) return Promise.resolve(pincodesData);
  if (!pincodesLoadPromise) {
    console.log('[Map] Lazy-loading INDIAN_PINCODE_BOUNDARY.geojson...');
    pincodesLoadPromise = fetch('data/INDIAN_PINCODE_BOUNDARY.geojson')
      .then(res => res.json())
      .then(data => { pincodesData = data; console.log('[Map] Loaded pincodes:', data.features?.length); return data; })
      .catch(err => { console.error('Failed to load pincodes', err); pincodesLoadPromise = null; return null; });
  }
  return pincodesLoadPromise;
}

// ===== Open State Map View (drill into districts) =====
function openStateMapView(stateName) {
  if (!stateName || !districtsData) return;
  viewLevel = 'state';
  selectedStateName = stateName;
  selectedDistrictName = null;

  const filtered = (districtsData.features || []).filter(f => districtMatchesState(f.properties, stateName));
  const fc = { type: 'FeatureCollection', features: filtered };

  // Clear old layers and count labels
  clearCountMarkers();
  if (currentGeoLayer) { map.removeLayer(currentGeoLayer); currentGeoLayer = null; }

  // Random pastel colors for districts
  const colors = ['#bbdefb','#c8e6c9','#fff9c4','#f8bbd0','#d1c4e9','#b2ebf2','#ffe0b2','#dcedc8','#f0f4c3','#cfd8dc'];

  currentGeoLayer = L.geoJSON(fc, {
    style: (feature, idx) => {
      const i = filtered.indexOf(feature);
      return { color: '#455a64', weight: 1.5, fillColor: colors[i % colors.length], fillOpacity: 0.7 };
    },
    onEachFeature: (feature, layer) => {
      const dName = getDistrictName(feature?.properties || {});
      const baseStyle = () => {
        const i = filtered.indexOf(feature);
        return { color: '#455a64', weight: 1.5, fillColor: colors[i % colors.length], fillOpacity: 0.7 };
      };
      layer.on({
        mouseover: (e) => {
          layer.setStyle({ weight: 3, fillOpacity: 1 });
          layer.bindTooltip(`<div class="state-hover-card"><div class="state-card-title">${dName}</div><div class="state-card-row" style="color:#1976d2">Click for pincodes</div></div>`, { sticky: true, direction: 'top', opacity: 1, className: 'state-hover-tooltip' }).openTooltip(e.latlng);
        },
        mouseout: () => { layer.setStyle(baseStyle()); layer.closeTooltip(); },
        click: () => { openDistrictView(dName, feature); }
      });
    }
  }).addTo(map);

  if (filtered.length > 0) {
    const bounds = L.geoJSON(fc).getBounds();
    map.flyToBounds(bounds, { padding: [30, 30], maxZoom: 9, duration: 0.9, animate: true });
  }

  // Right panel: show state detail if MORTH data exists
  const mData = getMorthStateData(stateName);
  if (mData) {
    showStateDetail(mData);
  }

  updateBreadcrumb();
}

// ===== Populate District List =====
function populateDistrictList(features) {
  const container = document.getElementById('district-list');
  if (!features || features.length === 0) {
    container.innerHTML = '<div class="panel-empty">No districts found</div>';
    return;
  }
  let html = '';
  features.forEach(f => {
    const dName = getDistrictName(f?.properties || {});
    html += `<div class="panel-row district-row" onclick="openDistrictViewByName('${dName.replace(/'/g, "\\'")}')">
      <span class="col-name">${dName}</span>
      <span class="col-val" style="color:#1976d2;font-size:11px">View Pincodes →</span>
    </div>`;
  });
  container.innerHTML = html;
}

// ===== Open District View by Name (from panel click) =====
function openDistrictViewByName(districtName) {
  if (!districtsData) return;
  const feature = (districtsData.features || []).find(f =>
    getDistrictName(f.properties || {}).toLowerCase() === districtName.toLowerCase()
  );
  if (feature) openDistrictView(districtName, feature);
}

// ===== Open District View (drill into pincodes) =====
async function openDistrictView(districtName, feature) {
  viewLevel = 'district';
  selectedDistrictName = districtName;

  updateBreadcrumb();

  // Lazy load pincodes
  const pData = await ensurePincodesLoaded();
  if (!pData) {
    document.getElementById('pincode-list').innerHTML = '<div class="panel-empty">Failed to load pincode data</div>';
    return;
  }

  // Filter pincodes within district bounds
  const distLayer = L.geoJSON(feature);
  const distBounds = distLayer.getBounds();

  let filtered = (pData.features || []).filter(pf => {
    try {
      const pbounds = L.geoJSON(pf).getBounds();
      return distBounds.contains(pbounds.getCenter());
    } catch { return false; }
  });

  // Fallback: intersects
  if (!filtered.length) {
    filtered = (pData.features || []).filter(pf => {
      try { return distBounds.intersects(L.geoJSON(pf).getBounds()); }
      catch { return false; }
    });
  }

  const fc = { type: 'FeatureCollection', features: filtered };

  // Clear and render pincodes on map
  clearCountMarkers();
  if (currentGeoLayer) { map.removeLayer(currentGeoLayer); currentGeoLayer = null; }

  currentGeoLayer = L.geoJSON(fc, {
    style: () => ({ color: '#2e7d32', weight: 1, fillColor: '#c8e6c9', fillOpacity: 0.6 }),
    onEachFeature: (pFeature, layer) => {
      const pin = String(pFeature?.properties?.Pincode || '').trim();
      const office = pFeature?.properties?.Office_Name || '';
      layer.on({
        mouseover: (e) => {
          layer.setStyle({ weight: 3, fillOpacity: 1, fillColor: '#66bb6a' });
          layer.bindTooltip(`<div class="state-hover-card"><div class="state-card-title">${pin}</div><div class="state-card-row">${office}</div></div>`, { sticky: true, direction: 'top', opacity: 1, className: 'state-hover-tooltip' }).openTooltip(e.latlng);
        },
        mouseout: () => {
          layer.setStyle({ color: '#2e7d32', weight: 1, fillColor: '#c8e6c9', fillOpacity: 0.6 });
          layer.closeTooltip();
        }
      });
    }
  }).addTo(map);

  // Fly to bounds
  if (filtered.length > 0) {
    const layerBounds = L.geoJSON(fc).getBounds();
    map.flyToBounds(layerBounds, { padding: [20, 20], maxZoom: 18, duration: 0.9, animate: true });
  }

  // Right panel stays as-is — drill is map-only
}

// ===== Populate Pincode List =====
function populatePincodeList(features) {
  const container = document.getElementById('pincode-list');
  if (!features || features.length === 0) {
    container.innerHTML = '<div class="panel-empty">No pincodes found for this district</div>';
    return;
  }
  let html = '';
  features.forEach(f => {
    const pin = String(f.properties?.Pincode || '');
    const office = f.properties?.Office_Name || '';
    html += `<div class="panel-row pincode-row">
      <span class="col-name-red">${pin}</span>
      <span class="col-val-left">${office}</span>
    </div>`;
  });
  container.innerHTML = html;
}

// ===== Panel View Switching =====
function showAnalytics() {
  document.getElementById('view-analytics').className = 'panel-view active';
  document.getElementById('view-state-detail').className = 'panel-view slide-right';
  document.getElementById('view-districts').className = 'panel-view slide-right';
  document.getElementById('view-pincodes').className = 'panel-view slide-right';
}

function showDistricts() {
  document.getElementById('view-analytics').className = 'panel-view slide-left';
  document.getElementById('view-state-detail').className = 'panel-view slide-left';
  document.getElementById('view-districts').className = 'panel-view active';
  document.getElementById('view-pincodes').className = 'panel-view slide-right';
}

function showPincodes() {
  document.getElementById('view-analytics').className = 'panel-view slide-left';
  document.getElementById('view-state-detail').className = 'panel-view slide-left';
  document.getElementById('view-districts').className = 'panel-view slide-left';
  document.getElementById('view-pincodes').className = 'panel-view active';
}

// ===== Breadcrumb Update =====
function updateBreadcrumb() {
  const bc = document.getElementById('breadcrumb');
  let html = '<span class="breadcrumb-item breadcrumb-india" onclick="resetToCountry()">India</span>';
  if ((viewLevel === 'state' || viewLevel === 'district') && selectedStateName) {
    html += `<span class="breadcrumb-item breadcrumb-state" onclick="openStateMapView('${selectedStateName.replace(/'/g, "\\'")}')">&rsaquo; ${selectedStateName}</span>`;
  }
  if (viewLevel === 'district' && selectedDistrictName) {
    html += `<span class="breadcrumb-item breadcrumb-district">&rsaquo; ${selectedDistrictName}</span>`;
  }
  bc.innerHTML = html;
}

// ===== Reset to Country =====
function resetToCountry() {
  if (!statesData) return;
  viewLevel = 'country';
  selectedStateName = null;
  selectedDistrictName = null;

  renderGeoJSON(statesData, onEachStateFeature);
  map.flyTo([22.9734, 78.6569], 4, { duration: 0.8, animate: true });

  showAnalytics();
  updateBreadcrumb();
}

// ===== Populate State Summary Table =====
function populateStateSummary() {
  const container = document.getElementById('state-summary-list');
  let html = `<div class="analytics-table-header analytics-5col">
    <span>State</span>
    <span class="col-right">Accidents</span>
    <span class="col-right">Fatal</span>
    <span class="col-right">Grievous</span>
    <span class="col-right">Corridors</span>
  </div>`;

  MORTH_DATA.states.forEach(s => {
    html += `<div class="analytics-row analytics-5col" onclick="openStateMapView('${s.name}')">
      <span class="col-name">${s.name}</span>
      <span class="col-val">${formatNumber(s.fg_covered)}</span>
      <span class="col-val red-text">${formatNumber(s.total_fatalities)}</span>
      <span class="col-val orange-text">${formatNumber(s.total_grievous)}</span>
      <span class="col-val">${formatNumber(s.corridors)}</span>
    </div>`;
  });

  container.innerHTML = html;
}

function showStateDetailByName(name) {
  const data = STATE_DATA_MAP[name.toLowerCase()];
  if (data) showStateDetail(data);
}

// ===== Populate Agency Table =====
function populateAgencyTable() {
  const tbody = document.getElementById('agency-tbody');
  let html = '';
  MORTH_DATA.agencies.forEach(a => {
    html += `<tr>
      <td class="col-left agency-name">${a.name}</td>
      <td>${a.length}</td>
      <td>${a.corridors}</td>
      <td>${a.accidents}</td>
      <td class="red-text">${a.fatalities}</td>
    </tr>`;
  });
  tbody.innerHTML = html;
}

// ===== Populate Rankings =====
function populateRankings() {
  MORTH_DATA.rankings.forEach((section, idx) => {
    const ids = ['ranking-nh-length', 'ranking-nh-fg', 'ranking-district-fg'];
    const icons = ['route', 'warning', 'location_city'];
    const colors = ['#2196f3', '#e53935', '#ff9800'];
    const container = document.getElementById(ids[idx]);
    if (!container) return;

    let html = `<div class="section-header">
      <span class="material-icons-outlined" style="color:${colors[idx]}">${icons[idx]}</span>
      <span>${section.title}</span>
    </div>
    <div class="section-body ranking-list">`;

    section.rows.forEach((r, i) => {
      const medals = ['gold', 'silver', 'bronze'];
      html += `<div class="ranking-item">
        <span class="ranking-badge ${medals[i]}">${i + 1}</span>
        <span class="ranking-name">${r.name}</span>
        <span class="ranking-value">${r.value}</span>
      </div>`;
    });

    html += '</div>';
    container.innerHTML = html;
  });
}

// ===== Populate Bar Charts =====
function populateBarCharts() {
  const ids = ['bar-crashes', 'bar-fatalities'];
  const colors = ['#2196f3', '#e53935'];

  MORTH_DATA.bars.forEach((section, idx) => {
    const container = document.getElementById(ids[idx]);
    if (!container) return;
    const maxVal = Math.max(...section.rows.map(r => r.value));

    let html = `<div class="section-header">
      <span class="material-icons-outlined" style="color:${colors[idx]}">equalizer</span>
      <span>${section.title}</span>
    </div>
    <div class="section-body">`;

    section.rows.forEach(r => {
      const pct = maxVal > 0 ? (r.value / maxVal) * 100 : 0;
      html += `<div class="bar-chart-row">
        <span class="bar-chart-label">${r.label}</span>
        <div class="bar-chart-track">
          <div class="bar-chart-fill" style="width:${pct}%;background:${colors[idx]}"></div>
        </div>
        <span class="bar-chart-value">${formatNumber(r.value)}</span>
      </div>`;
    });

    html += '</div>';
    container.innerHTML = html;
  });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  // Create Leaflet map
  map = L.map('map', {
    center: [22.9734, 78.6569],
    zoom: 4,
    minZoom: 3,
    maxZoom: 18,
    zoomControl: false,
    attributionControl: false,
  });

  L.control.zoom({ position: 'topright' }).addTo(map);

  const loading = document.getElementById('map-loading');

  // Load states
  fetch('data/INDIA_STATES.geojson')
    .then(res => res.json())
    .then(data => {
      statesData = data;
      renderGeoJSON(data, onEachStateFeature);
      loading.classList.add('hidden');
      setTimeout(() => map.invalidateSize(), 100);
    })
    .catch(err => {
      console.error('Failed to load states', err);
      loading.innerHTML = '<span style="color:#d32f2f">Failed to load map data</span>';
    });

  // Load districts in parallel
  fetch('data/INDIA_DISTRICTS.geojson')
    .then(res => res.json())
    .then(data => {
      districtsData = data;
    })
    .catch(err => console.error('Failed to load districts', err));

  // Populate all MORTH data sections
  populateStateSummary();
  populateAgencyTable();
  populateRankings();
  populateBarCharts();

  // Handle window resize
  window.addEventListener('resize', () => {
    if (map) map.invalidateSize();
  });
});
