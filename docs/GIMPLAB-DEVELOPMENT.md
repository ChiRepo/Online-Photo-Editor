# GIMPLab development

## Repository and architecture

Repository: https://github.com/ChiRepo/Online-Photo-Editor. Work on `main` for the current Rust/WebAssembly deployment. Preserve the separate `nextjs-version` branch.

- `apps/photocraft-web/index.html`: source page and loading state.
- `apps/photocraft-web/src/`: browser runner, import and export platform services.
- `crates/ui-egui/src/`: interface, dialogs, menus, themes, and translations.
- `crates/engine/`: command registry and editing sessions.
- `crates/io/`, `crates/codecs/`, `crates/doc/`: formats, codecs, document model.
- `assets/gimplab-icon.png`: fork icon.
- `packaging/web/gimplab/credits.html`: fork credits template.
- `scripts/prepare-gimplab-web.py`: prepare a rebuilt web bundle for publication.
- `dist/web/`: tracked deployable snapshot, not proof that later Rust changes have been built.
- `firebase.json`, `.firebaserc`, `firestore.rules`, `storage.rules`: hosting and data access configuration.

## Edit, build, validate

Follow the root README build steps after source changes. Trunk replaces its output directory, so run the preparation script afterward. It checks for the generated loader and Wasm asset, copies notices and favicon, and restores the credits page.

For Rust changes, follow AGENTS.md and select the relevant crate tests. Typical checks:

```sh
cargo fmt --all -- --check
cargo test -p photocraft-ui-egui --lib brand::tests
cargo test -p photocraft-ui-egui --lib links::tests
cargo clippy -p photocraft-ui-egui --all-targets -- -D warnings
cargo xtask layers
cargo xtask wasm
```

For engine/format changes, run the corresponding regression and corpus checks from AGENTS.md. Documentation-only edits do not require rebuilding the engine.

## Browser smoke test

Start the loopback server from README.md. Verify startup, open a redistributable test PNG, make an edit, undo/redo, export, and reopen the result. Save work before closing or refreshing. Test `?webgl` when investigating rendering failures. Record browser, test date, build/source revision, and any limitations in PROJECT-STATUS.md.

No Firebase JS SDK is required for the existing local-file workflow. Implement authentication and ownership rules before adding private cloud projects. Never commit deployment credentials or personal image samples.
