import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Copy, Gift, MapPin, X } from "lucide-react";
import weddingData from "../../data/wedding-data.json";

export const GiftSection: React.FC = () => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  useEffect(() => {
    const scrollContainer = document.getElementById("detail-scroll-container");
    if (showBankModal || showAddressModal) {
      document.body.style.overflow = "hidden";
      if (scrollContainer) scrollContainer.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (scrollContainer) scrollContainer.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      if (scrollContainer) scrollContainer.style.overflow = "";
    };
  }, [showBankModal, showAddressModal]);

  return (
    <section className="py-24 w-full">
      <div className="w-full max-w-sm mx-auto text-center space-y-10">
        
        <div className="animate-section" data-anim="fade-up">
          <p className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-3">
            Tanda Kasih
          </p>
          <div className="flex items-center gap-3 w-32 mx-auto">
            <div className="gold-line-h flex-1 opacity-50" />
            <span className="text-[var(--color-gold)] text-[0.5rem]">✦</span>
            <div className="gold-line-h flex-1 opacity-50" />
          </div>
          <h3 className="font-script text-[4rem] text-[var(--color-primary)] leading-[1] mt-6">
            Wedding Gift
          </h3>
        </div>

        <div 
          className="animate-section bg-white/70 backdrop-blur-md p-8 border-y border-[var(--color-gold)]/20 shadow-[0_10px_40px_-20px_rgba(122,46,57,0.1)] relative" 
          data-anim="fade-up" 
          data-delay="0.1"
        >
          {/* subtle corner accents */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--color-gold)]" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--color-gold)]" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[var(--color-gold)]" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[var(--color-gold)]" />

          <p className="font-serif italic text-sm text-[var(--color-text-muted)] leading-relaxed mb-8">
            Kehadiran dan doa restu Anda adalah anugerah terindah bagi kami.
            Namun jika Anda ingin memberikan tanda kasih secara langsung,
            Anda dapat mengirimkannya melalui:
          </p>

          <div className="space-y-4">
            <button
              onClick={() => setShowBankModal(true)}
              className="w-full relative py-4 px-6 border border-[var(--color-primary)] group hover:bg-[var(--color-primary)] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out" />
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Gift className="w-4 h-4 text-[var(--color-primary)] group-hover:text-white transition-colors duration-500" />
                <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase font-medium text-[var(--color-primary)] group-hover:text-white transition-colors duration-500">
                  Transfer Bank
                </span>
              </div>
            </button>

            {weddingData.giftAddress && (
              <button
                onClick={() => setShowAddressModal(true)}
                className="w-full relative py-4 px-6 bg-[var(--color-primary-dark)] text-white group hover:bg-[var(--color-primary)] transition-colors duration-500"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <MapPin className="w-4 h-4 text-[var(--color-gold-light)]" />
                  <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase font-medium text-[var(--color-gold-light)]">
                    Kirim Hadiah
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      {showBankModal &&
        createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--color-bg-dark)]/80 backdrop-blur-sm p-4" onClick={() => setShowBankModal(false)}>
            <div className="bg-[var(--color-bg-light)] w-full max-w-md p-8 relative rounded-sm border border-[var(--color-gold)]/30" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowBankModal(false)}
                className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transiton-colors"
              >
                <X strokeWidth={1.5} className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <h4 className="font-script text-[3rem] text-[var(--color-primary)] leading-[1]">Bank Transfer</h4>
                <div className="w-12 h-[1px] bg-[var(--color-gold)] mx-auto mt-4" />
              </div>

              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                {weddingData.gifts.map((gift, idx) => (
                  <div key={idx} className="bg-white p-6 border border-[rgba(0,0,0,0.05)] text-center space-y-3">
                    <p className="font-sans font-semibold text-[var(--color-text-main)] uppercase tracking-[0.1em] text-sm">
                      {gift.bank}
                    </p>
                    <p className="font-serif text-2xl text-[var(--color-primary)] tracking-wider">
                      {gift.accountNumber}
                    </p>
                    <p className="font-serif italic text-[0.9rem] text-[var(--color-text-muted)]">
                      A.n. {gift.accountName}
                    </p>

                    <button
                      onClick={() => handleCopy(gift.accountNumber.replace(/\s/g, ""), gift.bank)}
                      className={`mt-4 px-6 py-2 border font-sans text-[0.55rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                        copiedBank === gift.bank
                          ? "bg-[var(--color-gold)] border-[var(--color-gold)] text-white"
                          : "border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {copiedBank === gift.bank ? "Tersalin!" : <><Copy className="w-3 h-3" /> Salin Nomor</>}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}

      {showAddressModal && weddingData.giftAddress &&
        createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--color-bg-dark)]/80 backdrop-blur-sm p-4" onClick={() => setShowAddressModal(false)}>
            <div className="bg-[var(--color-bg-light)] w-full max-w-md p-8 relative rounded-sm border border-[var(--color-gold)]/30" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowAddressModal(false)}
                className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transiton-colors"
              >
                <X strokeWidth={1.5} className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <h4 className="font-script text-[3rem] text-[var(--color-primary)] leading-[1]">Alamat</h4>
                <div className="w-12 h-[1px] bg-[var(--color-gold)] mx-auto mt-4" />
              </div>

              <div className="bg-white p-8 border border-[rgba(0,0,0,0.05)] text-center space-y-4">
                <p className="font-serif text-lg text-[var(--color-primary-dark)] font-medium">
                  {weddingData.giftAddress.name}
                </p>
                <p className="font-serif italic text-[0.95rem] text-[var(--color-text-muted)] leading-relaxed">
                  {weddingData.giftAddress.address}
                </p>

                <button
                  onClick={() => handleCopyAddress(weddingData.giftAddress.address)}
                  className={`mt-6 w-full py-3 border font-sans text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                    copiedAddress
                      ? "bg-[var(--color-gold)] border-[var(--color-gold)] text-white"
                      : "bg-[var(--color-primary-dark)] border-[var(--color-primary-dark)] text-white hover:bg-[var(--color-primary)]"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {copiedAddress ? "Alamat Tersalin!" : <><Copy className="w-3.5 h-3.5" /> Salin Alamat</>}
                  </div>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
