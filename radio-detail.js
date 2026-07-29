// Pure, DOM-free helpers for the frequency detail modal and the mobile column
// whitelist. Loaded via <script src="radio-detail.js"> in the browser
// (functions become globals, same as the database-*.js files) and via
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

// Where a bounded (non-24h, non-variable) schedule stands right now, in UTC minutes-of-day.
// Handles schedules that wrap past midnight (e.g. start 1950, end 1800) the same way
// isActiveNow() does elsewhere in the page: "on" runs from start for `duration` minutes,
// wrapping into the next day if end <= start.
function computeScheduleStatus(nowMinutes, startMinutes, endMinutes) {
  const DAY = 1440;
  const duration = (((endMinutes - startMinutes) % DAY) + DAY) % DAY || DAY;
  const elapsed = (((nowMinutes - startMinutes) % DAY) + DAY) % DAY;
  if (elapsed < duration) {
    return { state: 'on', minutesSinceStart: elapsed, minutesUntilEnd: duration - elapsed, progress: elapsed / duration };
  }
  return { state: 'off', minutesUntilStart: DAY - elapsed };
}

function formatDuration(totalMinutes) {
  const m = Math.max(0, Math.round(totalMinutes));
  const h = Math.floor(m / 60);
  const mm = m % 60;
  if (h === 0) return `${mm}min`;
  if (mm === 0) return `${h}h`;
  return `${h}h ${mm}min`;
}

// Moves `item` to the front of `list` (adding it if it isn't already present), dedup'd by
// `keyFn`, and caps the result at `maxLen`. Used for the recent-airport-searches list: searching
// the same airport again just brings its existing entry back to the top instead of duplicating it.
function upsertMostRecent(list, item, keyFn, maxLen) {
  const key = keyFn(item);
  const filtered = list.filter(x => keyFn(x) !== key);
  filtered.unshift(item);
  if (filtered.length > maxLen) filtered.length = maxLen;
  return filtered;
}

function removeByKey(list, key, keyFn) {
  return list.filter(x => keyFn(x) !== key);
}

// Add/remove toggle keyed by `keyFn`: if an item with the same key is already in `list`, it's
// removed (toggled off); otherwise `item` is appended (toggled on). Used for starring/unstarring
// a frequency from its detail view.
function toggleInList(list, item, keyFn) {
  const key = keyFn(item);
  const idx = list.findIndex(x => keyFn(x) === key);
  if (idx === -1) return { list: [...list, item], added: true };
  const next = list.slice();
  next.splice(idx, 1);
  return { list: next, added: false };
}

if (typeof module !== 'undefined') {
  module.exports = {
    formatSchedule, lookupClassDef, renderClassDefs, buildDescription, computeMobileHiddenColumns,
    computeScheduleStatus, formatDuration, upsertMostRecent, removeByKey, toggleInList,
  };
}
