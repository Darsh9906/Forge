"use client";

type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
  isNew?: boolean;
};

function parseContent(content: string) {
  // Simple code block detection: ```lang\n...\n```
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  const parts: Array<{ type: "text" | "code"; content: string; lang?: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: "code", content: match[2]?.trim() ?? "", lang: match[1] ?? "" });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "text", content: content.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: "text" as const, content }];
}

export default function MessageBubble({
  role,
  content,
  isNew = false,
}: MessageBubbleProps) {
  const isUser = role === "user";
  const parts = parseContent(content);
  const animationClass = isNew
    ? isUser
      ? "animate-forge-slide-right"
      : "animate-forge-slide-left"
    : "";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} ${animationClass}`}
      style={{ marginBottom: 4 }}
    >
      {/* ── Assistant: avatar + text ── */}
      {!isUser && (
        <div className="flex items-start" style={{ gap: 12, maxWidth: 720 }}>
          {/* Avatar */}
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: 11,
              fontWeight: 700,
              color: "#b8b8b8",
              marginTop: 2,
            }}
          >
            F
          </div>

          {/* Message body */}
          <div className="flex flex-col" style={{ gap: 6, flex: 1 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#484848",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Forge
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {parts.map((part, i) =>
                part.type === "code" ? (
                  <div key={i} className="forge-code" style={{ position: "relative" }}>
                    {part.lang && (
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#606060",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          marginBottom: 8,
                          paddingBottom: 8,
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {part.lang}
                      </div>
                    )}
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                      <code>{part.content}</code>
                    </pre>
                  </div>
                ) : (
                  <p
                    key={i}
                    style={{
                      fontSize: 14,
                      lineHeight: 1.75,
                      color: "#d0d0d0",
                      whiteSpace: "pre-wrap",
                      margin: 0,
                    }}
                  >
                    {part.content}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── User: pill bubble ── */}
      {isUser && (
        <div
          className="flex flex-col"
          style={{ gap: 4, alignItems: "flex-end", maxWidth: 560 }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#484848",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              paddingRight: 4,
            }}
          >
            You
          </span>
          <div
            style={{
              background: "#1e1e1e",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              borderBottomRightRadius: 6,
              padding: "11px 18px",
            }}
          >
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: "#ffffff",
                whiteSpace: "pre-wrap",
                margin: 0,
              }}
            >
              {content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}