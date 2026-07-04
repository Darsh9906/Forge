import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessage";

export default function ChatPage() {
  return (
    <main className="mx-auto flex h-[calc(100vh-96px)] w-full max-w-5xl flex-col px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/95 shadow-sm backdrop-blur">
        <div className="border-b border-border/60 px-4 py-4 sm:px-6">
          <ChatHeader />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <ChatMessages />
        </div>

        <div className="shrink-0 border-t border-border/60 p-4 sm:p-6">
          <ChatInput />
        </div>
      </div>
    </main>
  );
}