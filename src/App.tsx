import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionOverlay } from "./components/TransitionOverlay";
import { DetailSection } from "./components/DetailSection";
import { FlowerDecorations } from "./components/details/FlowerDecorations";
import { LoadingScreen } from "./components/LoadingScreen";
import { MusicPlayer } from "./components/MusicPlayer";
import { SmoothScroll } from "./components/animations/SmoothScroll";
import weddingData from "./data/wedding-data.json";

gsap.registerPlugin(ScrollTrigger);

// Animated Background Component
const DetailBackground = () => {
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(
      scaleRef.current,
      { scale: 1.3, transformOrigin: "top center" },
      { scale: 1, duration: 4.2, ease: "power3.inOut" },
    );

    // Parallax scroll effect
    const scroller = document.getElementById("detail-scroll-container");
    if (scroller && parallaxRef.current && bgContainerRef.current) {
      // Small delay to ensure content is rendered and heights are calculated
      setTimeout(() => {
        const bgMaxScroll =
          parallaxRef.current!.scrollHeight -
          bgContainerRef.current!.clientHeight;

        if (bgMaxScroll > 0) {
          gsap.to(parallaxRef.current, {
            y: () => {
              const max =
                parallaxRef.current!.scrollHeight -
                bgContainerRef.current!.clientHeight;
              return -max;
            },
            ease: "none",
            scrollTrigger: {
              trigger: scroller.firstElementChild,
              scroller: scroller,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      }, 100);
    }
  }, []);

  return (
    <div ref={bgContainerRef} className="absolute inset-0 z-0 overflow-hidden">
      <div ref={scaleRef} className="w-full h-full">
        <div ref={parallaxRef} className="w-full flex flex-col">
          <div className="relative w-full h-[100vh]">
            <img
              src="/image 7.jpeg"
              alt="Detail Background 1"
              className="w-full h-full object-cover object-top opacity-80 mix-blend-multiply"
              onError={(e) => {
                e.currentTarget.src =
                  "https://picsum.photos/seed/mosque-pink/1080/1920";
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-bg-light)] to-transparent"></div>
          </div>
          <div className="relative w-full h-[100vh]">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-bg-light)] to-transparent z-10"></div>
            <img
              src="/bakground_detail_1.png"
              alt="Detail Background 2"
              className="w-full h-full object-cover object-top opacity-80 mix-blend-multiply"
              onError={(e) => {
                e.currentTarget.src =
                  "https://picsum.photos/seed/bg1/1080/1920";
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-bg-light)] to-transparent z-10"></div>
          </div>
          <div className="relative w-full h-[100vh]">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-bg-light)] to-transparent z-10"></div>
            <img
              src="/bakground_detail_2.png"
              alt="Detail Background 3"
              className="w-full h-full object-cover object-top opacity-80 mix-blend-multiply"
              onError={(e) => {
                e.currentTarget.src =
                  "https://picsum.photos/seed/bg2/1080/1920";
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-bg-light)] to-transparent z-10"></div>
          </div>
          <div className="relative w-full h-[100vh]">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-bg-light)] to-transparent z-10"></div>
            <img
              src="/bakground_detail_3.png"
              alt="Detail Background 4"
              className="w-full h-full object-cover object-top opacity-80 mix-blend-multiply"
              onError={(e) => {
                e.currentTarget.src =
                  "https://picsum.photos/seed/bg3/1080/1920";
              }}
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-light)]/10 via-[var(--color-bg-light)]/30 to-[var(--color-bg-light)]/90 pointer-events-none"></div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [guestName, setGuestName] = useState("Saudara/i");

  const desktopLeftRef = useRef<HTMLDivElement>(null);
  const desktopRightContentRef = useRef<HTMLDivElement>(null);
  const desktopTransitionRef = useRef<{ play: (cb?: () => void) => void }>(
    null,
  );

  const mobileContentRef = useRef<HTMLDivElement>(null);
  const mobileTransitionRef = useRef<{ play: (cb?: () => void) => void }>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      const name = to
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setGuestName(name);
    }

    gsap.set(
      [
        desktopLeftRef.current,
        desktopRightContentRef.current,
        mobileContentRef.current,
      ],
      {
        opacity: 0,
        scale: 0.95,
        y: 20,
      },
    );
  }, []);

  const handleSplitStart = () => {
    gsap.to(
      [
        desktopLeftRef.current,
        desktopRightContentRef.current,
        mobileContentRef.current,
      ],
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 2.5,
        ease: "expo.out",
        stagger: 0.1,
      },
    );
  };

  const handleLihatDetail = (isMobile: boolean) => {
    const contentRef = isMobile ? mobileContentRef : desktopRightContentRef;
    const transitionRef = isMobile ? mobileTransitionRef : desktopTransitionRef;

    if (!transitionRef.current || !contentRef.current) {
      setIsDetailVisible(true);
      return;
    }

    const textContainer = contentRef.current.querySelector(".relative.z-10");
    const bgImage = contentRef.current.querySelector("img");
    const weddingCouple = contentRef.current.querySelector(".wedding-couple");

    const tl = gsap.timeline();

    // 1. Teks memudar ke atas
    tl.to(textContainer, {
      opacity: 0,
      y: -50,
      duration: 1.2,
      ease: "power2.inOut",
    });

    // 2. Zoom background
    if (bgImage) {
      tl.to(
        bgImage,
        {
          scale: 3,
          transformOrigin: "50% 70%",
          duration: 4,
          ease: "power3.inOut",
        },
        0,
      );
    }

    // 3. Zoom and fade out wedding couple
    if (weddingCouple) {
      tl.to(
        weddingCouple,
        {
          scale: 1.5,
          opacity: 0,
          transformOrigin: "50% 100%",
          duration: 2.5,
          ease: "power2.inOut",
        },
        0,
      );
    }

    // 4. Trigger 3D Transition
    tl.add(() => {
      transitionRef.current?.play(() => {
        setIsDetailVisible(true);
        if (contentRef.current) {
          gsap.set(contentRef.current, { display: "none" });
        }
      });
    }, 2.3);
  };

  return (
    <>
      <MusicPlayer src="/music.mp3" playOnOpen={isDetailVisible} />

      {!isLoaded && (
        <LoadingScreen
          onSplitStart={handleSplitStart}
          onComplete={() => setIsLoaded(true)}
        />
      )}

      <div className="relative w-full min-h-screen bg-[var(--color-bg-light)] overflow-hidden font-serif text-[var(--color-text-main)]">
        <div className="md:flex relative w-full h-screen flex-row">
          {/* Left Side */}
          <div
            ref={desktopLeftRef}
            className="hidden md:flex flex-col items-center justify-center relative w-[65%] h-full overflow-hidden p-8 lg:p-16"
          >
            <img
              src="/image 2.jpg"
              alt="Palace and Garden Background"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
              onError={(e) => {
                e.currentTarget.src =
                  "https://picsum.photos/seed/palace/1920/1080";
              }}
            />
            {/* Elegant overlay using new vars */}
            <div className="absolute inset-0 bg-[var(--color-bg-light)]/20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,250,245,0.8)_0%,rgba(252,250,245,0)_70%)] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mt-20 px-8">
              {/* Bismillah */}
              <p className="arabic-text text-2xl lg:text-3xl text-[var(--color-primary)] mb-8 drop-shadow-sm">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </p>

              <p className="section-label mb-6 text-[var(--color-gold-dark)] drop-shadow-sm">
                The Wedding Of
              </p>

              <h1 className="text-7xl lg:text-9xl font-script text-[var(--color-primary)] mb-12 drop-shadow-sm leading-[0.8]">
                {weddingData.couple.bride.nickname} &{" "}
                {weddingData.couple.groom.nickname}
              </h1>

              {/* Elegant Divider */}
              <div className="flex items-center justify-center w-full max-w-md mb-12 opacity-80">
                <div className="gold-line-h flex-1"></div>
                <div className="mx-6 text-[var(--color-gold)] text-[1rem]">
                  ✦
                </div>
                <div className="gold-line-h flex-1"></div>
              </div>

              <p className="text-base lg:text-xl italic leading-relaxed text-[var(--color-text-main)] max-w-3xl drop-shadow-sm">
                "{weddingData.quotes.main}"
              </p>

              <p className="font-sans text-[0.6rem] font-medium tracking-[0.2em] mt-8 uppercase text-[var(--color-gold-dark)] drop-shadow-sm">
                {weddingData.quotes.mainSource}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative w-full md:w-[35%] h-full flex flex-col items-center justify-center overflow-hidden z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.08)] bg-[var(--color-bg-light)]">
            {/* Initial Content (Cover) */}
            <div
              ref={desktopRightContentRef}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pt-8 md:pt-0"
            >
              <img
                src="/image_background_1.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://picsum.photos/seed/palace/800/1200";
                }}
              />

              <div className="relative z-10 flex flex-col items-center h-full justify-center w-full space-y-8 p-8">
                <div className="flex flex-col items-center text-center w-full px-4 mt-auto">
                  <p className="section-label mb-4 drop-shadow-sm">
                    The Wedding Of
                  </p>
                  <h1 className="text-6xl md:text-7xl font-script text-[var(--color-primary)] py-8 leading-[0.8] drop-shadow-sm">
                    <p>{weddingData.couple.bride.nickname}</p>
                    <p className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] my-2">
                      &amp;
                    </p>
                    <p>{weddingData.couple.groom.nickname}</p>
                  </h1>

                  {/* Guest Name */}
                  <div className="pt-6 w-full flex flex-col items-center space-y-2">
                    <p className="font-sans text-[0.55rem] tracking-[0.3em] font-medium text-[var(--color-text-muted)] uppercase drop-shadow-sm">
                      Dear
                    </p>
                    <p className="font-serif text-lg font-bold text-[var(--color-text-main)] drop-shadow-sm">
                      {guestName}
                    </p>
                  </div>
                </div>

                <div className="w-full mt-auto mb-12">
                  <button
                    onClick={() => handleLihatDetail(false)}
                    className="btn-luxury w-full"
                  >
                    Buka Undangan
                  </button>
                </div>
              </div>
            </div>

            <TransitionOverlay ref={desktopTransitionRef} />

            {/* Detail Section (Scoped to right side) */}
            {isDetailVisible && (
              <div className="absolute inset-0 z-40 overflow-hidden bg-[var(--color-bg-light)]">
                <DetailBackground />
                <FlowerDecorations />
                {/* Thin Golden Border Frame replacing thick old borders */}
                <div className="absolute inset-4 border border-[var(--color-gold)]/20 pointer-events-none rounded-xl z-20" />

                <SmoothScroll>
                  <DetailSection />
                </SmoothScroll>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
