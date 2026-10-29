# GIMPLab — Online Photo Editor

A browser image editor for a PBL and semester project, based on [PhotoCraft](https://github.com/storytold/photocraft).

**Website:** https://gimplab.web.app · **Source:** https://github.com/ChiRepo/Online-Photo-Editor · **Credits:** https://gimplab.web.app/credits.html

## What this project contains

The `main` branch contains a Rust engine and egui interface compiled to WebAssembly. GIMPLab adds web branding, an original camera icon, Firebase Hosting configuration, and restrictive cloud-data rules. The separate `nextjs-version` branch is not part of this deployment workflow.

Open local images, edit them with the available tools, and export downloads. The application has no implemented account or cloud-saving workflow. Upstream is early alpha; not every tool, file format, browser, or large image has been validated for this fork.

## Run locally without rebuilding

Prerequisite: Python 3. From the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist/web
```

Open http://127.0.0.1:8765/. Stop with Ctrl+C. The checked-in `dist/web` snapshot contains the compiled editor.

## Build after source changes

Install Rust 1.95+, the wasm32 target, Trunk, and Python 3. The initial build was tested with Rust 1.99.0 and Trunk 0.21.14.

```sh
rustup target add wasm32-unknown-unknown
cd apps/photocraft-web
env -u NO_COLOR trunk build --release
cd ../..
python3 scripts/prepare-gimplab-web.py
```

Run the local preview and test import, editing, and export before publishing. See [development](docs/GIMPLAB-DEVELOPMENT.md) for the code map and checks.

## Deploy

Prerequisites: Firebase CLI and a signed-in account with access to `gimplab`.

```sh
firebase login
firebase deploy --only hosting --project gimplab
```

See [deployment](docs/GIMPLAB-DEPLOYMENT.md) for rule deployment, verification, and rollback. See [project status](PROJECT-STATUS.md) for validation scope and [changelog](CHANGELOG.md) for maintenance history.

## Attribution

The editing engine is PhotoCraft by the ArtCraft team and contributors, licensed under MIT OR Apache-2.0. GIMPLab is an independent modified project. Preserve LICENSE-MIT, LICENSE-APACHE, NOTICE, and ATTRIBUTION.md. Original assets retain their licenses. Imported documentation under docs/ describes the upstream baseline unless marked otherwise; upstream feature and parity claims are not fresh GIMPLab test results.
