/**
 * Get Spotify Refresh Token
 * Usage: node scripts/get-refresh-token.js YOUR_AUTH_CODE
 */

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || 'client_id';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'client_secret';
const REDIRECT_URI =
  process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:3000/callback';

const code = process.argv[2];

if (!code) {
  console.error('Please provide the authorization code as an argument');
  console.error('Usage: node scripts/get-refresh-token.js YOUR_AUTH_CODE');
  process.exit(1);
}

async function getRefreshToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (data.refresh_token) {
      console.log('\n✅ Success! Here are your tokens:\n');
      console.log('SPOTIFY_REFRESH_TOKEN=' + data.refresh_token);
      console.log('\n📝 Add this to your Vercel environment variables:');
      console.log('   - Go to your Vercel project settings');
      console.log('   - Navigate to Environment Variables');
      console.log(
        '   - Add SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN'
      );
      console.log(
        '\n⚠️  Keep these tokens secret and never commit them to git!'
      );
    } else {
      console.error('Error:', data);
    }
  } catch (error) {
    console.error('Failed to get refresh token:', error);
  }
}

getRefreshToken();
