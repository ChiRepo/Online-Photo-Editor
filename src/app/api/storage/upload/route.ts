import { NextRequest, NextResponse } from 'next/server';
import { S3StorageAdapter } from '@/storage/S3Adapter';
import { jev } from '@/utils/jev';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let fileName = '';
    let fileType = 'application/octet-stream';
    let folder = 'projects';
    let buffer: Buffer;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      if (!file) {
        return NextResponse.json({ error: 'No file provided in form-data' }, { status: 400 });
      }

      fileName = (formData.get('fileName') as string) || file.name || `Artwork_${Date.now()}.png`;
      folder = (formData.get('folder') as string) || 'projects';
      fileType = file.type || 'image/png';

      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      fileName = body.fileName || `Artwork_${Date.now()}.json`;
      folder = body.folder || 'projects';
      fileType = body.fileType || 'application/json';

      if (!body.data && !body.content) {
        return NextResponse.json({ error: 'No data or content payload provided' }, { status: 400 });
      }

      const payload = body.data || body.content;
      if (typeof payload === 'string' && payload.startsWith('data:')) {
        // Data URL
        const base64Data = payload.replace(/^data:[^;]+;base64,/, '');
        buffer = Buffer.from(base64Data, 'base64');
      } else if (typeof payload === 'string') {
        buffer = Buffer.from(payload, 'utf-8');
      } else {
        buffer = Buffer.from(JSON.stringify(payload), 'utf-8');
      }
    } else {
      // Raw stream or octet-stream
      fileName = req.headers.get('x-file-name') || `Artwork_${Date.now()}.png`;
      folder = req.headers.get('x-folder') || 'projects';
      fileType = contentType || 'application/octet-stream';
      const arrayBuffer = await req.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    }

    if (!buffer || buffer.length === 0) {
      return NextResponse.json({ error: 'Empty file payload' }, { status: 400 });
    }

    // JEV decision triage
    const jevDecision = jev.evaluateStorageUpload(buffer.length, fileType);
    if (jevDecision.verdict === 'REJECTED') {
      return NextResponse.json(
        { error: 'File size exceeds allowed limits', jev: jevDecision },
        { status: 413 }
      );
    }

    // Sanitize filename and build clean key
    const parts = fileName.split('.');
    const ext = parts.length > 1 ? parts.pop()! : (fileType.includes('json') ? 'json' : 'png');
    const rawBase = parts.join('.');
    const cleanBase = rawBase.replace(/[^a-zA-Z0-9_\-]/g, '_').substring(0, 50) || 'file';
    const uniqueKey = `${folder}/${cleanBase}_${Date.now()}.${ext}`;

    const storage = new S3StorageAdapter();
    const publicUrl = await storage.upload(uniqueKey, buffer, fileType);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      key: uniqueKey,
      name: `${cleanBase}.${ext}`,
      size: buffer.length,
      contentType: fileType,
      jevDecision: jevDecision.verdict,
    });
  } catch (error: any) {
    console.error('Direct S3 upload route error:', error);
    return NextResponse.json(
      { error: error.message || 'Direct upload failed' },
      { status: 500 }
    );
  }
}
