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

    const parts = fileName.split('.');
    const ext = parts.length > 1 ? parts.pop()! : (fileType.includes('json') ? 'json' : 'png');
    const rawBase = parts.join('.');
    const cleanBase = rawBase.replace(/[^a-zA-Z0-9_\-]/g, '_').substring(0, 50) || 'file';
    const key = `${folder || 'projects'}/${cleanBase}_${Date.now()}.${ext}`;

    const storage = new S3StorageAdapter();
    const uploadUrl = await storage.getUploadUrl(key, fileType);
    const publicUrl = `https://${process.env.AWS_BUCKET_NAME || 'image-gimp-pbl'}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/${key}`;

    return NextResponse.json({ uploadUrl, key, publicUrl, name: `${cleanBase}.${ext}` });
  } catch (error) {
    console.error('Upload URL error:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
