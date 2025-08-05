'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useDraggable } from './hooks/useDraggable';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SpotifyNowPlaying() {
  const { data, error } = useSWR('/api/spotify', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });
  
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      
      // On desktop, start expanded, on mobile start collapsed
      if (!mobile) {
        setIsExpanded(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate initial position and bounds
  const getInitialPosition = () => {
    if (windowSize.width === 0) return { x: 0, y: 0 };
    
    if (isMobile) {
      return {
        x: windowSize.width - 76, // Right side: 56px button + 20px margin
        y: 20, // 20px from top on mobile
      };
    } else {
      return {
        x: windowSize.width - 370, // Right side, account for expanded width
        y: 80, // 40px more down from navbar (was cutting off)
      };
    }
  };

  const getBounds = () => {
    if (windowSize.width === 0) return undefined;
    
    const buttonSize = 56;
    const expandedWidth = 350;
    const margin = 20;
    
    return {
      left: margin,
      top: margin,
      right: windowSize.width - (isExpanded && !isMobile ? expandedWidth : buttonSize) - margin,
      bottom: windowSize.height - buttonSize - (isMobile ? 100 : margin), // Account for mobile navbar
    };
  };

  const { position, isDragging, elementRef, handleMouseDown, handleTouchStart, setPosition } = useDraggable({
    initialPosition: getInitialPosition(),
    bounds: getBounds(),
  });

  // Set initial position once window size is available
  useEffect(() => {
    if (windowSize.width > 0 && position.x === 0 && position.y === 0) {
      setPosition(getInitialPosition());
    }
  }, [windowSize, isMobile]);

  // Simple inline styles for better compatibility
  const widgetStyles = {
    position: 'fixed' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 50,
    transition: isDragging ? 'none' : 'all 0.3s ease',
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const expandedStyles = {
    background: 'rgba(18, 18, 18, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    minWidth: '300px',
    maxWidth: '350px',
  };

  const minimizedStyles = {
    background: 'rgba(18, 18, 18, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '50%',
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  if (error) return null;

  return (
    <div 
      ref={elementRef}
      style={widgetStyles}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {isExpanded ? (
        <div style={expandedStyles}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span style={{ color: '#b3b3b3', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px' }}>
                {data?.isPlaying ? 'NOW PLAYING' : data?.recentlyPlayed ? 'RECENTLY PLAYED' : 'SPOTIFY'}
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#b3b3b3',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#b3b3b3'}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {(data?.isPlaying || data?.recentlyPlayed) ? (
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {data.albumImageUrl && (
                  <img
                    src={data.albumImageUrl}
                    alt={data.album}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '6px',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                    }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '4px',
                  }}>
                    {data.title}
                  </div>
                  <div style={{
                    color: '#b3b3b3',
                    fontSize: '13px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '2px',
                  }}>
                    {data.artist}
                  </div>
                  <div style={{
                    color: '#737373',
                    fontSize: '12px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {data.album}
                  </div>
                </div>
              </div>
              
              {/* Sound bars animation - only show when actually playing */}
              {data?.isPlaying && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', marginTop: '12px', height: '20px' }}>
                  {[0, 0.2, 0.4, 0.1, 0.3].map((delay, i) => (
                    <div
                      key={i}
                      style={{
                        width: '3px',
                        background: '#1DB954',
                        borderRadius: '3px',
                        animation: `soundBar 0.8s ease-in-out ${delay}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              )}
              {data?.recentlyPlayed && (
                <div style={{ marginTop: '12px', color: '#737373', fontSize: '11px', fontStyle: 'italic' }}>
                  Last played
                </div>
              )}
            </a>
          ) : (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#737373">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <div>
                <div style={{ color: '#b3b3b3', fontSize: '14px', marginBottom: '4px' }}>
                  {data?.error ? 'Error' : 'Not playing'}
                </div>
                <div style={{ color: '#737373', fontSize: '12px' }}>
                  {data?.error || 'Play something on Spotify'}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          style={minimizedStyles}
          onClick={() => setIsExpanded(true)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#1DB954">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          {data?.isPlaying && (
            <div style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '10px',
              height: '10px',
              background: '#1DB954',
              borderRadius: '50%',
              animation: 'pulse 2s infinite',
            }}/>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes soundBar {
          0% { height: 3px; }
          100% { height: 20px; }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}