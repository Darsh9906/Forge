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
        className={`flex flex-col items-center justify-center text-center px-4 animate-forge-fade-in ${className ?? ""}`}
        style={{ padding: "48px 16px" }}
      >
        <p className="text-sm sm:text-base font-medium text-foreground m-0">
          {title}
        </p>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-md leading-relaxed m-0">
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
      className="flex h-full flex-col items-center justify-center animate-forge-fade-in px-4"
      style={{ padding: "40px 16px", gap: "5dvh" }} // Use dynamic viewport gap for scaling
    >
      {/* Logo glyph with halo */}
      <div className="flex flex-col items-center gap-4 sm:gap-6">
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
            className="w-12 h-12 sm:w-14 sm:h-14"
            style={{
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
        <div className="flex flex-col items-center gap-2 text-center px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white m-0">
            Forge AI
          </h1>
          <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#606060] uppercase m-0">
            Persistent Memory Assistant
          </p>
          <p className="text-sm sm:text-base text-[#808080] mt-3 sm:mt-4 max-w-sm sm:max-w-md leading-relaxed m-0">
            What would you like me to remember today?
          </p>
        </div>
      </div>

      {/* Example prompts */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg px-2">
        {EXAMPLE_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handlePrompt(prompt)}
            className="forge-btn-lift text-xs sm:text-sm"
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              color: "#808080",
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
      <p className="text-[10px] sm:text-xs text-[#383838] tracking-wider m-0">
        Press ⏎ to send · ⇧⏎ for newline
      </p>
    </div>
  );
}