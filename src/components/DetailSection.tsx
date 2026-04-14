import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import weddingData from "../data/wedding-data.json";
import { CoupleDetail } from "./details/CoupleDetail";
import { CountdownSection } from "./details/CountdownSection";
import { EventDetails } from "./details/EventDetails";
import { GallerySection } from "./details/GallerySection";
import { GiftSection } from "./details/GiftSection";
import { RsvpWishesSection } from "./details/RsvpWishesSection";
import { ClosingSection } from "./details/ClosingSection";

gsap.registerPlugin(ScrollTrigger);

export const DetailSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.8, delay: 3.2, ease: "power2.out" }
    );

    const sections = gsap.utils.toArray(".animate-section");
    sections.forEach((section: any) => {
      const animType = section.dataset.anim || "fade-up";
      const delay = parseFloat(section.dataset.delay || "0");

      let fromVars: any = { opacity: 0 };
      let toVars: any = {
        opacity: 1,
        duration: 1.2,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          scroller: section.closest(".overflow-y-auto") || window,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      };

      switch (animType) {
        case "fade-up":
          fromVars.y = 36;
          toVars.y = 0;
          break;
        case "zoom-in":
          fromVars.scale = 0.94;
          toVars.scale = 1;
          break;
      }

      gsap.fromTo(section, fromVars, toVars);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-full flex flex-col items-center z-40 opacity-0 pb-16"
    >
      {/* ── OPENING HEADER SECTION ── */}
      <section
        className="animate-section relative min-h-[85dvh] flex flex-col items-center justify-center px-6 text-center w-full max-w-lg mt-12"
        data-anim="fade-up"
      >
        <p className="arabic-text mb-12 text-[2rem] leading-[1.8] text-[var(--color-primary-dark)]">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        <div className="flex items-center gap-3 w-full mb-8 max-w-[200px] mx-auto">
          <div className="gold-line-h flex-1" />
          <span className="text-[var(--color-gold)] text-[0.6rem]">✦</span>
          <div className="gold-line-h flex-1" />
        </div>

        <p className="section-label mb-6">
          The Wedding Of
        </p>

        <h2 className="font-script text-[4rem] text-[var(--color-primary)] leading-[0.9]">
          {weddingData.couple.bride.nickname}
        </h2>
        
        <span className="block font-sans text-[0.6rem] tracking-[0.4em] text-[var(--color-gold)] my-6">
          AND
        </span>
        
        <h2 className="font-script text-[4rem] text-[var(--color-primary)] leading-[0.9]">
          {weddingData.couple.groom.nickname}
        </h2>

        {/* Verse Highlight */}
        <div className="mt-16 bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-[rgba(197,160,89,0.15)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] mx-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-gold-light)] to-transparent opacity-50" />
          
          <p className="italic leading-relaxed font-serif text-sm text-[var(--color-text-muted)]">
            "{weddingData.quotes.detail}"
          </p>
          <div className="flex items-center justify-center mt-4 gap-2">
            <div className="w-4 h-[1px] bg-[var(--color-gold)]/40" />
            <p className="font-sans text-[0.55rem] tracking-[0.25em] text-[var(--color-gold-dark)] uppercase">
              {weddingData.quotes.mainSource}
            </p>
            <div className="w-4 h-[1px] bg-[var(--color-gold)]/40" />
          </div>
        </div>
      </section>

      {/* ── SCROLLABLE DETAIL SECTIONS ── */}
      <div className="relative w-full max-w-lg mx-auto px-5 space-y-0">
        <CoupleDetail />
        <CountdownSection />
        <EventDetails />
        {/* <GallerySection /> */}
        <GiftSection />
        <RsvpWishesSection />
        <ClosingSection />
      </div>
    </div>
  );
};
