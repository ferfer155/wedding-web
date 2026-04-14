import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const TextContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    if (containerRef.current) {
      const children = containerRef.current.children;
      tl.fromTo(
        children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.3, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center space-y-4 mb-6 relative z-30">
      <p className="text-sm md:text-base font-medium tracking-widest text-[#4A3B32] uppercase opacity-90">
        The Wedding Of
      </p>
      
      <h1 className="text-6xl md:text-7xl font-script text-[#8B4513] py-2 drop-shadow-sm" style={{ lineHeight: '1.2' }}>
        Febby & Rozi
      </h1>
      
      <div className="flex flex-col items-center space-y-1 pt-6 text-[#4A3B32]">
        <p className="text-sm font-medium opacity-80">Dear</p>
        <p className="text-lg font-semibold">Saudara/i</p>
      </div>
    </div>
  );
};
