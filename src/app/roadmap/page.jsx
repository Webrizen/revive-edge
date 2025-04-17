import React from "react";

export default function page() {
  return (
    <section className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 py-16 md:px-20 relative">
      {/* Background Gradient Meshes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[1000px] h-[1000px] bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-500 rounded-full blur-[160px] opacity-20 top-[-20%] left-[-10%]" />
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-500 rounded-full blur-[140px] opacity-10 bottom-[-20%] right-[-10%]" />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-16 text-center">
        🚀 Revive Edge Roadmap
      </h1>

      {/* Section 1: Feature Timeline */}
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {roadmap.map((item, idx) => {
          // Determine cell span based on index for variety
          const colSpan =
            idx % 5 === 0
              ? "md:col-span-4 lg:col-span-4"
              : idx % 3 === 0
              ? "md:col-span-4 lg:col-span-3"
              : idx % 2 === 0
              ? "md:col-span-3 lg:col-span-3"
              : "md:col-span-5 lg:col-span-2";

          // Alternate between row spans
          const rowSpan = idx % 4 === 0 ? "md:row-span-2" : "md:row-span-1";

          // Alternate colors based on index
          const gradientColors = [
            "from-purple-500/20 via-pink-400/20 to-yellow-300/20",
            "from-blue-500/20 via-cyan-400/20 to-emerald-300/20",
            "from-rose-500/20 via-fuchsia-400/20 to-violet-300/20",
          ][idx % 3];

          return (
            <div
              key={idx}
              className={`group relative bg-white/5 dark:bg-black/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] overflow-hidden col-span-4 ${colSpan} ${rowSpan}`}
            >
              <div
                className={`absolute -inset-1 bg-gradient-to-br ${gradientColors} blur-2xl opacity-40 group-hover:opacity-70 transition-opacity z-[-1]`}
              />
              <h2 className="text-xl font-bold mb-3">{item.title}</h2>
              <p className="text-md text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const roadmap = [
  {
    title: "✅ MVP Submission",
    description:
      "Submit to Next.js Global Hackathon 2025 with a functioning AI-powered motivation engine. The MVP integrates Gemini for brutally honest, psych-manipulative summaries, ElevenLabs for realistic emotional audio, and a fully working Firestore backend to log and analyze user give-up events. We focused heavily on UI/UX polish, speed, and dark aesthetic. Custom components, a modern multi-step form flow, bento-inspired layout, and clean fallback handling for API errors make this MVP both impactful and resilient. This is not a prototype. It's a statement.",
  },
  {
    title: "🔜 Onboarding Experience",
    description:
      "Build a flow where users set their goals, define setbacks, and personalize tone of motivation.",
  },
  {
    title: "🎧 Dynamic Voice Profiles",
    description:
      "Let users choose from multiple ElevenLabs voices — from calm to brutally savage.",
  },
  {
    title: "🖼️ Save + Share Scenes",
    description:
      "Allow users to download/share AI-generated images and quotes as motivational posters.",
  },
  {
    title: "📊 Track Emotional Patterns",
    description:
      "Using AI, detect recurring patterns in reasons people give up — and offer better re-engagement triggers.",
  },
  {
    title: "🧪 Experiment Zone",
    description:
      "Test dark psychological triggers, reinforcement techniques, and long-term goal behavior shaping.",
  },
];
