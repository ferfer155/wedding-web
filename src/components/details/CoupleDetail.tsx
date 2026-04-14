import React from "react";
import { Instagram } from "lucide-react";
import weddingData from "../../data/wedding-data.json";

interface PersonCardProps {
  name: string;
  fullName: string;
  role: string;
  parents: string;
  photo: string;
  instagram?: string;
  animDelay?: string;
}

const PersonCard: React.FC<PersonCardProps> = ({
  name,
  fullName,
  role,
  parents,
  photo,
  instagram,
  animDelay = "0",
}) => {
  return (
    <div
      className="animate-section flex flex-col items-center text-center space-y-6"
      data-anim="fade-up"
      data-delay={animDelay}
    >
      {/* Editorial Style Portrait */}
      <div className="relative">
        <div className="relative w-48 h-60 md:w-56 md:h-72 bg-white/50 p-2 rounded-t-[100px] rounded-b-md shadow-[0_20px_40px_-15px_rgba(122,46,57,0.15)] border border-[rgba(197,160,89,0.3)]">
          <div className="w-full h-full rounded-t-[92px] rounded-b-sm overflow-hidden relative group">
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
              onError={(e) => {
                e.currentTarget.src = `https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400`;
              }}
            />
            {/* Delicate inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/40 via-transparent to-transparent opacity-60 mix-blend-multiply" />
          </div>
        </div>

        {/* Floating Role Badge */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[var(--color-bg-light)] px-6 py-2 rounded-full border border-[var(--color-gold)]/40 shadow-sm whitespace-nowrap">
          <p className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] font-medium">
            {role}
          </p>
        </div>
      </div>

      {/* Text Info */}
      <div className="pt-4 space-y-4 px-4 w-full">
        <div>
          <p className="font-script text-[3.5rem] leading-[1] text-[var(--color-primary)]">
            {fullName}
          </p>
        </div>

        <div className="flex items-center gap-3 justify-center w-32 mx-auto">
          <div className="gold-line-h flex-1 opacity-50" />
          <span className="text-[var(--color-gold)] text-[0.4rem]">❖</span>
          <div className="gold-line-h flex-1 opacity-50" />
        </div>

        <div className="space-y-1">
          <p className="font-serif italic text-[0.85rem] text-[var(--color-text-muted)]">Putra dari pasangan</p>
          <p
            className="font-serif text-[0.95rem] text-[var(--color-text-main)] font-medium max-w-[200px] mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: parents.replace(" & ", "<br/><span class='text-[0.7rem] text-[var(--color-gold-dark)] italic'>&</span><br/>"),
            }}
          />
        </div>

        {instagram && (
          <a
            href={`https://instagram.com/${instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-[rgba(197,160,89,0.05)] border border-[rgba(197,160,89,0.2)] text-[var(--color-gold-dark)] hover:bg-[var(--color-gold)] hover:text-white transition-colors duration-300 group"
          >
            <Instagram strokeWidth={1.5} className="w-3.5 h-3.5" />
            <span className="font-sans text-[0.55rem] tracking-[0.1em]">{instagram}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export const CoupleDetail: React.FC = () => {
  return (
    <div className="pb-8">
      {/* Bride Section */}
      <section className="min-h-[80dvh] flex flex-col justify-center items-center py-12 space-y-10">
        <PersonCard
          name="Ghina"
          fullName={weddingData.couple.bride.fullName}
          role="The Bride"
          parents={weddingData.couple.bride.parents}
          photo={weddingData.couple.bride.photo}
          instagram={weddingData.couple.bride.instagram}
        />
      </section>

      {/* Elegant Separator */}
      <div className="flex flex-col items-center py-8">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[var(--color-gold)] to-transparent opacity-40" />
        <p className="font-script text-[4.5rem] text-[var(--color-primary-light)] leading-[0.5] my-6">
          &amp;
        </p>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[var(--color-gold)] to-transparent opacity-40" />
      </div>

      {/* Groom Section */}
      <section className="min-h-[80dvh] flex flex-col justify-center items-center py-12 space-y-10">
        <PersonCard
          name="Ryan"
          fullName={weddingData.couple.groom.fullName}
          role="The Groom"
          parents={weddingData.couple.groom.parents}
          photo={weddingData.couple.groom.photo}
          instagram={weddingData.couple.groom.instagram}
          animDelay="0.1"
        />
      </section>
    </div>
  );
};
