// ===== MORTH Dashboard - Map with Drill-down =====
// India → States → Districts → Pincodes

// ===== State =====
let map = null;
let statesData = null;
let districtsData = null;
let pincodesData = null;
let currentGeoLayer = null;
let viewLevel = 'country';   // 'country' | 'state' | 'district'
let selectedStateName = null;
let selectedDistrictName = null;
let pincodesLoadPromise = null;

// Demo stat card data (random per state for demonstration)
const demoStats = {};

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

// ===== Color Helpers =====
function lerpColor(c1, c2, t) {
  const hex = (c) => parseInt(c.slice(1), 16);
  const r1 = (hex(c1) >> 16) & 255, g1 = (hex(c1) >> 8) & 255, b1 = hex(c1) & 255;
  const r2 = (hex(c2) >> 16) & 255, g2 = (hex(c2) >> 8) & 255, b2 = hex(c2) & 255;
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getColorByCompletion(done, total) {
  if (!total || total === 0) return '#e0e0e0';
  const pct = Math.max(0, Math.min(100, (done / total) * 100));
  if (pct < 70) return lerpColor('#F44336', '#FF9800', pct / 70);
  if (pct < 80) return lerpColor('#FF9800', '#FFC107', (pct - 70) / 10);
  if (pct < 90) return lerpColor('#FFC107', '#8BC34A', (pct - 80) / 10);
  return lerpColor('#8BC34A', '#2E7D32', (pct - 90) / 10);
}

// ===== Generate Demo Stats for a Region =====
function generateDemoStatsForFeatures(features, nameExtractor) {
  const stats = {};
  features.forEach(f => {
    const name = nameExtractor(f);
    const total = Math.floor(Math.random() * 500) + 50;
    const completed = Math.floor(Math.random() * total);
    const pending = total - completed;
    const pct = total > 0 ? ((completed / total) * 100).toFixed(1) : '0.0';
    stats[name.toLowerCase()] = { name, total, completed, pending, pct };
  });
  return stats;
}

// ===== Update Stat Cards =====
function updateStatCards(stats) {
  let totalProjects = 0, totalCompleted = 0, totalPending = 0, totalLength = 0;
  Object.values(stats).forEach(s => {
    totalProjects += s.total;
    totalCompleted += s.completed;
    totalPending += s.pending;
    totalLength += Math.floor(s.total * 2.3);
  });
  document.getElementById('card-total').textContent = formatNumber(totalProjects);
  document.getElementById('card-completed').textContent = formatNumber(totalCompleted);
  document.getElementById('card-progress').textContent = formatNumber(totalPending);
  document.getElementById('card-length').textContent = formatNumber(totalLength);
}

// ===== Build Hover Tooltip =====
function buildHoverTooltip(title, stats) {
  const { total = '-', completed = '-', pending = '-', pct = '-' } = stats || {};
  return `
    <div class="state-hover-card">
      <div class="state-card-title">${title}</div>
      <div class="state-card-row">Total: ${total !== '-' ? formatNumber(total) : '-'}</div>
      <div class="state-card-row">Completed: ${completed !== '-' ? formatNumber(completed) : '-'}</div>
      <div class="state-card-row">Pending: ${pending !== '-' ? formatNumber(pending) : '-'}</div>
      <div class="state-card-row">Completion: ${pct}%</div>
    </div>
  `;
}

// ===== Get Feature Style =====
function getFeatureStyle(feature, stats) {
  const props = feature?.properties || {};
  let name = '';
  if (props.Pincode) {
    name = String(props.Pincode).trim();
  } else if (viewLevel === 'state' || viewLevel === 'district') {
    name = getDistrictName(props);
  } else {
    name = getStateName(feature);
  }
  const s = stats[name.toLowerCase()];
  const fillColor = s ? getColorByCompletion(s.completed, s.total) : '#e0e0e0';
  return {
    color: '#455a64',
    weight: 1,
    fillColor: fillColor,
    fillOpacity: 0.95,
  };
}

// ===== Render GeoJSON on Map =====
function renderGeoJSON(geojsonData, stats, onEachFeature) {
  if (currentGeoLayer) {
    map.removeLayer(currentGeoLayer);
    currentGeoLayer = null;
  }
  currentGeoLayer = L.geoJSON(geojsonData, {
    style: (feature) => getFeatureStyle(feature, stats),
    onEachFeature: onEachFeature,
  }).addTo(map);
  return currentGeoLayer;
}

// ===== On Each State Feature =====
function onEachStateFeature(feature, layer) {
  const stateName = getStateName(feature);
  const stats = demoStats.country?.[stateName.toLowerCase()] || {};
  layer.on({
    mouseover: (e) => {
      layer.setStyle({ weight: 3, fillOpacity: 1 });
      const content = buildHoverTooltip(stateName, stats);
      layer.bindTooltip(content, { sticky: true, direction: 'top', opacity: 1, className: 'state-hover-tooltip' }).openTooltip(e.latlng);
    },
    mouseout: () => {
      layer.setStyle(getFeatureStyle(feature, demoStats.country || {}));
      layer.closeTooltip();
    },
    click: () => {
      openStateView(stateName);
    }
  });
}

// ===== On Each District Feature =====
function onEachDistrictFeature(feature, layer) {
  const districtName = getDistrictName(feature?.properties || {});
  const stats = demoStats.state?.[districtName.toLowerCase()] || {};
  layer.on({
    mouseover: (e) => {
      layer.setStyle({ weight: 3, fillOpacity: 1 });
      const content = buildHoverTooltip(districtName, stats);
      layer.bindTooltip(content, { sticky: true, direction: 'top', opacity: 1, className: 'state-hover-tooltip' }).openTooltip(e.latlng);
    },
    mouseout: () => {
      layer.setStyle(getFeatureStyle(feature, demoStats.state || {}));
      layer.closeTooltip();
    },
    click: () => {
      openDistrictView(districtName, feature);
    }
  });
}

// ===== On Each Pincode Feature =====
function onEachPincodeFeature(feature, layer) {
  const pin = String(feature?.properties?.Pincode || '').trim();
  const officeName = feature?.properties?.Office_Name || '';
  const stats = demoStats.district?.[pin.toLowerCase()] || {};
  layer.on({
    mouseover: (e) => {
      layer.setStyle({ weight: 3, fillOpacity: 1 });
      const content = buildHoverTooltip(pin + ' ' + officeName, stats);
      layer.bindTooltip(content, { sticky: true, direction: 'top', opacity: 1, className: 'state-hover-tooltip' }).openTooltip(e.latlng);
    },
    mouseout: () => {
      layer.setStyle(getFeatureStyle(feature, demoStats.district || {}));
      layer.closeTooltip();
    }
  });
}

// ===== Breadcrumb Update =====
function updateBreadcrumb() {
  const bc = document.getElementById('breadcrumb');
  let html = '<span class="breadcrumb-item breadcrumb-india" onclick="resetToCountry()">India</span>';
  if (viewLevel === 'state' || viewLevel === 'district') {
    html += `<span class="breadcrumb-item breadcrumb-state" onclick="openStateView('${selectedStateName}')"> &rsaquo; ${selectedStateName}</span>`;
  }
  if (viewLevel === 'district' && selectedDistrictName) {
    html += `<span class="breadcrumb-item breadcrumb-district"> &rsaquo; ${selectedDistrictName} (Pincodes)</span>`;
  }
  bc.innerHTML = html;
}

// ===== Panel View Switching =====
function showAnalytics() {
  document.getElementById('view-analytics').className = 'panel-view active';
  document.getElementById('view-districts').className = 'panel-view slide-right';
  document.getElementById('view-pincodes').className = 'panel-view slide-right';
}

function showDistricts() {
  document.getElementById('view-analytics').className = 'panel-view slide-left';
  document.getElementById('view-districts').className = 'panel-view active';
  document.getElementById('view-pincodes').className = 'panel-view slide-right';
}

function showPincodes() {
  document.getElementById('view-analytics').className = 'panel-view slide-left';
  document.getElementById('view-districts').className = 'panel-view slide-left';
  document.getElementById('view-pincodes').className = 'panel-view active';
}

// ===== Populate Analytics (State Summary) =====
function populateAnalytics(stats) {
  const container = document.getElementById('state-summary-list');
  const entries = Object.values(stats).sort((a, b) => b.total - a.total);
  if (entries.length === 0) {
    container.innerHTML = '<div class="analytics-placeholder">No data available</div>';
    return;
  }
  let html = `<div class="analytics-table-header">
    <span>State Name</span>
    <span class="col-right">Total</span>
    <span class="col-right">Completed</span>
    <span class="col-right">Completion %</span>
  </div>`;
  entries.forEach(s => {
    html += `<div class="analytics-row" onclick="openStateView('${s.name.replace(/'/g, "\\'")}')">
      <span class="col-name">${s.name}</span>
      <span class="col-val">${formatNumber(s.total)}</span>
      <span class="col-val">${formatNumber(s.completed)}</span>
      <span class="col-val">${s.pct}%</span>
    </div>`;
  });
  container.innerHTML = html;
}

// ===== Populate District List =====
function populateDistrictList(stats) {
  const container = document.getElementById('district-list');
  const entries = Object.values(stats).sort((a, b) => b.total - a.total);
  if (entries.length === 0) {
    container.innerHTML = '<div class="panel-empty">No districts found</div>';
    return;
  }
  let html = '';
  entries.forEach(s => {
    html += `<div class="panel-row district-grid" onclick="openDistrictViewByName('${s.name.replace(/'/g, "\\'")}')">
      <span class="col-name">${s.name}</span>
      <span class="col-val">${formatNumber(s.total)}</span>
      <span class="col-val-warn">${formatNumber(s.pending)}</span>
      <span class="col-val">${s.pct}%</span>
    </div>`;
  });
  container.innerHTML = html;
}

// ===== Populate Pincode List =====
function populatePincodeList(features, stats) {
  const container = document.getElementById('pincode-list');
  if (!features || features.length === 0) {
    container.innerHTML = '<div class="panel-empty">No pincodes found for this district</div>';
    return;
  }
  let html = '';
  features.forEach(f => {
    const pin = String(f.properties?.Pincode || '');
    const office = f.properties?.Office_Name || '';
    const s = stats[pin.toLowerCase()] || { total: 0, pending: 0, pct: '0.0' };
    html += `<div class="panel-row pincode-grid">
      <span class="col-name-red">${pin}</span>
      <span class="col-val-left">${office}</span>
      <span class="col-val">${formatNumber(s.total)}</span>
      <span class="col-val-warn">${formatNumber(s.pending)}</span>
      <span class="col-val">${s.pct}%</span>
    </div>`;
  });
  container.innerHTML = html;
}

// ===== Open State View =====
function openStateView(stateName) {
  if (!stateName || !districtsData) return;
  viewLevel = 'state';
  selectedStateName = stateName;
  selectedDistrictName = null;

  // Filter districts for this state
  const filtered = (districtsData.features || []).filter(f => districtMatchesState(f.properties, stateName));
  const fc = { type: 'FeatureCollection', features: filtered };

  // Generate demo stats for districts
  demoStats.state = generateDemoStatsForFeatures(filtered, f => getDistrictName(f.properties || {}));

  // Render
  renderGeoJSON(fc, demoStats.state, onEachDistrictFeature);

  // Fly to bounds
  if (filtered.length > 0) {
    const bounds = L.geoJSON(fc).getBounds();
    map.flyToBounds(bounds, { padding: [30, 30], maxZoom: 9, duration: 0.9, animate: true });
  }

  // Update UI
  document.getElementById('district-panel-title').textContent = `Districts in ${stateName}`;
  populateDistrictList(demoStats.state);
  showDistricts();
  updateBreadcrumb();
  updateStatCards(demoStats.state);
}

// ===== Open District View by Name (from panel click) =====
function openDistrictViewByName(districtName) {
  if (!districtsData) return;
  const feature = (districtsData.features || []).find(f =>
    getDistrictName(f.properties || {}).toLowerCase() === districtName.toLowerCase()
  );
  if (feature) {
    openDistrictView(districtName, feature);
  }
}

// ===== Ensure Pincodes Loaded =====
function ensurePincodesLoaded() {
  if (pincodesData) return Promise.resolve(pincodesData);
  if (!pincodesLoadPromise) {
    console.log('[Map] Lazy-loading INDIAN_PINCODE_BOUNDARY.geojson...');
    pincodesLoadPromise = fetch('data/INDIAN_PINCODE_BOUNDARY.geojson')
      .then(res => res.json())
      .then(data => {
        pincodesData = data;
        console.log('[Map] Loaded pincodes:', data.features?.length || 0, 'features');
        return data;
      })
      .catch(err => {
        console.error('Failed to load pincodes', err);
        pincodesLoadPromise = null;
        return null;
      });
  }
  return pincodesLoadPromise;
}

// ===== Open District View (drill into pincodes) =====
async function openDistrictView(districtName, feature) {
  viewLevel = 'district';
  selectedDistrictName = districtName;

  // Show loading state on pincode panel
  document.getElementById('pincode-panel-title').textContent = `Pincodes in ${districtName}`;
  document.getElementById('pincode-list').innerHTML = '<div class="panel-empty"><div class="spinner" style="margin:0 auto 8px;width:24px;height:24px;"></div>Loading pincodes...</div>';
  showPincodes();
  updateBreadcrumb();

  // Lazy load pincodes
  const pData = await ensurePincodesLoaded();
  if (!pData) {
    document.getElementById('pincode-list').innerHTML = '<div class="panel-empty">Failed to load pincode data</div>';
    return;
  }

  // Filter pincodes that fall within district bounds
  const distLayer = L.geoJSON(feature);
  const distBounds = distLayer.getBounds();

  let filtered = (pData.features || []).filter(pf => {
    try {
      const pbounds = L.geoJSON(pf).getBounds();
      const center = pbounds.getCenter();
      return distBounds.contains(center);
    } catch { return false; }
  });

  // Fallback: intersects
  if (!filtered.length) {
    filtered = (pData.features || []).filter(pf => {
      try {
        return distBounds.intersects(L.geoJSON(pf).getBounds());
      } catch { return false; }
    });
  }

  const fc = { type: 'FeatureCollection', features: filtered };

  // Generate demo stats for pincodes
  demoStats.district = {};
  filtered.forEach(f => {
    const pin = String(f.properties?.Pincode || '').trim();
    const total = Math.floor(Math.random() * 100) + 10;
    const completed = Math.floor(Math.random() * total);
    demoStats.district[pin.toLowerCase()] = {
      name: pin,
      total,
      completed,
      pending: total - completed,
      pct: total > 0 ? ((completed / total) * 100).toFixed(1) : '0.0'
    };
  });

  // Render map
  renderGeoJSON(fc, demoStats.district, onEachPincodeFeature);

  // Fly to bounds
  if (filtered.length > 0) {
    const layerBounds = L.geoJSON(fc).getBounds();
    map.flyToBounds(layerBounds, { padding: [20, 20], maxZoom: 18, duration: 0.9, animate: true });
  }

  // Update panel
  populatePincodeList(filtered, demoStats.district);
  updateStatCards(demoStats.district);
}

// ===== Reset to Country =====
function resetToCountry() {
  if (!statesData) return;
  viewLevel = 'country';
  selectedStateName = null;
  selectedDistrictName = null;

  // Regenerate country stats
  demoStats.country = generateDemoStatsForFeatures(statesData.features, f => getStateName(f));

  renderGeoJSON(statesData, demoStats.country, onEachStateFeature);
  map.flyTo([22.9734, 78.6569], 4, { duration: 0.8, animate: true });

  // Update UI
  populateAnalytics(demoStats.country);
  showAnalytics();
  updateBreadcrumb();
  updateStatCards(demoStats.country);
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

  // Load states first
  fetch('data/INDIA_STATES.geojson')
    .then(res => res.json())
    .then(data => {
      statesData = data;
      console.log('[Map] Loaded states:', data.features?.length || 0);

      // Generate demo stats
      demoStats.country = generateDemoStatsForFeatures(data.features, f => getStateName(f));

      // Render states on map
      renderGeoJSON(data, demoStats.country, onEachStateFeature);

      // Hide loading
      loading.classList.add('hidden');

      // Update cards & analytics
      updateStatCards(demoStats.country);
      populateAnalytics(demoStats.country);

      // Ensure map reflows
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
      console.log('[Map] Loaded districts:', data.features?.length || 0);
    })
    .catch(err => console.error('Failed to load districts', err));

  // Pincodes are lazy-loaded on first district click

  // Handle window resize
  window.addEventListener('resize', () => {
    if (map) map.invalidateSize();
  });
});
