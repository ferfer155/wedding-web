import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import weddingData from "../../data/wedding-data.json";

interface TimeUnit {
  label: string;
  value: number;
}

const DecorativeButterflies = () => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/Butterfly%20Lottie%20Animation.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch animation data");
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Error loading lottie", err));
  }, []);

  if (!animationData) return null;

  return (
    <>
      <style>{`
        @keyframes orbit-1 {
          0% { transform: rotate(0deg) translateX(160px) rotate(90deg); }
          100% { transform: rotate(360deg) translateX(160px) rotate(90deg); }
        }
        @keyframes orbit-2 {
          0% { transform: rotate(120deg) translateX(220px) rotate(90deg); }
          100% { transform: rotate(480deg) translateX(220px) rotate(90deg); }
        }
        @keyframes orbit-3 {
          0% { transform: rotate(240deg) translateX(190px) rotate(-90deg) scaleX(-1); }
          100% { transform: rotate(-120deg) translateX(190px) rotate(-90deg) scaleX(-1); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(15deg); }
          50% { transform: translate(40px, -50px) rotate(35deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(-20deg) scaleX(-1); }
          50% { transform: translate(-50px, 40px) rotate(-5deg) scaleX(-1); }
        }
      `}</style>

      {/* Floating Butterflies (Melayang santai di sudut) */}
      <div
        className="absolute -top-10 -left-10 w-28 h-28 opacity-60 pointer-events-none z-100"
        style={{ animation: "float-1 7s ease-in-out infinite" }}
      >
        <Lottie animationData={animationData} loop={true} />
      </div>
      <div
        className="absolute -bottom-10 -right-4 w-32 h-32 opacity-70 pointer-events-none"
        style={{ animation: "float-2 9s ease-in-out infinite" }}
      >
        <Lottie animationData={animationData} loop={true} />
      </div>
    </>
  );
};

const CountdownTile: React.FC<{
  value: number;
  label: string;
  delay: number;
}> = ({ value, label, delay }) => {
  return (
    <div
      className="animate-section flex flex-col items-center justify-center relative w-16 h-20"
      data-anim="fade-up"
      data-delay={delay}
    >
      <div className="absolute inset-0 border-[0.5px] border-[var(--color-gold)]/30 rounded-t-full bg-white/40 shadow-sm" />
      <span className="font-serif text-[1.75rem] font-medium text-[var(--color-primary-dark)] relative z-10 tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <p className="font-sans text-[0.45rem] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mt-1 relative z-10">
        {label}
      </p>
    </div>
  );
};

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { label: "Hari", value: 0 },
    { label: "Jam", value: 0 },
    { label: "Menit", value: 0 },
    { label: "Detik", value: 0 },
  ]);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const targetDate = new Date(weddingData.events.targetDate).getTime();

    const update = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsExpired(true);
        setTimeLeft([
          { label: "Hari", value: 0 },
          { label: "Jam", value: 0 },
          { label: "Menit", value: 0 },
          { label: "Detik", value: 0 },
        ]);
        return;
      }

      setTimeLeft([
        { label: "Hari", value: Math.floor(distance / (1000 * 60 * 60 * 24)) },
        {
          label: "Jam",
          value: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
        },
        {
          label: "Menit",
          value: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        },
        { label: "Detik", value: Math.floor((distance % (1000 * 60)) / 1000) },
      ]);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="py-20 w-full flex flex-col items-center relative overflow-hidden"
      id="countdown-section"
    >
      <div className="w-full max-w-sm mx-auto relative rounded-3xl p-8 border border-[var(--color-gold)]/20 shadow-[0_30px_60px_-15px_rgba(122,46,57,0.05)] bg-[var(--color-bg-light)] overflow-visible">
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-[1px] border-l-[1px] border-[var(--color-gold)]/50" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-[1px] border-r-[1px] border-[var(--color-gold)]/50" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-[1px] border-l-[1px] border-[var(--color-gold)]/50" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-[1px] border-r-[1px] border-[var(--color-gold)]/50" />

        {/* Lottie Butterflies */}
        <DecorativeButterflies />

        <div
          className="animate-section text-center space-y-4 mb-10 relative z-10"
          data-anim="fade-up"
        >
          <p className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
            Menuju Hari Bahagia
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          {isExpired ? (
            <div className="text-center py-6">
              <p className="font-script text-[3rem] text-[var(--color-primary)]">
                Acara Telah Tiba
              </p>
            </div>
          ) : (
            <>
              {timeLeft.map((unit, idx) => (
                <React.Fragment key={unit.label}>
                  <CountdownTile
                    value={unit.value}
                    label={unit.label}
                    delay={idx * 0.1}
                  />
                  {idx < 3 && (
                    <span className="font-serif text-2xl text-[var(--color-gold)]/50 mb-4">
                      :
                    </span>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
