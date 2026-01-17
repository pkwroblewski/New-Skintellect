import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToastContainer } from '@/components/common/Toast';
import { Providers } from '@/components/providers/Providers';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://skintellect.vercel.app'),
  title: {
    default: 'Skintellect - AI-Powered Skincare Comparison',
    template: '%s | Skintellect',
  },
  description: 'Discover your perfect skincare match with AI-powered ingredient analysis. Compare products, find dupes, and make informed decisions about your skincare routine.',
  keywords: ['skincare', 'cosmetics', 'ingredient analysis', 'product comparison', 'dupes', 'AI skincare'],
  authors: [{ name: 'Skintellect' }],
  creator: 'Skintellect',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://skintellect.vercel.app',
    siteName: 'Skintellect',
    title: 'Skintellect - AI-Powered Skincare Comparison',
    description: 'Discover your perfect skincare match with AI-powered ingredient analysis.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Skintellect - AI Skincare Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skintellect - AI-Powered Skincare Comparison',
    description: 'Discover your perfect skincare match with AI-powered ingredient analysis.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-[#FAF7F2] font-sans antialiased selection:bg-[#FDF2F2] selection:text-[#A67C7C]">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
