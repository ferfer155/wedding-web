import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  Users,
  CheckCircle,
  XCircle,
  MessageSquare,
  Copy,
  ExternalLink,
  LogOut,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Guest {
  id: string;
  name: string;
  phone: string;
  slug: string;
  created_at: string;
}

interface RSVP {
  id: string;
  guest_id: string;
  status: string;
  guest_count: number;
  note: string;
  created_at: string;
  guests?: { name: string };
}

interface Comment {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestPhone, setNewGuestPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (isAuth !== "true") {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [guestsRes, rsvpsRes, commentsRes] = await Promise.all([
        supabase
          .from("guests")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("rsvps")
          .select("*, guests(name)")
          .order("created_at", { ascending: false }),
        supabase
          .from("comments")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (guestsRes.data) setGuests(guestsRes.data);
      if (rsvpsRes.data) setRsvps(rsvpsRes.data);
      if (commentsRes.data) setComments(commentsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin/login");
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    setIsSubmitting(true);
    try {
      const slug = newGuestName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const { data, error } = await supabase
        .from("guests")
        .insert([{ name: newGuestName, phone: newGuestPhone, slug }])
        .select();

      if (error) throw error;

      if (data) {
        setGuests([data[0], ...guests]);
        setNewGuestName("");
        setNewGuestPhone("");
      }
    } catch (error) {
      console.error("Error adding guest:", error);
      alert(
        "Gagal menambahkan tamu. Pastikan tabel guests sudah ada di Supabase.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Link disalin!");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;
    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentToDelete);
      if (error) throw error;
      setComments(comments.filter((c) => c.id !== commentToDelete));
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Gagal menghapus komentar.");
    } finally {
      setCommentToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5E9DA] flex items-center justify-center font-serif text-[#4A3B32]">
        <p className="text-xl">Loading dashboard...</p>
      </div>
    );
  }

  const totalHadir = rsvps.filter(
    (r) => r.status === "hadir" || r.status === "Hadir",
  ).length;
  const totalTidakHadir = rsvps.filter(
    (r) => r.status === "tidak_hadir" || r.status === "Tidak Hadir",
  ).length;

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.slug.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGuests = filteredGuests.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-[#F5E9DA] font-serif text-[#4A3B32] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl border border-[#DAA520]/30 shadow-sm">
          <div>
            <h1 className="text-3xl font-script text-[#B8860B]">
              Admin Dashboard
            </h1>
            <p className="text-sm text-[#8B4513] tracking-wider uppercase mt-1">
              Wedding Invitation Manager
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-[#DAA520]/20 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[#8B4513] uppercase tracking-wider">
                Total Tamu
              </p>
              <p className="text-2xl font-bold text-[#4A3B32]">
                {guests.length}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#DAA520]/20 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[#8B4513] uppercase tracking-wider">
                RSVP Hadir
              </p>
              <p className="text-2xl font-bold text-[#4A3B32]">{totalHadir}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#DAA520]/20 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[#8B4513] uppercase tracking-wider">
                Tidak Hadir
              </p>
              <p className="text-2xl font-bold text-[#4A3B32]">
                {totalTidakHadir}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#DAA520]/20 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[#8B4513] uppercase tracking-wider">
                Komentar
              </p>
              <p className="text-2xl font-bold text-[#4A3B32]">
                {comments.length}
              </p>
            </div>
          </div>
        </div>

        {/* Guest Management */}
        <div className="bg-white rounded-3xl border border-[#DAA520]/30 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#DAA520]/20 bg-[#FDFBF7]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-bold text-[#8B4513]">
                Guest Management
              </h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari tamu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#DAA520]/30 bg-white focus:outline-none focus:ring-2 focus:ring-[#B86B77]/50 text-sm"
                />
              </div>
            </div>

            <form
              onSubmit={handleAddGuest}
              className="mt-4 flex flex-col md:flex-row gap-3"
            >
              <input
                type="text"
                placeholder="Nama Tamu (Wajib)"
                required
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-[#DAA520]/30 bg-white focus:outline-none focus:ring-2 focus:ring-[#B86B77]/50"
              />
              <input
                type="text"
                placeholder="No. HP (Opsional)"
                value={newGuestPhone}
                onChange={(e) => setNewGuestPhone(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-[#DAA520]/30 bg-white focus:outline-none focus:ring-2 focus:ring-[#B86B77]/50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#8B4513] text-white rounded-xl hover:bg-[#5C4033] transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isSubmitting ? "Menambahkan..." : "Tambah Tamu"}
              </button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5E9DA]/50 text-[#8B4513] text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Nama</th>
                  <th className="p-4 font-medium">Slug</th>
                  <th className="p-4 font-medium">Link Undangan</th>
                  <th className="p-4 font-medium">Dibuat Pada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DAA520]/10">
                {currentGuests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      Belum ada tamu
                    </td>
                  </tr>
                ) : (
                  currentGuests.map((guest) => {
                    const inviteLink = `${window.location.origin}/undangan?to=${guest.slug}`;
                    return (
                      <tr
                        key={guest.id}
                        className="hover:bg-[#FDFBF7] transition-colors"
                      >
                        <td className="p-4 font-medium">{guest.name}</td>
                        <td className="p-4 text-sm text-gray-600">
                          {guest.slug}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              readOnly
                              value={inviteLink}
                              className="text-xs px-2 py-1 bg-gray-50 border border-gray-200 rounded w-48 truncate"
                            />
                            <button
                              onClick={() => copyToClipboard(inviteLink)}
                              className="p-1.5 text-[#8B4513] hover:bg-[#F5E9DA] rounded-lg"
                              title="Copy Link"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <a
                              href={inviteLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-[#8B4513] hover:bg-[#F5E9DA] rounded-lg"
                              title="Open Link"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {new Date(guest.created_at).toLocaleDateString(
                            "id-ID",
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t border-[#DAA520]/20 bg-[#FDFBF7] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm text-gray-500">
                Menampilkan {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, filteredGuests.length)}{" "}
                dari {filteredGuests.length} tamu
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-[#DAA520]/30 text-[#8B4513] disabled:opacity-50 hover:bg-[#F5E9DA] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-[#DAA520]/30 text-[#8B4513] disabled:opacity-50 hover:bg-[#F5E9DA] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RSVP Table */}
          <div className="bg-white rounded-3xl border border-[#DAA520]/30 shadow-sm overflow-hidden flex flex-col h-[500px]">
            <div className="p-6 border-b border-[#DAA520]/20 bg-[#FDFBF7] shrink-0">
              <h2 className="text-xl font-bold text-[#8B4513]">Data RSVP</h2>
            </div>
            <div className="overflow-y-auto flex-1 p-0">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-[#F5E9DA] z-10 shadow-sm">
                  <tr className="text-[#8B4513] text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Nama</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Orang</th>
                    <th className="p-4 font-medium">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DAA520]/10">
                  {rsvps.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">
                        Belum ada data RSVP
                      </td>
                    </tr>
                  ) : (
                    rsvps.map((rsvp) => (
                      <tr
                        key={rsvp.id}
                        className="hover:bg-[#FDFBF7] transition-colors"
                      >
                        <td className="p-4">
                          <p className="font-medium">
                            {rsvp.guests?.name || "Unknown Guest"}
                          </p>
                          {rsvp.note && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {rsvp.note}
                            </p>
                          )}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${rsvp.status === "hadir" || rsvp.status === "Hadir" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                          >
                            {rsvp.status === "hadir"
                              ? "Hadir"
                              : rsvp.status === "tidak_hadir"
                                ? "Tidak Hadir"
                                : rsvp.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">{rsvp.guest_count}</td>
                        <td className="p-4 text-xs text-gray-500">
                          {new Date(rsvp.created_at).toLocaleDateString(
                            "id-ID",
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Comments List */}
          <div className="bg-white rounded-3xl border border-[#DAA520]/30 shadow-sm overflow-hidden flex flex-col h-[500px]">
            <div className="p-6 border-b border-[#DAA520]/20 bg-[#FDFBF7] shrink-0">
              <h2 className="text-xl font-bold text-[#8B4513]">
                Komentar & Ucapan
              </h2>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {comments.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Belum ada komentar
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#DAA520]/10 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-[#8B4513]">
                          {comment.name}
                        </h4>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.created_at).toLocaleDateString(
                            "id-ID",
                          )}
                        </span>
                      </div>
                      <button
                        onClick={() => setCommentToDelete(comment.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Komentar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-[#4A3B32] whitespace-pre-wrap">
                      {comment.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Delete Comment Confirmation Modal */}
      {commentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
              Hapus Komentar?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Apakah Anda yakin ingin menghapus komentar ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCommentToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteComment}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
