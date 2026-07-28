// Longwave frequency database, LW broadcast band (148.5–283.5 kHz)
// Longwave broadcasting has largely shut down worldwide (RTÉ Ireland ended 2023,
// BBC Radio 4 198 kHz ended Jun 26 2026). This is the small set of stations still
// verified on air, cross-checked against Wikipedia's "List of longwave radio
// broadcasters" (updated Jun 27 2026) and asiawaves.net's longwave schedule page.
const DATA_LW = [
  {freq:153, station:"Radio Algérie Chaîne 1 (Kénadsa)", site:"Algeria", lang:"Arabic", target:"—", start:"0000", end:"2400", info:"Irregular"},
  {freq:153, station:"SRR Antena Satelor (Bod)", site:"Romania", lang:"Romanian", target:"—", start:"0400", end:"2000", info:"Daily"},
  {freq:162, station:"TDF Allouis (time signal, ex-France Inter)", site:"France", lang:"—", target:"—", start:"0000", end:"2400", info:"Daily, off Tue 07:00–11:00"},
  {freq:164, station:"Mongolian Radio 1 (Khonkhor)", site:"Mongolia", lang:"Mongolian", target:"—", start:"2200", end:"1500", info:"Daily, wraps midnight"},
  {freq:171, station:"Médi 1", site:"Morocco", lang:"Arabic, French", target:"—", start:"0500", end:"2400", info:"Daily"},
  {freq:209, station:"Mongolian Radio 1 (Choibalsan)", site:"Mongolia", lang:"Mongolian", target:"—", start:"2200", end:"1500", info:"Daily, wraps midnight"},
  {freq:209, station:"Mongolian Radio 1 (Dalanzadgad)", site:"Mongolia", lang:"Mongolian", target:"—", start:"2200", end:"1500", info:"Daily, wraps midnight"},
  {freq:209, station:"Mongolian Radio 1 (Ulgii)", site:"Mongolia", lang:"Mongolian", target:"—", start:"2200", end:"1500", info:"Daily, wraps midnight"},
  {freq:225, station:"Polskie Radio Jedynka (Solec Kujawski)", site:"Poland", lang:"Polish", target:"—", start:"0000", end:"2400", info:"Daily"},
  {freq:227, station:"Mongolian Radio 1 (Altai)", site:"Mongolia", lang:"Mongolian", target:"—", start:"2200", end:"1500", info:"Daily, wraps midnight"},
  {freq:252, station:"Radio Algérie Chaîne 3 (Tipaza)", site:"Algeria", lang:"French", target:"—", start:"0000", end:"2400", info:"Daily"},
];

// The LW broadcast allocation is a single continuous band, unlike shortwave's split meter bands.
const BANDS_LW = [
  {name:"LW", lo:148.5, hi:283.5},
];
