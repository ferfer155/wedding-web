import React, { useState, useRef, useEffect } from "react";
import { Music, Pause, Play } from "lucide-react";

interface MusicPlayerProps {
  src: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Set initial volume to 0 before playing
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          
          // Fade in over 3 seconds
          let vol = 0;
          const fadeInterval = setInterval(() => {
            if (vol < 1.0) {
              vol += 0.05;
              if (vol > 1.0) vol = 1.0;
              if (audioRef.current) {
                audioRef.current.volume = vol;
              }
            } else {
              clearInterval(fadeInterval);
            }
          }, 150);
        }).catch(e => console.log("Audio play failed:", e));
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[900]">
      <button
        onClick={togglePlay}
        className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-105 group"
        style={{
          background: "var(--color-bg-light)",
          border: "1px solid rgba(197, 160, 89, 0.4)",
          boxShadow: "0 8px 24px -6px rgba(0,0,0,0.1)",
        }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Pulsing ring when playing */}
        <div 
          className={`absolute inset-0 rounded-full border border-[var(--color-gold)] transition-opacity duration-1000 ${
            isPlaying ? "opacity-100 animate-ping [animation-duration:3s]" : "opacity-0"
          }`}
        />
        
        {/* Inner ring */}
        <div className="absolute inset-1 rounded-full border border-[rgba(197,160,89,0.15)] pointer-events-none" />

        <div className="relative z-10 flex items-center justify-center text-[var(--color-primary-light)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
          {isPlaying ? (
            <Music className="w-4 h-4 animate-spin [animation-duration:8s] [animation-timing-function:linear]" />
          ) : (
            <Play className="w-4 h-4 translate-x-[1px]" />
          )}
        </div>
      </button>
    </div>
  );
};
