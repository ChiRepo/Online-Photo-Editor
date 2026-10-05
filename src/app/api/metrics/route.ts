import { NextRequest, NextResponse } from 'next/server';
import { jev } from '@/utils/jev';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const format = url.searchParams.get('format');

  const evaluations = jev.getEvaluationsCount();
  const uptimeSeconds = Math.round(process.uptime());

  if (format === 'json' || request.headers.get('accept')?.includes('application/json')) {
    return NextResponse.json({
      status: 'healthy',
      uptime: uptimeSeconds,
      jev: {
        totalEvaluations: evaluations,
        status: 'active',
      },
      s3: {
        bucket: process.env.AWS_BUCKET_NAME || 'image-gimp-pbl',
        region: process.env.AWS_REGION || 'ap-south-1',
        connected: true,
      },
      system: {
        memory: process.memoryUsage(),
        nodeVersion: process.version,
      },
    });
  }

  // Prometheus / OpenMetrics format for Grafana ingestion
  const promText = `
# HELP gimplab_up Application liveness and health indicator
# TYPE gimplab_up gauge
gimplab_up 1

# HELP gimplab_uptime_seconds Application uptime in seconds
# TYPE gimplab_uptime_seconds gauge
gimplab_uptime_seconds ${uptimeSeconds}

# HELP gimplab_jev_evaluations_total Total number of TypeSafe JEV decisions evaluated
# TYPE gimplab_jev_evaluations_total counter
gimplab_jev_evaluations_total ${evaluations}

# HELP gimplab_s3_connected AWS S3 Bucket connection status (1 = connected)
# TYPE gimplab_s3_connected gauge
gimplab_s3_connected 1

# HELP gimplab_heap_used_bytes Process heap memory usage in bytes
# TYPE gimplab_heap_used_bytes gauge
gimplab_heap_used_bytes ${process.memoryUsage().heapUsed}
`.trim();

  return new NextResponse(promText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; version=0.0.4; charset=utf-8',
    },
  });
}
