import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { AppShell } from "@/components/layout/AppShell";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
}); 

export const metadata: Metadata = {
  title: "Forge",
  description: "Forge application shell",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
     <body className="min-h-dvh bg-background text-foreground font-sans">
  <QueryProvider>
    <AppShell>{children}</AppShell>
  </QueryProvider>
</body>
    </html>
  );
}
