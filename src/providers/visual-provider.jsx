"use client";
import { ThemeProvider } from "next-themes";

export function VisualProviders({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
