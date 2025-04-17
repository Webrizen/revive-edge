import { Github, Instagram, Youtube } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <>
      <section className="bg-white dark:bg-zinc-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Let’s work together
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              We can’t wait to hear from you.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="space-y-12 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Our offices
                </h3>
                <p className="mt-2">
                  Prefer doing things in person? We don’t but we have to list
                  our addresses here for legal reasons.
                </p>
                <div className="mt-6 space-y-4">
                  <div>
                    <strong className="text-zinc-900 dark:text-white">
                      Kolkata
                    </strong>
                    <br />
                    Webrizen HQ
                    <br />
                    Salt Lake, Sector V, WB
                  </div>
                  <div>
                    <strong className="text-zinc-900 dark:text-white">
                      Remote
                    </strong>
                    <br />
                    All over the world
                    <br />
                    Wherever there's WiFi
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Email us
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    Careers —{" "}
                    <a
                      href="mailto:careers@webrizen.com"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      careers@webrizen.com
                    </a>
                  </li>
                  <li>
                    Press —{" "}
                    <a
                      href="mailto:press@webrizen.com"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      press@webrizen.com
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Follow us
                </h3>
                <div className="mt-4 flex space-x-6 text-zinc-400">
                  <a href="#" className="hover:text-indigo-500">
                    <Github />
                  </a>
                  <a href="#" className="hover:text-indigo-500">
                   <Instagram />
                  </a>
                  <a href="#" className="hover:text-indigo-500">
                    <Youtube />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <form className="space-y-6">
            <h1 className="md:text-4xl font-bold text-zinc-700">Connect with us</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input sm:col-span-2 !rounded-t-3xl"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input sm:col-span-2"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="input sm:col-span-2"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="input sm:col-span-2"
                />
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                className="input sm:col-span-2 !rounded-b-3xl"
              />
              <fieldset className="sm:col-span-2 p-2 mt-6">
                <legend className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Budget
                </legend>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {[
                    "$25K – $50K",
                    "$50K – $100K",
                    "$100K – $150K",
                    "More than $150K",
                  ].map((range, i) => (
                    <label key={i} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="budget"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 dark:bg-zinc-700 dark:border-zinc-600"
                      />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              </div>


              <button
                type="submit"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-white dark:bg-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 cursor-pointer"
              >
                Let’s work together
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
