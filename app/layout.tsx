import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans_Thai } from 'next/font/google';
import { SITE } from '@/lib/site';
import './globals.css';

const plex = IBM_Plex_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const description =
  'GEF Thailand จำหน่ายเครื่องปั่นเชิงพาณิชย์สำหรับร้านกาแฟ คาเฟ่ และบาร์เครื่องดื่ม มอเตอร์ไร้แปรงถ่าน ปั่นเงียบต่ำกว่า 40 dB รับประกัน 1 ปี';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'GEF Thailand | เครื่องปั่นเชิงพาณิชย์สำหรับร้านกาแฟและบาร์',
    template: '%s | GEF Thailand',
  },
  description,
  icons: { icon: '/media/image/favicon.jpg' },
  openGraph: {
    siteName: 'GEF Thailand',
    locale: 'th_TH',
    type: 'website',
    url: SITE.url,
    title: 'GEF Thailand | เครื่องปั่นเชิงพาณิชย์',
    description,
    images: ['/media/image/GEF_A9_Plus.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2f5a3a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={plex.variable}>
      <body>
        <a href="#main" className="skip-link">
          ข้ามไปยังเนื้อหาหลัก
        </a>
        {children}
      </body>
    </html>
  );
}
