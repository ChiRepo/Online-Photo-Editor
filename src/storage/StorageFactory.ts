import type { StorageAdapter } from '@/types';

export function getStorageAdapter(): StorageAdapter {
  const provider = process.env.STORAGE_PROVIDER || 'local';
  
  switch (provider) {
    case 's3': {
      const { S3StorageAdapter } = require('./S3Adapter');
      return new S3StorageAdapter();
    }
    default: {
      // LocalAdapter runs in browser — this factory is for server-side
      // For local mode on server, we throw since local storage is client-only
      throw new Error('Local storage adapter is client-side only. Use S3 for server API routes.');
    }
  }
}

// Helper to check if we're using cloud storage
export function isCloudStorage(): boolean {
  return process.env.STORAGE_PROVIDER === 's3';
}
