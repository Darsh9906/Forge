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

  const sidebarWidth = collapsed ? 64 : 240;

  return (
    <div className="h-dvh flex overflow-hidden" style={{ background: "#0a0a0a" }}>
      {/* Fixed desktop sidebar */}
      <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((p) => !p)} />

      {/* Right column: offsets based on sidebar width */}
      <div
        className="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Mobile navbar (hamburger) */}
        <Navbar />

        {/* Main scrollable region */}
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
