"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

function TestimonialCard({ quote, author, role, rating, highlighted = false }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`
        rounded-2xl p-8 h-full
        ${
          highlighted
            ? "bg-gradient-to-br dark:from-indigo-900/50 dark:to-indigo-800/20 from-indigo-50 to-indigo-300 border-indigo-400 border dark:border-indigo-700/30"
            : "dark:bg-zinc-900/50 border dark:border-zinc-800/50"
        }
      `}
    >
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-zinc-700"}`} />
        ))}
      </div>

      <p className="dark:text-zinc-300 text-zinc-600 mb-6 italic">"{quote}"</p>

      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-indigo-800/50 flex items-center justify-center mr-3 dark:text-indigo-200 text-indigo-800 font-medium">
          {author
            .split(" ")
            .map((name) => name[0])
            .join("")}
        </div>
        <div>
          <p className="font-medium dark:text-white text-zinc-950">{author}</p>
          <p className="text-sm text-zinc-500">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r dark:from-zinc-50 dark:to-zinc-200 from-zinc-600 to-zinc-800"
    >
      Success Stories
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <TestimonialCard
        quote="Revive Edge kept me going when I wanted to quit my fitness journey. The AI motivation is incredibly effective."
        author="Sarah J."
        role="Fitness Enthusiast"
        rating={5}
      />
      <TestimonialCard
        quote="As an entrepreneur, staying motivated through challenges is crucial. This platform has been a game-changer for me."
        author="Michael T."
        role="Startup Founder"
        rating={5}
        highlighted={true}
      />
      <TestimonialCard
        quote="The visualizations of my future success are so motivating. I look at them whenever I feel like giving up."
        author="Elena R."
        role="Graduate Student"
        rating={4}
      />
    </div>
  </section>
  )
}
