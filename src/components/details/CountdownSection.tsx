import React, { useState, useEffect } from "react";
import weddingData from "../../data/wedding-data.json";

interface TimeUnit {
  label: string;
  value: number;
}

const CountdownTile: React.FC<{ value: number; label: string; delay: number }> = ({
  value,
  label,
  delay,
}) => {
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
        { label: "Jam", value: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) },
        { label: "Menit", value: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) },
        { label: "Detik", value: Math.floor((distance % (1000 * 60)) / 1000) },
      ]);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 w-full flex flex-col items-center">
      <div className="w-full max-w-sm mx-auto relative rounded-3xl p-8 border border-[var(--color-gold)]/20 shadow-[0_30px_60px_-15px_rgba(122,46,57,0.05)] bg-[var(--color-bg-light)] overflow-hidden">
        
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-[1px] border-l-[1px] border-[var(--color-gold)]/50" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-[1px] border-r-[1px] border-[var(--color-gold)]/50" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-[1px] border-l-[1px] border-[var(--color-gold)]/50" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-[1px] border-r-[1px] border-[var(--color-gold)]/50" />

        <div className="animate-section text-center space-y-4 mb-10" data-anim="fade-up">
          <p className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
            Menuju Hari Bahagia
          </p>
          <div className="text-[var(--color-gold)] tracking-[0.1em] font-serif text-xl border-y border-[var(--color-gold)]/20 py-2 inline-block px-6">
            {weddingData.events.akad.date}
          </div>
          
          {/* Add to Calendar Button */}
          <div className="pt-2">
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Pernikahan " + weddingData.couple.bride.nickname + " & " + weddingData.couple.groom.nickname)}&dates=20260605T090000/20260605T150000&details=${encodeURIComponent("Mari menjadi bagian dari hari bahagia kami. Terima kasih atas doa dan restunya.")}&location=${encodeURIComponent(weddingData.events.akad.locationAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--color-gold)]/40 text-[var(--color-gold-dark)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span className="font-sans text-[0.55rem] tracking-[0.1em] uppercase font-medium">Simpan ke Kalender</span>
            </a>
          </div>
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
                  <CountdownTile value={unit.value} label={unit.label} delay={idx * 0.1} />
                  {idx < 3 && (
                    <span className="font-serif text-2xl text-[var(--color-gold)]/50 mb-4">:</span>
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
