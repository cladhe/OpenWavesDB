# Contributing to OpenWavesDB

Thanks for wanting to help. OpenWavesDB has two sides: the **frequency database** (`database-*.js`) and the **website** that browses it (`index.html`, `styles.css`). Both need contributors, and the two are covered separately below.

Please also read the [Code of Conduct](CODE_OF_CONDUCT.md); it applies to everything below.

All contributions are reviewed manually before being merged. Nothing is auto-merged, so please allow some time for a response.

## Ways to contribute

- **Report a problem.** Wrong frequency, wrong station name, a frequency that's gone silent or been reassigned, a missing entry, a website bug: [open an issue](https://github.com/cladhe/OpenWavesDB/issues).
- **Submit a pull request.** Fixes, new data, or code changes are all welcome; see the guidelines below before opening one.
- **Expand frequency coverage** (database side). Add a country, region, or band that isn't covered yet, or fill in gaps in what's already there.
- **Help with frequency maintenance** (database side). Existing entries need periodic re-checking: stations go silent, get reassigned, or move frequency. Confirming an entry is still accurate is just as valuable as adding a new one.
- **Improve the website** (website side). Layout, search/filtering, accessibility, mobile behavior, anything about how the data is browsed rather than the data itself.

## Database contributions (frequency data)

### Reporting a frequency problem

When you open an issue about a frequency, please include what you can of:

- The band (Shortwave / Longwave / Mediumwave / FM / Airband) and the exact frequency
- The station or facility name as currently listed
- What's wrong: inactive, wrong frequency, wrong schedule, wrong class/service, duplicate, or missing entirely
- How you know: a source, a personal reception report, a date you checked

Even a quick "I tuned to this and there's nothing there anymore" is useful. If you have a source confirming the change (an updated AIP/register entry, an official announcement, etc.), linking it speeds things up a lot.

### Adding or changing frequency data

This project cares a lot about where data comes from (see any band's footer text on the site for examples of the sourcing detail expected). When adding or changing data:

- **Cite a real source.** Prefer official regulator/authority registers (e.g. an aviation authority's AIP, a broadcast regulator's transmitter database) or a clearly and permissively licensed public dataset (e.g. public domain or a permissive open license). Say in your PR description exactly where the data came from, including a date or edition/cycle if the source has one.
- **Don't guess.** If a source doesn't confirm something (a schedule, a class, a language), leave it out or mark it unknown rather than filling in a plausible-looking value.
- **Don't substitute a lower-provenance source for a gated one.** If a country's official source is paywalled or login-gated, it's better to leave that country out than to quietly reuse a secondhand or crowd-sourced copy of it; that can carry real copyright/database-right risk. Flag the situation in your PR or issue instead.
- **Note what's excluded and why**, the same way the existing footer texts do (out-of-band frequencies, unconfirmed schedules, etc.); a short note is enough.
- **Match the existing row shape** for the band you're editing (see the relevant `database-*.js` file) rather than inventing a new field.

## Website contributions (the site itself)

This is a plain static site: no build step, no framework, no `package.json`. `index.html` and `styles.css` are hand-written. If you're changing the UI, search/filter behavior, layout, or anything else about how the site presents the data, that's a website-side contribution and doesn't need to touch any `database-*.js` file.

## Pull requests

- Keep database and website changes in separate PRs where practical; they review independently and one shouldn't block the other.
- Keep PRs scoped to one thing (one country, one fix, one feature); easier to review, easier to revert if something's wrong.
- Describe the source and scope of any data change in the PR description, not just in a commit message.
- Small, focused PRs get reviewed faster than large ones bundling unrelated changes.
- All PRs go through manual review before merging (see the note at the top of this file).

## Questions

Not sure whether something's worth a PR or an issue first? Open an issue; happy to talk it through before you put in the work.
