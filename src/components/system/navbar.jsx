"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MoonIcon, SunIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
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
import ReviveEdge from "@/assets/logo.png";
import { UserButton, useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const { isSignedIn } = useAuth();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio('/just-relax.mp3');
    audioRef.current.loop = true;
    
    // Start playing
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Audio playback failed:", err);
        setIsPlaying(false);
      }
    };
    
    playAudio();

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const links = [
    {
      href: "/#how-it-works",
      title: "How it Works",
      description: "Understand the motivation flow and give-up triggers.",
    },
    {
      href: "/roadmap",
      title: "Roadmap",
      description: "See what's planned for Revive Edge in upcoming versions.",
    },
    {
      href: "https://webrizen.vercel.app/blogs",
      title: "Blog",
      description: "Read insights about motivation, psychology, and systems.",
    },
  ];

  return (
    <header className="p-2 dark:bg-zinc-900 bg-zinc-50 backdrop-blur-3xl sticky top-0 z-50">
      <div className="md:max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="h-10 w-auto flex gap-2 items-center p-1 rounded-md hover:bg-[rgba(225,225,225,0.05)] mr-3"
        >
          <Image
            src={ReviveEdge}
            alt="Revive Edge Logo"
            width={500}
            height={500}
            className="h-full w-auto dark:filter-none invert"
          />
          <span className="md:block hidden whitespace-nowrap">Revive Edge</span>
        </Link>

        <nav className="lg:flex hidden md:border-l md:border-zinc-500 md:px-3 lg:flex-row flex-col flex-grow md:relative absolute md:w-auto w-full left-0 right-0 md:top-auto top-16 z-50 text-sm items-center">
          <Link
            href="/"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            Home
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-zinc-100/50 to-transparent p-4 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Why ReviveEdge?
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Break down. Click give up. Let the AI pull you back.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {links.map((link) => (
                      <NavigationMenuLink asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="block space-y-1 rounded-md p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
                        >
                          <div className="text-sm font-medium leading-none">
                            {link.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {link.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/pricing"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Audio control button */}
          <Button
            variant="ghost"
            radius="full"
            className="!min-h-[35px] !min-w-[35px]"
            onClick={toggleAudio}
            aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
          >
            {isPlaying ? <Volume2Icon size={18} /> : <VolumeXIcon size={18} />}
          </Button>

          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className="relative px-4 py-2 text-sm mr-2 overflow-hidden font-medium text-gray-600 bg-gray-100 border dark:border-zinc-500 border-gray-100 rounded-full shadow-inner group"
              >
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                  Dashboard
                </span>
              </Link>
              <UserButton />
            </>
          ) : (
            <Button
              className="bg-indigo-600 hover:bg-indigo-500 text-indigo-50"
              radius="full"
            >
              <Link
                href="/auth/sign-in"
                className="flex items-center justify-center w-full h-full"
              >
                Login
              </Link>
            </Button>
          )}
          <Button
            variant="ghost"
            radius="full"
            className="!min-h-[35px] !min-w-[35px]"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </Button>
          <Sheet>
            <SheetTrigger className="w-10 h-10 md:hidden flex justify-center items-center hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
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
            <SheetContent className="bg-white dark:bg-black border-l-zinc-100/30">
              <SheetHeader className="text-left">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate Revive Edge. Break limits. Never give up.
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-4 flex flex-col space-y-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block space-y-1 rounded-md p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
                  >
                    <div className="text-sm font-medium leading-none">
                      {link.title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {link.description}
                    </p>
                  </Link>
                ))}
                <Link
                  href="/pricing"
                  className="p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;