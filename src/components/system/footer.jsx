"use client";

import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Testimonials", "FAQ"],
    },
    {
      title: "Company",
      links: ["About", "Team", "Careers", "Press"],
    },
    {
      title: "Resources",
      links: ["Blog", "Documentation", "Support", "Privacy Policy"],
    },
  ];

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Github className="h-5 w-5" />, href: "#" },
  ];

  return (
    <footer className="dark:bg-zinc-950 border-t dark:border-zinc-900 bg-zinc-100 border-zinc-300 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <Image
                  src={Logo}
                  alt="Revive Edge Logo"
                  width={500}
                  height={500}
                  className="h-10 w-10 dark:filter-none invert mr-2"
                />
                <span className="text-2xl font-bold dark:text-white text-black">
                  Revive Edge
                </span>
              </div>
              <p className="dark:text-zinc-400 text-zinc-800 mb-6 max-w-md">
                Revive Edge helps you stay committed to your goals with
                AI-powered motivation and visualization.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="w-10 h-10 rounded-full dark:bg-zinc-900 bg-white dark:border-0 border-2 border-zinc-300 flex items-center justify-center dark:text-zinc-400 text-zinc-800 dark:hover:bg-indigo-900/30 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <h4 className="dark:text-white text-zinc-600 font-bold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href="#"
                      className="dark:text-zinc-400 text-zinc-600 dark:hover:text-indigo-300 hover:text-indigo-800 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-zinc-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Revive Edge. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-zinc-500 hover:text-indigo-300 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-indigo-300 text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-indigo-300 text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
