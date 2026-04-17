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
  const logoRef = useRef<HTMLImageElement>(null);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    // 1. Progress Animation
    const progressDuration = 3.2; // Sedikit lebih lambat untuk menikmati animasi

    gsap.to(
      { val: 0 },
      {
        val: 100,
        duration: progressDuration,
        ease: "power1.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
      },
    );

    // Initial fade in for content & Logo Reveal
    const initTl = gsap.timeline();

    // Animasikan logo muncul elegan (blur, opacity, scale down)
    if (logoRef.current) {
      initTl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 1.2, filter: "blur(10px)", y: -20 },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 2,
          ease: "power3.out",
        },
      );
    }

    initTl.fromTo(
      contentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
      "-=1.2", // Overlap animasi teks dan logo
    );

    gsap.fromTo(
      lineRef.current,
      { width: "0%" },
      { width: "100%", duration: progressDuration, ease: "power1.inOut" },
    );

    // Cinematic Exit (Split Screen)
    // Tunggu progress selesai, ditambah sedikit waktu jeda agar logo bisa diamati
    const tl = gsap.timeline({
      delay: progressDuration + 1.2,
      onStart: () => {
        if (onSplitStart) onSplitStart();
      },
      onComplete: () => {
        gsap.set(containerRef.current, { clearProps: "all", display: "none" });
        onComplete();
      },
    });

    // Pudar & tarik logo ke atas sambil memburam
    tl.to(logoRef.current, {
      opacity: 0,
      y: -30,
      scale: 1.1,
      filter: "blur(10px)",
      duration: 1,
      ease: "power2.inOut",
    });

    // Pudar teks bersamaan dengan logo
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "<0.2",
    );

    // Split panels
    tl.to(
      leftPanelRef.current,
      {
        xPercent: -100,
        duration: 1.8,
        ease: "expo.inOut",
      },
      "+=0.1",
    );

    tl.to(
      rightPanelRef.current,
      {
        xPercent: 100,
        duration: 1.8,
        ease: "expo.inOut",
      },
      "<",
    );
  }, [onComplete, onSplitStart]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex w-full h-full overflow-hidden pointer-events-none"
    >
      {/* ── SPLIT PANELS ── */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[var(--color-bg-light)] shadow-[20px_0_40px_-10px_rgba(0,0,0,0.03)]"
      ></div>
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-bg-light)]"
      ></div>

      {/* ── CONTENT (Centered perfectly over split) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 space-y-12">
        {/* LOGO ANIMATION */}
        <div
          ref={logoRef}
          className="relative opacity-0 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center"
        >
          <img
            src={weddingData.branding.logo}
            alt="Wedding Logo"
            className="w-full h-full object-contain filter drop-shadow-md"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          {/* Subtle glow behind logo */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.1)_0%,transparent_70%)] -z-10 mix-blend-multiply" />
        </div>

        <div
          ref={contentRef}
          className="flex flex-col items-center max-w-sm w-full text-center"
        >
          <p className="section-label mb-8 tracking-[0.4em] text-[0.55rem]">
            Awaiting the moments...
          </p>

          {/* Progress Bar Container */}
          <div className="w-48 h-[1px] bg-[rgba(197,160,89,0.2)] mb-3 relative overflow-hidden">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 h-full bg-[var(--color-gold)]"
              style={{ width: "0%" }}
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
