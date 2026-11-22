"use client";

import { motion } from "framer-motion";
import { Play, MonitorPlay, BookOpen, Clock, Star } from "lucide-react";

const previewLessons = [
  { title: "Introduction to Meta Advertising", duration: "12:30", module: "Module 01" },
  { title: "Setting Up Your Ads Manager", duration: "18:45", module: "Module 02" },
  { title: "Creating Your First Campaign", duration: "22:15", module: "Module 05" },
  { title: "Understanding Ad Metrics", duration: "15:20", module: "Module 06" },
];

export default function CoursePreview() {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <MonitorPlay size={14} className="text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Course Preview
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            See What&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Inside
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Video player placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#12183a] to-[#0d1025] border border-white/10 aspect-video group cursor-pointer">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-cyan-900/30" />

              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Course title overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4">
                    <Star size={12} className="text-purple-400" />
                    <span className="text-xs font-medium text-purple-300">
                      PRO EDITION
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Meta Ads Mastery 2026
                  </h3>
                  <p className="text-sm text-gray-400 mt-2">
                    Course preview video
                  </p>
                </div>

                {/* Play button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-purple-500/30 group-hover:bg-purple-500/90 transition-colors"
                >
                  <Play size={36} className="text-white ml-1" fill="white" />
                </motion.div>

                <p className="text-xs text-gray-500 mt-4">
                  Replace with your preview video
                </p>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                <span className="text-xs font-medium text-white">Preview</span>
              </div>
            </div>
          </motion.div>

          {/* Lesson previews */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-purple-400" />
              Sample Lessons
            </h3>
            {previewLessons.map((lesson, i) => (
              <motion.div
                key={lesson.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-purple-500/5 hover:border-purple-500/20 transition-all duration-300 cursor-pointer"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <Play
                    size={16}
                    className="text-purple-400 ml-0.5"
                    fill="currentColor"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lesson.module}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} />
                  {lesson.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
