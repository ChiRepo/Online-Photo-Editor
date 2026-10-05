import { NextRequest, NextResponse } from 'next/server';
import { S3StorageAdapter } from '@/storage/S3Adapter';

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json();
    
    if (!key) {
      return NextResponse.json(
        { error: 'key is required' },
        { status: 400 }
      );
    }

    const storage = new S3StorageAdapter();
    const downloadUrl = await storage.getDownloadUrl(key);

    return NextResponse.json({ downloadUrl });
  } catch (error) {
    console.error('Download URL error:', error);
    return NextResponse.json(
      { error: 'Failed to generate download URL' },
      { status: 500 }
    );
  }
}
