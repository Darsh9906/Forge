"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMemoryStore } from "@/stores/memory-store";

export default function MemoryInput() {
	const [text, setText] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);
	const remember = useMemoryStore((state) => state.remember);
	const loading = useMemoryStore((state) => state.loading);

	const handleRemember = async () => {
		const trimmedText = text.trim();

		if (!trimmedText || saving) {
			return;
		}

		setError(null);
		setSaving(true);

		try {
			await remember(trimmedText);
			setText("");
		} catch {
			setError("Unable to remember this yet.");
		} finally {
			setSaving(false);
		}
	};

	return (
		<section className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6">
			<div className="flex flex-col gap-4">
				<div className="space-y-1">
					<h2 className="text-lg font-semibold tracking-tight">Remember something</h2>
					<p className="text-sm text-muted-foreground">
						Capture a note to store for later recall.
					</p>
				</div>

				<form
					className="flex flex-col gap-3"
					onSubmit={(event) => {
						event.preventDefault();
						void handleRemember();
					}}
				>
					<Textarea
						value={text}
						onChange={(event) => setText(event.target.value)}
						placeholder="Write a memory..."
						rows={7}
						className="min-h-40 rounded-xl bg-background px-4 py-3 text-sm leading-6"
					/>
					<div className="flex items-center justify-end gap-3">
						<Button
							type="submit"
							disabled={loading || saving || text.trim().length === 0}
							className="h-11 rounded-xl px-5"
						>
							{saving ? "Saving..." : "Remember"}
						</Button>
					</div>
				</form>

				{error ? (
					<p className="text-sm text-destructive">{error}</p>
				) : null}
			</div>
		</section>
	);
}
