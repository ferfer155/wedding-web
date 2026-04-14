import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ParticlesProps {
  count: number;
}

export const Particles: React.FC<ParticlesProps> = ({ count }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = containerRef.current.children;

    Array.from(particles).forEach((particle) => {
      const el = particle as HTMLElement;
      // Random initial positions
      gsap.set(el, {
        x: () => Math.random() * window.innerWidth,
        y: () => Math.random() * window.innerHeight,
        scale: () => Math.random() * 0.5 + 0.5,
        opacity: () => Math.random() * 0.5 + 0.2
      });

      // Animate particles
      gsap.to(el, {
        y: `-=${Math.random() * 200 + 100}`,
        x: `+=${Math.random() * 100 - 50}`,
        opacity: 0,
        duration: () => Math.random() * 4 + 4,
        ease: 'power1.out',
        repeat: -1,
        delay: () => Math.random() * 5,
        onRepeat: () => {
          gsap.set(el, {
            y: window.innerHeight + 50,
            x: Math.random() * window.innerWidth,
            opacity: Math.random() * 0.5 + 0.2
          });
        }
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-glow-yellow rounded-full blur-[2px] shadow-[0_0_10px_rgba(255,249,217,0.8)]"
        />
      ))}
    </div>
  );
};
