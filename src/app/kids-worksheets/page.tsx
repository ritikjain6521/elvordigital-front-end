"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const features = [
  { icon: "🔤", title: "ABC Alphabet Tracing", desc: "Letter formation & tracing worksheets for early learners" },
  { icon: "📖", title: "English & Phonics", desc: "Letters, phonics, and language activities" },
  { icon: "🔢", title: "Numbers & Counting", desc: "Number recognition, counting, and sequencing" },
  { icon: "➕", title: "Addition & Subtraction", desc: "Maths worksheets for all primary levels" },
  { icon: "🔷", title: "Shapes, Colors & Patterns", desc: "Pattern recognition and color identification" },
  { icon: "✍️", title: "Handwriting Practice", desc: "Pencil control and handwriting improvement" },
  { icon: "🎨", title: "Coloring Pages", desc: "Creative coloring and art activities" },
  { icon: "✏️", title: "Drawing & Art Practice", desc: "Step-by-step drawing worksheets" },
  { icon: "🧩", title: "Matching & Memory Games", desc: "Visual matching and memory skill builders" },
  { icon: "🧠", title: "Puzzle & Brain Development", desc: "Critical thinking and problem-solving activities" },
  { icon: "🔬", title: "Science & General Knowledge", desc: "Fun science facts and GK worksheets" },
  { icon: "🐾", title: "Animals, Birds & Nature", desc: "Wildlife and nature learning activities" },
  { icon: "📝", title: "Vocabulary & Word Recognition", desc: "Sight words, vocabulary, and spelling" },
  { icon: "📚", title: "Reading & Writing Practice", desc: "Comprehension and writing exercises" },
  { icon: "💡", title: "Logical Thinking", desc: "Problem-solving and reasoning activities" },
  { icon: "🏫", title: "Preschool & Kindergarten", desc: "Age-appropriate early learning content" },
  { icon: "🤝", title: "Fine Motor Skills", desc: "Tracing, cutting, and coordination activities" },
  { icon: "🎮", title: "Fun Educational Games", desc: "Learn through play activities" },
];

const benefits = [
  "11,000+ Printable Worksheets",
  "Learning Through Fun Activities",
  "Preschool to Primary Learning",
  "Creative & Educational Activities",
  "Perfect for Home & Classroom",
  "Instant Digital Access",
  "Multiple Learning Categories",
];

const faqs = [
  {
    q: "What age group are these worksheets for?",
    a: "These worksheets are designed for children aged 2–10 years, covering Preschool, Kindergarten, and Primary school levels.",
  },
  {
    q: "Are these worksheets printable?",
    a: "Yes! All 11,000+ worksheets are high-quality printable PDFs. Simply download, print, and use as many times as you like.",
  },
  {
    q: "How do I access the worksheets after purchase?",
    a: "You'll receive instant access via email with a download link immediately after payment. No waiting!",
  },
  {
    q: "Can I use these for classroom teaching?",
    a: "Absolutely! These are perfect for teachers, tutors, homeschooling parents, and educational institutions.",
  },
  {
    q: "Is this a one-time payment?",
    a: "Yes! One-time payment of ₹199 gives you lifetime access to all 11,000+ worksheets.",
  },
];

export default function KidsWorksheetsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0820] via-[#0d0b2a] to-[#120a35] text-white overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-16 pb-20 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* LIMITED TIME BADGE */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
              🔥 LIMITED-TIME SPECIAL OFFER
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4">
                <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                  11,000+
                </span>
                <br />
                <span className="text-white">KIDS</span>
                <br />
                <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  WORKSHEETS
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-bold text-white/90 mb-3">
                The Ultimate All-in-One Learning &amp; Activity Bundle for Kids!
              </p>
              <p className="text-base text-purple-300 font-semibold mb-8">
                Make Learning Fun, Creative, Interactive &amp; Enjoyable!
              </p>

              {/* Benefits quick list */}
              <ul className="mb-8 space-y-2">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-semibold text-white/85">
                    <span className="text-green-400 text-base">✓</span> {b}
                  </li>
                ))}
              </ul>

              {/* PRICING */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 inline-block w-full lg:w-auto">
                <div className="flex items-center gap-4 justify-center lg:justify-start mb-4">
                  <span className="text-white/40 line-through text-2xl font-bold">₹999</span>
                  <span className="text-5xl font-black bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                    ₹199
                  </span>
                  <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded-lg">80% OFF</span>
                </div>
                <p className="text-xs text-white/50 mb-4 text-center lg:text-left">
                  One-time payment • Lifetime access • Instant download
                </p>
                <Link
                  href="/checkout?product=11000-kids-worksheets-bundle"
                  className="block w-full text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-400 hover:via-pink-400 hover:to-purple-500 text-white font-black text-lg px-8 py-4 rounded-xl shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/60"
                >
                  🛒 BUY NOW — Only ₹199
                </Link>
                <p className="text-xs text-white/40 text-center mt-3">🔒 Secure Payment • 100% Safe Checkout</p>
              </div>
            </div>

            {/* RIGHT: 3D Product visual */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                {/* Glow behind product */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-pink-500/40 rounded-3xl blur-2xl scale-110" />

                {/* Product Box */}
                <div className="relative bg-gradient-to-br from-purple-700 via-blue-700 to-indigo-800 rounded-3xl p-6 shadow-2xl border border-white/20 w-full h-full flex flex-col justify-between overflow-hidden">
                  {/* Top shine */}
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent rounded-t-3xl" />

                  <div className="relative z-10">
                    <div className="text-5xl mb-2">📚</div>
                    <div className="text-yellow-300 font-black text-4xl leading-none">11,000+</div>
                    <div className="text-white font-black text-xl">KIDS</div>
                    <div className="text-sky-200 font-black text-2xl">WORKSHEETS</div>
                    <div className="text-white/70 text-xs mt-1 font-semibold">MEGA BUNDLE</div>
                  </div>

                  {/* Floating icons */}
                  <div className="absolute bottom-6 right-4 opacity-60 text-3xl">🎨</div>
                  <div className="absolute top-24 right-6 opacity-50 text-2xl">✏️</div>
                  <div className="absolute bottom-14 left-4 opacity-50 text-2xl">🔢</div>
                  <div className="absolute top-20 left-4 opacity-40 text-xl">🔤</div>

                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-1">
                      {["ABC", "123", "Art", "Math", "GK", "Fun"].map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/15 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating worksheet cards */}
                <div className="absolute -top-8 -right-8 bg-white rounded-xl p-3 shadow-xl rotate-12 w-24 h-28 flex flex-col items-center justify-center border border-gray-100">
                  <div className="text-2xl mb-1">🔤</div>
                  <div className="text-gray-700 text-[9px] font-bold text-center">ABC Tracing</div>
                  <div className="mt-1 space-y-1 w-full">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-1 bg-gray-200 rounded w-full" />
                    ))}
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-8 bg-white rounded-xl p-3 shadow-xl -rotate-6 w-24 h-28 flex flex-col items-center justify-center border border-gray-100">
                  <div className="text-2xl mb-1">🔢</div>
                  <div className="text-gray-700 text-[9px] font-bold text-center">Numbers</div>
                  <div className="mt-1 flex gap-1 justify-center">
                    {["1", "2", "3"].map((n) => (
                      <div key={n} className="w-5 h-5 bg-blue-100 rounded text-[10px] font-bold text-blue-700 flex items-center justify-center">
                        {n}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-1/2 -left-10 -translate-y-1/2 bg-white rounded-xl p-3 shadow-xl -rotate-3 w-20 h-24 flex flex-col items-center justify-center border border-gray-100">
                  <div className="text-xl mb-1">🎨</div>
                  <div className="text-gray-700 text-[9px] font-bold text-center">Coloring</div>
                  <div className="mt-1 flex gap-0.5">
                    {["bg-red-300", "bg-yellow-300", "bg-blue-300"].map((c) => (
                      <div key={c} className={`w-3 h-3 rounded-full ${c}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED SECTION ===== */}
      <section className="py-16 px-4 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full">
              What&apos;s Inside
            </span>
            <h2 className="text-4xl sm:text-5xl font-black mt-4 mb-3">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">18 Learning</span>{" "}
              <span className="text-white">Categories</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              A complete educational library covering every aspect of early childhood learning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-5 hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1 group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS SECTION ===== */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3">
              Why Choose This{" "}
              <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">Bundle?</span>
            </h2>
            <p className="text-white/60">Everything you need in one complete package</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "📄", title: "11,000+ Worksheets", desc: "Massive collection covering all subjects and skill levels" },
              { icon: "🎯", title: "Age 2–10 Targeted", desc: "Carefully designed for Preschool through Primary grades" },
              { icon: "🏠", title: "Home & Classroom", desc: "Perfect for parents, teachers, and homeschooling families" },
              { icon: "⚡", title: "Instant Access", desc: "Download immediately after purchase — no waiting!" },
              { icon: "🖨️", title: "Print Unlimited", desc: "Print as many copies as you need, forever" },
              { icon: "💰", title: "Incredible Value", desc: "₹199 for 11,000+ worksheets — just paise per sheet!" },
            ].map((b, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all"
              >
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-white mb-2">{b.title}</h3>
                <p className="text-white/60 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHO IS IT FOR ===== */}
      <section className="py-16 px-4 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Perfect For{" "}
            <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">Everyone</span>
          </h2>
          <p className="text-white/60 mb-10">Who benefits most from this bundle?</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { emoji: "👨‍👩‍👧", label: "Parents" },
              { emoji: "👩‍🏫", label: "Teachers" },
              { emoji: "🏫", label: "Schools" },
              { emoji: "🏡", label: "Homeschoolers" },
              { emoji: "👨‍🏫", label: "Tutors" },
              { emoji: "🎓", label: "Educators" },
            ].map((p) => (
              <div
                key={p.label}
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 flex flex-col items-center gap-2 hover:border-purple-500/40 transition-all"
              >
                <span className="text-4xl">{p.emoji}</span>
                <span className="text-sm font-bold text-white/80">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className="py-20 px-4" id="buy-now">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg mb-6 animate-pulse">
            🔥 LIMITED-TIME SPECIAL OFFER
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Get All 11,000+ Worksheets
          </h2>
          <p className="text-white/60 mb-10">One-time payment. Lifetime access. Instant download.</p>

          <div className="bg-gradient-to-br from-purple-900/60 to-blue-900/60 border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/20">
            {/* Price */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-white/40 line-through text-2xl font-bold">₹999</div>
                <div className="text-xs text-white/30">Original Price</div>
              </div>
              <div className="text-4xl text-white/20">→</div>
              <div className="text-center">
                <div className="text-6xl font-black bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                  ₹199
                </div>
                <div className="text-xs text-green-400 font-bold">Special Launch Price</div>
              </div>
            </div>

            {/* You save badge */}
            <div className="inline-block bg-green-500/20 border border-green-500/40 text-green-300 text-sm font-bold px-4 py-2 rounded-full mb-6">
              🎉 You Save ₹800 — 80% OFF!
            </div>

            {/* Benefits checklist */}
            <ul className="text-left space-y-2 mb-8 max-w-sm mx-auto">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="text-green-400 font-bold">✓</span> {b}
                </li>
              ))}
            </ul>

            <Link
              href="/checkout?product=11000-kids-worksheets-bundle"
              className="block w-full text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-400 hover:via-pink-400 hover:to-purple-500 text-white font-black text-xl px-8 py-5 rounded-2xl shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/60"
            >
              🛒 BUY NOW — Only ₹199
            </Link>
            <p className="text-xs text-white/40 text-center mt-4">
              🔒 100% Secure Payment &nbsp;|&nbsp; ⚡ Instant Digital Access &nbsp;|&nbsp; 🖨️ Printable PDFs
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-16 px-4 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-3">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-white text-sm">{faq.q}</span>
                  <span className="text-purple-400 text-xl flex-shrink-0">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-white/60 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-80 bg-purple-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">🎓</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Give Your Child the{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Best Start
            </span>
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Join thousands of parents and teachers who trust this bundle to make learning fun!
          </p>
          <Link
            href="/checkout?product=11000-kids-worksheets-bundle"
            className="inline-block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-400 hover:via-pink-400 hover:to-purple-500 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            🛒 GET INSTANT ACCESS — ₹199 Only
          </Link>
          <p className="text-xs text-white/30 mt-4">🔒 Secure Checkout • Instant Access • No Subscription</p>
        </div>
      </section>
    </div>
  );
}
