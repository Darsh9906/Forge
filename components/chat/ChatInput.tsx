"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "@/stores/chat-store";

export default function ChatInput() {
	const [text, setText] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const loading = useChatStore((state) => state.loading);
	const sendMessage = useChatStore((state) => state.sendMessage);

	useEffect(() => {
		textareaRef.current?.focus();
	}, []);

	const handleSend = async () => {
		const message = text.trim();

		if (!message || loading) {
			return;
		}

		await sendMessage({ role: "user", content: message });
		setText("");
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key !== "Enter" || event.shiftKey) {
			return;
		}

		event.preventDefault();
		void handleSend();
	};

	return (
		<div className="rounded-2xl border border-border/60 bg-background/95 p-4 shadow-sm backdrop-blur">
			<div className="flex flex-col gap-3">
				<Textarea
					ref={textareaRef}
					value={text}
					onChange={(event) => setText(event.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type a message..."
					className="min-h-24 resize-none border-border/70 bg-background text-sm leading-6 shadow-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20"
				/>
				<div className="flex items-center justify-end">
					<Button
						type="button"
						onClick={() => void handleSend()}
						disabled={loading || text.trim().length === 0}
						className="min-w-24"
					>
						{loading ? "Sending..." : "Send"}
					</Button>
				</div>
			</div>
		</div>
	);
}
