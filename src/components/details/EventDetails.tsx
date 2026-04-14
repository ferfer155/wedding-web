import React from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import weddingData from "../../data/wedding-data.json";

interface EventCardProps {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  locationName: string;
  locationAddress: string;
  mapLink: string;
  delay?: string;
  isPrimary?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  subtitle,
  date,
  time,
  locationName,
  locationAddress,
  mapLink,
  delay = "0",
  isPrimary = false,
}) => {
  return (
    <div
      className={`animate-section relative rounded-t-[140px] rounded-b-xl overflow-hidden ${
        isPrimary 
          ? "bg-[var(--color-primary-dark)] text-white border border-[var(--color-gold)]/40 shadow-[0_20px_40px_-10px_rgba(88,28,36,0.4)]" 
          : "bg-white/80 border border-[var(--color-gold)]/20 shadow-md"
      }`}
      data-anim="fade-up"
      data-delay={delay}
    >
      {/* Decorative inner arch */}
      <div className={`absolute inset-2 rounded-t-[132px] rounded-b-lg border pointer-events-none ${
        isPrimary ? "border-[var(--color-gold)]/30" : "border-[var(--color-gold)]/10"
      }`} />

      <div className="px-8 pt-16 pb-10 flex flex-col items-center text-center space-y-6 relative z-10">
        
        <div className="space-y-2">
          <p className={`font-sans text-[0.55rem] tracking-[0.3em] uppercase ${
            isPrimary ? "text-[var(--color-gold-light)]" : "text-[var(--color-text-muted)]"
          }`}>
            {subtitle}
          </p>
          <h4 className={`font-script text-[3.5rem] leading-[0.8] ${
            isPrimary ? "text-[var(--color-gold-light)]" : "text-[var(--color-primary)]"
          }`}>
            {title}
          </h4>
        </div>

        <div className={`w-12 h-[1px] ${
          isPrimary ? "bg-[var(--color-gold)]/40" : "bg-[var(--color-gold)]/30"
        }`} />

        <div className="space-y-4 w-full">
          {/* Date & Time Row */}
          <div className="flex flex-col gap-3 items-center">
            <div className={`flex items-center gap-2 ${
              isPrimary ? "text-white/90" : "text-[var(--color-text-main)]"
            }`}>
              <CalendarDays className="w-4 h-4 opacity-70" />
              <span className="font-serif text-[0.95rem] tracking-wide">{date}</span>
            </div>
            
            <div className={`flex items-center gap-2 ${
              isPrimary ? "text-white/90" : "text-[var(--color-text-main)]"
            }`}>
              <Clock className="w-4 h-4 opacity-70" />
              <span className="font-serif text-[0.95rem] tracking-wide">{time}</span>
            </div>
          </div>

          {/* Location Details */}
          <div className={`pt-4 border-t ${
            isPrimary ? "border-white/10" : "border-black/5"
          }`}>
            <MapPin className={`w-5 h-5 mx-auto mb-2 ${
              isPrimary ? "text-[var(--color-gold)]" : "text-[var(--color-primary-light)]"
            }`} />
            <p className={`font-serif font-medium text-[1.1rem] mb-1 ${
              isPrimary ? "text-white" : "text-[var(--color-text-main)]"
            }`}>
              {locationName}
            </p>
            <p className={`font-serif italic text-[0.85rem] leading-relaxed mx-auto max-w-[220px] ${
              isPrimary ? "text-white/70" : "text-[var(--color-text-muted)]"
            }`}>
              {locationAddress}
            </p>
          </div>
        </div>

        <div className="pt-4 w-full">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-sm font-sans text-[0.55rem] tracking-[0.25em] uppercase transition-all duration-300 ${
              isPrimary 
                ? "bg-[var(--color-gold)] text-[var(--color-bg-dark)] hover:bg-[var(--color-gold-light)]" 
                : "bg-transparent border border-[var(--color-gold)] text-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] hover:text-white"
            }`}
          >
            Buka Google Maps
          </a>
        </div>

      </div>
    </div>
  );
};

export const EventDetails: React.FC = () => {
  return (
    <section className="py-20 w-full">
      <div className="animate-section text-center space-y-6 mb-16" data-anim="fade-up">
        <div className="flex flex-col items-center">
          <p className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-3">
            Waktu & Tempat
          </p>
          <div className="flex items-center gap-3 w-32">
            <div className="gold-line-h flex-1 opacity-50" />
            <span className="text-[var(--color-gold)] text-[0.5rem]">✦</span>
            <div className="gold-line-h flex-1 opacity-50" />
          </div>
          <h3 className="font-script text-[4rem] text-[var(--color-primary)] leading-[1] mt-6">
            Detail Acara
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-12 px-2">
        <EventCard
          title={weddingData.events.akad.title}
          subtitle="Prosesi Suci"
          date={weddingData.events.akad.date}
          time={weddingData.events.akad.time}
          locationName={weddingData.events.akad.locationName}
          locationAddress={weddingData.events.akad.locationAddress}
          mapLink={weddingData.events.akad.mapLink}
          isPrimary={false}
          delay="0.1"
        />

        <div className="flex justify-center -my-6 relative z-20">
          <div className="w-10 h-10 rounded-full bg-[var(--color-bg-light)] border border-[var(--color-gold)]/30 flex items-center justify-center">
            <span className="font-serif text-[var(--color-gold)]">&amp;</span>
          </div>
        </div>

        <EventCard
          title={weddingData.events.resepsi.title}
          subtitle="Syukuran & Pesta"
          date={weddingData.events.resepsi.date}
          time={weddingData.events.resepsi.time}
          locationName={weddingData.events.resepsi.locationName}
          locationAddress={weddingData.events.resepsi.locationAddress}
          mapLink={weddingData.events.resepsi.mapLink}
          isPrimary={true}
          delay="0.2"
        />
      </div>
    </section>
  );
};
