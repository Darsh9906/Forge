"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUp, Brain } from "lucide-react";
import { toast } from "sonner";

import { chatSchema, type ChatFormValues } from "@/lib/schemas/forms";
import { useChatStore } from "@/stores/chat-store";
import { useSettingsStore } from "@/stores/settings-store";

const MAX_TEXTAREA_HEIGHT = 220;

export default function ChatInput() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const loading = useChatStore((state) => state.loading);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const selectedModel = useSettingsStore((state) => state.selectedModel);
  const temperature = useSettingsStore((state) => state.temperature);
  const useMemory = useSettingsStore((state) => state.useMemory);
  const setUseMemory = useSettingsStore((state) => state.setUseMemory);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: "" },
    mode: "onChange",
  });

  const messageValue = watch("message");

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const syncHeight = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  };

  const onSubmit = async (data: ChatFormValues) => {
    if (loading) return;
    try {
      await sendMessage(
        { role: "user", content: data.message },
        {
          model: selectedModel || undefined,
          temperature,
          use_memory: useMemory,
        }
      );
      reset();
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.focus();
      }
    } catch {
      toast.error("Failed to send message", {
        description: "Please check your connection and try again.",
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    void handleSubmit(onSubmit)();
  };

  const { ref: registerRef, onChange: registerOnChange, ...restField } = register("message");

  const canSend = isValid && !loading && (messageValue?.trim().length ?? 0) > 0;

  return (
    <div
      className="forge-glass forge-input-focus"
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: "rgba(18, 18, 18, 0.85)",
      }}
    >
      {/* Textarea */}
      <div style={{ padding: "14px 16px 4px" }}>
        <textarea
          {...restField}
          ref={(el) => {
            registerRef(el);
            textareaRef.current = el;
          }}
          onChange={(e) => {
            void registerOnChange(e);
            syncHeight(e.currentTarget);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Message Forge…"
          disabled={loading}
          rows={1}
          aria-label="Chat message input"
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            fontSize: 14,
            lineHeight: 1.6,
            color: "#ffffff",
            minHeight: 24,
            maxHeight: MAX_TEXTAREA_HEIGHT,
            overflowY: "auto",
            fontFamily: "inherit",
          }}
          className="placeholder:text-[#484848] disabled:opacity-50"
        />
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "4px 12px 12px" }}
      >
        {/* Left: Memory toggle */}
        <button
          type="button"
          onClick={() => setUseMemory(!useMemory)}
          aria-label={useMemory ? "Disable memory" : "Enable memory"}
          className="flex items-center gap-1.5 rounded-lg transition-all duration-150"
          style={{
            padding: "5px 10px",
            fontSize: 12,
            fontWeight: 500,
            color: useMemory ? "#ffffff" : "#606060",
            background: useMemory
              ? "rgba(255,255,255,0.1)"
              : "transparent",
            border: `1px solid ${useMemory ? "rgba(255,255,255,0.12)" : "transparent"}`,
            cursor: "pointer",
            letterSpacing: "0.01em",
          }}
        >
          <Brain size={13} strokeWidth={useMemory ? 2.2 : 1.8} />
          <span>Memory {useMemory ? "on" : "off"}</span>
        </button>

        {/* Right: hint + send */}
        <div className="flex items-center" style={{ gap: 8 }}>
          <span
            style={{ fontSize: 11, color: "#404040" }}
            className="hidden sm:block"
          >
            ⏎ send · ⇧⏎ newline
          </span>

          {/* Send button */}
          <button
            type="button"
            onClick={() => void handleSubmit(onSubmit)()}
            disabled={!canSend}
            aria-label="Send message"
            className="forge-btn-lift flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: canSend ? "#ffffff" : "#1e1e1e",
              border: "none",
              cursor: canSend ? "pointer" : "not-allowed",
              color: canSend ? "#0a0a0a" : "#404040",
              transition:
                "background 0.15s ease, color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {loading ? (
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
              <ArrowUp size={14} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {errors.message && (
        <div style={{ padding: "0 16px 8px" }}>
          <p style={{ fontSize: 11, color: "#e05252" }}>{errors.message.message}</p>
        </div>
      )}
    </div>
  );
}