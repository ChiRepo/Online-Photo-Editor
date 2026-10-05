'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface Preset {
  id: string;
  name: string;
  width: number;
  height: number;
}

const PRESETS: Preset[] = [
  { id: '1080p', name: 'Full HD 1080p', width: 1920, height: 1080 },
  { id: '4k', name: 'Ultra HD 4K', width: 3840, height: 2160 },
  { id: 'instagram', name: 'Instagram Square', width: 1080, height: 1080 },
  { id: 'story', name: 'Story / Reel', width: 1080, height: 1920 },
  { id: '720p', name: 'HD 720p', width: 1280, height: 720 },
  { id: 'custom', name: 'Custom Canvas', width: 1200, height: 800 },
];

export default function LandingPage() {
  const router = useRouter();
  const [selectedPreset, setSelectedPreset] = useState<string>('1080p');
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);

  const handleSelectPreset = (p: Preset) => {
    setSelectedPreset(p.id);
    setWidth(p.width);
    setHeight(p.height);
  };

  const handleCreate = () => {
    router.push(`/editor?w=${width}&h=${height}`);
  };

  return (
    <div className={styles.container}>
      {/* Top Navbar */}
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <img src="/images/gimplab-logo.svg" alt="GIMP Lab Logo" width="32" height="32" style={{ borderRadius: 8, filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" }} />
          <span className={styles.logoText}>GIMP Lab</span>
        </div>
        <div className={styles.navActions}>
          <Link href="/editor?action=cloud" className={styles.navLink}>
            Cloud Storage
          </Link>
          <Link href="/editor" className={styles.launchBtn}>
            Open Editor
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={styles.badge}>
          ⚡ 100% Client-Side Web Graphic Studio
        </div>
        <h1 className={styles.title}>
          Professional Image & Photo Editing, <br />
          Built Directly for the Browser.
        </h1>
        <p className={styles.subtitle}>
          Full multi-layer composition, 60+ filters, vector shapes, retouching tools,
          and instant AWS S3 cloud project synchronization with zero server latency.
        </p>

        {/* Project Setup Card */}
        <div className={styles.creatorCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>Create New Canvas</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Preset: {selectedPreset.toUpperCase()}
            </span>
          </div>

          {/* Preset Buttons */}
          <div className={styles.presetsGrid}>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`${styles.presetBtn} ${selectedPreset === p.id ? styles.active : ''}`}
                onClick={() => handleSelectPreset(p)}
              >
                <span className={styles.presetName}>{p.name}</span>
                <span className={styles.presetDim}>
                  {p.width} × {p.height} px
                </span>
              </button>
            ))}
          </div>

          {/* Dimensions Controls */}
          <div className={styles.dimensionRow}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Width (px)</label>
              <input
                type="number"
                className={styles.numberInput}
                value={width}
                min={100}
                max={8000}
                onChange={(e) => {
                  setWidth(parseInt(e.target.value) || 100);
                  setSelectedPreset('custom');
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Height (px)</label>
              <input
                type="number"
                className={styles.numberInput}
                value={height}
                min={100}
                max={8000}
                onChange={(e) => {
                  setHeight(parseInt(e.target.value) || 100);
                  setSelectedPreset('custom');
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.primaryAction}
              onClick={handleCreate}
            >
              <span>Create Project</span>
              <span>→</span>
            </button>
            <div className={styles.secondaryRow}>
              <Link
                href="/editor?action=open"
                className={styles.secondaryBtn}
              >
                <span>📂 Open Image File</span>
              </Link>
              <Link
                href="/editor?action=cloud"
                className={styles.secondaryBtn}
              >
                <span>☁️ Open from AWS S3</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Feature Highlights Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Engineered for Creators</h2>
          <p className={styles.sectionSubtitle}>
            A full suite of desktop-grade tools running with hardware acceleration
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🥞</div>
            <h3 className={styles.featureTitle}>Multi-Layer Stack</h3>
            <p className={styles.featureDesc}>
              Unlimited layers, 16 blend modes (Multiply, Screen, Overlay), opacity controls,
              and non-destructive transforms.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🖌️</div>
            <h3 className={styles.featureTitle}>Pro Retouch Tools</h3>
            <p className={styles.featureDesc}>
              Clone Stamp, Edge-directed Sharpen, Smart Blur, Smudge, Magic Eraser,
              and Bulge/Pinch distortion.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📐</div>
            <h3 className={styles.featureTitle}>21+ Vector Shapes</h3>
            <p className={styles.featureDesc}>
              Parametric polygons, stars, hearts, bezier curves, callouts, and arrows
              rendered with infinite resolution vector math.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✨</div>
            <h3 className={styles.featureTitle}>60+ Filters & FX</h3>
            <p className={styles.featureDesc}>
              Convolution matrices, Instagram presets, Tilt-Shift, Vignette, Dither,
              Edge detection, and Oil painting filters.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>☁️</div>
            <h3 className={styles.featureTitle}>AWS S3 Direct Storage</h3>
            <p className={styles.featureDesc}>
              Zero-server-latency cloud backups with presigned URLs. Save flattened images or
              re-openable multi-layer JSON projects.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💾</div>
            <h3 className={styles.featureTitle}>Universal Export</h3>
            <p className={styles.featureDesc}>
              Save lossless PNG, compressed JPEG, modern WEBP, animated GIF,
              TIFF, BMP, or full-project JSON data files.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>GIMP Lab • Advanced Client-Side Image Processing Engine</p>
      </footer>
    </div>
  );
}
