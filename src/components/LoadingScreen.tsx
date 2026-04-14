import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import weddingData from "../data/wedding-data.json";

interface LoadingScreenProps {
  onComplete: () => void;
  onSplitStart?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  onSplitStart,
}) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    // 1. Progress Animation
    const progressDuration = 2.5; 
    
    gsap.to(
      { val: 0 },
      {
        val: 100,
        duration: progressDuration,
        ease: "power1.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
      }
    );

    // Initial fade in for content
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", delay: 0.2 }
    );
    
    gsap.fromTo(lineRef.current,
      { width: "0%" },
      { width: "100%", duration: progressDuration, ease: "power1.inOut" }
    );

    // 2. Cinematic Exit (Split Screen)
    const tl = gsap.timeline({
      delay: progressDuration + 0.5,
      onStart: () => {
        if (onSplitStart) onSplitStart();
      },
      onComplete: () => {
        onComplete();
      },
    });

    // Fade out text rapidly
    tl.to(contentRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });

    // Split panels
    tl.to(leftPanelRef.current, {
      xPercent: -100,
      duration: 1.8,
      ease: "expo.inOut",
    }, "+=0.1");

    tl.to(rightPanelRef.current, {
        xPercent: 100,
        duration: 1.8,
        ease: "expo.inOut",
    }, "<");

  }, [onComplete, onSplitStart]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex w-full h-full overflow-hidden pointer-events-none"
    >
      {/* ── SPLIT PANELS ── */}
      <div 
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[var(--color-bg-light)] border-r border-[rgba(197,160,89,0.15)] shadow-[20px_0_40px_-10px_rgba(0,0,0,0.03)]"
      >
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--color-primary-light)]/20 to-transparent" />
      </div>
      <div 
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-bg-light)]"
      >
      </div>

      {/* ── CONTENT (Centered perfectly over split) ── */}
      <div 
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10"
      >
        <div className="flex flex-col items-center max-w-sm w-full text-center">
          
          <p className="font-script text-4xl text-[var(--color-primary-light)] mb-4 tracking-wider">
             L & G
          </p>

          <p className="section-label mb-8 tracking-[0.4em] text-[0.55rem]">
            Awaiting the moments...
          </p>
          
          {/* Progress Bar Container */}
          <div className="w-48 h-[1px] bg-[rgba(197,160,89,0.2)] mb-3 relative overflow-hidden">
            <div 
              ref={lineRef}
              className="absolute top-0 left-0 h-full bg-[var(--color-gold)]"
              style={{ width: '0%' }}
            />
          </div>
          
          <div className="font-sans text-[0.6rem] text-[var(--color-gold-dark)] tracking-widest font-light">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};
