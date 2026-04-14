import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../../lib/supabase";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export const RsvpWishesSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [guestName, setGuestName] = useState("");
  const [guestId, setGuestId] = useState<string | null>(null);

  const [rsvpStatus, setRsvpStatus] = useState<"Hadir" | "Tidak Hadir" | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [rsvpNotes, setRsvpNotes] = useState("");
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [showRsvpConfirm, setShowRsvpConfirm] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  const [wishMessage, setWishMessage] = useState("");
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  useEffect(() => {
    const scrollContainer = document.getElementById("detail-scroll-container");
    if (showRsvpConfirm) {
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
  }, [showRsvpConfirm]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      const fetchGuest = async () => {
        const { data } = await supabase
          .from("guests")
          .select("*")
          .eq("slug", to)
          .single();
        if (data) {
          setGuestId(data.id);
          setGuestName(data.name);
        } else {
          const name = to
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
          setGuestName(name);
        }
      };
      fetchGuest();
    }
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      if (data) setComments(data);
    } catch {
      // silence error
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !rsvpStatus) return;
    setRsvpError("");
    setShowRsvpConfirm(true);
  };

  const confirmRsvpSubmit = async () => {
    setShowRsvpConfirm(false);
    setIsSubmittingRsvp(true);
    setRsvpError("");
    try {
      const slug = guestName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      let currentGuestId = guestId;

      if (!currentGuestId) {
        const { data: existingGuest } = await supabase
          .from("guests")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();
        if (existingGuest) {
          currentGuestId = existingGuest.id;
          setGuestId(existingGuest.id);
        } else {
          const { data: newGuest, error: guestError } = await supabase
            .from("guests")
            .insert([{ name: guestName, slug }])
            .select()
            .single();
          if (!guestError && newGuest) {
            currentGuestId = newGuest.id;
            setGuestId(newGuest.id);
          }
        }
      }

      const dbStatus = rsvpStatus === "Hadir" ? "hadir" : "tidak_hadir";
      const { error } = await supabase.from("rsvps").insert([
        {
          guest_id: currentGuestId,
          status: dbStatus,
          guest_count: rsvpStatus === "Hadir" ? guestCount : 0,
          note: rsvpNotes,
        },
      ]);

      if (error) throw error;
      
      setRsvpSuccess(true);
      setTimeout(() => setRsvpSuccess(false), 5000);
    } catch (error: any) {
      setRsvpError(error.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !wishMessage) return;
    setIsSubmittingWish(true);
    try {
      const slug = guestName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      let currentGuestId = guestId;

      if (!currentGuestId) {
        const { data: existingGuest } = await supabase
          .from("guests")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();
        if (existingGuest) {
          currentGuestId = existingGuest.id;
          setGuestId(existingGuest.id);
        } else {
          const { data: newGuest, error: guestError } = await supabase
            .from("guests")
            .insert([{ name: guestName, slug }])
            .select()
            .single();
          if (!guestError && newGuest) {
            currentGuestId = newGuest.id;
            setGuestId(newGuest.id);
          }
        }
      }

      const { error } = await supabase
        .from("comments")
        .insert([{ guest_id: currentGuestId, name: guestName, message: wishMessage }]);
      if (error) throw error;
      setWishSuccess(true);
      setWishMessage("");
      fetchComments();
      setTimeout(() => setWishSuccess(false), 5000);
    } catch {
      alert("Terjadi kesalahan saat mengirim ucapan. Silakan coba lagi.");
    } finally {
      setIsSubmittingWish(false);
    }
  };

  const scrollCarousel = (dir: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(197, 160, 89, 0.4)",
    padding: "0.5rem 0",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.05rem",
    color: "var(--color-primary-dark)",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  return (
    <div className="py-24 space-y-32">
      
      {/* ── RSVP SECTION ── */}
      <section className="w-full">
        <div className="w-full max-w-sm mx-auto text-center space-y-8">
          <div className="animate-section" data-anim="fade-up">
            <p className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-3">
              Kehadiran
            </p>
            <div className="flex items-center gap-3 w-32 mx-auto">
              <div className="gold-line-h flex-1 opacity-50" />
              <span className="text-[var(--color-gold)] text-[0.5rem]">✦</span>
              <div className="gold-line-h flex-1 opacity-50" />
            </div>
            <h3 className="font-script text-[4rem] text-[var(--color-primary)] leading-[1] mt-6">
              Reservasi
            </h3>
          </div>

          <form onSubmit={handleRsvpSubmit} className="animate-section text-left space-y-8" data-anim="fade-up" data-delay="0.1">
            <div>
              <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] mb-2">Nama Lengkap</p>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Tulis nama Anda"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(197, 160, 89, 0.4)")}
              />
            </div>

            <div>
              <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] mb-4">Apakah Anda Hadir?</p>
              <div className="flex gap-4">
                {(["Hadir", "Tidak Hadir"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setRsvpStatus(status)}
                    className={`flex-1 py-3 border transition-colors ${
                      rsvpStatus === status
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                        : "border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                    }`}
                  >
                    <span className="font-sans text-[0.6rem] tracking-[0.1em] uppercase">
                      {status}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {rsvpStatus === "Hadir" && (
              <div className="animate-fade-in-up">
                <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] mb-2">Jumlah Tamu</p>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  style={{...inputStyle, WebkitAppearance: 'none'}}
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                </select>
              </div>
            )}

            {rsvpStatus === "Tidak Hadir" && (
              <div className="animate-fade-in-up">
                <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] mb-2">Alasan (Opsional)</p>
                <input
                  type="text"
                  value={rsvpNotes}
                  onChange={(e) => setRsvpNotes(e.target.value)}
                  placeholder="Opsional"
                  style={inputStyle}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmittingRsvp || !rsvpStatus || !guestName}
              className="w-full btn-luxury disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingRsvp ? "Processing..." : "Konfirmasi"}
            </button>

            {rsvpSuccess && (
              <p className="text-center font-serif text-[0.9rem] text-[#8E7036] italic">
                Terima kasih atas konfirmasi Anda.
              </p>
            )}
            {rsvpError && (
              <p className="text-center font-serif text-[0.9rem] text-[#7A2E39] italic">
                {rsvpError}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ── MESSAGES / WISHES ── */}
      <section className="w-full">
         <div className="w-full max-w-sm mx-auto text-center space-y-8 mb-10">
          <div className="animate-section" data-anim="fade-up">
            <p className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-3">
              Doa & Harapan
            </p>
            <div className="flex items-center gap-3 w-32 mx-auto">
              <div className="gold-line-h flex-1 opacity-50" />
              <span className="text-[var(--color-gold)] text-[0.5rem]">✦</span>
              <div className="gold-line-h flex-1 opacity-50" />
            </div>
            <h3 className="font-script text-[4rem] text-[var(--color-primary)] leading-[1] mt-6">
              Guest Book
            </h3>
          </div>

          <form onSubmit={handleWishSubmit} className="animate-section text-left space-y-6" data-anim="fade-up" data-delay="0.1">
             <div>
              <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] mb-2">Nama Anda</p>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(197, 160, 89, 0.4)")}
              />
            </div>
            <div>
              <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-gold-dark)] mb-2">Pesan</p>
              <textarea
                rows={3}
                required
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(197, 160, 89, 0.4)")}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmittingWish || !guestName || !wishMessage}
              className="w-full btn-luxury disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingWish ? "Mengirim..." : "Kirim Pesan"}
            </button>
            {wishSuccess && (
              <p className="text-center font-serif text-[0.9rem] text-[#8E7036] italic">
                Pesan terkirim. Terima Kasih!
              </p>
            )}
          </form>
        </div>

        {/* Carousel */}
        <div className="w-full overflow-hidden max-w-[100vw] px-4 animate-section" data-anim="fade-up" data-delay="0.2">
          
          <div className="flex items-center justify-end gap-2 mb-4 pr-2">
            <button onClick={() => scrollCarousel("left")} className="p-2 border border-[var(--color-gold)] text-[var(--color-gold-dark)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors"><ChevronLeft className="w-4 h-4"/></button>
            <button onClick={() => scrollCarousel("right")} className="p-2 border border-[var(--color-gold)] text-[var(--color-gold-dark)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors"><ChevronRight className="w-4 h-4"/></button>
          </div>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 pb-8 pl-2 pr-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {isLoadingComments ? (
               <p className="font-serif italic text-[var(--color-text-muted)] w-full text-center">Memuat...</p>
            ) : comments.length === 0 ? (
               <p className="font-serif italic text-[var(--color-text-muted)] w-full text-center">Belum ada pesan.</p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] bg-white border border-[var(--color-gold)]/20 shadow-sm p-8 flex flex-col justify-between"
                  style={{ minHeight: "200px" }}
                >
                  <p className="font-serif text-[0.95rem] text-[var(--color-text-main)] italic leading-relaxed mb-6">
                    "{comment.message}"
                  </p>
                  <div>
                    <div className="w-8 h-[1px] bg-[var(--color-primary)] mb-3" />
                    <p className="font-sans font-medium text-[0.65rem] tracking-widest uppercase text-[var(--color-primary-dark)]">
                      {comment.name}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── MODALS ── */}
      {showRsvpConfirm &&
        createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--color-bg-dark)]/80 backdrop-blur-sm p-4" onClick={() => setShowRsvpConfirm(false)}>
            <div className="bg-[var(--color-bg-light)] w-full max-w-md p-8 relative rounded-sm border border-[var(--color-gold)]/30 text-center" onClick={(e) => e.stopPropagation()}>
              <h4 className="font-script text-[3rem] text-[var(--color-primary)] leading-[1]">Konfirmasi</h4>
              <div className="w-12 h-[1px] bg-[var(--color-gold)] mx-auto mt-4 mb-6" />
              <p className="font-serif italic text-[var(--color-text-main)] mb-8">
                Konfirmasi RSVP hanya dapat dilakukan satu kali. Apakah Anda yakin dengan data tersebut?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowRsvpConfirm(false)}
                  className="flex-1 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] font-sans text-[0.6rem] tracking-[0.2em] uppercase hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmRsvpSubmit}
                  className="flex-1 py-3 bg-[var(--color-primary)] text-white font-sans text-[0.6rem] tracking-[0.2em] uppercase hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  Ya, Kirim
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
