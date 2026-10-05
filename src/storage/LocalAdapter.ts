import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { StorageAdapter, FileMetadata } from '@/types';

interface GimpLabDBSchema extends DBSchema {
  files: {
    key: string;
    value: {
      key: string;
      blob: Blob;
      contentType: string;
      size: number;
      lastModified: Date;
    };
  };
}

export class LocalStorageAdapter implements StorageAdapter {
  private dbPromise: Promise<IDBPDatabase<GimpLabDBSchema>>;

  constructor() {
    this.dbPromise = openDB<GimpLabDBSchema>('gimplab-storage', 1, {
      upgrade(db) {
        db.createObjectStore('files', { keyPath: 'key' });
      },
    });
  }

  async getUploadUrl(key: string, contentType: string): Promise<string> {
    return `local://upload/${key}`;
  }

  async getDownloadUrl(key: string): Promise<string> {
    const db = await this.dbPromise;
    const record = await db.get('files', key);
    if (!record) {
      throw new Error(`File not found: ${key}`);
    }
    return URL.createObjectURL(record.blob);
  }

  async upload(key: string, file: File | Blob): Promise<void> {
    const db = await this.dbPromise;
    const isFile = file instanceof File;
    await db.put('files', {
      key,
      blob: file,
      contentType: file.type || 'application/octet-stream',
      size: file.size,
      lastModified: isFile ? new Date((file as File).lastModified) : new Date(),
    });
  }

  async download(key: string): Promise<Blob> {
    const db = await this.dbPromise;
    const record = await db.get('files', key);
    if (!record) {
      throw new Error(`File not found: ${key}`);
    }
    return record.blob;
  }

  async delete(key: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('files', key);
  }

  async list(prefix: string): Promise<FileMetadata[]> {
    const db = await this.dbPromise;
    const tx = db.transaction('files', 'readonly');
    const store = tx.objectStore('files');
    const allRecords = await store.getAll();
    
    return allRecords
      .filter(record => record.key.startsWith(prefix))
      .map(record => ({
        key: record.key,
        size: record.size,
        lastModified: record.lastModified,
      }));
  }
}
