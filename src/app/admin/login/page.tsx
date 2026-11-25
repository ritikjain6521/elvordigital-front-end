"use client";

import React, { useState } from "react";
import { API_BASE } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  Lock,
  User,
  KeyRound,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First attempt to login with backend MongoDB API
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("znv_admin_token", data.token);
        sessionStorage.setItem("znv_admin_user", JSON.stringify(data.user));
        router.push("/admin");
        return;
      }

      // Fallback verification for demo credentials
      if (
        (identifier === "admin" || identifier === "admin@ElvorDigital.com") &&
        (password === "Admin@123456" || password === "admin")
      ) {
        const demoUser = {
          id: "usr-admin",
          username: "admin",
          email: "admin@ElvorDigital.com",
          name: "ElvorDigital Chief Admin",
          role: "OWNER",
        };
        sessionStorage.setItem("znv_admin_token", "demo_admin_token_2026");
        sessionStorage.setItem("znv_admin_user", JSON.stringify(demoUser));
        router.push("/admin");
        return;
      }

      setError(data.message || "Invalid User ID or Password.");
    } catch (err) {
      // If backend network error, fallback to demo check
      if (
        (identifier === "admin" || identifier === "admin@ElvorDigital.com") &&
        (password === "Admin@123456" || password === "admin")
      ) {
        sessionStorage.setItem("znv_admin_token", "demo_admin_token_2026");
        sessionStorage.setItem(
          "znv_admin_user",
          JSON.stringify({
            id: "usr-admin",
            username: "admin",
            email: "admin@ElvorDigital.com",
            name: "ElvorDigital Chief Admin",
            role: "OWNER",
          })
        );
        router.push("/admin");
        return;
      }
      setError("Unable to authenticate. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070614] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] via-[#A855F7] to-[#EC4899] p-0.5 shadow-2xl shadow-purple-500/30 mb-4">
            <div className="w-full h-full rounded-[14px] bg-[#090816] flex items-center justify-center overflow-hidden">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H19"
                  stroke="url(#loginElvGrad)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12H15.5"
                  stroke="url(#loginElvGrad)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <circle cx="19" cy="5" r="1.5" fill="#EC4899" />
                <circle cx="15.5" cy="12" r="1.5" fill="#A855F7" />
                <circle cx="19" cy="19" r="1.5" fill="#22D3EE" />
                <defs>
                  <linearGradient id="loginElvGrad" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="0.5" stopColor="#A855F7" />
                    <stop offset="1" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Elvora<span className="text-[#8B5CF6]">Digital</span> Admin
          </h1>
          <p className="text-xs text-[#A7A3BC] mt-1">
            Enter administrative credentials to access the control panel
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-[#110f27]/90 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-[#A7A3BC] uppercase tracking-wider block mb-1.5">
                User ID or Admin Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A3BC]" />
                <input
                  type="text"
                  required
                  placeholder="admin or admin@ElvorDigital.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-[#A7A3BC]/50 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7A3BC] uppercase tracking-wider block mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7A3BC]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-[#A7A3BC]/50 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A7A3BC] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#A7A3BC] mt-6">
          Direct access to <code>/admin</code> without credentials is strictly prohibited.
        </p>

        {/* Developer Credit */}
        <div className="mt-8 pt-5 border-t border-white/5 text-center space-y-1">
          <p className="text-[10px] text-[#A7A3BC]/50 uppercase tracking-widest font-semibold">
            Developed &amp; Maintained by
          </p>
          <p className="text-sm font-bold text-white/80">
            Ritik Jain
          </p>
          <p className="text-[10px] text-purple-400/80 font-medium tracking-wide">
            Full-Stack Developer · ElvorDigital Platform
          </p>
          <a
            href="https://mahaveerweb.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-[10px] text-[#A7A3BC]/60 hover:text-purple-300 transition-colors group"
          >
            <span className="inline-block w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[6px] font-black text-white shrink-0">M</span>
            <span className="group-hover:underline">Mahaveer Web &amp; Software Solutions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
