import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current.firstElementChild as HTMLElement,
      duration: 1.5, // Bobot scroll mewah, tidak terlalu pelan, tidak terlalu cepat
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential Out
      smoothWheel: true,
      wheelMultiplier: 0.85, // Memberikan resistensi pada roda mouse agar terasa berat & premium
      syncTouch: false, // Matikan sinkronisasi agar momentum native Android/iOS tidak terganggu
      touchMultiplier: 1.5, // Sedikit akselerasi tarikan jari agar cepat namun tetap smooth
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="detail-scroll-container"
      className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scroll-smooth"
    >
      <div className="w-full relative">{children}</div>
    </div>
  );
};
