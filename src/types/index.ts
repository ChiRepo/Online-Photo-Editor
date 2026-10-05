// === Layer Types ===
export type LayerType = 'raster' | 'text' | 'shape' | 'adjustment' | 'group';
export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light' | 'difference' | 'exclusion' | 'color-dodge' | 'color-burn' | 'darken' | 'lighten' | 'hue' | 'saturation' | 'color' | 'luminosity';

export interface Layer {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  locked: boolean;
  opacity: number; // 0-100
  blendMode: BlendMode;
  x: number;
  y: number;
  width: number;
  height: number;
  imageData: ImageData | null;
  canvas: OffscreenCanvas | null;
  originalCanvas?: OffscreenCanvas | null;
}

// === Tool Types ===
export type ToolType = 'move' | 'brush' | 'eraser' | 'pencil' | 'bucket-fill' | 'gradient' | 'rectangle-select' | 'ellipse-select' | 'free-select' | 'magic-wand' | 'color-picker' | 'text' | 'crop' | 'zoom' | 'clone-stamp' | 'heal' | 'dodge-burn' | 'blur-sharpen' | 'smudge';

export interface ToolOptions {
  size: number;
  opacity: number;
  hardness: number;
  flow: number;
  spacing: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  color: string;
  tolerance?: number;
  feather?: number;
  antiAlias?: boolean;
  sharpenMode?: 'blur' | 'sharpen';
  gradientType?: 'linear' | 'radial';
  gradientStyle?: 'fg-bg' | 'fg-transparent';
}

// === Project Types ===
export interface Project {
  id: string;
  name: string;
  width: number;
  height: number;
  dpi: number;
  layers: Layer[];
  activeLayerId: string | null;
  backgroundColor: string;
  createdAt: string;
  updatedAt: string;
}

// === Color Types ===
export interface RGBA {
  r: number; // 0-255
  g: number;
  b: number;
  a: number; // 0-1
}

export interface HSLA {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
  a: number; // 0-1
}

// === Selection Types ===
export type SelectionMode = 'replace' | 'add' | 'subtract' | 'intersect';

export interface Selection {
  mask: Uint8Array | null; // Alpha mask matching canvas dimensions
  bounds: { x: number; y: number; width: number; height: number } | null;
  active: boolean;
  selectionType?: 'rectangle' | 'ellipse' | 'free' | null;
}

// === History Types ===
export type HistoryActionType = 'brush-stroke' | 'eraser-stroke' | 'move-layer' | 'add-layer' | 'delete-layer' | 'reorder-layer' | 'change-opacity' | 'change-visibility' | 'apply-filter' | 'transform' | 'selection-change' | 'paste' | 'text-added';

export interface HistoryEntry {
  id: string;
  type: HistoryActionType;
  description: string;
  timestamp: number;
  snapshot: any; // Layer state snapshot or delta
}

// === Storage Types ===
export interface FileMetadata {
  key: string;
  size: number;
  lastModified: Date;
  contentType?: string;
}

export interface StorageAdapter {
  getUploadUrl(key: string, contentType: string): Promise<string>;
  getDownloadUrl(key: string): Promise<string>;
  delete(key: string): Promise<void>;
  list(prefix: string): Promise<FileMetadata[]>;
}
