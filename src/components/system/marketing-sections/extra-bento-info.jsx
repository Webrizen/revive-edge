"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Brain, Zap, ImageIcon, MessageSquare, BarChart3, Target } from "lucide-react"

function BentoGrid() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 2])

  return (
    <motion.div
      ref={targetRef}
      style={{ scale }}
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.1 }}
      
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
    >
      {/* Large feature */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="col-span-1 md:col-span-2 row-span-2 bg-gradient-to-br dark:from-indigo-900/30 dark:to-indigo-800/10 from-indigo-50 to-indigo-100 rounded-3xl p-8 border border-indigo-800/30 relative overflow-hidden group"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 dark:bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/30 transition-all duration-700"></div>
        <div className="relative z-10">
          <div className="dark:bg-indigo-900/50 bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 border border-indigo-700/50">
            <Brain className="h-6 w-6 text-indigo-300" />
          </div>
          <h3 className="text-2xl font-bold mb-3 dark:text-white">AI-Powered Motivation</h3>
          <p className="dark:text-zinc-400 text-zinc-700 mb-6">
            Our advanced AI analyzes your goals and creates personalized motivation strategies that adapt to your unique
            challenges and mindset.
          </p>

          <div className="mt-8 dark:bg-zinc-900/50 bg-[rgba(225,225,225,0.1)] rounded-xl p-6 dark:border border-2 dark:border-zinc-800/50 border-zinc-300">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center flex-shrink-0 border border-indigo-700/50">
                <Zap className="h-5 w-5 text-indigo-100" />
              </div>
              <div>
                <h4 className="font-medium dark:text-white mb-1">Personalized Motivation</h4>
                <p className="text-sm dark:text-zinc-400 text-zinc-600">
                  The AI learns what motivates you specifically and adapts its approach over time.
                </p>
              </div>
            </div>
          </div>

          <motion.div style={{ rotate }} className="absolute bottom-6 right-6 w-32 h-32 opacity-10">
            <div className="w-full h-full bg-indigo-500 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Image generation */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="col-span-1 dark:bg-zinc-900/50 rounded-3xl p-6 border dark:border-zinc-800/50 relative overflow-hidden group"
      >
        <div className="relative z-10">
          <div className="dark:bg-zinc-800/50 bg-white w-10 h-10 rounded-full flex items-center justify-center mb-4 border border-zinc-700/50">
            <ImageIcon className="h-5 w-5 text-indigo-300" />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Future Visualization</h3>
          <p className="text-sm text-zinc-400">
            See AI-generated images of what your life could look like when you achieve your goals.
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition-all duration-700"></div>
      </motion.div>

      {/* Voice messages */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="col-span-1 dark:bg-zinc-900/50 rounded-3xl p-6 border dark:border-zinc-800/50 relative overflow-hidden group"
      >
        <div className="relative z-10">
          <div className="dark:bg-zinc-800/50 bg-white w-10 h-10 rounded-full flex items-center justify-center mb-4 border border-zinc-700/50">
            <MessageSquare className="h-5 w-5 text-indigo-300" />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Voice Motivation</h3>
          <p className="text-sm text-zinc-400">
            Receive motivational messages in natural-sounding voices when you need them most.
          </p>
        </div>
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition-all duration-700"></div>
      </motion.div>

      {/* Progress tracking */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="col-span-1 dark:bg-zinc-900/50 rounded-3xl p-6 border dark:border-zinc-800/50 relative overflow-hidden group"
      >
        <div className="relative z-10">
          <div className="dark:bg-zinc-800/50 bg-white w-10 h-10 rounded-full flex items-center justify-center mb-4 border border-zinc-700/50">
            <BarChart3 className="h-5 w-5 text-indigo-300" />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Progress Analytics</h3>
          <p className="text-sm text-zinc-400">
            Track your journey with detailed analytics and insights on your progress.
          </p>
        </div>
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition-all duration-700"></div>
      </motion.div>

      {/* Goal setting */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="col-span-1 md:col-span-2 dark:bg-zinc-900/50 rounded-3xl p-6 border dark:border-zinc-800/50 relative overflow-hidden group"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="dark:bg-zinc-800/50 bg-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-zinc-700/50">
            <Target className="h-5 w-5 text-indigo-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">Smart Goal Setting</h3>
            <p className="text-sm text-zinc-400">
              Our AI helps you set achievable goals and breaks them down into manageable steps, increasing your chances
              of success.
            </p>
          </div>
        </div>
        <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all duration-700"></div>
      </motion.div>
    </motion.div>
  )
}


export default function ExtraBentoInfo() {
  return (
    <section className="py-24 px-4 md:px-8 dark:bg-zinc-900 bg-zinc-50" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r dark:from-zinc-200 dark:to-zinc-400 from-zinc-600 to-zinc-800"
          >
            Visualize Your Success
          </motion.h2>

          <BentoGrid />
        </div>
      </section>
  )
}