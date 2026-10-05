import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GIMP Lab - Professional Web Photo & Graphics Editor',
  description: 'Advanced client-side multi-layer image and photo editor powered by Web APIs, featuring pro filters, vector shapes, retouching tools, and AWS S3 direct cloud integration.',
  icons: {
    icon: '/images/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
