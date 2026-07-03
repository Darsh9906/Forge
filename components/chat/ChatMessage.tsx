"use client";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useChatStore } from "@/stores/chat-store";

export default function ChatMessages() {
  const { messages, loading } = useChatStore();

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          role={message.role as "user" | "assistant"}
          content={message.content}
        />
      ))}

      {loading && <TypingIndicator />}
    </div>
  );
}