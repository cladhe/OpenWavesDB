// frequency-search.js
// Prefix search over the generated frequency-index.js (scripts/build-frequency-pages.js). Pure
// and DOM-free so it's directly testable; index.html's renderIdentifyTable() is a thin wrapper
// that calls this and renders the result to the DOM.
function filterFrequencyIndex(index, query, minLength = 3) {
  const q = String(query).trim();
  if (q.length < minLength) return [];
  return index
    .filter(entry => String(entry.freq).startsWith(q))
    .sort((a, b) => a.freq - b.freq || a.bandId.localeCompare(b.bandId));
}

if (typeof module !== 'undefined') {
  module.exports = { filterFrequencyIndex };
}
