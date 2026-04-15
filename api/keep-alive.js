export default async function handler(req, res) {
  // Dalam lingkungan Vercel API (Node.js backend), kita menggunakan process.env
  // Parameter ini mengambil dari Environment Variable Vercel Anda
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res
      .status(500)
      .json({ error: "Environment variable Supabase tidak ditemukan" });
  }

  try {
    // Mengirim "Ping" API sangat ringan ke Supabase REST Endpoint
    // Hal ini cukup untuk menghitung sebagai 'Aktivitas Terekam' dan mencegah jeda 7 hari
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Gagal terhubung dengan Supabase" });
    }

    return res.status(200).json({
      success: true,
      message:
        "Sukses: Supabase berhasil dibangunkan dan aktivitas telah terekam.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan server internal pada fungsi Cron" });
  }
}
