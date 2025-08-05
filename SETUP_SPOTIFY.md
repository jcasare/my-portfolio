# Spotify Integration Setup

This project includes a Spotify Now Playing widget that shows your currently playing or recently played tracks.

## Quick Setup

1. **Create a Spotify App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Add `http://localhost:3000/callback` as a redirect URI

2. **Set Environment Variables**
   ```bash
   # Windows PowerShell
   $env:SPOTIFY_CLIENT_ID="your_client_id_here"
   $env:SPOTIFY_CLIENT_SECRET="your_client_secret_here"
   
   # Mac/Linux
   export SPOTIFY_CLIENT_ID="your_client_id_here"
   export SPOTIFY_CLIENT_SECRET="your_client_secret_here"
   ```

3. **Get Authorization Code**
   ```bash
   node scripts/spotify-auth.js
   ```
   - Visit the URL shown in terminal
   - Authorize the app
   - Copy the `code` parameter from the redirect URL

4. **Get Refresh Token**
   ```bash
   node scripts/get-refresh-token.js YOUR_CODE_HERE
   ```
   - Copy the refresh token from the output

5. **Add to Environment**
   - **Local**: Create `.env.local` with your tokens
   - **Vercel**: Add environment variables in project settings

## Environment Variables Needed

```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

## Security Notes

- Environment variables are server-side only
- Never commit actual credentials to git
- The widget will show "Not playing" if credentials are missing