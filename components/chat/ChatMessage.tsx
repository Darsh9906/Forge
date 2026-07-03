"use client";

import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useChatStore } from "@/stores/chat-store";

export default function ChatMessages() {
  const { messages, loading } = useChatStore();
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col gap-4 pb-4">
      {messages.length === 0 ? (
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border/70 bg-background/60 px-4 py-8 text-center text-sm text-muted-foreground shadow-sm backdrop-blur">
          Start a conversation to see messages here.
        </div>
      ) : (
        messages.map((message, index) => (
          <MessageBubble
            key={index}
            role={message.role as "user" | "assistant"}
            content={message.content}
          />
        ))
      )}

      {loading && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  );
}