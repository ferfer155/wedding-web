import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("admin_auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Password salah");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E9DA] flex items-center justify-center p-4 font-serif text-[#4A3B32]">
      <div className="bg-white p-8 rounded-3xl border border-[#DAA520]/30 shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-script text-[#B8860B] mb-6">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#DAA520]/30 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#B86B77]/50 text-[#4A3B32]"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#8B4513] text-white font-medium tracking-wider hover:bg-[#5C4033] transition-colors"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};
