# GIMPLab

A browser image editor for a PBL and semester project, based on [PhotoCraft](https://github.com/storytold/photocraft).

The original Rust image-processing engine is PhotoCraft by the ArtCraft team and contributors. This fork adds GIMPLab web branding, an original camera icon, Firebase Hosting configuration, and restrictive cloud-data rules. Original engine functionality and file formats are retained. This is an independent modified project.

## Build and deploy

Rust 1.95 or newer, Trunk, and Firebase CLI are required. The tested toolchain was Rust 1.99.0 with Trunk 0.21.14.

```sh
rustup target add wasm32-unknown-unknown
cd apps/photocraft-web
env -u NO_COLOR trunk build --release
cd ../..
firebase deploy --only hosting,firestore:rules --project gimplab
```

The web build is written to `dist/web`. Include LICENSE-MIT, LICENSE-APACHE, NOTICE and ATTRIBUTION.md in the published folder. The delivered deployment bundle includes these notices.

Firestore rules deny client reads and writes because the current version processes local files. Storage has not been provisioned. The storage.rules file is a dormant deny-all template; enabling cloud saving requires implementing authenticated ownership rules first.

Open local files in the browser and export edited images as downloads. No account or cloud image upload is required. This editor is based on an early-alpha upstream application; the smoke tests do not verify every tool or file format.

Upstream documentation remains under docs/. Restricted ArtCraft brand images are omitted from the distributed source archive. Original notices and credits are preserved.
