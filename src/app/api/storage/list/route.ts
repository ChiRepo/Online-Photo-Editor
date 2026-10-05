import { NextRequest, NextResponse } from 'next/server';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function GET(request: NextRequest) {
  try {
    const bucket = process.env.AWS_BUCKET_NAME || 'image-gimp-pbl';
    
    // We get the folder prefix if provided, else root or 'projects/'
    const url = new URL(request.url);
    const prefix = url.searchParams.get('prefix') || 'projects/';

    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
    });

    const response = await s3Client.send(command);

    const files = (response.Contents || []).map((file) => ({
      key: file.Key,
      lastModified: file.LastModified,
      size: file.Size,
      url: `https://${bucket}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/${file.Key}`
    })).filter(file => file.size && file.size > 0);

    // Sort by most recent
    files.sort((a, b) => {
      return new Date(b.lastModified!).getTime() - new Date(a.lastModified!).getTime();
    });

    return NextResponse.json({ files });
  } catch (error: any) {
    console.error('S3 list error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
