import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/goals/user/${userId}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch latest goals data");
  }

  const goals = await response.json();

  if (!goals || goals.length === 0) {
    return (
      <section className="w-full min-h-screen flex flex-col justify-center items-center text-center gap-4 px-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          No Goals Found
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          You haven't created any goals yet.
        </p>
        <Button onClick={() => redirect("/onboarding")}>
          Create Your First Goal <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>
    );
  }

  return (
    <main className="w-full py-12">
      <section className="w-full mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
          Your Goals
        </h1>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 bg-zinc-100 dark:bg-zinc-900 transition-all duration-300 border-2 border-zinc-200 dark:border-zinc-800 flex justify-between flex-col"
            >
              <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400">
                {goal.title || "No Title"}
              </h2>
              <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                {goal.description || "No description provided."}
              </p>
              {goal.deadline && (
                <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                </p>
              )}
              <Link
                href={`/dashboard/give-up/${goal._id}`}
                className="flex items-center h-12 w-min whitespace-nowrap mt-4 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-600"
              >
                Give Up
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
