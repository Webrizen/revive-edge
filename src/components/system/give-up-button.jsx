"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function GiveUpButton({ goalId }) {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showMotivation, setShowMotivation] = useState(false);
  const [typedResponse, setTypedResponse] = useState("");
  const goalOfUser = `${goal?.title} because ${goal?.description}`;

  useEffect(() => {
    if (!goalId) return;

    const fetchGoal = async () => {
      try {
        const res = await fetch(`/api/goals/${goalId}`);
        if (!res.ok) throw new Error("Failed to fetch goal");
        const data = await res.json();
        setGoal(data);
      } catch (err) {
        setError("Unable to load goal.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [goalId]);

  useEffect(() => {
    if (aiResponse) {
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i < aiResponse.length) {
          setTypedResponse(aiResponse.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingEffect);
  
          // Web Speech API - Speak after typing ends
          if (typeof window !== "undefined" && window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(aiResponse);
            utterance.lang = "en-US";
            utterance.pitch = 1;
            utterance.rate = 1;
            utterance.volume = 1;
            window.speechSynthesis.speak(utterance);
          }
        }
      }, 20);
  
      return () => clearInterval(typingEffect);
    }
  }, [aiResponse]);  

  const handleGiveUp = async () => {
    if (!reason.trim()) {
      setError("Please share why you're considering giving up.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch("/api/giveup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: goalOfUser,
          reason,
        }),
      });
      if (!res.ok) throw new Error("Give up failed");
      const data = await res.json();
      setSuccess(true);
      setAiResponse(data.aiResponse);
      setImageUrl(data.imageUrl);
    } catch (err) {
      setError("Something went wrong. Maybe this is a sign to try again?");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500 dark:text-red-300 text-sm"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Goal Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700"
      >
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {goal.title}
        </h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300 italic">
          "{goal.description}"
        </p>
      </motion.div>

      {/* Reason Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Textarea
          placeholder="What's making you consider giving up? Let's talk about it..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="min-h-[120px] text-lg p-4 border-2 border-gray-300 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl"
        />
      </motion.div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="destructive"
          onClick={handleGiveUp}
          disabled={submitting}
          size="lg"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Thinking...
            </span>
          ) : (
            "I Want to Give Up"
          )}
        </Button>

        <Button
          variant="secondary"
          onClick={() => setShowMotivation(!showMotivation)}
          size="lg"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          {showMotivation ? "Hide Motivation" : "Get Encouragement"}
        </Button>
      </div>

      {/* Motivation Section */}
      <AnimatePresence>
        {showMotivation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-emerald-800/50">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3">
                ✨ You've Got This! ✨
              </h3>
              <p className="text-green-700 dark:text-green-300">
                Remember why you started this journey. Every challenge is an
                opportunity to grow stronger. Take a deep breath and consider
                giving it one more try. The view from the top will be worth it!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Response */}
      <AnimatePresence>
        {aiResponse && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 grid md:grid-cols-2 grid-cols-1 gap-6"
            >
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-sm border border-purple-200 dark:border-purple-800/50">
                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4 flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  Your Personal AI Coach Says:
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-200 text-lg leading-relaxed">
                    {typedResponse}
                    {typedResponse.length < aiResponse.length && (
                      <span className="ml-1 inline-block h-5 w-2 bg-purple-500 animate-pulse"></span>
                    )}
                  </p>
                </div>
              </div>

              {imageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="overflow-hidden rounded-2xl shadow-xl"
                >
                  <Image
                    src={imageUrl}
                    alt="Motivational Artwork"
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-6"
            >
              <Button
                variant="outline"
                className="border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30"
                onClick={() => setShowMotivation(true)}
              >
                Still feeling unsure? Let's talk more
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
