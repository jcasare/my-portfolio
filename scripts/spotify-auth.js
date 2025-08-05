/**
 * Spotify OAuth Setup Script
 * Run this locally to get your refresh token
 *
 * Steps:
 * 1. Create a Spotify app at https://developer.spotify.com/dashboard
 * 2. Add http://localhost:3000/callback as a redirect URI in your app settings
 * 3. Run: node scripts/spotify-auth.js
 * 4. Follow the URL printed in console
 * 5. Copy the refresh_token from the response
 */

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || 'client_id';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'client_secret';
const REDIRECT_URI = 'http://127.0.0.1:3000/callback';

const scopes = ['user-read-currently-playing', 'user-read-playback-state'];

console.log('Spotify Authentication Setup\n');
console.log('1. First, update CLIENT_ID and CLIENT_SECRET in this file\n');
console.log('2. Then visit this URL in your browser:\n');

const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}&scope=${scopes.join('%20')}`;

console.log(authUrl);
console.log("\n3. After authorizing, you'll be redirected to a URL like:");
console.log('   http://localhost:3000/callback?code=AQD...xyz\n');
console.log('4. Copy the "code" parameter value\n');
console.log('5. Run this command with your code:\n');
console.log(`   node scripts/get-refresh-token.js YOUR_CODE\n`);
