"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  highlighted = false,
}) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: highlighted ? 1.03 : 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`
        rounded-2xl p-8 h-full relative
        ${
          highlighted
            ? "bg-gradient-to-br dark:from-indigo-900/50 dark:to-indigo-800/20 from-indigo-100 to-indigo-300 border-indigo-400 border dark:border-indigo-700/30 shadow-lg shadow-indigo-900/20"
            : "dark:bg-zinc-900/50 bg-zinc-100 border dark:border-zinc-800/50"
        }
      `}
    >
      {highlighted && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold py-1 px-3 rounded-full">
          Most Popular
        </div>
      )}

      <h3 className="text-2xl font-bold mb-2 dark:text-white">{title}</h3>
      <div className="flex items-baseline mb-1">
        <span className="text-4xl font-bold dark:text-white">{price}</span>
        <span className="dark:text-zinc-400 text-zinc-600 ml-1">/month</span>
      </div>
      <p className="dark:text-zinc-400 text-zinc-600 mb-6">{description}</p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div
              className={`
              rounded-full p-1 mr-3 mt-0.5
              ${
                highlighted
                  ? "dark:bg-indigo-900/50 dark:text-indigo-300 bg-indigo-300 text-indigo-800"
                  : "dark:bg-zinc-800/50 dark:text-zinc-300 bg-zinc-300 text-zinc-800"
              }
            `}
            >
              <Check className="h-3 w-3" />
            </div>
            <span className="dark:text-zinc-300 text-zinc-600">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full py-6 ${
          highlighted
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
        }`}
      >
        {buttonText}
      </Button>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section className="py-24 px-4 md:px-8 dark:bg-zinc-900 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r dark:from-zinc-50 dark:to-zinc-200 from-zinc-600 to-zinc-800"
        >
          Choose Your Plan
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-zinc-400 max-w-2xl mx-auto text-center mb-16"
        >
          Start your journey to consistent achievement today
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Basic"
            price="$9"
            description="Perfect for individuals just starting their journey"
            features={[
              "3 Active Goals",
              "Basic AI Motivation",
              "Email Reminders",
              "7-day History",
            ]}
            buttonText="Get Started"
          />
          <PricingCard
            title="Pro"
            price="$19"
            description="For serious goal-setters who need extra motivation"
            features={[
              "10 Active Goals",
              "Advanced AI Motivation",
              "Custom Reminders",
              "30-day History",
              "AI Image Visualization",
            ]}
            highlighted={true}
            buttonText="Get Started"
          />
          <PricingCard
            title="Enterprise"
            price="$49"
            description="For teams and organizations"
            features={[
              "Unlimited Goals",
              "Premium AI Motivation",
              "Team Dashboards",
              "Unlimited History",
              "Advanced Analytics",
              "Priority Support",
            ]}
            buttonText="Contact Sales"
          />
        </div>
      </div>
    </section>
  );
}
