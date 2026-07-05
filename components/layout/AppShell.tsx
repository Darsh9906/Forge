"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-dvh flex overflow-hidden sidebar-wrapper ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
      style={{ background: "#0a0a0a" }}
    >
      {/* Fixed desktop/tablet sidebar */}
      <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((p) => !p)} />

      {/* Right column: offsets dynamically with transition based on the CSS var */}
      <div
        className="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        {/* Mobile navbar (hamburger) */}
        <Navbar />

        {/* Main scrollable region */}
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
