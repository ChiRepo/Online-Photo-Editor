# GIMPLab deployment

## Target

Firebase project and Hosting site: `gimplab`. Website: https://gimplab.web.app. Static root: `dist/web`, configured by firebase.json. This workflow publishes the Rust/WebAssembly `main` branch.

## Prepare

For a source change, build with Trunk using README.md, then run:

```sh
python3 scripts/prepare-gimplab-web.py
```

Review `git diff`, check that HTML references existing hashed JavaScript/Wasm assets, and test locally. The repository intentionally tracks the compiled snapshot so a documentation-only maintenance release can redeploy it without a Rust rebuild.

## Publish

```sh
firebase login
firebase deploy --only hosting --project gimplab
```

Use the explicit project flag to avoid deploying to another project in the signed-in account. The CLI account needs deployment permission; the public Firebase web configuration does not grant it. Do not commit CLI credentials, service-account keys, or `.firebase` state.

## Rules

The current app edits local files. `firestore.rules` denies all client reads and writes. Deploy changed Firestore rules separately when authorized:

```sh
firebase deploy --only firestore:rules --project gimplab
```

`storage.rules` is a dormant deny-all template and is not wired into firebase.json. Storage was unprovisioned at the initial setup; recheck provisioning before changing it. Do not provision a bucket, enable billing, or open rules as a hosting prerequisite. Authentication and cloud saving are not implemented.

## Verify and recover

Confirm the CLI reports a successful release. Request `/`, `/credits.html`, and the actual hashed `.wasm` path from index.html. HTML must return 200 with `no-cache`; Wasm must return 200 with `application/wasm` and immutable caching. Open the site in a browser and run the smoke test from the development guide after source changes.

Firebase Hosting console release history supports rolling back to a prior release. A Git rollback requires redeploying the corresponding compiled `dist/web` snapshot; editing Rust source alone does not change the hosted binary.

Hosting assets are public. Visitor-selected images stay on their device in the existing workflow. Treat imported files as untrusted input; the upstream editor remains alpha.
