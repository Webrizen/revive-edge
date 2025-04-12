import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroImg from "@/assets/hero-img.png";
import { Spotlight } from "@/components/ui/spotlight";
import { Meteors } from "@/components/ui/meteors";

export default function Home() {
  return (
    <>
      <section className="py-8 pt-24 relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#f1f1f1"
        />
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row lg:items-stretch gap-10">
          <div className="lg:w-1/2 lg:pb-10 xl:pb-12 text-center lg:text-left max-w-2xl md:max-w-3xl mx-auto ">
            <div className="relative rounded-full md:py-3 md:px-2 md:pl-4 p-2 md:w-min md:whitespace-nowrap mb-6 text-sm leading-6 dark:text-slate-300 text-gray-600 ring-1 dark:ring-slate-700 ring-gray-900/10 hover:ring-gray-900/20">
              Ready to ace your exams?{" "}
              <a
                href="/blogs"
                className="font-semibold text-sm md:bg-indigo-600 md:text-indigo-50 text-indigo-600 md:border border-0 border-indigo-200 dark:border-indigo-500 rounded-full md:px-3 md:py-2 md:ml-2"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Explore Features <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <h1 className="font-semibold md:leading-3 text-teal-950 dark:text-white text-4xl md:text-5xl lg:text-6xl">
              Stop Scrolling,{" "}
              <div className="relative after:absolute after:inset-x-0 after:h-3 after:bg-sky-100 dark:after:bg-sky-950 after:bottom-2 inline-block px-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-tr from-indigo-800 to-purple-400">
                  Start Preparing
                </span>
              </div>{" "}
              Like You Mean It!
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">
              From quizzes that make you question your life choices to study
              resources that actually make sense, we’ve got everything you need
              to crack those competitive exams—minus the boring vibes. So grab
              your chai, forget the chaos, and let’s turn your dream into
              reality (or at least make your parents happy).
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                href="/auth"
                className="flex items-center justify-center gap-x-2 px-5 py-2.5 border border-transparent bg-indigo-700 text-white"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/daily-free-mcqs"
                className="flex items-center justify-center gap-x-2 px-5 py-2.5 border border-gray-200 text-sky-700 dark:border-gray-800 dark:text-white"
              >
                Learn more
              </Link>
            </div>
            <div className="flex items-center gap-1 mt-10 justify-center lg:justify-start gap-x-3">
              <div className="flex items-center -space-x-2">
                <Image
                  src="/placeholder.svg"
                  width={2250}
                  height={1400}
                  alt="listener avatar"
                  className="w-10 h-10 object-cover rounded-full ring-4 ring-white dark:ring-gray-950"
                />
                <Image
                  src="/placeholder.svg"
                  width={2250}
                  height={1400}
                  alt="listener avatar"
                  className="w-10 h-10 object-cover rounded-full ring-4 ring-white dark:ring-gray-950"
                />
                <Image
                  src="/placeholder.svg"
                  width={2250}
                  height={1400}
                  alt="listener avatar"
                  className="w-10 h-10 object-cover rounded-full ring-4 ring-white dark:ring-gray-950"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  +12k
                </span>
                <span className="text-gray-600 text-sm dark:text-gray-300">
                  Active Students
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative lg:h-auto max-w-2xl md:max-w-3xl mx-auto">
            <Meteors number={10} />
            <div className="absolute right-2 -translate-x-2 -top-8 px-10 py-1.5 bg-white text-center border border-gray-100 shadow-lg shadow-gray-200/40 rounded-full">
              <span className="font-bold text-3xl text-sky-950 flex items-center gap-2">
                4.7+ <Star className="w-auto h-7 fill-yellow-500 text-yellow-500" />
              </span>
              <p className="text-gray-600">Ratings</p>
            </div>
            <Image
              src={HeroImg}
              width={600}
              height={600}
              placeholder="blur"
              alt="sidebiew image"
              className="lg:w-full lg:h-[500px] object-contain animate-zigzag"
            />
          </div>
        </div>
      </section>
      <section className="py-8 mt-24">
        <div className="mx-auto lg:max-w-7xl text-center space-y-8 px-4">
          <h2 className="font-semibold md:leading-3 text-teal-950 dark:text-white text-4xl md:text-5xl lg:text-6xl">
            Why choose{" "}
            <div className="relative after:absolute after:inset-x-0 after:h-3 after:bg-sky-100 dark:after:bg-sky-950 after:bottom-2 inline-block px-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-tr from-indigo-800 to-purple-400">
                PrepBhakt?
              </span>
            </div>
          </h2>
          <p className="text-sm md:text-md text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Revolutionizing how students prepare for UPSC and State PCS exams
            with interactive tools, ad-free experiences, and a touch of humor to
            make your journey stress-free and fun.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Strategies",
                desc: "Personalized strategies to help you outsmart the competition.",
              },
              {
                title: "Daily Quizzes",
                desc: "Fresh quizzes daily to keep you on your toes and exam-ready.",
              },
              {
                title: "Community Support",
                desc: "Join a supportive community of aspirants like you.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 bg-card-${index} rounded-lg shadow-lg dark:shadow-none hover:shadow-xl transition-shadow`}
              >
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-slate-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
