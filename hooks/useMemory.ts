"use client";

import { useMemoryStore } from "@/stores/memory-store";

export function useMemory() {
  const memories = useMemoryStore((state) => state.memories);
  const loading = useMemoryStore((state) => state.loading);
  const remember = useMemoryStore((state) => state.remember);
  const recall = useMemoryStore((state) => state.recall);
  const clearMemories = useMemoryStore((state) => state.clearMemories);

  return {
    memories,
    loading,
    remember,
    recall,
    clearMemories,
  };
}