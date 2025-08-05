import { useState, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  initialPosition?: Position;
  onDragEnd?: (position: Position) => void;
  bounds?: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
}

export const useDraggable = (options: UseDraggableOptions = {}) => {
  const [position, setPosition] = useState<Position>(
    options.initialPosition || { x: 0, y: 0 }
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;

      // Apply bounds if provided
      if (options.bounds) {
        newX = Math.max(options.bounds.left, Math.min(options.bounds.right, newX));
        newY = Math.max(options.bounds.top, Math.min(options.bounds.bottom, newY));
      }

      setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      let newX = touch.clientX - dragStart.x;
      let newY = touch.clientY - dragStart.y;

      // Apply bounds if provided
      if (options.bounds) {
        newX = Math.max(options.bounds.left, Math.min(options.bounds.right, newX));
        newY = Math.max(options.bounds.top, Math.min(options.bounds.bottom, newY));
      }

      setPosition({ x: newX, y: newY });
      e.preventDefault();
    };

    const handleEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        options.onDragEnd?.(position);
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
  }, [isDragging, dragStart, position, options]);

  // Snap to edge on mobile
  useEffect(() => {
    if (!isDragging && window.innerWidth <= 768) {
      const snapToEdge = () => {
        const windowWidth = window.innerWidth;
        const elementWidth = 56; // Button width
        const threshold = windowWidth / 2;
        
        let newX = position.x;
        if (position.x < threshold) {
          newX = 20; // Snap to left
        } else {
          newX = windowWidth - elementWidth - 20; // Snap to right
        }
        
        if (newX !== position.x) {
          setPosition(prev => ({ ...prev, x: newX }));
        }
      };

      const timer = setTimeout(snapToEdge, 200);
      return () => clearTimeout(timer);
    }
  }, [isDragging, position.x]);

  return {
    position,
    isDragging,
    elementRef,
    handleMouseDown,
    handleTouchStart,
    setPosition,
  };
};