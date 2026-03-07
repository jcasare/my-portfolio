import { useEffect, useState, useRef } from 'react';
import './Loader.css';

const bootLines = [
  { text: 'BIOS v4.2.0 — jerry@dev', delay: 0, type: 'dim' },
  { text: '', delay: 100, type: 'dim' },
  { text: 'Initializing system...', delay: 200, type: 'normal' },
  { text: '[  OK  ] Loaded kernel modules', delay: 350, type: 'ok' },
  { text: '[  OK  ] Mounted developer environment', delay: 480, type: 'ok' },
  { text: '[  OK  ] Started creativity.service', delay: 600, type: 'ok' },
  { text: '[  OK  ] Loaded caffeine-injection.service', delay: 720, type: 'ok' },
  { text: '[  OK  ] Started code-quality-monitor', delay: 840, type: 'ok' },
  { text: '[  OK  ] Portfolio assets compiled', delay: 960, type: 'ok' },
  { text: '', delay: 1050, type: 'dim' },
  { text: 'All systems operational. Welcome.', delay: 1150, type: 'success' },
];

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    // Schedule each line to appear
    bootLines.forEach((line, i) => {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        setProgress(Math.round(((i + 1) / bootLines.length) * 100));
      }, line.delay);
      timersRef.current.push(timer);
    });

    // Start fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1600);
    timersRef.current.push(fadeTimer);

    // Remove loader
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2100);
    timersRef.current.push(removeTimer);

    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`loader-container ${fadeOut ? 'loader-container--out' : ''}`}>
      <div className="loader">
        {/* Scanline effect */}
        <div className="loader__scanline"></div>

        {/* Terminal output */}
        <div className="loader__terminal">
          {visibleLines.map((line, i) => (
            <div key={i} className={`loader__line loader__line--${line.type}`}>
              {line.text}
            </div>
          ))}
          <div className="loader__cursor">_</div>
        </div>

        {/* Progress bar */}
        <div className="loader__progress-wrap">
          <div className="loader__progress-bar">
            <div
              className="loader__progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="loader__progress-text">{progress}%</span>
        </div>

        {/* Name watermark */}
        <div className="loader__watermark">JERRY ASARE</div>
      </div>
    </div>
  );
};

export default Loader;
