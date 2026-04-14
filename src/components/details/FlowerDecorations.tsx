import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const FlowerDecorations: React.FC = () => {
  const tlRef = useRef<HTMLImageElement>(null);
  const trRef = useRef<HTMLImageElement>(null);
  const blRef = useRef<HTMLImageElement>(null);
  const brRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const elements = [
      tlRef.current,
      trRef.current,
      blRef.current,
      brRef.current,
    ];

    // Initial entrance with a gentle spring effect
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        scale: 0.5,
        rotation: (i) => (i % 2 === 0 ? -15 : 15),
      },
      {
        opacity: 0.85,
        scale: 1,
        rotation: 0,
        duration: 2.5,
        ease: "back.out(1.2)",
        stagger: 0.3,
        delay: 3.5,
        onComplete: () => {
          const animateFlower = (
            element: HTMLElement | null,
            delay: number,
            rotationDir: number,
          ) => {
            if (!element) return;

            // 1. Gentle swaying (Rotation)
            gsap.to(element, {
              rotation: rotationDir * 6,
              duration: 4.5 + Math.random(),
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: delay,
            });

            // 2. Organic breathing (Scale)
            gsap.to(element, {
              scale: 1.06,
              duration: 3.5 + Math.random(),
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: delay + 0.5,
            });

            // 3. Subtle floating (Translation)
            gsap.to(element, {
              x: rotationDir * 8,
              y: rotationDir * 4,
              duration: 5 + Math.random(),
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: delay + 1,
            });
          };

          animateFlower(tlRef.current, 0, 1);
          animateFlower(trRef.current, 1, -1);
          animateFlower(blRef.current, 2, 1);
          animateFlower(brRef.current, 3, -1);
        },
      },
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Top Left */}
      <div
        className="absolute -top-8 -left-8 w-32"
        style={{ transform: "scaleY(-1)" }}
      >
        <img
          ref={tlRef}
          src="/flower.png"
          alt="Flower Decoration"
          className="w-full h-full object-contain origin-bottom-left"
        />
      </div>
      {/* Top Right */}
      <div
        className="absolute -top-8 -right-8 w-32"
        style={{ transform: "scale(-1, -1)" }}
      >
        <img
          ref={trRef}
          src="/flower.png"
          alt="Flower Decoration"
          className="w-full h-full object-contain origin-bottom-left"
        />
      </div>
      {/* Bottom Left */}
      <div className="absolute -bottom-8 -left-8 w-32">
        <img
          ref={blRef}
          src="/flower.png"
          alt="Flower Decoration"
          className="w-full h-full object-contain origin-bottom-left"
        />
      </div>
      {/* Bottom Right */}
      <div
        className="absolute -bottom-8 -right-8 w-32"
        style={{ transform: "scaleX(-1)" }}
      >
        <img
          ref={brRef}
          src="/flower.png"
          alt="Flower Decoration"
          className="w-full h-full object-contain origin-bottom-left"
        />
      </div>
    </div>
  );
};
