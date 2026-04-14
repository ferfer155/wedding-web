import React, { useState } from "react";
import weddingData from "../../data/wedding-data.json";

export const GallerySection: React.FC = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const images = weddingData.gallery;

  return (
    <section className="py-20 w-full space-y-12">
      {/* Header */}
      <div className="animate-section text-center space-y-6" data-anim="fade-up">
        <div className="flex flex-col items-center">
          <p className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-3">
            Momen Berharga
          </p>
          <div className="flex items-center gap-3 w-32">
            <div className="gold-line-h flex-1 opacity-50" />
            <span className="text-[var(--color-gold)] text-[0.5rem]">✦</span>
            <div className="gold-line-h flex-1 opacity-50" />
          </div>
          <h3 className="font-script text-[4.5rem] text-[var(--color-primary)] leading-[0.8] mt-6">
            Our Gallery
          </h3>
        </div>
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-2 gap-[2px] bg-[var(--color-gold)]/20 p-[2px] rounded-sm">
        {images.map((src, idx) => {
          const isWide = idx === 0 || idx === 5;

          return (
            <div
              key={idx}
              className={`animate-section relative overflow-hidden cursor-pointer group bg-[var(--color-bg-light)] ${
                isWide ? "col-span-2" : "col-span-1"
              }`}
              data-anim="fade-up"
              data-delay={`${idx * 0.08}`}
              style={{
                aspectRatio: isWide ? "16/9" : "4/5",
              }}
              onClick={() => setLightbox(src)}
            >
              <img
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover grayscale-[30%] sepia-[10%] opacity-90 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:sepia-0 group-hover:opacity-100"
                onError={(e) =>
                  (e.currentTarget.src = `https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800`)
                }
              />

              {/* Minimal Text Badge */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-serif italic text-white/90 text-xs drop-shadow-md">
                  Vol. {String(idx + 1).padStart(2, "0")}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--color-bg-dark)]/95 backdrop-blur-md transition-opacity"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-2xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-4 font-sans text-[0.6rem] tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors"
            >
              Close x
            </button>

            <div className="relative w-full shadow-2xl p-2 bg-white/5 border border-white/10 rounded-sm">
              <img
                src={lightbox}
                alt="Gallery"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
