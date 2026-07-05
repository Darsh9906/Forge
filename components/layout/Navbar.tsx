"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, X, ChevronDown, ChevronRight, Clock, User } from "lucide-react";

import { SidebarNav } from "@/components/layout/Sidebar";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/chat": "Chat",
  "/memory": "Memory",
  "/settings": "Settings",
};

const recentConversations = [
  { id: "1", title: "Project architecture review" },
  { id: "2", title: "Design system tokens" },
  { id: "3", title: "API integration plan" },
];

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recentOpen, setRecentOpen] = useState(false); // Collapsed by default on mobile
  const pathname = usePathname();

  // Find the closest matching page title
  const title =
    Object.entries(pageTitles)
      .reverse()
      .find(([path]) => pathname.startsWith(path))?.[1] ?? "Forge AI";

  return (
    <>
      {/* Mobile-only top bar */}
      <header
        className="sticky top-0 z-40 flex items-center md:hidden shrink-0"
        style={{
          height: 56,
          background: "rgba(10,10,10,0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 16px",
          gap: 12,
        }}
      >
        {/* Hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent",
            cursor: "pointer",
            color: "#b8b8b8",
          }}
        >
          <MenuIcon size={16} />
        </button>

        {/* Mobile brand */}
        <div className="flex items-center" style={{ gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "#ffffff",
              color: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            F
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#ffffff" }}>
            {title}
          </span>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden animate-forge-fade-in"
          onClick={() => setDrawerOpen(false)}
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        />
      )}

      {/* Mobile drawer panel */}
      <div
        className="fixed inset-y-0 left-0 z-50 flex flex-col md:hidden"
        style={{
          width: 280,
          background: "#0d0d0d",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between"
          style={{
            height: 56,
            padding: "0 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        >
          <div className="flex items-center" style={{ gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: "#ffffff",
                color: "#0a0a0a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              F
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#ffffff" }}>
                Forge AI
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#606060",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Memory Assistant
              </div>
            </div>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              color: "#606060",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* New Chat */}
        <div style={{ padding: "12px 12px", flexShrink: 0 }}>
          <Link href="/chat" onClick={() => setDrawerOpen(false)}>
            <button
              className="w-full flex items-center justify-center rounded-xl font-medium text-sm"
              style={{
                height: 36,
                background: "#ffffff",
                color: "#0a0a0a",
                border: "none",
                cursor: "pointer",
                gap: 8,
              }}
            >
              + New Chat
            </button>
          </Link>
        </div>

        {/* Scrollable middle container */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "0 8px" }}>
          <SidebarNav onNavigate={() => setDrawerOpen(false)} />
          
          <div
            style={{
              margin: "8px 12px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          />

          {/* Collapsible Recent Chats */}
          <div style={{ padding: "0 8px" }}>
            <button
              onClick={() => setRecentOpen(!recentOpen)}
              className="w-full flex items-center justify-between animate-forge-fade-in"
              style={{
                padding: "8px 8px 6px",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#484848",
                textTransform: "uppercase",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span>Recent</span>
              <span className="flex items-center">
                {recentOpen ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
              </span>
            </button>
            {recentOpen && (
              <div className="flex flex-col" style={{ gap: 1 }}>
                {recentConversations.map((convo) => (
                  <button
                    key={convo.id}
                    onClick={() => setDrawerOpen(false)}
                    className="forge-nav-item"
                    style={{ padding: "7px 12px", color: "#606060" }}
                  >
                    <Clock size={13} style={{ flexShrink: 0, opacity: 0.6 }} />
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontSize: 13,
                      }}
                    >
                      {convo.title}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile Footer */}
        <div
          style={{
            padding: "12px 8px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        >
          <div
            className="flex items-center overflow-hidden rounded-xl"
            style={{
              padding: "8px 12px",
              gap: 10,
              cursor: "pointer",
              background: "transparent",
            }}
          >
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <User size={13} style={{ color: "#b8b8b8" }} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#b8b8b8",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                You
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
