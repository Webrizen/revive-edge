"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [darkImage, setDarkImage] = useState(null);
  const [darkMessage, setDarkMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchDarkMirror() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dark-mirror", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch dark mirror data.");

      const data = await res.json();
      setDarkImage(data.imageUrl);  // Changed from darkImageUrl to imageUrl
      setDarkMessage(data.message); // Changed from darkMessage to message
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-white"
      >
        Dark Mirror
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 max-w-xl text-center"
      >
        The future you are building by your own hands.
      </motion.p>

      {!darkImage && !loading && !error && (
        <motion.button
          onClick={fetchDarkMirror}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
        >
          Generate Your Dark Mirror
        </motion.button>
      )}

      {loading && (
        <div className="h-64 flex items-center justify-center">
          <p className="text-white animate-pulse">Loading your fate...</p>
        </div>
      )}

      {error && (
        <div className="h-64 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {darkImage && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative w-full max-w-3xl"
        >
          <img
            src={darkImage}
            alt="Dark Mirror"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 p-4 rounded-xl text-white text-sm md:text-base"
          >
            {darkMessage}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}