"use client";

import { Trash2 } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";

export default function ChatHeader() {
  const clearChat = useChatStore((state) => state.clearChat);
  const messages = useChatStore((state) => state.messages);

  if (messages.length === 0) return null;

  return (
    <div
      className="flex items-center justify-between shrink-0"
      style={{
        padding: "10px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "#606060",
          letterSpacing: "0.01em",
        }}
      >
        {messages.length} message{messages.length !== 1 ? "s" : ""}
      </span>

      <button
        onClick={clearChat}
        aria-label="Clear conversation"
        className="forge-btn-lift flex items-center gap-1.5"
        style={{
          padding: "5px 10px",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.06)",
          background: "transparent",
          color: "#606060",
          fontSize: 12,
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.15s ease, color 0.15s ease, border-color 0.15s ease",
        }}
        onMouseOver={(e) => {
          const btn = e.currentTarget;
          btn.style.background = "rgba(224,82,82,0.1)";
          btn.style.color = "#e05252";
          btn.style.borderColor = "rgba(224,82,82,0.2)";
        }}
        onMouseOut={(e) => {
          const btn = e.currentTarget;
          btn.style.background = "transparent";
          btn.style.color = "#606060";
          btn.style.borderColor = "rgba(255,255,255,0.06)";
        }}
      >
        <Trash2 size={12} />
        <span>Clear</span>
      </button>
    </div>
  );
}