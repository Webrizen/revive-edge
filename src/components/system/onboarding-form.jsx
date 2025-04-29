"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";

export default function OnboardingForm({ userId }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function checkGoal() {
      try {
        const res = await fetch(`/api/goals/user/${userId}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          router.replace("/dashboard");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Goal check failed", err);
        setLoading(false);
      }
    }
    checkGoal();
  }, [userId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description) return;

    setSubmitting(true);
    const res = await fetch("/api/goals", {
      method: "POST",
      body: JSON.stringify({ title, description, deadline }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Failed to save goal. Try again.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-lg mx-auto space-y-4">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="max-w-lg mx-auto shadow-xl rounded-3xl border border-gray-200 dark:border-zinc-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
            Let's get you started 🌟
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-2">
              <label htmlFor="goal-title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                What's your biggest goal?
              </label>
              <Input
                id="goal-title"
                placeholder="e.g., Launch my side project within 2 months"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="goal-description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Why is this goal important to you?
              </label>
              <Textarea
                id="goal-description"
                placeholder="Explain what drives you..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="goal-deadline" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                When do you want to achieve it by?
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  id="goal-deadline"
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="pl-10 text-base"
                />
              </div>
            </div>

            <Button type="submit" disabled={submitting} className="mt-2">
              {submitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 0112-6.9" className="opacity-75"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save & Continue"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}