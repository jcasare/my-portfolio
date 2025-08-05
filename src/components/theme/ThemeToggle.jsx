import React, { useState, useEffect, useRef } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const elementRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      
      // Set initial position
      if (mobile) {
        setPosition({
          x: 20, // Left side on mobile
          y: window.innerHeight - 220, // Push down more but stay above Spotify
        });
      } else {
        setPosition({
          x: 20, // Left side on desktop
          y: window.innerHeight - 140,
        });
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;

      // Apply bounds
      const buttonSize = 50;
      const margin = 20;
      newX = Math.max(margin, Math.min(windowSize.width - buttonSize - margin, newX));
      newY = Math.max(margin, Math.min(windowSize.height - buttonSize - (isMobile ? 120 : margin), newY));

      setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      let newX = touch.clientX - dragStart.x;
      let newY = touch.clientY - dragStart.y;

      // Apply bounds
      const buttonSize = 50;
      const margin = 20;
      newX = Math.max(margin, Math.min(windowSize.width - buttonSize - margin, newX));
      newY = Math.max(margin, Math.min(windowSize.height - buttonSize - (isMobile ? 120 : margin), newY));

      setPosition({ x: newX, y: newY });
      e.preventDefault();
    };

    const handleEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        
        // Snap to edge on mobile
        if (isMobile) {
          const windowWidth = windowSize.width;
          const buttonSize = 50;
          const threshold = windowWidth / 2;
          
          let newX = position.x;
          if (position.x < threshold) {
            newX = 20; // Snap to left
          } else {
            newX = windowWidth - buttonSize - 20; // Snap to right
          }
          
          setPosition(prev => ({ ...prev, x: newX }));
        }
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragStart, position, windowSize, isMobile]);

  const toggleTheme = (e) => {
    // Don't toggle if we're dragging
    if (isDragging) return;
    
    e.stopPropagation();
    setIsDark(!isDark);
    if (!isDark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const buttonStyle = {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    transition: isDragging ? 'none' : 'all 0.3s ease',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: 100,
  };

  return (
    <button 
      ref={elementRef}
      className="theme-toggle" 
      onClick={toggleTheme}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={buttonStyle}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="theme-toggle__icon">
        {isDark ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;