import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { StorageAdapter, FileMetadata } from '@/types';

export class S3StorageAdapter implements StorageAdapter {
  private client: S3Client;
  private bucket: string;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION || 'ap-south-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    this.bucket = process.env.AWS_BUCKET_NAME || 'image-gimp-pbl';
  }

  async getUploadUrl(key: string, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });
    return await getSignedUrl(this.client, command, { expiresIn: 3600 });
  }

  async getDownloadUrl(key: string): Promise<string> {
    // For public bucket, return direct URL
    return `https://${this.bucket}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/${key}`;
  }

  async download(key: string): Promise<Blob> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    const res = await this.client.send(command);
    const bytes = await res.Body?.transformToByteArray();
    return new Blob([Buffer.from(bytes || [])]);
  }

  async upload(key: string, data: any, contentType: string = 'application/octet-stream'): Promise<string> {
    let bodyBuffer: Buffer;
    if (Buffer.isBuffer(data)) {
      bodyBuffer = data;
    } else if (data instanceof Uint8Array) {
      bodyBuffer = Buffer.from(data);
    } else if (typeof data?.arrayBuffer === 'function') {
      const ab = await data.arrayBuffer();
      bodyBuffer = Buffer.from(ab);
    } else if (typeof data === 'string') {
      bodyBuffer = Buffer.from(data, 'utf-8');
    } else {
      bodyBuffer = Buffer.from(String(data));
    }

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: bodyBuffer,
      ContentType: contentType,
    });
    await this.client.send(command);
    return `https://${this.bucket}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/${key}`;
  }

  async delete(key: string): Promise<void> {
    await this.client.send(new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    }));
  }

  async list(prefix: string): Promise<FileMetadata[]> {
    const result = await this.client.send(new ListObjectsV2Command({
      Bucket: this.bucket,
      Prefix: prefix,
    }));
    return (result.Contents || []).map(obj => ({
      key: obj.Key!,
      size: obj.Size!,
      lastModified: obj.LastModified!,
    }));
  }
}
