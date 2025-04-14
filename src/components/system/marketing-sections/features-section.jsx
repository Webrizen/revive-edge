"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Target, Clock } from "lucide-react";

export default function FeaturesSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.6, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  return (
    <>
      {/* Features Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto" ref={targetRef}>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r dark:from-zinc-50 dark:to-zinc-200 from-zinc-600 to-zinc-800"
          >
            Stay Committed to Your Goals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Revive Edge uses AI to keep you motivated when you need it most
          </motion.p>
        </div>

        <motion.div
          style={{ scale, opacity, y }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={<Target className="h-8 w-8 text-indigo-500" />}
            title="Goal Setting"
            description="Set meaningful goals and track your progress with our intuitive interface"
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-indigo-500" />}
            title="AI Motivation"
            description="Receive personalized motivation when you feel like giving up"
            highlighted={true}
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8 text-indigo-500" />}
            title="Timely Reminders"
            description="Get gentle nudges to keep you on track with your goals"
          />
        </motion.div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, description, highlighted = false }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`
          rounded-2xl p-8 h-full
          ${
            highlighted
              ? "bg-gradient-to-br dark:from-indigo-900/50 from-indigo-50 to-indigo-300 dark:to-indigo-800/20 border dark:border-indigo-700/30 border-indigo-400/60 shadow-lg shadow-indigo-900/20"
              : "dark:bg-zinc-900/50 border dark:border-zinc-800/50"
          }
        `}
    >
      <div
        className={`
          rounded-full w-14 h-14 flex items-center justify-center mb-6
          ${
            highlighted
              ? "dark:bg-indigo-900/50 border dark:border-indigo-700/50"
              : "dark:bg-zinc-800/50 border dark:border-zinc-700/50"
          }
        `}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 dark:text-white">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </motion.div>
  );
}