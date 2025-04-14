"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Spectral, Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function HeroSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div
      ref={targetRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 dark:bg-zinc-950 bg-zinc-100 overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-900 blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-700 blur-[150px]" />
        </motion.div>
      </div>

      <div className="absolute inset-0 dark:bg-[url('/logo.png')] bg-[length:50px_50px] opacity-[0.03]" />

      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 mx-auto py-24 px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block md:py-2 md:px-5 px-3 py-1 rounded-full dark:bg-indigo-900/30 bg-indigo-50 text-indigo-900 dark:text-indigo-300 md:text-lg text-sm font-medium border dark:border-indigo-800/50 border-indigo-200 mb-4">
            Introducing Revive Edge
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`${outfit.className} text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r dark:from-indigo-400 dark:via-indigo-200 dark:to-indigo-500 from-indigo-950 via-indigo-800 to-indigo-600 max-w-4xl mx-auto text-center uppercase`}
        >
          Never Give Up On Your Dreams Again
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-md md:text-xl dark:text-zinc-400 text-zinc-800 mb-10 max-w-3xl mx-auto"
        >
          Revive Edge is here to motivate you when you feel like giving up,
          visualizing the future you're working towards and keeping you on
          track. - It talks(voice), shows and reminds you of your goals and
          dreams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/auth/sign-up"
            className="flex items-center h-12 px-6 rounded-full bg-indigo-600 text-white border border-indigo-600"
          >
            Get Started
          </Link>
          <Link
            href="#"
            className="flex items-center h-12 px-6 rounded-full bg-gray-100 dark:bg-zinc-900 text-indigo-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-800"
          >
            Watch Demo
          </Link>
        </motion.div>

        {/* Video */}
        <motion.div
          style={{
            scale: useTransform(scrollYProgress, [0, 0.6], [1, 1.4]),
            opacity: useTransform(scrollYProgress, [0, 0.9, 1], [1, 0.7, 0]),
          }}
          transition={{ duration: 0.5 }}
          className="mt-20 max-w-5xl mx-auto h-[50vh]"
        >
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border-4 dark:border-zinc-800 border-zinc-200 shadow-2xl shadow-indigo-900/20">
            <div className="absolute w-full h-full inset-0 dark:bg-zinc-900 bg-zinc-100 flex items-center justify-center">
              <div className="text-zinc-600 text-lg">App Preview Video</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}