"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [darkImage, setDarkImage] = useState(null);
  const [darkMessage, setDarkMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isActive, setIsActive] = useState(false); // Track if mirror is active

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation based on mouse position
    const rotX = (y / rect.height - 0.5) * 10;
    const rotY = (x / rect.width - 0.5) * -10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };

  async function fetchDarkMirror() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dark-mirror", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch dark mirror data.");

      const data = await res.json();
      setDarkImage(data.imageUrl);
      setDarkMessage(data.message);
      setIsActive(true); // Mark as active
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-8">
      <div
        className="flex flex-col items-center space-y-4 w-md bg-transparent rounded-2xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative w-full aspect-[3/4] rounded-2xl bg-transparent"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Mirror container */}
          <div
            className={cn(
              "absolute inset-0 transition-all duration-300 ease-in-out rounded-2xl",
              isActive
                ? "bg-red-500 border-red-700 shadow-red-950/30"
                : "bg-gradient-to-br from-zinc-900/95 via-zinc-800/90 to-zinc-700/85 backdrop-blur-sm border border-zinc-700/50",
              isActive && "shadow-[0_10px_30px_-5px_rgba(255,0,0,0.3)]"
            )}
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: "transform 0.1s ease-out",
              boxShadow: isActive
                ? "0 10px 30px -5px rgba(255, 0, 0, 0.3), 0 0 5px rgba(255, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.05)"
                : "0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Mirror content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              {loading ? (
                <p className="text-zinc-400">Loading dark reflection...</p>
              ) : isActive ? (
                <>
                  <div
                    className="w-24 h-24 mb-4 rounded-full bg-cover bg-center shadow-md"
                    style={{ backgroundImage: `url(${darkImage})` }}
                  ></div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {darkMessage || "Your Reflection"}
                  </h3>
                </>
              ) : (
                <>
                  <div className="relative w-24 h-24 mb-4 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-700 shadow-md">
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-600 bg-[url('/logo.png')] bg-center bg-cover bg-no-repeat"></div>
                  </div>
                  <h3 className="text-xl font-medium text-zinc-300 mb-2">
                    Dark Reflection
                  </h3>
                  <p className="text-zinc-400 max-w-xs">
                    This mirror absorbs light, creating a mysterious and dramatic
                    atmosphere.
                  </p>
                </>
              )}
            </div>

            {/* Mirror shine effect */}
            {!isActive && (
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-zinc-600/10 to-zinc-500/20 opacity-30"></div>
            )}

            {/* Mirror frame */}
            <div
              className={cn(
                "absolute inset-0 border-[12px] rounded-2xl pointer-events-none shadow-[inset_0_0_8px_rgba(0,0,0,0.3)]",
                isActive ? "border-red-900/70" : "border-zinc-800"
              )}
            ></div>
          </div>
        </div>
      </div>

      <Button onClick={fetchDarkMirror} disabled={loading || isActive}>
        {loading
          ? "Summoning..."
          : isActive
          ? "You've seen it all"
          : "I'm done with my life!"}
      </Button>

      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}