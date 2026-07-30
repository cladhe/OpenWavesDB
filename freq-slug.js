// Encodes/decodes the `/frequency/<slug>/` URL segment. Shared between the live app
// (restoreFromUrl in index.html) and the static-page generator (scripts/build-frequency-pages.js)
// so a page's file path and the URL the app parses back can never drift apart.
function freqToSlug(freq, bandId) {
  // Full precision, not the rounded-to-1-decimal display the live table uses (renderCell's
  // `freq.toFixed(freq % 1 ? 1 : 0)`) — Airband's 8.33 kHz channel spacing means many distinct
  // real frequencies (e.g. 118.005, 118.010, 118.025) round to the same 1-decimal value, which
  // would collide on the same slug/output file. String(freq) is JS's shortest round-trippable
  // decimal form, so it stays lossless and slugToFreqBand can decode it back exactly.
  const formatted = String(freq);
  return `${formatted.replace('.', '-')}-${bandId}`;
}

function slugToFreqBand(slug, validBandIds) {
  for (const bandId of validBandIds) {
    const suffix = `-${bandId}`;
    if (!slug.endsWith(suffix)) continue;
    const numPart = slug.slice(0, slug.length - suffix.length);
    const freq = Number(numPart.replace('-', '.'));
    if (Number.isFinite(freq)) return { freq, bandId };
  }
  return null;
}

if (typeof module !== 'undefined') {
  module.exports = { freqToSlug, slugToFreqBand };
}
