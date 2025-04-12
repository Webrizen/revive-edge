"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Moon, PiIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PrepBhakt from "@/assets/logo.png";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const links = [
    {
      href: "/daily-quizzes",
      title: "Daily Quizzes",
      description:
        "Start your day with fresh and insightful MCQs curated for UPSC and State PCS exams.",
    },
    {
      href: "/leaderboard",
      title: "Leaderboard",
      description:
        "See where you stand among fellow aspirants and track your progress.",
    },
    {
      href: "/partners",
      title: "Partner Institutes",
      description:
        "Learn about our educational partners providing premium quizzes and study materials.",
    },
    {
      href: "/blog",
      title: "Blog & Strategies",
      description:
        "Expert insights, tips, and strategies to ace competitive exams.",
    },
    {
      href: "/mock-tests",
      title: "Mock Tests",
      description:
        "Simulate real exam conditions with our comprehensive mock tests.",
    },
    {
      href: "/dashboard/preparation-tracker",
      title: "Preparation Tracker",
      description:
        "Track your progress and optimize your study schedule with our advanced preparation tracker.",
    },
  ];
  return (
    <header className="p-2 bg-[rgba(225,225,225,0.1)] backdrop-blur-3xl sticky top-0 z-50">
      <div className="md:max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="h-10 w-auto flex gap-2 justify-start mr-10 items-center p-1 rounded-md hover:bg-[rgba(225,225,225,0.05)]"
        >
          <Image
            src={PrepBhakt}
            placeholder="blur"
            alt="PrepBhakt Logo"
            width={500}
            height={500}
            className="h-full w-auto"
          />
          <span>PrepBhakt</span>
        </Link>
        <nav
          className={`lg:flex hidden md:border-l md:border-slate-500 md:px-3 lg:flex-row flex-col flex-grow md:relative absolute md:w-auto w-full left-0 right-0 md:top-auto top-16 z-50 text-sm items-center`}
        >
          <Link
            href="/#"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-slate-700 dark:text-slate-300 items-center justify-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            Home
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Prepare Smarter</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-slate-100/50 to-transparent p-4 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <PiIcon className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Why PrepBhakt?
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Revolutionizing the way students prepare for UPSC
                            and State PCS exams. Centralized, ad-free, and
                            effective.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/daily-quizzes"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] hover:text-accent-foreground focus:bg-slate-100 focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Daily Quizzes
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Start your day with fresh and insightful MCQs curated
                          for UPSC and State PCS exams.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/leaderboard"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] hover:text-accent-foreground focus:bg-slate-100 focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Leaderboard
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          See where you stand among fellow aspirants and track
                          your progress.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/partners"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] hover:text-accent-foreground focus:bg-slate-100 focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Partner Institutes
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn about our educational partners providing premium
                          quizzes and study materials.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/blog"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] hover:text-accent-foreground focus:bg-slate-100 focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Blog & Strategies
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Expert insights, tips, and strategies to ace
                          competitive exams.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/mock-tests"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] hover:text-accent-foreground focus:bg-slate-100 focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Mock Tests
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Simulate real exam conditions with our comprehensive
                          mock tests.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard/preparation-tracker"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] hover:text-accent-foreground focus:bg-slate-100 focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Preparation Tracker
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Monitor your daily, weekly, and monthly quiz
                          performance. Identify your strengths and work on your
                          weaknesses with data-driven insights.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/exam-iInsights"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] hover:text-accent-foreground focus:bg-slate-100 focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          Exam Insights
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Stay informed with key insights into UPSC and State
                          PCS exams. Get tips, updates, and analysis of trends
                          to fine-tune your preparation.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/about"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded dark:text-slate-300 text-slate-700 items-center justify-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded dark:text-slate-300 text-slate-700 items-center justify-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            Contact
          </Link>
        </nav>
        <div className="w-full flex justify-end items-center gap-2">
          <Button className="bg-indigo-600 text-indigo-50" radius="full">
            <Link href="/auth/students" className="size-full flex justify-center items-center text-center">Login</Link>
          </Button>
          <Button
            variant="flat"
            radius="full"
            className="!min-h-[45px] !min-w-[45px]"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="size-5" />
            ) : (
              <Sun className="size-5" />
            )}
          </Button>
          <Sheet>
            <SheetTrigger className="w-10 h-10 flex md:hidden justify-center items-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
            </SheetTrigger>
            <SheetContent className="bg-white dark:bg-black border-l-slate-100/30">
              <SheetHeader className="w-full text-left">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Explore our curated links to boost your preparation journey.
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-4 flex flex-col space-y-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors bg-slate-50 dark:bg-[rgba(225,225,225,0.05)] hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] hover:text-accent-foreground focus:bg-slate-100 focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {link.title}
                    </div>
                    <p className="text-sm leading-snug text-muted-foreground">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
