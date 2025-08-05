import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token || '',
    }),
  });

  return response.json();
};

const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export async function GET() {
  try {
    // Check if credentials exist
    if (!client_id || !client_secret || !refresh_token) {
      return NextResponse.json({ 
        isPlaying: false, 
        error: 'Spotify not configured'
      });
    }

    // Get access token
    const tokenResponse = await getAccessToken();
    
    if (!tokenResponse.access_token) {
      return NextResponse.json({ 
        isPlaying: false, 
        error: 'Authentication failed'
      });
    }

    // First try to get currently playing
    const response = await getNowPlaying();

    if (response.status === 200) {
      const song = await response.json();
      
      if (song.item) {
        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images[0]?.url;
        const songUrl = song.item.external_urls.spotify;

        return NextResponse.json({
          album,
          albumImageUrl,
          artist,
          isPlaying,
          songUrl,
          title,
        });
      }
    }

    // If nothing is currently playing, get recently played
    const recentResponse = await getRecentlyPlayed();
    
    if (recentResponse.status === 200) {
      const recent = await recentResponse.json();
      
      if (recent.items && recent.items.length > 0) {
        const song = recent.items[0].track;
        const title = song.name;
        const artist = song.artists.map((_artist: any) => _artist.name).join(', ');
        const album = song.album.name;
        const albumImageUrl = song.album.images[0]?.url;
        const songUrl = song.external_urls.spotify;

        return NextResponse.json({
          album,
          albumImageUrl,
          artist,
          isPlaying: false,
          songUrl,
          title,
          recentlyPlayed: true,
        });
      }
    }

    return NextResponse.json({ isPlaying: false });
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json({ 
      isPlaying: false, 
      error: 'Service unavailable'
    });
  }
}