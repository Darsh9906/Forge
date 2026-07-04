"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSchema, type ChatFormValues } from "@/lib/schemas/forms";
import { useChatStore } from "@/stores/chat-store";
import { useSettingsStore } from "@/stores/settings-store";

const MAX_TEXTAREA_HEIGHT = 200;

export default function ChatInput() {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const loading = useChatStore((state) => state.loading);
	const sendMessage = useChatStore((state) => state.sendMessage);
	const selectedModel = useSettingsStore((state) => state.selectedModel);
	const temperature = useSettingsStore((state) => state.temperature);
	const useMemory = useSettingsStore((state) => state.useMemory);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<ChatFormValues>({
		resolver: zodResolver(chatSchema),
		defaultValues: { message: "" },
		mode: "onChange",
	});

	useEffect(() => {
		textareaRef.current?.focus();
	}, []);

	// Grow textarea with content, cap at MAX_TEXTAREA_HEIGHT then scroll
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
				},
			);
			reset();
			// Collapse the textarea back to its initial height after reset
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

	return (
		<form
			className="flex flex-col gap-3"
			onSubmit={(e) => void handleSubmit(onSubmit)(e)}
		>
			<div className="flex flex-col gap-1">
				<Textarea
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
					placeholder="Type a message..."
					disabled={loading}
					className="min-h-[90px] max-h-[200px] resize-none overflow-y-auto border-border/70 bg-background text-sm leading-6 shadow-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-70"
				/>
				{errors.message && (
					<p className="text-xs text-destructive">{errors.message.message}</p>
				)}
			</div>
			<div className="flex items-center justify-end">
				<Button
					type="submit"
					disabled={loading || !isValid}
					className="min-w-24 rounded-xl"
				>
					{loading ? (
						<>
							<Loader2 className="size-4 animate-spin" />
							Sending...
						</>
					) : (
						"Send"
					)}
				</Button>
			</div>
		</form>
	);
}