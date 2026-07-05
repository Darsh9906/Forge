"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  Brain,
  Settings,
  Home,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const primaryNav: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/memory", label: "Memory", icon: Brain },
];

const bottomNav: NavItem[] = [
  { href: "/settings", label: "Settings", icon: Settings },
];

const recentConversations = [
  { id: "1", title: "Project architecture review" },
  { id: "2", title: "Design system tokens" },
  { id: "3", title: "API integration plan" },
];

type SidebarProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 hidden flex-col md:flex"
      style={{
        width: collapsed ? 64 : 240,
        background: "#0d0d0d",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        transition: "width 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* ── Logo ── */}
      <div
        className="flex items-center overflow-hidden"
        style={{
          height: 64,
          padding: collapsed ? "0 16px" : "0 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        {/* Logo mark */}
        <div
          className="flex items-center justify-center shrink-0 font-bold text-sm tracking-tight"
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "#ffffff",
            color: "#0a0a0a",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          F
        </div>

        {/* Wordmark — fades out on collapse */}
        <div
          className="flex flex-col overflow-hidden"
          style={{
            marginLeft: 12,
            opacity: collapsed ? 0 : 1,
            width: collapsed ? 0 : "auto",
            transition: "opacity 0.2s ease, width 0.28s ease",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              lineHeight: 1.2,
            }}
          >
            Forge AI
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 400,
              color: "#606060",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            Memory Assistant
          </span>
        </div>
      </div>

      {/* ── New Chat Button ── */}
      <div
        style={{
          padding: collapsed ? "12px 12px" : "12px 12px",
          flexShrink: 0,
        }}
      >
        <Link href="/chat" className="block">
          <button
            className="forge-btn-lift flex items-center justify-center w-full rounded-xl font-medium text-sm"
            style={{
              height: 36,
              background: "#ffffff",
              color: "#0a0a0a",
              border: "none",
              cursor: "pointer",
              gap: 8,
              overflow: "hidden",
              flexShrink: 0,
              whiteSpace: "nowrap",
              transition: "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#e8e8e8";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
            }}
          >
            <Plus size={15} strokeWidth={2.5} style={{ flexShrink: 0 }} />
            {!collapsed && (
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                New Chat
              </span>
            )}
          </button>
        </Link>
      </div>

      {/* ── Primary Nav ── */}
      <nav
        className="flex flex-col"
        style={{
          padding: "4px 8px",
          gap: 2,
          flexShrink: 0,
        }}
      >
        {primaryNav.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <div key={item.href} className="relative forge-tooltip-trigger">
              <Link href={item.href} className="block">
                <div
                  className="forge-nav-item"
                  style={{
                    background: isActive
                      ? "rgba(255,255,255,0.09)"
                      : "transparent",
                    color: isActive ? "#ffffff" : "#808080",
                    justifyContent: collapsed ? "center" : "flex-start",
                    padding: collapsed ? "9px" : "9px 12px",
                  }}
                >
                  <Icon
                    size={16}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    style={{ flexShrink: 0 }}
                  />
                  {!collapsed && (
                    <span className="forge-nav-label">{item.label}</span>
                  )}
                </div>
              </Link>
              {/* Tooltip on collapse */}
              {collapsed && (
                <div className="forge-tooltip">{item.label}</div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Divider ── */}
      {!collapsed && (
        <div
          style={{
            margin: "8px 12px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        />
      )}

      {/* ── Recent Conversations ── */}
      {!collapsed && (
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: "0 8px" }}
        >
          <div
            style={{
              padding: "4px 8px 6px",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#484848",
              textTransform: "uppercase",
            }}
          >
            Recent
          </div>
          <div className="flex flex-col" style={{ gap: 1 }}>
            {recentConversations.map((convo) => (
              <button
                key={convo.id}
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
        </div>
      )}

      {/* Spacer when collapsed */}
      {collapsed && <div className="flex-1" />}

      {/* ── Bottom section ── */}
      <div
        style={{
          padding: "8px 8px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        {/* Settings nav */}
        {bottomNav.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <div key={item.href} className="relative forge-tooltip-trigger">
              <Link href={item.href} className="block">
                <div
                  className="forge-nav-item"
                  style={{
                    background: isActive
                      ? "rgba(255,255,255,0.09)"
                      : "transparent",
                    color: isActive ? "#ffffff" : "#606060",
                    justifyContent: collapsed ? "center" : "flex-start",
                    padding: collapsed ? "9px" : "9px 12px",
                  }}
                >
                  <Icon size={16} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                  {!collapsed && (
                    <span className="forge-nav-label">{item.label}</span>
                  )}
                </div>
              </Link>
              {collapsed && (
                <div className="forge-tooltip">{item.label}</div>
              )}
            </div>
          );
        })}

        {/* Profile row */}
        <div
          className="flex items-center overflow-hidden rounded-xl"
          style={{
            marginTop: 4,
            padding: collapsed ? "8px" : "8px 12px",
            gap: 10,
            cursor: "pointer",
            background: "transparent",
            transition: "background 0.15s ease",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLDivElement).style.background =
              "rgba(255,255,255,0.05)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "transparent";
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
          {!collapsed && (
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
          )}
        </div>
      </div>

      {/* ── Collapse Toggle ── */}
      <button
        onClick={onToggleCollapse}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute"
        style={{
          top: "50%",
          right: -12,
          transform: "translateY(-50%)",
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#808080",
          zIndex: 10,
          transition: "background 0.15s ease, color 0.15s ease",
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#252525";
          (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#1a1a1a";
          (e.currentTarget as HTMLButtonElement).style.color = "#808080";
        }}
      >
        {collapsed ? (
          <ChevronRight size={12} strokeWidth={2.5} />
        ) : (
          <ChevronLeft size={12} strokeWidth={2.5} />
        )}
      </button>
    </aside>
  );
}

/** Shared nav list for mobile drawer */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const allNav = [...primaryNav, ...bottomNav];

  return (
    <nav className="flex flex-col" style={{ gap: 2 }}>
      {allNav.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} onClick={onNavigate}>
            <div
              className="forge-nav-item"
              style={{
                background: isActive
                  ? "rgba(255,255,255,0.09)"
                  : "transparent",
                color: isActive ? "#ffffff" : "#808080",
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} style={{ flexShrink: 0 }} />
              <span>{item.label}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

export { primaryNav as navigationItems };
