export default function TypingIndicator() {
  return (
    <div className="flex items-start animate-forge-slide-left" style={{ gap: 12 }}>
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

      {/* Dots container */}
      <div className="flex flex-col" style={{ gap: 6 }}>
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
        <div
          className="flex items-center"
          style={{
            gap: 5,
            padding: "12px 16px",
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16,
            borderBottomLeftRadius: 6,
            display: "inline-flex",
          }}
        >
          <div className="forge-dot" />
          <div className="forge-dot" />
          <div className="forge-dot" />
          <span className="sr-only">Forge is thinking</span>
        </div>
      </div>
    </div>
  );
}