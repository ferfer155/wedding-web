import React from "react";
import weddingData from "../../data/wedding-data.json";

export const ClosingSection: React.FC = () => {
  return (
    <section className="py-24 w-full flex flex-col items-center text-center relative overflow-hidden">
      {/* Decorative Ornaments Background */}
      <div className="absolute top-0 w-full flex justify-center opacity-30 pointer-events-none">
        <div className="w-[1px] h-32 bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
      </div>

      <div
        className="animate-section w-full max-w-sm mx-auto px-6 space-y-12 relative z-10"
        data-anim="fade-up"
      >
        <p className="font-serif italic text-sm leading-relaxed text-[var(--color-text-muted)]">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada
          kami.
        </p>

        <div className="space-y-4 pt-8">
          <p className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-[var(--color-gold-dark)]">
            Kami Yang Berbahagia
          </p>

          <h2 className="font-script text-[3.5rem] text-[var(--color-primary)] leading-[0.8] mt-4">
            {weddingData.couple.bride.nickname}
            <span className="font-sans text-[1.5rem] text-[var(--color-gold)] mx-4 block md:inline py-4">
              &amp;
            </span>
            {weddingData.couple.groom.nickname}
          </h2>

          <div className="flex justify-center pt-8">
            <div className="w-16 h-16 border border-[var(--color-gold)]/40 rounded-full flex items-center justify-center p-1 relative ">
              <div className="absolute inset-[3px] border border-[var(--color-gold)]/20 rounded-full" />
              <img
                src={weddingData.branding.logo}
                alt="Monogram"
                className="w-8 h-8 object-contain filter drop-shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
