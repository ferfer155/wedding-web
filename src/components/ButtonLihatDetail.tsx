import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ButtonProps {
  onClick: () => void;
}

export const ButtonLihatDetail: React.FC<ButtonProps> = ({ onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Subtle pulse animation
    gsap.to(buttonRef.current, {
      scale: 1.05,
      boxShadow: '0 4px 15px rgba(184, 107, 119, 0.4)',
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="relative overflow-hidden group px-8 py-3 mt-6 rounded-full bg-[#B86B77] text-white font-medium tracking-widest uppercase transition-all duration-500 hover:bg-[#9A5560] hover:scale-110 active:scale-95 z-40 shadow-md text-sm"
    >
      <span className="relative z-10 flex items-center justify-center">
        <span>Buka Undangan</span>
      </span>
      
      {/* Hover Light Sweep */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
    </button>
  );
};
