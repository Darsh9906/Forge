"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { toast } from "sonner";

import { rememberSchema, type RememberFormValues } from "@/lib/schemas/forms";
import { useMemoryStore } from "@/stores/memory-store";

export default function MemoryInput() {
  const [saving, setSaving] = useState(false);
  const remember = useMemoryStore((state) => state.remember);
  const loading = useMemoryStore((state) => state.loading);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<RememberFormValues>({
    resolver: zodResolver(rememberSchema),
    defaultValues: { text: "" },
    mode: "onChange",
  });

  const textValue = watch("text");
  const canSave = isValid && !saving && !loading && (textValue?.trim().length ?? 0) > 0;

  const onSubmit = async (data: RememberFormValues) => {
    if (saving) return;
    setSaving(true);
    try {
      await remember(data.text.trim());
      reset();
      toast.success("Memory saved", {
        description: "Your note has been stored for later recall.",
      });
    } catch {
      toast.error("Failed to save memory", {
        description: "Unable to remember this yet. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="forge-card"
      style={{ padding: "20px" }}
    >
      {/* Section header */}
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
          Remember something
        </h3>
        <p style={{ fontSize: 12, color: "#606060", margin: "2px 0 0" }}>
          Capture a note to store for later recall.
        </p>
      </div>

      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        {/* Textarea */}
        <div
          className="forge-input-focus"
          style={{
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#0e0e0e",
            overflow: "hidden",
          }}
        >
          <textarea
            {...register("text")}
            placeholder="Write a memory…"
            rows={5}
            disabled={saving || loading}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "vertical",
              fontSize: 13,
              lineHeight: 1.7,
              color: "#ffffff",
              padding: "12px 14px",
              fontFamily: "inherit",
              minHeight: 100,
            }}
            className="placeholder:text-[#404040] disabled:opacity-50"
          />
        </div>

        {errors.text && (
          <p style={{ fontSize: 11, color: "#e05252" }}>{errors.text.message}</p>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!canSave}
            className="forge-btn-lift flex items-center justify-center"
            style={{
              height: 34,
              paddingLeft: 16,
              paddingRight: 16,
              borderRadius: 999,
              background: canSave ? "#ffffff" : "#1a1a1a",
              color: canSave ? "#0a0a0a" : "#484848",
              border: "none",
              cursor: canSave ? "pointer" : "not-allowed",
              fontSize: 13,
              fontWeight: 500,
              gap: 6,
              transition: "background 0.15s ease, color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {saving ? (
              <>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    border: "2px solid rgba(0,0,0,0.2)",
                    borderTopColor: "#0a0a0a",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Saving…
              </>
            ) : (
              <>
                <ArrowUp size={13} strokeWidth={2.5} />
                Remember
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
