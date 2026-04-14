import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const GardenLayer: React.FC = () => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 60;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

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
      className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] pointer-events-none z-20 will-change-transform"
    >
      {/* Princess Silhouette */}
      <svg 
        viewBox="0 0 300 400" 
        className="absolute bottom-[2%] left-[60%] -translate-x-1/2 w-[280px] h-[380px] fill-[#110A1A] drop-shadow-[0_0_25px_rgba(255,215,0,0.4)] z-10"
      >
        <g transform="translate(50, 20)">
          {/* Princess Dress / Ballgown */}
          <path d="M100,100 C120,100 130,120 120,160 C110,200 160,250 180,350 L20,350 C40,250 90,200 80,160 C70,120 80,100 100,100 Z" />
          {/* Torso */}
          <path d="M100,60 C115,60 110,90 100,100 C90,90 85,60 100,60 Z" />
          {/* Head & Hair */}
          <circle cx="100" cy="45" r="15" />
          <path d="M100,30 C120,30 125,50 115,65 C110,75 105,80 100,80 C90,80 80,60 100,30 Z" />
          {/* Crown */}
          <path d="M90,35 L95,20 L100,30 L105,20 L110,35 Z" fill="#FFD700" />
          {/* Arm holding dress */}
          <path d="M110,75 C130,80 140,110 135,140" stroke="#110A1A" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M90,75 C70,80 60,110 65,140" stroke="#110A1A" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Dress sparkles/details */}
          <path d="M100,120 C110,150 140,200 150,280" stroke="#FFD700" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M100,120 C90,150 60,200 50,280" stroke="#FFD700" strokeWidth="1" fill="none" opacity="0.3" />
        </g>
      </svg>

      {/* Magical Royal Garden Foliage */}
      <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-[45vh] drop-shadow-2xl overflow-visible">
        <defs>
          <filter id="glow-magical" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="rose-magenta" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FF69B4" />
            <stop offset="100%" stopColor="#8B008B" />
          </radialGradient>
          <radialGradient id="rose-gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </radialGradient>
          
          {/* Ornate Golden Gate Element */}
          <g id="golden-gate" stroke="#DAA520" strokeWidth="3" fill="none" filter="url(#glow-magical)" opacity="0.8">
            <path d="M0,100 C20,80 40,80 50,50 C60,80 80,80 100,100" />
            <path d="M50,50 L50,200" />
            <circle cx="50" cy="40" r="6" fill="#FFD700" />
            <path d="M20,120 C40,120 45,140 50,140" />
            <path d="M80,120 C60,120 55,140 50,140" />
          </g>

          {/* Golden Leaf Cluster */}
          <g id="gold-leaf">
            <path d="M0,0 Q15,-25 40,-10 Q25,15 0,0 Z" fill="#B8860B" />
            <path d="M0,0 Q-15,-25 -40,-10 Q-25,15 0,0 Z" fill="#DAA520" />
            <path d="M0,0 Q10,-35 20,-45 Q-10,-35 0,0 Z" fill="#FFD700" />
          </g>

          {/* Magical Rose */}
          <g id="magical-rose">
            <circle cx="0" cy="0" r="18" fill="url(#rose-magenta)" filter="url(#glow-magical)" />
            <path d="M-6,-6 Q0,-18 6,-6 Q18,0 6,6 Q0,18 -6,6 Q-18,0 -6,-6 Z" fill="#FFFFFF" opacity="0.8" />
            <circle cx="0" cy="0" r="6" fill="#FFD700" />
          </g>

          {/* Golden Rose */}
          <g id="golden-rose">
            <circle cx="0" cy="0" r="14" fill="url(#rose-gold)" filter="url(#glow-magical)" />
            <path d="M-5,-5 Q0,-15 5,-5 Q15,0 5,5 Q0,15 -5,5 Q-15,0 -5,-5 Z" fill="#FFFFFF" opacity="0.9" />
            <circle cx="0" cy="0" r="4" fill="#FFF8DC" />
          </g>
        </defs>

        {/* Dark Magical Base */}
        <path d="M0,400 L0,150 Q100,100 250,200 T500,350 L500,400 Z" fill="#110A1A" opacity="0.95" />
        <path d="M0,400 L0,200 Q150,200 300,300 T550,400 Z" fill="#1A1025" opacity="0.95" />
        
        <path d="M1200,400 L1200,100 Q1050,80 900,220 T650,380 L650,400 Z" fill="#110A1A" opacity="0.95" />
        <path d="M1200,400 L1200,180 Q1000,240 850,320 T600,400 Z" fill="#1A1025" opacity="0.95" />

        {/* Golden Gates integrated into foliage */}
        <use href="#golden-gate" x="50" y="180" transform="scale(1.5)" />
        <use href="#golden-gate" x="200" y="250" transform="scale(1.2)" />
        <use href="#golden-gate" x="1000" y="150" transform="scale(1.6)" />
        <use href="#golden-gate" x="850" y="280" transform="scale(1.3)" />

        {/* Left Golden Foliage */}
        <g>
          <use href="#gold-leaf" x="80" y="200" transform="scale(1.5) rotate(20)" />
          <use href="#gold-leaf" x="180" y="250" transform="scale(2) rotate(45)" />
          <use href="#gold-leaf" x="280" y="320" transform="scale(1.2) rotate(70)" />
          <use href="#gold-leaf" x="100" y="280" transform="scale(1.8) rotate(-10)" />
          <use href="#gold-leaf" x="350" y="380" transform="scale(1.5) rotate(30)" />
        </g>

        {/* Right Golden Foliage */}
        <g>
          <use href="#gold-leaf" x="1120" y="150" transform="scale(1.5) rotate(-20)" />
          <use href="#gold-leaf" x="1020" y="220" transform="scale(2) rotate(-45)" />
          <use href="#gold-leaf" x="920" y="300" transform="scale(1.2) rotate(-70)" />
          <use href="#gold-leaf" x="1080" y="320" transform="scale(1.8) rotate(10)" />
          <use href="#gold-leaf" x="820" y="380" transform="scale(1.5) rotate(-30)" />
        </g>

        {/* Left Magical Roses */}
        <use href="#magical-rose" x="100" y="220" transform="scale(1.5)" />
        <use href="#golden-rose" x="200" y="280" transform="scale(2)" />
        <use href="#magical-rose" x="300" y="350" transform="scale(1.2)" />
        <use href="#golden-rose" x="140" y="320" transform="scale(1.8)" />
        <use href="#magical-rose" x="60" y="300" transform="scale(1.3)" />
        
        {/* Right Magical Roses */}
        <use href="#magical-rose" x="1100" y="180" transform="scale(1.6)" />
        <use href="#golden-rose" x="1000" y="260" transform="scale(2.2)" />
        <use href="#magical-rose" x="900" y="340" transform="scale(1.4)" />
        <use href="#golden-rose" x="1060" y="350" transform="scale(1.9)" />
        <use href="#magical-rose" x="1150" y="280" transform="scale(1.5)" />
      </svg>

      {/* Golden Pixie Dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[#FFD700] mix-blend-screen animate-pulse"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
              boxShadow: '0 0 15px 4px rgba(255,215,0,0.8)',
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `translateY(${Math.random() * -40}px)`
            }}
          />
        ))}
      </div>
    </div>
  );
};
