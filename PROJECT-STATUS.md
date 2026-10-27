# GIMPLab Firebase setup

Firebase project: `gimplab`
Hosting site: `gimplab`
Expected production URL: https://gimplab.web.app

## Verified cloud configuration

- Project access verified through the existing Firebase CLI login.
- Firestore `(default)` is provisioned in `asia-south1`.
- Deny-all Firestore rules compiled and were released successfully.
- Anonymous Firestore read returned HTTP 403 with PERMISSION_DENIED.
- Firebase Storage has NOT been provisioned. Its API was enabled by the attempted rule deployment, but the deployment stopped because no bucket exists. The supplied storageBucket string does not prove that a bucket exists.
- No Authentication providers, cloud image uploads, database writes, or Analytics SDK were added. The initial editor uses local files and browser downloads.

The supplied Firebase web configuration is not an administrator credential. Static Hosting and this local editor do not require Firebase JS SDK initialization. The CLI's signed-in session supplies deployment authorization.

## Source and validation

GIMPLab is deployed at https://gimplab.web.app and its startup was visually verified in Brave.

Passed checks: release WebAssembly build; formatting; dependency layering; all-target code diagnostics; wasm compatibility checks for 24 crate/feature combinations; 9 targeted icon, Help-link, and contributor-credit tests.

Browser smoke test on the same build: opened the original camera PNG, applied a brush stroke, exported a PNG, and inspected the saved output. Live HTML and Wasm returned HTTP 200; Wasm has application/wasm and immutable caching. This is a smoke test, not comprehensive validation of all upstream tools, formats, browsers, or large-image performance.

Published license notices and credits: https://gimplab.web.app/credits.html

Download GIMPLab-source.zip for the modified Rust source. GIMPLab-deployment.zip contains the compiled site and configuration for redeployment without rebuilding Rust.
