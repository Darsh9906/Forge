"use client";

import { Trash2, Clock } from "lucide-react";
import type { MemoryRecord } from "@/types/memory";

type MemoryCardProps = {
  memory: MemoryRecord;
  onDelete?: () => void;
};

const memoryTextKeys = ["text", "content", "memory", "message", "note", "body"];
const timestampKeys = ["createdAt", "updatedAt", "timestamp", "date", "created_at"];

function getMemoryText(memory: MemoryRecord): string {
  for (const key of memoryTextKeys) {
    const value = memory[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }
  return JSON.stringify(memory, null, 2);
}

function getTimestamp(memory: MemoryRecord): string | null {
  for (const key of timestampKeys) {
    const value = memory[key];
    if (typeof value === "string" || typeof value === "number") {
      const date = new Date(value);
      if (!Number.isNaN(date.getTime())) {
        // Relative time
        const diff = Date.now() - date.getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return "just now";
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      }
      return String(value);
    }
  }
  return null;
}

function getTitle(memory: MemoryRecord): string {
  const titleKeys = ["title", "name", "subject", "label"];
  for (const key of titleKeys) {
    const value = memory[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }
  return "Memory";
}

export default function MemoryCard({ memory, onDelete }: MemoryCardProps) {
  const text = getMemoryText(memory);
  const timestamp = getTimestamp(memory);
  const title = getTitle(memory);
  const preview = text.length > 180 ? text.slice(0, 177) + "…" : text;

  return (
    <div
      className="forge-card animate-forge-scale-in group"
      style={{ padding: "18px 20px", position: "relative" }}
    >
      {/* Header row */}
      <div
        className="flex items-start justify-between"
        style={{ marginBottom: 10, gap: 12 }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#b8b8b8",
            letterSpacing: "0.01em",
          }}
        >
          {title}
        </span>

        {/* Delete button — appears on hover */}
        <button
          onClick={onDelete}
          disabled={!onDelete}
          aria-label="Delete memory"
          className="opacity-0 group-hover:opacity-100"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 26,
            height: 26,
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent",
            color: "#606060",
            cursor: onDelete ? "pointer" : "not-allowed",
            flexShrink: 0,
            transition: "opacity 0.15s ease, background 0.15s ease, color 0.15s ease",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(224,82,82,0.12)";
            (e.currentTarget as HTMLButtonElement).style.color = "#e05252";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(224,82,82,0.2)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#606060";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(255,255,255,0.08)";
          }}
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* Memory text */}
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.75,
          color: "#808080",
          whiteSpace: "pre-wrap",
          margin: 0,
        }}
      >
        {preview}
      </p>

      {/* Timestamp */}
      {timestamp && (
        <div
          className="flex items-center"
          style={{ gap: 4, marginTop: 12 }}
        >
          <Clock size={11} style={{ color: "#484848" }} />
          <span style={{ fontSize: 11, color: "#484848" }}>{timestamp}</span>
        </div>
      )}
    </div>
  );
}
