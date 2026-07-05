"use client";

import MemoryCard from "@/components/memory/MemoryCard";
import { useMemoryStore } from "@/stores/memory-store";
import { Brain } from "lucide-react";

export default function MemoryList() {
  const memories = useMemoryStore((state) => state.memories);

  if (memories.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center animate-forge-fade-in"
        style={{ padding: "48px 24px", gap: 16 }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: "#151515",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Brain size={20} style={{ color: "#484848" }} />
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#b8b8b8", margin: 0 }}>
            No memories yet
          </p>
          <p style={{ fontSize: 13, color: "#606060", margin: "4px 0 0" }}>
            Start by teaching Forge something.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {memories.map((memory, index) => (
        <MemoryCard key={index} memory={memory} />
      ))}
    </div>
  );
}
