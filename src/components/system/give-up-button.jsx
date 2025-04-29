"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, Frown } from "lucide-react";
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
  const [typedResponse, setTypedResponse] = useState("");
  const [mode, setMode] = useState("view"); // 'view' | 'complete' | 'give-up'
  const [completed, setCompleted] = useState(false);

  const goalOfUser = `${goal?.title} because ${goal?.description}`;

  useEffect(() => {
    if (!goalId) return;

    const fetchGoal = async () => {
      try {
        const res = await fetch(`/api/goals/${goalId}`);
        if (!res.ok) throw new Error("Failed to fetch goal");
        const data = await res.json();
        // Auto-set completed state based on fetched goal
        if (data.completed) {
          setCompleted(true);
          setMode("complete");
        }
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

          // Speak after typing ends
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

  const handleComplete = async () => {
    try {
      const res = await fetch(`/api/giveup/${goalId}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: true }),
      });

      if (!res.ok) throw new Error("Completion failed");

      setCompleted(true);
      setMode("complete");
    } catch (err) {
      alert("Could not mark as complete. Try again later.");
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      {/* Goal Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-gradient-to-r from-blue-50 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700"
      >
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          {completed ? (
            <>
              <CheckCircle2 className="text-green-500" /> Completed:{"  "}
            </>
          ) : (
            <Sparkles className="text-yellow-500" />
          )}
          {goal.title}
        </h2>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300 italic">
          "{goal.description}"
        </p>
      </motion.div>

      {/* Buttons */}
      {!completed && mode === "view" && (
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <Button
            onClick={handleComplete}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" /> Mark Complete
          </Button>
          <Button
            variant="destructive"
            onClick={() => setMode("give-up")}
            size="lg"
          >
            <Frown className="mr-2 h-5 w-5" /> I Want to Give Up
          </Button>
        </div>
      )}

      {/* Give Up Flow */}
      {mode === "give-up" && !success && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Textarea
            placeholder="What's making you consider giving up? Let's talk about it..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[120px] text-lg p-4 border-2 border-gray-300 dark:border-zinc-700 focus:border-red-500 dark:focus:border-red-400 rounded-xl"
          />

          <Button
            variant="outline"
            onClick={handleGiveUp}
            disabled={submitting}
            className="w-full"
          >
            {submitting ? "Thinking..." : "Share & Get Help"}
          </Button>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* AI Response */}
      <AnimatePresence>
        {mode === "give-up" && aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mt-6 grid md:grid-cols-2 gap-6"
          >
            <div className="p-6 bg-gradient-to-r from-zinc-50 to-zinc-50 dark:from-zinc-900/20 dark:to-zinc-900/20 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800/50">
              <div className="relative w-24 h-24 mb-4 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-700 shadow-md border-2">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-600 bg-[url('/logo.png')] bg-center bg-cover bg-no-repeat"></div>
              </div>
              <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-200 text-lg leading-relaxed">
                {typedResponse}
                {typedResponse.length < aiResponse.length && (
                  <span className="ml-1 inline-block h-5 w-2 bg-zinc-500 animate-pulse"></span>
                )}
              </p>
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
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Success */}
      {mode === "complete" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"
        >
          <Sparkles className="mx-auto text-yellow-500 h-12 w-12" />
          <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
            Well done!
          </h3>
          <p className="text-green-600 dark:text-green-400">
            Your goal has been marked as completed. Celebrate your progress 💫
          </p>
        </motion.div>
      )}
    </div>
  );
}
