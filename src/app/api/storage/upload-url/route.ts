import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { S3StorageAdapter } from '@/storage/S3Adapter';

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType, folder } = await req.json();
    
    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: 'fileName and fileType are required' },
        { status: 400 }
      );
    }

    const storage = new S3StorageAdapter();
    const ext = fileName.split('.').pop() || '';
    const key = `${folder || 'uploads'}/${uuidv4()}.${ext}`;
    const uploadUrl = await storage.getUploadUrl(key, fileType);
    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({ uploadUrl, key, publicUrl });
  } catch (error) {
    console.error('Upload URL error:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
