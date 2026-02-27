'use client';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className={`preloader${hidden ? ' hidden' : ''}`}>
      <div className="preloader-logo">
        FINTECH<span>OS</span>
      </div>
      <div className="preloader-bar">
        <div className="preloader-bar-fill" />
      </div>
      <div className="preloader-text">Initializing intelligence systems...</div>
    </div>
  );
}
