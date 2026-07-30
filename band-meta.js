// Small, hand-authored per-band metadata the Node generator (scripts/build-frequency-pages.js)
// needs and index.html's BAND_REGISTRY can't cleanly export (that object also carries UI-only
// closures like subHtml/onReady). band-meta.test.js drift-guards this against the real
// BAND_REGISTRY so a later column/lazy change in index.html doesn't silently go unnoticed here.
// `id` is the real BAND_REGISTRY id (short codes: sw/lw/mw/fm/airband) — what currentBand.id and
// applyRestoredState() actually compare against. `slugId` is the human-readable word used in
// generated /frequency/<num>-<slugId>/ URLs (freq-slug.js's freqToSlug/slugToFreqBand deal only in
// whatever string they're given — they don't know about BAND_REGISTRY's abbreviations — so callers
// must always pass slugId to freqToSlug and translate slugId back to id via BAND_META, never
// confuse the two).
const BAND_META = [
  {
    id: 'sw', slugId: 'shortwave', label: 'Shortwave', dataVar: 'DATA_SW', bandsVar: 'BANDS_SW',
    scriptSrc: 'database-shortwave.js', lazy: false,
    columns: ["freq","station","site","lang","target","start","end","info"],
    mobileColumns: ["freq","station","target"],
    freqUnit: 'kHz',
  },
  {
    id: 'lw', slugId: 'longwave', label: 'Longwave', dataVar: 'DATA_LW', bandsVar: 'BANDS_LW',
    scriptSrc: 'database-longwave.js', lazy: false,
    columns: ["freq","station","site","lang","target","start","end","info"],
    mobileColumns: ["freq","station","target"],
    freqUnit: 'kHz',
  },
  {
    id: 'mw', slugId: 'mediumwave', label: 'Mediumwave (AM)', dataVar: 'DATA_MW', bandsVar: 'BANDS_MW',
    scriptSrc: 'database-mediumwave.js', lazy: true,
    columns: ["freq","station","site","class","start","end","info"],
    mobileColumns: ["freq","station","site"],
    freqUnit: 'kHz',
  },
  {
    id: 'fm', slugId: 'fm', label: 'FM', dataVar: 'DATA_FM', bandsVar: 'BANDS_FM',
    scriptSrc: 'database-fm.js', lazy: true,
    columns: ["freq","station","site","class","start","end","info"],
    mobileColumns: ["freq","station","site"],
    freqUnit: 'MHz',
  },
  {
    id: 'airband', slugId: 'airband', label: 'Airband', dataVar: 'DATA_AIRBAND', bandsVar: 'BANDS_AIRBAND',
    scriptSrc: 'database-airband.js', lazy: true,
    columns: ["freq","station","site","class","start","end","info"],
    mobileColumns: ["freq","station","class"],
    freqUnit: 'MHz',
  },
];

if (typeof module !== 'undefined') {
  module.exports = { BAND_META };
}
