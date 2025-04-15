"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

export default function GiveUpButton({ goalId }) {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
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

  const handleGiveUp = async () => {
    if (!reason.trim()) {
      setError("Reason cannot be empty.");
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
            reason
         }),
      });
      if (!res.ok) throw new Error("Give up failed");
      const data = await res.json();
      setSuccess(true);
      setAiResponse(data.aiResponse);
      setImageUrl(data.imageUrl);
      setAudioUrl(data.audioUrl);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {goal.title}
        </h2>
        <p className="mt-1 text-zinc-700 dark:text-zinc-300 italic">
          "{goal.description}"
        </p>
      </div>

      <div>
        <Textarea
          placeholder="Why are you giving up?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div>
        <Button
          variant="destructive"
          onClick={handleGiveUp}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Confirm Give Up"}
        </Button>
      </div>
      {aiResponse && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold">AI Response</h3>
          <p className="whitespace-pre-wrap text-sm text-gray-900">
            {aiResponse}
          </p>

          {audioUrl && (
            <audio controls src={audioUrl} className="w-full mt-2" />
          )}

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Motivational Artwork"
              className="w-full rounded-xl shadow-md mt-4"
            />
          )}
        </div>
      )}
    </div>
  );
}
