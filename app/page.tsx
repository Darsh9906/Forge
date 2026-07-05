"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Brain,
  Settings,
  ArrowRight,
  Database,
  Cpu,
  Activity,
  Plus,
  Clock,
} from "lucide-react";

import { useMemoryStore } from "@/stores/memory-store";
import { useSettingsStore } from "@/stores/settings-store";
import type { MemoryRecord } from "@/types/memory";

const memoryTextKeys = ["text", "content", "memory", "message", "note", "body"];

function getMemoryText(memory: MemoryRecord): string {
  for (const key of memoryTextKeys) {
    const value = memory[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }
  return JSON.stringify(memory, null, 2);
}

const recentConversations = [
  { id: "1", title: "Project architecture review" },
  { id: "2", title: "Design system tokens" },
  { id: "3", title: "API integration plan" },
];

export default function HomePage() {
  const { memories, recall, loading } = useMemoryStore();
  const selectedModel = useSettingsStore((state) => state.selectedModel);
  const useMemory = useSettingsStore((state) => state.useMemory);

  useEffect(() => {
    // Fetch stored memories to populate dashboard
    void recall("");
  }, [recall]);

  // Take the 3 most recent memories
  const recentMemories = memories.slice(-3).reverse();

  return (
    <div
      className="h-full overflow-y-auto w-full"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="mx-auto animate-forge-fade-in"
        style={{
          maxWidth: 900,
          padding: "clamp(24px, 5vw, 40px) clamp(12px, 4vw, 24px) 80px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* ── Welcome Header ── */}
        <div style={{ marginBottom: 12 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#606060",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Welcome Back
          </span>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              margin: "4px 0 0",
              lineHeight: 1.2,
            }}
          >
            Forge AI
          </h1>
          <p style={{ fontSize: 13, color: "#808080", margin: "4px 0 0" }}>
            Persistent Memory Assistant
          </p>
        </div>

        {/* ── Statistics Grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          style={{ width: "100%" }}
        >
          {/* Stat 1: Total Memories */}
          <div
            className="forge-card"
            style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#b8b8b8",
              }}
            >
              <Database size={16} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#606060", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.04em" }}>
                Stored Memories
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#ffffff", marginTop: 2 }}>
                {loading ? "..." : memories.length}
              </div>
            </div>
          </div>

          {/* Stat 2: Configured Model */}
          <div
            className="forge-card"
            style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#b8b8b8",
              }}
            >
              <Cpu size={16} />
            </div>
            <div className="overflow-hidden">
              <div style={{ fontSize: 11, color: "#606060", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.04em" }}>
                Active Model
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#ffffff",
                  marginTop: 4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {selectedModel || "Default Engine"}
              </div>
            </div>
          </div>

          {/* Stat 3: Memory Status */}
          <div
            className="forge-card"
            style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#b8b8b8",
              }}
            >
              <Activity size={16} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#606060", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.04em" }}>
                Memory Shield
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: useMemory ? "#ffffff" : "#606060", marginTop: 4 }}>
                {useMemory ? "Active" : "Paused"}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Dashboard Content Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ width: "100%" }}>
          
          {/* Left Block: Actions & Memories */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Quick Actions */}
            <div className="forge-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#b8b8b8", margin: 0, letterSpacing: "0.01em" }}>
                Quick Actions
              </h3>
              <p style={{ fontSize: 12, color: "#606060", margin: "2px 0 16px" }}>
                Jump straight into key functions.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Link href="/chat" className="block">
                  <div
                    className="flex items-center justify-between rounded-xl transition-all duration-150"
                    style={{
                      padding: "10px 14px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Plus size={14} style={{ color: "#808080" }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#ffffff" }}>Start a new chat</span>
                    </div>
                    <ArrowRight size={13} style={{ color: "#606060" }} />
                  </div>
                </Link>

                <Link href="/memory" className="block">
                  <div
                    className="flex items-center justify-between rounded-xl transition-all duration-150"
                    style={{
                      padding: "10px 14px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Brain size={14} style={{ color: "#808080" }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#ffffff" }}>Manage stored memories</span>
                    </div>
                    <ArrowRight size={13} style={{ color: "#606060" }} />
                  </div>
                </Link>

                <Link href="/settings" className="block">
                  <div
                    className="flex items-center justify-between rounded-xl transition-all duration-150"
                    style={{
                      padding: "10px 14px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Settings size={14} style={{ color: "#808080" }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#ffffff" }}>Workspace settings</span>
                    </div>
                    <ArrowRight size={13} style={{ color: "#606060" }} />
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Memories */}
            <div className="forge-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#b8b8b8", margin: 0, letterSpacing: "0.01em" }}>
                Recent Memories
              </h3>
              <p style={{ fontSize: 12, color: "#606060", margin: "2px 0 16px" }}>
                Latest items loaded into the system context.
              </p>

              {loading ? (
                <div style={{ fontSize: 13, color: "#606060" }}>Loading...</div>
              ) : recentMemories.length === 0 ? (
                <div style={{ fontSize: 13, color: "#606060", fontStyle: "italic" }}>
                  No memories stored yet. Forge learns as you talk.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {recentMemories.map((memo, idx) => {
                    const text = getMemoryText(memo);
                    const preview = text.length > 90 ? text.slice(0, 87) + "…" : text;
                    return (
                      <div
                        key={idx}
                        style={{
                          padding: "10px 12px",
                          background: "#0d0d0d",
                          border: "1px solid rgba(255,255,255,0.04)",
                          borderRadius: 8,
                        }}
                      >
                        <p style={{ fontSize: 12, color: "#b8b8b8", margin: 0, lineHeight: 1.5 }}>
                          {preview}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Right Block: Chats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Recent Chats */}
            <div className="forge-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#b8b8b8", margin: 0, letterSpacing: "0.01em" }}>
                Recent Chats
              </h3>
              <p style={{ fontSize: 12, color: "#606060", margin: "2px 0 16px" }}>
                Resume conversation threads.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {recentConversations.map((convo) => (
                  <Link key={convo.id} href="/chat" className="block">
                    <div
                      className="flex items-center gap-3 rounded-xl transition-all duration-150"
                      style={{
                        padding: "10px 14px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                      }}
                    >
                      <Clock size={13} style={{ color: "#606060", flexShrink: 0 }} />
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#ffffff",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {convo.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}