import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ForegroundLayer: React.FC = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 80;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(layerRef.current, {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={layerRef}
      className="absolute inset-0 z-30 w-[110%] h-[110%] -left-[5%] -top-[5%] pointer-events-none will-change-transform"
    >
      <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full object-cover" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="gold-pillar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9A7A1A" />
            <stop offset="20%" stopColor="#E6C229" />
            <stop offset="50%" stopColor="#FFF9D9" />
            <stop offset="80%" stopColor="#E6C229" />
            <stop offset="100%" stopColor="#9A7A1A" />
          </linearGradient>
          <linearGradient id="marble" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4D4D4" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E8E8E8" />
          </linearGradient>
          <radialGradient id="flower-wisteria" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E9D6F7" />
            <stop offset="100%" stopColor="#A88A9A" />
          </radialGradient>
          <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Reusable Wisteria Cluster */}
          <g id="wisteria">
            <circle cx="0" cy="0" r="12" fill="url(#flower-wisteria)" opacity="0.9" />
            <circle cx="5" cy="15" r="10" fill="url(#flower-wisteria)" opacity="0.8" />
            <circle cx="-5" cy="25" r="8" fill="url(#flower-wisteria)" opacity="0.7" />
            <circle cx="2" cy="35" r="6" fill="url(#flower-wisteria)" opacity="0.6" />
            <circle cx="-2" cy="42" r="4" fill="url(#flower-wisteria)" opacity="0.5" />
          </g>

          {/* Reusable Hanging Vine */}
          <g id="vine">
            <path d="M0,0 Q10,20 -5,40 T0,80 T-10,120 T5,160" fill="none" stroke="#2A3B1D" strokeWidth="2" opacity="0.8" />
            <path d="M0,10 Q15,15 10,25" fill="#3A4D23" />
            <path d="M-5,30 Q-20,35 -15,45" fill="#4A5D23" />
            <path d="M0,60 Q15,65 10,75" fill="#3A4D23" />
            <path d="M-5,90 Q-20,95 -15,105" fill="#4A5D23" />
          </g>
        </defs>

        {/* Left Marble Pillar */}
        <g transform="translate(50, 0)">
          <rect x="0" y="0" width="120" height="1080" fill="url(#marble)" />
          <rect x="-10" y="0" width="140" height="40" fill="url(#gold-pillar)" />
          <rect x="-10" y="1040" width="140" height="40" fill="url(#gold-pillar)" />
          {/* Pillar Fluting */}
          <rect x="20" y="40" width="10" height="1000" fill="#000000" opacity="0.05" />
          <rect x="55" y="40" width="10" height="1000" fill="#000000" opacity="0.05" />
          <rect x="90" y="40" width="10" height="1000" fill="#000000" opacity="0.05" />
          {/* Ornate Gold Capital */}
          <path d="M-20,40 L140,40 L120,120 L0,120 Z" fill="url(#gold-pillar)" />
          <circle cx="0" cy="80" r="20" fill="url(#gold-pillar)" />
          <circle cx="120" cy="80" r="20" fill="url(#gold-pillar)" />
        </g>

        {/* Right Marble Pillar */}
        <g transform="translate(1750, 0)">
          <rect x="0" y="0" width="120" height="1080" fill="url(#marble)" />
          <rect x="-10" y="0" width="140" height="40" fill="url(#gold-pillar)" />
          <rect x="-10" y="1040" width="140" height="40" fill="url(#gold-pillar)" />
          {/* Pillar Fluting */}
          <rect x="20" y="40" width="10" height="1000" fill="#000000" opacity="0.05" />
          <rect x="55" y="40" width="10" height="1000" fill="#000000" opacity="0.05" />
          <rect x="90" y="40" width="10" height="1000" fill="#000000" opacity="0.05" />
          {/* Ornate Gold Capital */}
          <path d="M-20,40 L140,40 L120,120 L0,120 Z" fill="url(#gold-pillar)" />
          <circle cx="0" cy="80" r="20" fill="url(#gold-pillar)" />
          <circle cx="120" cy="80" r="20" fill="url(#gold-pillar)" />
        </g>

        {/* Top Arch / Floral Canopy */}
        <path d="M0,0 L1920,0 L1920,150 Q1440,300 960,300 Q480,300 0,150 Z" fill="#1A2512" opacity="0.9" />
        <path d="M0,0 L1920,0 L1920,100 Q1440,250 960,250 Q480,250 0,100 Z" fill="#2A3B1D" opacity="0.9" />

        {/* Hanging Vines and Wisteria */}
        <g filter="url(#glow-soft)">
          {/* Left Side Hanging */}
          <use href="#vine" x="180" y="100" transform="scale(1.5)" />
          <use href="#wisteria" x="180" y="150" transform="scale(1.5)" />
          <use href="#vine" x="250" y="120" transform="scale(2)" />
          <use href="#wisteria" x="250" y="200" transform="scale(2)" />
          <use href="#vine" x="350" y="150" transform="scale(1.2)" />
          <use href="#wisteria" x="350" y="220" transform="scale(1.2)" />
          <use href="#vine" x="450" y="180" transform="scale(1.8)" />
          <use href="#wisteria" x="450" y="280" transform="scale(1.8)" />
          <use href="#vine" x="600" y="200" transform="scale(1.4)" />
          <use href="#wisteria" x="600" y="260" transform="scale(1.4)" />

          {/* Right Side Hanging */}
          <use href="#vine" x="1740" y="100" transform="scale(1.5)" />
          <use href="#wisteria" x="1740" y="150" transform="scale(1.5)" />
          <use href="#vine" x="1670" y="120" transform="scale(2)" />
          <use href="#wisteria" x="1670" y="200" transform="scale(2)" />
          <use href="#vine" x="1570" y="150" transform="scale(1.2)" />
          <use href="#wisteria" x="1570" y="220" transform="scale(1.2)" />
          <use href="#vine" x="1470" y="180" transform="scale(1.8)" />
          <use href="#wisteria" x="1470" y="280" transform="scale(1.8)" />
          <use href="#vine" x="1320" y="200" transform="scale(1.4)" />
          <use href="#wisteria" x="1320" y="260" transform="scale(1.4)" />
          
          {/* Center Hanging */}
          <use href="#vine" x="800" y="220" transform="scale(1.3)" />
          <use href="#wisteria" x="800" y="280" transform="scale(1.3)" />
          <use href="#vine" x="960" y="240" transform="scale(1.6)" />
          <use href="#wisteria" x="960" y="320" transform="scale(1.6)" />
          <use href="#vine" x="1120" y="220" transform="scale(1.3)" />
          <use href="#wisteria" x="1120" y="280" transform="scale(1.3)" />
        </g>
      </svg>
    </div>
  );
};
