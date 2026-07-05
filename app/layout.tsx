import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppShell } from "@/components/layout/AppShell";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forge AI — Persistent Memory Assistant",
  description:
    "Forge AI is a premium AI assistant with persistent memory. It remembers everything you teach it.",
  keywords: ["AI", "memory", "assistant", "Forge", "Cognee"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body
        className="min-h-dvh font-sans"
        style={{ background: "#0a0a0a", color: "#ffffff" }}
      >
        <QueryProvider>
          <ThemeProvider>
            <AppShell>{children}</AppShell>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#151515",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#ffffff",
                },
              }}
            />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
