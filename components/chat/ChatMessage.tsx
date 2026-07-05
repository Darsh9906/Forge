"use client";

import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useChatStore } from "@/stores/chat-store";
import ChatEmptyState from "@/components/shared/EmptyState";

export default function ChatMessages() {
  const { messages, loading } = useChatStore();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (messages.length === 0) {
    return <ChatEmptyState title="" />;
  }

  return (
    <div
      className="h-full overflow-y-auto"
      style={{ padding: "32px 24px" }}
    >
      <div
        className="mx-auto flex flex-col"
        style={{ maxWidth: 750, gap: 28 }}
      >
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            role={message.role as "user" | "assistant"}
            content={message.content}
            isNew={index === messages.length - 1}
          />
        ))}

        {loading && <TypingIndicator />}

        <div ref={endRef} style={{ height: 1 }} />
      </div>
    </div>
  );
}