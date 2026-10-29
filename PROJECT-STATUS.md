# GIMPLab project status

Updated: 2026-10-29.

## Current scope

- Repository: https://github.com/ChiRepo/Online-Photo-Editor, branch `main` (Rust/WebAssembly).
- Firebase project/site: `gimplab`; website: https://gimplab.web.app.
- Local files and browser exports are implemented. Accounts and cloud saving are not implemented.
- Firestore source rules deny all client reads and writes. Storage rules are a dormant template; Storage was unprovisioned at the initial setup and has not been provisioned by this maintenance task.

## Historical validation — 2026-10-12

The initial branded build passed release compilation, formatting, dependency layering, all-target code diagnostics, 24 wasm crate/feature checks, and 9 targeted icon/link/credit tests. Brave smoke testing covered startup, PNG import, brush editing, PNG export, and inspection of the saved image. Firestore rules were deployed and an anonymous read returned 403. These are historical results, not fresh testing of every feature.

## Maintenance — 2026-10-29

The existing source and compiled snapshot were already on GitHub `main` at `a431dde`. This update clarifies fork instructions, local preview, source builds, deployment, rules, and attribution. It adds a repeatable web-bundle preparation script. Rust editing behavior is unchanged and the compiled editor is reused; no fresh Rust compilation or broad browser compatibility claim is made.

Push and Hosting release results are recorded in the task completion message. See CHANGELOG.md and docs/GIMPLAB-DEPLOYMENT.md for the release procedure.
