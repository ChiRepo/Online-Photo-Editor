"""Restore GIMPLab release assets after a Trunk web build."""
from pathlib import Path
import shutil
import re

root = Path(__file__).resolve().parents[1]
web = root / "dist/web"
page = web / "index.html"
if not page.is_file():
    raise SystemExit("Missing dist/web/index.html: run the Trunk build first.")
html = page.read_text()
for suffix in ("js", "wasm"):
    assets = re.findall(r'[\"\'](?:\./)?([^\"\']+\.' + suffix + r')[\"\']', html)
    if not assets or any(not (web / asset).is_file() for asset in assets):
        raise SystemExit(f"Missing generated {suffix} asset referenced by index.html")
for name in ("LICENSE-MIT", "LICENSE-APACHE", "NOTICE", "ATTRIBUTION.md"):
    shutil.copy2(root / name, web / name)
shutil.copy2(root / "assets/gimplab-icon.png", web / "favicon.png")
shutil.copy2(root / "packaging/web/gimplab/credits.html", web / "credits.html")
if 'href="./favicon.png"' not in html:
    html = html.replace("</head>", '<link rel="icon" type="image/png" href="./favicon.png">\n</head>')
page.write_text(html)
print("GIMPLab web bundle ready: loader, Wasm, credits, icon, and notices checked.")
