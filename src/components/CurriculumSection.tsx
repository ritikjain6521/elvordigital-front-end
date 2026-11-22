"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, CheckCircle2 } from "lucide-react";
import { MODULES } from "@/lib/constants";

export default function CurriculumSection() {
  const [openModule, setOpenModule] = useState<number | null>(0);

  return (
    <section id="curriculum" className="relative z-10 py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <BookOpen size={14} className="text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              8 Comprehensive Modules
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            What You Will{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Learn
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            A complete 8-module curriculum taking you from Meta advertising
            fundamentals to advanced AI-powered marketing strategies.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {MODULES.map((mod, i) => {
            const isOpen = openModule === i;
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <div
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "bg-gradient-to-br from-purple-500/10 to-cyan-500/5 border-purple-500/30 shadow-lg shadow-purple-500/5"
                      : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenModule(isOpen ? null : i)
                    }
                    className="w-full flex items-center gap-4 p-5 sm:p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    {/* Module number */}
                    <div
                      className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                        isOpen
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-white/5 text-gray-400 border border-white/10"
                      }`}
                    >
                      {String(mod.id).padStart(2, "0")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {mod.topics.length} lessons
                      </p>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        size={20}
                        className={isOpen ? "text-purple-400" : "text-gray-500"}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.5rem] sm:pl-[5rem]">
                          <div className="space-y-2.5">
                            {mod.topics.map((topic) => (
                              <div
                                key={topic}
                                className="flex items-start gap-2.5"
                              >
                                <CheckCircle2
                                  size={16}
                                  className="text-purple-400 mt-0.5 shrink-0"
                                />
                                <span className="text-sm text-gray-300">
                                  {topic}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
