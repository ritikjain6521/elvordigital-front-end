"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Clock, CheckCircle2, Send, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Product Question",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact Support" }]} />

        <div className="mt-4 mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Contact Digital Help Desk
          </h1>
          <p className="mt-2 text-sm text-[#A7A3BC]">
            Have an inquiry regarding a digital bundle, course access, or enterprise licensing? We&apos;re here to assist.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#17152E]/80 border border-white/10 space-y-6">
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Direct Email</h4>
                  <p className="text-xs text-[#A7A3BC] mt-0.5">support@zenovavibe.com</p>
                  <span className="text-[10px] text-purple-400">Guaranteed reply within 24h</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300 flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Support Hours</h4>
                  <p className="text-xs text-[#A7A3BC] mt-0.5">Monday – Saturday</p>
                  <span className="text-[10px] text-gray-400">9:00 AM – 8:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Digital Headquarters</h4>
                  <p className="text-xs text-[#A7A3BC] mt-0.5">Bengaluru &amp; Global Remote</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#17152E]/80 border border-white/10">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-white">Message Transmitted!</h3>
                  <p className="text-xs text-[#A7A3BC] max-w-sm mx-auto">
                    Thank you for reaching out. A digital product specialist will follow up at <strong className="text-white">{formData.email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ritik Verma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 cursor-pointer"
                    >
                      <option value="Product Question">Product Question / Details</option>
                      <option value="Download Assistance">Download or Access Assistance</option>
                      <option value="Partnership / Creator">Creator Collaboration</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A7A3BC] mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help your creative process today?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-colors"
                  >
                    <Send size={14} />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
