import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/system/navbar";
import Footer from "@/components/system/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
});

export const metadata = {
  title: "Revive Edge",
  description: "Push through your limits. Never give up.",
  metadataBase: new URL('https://revive-edge.webrizen.com'),
  openGraph: {
    title: "Revive Edge — Push through your limits. Never give up.",
    description: " Push through your limits. Never give up.",
    url: "https://revive-edge.webrizen.com",
    siteName: "Revive Edge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Revive Edge Hero Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revive Edge",
    description: "Push through your limits. Never give up.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/icon.png',
    apple: '/icon.png'
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${dmSans.className} antialiased`}>
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
