import ChatMessages from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatPage() {
  return (
    <div
      className="flex h-full flex-col"
      style={{ background: "#0a0a0a" }}
    >
      {/* Messages — fills all available space */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ChatMessages />
      </div>

      {/* Input — pinned to bottom */}
      <div
        style={{
          padding: "12px 20px 20px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          <ChatInput />
        </div>
      </div>
    </div>
  );
}