// Pure, DOM-free helpers for the frequency detail modal and the mobile column
// whitelist. Loaded via <script src="scripts/lib/radio-detail.js"> in the
// browser (functions become globals, same as the database-*.js files) and via
// require() from radio-detail.test.js.

function formatSchedule(start, end) {
  if (start === "0000" && end === "2400") return "around the clock";
  if (start === end) return "on a schedule tied to local sunrise and sunset rather than a fixed clock time";
  const fmt = (hhmm) => hhmm.slice(0, 2) + ":" + hhmm.slice(2, 4);
  return `from ${fmt(start)} to ${fmt(end)} UTC`;
}

function lookupClassDef(classDefs, code) {
  if (!classDefs || !code) return null;
  return classDefs.find(d => d.code === code) || null;
}

function renderClassDefs(classDefs) {
  return classDefs.map(d => `<div><b>${d.bold}</b> ${d.label}: ${d.desc}</div>`).join('\n');
}

function buildDescription(bandType, row, opts) {
  opts = opts || {};
  const schedule = formatSchedule(row.start, row.end);
  if (bandType === 'sw' || bandType === 'lw') {
    const target = row.target && row.target !== '—' ? row.target : 'no specific target audience';
    const lang = row.lang && row.lang !== '—' ? row.lang : 'an unspecified language';
    return `${row.station} broadcasts in ${lang} to ${target}, ${schedule}.`;
  }
  if (bandType === 'mw' || bandType === 'fm') {
    const classDef = lookupClassDef(opts.classDefs, row.cls);
    if (classDef) {
      return `${row.station} is a ${classDef.bold} station (${classDef.label}). ${classDef.desc} It transmits from ${row.site}, ${schedule}.`;
    }
    return `${row.station} is a station transmitting from ${row.site}, ${schedule}.`;
  }
  if (bandType === 'airband') {
    const classDef = lookupClassDef(opts.classDefs, row.cls);
    if (classDef) {
      return `${row.station} is the ${classDef.label} (${classDef.bold}) at ${row.site}. ${classDef.desc}`;
    }
    return `${row.station} is a facility at ${row.site}, tuned by pilots and controllers rather than broadcast to listeners.`;
  }
  return `${row.station} on ${row.freq}.`;
}

function computeMobileHiddenColumns(allColumns, mobileColumns) {
  const keep = new Set(mobileColumns);
  return allColumns.filter(c => !keep.has(c));
}

if (typeof module !== 'undefined') {
  module.exports = { formatSchedule, lookupClassDef, renderClassDefs, buildDescription, computeMobileHiddenColumns };
}
