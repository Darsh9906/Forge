import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessage";

export default function ChatPage() {
  return (
    <div className="mx-auto flex h-[calc(100vh-120px)] max-w-4xl flex-col">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto py-6">
        <ChatMessages />
      </div>

      <ChatInput />
    </div>
  );
}