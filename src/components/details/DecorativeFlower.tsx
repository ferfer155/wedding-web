import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface DecorativeFlowerProps {
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export const DecorativeFlower: React.FC<DecorativeFlowerProps> = ({
  className = "",
  style,
  delay = 0,
}) => {
  const flowerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!flowerRef.current) return;

    // Subtle floating and rotating animation
    gsap.to(flowerRef.current, {
      y: "+=8",
      rotation: "+=4",
      duration: 3 + Math.random() * 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: delay,
    });
  }, [delay]);

  return (
    <img
      ref={flowerRef}
      src="/flower.png"
      alt="Flower Decoration"
      className={`absolute pointer-events-none z-0 opacity-80 ${className}`}
      style={style}
    />
  );
};
