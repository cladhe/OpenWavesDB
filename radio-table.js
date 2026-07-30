// Row/cell rendering shared between the live app (index.html, loaded via <script src>) and the
// Node static-page generator (scripts/build-frequency-pages.js, loaded via require()) — the whole
// point is that both produce byte-identical table markup, so a pre-rendered frequency page's
// initial HTML and what the live app renders after hydration can never visibly differ.

const COLUMN_DEFS = {
  freq:    { label: "Freq (kHz)", sortKey: "freq" },
  station: { label: "Station", sortKey: "station" },
  site:    { label: "Transmitter / Country", sortKey: "site" },
  lang:    { label: "Language", sortKey: "lang" },
  target:  { label: "Target", sortKey: "target" },
  class:   { label: "Class", sortKey: "cls" },
  start:   { label: "Start", sortKey: "start" },
  end:     { label: "End", sortKey: "end" },
  info:    { label: "Days / Info", sortKey: "info" },
  band:    { label: "Band", sortKey: "_origBandLabel" },
};

function bandFor(freq, bands) {
  return bands.find(b => freq >= b.lo && freq <= b.hi);
}

function nowUTCMinutes() {
  const d = new Date();
  return d.getUTCHours() * 60 + d.getUTCMinutes();
}

function toMinutes(hhmm) {
  const h = parseInt(hhmm.slice(0, 2), 10);
  const m = parseInt(hhmm.slice(2, 4), 10);
  return h * 60 + m;
}

function isActiveNow(d) {
  if (d.start === d.end) return false;
  const nowM = nowUTCMinutes();
  let start = toMinutes(d.start);
  let end = toMinutes(d.end === "2400" ? "2400" : d.end);
  if (d.start === "0000" && d.end === "2400") return true;
  if (end <= start) return nowM >= start || nowM < end;
  return nowM >= start && nowM < end;
}

function isAlwaysOn(d) {
  return d.start === "0000" && d.end === "2400";
}

function formatTime(hhmm) {
  return hhmm.slice(0, 2) + ":" + hhmm.slice(2, 4);
}

// Data fields (station/site/info/etc.) come from database-*.js source files, not user input, but
// a handful of real rows contain a bare "&"/"<"/">" (e.g. info: "· <UNICOM 115.340.") — dropped
// into HTML unescaped, "<UNICOM" opens a phantom tag and corrupts the rest of the row/page. Every
// free-text field must go through this before landing in markup.
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function renderCell(colId, d, extra) {
  const hideAttr = extra.hiddenCols.has(colId) ? ' data-mobile-hide' : '';
  switch (colId) {
    case 'freq':
      // Full precision (String(), the shortest round-trippable decimal form), not a rounded
      // .toFixed(1) — Airband's 8.33 kHz channel spacing means rounding to 1 decimal collapses
      // genuinely distinct real frequencies (121.58 becoming "121.6") into the same displayed
      // number, which is actively misleading rather than just imprecise.
      return `<td class="freq ${extra.freqClass}" data-col="freq"${hideAttr}>${String(d.freq)}${extra.bandTag}${extra.dot}</td>`;
    case 'station': return `<td class="station" data-col="station"${hideAttr}>${escapeHtml(d.station)}${d.name ? `<span class="station-name">${escapeHtml(d.name)}</span>` : ''}</td>`;
    case 'site': return `<td data-col="site"${hideAttr}>${escapeHtml(d.site)}</td>`;
    case 'lang': return `<td data-col="lang"${hideAttr}><span class="tag">${escapeHtml(d.lang)}</span></td>`;
    case 'target': return `<td data-col="target"${hideAttr}>${escapeHtml(d.target)}</td>`;
    case 'class': return `<td data-col="class"${hideAttr}>${escapeHtml(d.cls)}</td>`;
    case 'start': return `<td class="time" data-col="start"${hideAttr}>${extra.noFixedSchedule ? '—' : formatTime(d.start)}</td>`;
    case 'end': return `<td class="time" data-col="end"${hideAttr}>${extra.noFixedSchedule ? '—' : formatTime(d.end)}</td>`;
    case 'info': return `<td data-col="info"${hideAttr}>${escapeHtml(d.info)}</td>`;
    case 'band': return `<td data-col="band"${hideAttr}>${escapeHtml(d._origBandLabel)}</td>`;
    default: return '<td></td>';
  }
}

function buildTableHeadHtml(columns, mobileColumns, computeMobileHiddenColumns) {
  const hidden = new Set(computeMobileHiddenColumns(columns, mobileColumns));
  return columns.map(c =>
    `<th data-key="${COLUMN_DEFS[c].sortKey}" data-col="${c}"${hidden.has(c) ? ' data-mobile-hide' : ''}>${COLUMN_DEFS[c].label}</th>`
  ).join('');
}

if (typeof module !== 'undefined') {
  module.exports = { COLUMN_DEFS, bandFor, nowUTCMinutes, toMinutes, isActiveNow, isAlwaysOn, formatTime, escapeHtml, renderCell, buildTableHeadHtml };
}
