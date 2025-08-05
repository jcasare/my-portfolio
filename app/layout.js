import SpotifyNowPlaying from '../components/SpotifyNowPlaying';

export const metadata = {
  title: 'Jerry Asare',
  description: 'Web site created with Next.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SpotifyNowPlaying />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
