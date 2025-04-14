"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NewGoalPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setLoading(true);

    const res = await fetch("/api/goals", {
      method: "POST",
      body: JSON.stringify({ title, description, deadline }),
    });

    if (res.ok) router.push("/dashboard");
    else alert("Failed to create goal.");

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card className="border border-indigo-300 dark:border-indigo-800 shadow-xl bg-white dark:bg-zinc-900">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300">
            🚀 Create a New Goal
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="e.g. Launch my startup by July"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700"
            />
            <Textarea
              placeholder="Why this goal matters to you..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700"
            />
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700"
            />
            <Button
              type="submit"
              size="lg"
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Goal"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}