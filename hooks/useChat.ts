"use client";

import { useChatStore } from "@/stores/chat-store";

export function useChat() {
  const messages = useChatStore((state) => state.messages);
  const loading = useChatStore((state) => state.loading);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const clearChat = useChatStore((state) => state.clearChat);

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
  };
}