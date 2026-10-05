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
    await storage.delete(key);

    return NextResponse.json({ success: true, message: `Successfully deleted ${key}` });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
