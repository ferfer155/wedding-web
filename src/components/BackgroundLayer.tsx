import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const BackgroundLayer: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 15;
      const yPos = (clientY / window.innerHeight - 0.5) * 15;

      gsap.to(bgRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power1.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={bgRef}
      className="absolute inset-0 z-0 w-[110%] h-[110%] -left-[5%] -top-[5%] will-change-transform bg-[#FADADD]"
    >
      <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full object-cover" preserveAspectRatio="xMidYMax slice">
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A88A9A" />
            <stop offset="30%" stopColor="#D49A9A" />
            <stop offset="60%" stopColor="#FADADD" />
            <stop offset="100%" stopColor="#FFF9D9" />
          </linearGradient>

          {/* Sun Glow */}
          <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="20%" stopColor="#FFF9D9" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FADADD" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FADADD" stopOpacity="0" />
          </radialGradient>

          {/* Mountain Gradients */}
          <linearGradient id="mountain-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B87A8A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FADADD" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="mountain-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9A6A7A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FADADD" stopOpacity="0.95" />
          </linearGradient>

          {/* Castle Gradients */}
          <linearGradient id="wall-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C48A8A" />
            <stop offset="20%" stopColor="#E6B8B8" />
            <stop offset="80%" stopColor="#D49A9A" />
            <stop offset="100%" stopColor="#A86A6A" />
          </linearGradient>
          <linearGradient id="roof-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4A3A4A" />
            <stop offset="50%" stopColor="#7A5A6A" />
            <stop offset="100%" stopColor="#3A2A3A" />
          </linearGradient>
          <linearGradient id="gold-trim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF9D9" />
            <stop offset="50%" stopColor="#E6C229" />
            <stop offset="100%" stopColor="#9A7A1A" />
          </linearGradient>
          <linearGradient id="waterfall-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Filters */}
          <filter id="window-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="god-rays-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="25" />
          </filter>
        </defs>

        {/* Sky Background */}
        <rect width="1920" height="1080" fill="url(#sky-grad)" />

        {/* Sun & God Rays */}
        <g transform="translate(960, 450)">
          {/* Rays */}
          <g fill="#FFF9D9" opacity="0.2" filter="url(#god-rays-blur)">
            <polygon points="0,0 -1000,-800 -700,-800" />
            <polygon points="0,0 -500,-800 -200,-800" />
            <polygon points="0,0 200,-800 500,-800" />
            <polygon points="0,0 700,-800 1000,-800" />
            <polygon points="0,0 -1200,-300 -1200,-100" />
            <polygon points="0,0 1200,-300 1200,-100" />
          </g>
          {/* Sun Core */}
          <circle cx="0" cy="0" r="700" fill="url(#sun-glow)" style={{ mixBlendMode: 'screen' }} />
        </g>

        {/* Distant Mountains */}
        <path d="M0,1080 L0,500 Q300,400 500,550 T1100,450 T1600,600 T1920,450 L1920,1080 Z" fill="url(#mountain-far)" />
        <path d="M0,1080 L0,600 Q250,500 450,650 T1000,550 T1500,700 T1920,550 L1920,1080 Z" fill="url(#mountain-mid)" />

        {/* Majestic Royal Castle */}
        <g transform="translate(560, 50)">
          {/* Background Towers */}
          <rect x="250" y="200" width="60" height="300" fill="url(#wall-grad)" />
          <polygon points="240,200 280,50 320,200" fill="url(#roof-grad)" />
          <rect x="490" y="200" width="60" height="300" fill="url(#wall-grad)" />
          <polygon points="480,200 520,50 560,200" fill="url(#roof-grad)" />

          {/* Connecting Bridges */}
          <path d="M250,450 Q300,420 340,450 L340,480 Q300,450 250,480 Z" fill="url(#wall-grad)" />
          <path d="M460,450 Q500,420 550,450 L550,480 Q500,450 460,480 Z" fill="url(#wall-grad)" />
          <path d="M150,550 Q175,520 200,550 L200,580 Q175,550 150,580 Z" fill="url(#wall-grad)" />
          <path d="M600,550 Q625,520 650,550 L650,580 Q625,550 600,580 Z" fill="url(#wall-grad)" />

          {/* Main Keep Base */}
          <rect x="200" y="400" width="400" height="500" fill="url(#wall-grad)" />
          
          {/* Grand Archway / Entrance */}
          <path d="M300,900 L300,650 A100,100 0 0,1 500,650 L500,900 Z" fill="#2A1A2A" />
          <path d="M320,900 L320,650 A80,80 0 0,1 480,650 L480,900 Z" fill="#FFF9D9" opacity="0.9" filter="url(#window-glow)" />
          
          {/* Middle Tier */}
          <rect x="280" y="250" width="240" height="150" fill="url(#wall-grad)" />
          <polygon points="260,250 400,150 540,250" fill="url(#roof-grad)" />
          
          {/* Central Grand Tower */}
          <rect x="340" y="50" width="120" height="200" fill="url(#wall-grad)" />
          <polygon points="320,50 400,-120 480,50" fill="url(#roof-grad)" />
          
          {/* Spire Gold Trims */}
          <polygon points="395,-120 405,-120 400,-180" fill="url(#gold-trim)" />
          <circle cx="400" cy="-180" r="10" fill="url(#gold-trim)" />
          
          <polygon points="275,50 285,50 280,-10" fill="url(#gold-trim)" />
          <circle cx="280" cy="-10" r="6" fill="url(#gold-trim)" />
          
          <polygon points="515,50 525,50 520,-10" fill="url(#gold-trim)" />
          <circle cx="520" cy="-10" r="6" fill="url(#gold-trim)" />

          {/* Left Wing */}
          <rect x="50" y="500" width="150" height="400" fill="url(#wall-grad)" />
          <polygon points="30,500 125,380 220,500" fill="url(#roof-grad)" />
          <rect x="100" y="350" width="50" height="150" fill="url(#wall-grad)" />
          <polygon points="90,350 125,220 160,350" fill="url(#roof-grad)" />
          <polygon points="122,220 128,220 125,170" fill="url(#gold-trim)" />
          <circle cx="125" cy="170" r="5" fill="url(#gold-trim)" />

          {/* Right Wing */}
          <rect x="600" y="500" width="150" height="400" fill="url(#wall-grad)" />
          <polygon points="580,500 675,380 770,500" fill="url(#roof-grad)" />
          <rect x="650" y="350" width="50" height="150" fill="url(#wall-grad)" />
          <polygon points="640,350 675,220 710,350" fill="url(#roof-grad)" />
          <polygon points="672,220 678,220 675,170" fill="url(#gold-trim)" />
          <circle cx="675" cy="170" r="5" fill="url(#gold-trim)" />

          {/* Glowing Windows */}
          <g fill="#FFF9D9" filter="url(#window-glow)">
            {/* Central Tower Windows */}
            <rect x="380" y="100" width="40" height="80" rx="20" />
            <rect x="380" y="200" width="40" height="80" rx="20" />
            
            {/* Middle Tier Windows */}
            <rect x="310" y="300" width="30" height="60" rx="15" />
            <rect x="385" y="300" width="30" height="60" rx="15" />
            <rect x="460" y="300" width="30" height="60" rx="15" />

            {/* Base Wall Windows */}
            <rect x="230" y="450" width="35" height="70" rx="17.5" />
            <rect x="535" y="450" width="35" height="70" rx="17.5" />
            <rect x="230" y="550" width="35" height="70" rx="17.5" />
            <rect x="535" y="550" width="35" height="70" rx="17.5" />

            {/* Left Wing Windows */}
            <rect x="110" y="400" width="30" height="60" rx="15" />
            <rect x="80" y="550" width="30" height="60" rx="15" />
            <rect x="140" y="550" width="30" height="60" rx="15" />
            <rect x="80" y="650" width="30" height="60" rx="15" />
            <rect x="140" y="650" width="30" height="60" rx="15" />
            <rect x="110" y="750" width="30" height="60" rx="15" />

            {/* Right Wing Windows */}
            <rect x="660" y="400" width="30" height="60" rx="15" />
            <rect x="630" y="550" width="30" height="60" rx="15" />
            <rect x="690" y="550" width="30" height="60" rx="15" />
            <rect x="630" y="650" width="30" height="60" rx="15" />
            <rect x="690" y="650" width="30" height="60" rx="15" />
            <rect x="660" y="750" width="30" height="60" rx="15" />
          </g>
          
          {/* Balconies & Details */}
          <g fill="url(#wall-grad)" stroke="#8A5A6A" strokeWidth="2">
            <rect x="370" y="180" width="60" height="10" />
            <rect x="370" y="280" width="60" height="10" />
            <rect x="300" y="360" width="50" height="10" />
            <rect x="375" y="360" width="50" height="10" />
            <rect x="450" y="360" width="50" height="10" />
            <rect x="220" y="520" width="55" height="10" />
            <rect x="525" y="520" width="55" height="10" />
          </g>

          {/* Castle Waterfalls cascading down the cliff */}
          <g opacity="0.9" style={{ mixBlendMode: 'screen' }}>
            {/* Left Waterfall */}
            <rect x="220" y="800" width="60" height="300" fill="url(#waterfall-grad)" filter="blur(3px)" />
            <rect x="230" y="800" width="6" height="300" fill="#FFFFFF" className="animate-[slideDown_1.2s_linear_infinite]" />
            <rect x="250" y="800" width="10" height="300" fill="#FFFFFF" opacity="0.8" className="animate-[slideDown_1.5s_linear_infinite_0.3s]" />
            <rect x="270" y="800" width="4" height="300" fill="#FFFFFF" className="animate-[slideDown_0.9s_linear_infinite_0.7s]" />
            
            {/* Right Waterfall */}
            <rect x="520" y="800" width="60" height="300" fill="url(#waterfall-grad)" filter="blur(3px)" />
            <rect x="530" y="800" width="8" height="300" fill="#FFFFFF" className="animate-[slideDown_1.4s_linear_infinite_0.1s]" />
            <rect x="550" y="800" width="5" height="300" fill="#FFFFFF" opacity="0.9" className="animate-[slideDown_1.1s_linear_infinite_0.5s]" />
            <rect x="570" y="800" width="7" height="300" fill="#FFFFFF" className="animate-[slideDown_1.3s_linear_infinite_0.8s]" />
          </g>
        </g>

        {/* Foreground Mist/Clouds to blend with midground */}
        <g fill="#FFFFFF" opacity="0.7" filter="blur(50px)">
          <ellipse cx="400" cy="1000" rx="800" ry="250" />
          <ellipse cx="1500" cy="1050" rx="900" ry="300" />
          <ellipse cx="960" cy="950" rx="700" ry="200" />
        </g>
      </svg>
    </div>
  );
};
