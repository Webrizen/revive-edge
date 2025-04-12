import { Providers } from "@/providers/providers";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/system/Navbar";
import { VisualProviders } from "@/providers/visual-provider";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Prep Bhakt | Free UPSC & State PCS Quiz Platform",
    template: "%s | Prep Bhakt",
  },
  description:
    "Prep Bhakt is a free platform for UPSC and State PCS aspirants to access daily quizzes, mock tests, and practice material. A student-centric, ad-free learning hub.",
  applicationName: "Prep Bhakt",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "UPSC quizzes",
    "State PCS quizzes",
    "MCQ practice",
    "mock tests",
    "UPSC preparation",
    "State PCS preparation",
    "online test platform",
    "daily quizzes",
  ],
  authors: [{ name: "Arshahdul Ahmed", url: "https://github.com/arshahdul" }],
  publisher: "Prep Bhakt",
  metadataBase: new URL("https://prepbhakt.com"),
  openGraph: {
    title: "Prep Bhakt | Free UPSC & PCS Quiz Platform",
    description:
      "Prep Bhakt offers a centralized, ad-free platform for UPSC and State PCS aspirants to access high-quality quizzes and practice tests. Start preparing today!",
    url: "https://prepbhakt.com",
    siteName: "Prep Bhakt",
    images: [
      {
        url: "https://prepbhakt.com/assets/og-image.png",
        width: 500,
        height: 500,
        alt: "Prep Bhakt Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: "google-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
  },
  category: "Education",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={poppins.className}>
          <Providers>
            <VisualProviders>
              <Navbar />
              {children}
            </VisualProviders>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
