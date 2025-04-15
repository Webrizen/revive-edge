"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OnboardingForm({ userId }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
      body: JSON.stringify({ title, description }),
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
    return <Skeleton className="h-full w-full rounded-xl" />;
  }

  return (
    <Card className="max-w-lg mx-auto shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Let's get you started.</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="What's your biggest goal?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Why is this goal important to you?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save and Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}