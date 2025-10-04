import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AdVerse.media - AI-Powered Video Creation Studio',
  description: 'Transform extraordinary ideas into cinematic reality with our revolutionary AI-powered creative studio. Dreams become videos in 48 hours.',
  keywords: ['AI video creation', 'video production', 'creative studio', 'video marketing', 'content creation'],
  authors: [{ name: 'AdVerse.media' }],
  creator: 'AdVerse.media',
  publisher: 'AdVerse.media',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://adverse.media'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AdVerse.media - AI-Powered Video Creation Studio',
    description: 'Transform extraordinary ideas into cinematic reality with our revolutionary AI-powered creative studio.',
    url: 'https://adverse.media',
    siteName: 'AdVerse.media',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AdVerse.media - AI Video Creation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AdVerse.media - AI-Powered Video Creation Studio',
    description: 'Transform extraordinary ideas into cinematic reality with our revolutionary AI-powered creative studio.',
    images: ['/og-image.jpg'],
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
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16x16.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


