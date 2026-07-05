"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";

import { searchSchema, type SearchFormValues } from "@/lib/schemas/forms";
import { useMemoryStore } from "@/stores/memory-store";

export default function MemorySearch() {
  const [searching, setSearching] = useState(false);
  const recall = useMemoryStore((state) => state.recall);
  const loading = useMemoryStore((state) => state.loading);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: SearchFormValues) => {
    if (searching) return;
    setSearching(true);
    try {
      await recall(data.query.trim());
      toast.success("Search complete", {
        description: "Memories matching your query are shown below.",
      });
    } catch {
      toast.error("Search failed", {
        description: "Unable to search memories right now. Please try again.",
      });
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="forge-card" style={{ padding: "20px" }}>
      <div style={{ marginBottom: 14 }}>
        <h3
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#b8b8b8",
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          Search memories
        </h3>
        <p style={{ fontSize: 12, color: "#606060", margin: "2px 0 0" }}>
          Find previous notes and recalled context.
        </p>
      </div>

      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        style={{ display: "flex", gap: 8 }}
      >
        {/* Search input */}
        <div
          className="forge-input-focus flex items-center flex-1"
          style={{
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#0e0e0e",
            padding: "0 14px",
            gap: 10,
          }}
        >
          <Search
            size={14}
            style={{ color: "#484848", flexShrink: 0 }}
          />
          <input
            {...register("query")}
            type="text"
            placeholder="Search memories…"
            disabled={loading || searching}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 13,
              color: "#ffffff",
              padding: "10px 0",
              fontFamily: "inherit",
            }}
            className="placeholder:text-[#404040] disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || loading || searching}
          className="forge-btn-lift flex items-center justify-center"
          style={{
            height: 42,
            paddingLeft: 16,
            paddingRight: 16,
            borderRadius: 12,
            background: isValid && !loading && !searching ? "#ffffff" : "#1a1a1a",
            color: isValid && !loading && !searching ? "#0a0a0a" : "#484848",
            border: "none",
            cursor: isValid && !loading && !searching ? "pointer" : "not-allowed",
            fontSize: 13,
            fontWeight: 500,
            gap: 6,
            whiteSpace: "nowrap",
            transition: "background 0.15s ease, color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease",
          }}
        >
          {searching ? (
            <div
              style={{
                width: 14,
                height: 14,
                border: "2px solid rgba(0,0,0,0.2)",
                borderTopColor: "#0a0a0a",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }}
            />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {errors.query && (
        <p style={{ fontSize: 11, color: "#e05252", marginTop: 6 }}>
          {errors.query.message}
        </p>
      )}
    </div>
  );
}
