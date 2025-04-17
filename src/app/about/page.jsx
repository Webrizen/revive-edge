import { Brain, Target, Zap } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <section className="my-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            About Revive Edge
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            At Revive Edge, we’re redefining how people bounce back from
            setbacks. Built for students, dreamers, and doers, our AI-powered
            system is here to remind you why you started when you're on the edge
            of giving up.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-start">
            <div className="rounded-md bg-indigo-600/10 p-3 ring-1 ring-inset ring-indigo-600/20 dark:ring-indigo-500/20">
              <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Built on Psychology
            </h3>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
              Every interaction is engineered with behavioral science to gently
              nudge you forward.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="rounded-md bg-indigo-600/10 p-3 ring-1 ring-inset ring-indigo-600/20 dark:ring-indigo-500/20">
              <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Real-Time AI Support
            </h3>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
              Our system delivers fast, smart, and personal motivation tailored
              to your mindset.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="rounded-md bg-indigo-600/10 p-3 ring-1 ring-inset ring-indigo-600/20 dark:ring-indigo-500/20">
              <Target className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Goal-Oriented
            </h3>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
              We focus on action. Whether you’re building a habit or chasing a
              dream, we help you stay on track.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
          <div className="h-40 w-40 aspect-square mx-auto mb-6 overflow-hidden rounded-full ring-2 ring-indigo-600">
              <img
                src="https://webrizen.vercel.app/arsh.png"
                alt="Arsh - Creator of Revive Edge"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Meet the Creator
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              I’m Arsh — an 18-year-old developer, builder, and survivor. Born
              in chaos, shaped by struggle, and driven by a relentless will to
              escape mediocrity. I created Revive Edge not just as a product,
              but as a lifeline — for me and for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
