# GIMP Lab Pro — Online Photo & Graphics Editor

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![AWS S3](https://img.shields.io/badge/AWS-S3_Cloud_Storage-orange?logo=amazon-s3)](https://aws.amazon.com/s3/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A powerful, next-generation web-based photo and raster graphic editor built directly for the browser. Featuring unlimited multi-layer composition, 60+ filters, retouching tools, vector shapes, and real-time AWS S3 cloud synchronization with zero server latency.

---

## ✨ Key Features

- **🥞 Multi-Layer Stack**: Unlimited layers, 16 blend modes (Multiply, Screen, Overlay, etc.), layer opacity, reordering, duplicate, and merge down.
- **🖌️ Pro Retouch Tools**: Brush, Pencil, Eraser, Clone Stamp, Edge-directed Sharpen, Smart Blur, Smudge, Magic Eraser, and Bulge/Pinch distortion.
- **📐 21+ Vector Shapes**: Parametric polygons, stars, hearts, bezier curves, callouts, and arrows rendered with vector math.
- **✨ 60+ Filters & FX**: Instagram presets, Tilt-Shift, Vignette, Dither, Edge detection, Oil painting, and color matrix adjustments.
- **☁️ AWS S3 Cloud Synchronization**: Direct multipart server streaming and presigned URL fallback for instant saving and restoring of flattened images or full multi-layer `.json` projects.
- **💾 Universal Export**: Export to lossless PNG, compressed JPEG, modern WEBP, animated GIF, TIFF, BMP, or full-project JSON.
- **📊 Observability & Metrics**: Built-in Prometheus metrics endpoint (`/api/metrics`) and Grafana monitoring dashboard configurations.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ChiRepo/Online-Photo-Editor.git
   cd Online-Photo-Editor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   Add your AWS S3 credentials to `.env.local`:
   ```env
   STORAGE_PROVIDER=s3
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=ap-south-1
   AWS_BUCKET_NAME=your_bucket_name
   NEXT_PUBLIC_APP_NAME=GIMPLab
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in your browser:**
   - **Landing Page & Canvas Presets:** [http://localhost:3000](http://localhost:3000)
   - **Full Studio Editor:** [http://localhost:3000/editor](http://localhost:3000/editor)
   - **Prometheus Metrics:** [http://localhost:3000/api/metrics](http://localhost:3000/api/metrics)

---

## 🛠️ Build & Production Deployment

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```
├── engine/                # Custom raster graphics processing engine
│   ├── src/               # Canvas tools, filters, layer stack, and web workers
│   └── webpack.config.js  # Engine bundler configuration
├── public/                # Static public assets and bundled engine runtime
│   ├── engine/            # gimplab-engine.js distribution
│   └── icons/             # Tool icons and UI assets
├── src/                   # Next.js App Router application
│   ├── app/
│   │   ├── page.tsx       # Modern Dark Pro landing page and project setup
│   │   ├── editor/        # Core canvas editor workspace
│   │   └── api/
│   │       ├── storage/   # AWS S3 upload, list, download, and delete endpoints
│   │       └── metrics/   # Grafana Prometheus metrics endpoint
│   ├── storage/           # S3 & Local storage adapters
│   └── utils/             # Helper utilities and metrics tracking
├── grafana/               # Grafana dashboards and Prometheus configuration
└── graphify-out/          # Codebase architecture visualization graphs
```

---

## 📄 License

This project is licensed under the MIT License.
