import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/system/navbar";
import Footer from "@/components/system/footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Revive Edge – The Point Where You Don't Break",
  description:
    "Revive Edge exists for one reason: to make sure you never fold. Save your goals. Click 'Give Up'. Let AI push you past the edge.",
  keywords: [
    "Ayanokoji mindset",
    "AI motivation system",
    "mental resilience tool",
    "Revive Edge",
    "give up button",
    "cold logic motivation",
    "AI mental support",
    "Next.js 15 SaaS",
  ],
  authors: [{ name: "Revive Edge Team", url: "https://revive-edge.vercel.app" }],
  creator: "Revive Edge",
  openGraph: {
    title: "Revive Edge – The Point Where You Don't Break",
    description:
      "Weakness is predictable. We built Revive Edge to counter it. Save your purpose. When you're ready to quit, press 'Give Up'—and face what you’ve avoided.",
    url: "https://revive-edge.vercel.app",
    siteName: "Revive Edge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Revive Edge – The Point Where You Don't Break",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revive Edge – The Point Where You Don't Break",
    creator: "@shadow_jsx",
    description:
      "When emotion fails, logic remains. Hit 'Give Up'. Let Revive Edge manipulate your weakness into progress.",
    images: ["/og-image.png"],
    site: "@shadow_jsx",
  },
  metadataBase: new URL("https://revive-edge.vercel.app"),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${bricolage.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
