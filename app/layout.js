import SpotifyNowPlaying from '../components/SpotifyNowPlaying';

export const metadata = {
  title: 'Jerry Asare | Full-Stack Developer & Software Engineer',
  description: 'Experienced Full-Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building innovative digital solutions with clean code and exceptional user experiences.',
  keywords: 'Jerry Asare, Full-Stack Developer, Software Engineer, React Developer, Next.js, Node.js, Web Developer, Portfolio',
  authors: [{ name: 'Jerry Asare' }],
  creator: 'Jerry Asare',
  openGraph: {
    title: 'Jerry Asare | Full-Stack Developer & Software Engineer',
    description: 'Experienced Full-Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my portfolio and projects.',
    url: 'https://your-domain.com',
    siteName: 'Jerry Asare Portfolio',
    images: [
      {
        url: '/assets/myDp.jpg',
        width: 1200,
        height: 630,
        alt: 'Jerry Asare - Full-Stack Developer',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jerry Asare | Full-Stack Developer & Software Engineer',
    description: 'Experienced Full-Stack Developer specializing in React, Next.js, and modern web technologies.',
    images: ['/assets/myDp.jpg'],
    creator: '@iJAY',
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
  alternates: {
    canonical: 'https://your-domain.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/myDp.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <SpotifyNowPlaying />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
