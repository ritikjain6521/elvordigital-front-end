"use client";

import React from "react";
import Link from "next/link";

const categories = [
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

export default function KidsWorksheetsShowcase() {
  return (
    <>
      {/* ===== WHAT'S INSIDE: 18 LEARNING CATEGORIES ===== */}
      <section className="relative z-10 py-16 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full">
              What&apos;s Inside
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mt-4 mb-3">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                18 Learning
              </span>{" "}
              <span className="text-white">Categories</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-lg max-w-2xl mx-auto">
              A complete educational library covering every aspect of early childhood learning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((feature, i) => (
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

      {/* ===== WHY CHOOSE THIS BUNDLE ===== */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Why Choose This{" "}
              <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                Bundle?
              </span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base">
              Everything you need in one complete package
            </p>
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

      {/* ===== PERFECT FOR EVERYONE ===== */}
      <section className="relative z-10 py-16 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Perfect For{" "}
            <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Everyone
            </span>
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

      {/* ===== LIMITED TIME OFFER PRICING BOX ===== */}
      <section className="relative z-10 py-20 px-4" id="buy-now">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg mb-6 animate-pulse">
            🔥 LIMITED-TIME SPECIAL OFFER
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Get All 11,000+ Worksheets
          </h2>
          <p className="text-white/60 mb-10">One-time payment. Lifetime access. Instant download.</p>

          <div className="bg-gradient-to-br from-purple-900/60 to-blue-900/60 border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/20">
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

            <div className="inline-block bg-green-500/20 border border-green-500/40 text-green-300 text-sm font-bold px-4 py-2 rounded-full mb-6">
              🎉 You Save ₹800 — 80% OFF!
            </div>

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
    </>
  );
}
