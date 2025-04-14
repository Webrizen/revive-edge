import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import connectToDB from "@/lib/db";
import Goal from "@/lib/models/Goal";
import { Button } from "@/components/ui/button";

export default async function page() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  await connectToDB();
  const goal = await Goal.findOne({ userId });
  if (!goal) redirect("/onboarding");

  const mockGiveups = [
    {
      aiResponse: "You gave up once. Don’t turn that into a habit. You’re not built for average.",
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

  return (
    <main className="w-full px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 auto-rows-[250px]">
        {/* GOAL: Big featured tile */}
        <div className="lg:col-span-3 lg:row-span-2 relative bg-gradient-to-br from-blue-600 to-indigo-800 text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold">🎯 Your Mission</h2>
            <p className="text-xl mt-2 font-semibold">{goal.title}</p>
            <p className="italic text-sm opacity-80 mt-1">"{goal.description}"</p>
          </div>
          <div className="flex justify-end">
            <Button variant="destructive" size="lg" className="mt-4 w-full sm:w-auto">
              Give Up
            </Button>
          </div>
        </div>

        {/* Past Give-Ups */}
        {mockGiveups.map((event, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden shadow-md group bg-neutral-950 text-white flex flex-col justify-end p-4 bg-cover bg-center transition-all hover:scale-[1.01]"
            style={{
              backgroundImage: `url(${event.imageUrl})`,
            }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm group-hover:backdrop-blur-md transition-all"></div>
            <div className="relative z-10">
              <p className="text-sm text-gray-300 mb-1">{event.triggeredAt}</p>
              <p className="text-base font-medium leading-snug">{event.aiResponse}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}