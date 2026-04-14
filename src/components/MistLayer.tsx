import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MistLayerProps {
  speed: 'slow' | 'fast';
  opacity: number;
}

export const MistLayer: React.FC<MistLayerProps> = ({ speed, opacity }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = speed === 'slow' ? 40 : 25;

    gsap.to(containerRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: duration,
      repeat: -1
    });
  }, [speed]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden mix-blend-screen" style={{ opacity }}>
      <div 
        ref={containerRef} 
        className="absolute top-0 left-0 w-[200%] h-full flex will-change-transform"
      >
        {[0, 1].map((i) => (
          <div key={i} className="w-1/2 h-full relative">
            {/* Using radial-gradients instead of blur() for massive performance improvement */}
            <div className="absolute top-[20%] left-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_60%)]" />
            <div className="absolute top-[40%] left-[30%] w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(250,218,221,0.25)_0%,transparent_60%)]" />
            <div className="absolute top-[10%] left-[60%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(255,249,217,0.2)_0%,transparent_60%)]" />
            <div className="absolute top-[50%] left-[0%] w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(255,229,224,0.25)_0%,transparent_60%)]" />
            <div className="absolute top-[30%] left-[70%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_60%)]" />
          </div>
        ))}
      </div>
    </div>
  );
};
