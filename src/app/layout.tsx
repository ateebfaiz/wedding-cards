import type { Metadata, Viewport } from 'next';
import './globals.css';
import { getWeddingConfig } from '@/config/default';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const config = getWeddingConfig();
  return {
    title: `${config.meta.title.en} | ${config.meta.title.ur}`,
    description: config.meta.description.en,
    openGraph: {
      title: config.meta.title.en,
      description: config.meta.description.en,
      type: 'website',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8F5EE] antialiased">
        {children}
      </body>
    </html>
  );
}
