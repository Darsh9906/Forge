"use client";

import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import EmptyState from "@/components/shared/EmptyState";
import { useChatStore } from "@/stores/chat-store";

export default function ChatMessages() {
  const { messages, loading } = useChatStore();

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="h-full overflow-y-auto p-6">
      {messages.length === 0 ? (
        <EmptyState title="Start a conversation to see messages here." />
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              role={message.role as "user" | "assistant"}
              content={message.content}
            />
          ))}

          {loading && <TypingIndicator />}

          <div ref={endRef} />
        </div>
      )}
    </div>
  );
}