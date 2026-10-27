================================================================================
                              GIMP LAB PRO
        Next-Generation Web-Based Image Editor & Creative Suite
================================================================================

Welcome to GIMP Lab!
This package contains the complete, fully-functional GIMP Lab project,
including all source code, the custom graphic rendering engine, pre-compiled
bundles, configuration files, and the full "node_modules" package library.

You can launch and run the server immediately without running npm install!


================================================================================
1. PREREQUISITES
================================================================================

- Node.js: v18.0.0 or higher (v20+ recommended)
  Check version: node -v

- npm: v9.0.0 or higher
  Check version: npm -v

- A modern web browser:
  Google Chrome, Brave, Mozilla Firefox, Microsoft Edge, Apple Safari, or Arc.


================================================================================
2. HOW TO START THE SERVER
================================================================================

Step 1: Open Terminal / Command Prompt and navigate to the project directory:
-----------------------------------------------------------------------------
  cd GIMPLab

Step 2: Launch the server:
-----------------------------------------------------------------------------
  You have two ways to start the server:

  [METHOD A] Development Mode (Recommended for development & testing):
  -------------------------------------------------------------------
  Run:
      npm run dev

  What this does:
  - Automatically compiles the raster engine (webpack)
  - Starts the Next.js Turbopack dev server on http://localhost:3000
  - Supports hot-reloading and instantaneous updates.


  [METHOD B] Production Mode (Maximum speed & performance):
  -------------------------------------------------------------------
  Run:
      npm run start

  What this does:
  - Serves the pre-compiled, optimized production build directly.
  - If you make changes to the source code and want to re-build:
      npm run build
      npm run start


================================================================================
3. ACCESSING THE APPLICATION
================================================================================

Once the server is running, open your web browser and go to:

  - Main Landing Page / New Project Creator:
    http://localhost:3000/

  - Direct Full-Screen Editor Studio:
    http://localhost:3000/editor

  - Custom Dimension Direct Launch:
    http://localhost:3000/editor?w=1920&h=1080&name=MyProject

  - Observability & Metrics Endpoint:
    http://localhost:3000/api/metrics


================================================================================
4. KEY FEATURES & CAPABILITIES
================================================================================

1. Comprehensive Tool Suite:
   - Brush, Pencil, Eraser with dynamic sizing and hardness
   - Rectangle & Circle Shape generation
   - Bucket Fill & Gradient (Linear & Radial with live interactive preview)
   - Magic Wand & Free-hand Lasso Selection
   - Clone Stamp & Healing tools
   - Blur / Smart Sharpen tools
   - Dodge & Burn tools
   - Text Tool with full typography adjustments (font, size, color, bold, italic)
   - Crop & Canvas Resizing

2. Professional Layer Management:
   - Multi-layer support with unlimited layers
   - 12+ Blend Modes (Multiply, Screen, Overlay, Darken, Lighten, Color Dodge, etc.)
   - Layer Opacity, Visibility toggle, Layer Reordering (Move Up / Down)
   - Merge Down, Duplicate Layer, Delete Layer, and Layer Renaming

3. Transform & Image Adjustments:
   - Flip Horizontal / Flip Vertical
   - Rotate 90° CW / CCW, 180°
   - Brightness, Contrast, Hue, Saturation, Invert, Grayscale, Sepia filters

4. AWS S3 Cloud Storage Integration:
   - Direct Cloud Save (PNG, JPEG, WebP) with custom quality settings
   - Save Full Project (.json) to AWS S3 Cloud
   - Open & Restore Projects or Images directly from AWS S3
   - Dual upload pipelines: Direct Server Stream + Presigned URL fallback


================================================================================
5. CONFIGURATION (.env.local)
================================================================================

The `.env.local` file is already included and configured in the root directory.
It contains the active AWS S3 credentials and settings:

  STORAGE_PROVIDER=s3
  AWS_ACCESS_KEY_ID=your_aws_access_key_id
  AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
  AWS_REGION=ap-south-1
  AWS_BUCKET_NAME=your_bucket_name
  NEXT_PUBLIC_APP_NAME=GIMPLab

If you wish to use your own AWS S3 bucket:
1. Open `.env.local` in any text editor.
2. Update AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_BUCKET_NAME.
3. Restart the server (`npm run dev` or `npm run start`).


================================================================================
6. PROJECT DIRECTORY STRUCTURE
================================================================================

GIMPLab/
├── .env.local             # Environment variables & AWS S3 configuration
├── .gitignore             # Git ignore definitions
├── package.json           # Project manifest, dependencies, and launch scripts
├── package-lock.json      # Dependency lockfile
├── README.txt             # Server startup instructions and documentation
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript compiler configuration
├── engine/                # GIMP Lab custom raster graphic processing engine
│   ├── src/               # Core engine modules, canvas tools, filters, layers
│   ├── webpack.config.js  # Engine bundler configuration
│   └── images/            # Engine brush textures and patterns
├── public/                # Static public assets
│   ├── engine/            # Bundled engine distribution (gimplab-engine.js)
│   ├── favicon.ico        # GIMP Lab Pro icon
│   └── icons/             # UI SVG icons and stamps
├── src/                   # Next.js Application Source Code
│   ├── app/               # Next.js App Router (pages & API endpoints)
│   │   ├── page.tsx       # Landing page & preset selector
│   │   ├── editor/        # Photo editor studio page
│   │   └── api/           # Backend API routes (S3 storage & metrics)
│   │       ├── metrics/   # Grafana Prometheus metrics endpoint
│   │       └── storage/   # S3 upload, list, download, and delete endpoints
│   ├── components/        # React components (Toolbar, LayerPanel, Dialogs, etc.)
│   └── lib/               # Utility libraries, storage helpers, S3 client
├── grafana/               # Grafana monitoring dashboards and Prometheus config
├── graphify-out/          # Codebase graph architecture visualization
└── node_modules/          # Complete pre-installed node/npm dependency packages


================================================================================
7. TROUBLESHOOTING & FAQ
================================================================================

Q1: "Port 3000 is already in use"
A1: If another process is using port 3000:
    - On macOS / Linux:
        lsof -ti :3000 | xargs kill -9
    - Or run Next.js on a different port:
        npm run dev -- -p 3001
      Then open http://localhost:3001/

Q2: "Can I run npm install if I ever want to refresh packages?"
A2: Yes! All dependencies are pinned in `package.json` and `package-lock.json`.
    Running `npm install` works smoothly.

Q3: "How do I rebuild the graphic engine if I edit files in engine/src/?"
A3: Run:
        npm run engine:build
    This outputs the updated bundle to `public/engine/gimplab-engine.js`.

================================================================================
                       Happy Editing with GIMP Lab!
================================================================================
