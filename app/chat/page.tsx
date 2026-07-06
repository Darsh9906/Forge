import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatPage() {
  return (
    <div
      className="flex h-full flex-col w-full overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Header — message count + clear */}
      <ChatHeader />

      {/* Messages — fills all available space */}
      <div className="flex-1 min-h-0 overflow-hidden w-full">
        <ChatMessages />
      </div>

      {/* Input — pinned to bottom */}
      <div
        className="w-full shrink-0"
        style={{
          padding: "clamp(12px, 2vw, 16px) clamp(12px, 3vw, 24px) clamp(16px, 3vw, 24px)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="w-full" style={{ maxWidth: 900, margin: "0 auto" }}>
          <ChatInput />
        </div>
      </div>
    </div>
  );
}