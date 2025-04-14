import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const mockGiveups = [
  {
    aiResponse:
      "You gave up once. Don’t turn that into a habit. You’re not built for average.",
    imageUrl: "https://placehold.co/600x400?text=You+Are+Not+Average",
    triggeredAt: "2025-04-01",
  },
  {
    aiResponse: "Falling once is fine. Staying down? That’s weakness.",
    imageUrl: "https://placehold.co/600x400?text=Stand+Back+Up",
    triggeredAt: "2025-04-08",
  },
  {
    aiResponse: "Comfort kills ambition. Remember that.",
    imageUrl: "https://placehold.co/600x400?text=Comfort+Kills",
    triggeredAt: "2025-04-11",
  },
];

export default async function DashboardPage() {
  const { userId } = await auth();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/goals`,
    { cache: "no-store" },
    { next: { revalidate: 30 } }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch latest goals data");
  }
  const goals = await response.json();

  if (!userId) {
    redirect("/");
    return (
      <section className="w-full min-h-screen flex justify-center items-center text-center">
        User Not Authenticated! Redirecting...
      </section>
    );
  } else if (!goals || goals.length === 0) {
    return (
      <section className="w-full min-h-screen flex justify-center items-center text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          No Goals Found
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          You haven't created any goals yet.
        </p>
        <Button className="mt-4" onClick={() => redirect("/onboarding")}>
          Create Your First Goal
        </Button>
      </section>
    );
  }

  return (
    <main className="w-full px-4 md:px-8 py-10">
      <section className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Your Goals
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {goal.title}
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {goal.description}
              </p>
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-300">
                Deadline: {goal.deadline}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
