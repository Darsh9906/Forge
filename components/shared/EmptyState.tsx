"use client";

import { useChatStore } from "@/stores/chat-store";

const EXAMPLE_PROMPTS = [
  "What's the status of Project Atlas?",
  "Remember: I prefer dark mode on all tools",
  "What did we discuss last week?",
];

type EmptyStateProps = {
  title?: string;
  description?: string;
  className?: string;
  /** If true, show the full chat hero (default for chat page) */
  chatHero?: boolean;
};

export default function EmptyState({
  title,
  description,
  className,
  chatHero = true,
}: EmptyStateProps) {
  const sendMessage = useChatStore((state) => state.sendMessage);

  if (!chatHero) {
    // Fallback generic empty state
    return (
      <div
        className={`flex flex-col items-center justify-center text-center ${className ?? ""}`}
        style={{ padding: "48px 24px" }}
      >
        <p style={{ fontSize: 14, fontWeight: 500, color: "#b8b8b8" }}>
          {title}
        </p>
        {description && (
          <p style={{ fontSize: 13, color: "#606060", marginTop: 4 }}>
            {description}
          </p>
        )}
      </div>
    );
  }

  const handlePrompt = (prompt: string) => {
    void sendMessage({ role: "user", content: prompt }, { use_memory: true });
  };

  return (
    <div
      className="flex h-full flex-col items-center justify-center animate-forge-fade-in"
      style={{ padding: "40px 24px", gap: 32 }}
    >
      {/* Logo glyph with halo */}
      <div className="flex flex-col items-center" style={{ gap: 24 }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Outer glow ring */}
          <div
            style={{
              position: "absolute",
              width: 96,
              height: 96,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
            }}
          />
          {/* Logo mark */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background: "#ffffff",
              color: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              boxShadow: "0 0 40px rgba(255,255,255,0.08)",
              position: "relative",
            }}
          >
            F
          </div>
        </div>

        {/* Headings */}
        <div className="flex flex-col items-center" style={{ gap: 8, textAlign: "center" }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Forge AI
          </h1>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#606060",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Persistent Memory Assistant
          </p>
          <p
            style={{
              fontSize: 15,
              color: "#808080",
              marginTop: 8,
              margin: "8px 0 0",
              maxWidth: 360,
              lineHeight: 1.6,
            }}
          >
            What would you like me to remember today?
          </p>
        </div>
      </div>

      {/* Example prompts */}
      <div
        className="flex flex-wrap items-center justify-center"
        style={{ gap: 8, maxWidth: 480 }}
      >
        {EXAMPLE_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handlePrompt(prompt)}
            className="forge-btn-lift"
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              color: "#808080",
              fontSize: 13,
              fontWeight: 400,
              cursor: "pointer",
              transition: "border-color 0.15s ease, color 0.15s ease, background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseOver={(e) => {
              const btn = e.currentTarget;
              btn.style.borderColor = "rgba(255,255,255,0.16)";
              btn.style.color = "#b8b8b8";
              btn.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseOut={(e) => {
              const btn = e.currentTarget;
              btn.style.borderColor = "rgba(255,255,255,0.08)";
              btn.style.color = "#808080";
              btn.style.background = "rgba(255,255,255,0.03)";
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Subtle footer hint */}
      <p style={{ fontSize: 11, color: "#383838", letterSpacing: "0.02em" }}>
        Press ⏎ to send · ⇧⏎ for newline
      </p>
    </div>
  );
}