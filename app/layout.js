import SpotifyNowPlaying from '../components/SpotifyNowPlaying';

export const metadata = {
  title: 'Jerry Asare | Senior Full Stack Software Engineer',
  description: 'Senior Full Stack Software Engineer building robust web applications with React, Next.js, and Node.js. Passionate about minimal design, seamless functionality, and user-centric solutions.',
  keywords: 'Jerry Asare, Senior Full Stack Engineer, Software Engineer, React, Next.js, Node.js, Web Developer, Portfolio',
  authors: [{ name: 'Jerry Asare' }],
  creator: 'Jerry Asare',
  openGraph: {
    title: 'Jerry Asare | Senior Full Stack Software Engineer',
    description: 'Senior Full Stack Software Engineer crafting applications with minimal design and user-friendly experiences. View my portfolio and projects.',
    url: 'https://www.jerryasare.com',
    siteName: 'Jerry Asare',
    images: [
      {
        url: '/assets/myDp.jpg',
        width: 1200,
        height: 630,
        alt: 'Jerry Asare - Senior Full Stack Software Engineer',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jerry Asare | Senior Full Stack Software Engineer',
    description: 'Senior Full Stack Software Engineer crafting applications with minimal design and user-friendly experiences.',
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
  metadataBase: new URL('https://www.jerryasare.com'),
  alternates: {
    canonical: 'https://www.jerryasare.com',
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
