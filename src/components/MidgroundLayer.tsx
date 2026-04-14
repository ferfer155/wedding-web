import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const MidgroundLayer: React.FC = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 15;

      gsap.to(layerRef.current, {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={layerRef}
      className="absolute inset-0 z-10 w-[110%] h-[110%] -left-[5%] -top-[5%] pointer-events-none flex items-center justify-center will-change-transform"
    >
      {/* Left Glowing Tree (Cherry Blossom style) */}
      <div className="absolute top-[25%] left-[10%] w-[300px] h-[400px]">
         {/* Trunk */}
         <svg viewBox="0 0 100 200" className="absolute bottom-0 left-[100px] w-[60px] h-[180px] fill-[#8A6A6A] opacity-80">
           <path d="M20,200 Q25,100 50,0 Q15,100 10,200 Z" />
           <path d="M25,150 Q40,100 80,50 Q45,110 30,160 Z" />
           <path d="M35,100 Q60,60 90,20 Q55,70 40,110 Z" />
         </svg>
         {/* Foliage */}
         <div className="absolute top-0 left-0 w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,transparent_60%)] mix-blend-screen" />
         <div className="absolute top-[40px] left-[60px] w-[220px] h-[220px] bg-[radial-gradient(circle,rgba(250,218,221,0.95)_0%,transparent_60%)] mix-blend-screen" />
         <div className="absolute top-[10px] left-[120px] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(247,198,199,0.85)_0%,transparent_60%)] mix-blend-screen" />
         <div className="absolute top-[120px] left-[20px] w-[180px] h-[180px] bg-[radial-gradient(circle,rgba(255,249,217,0.7)_0%,transparent_60%)] mix-blend-screen" />
      </div>

      {/* Right Stairs & Cypress Trees */}
      <div className="absolute top-[30%] right-[5%] w-[450px] h-[350px]">
         {/* Cypress Trees Background */}
         <div className="absolute top-[-120px] right-[200px] w-[45px] h-[180px] bg-gradient-to-t from-[#8A6A6A] to-[#D49A9A] rounded-t-full opacity-50 blur-[3px]" />
         <div className="absolute top-[-150px] right-[160px] w-[40px] h-[220px] bg-gradient-to-t from-[#8A6A6A] to-[#D49A9A] rounded-t-full opacity-40 blur-[3px]" />
         <div className="absolute top-[-90px] right-[120px] w-[35px] h-[140px] bg-gradient-to-t from-[#8A6A6A] to-[#D49A9A] rounded-t-full opacity-60 blur-[3px]" />
         
         {/* Right side bushes (Planter foliage) */}
         <div className="absolute bottom-[20px] right-[80px] w-[180px] h-[180px] bg-[radial-gradient(circle,rgba(230,184,184,0.8)_0%,transparent_60%)] mix-blend-multiply" />
         <div className="absolute bottom-[80px] right-[20px] w-[150px] h-[150px] bg-[radial-gradient(circle,rgba(212,154,154,0.8)_0%,transparent_60%)] mix-blend-multiply" />
         <div className="absolute top-[100px] left-[150px] w-[120px] h-[120px] bg-[radial-gradient(circle,rgba(247,198,199,0.9)_0%,transparent_60%)] mix-blend-screen" />
      </div>

      {/* Center Majestic Marble Fountain */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[400px]">
        <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
            <linearGradient id="marble-fountain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F5F5F5" />
              <stop offset="100%" stopColor="#D4D4D4" />
            </linearGradient>
            <linearGradient id="marble-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8E8E8" />
              <stop offset="100%" stopColor="#B0B0B0" />
            </linearGradient>
            <linearGradient id="gold-accent" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF9D9" />
              <stop offset="50%" stopColor="#E6C229" />
              <stop offset="100%" stopColor="#9A7A1A" />
            </linearGradient>
            <linearGradient id="water-surface" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FADADD" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
            </linearGradient>
            <filter id="water-blur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>
          
          {/* Outer Grand Basin Rim */}
          <ellipse cx="400" cy="320" rx="380" ry="70" fill="url(#marble-fountain)" />
          {/* Basin Depth/Lip */}
          <path d="M20,320 A380,70 0 0,0 780,320 L780,340 A380,70 0 0,1 20,340 Z" fill="url(#marble-dark)" />
          {/* Gold Trim on Basin */}
          <path d="M15,330 A385,75 0 0,0 785,330 L785,335 A385,75 0 0,1 15,335 Z" fill="url(#gold-accent)" />

          {/* Inner Basin / Water Surface */}
          <ellipse cx="400" cy="320" rx="360" ry="60" fill="url(#water-surface)" />
          
          {/* Water ripples */}
          <ellipse cx="400" cy="320" rx="220" ry="35" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.6" filter="url(#water-blur)" />
          <ellipse cx="400" cy="320" rx="280" ry="45" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" filter="url(#water-blur)" />
          <ellipse cx="400" cy="320" rx="140" ry="25" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" filter="url(#water-blur)" />

          {/* Middle Tier Basin */}
          <path d="M320,320 L480,320 L440,220 L360,220 Z" fill="url(#marble-dark)" />
          <ellipse cx="400" cy="220" rx="140" ry="30" fill="url(#marble-fountain)" />
          <path d="M260,220 A140,30 0 0,0 540,220 L540,230 A140,30 0 0,1 260,230 Z" fill="url(#marble-dark)" />
          <path d="M255,225 A145,35 0 0,0 545,225 L545,228 A145,35 0 0,1 255,228 Z" fill="url(#gold-accent)" />
          <ellipse cx="400" cy="220" rx="130" ry="25" fill="url(#water-surface)" />

          {/* Top Tier Basin */}
          <path d="M370,220 L430,220 L415,120 L385,120 Z" fill="url(#marble-dark)" />
          <ellipse cx="400" cy="120" rx="70" ry="18" fill="url(#marble-fountain)" />
          <path d="M330,120 A70,18 0 0,0 470,120 L470,128 A70,18 0 0,1 330,128 Z" fill="url(#marble-dark)" />
          <path d="M325,124 A75,22 0 0,0 475,124 L475,126 A75,22 0 0,1 325,126 Z" fill="url(#gold-accent)" />
          
          {/* Grand Spout / Statue Base */}
          <path d="M385,120 L415,120 L405,50 L395,50 Z" fill="url(#marble-fountain)" />
          <circle cx="400" cy="40" r="15" fill="url(#gold-accent)" />
          <polygon points="400,10 410,30 390,30" fill="url(#gold-accent)" />
        </svg>

        {/* Realistic Cascading Waterfall Dome (Top Tier) */}
        <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[160px] h-[100px] pointer-events-none">
          <div 
            className="absolute inset-0 bg-white/40 overflow-hidden"
            style={{ 
              borderRadius: '50% 50% 15% 15% / 85% 85% 15% 15%', 
              maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)'
            }}
          >
            <div className="absolute inset-0 flex justify-around opacity-90 blur-[1px]">
              <div className="w-[4px] h-[200%] bg-white/90 animate-[slideDown_0.8s_linear_infinite]" />
              <div className="w-[8px] h-[200%] bg-white/70 animate-[slideDown_1.1s_linear_infinite_0.2s]" />
              <div className="w-[3px] h-[200%] bg-white animate-[slideDown_0.7s_linear_infinite_0.5s]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/20 to-white/80" />
          </div>
        </div>

        {/* Realistic Cascading Waterfall Dome (Middle Tier) */}
        <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[300px] h-[110px] pointer-events-none">
          <div 
            className="absolute inset-0 bg-white/40 overflow-hidden"
            style={{ 
              borderRadius: '50% 50% 15% 15% / 85% 85% 15% 15%', 
              maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)'
            }}
          >
            <div className="absolute inset-0 flex justify-around opacity-90 blur-[1px]">
              <div className="w-[4px] h-[200%] bg-white/90 animate-[slideDown_0.8s_linear_infinite]" />
              <div className="w-[8px] h-[200%] bg-white/70 animate-[slideDown_1.1s_linear_infinite_0.2s]" />
              <div className="w-[3px] h-[200%] bg-white animate-[slideDown_0.7s_linear_infinite_0.5s]" />
              <div className="w-[10px] h-[200%] bg-white/60 animate-[slideDown_1.4s_linear_infinite_0.1s]" />
              <div className="w-[5px] h-[200%] bg-white/80 animate-[slideDown_1.0s_linear_infinite_0.7s]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/20 to-white/80" />
          </div>
        </div>
        
        {/* Splash and mist at the base of the cascade */}
        <div className="absolute top-[290px] left-1/2 -translate-x-1/2 w-[380px] h-[60px] bg-[radial-gradient(ellipse,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.4)_40%,transparent_70%)] animate-pulse mix-blend-screen blur-[2px]" />
        <div className="absolute top-[300px] left-1/2 -translate-x-1/2 w-[420px] h-[40px] bg-[radial-gradient(ellipse,rgba(255,255,255,0.8)_0%,transparent_70%)] animate-pulse mix-blend-screen blur-[4px]" style={{ animationDuration: '2s' }} />
      </div>

      {/* Foreground Grand Marble Staircase */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px]">
        <svg viewBox="0 0 800 250" className="absolute inset-0 w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
            <linearGradient id="marble-stair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E8E8E8" />
            </linearGradient>
            <linearGradient id="marble-stair-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4D4D4" />
              <stop offset="100%" stopColor="#B0B0B0" />
            </linearGradient>
          </defs>
          
          {/* Path Base (Perspective) */}
          <path d="M300,0 L500,0 L750,250 L50,250 Z" fill="url(#marble-stair-dark)" opacity="0.8" />
          
          {/* Marble Steps */}
          {/* Step 1 (Top/Farthest) */}
          <path d="M295,5 L505,5 L510,15 L290,15 Z" fill="url(#marble-stair)" />
          <path d="M290,15 L510,15 L510,20 L290,20 Z" fill="url(#marble-stair-dark)" />
          
          {/* Step 2 */}
          <path d="M285,30 L515,30 L522,45 L278,45 Z" fill="url(#marble-stair)" />
          <path d="M278,45 L522,45 L522,50 L278,50 Z" fill="url(#marble-stair-dark)" />
          
          {/* Step 3 */}
          <path d="M270,65 L530,65 L540,85 L260,85 Z" fill="url(#marble-stair)" />
          <path d="M260,85 L540,85 L540,92 L260,92 Z" fill="url(#marble-stair-dark)" />
          
          {/* Step 4 */}
          <path d="M250,110 L550,110 L565,135 L235,135 Z" fill="url(#marble-stair)" />
          <path d="M235,135 L565,135 L565,145 L235,145 Z" fill="url(#marble-stair-dark)" />
          
          {/* Step 5 */}
          <path d="M220,165 L580,165 L600,195 L200,195 Z" fill="url(#marble-stair)" />
          <path d="M200,195 L600,195 L600,205 L200,205 Z" fill="url(#marble-stair-dark)" />
          
          {/* Step 6 (Bottom/Nearest) */}
          <path d="M185,230 L615,230 L635,265 L165,265 Z" fill="url(#marble-stair)" />
          <path d="M165,265 L635,265 L635,280 L165,280 Z" fill="url(#marble-stair-dark)" />
          
          {/* Gold Trim on Steps */}
          <path d="M290,15 L510,15" stroke="url(#gold-accent)" strokeWidth="1" />
          <path d="M278,45 L522,45" stroke="url(#gold-accent)" strokeWidth="1.5" />
          <path d="M260,85 L540,85" stroke="url(#gold-accent)" strokeWidth="2" />
          <path d="M235,135 L565,135" stroke="url(#gold-accent)" strokeWidth="2.5" />
          <path d="M200,195 L600,195" stroke="url(#gold-accent)" strokeWidth="3" />
          <path d="M165,265 L635,265" stroke="url(#gold-accent)" strokeWidth="4" />
        </svg>
      </div>
    </div>
  );
};
