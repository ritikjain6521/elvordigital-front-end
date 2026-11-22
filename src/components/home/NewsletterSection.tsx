"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative z-10 py-20 lg:py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#19153b] via-[#24174d] to-[#12163b] border border-purple-500/30 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          {/* Subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-purple-200 text-xs font-semibold mb-4">
              <Sparkles size={13} className="text-pink-400" />
              <span>THE DIGITAL DISPATCH</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Get More Ideas.{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
                Create More Possibilities.
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#A7A3BC] leading-relaxed">
              Join our creative community and receive new resources, exclusive offers, and digital growth tips delivered directly to your inbox.
            </p>

            {submitted ? (
              <div className="mt-8 flex items-center justify-center gap-3 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 max-w-md mx-auto text-sm font-semibold">
                <CheckCircle2 size={20} />
                <span>You&apos;re subscribed! Check your inbox for your welcome bundle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0e0d22] border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.02] transition-all shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            <p className="text-[11px] text-gray-500 mt-4">
              We respect your privacy. Zero spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
