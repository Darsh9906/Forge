"use client";

import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@/services/chat-service";
import type {
  SendMessageRequest,
  SendMessageResponse,
} from "@/types/chat";

export function useChat() {
  return useMutation<SendMessageResponse, Error, SendMessageRequest>({
    mutationFn: sendMessage,
  });
}