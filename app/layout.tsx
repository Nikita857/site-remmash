import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_CONFIG } from '@/config';
import "./globals.css";
import { AuthProvider } from '@/components/AuthProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.meta.title,
    template: `%s | ${SITE_CONFIG.siteName}`,
  },
  description: SITE_CONFIG.meta.description,
  keywords: SITE_CONFIG.meta.keywords,
  authors: [{ name: SITE_CONFIG.meta.author }],
  creator: SITE_CONFIG.meta.author,
  publisher: SITE_CONFIG.siteName,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_CONFIG.siteUrl,
    title: SITE_CONFIG.meta.title,
    description: SITE_CONFIG.meta.description,
    siteName: SITE_CONFIG.siteName,
    images: [
      {
        url: `${SITE_CONFIG.siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.meta.title,
    description: SITE_CONFIG.meta.description,
    images: [`${SITE_CONFIG.siteUrl}/og-image.jpg`],
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
