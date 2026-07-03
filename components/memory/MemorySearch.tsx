"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemoryStore } from "@/stores/memory-store";

export default function MemorySearch() {
	const [query, setQuery] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [searching, setSearching] = useState(false);
	const recall = useMemoryStore((state) => state.recall);
	const loading = useMemoryStore((state) => state.loading);

	const handleSearch = async () => {
		const trimmedQuery = query.trim();

		if (!trimmedQuery || searching) {
			return;
		}

		setError(null);
		setSearching(true);

		try {
			await recall(trimmedQuery);
		} catch {
			setError("Unable to search memories right now.");
		} finally {
			setSearching(false);
		}
	};

	return (
		<section className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6">
			<div className="flex flex-col gap-4">
				<div className="space-y-1">
					<h2 className="text-lg font-semibold tracking-tight">Search memories</h2>
					<p className="text-sm text-muted-foreground">
						Find previous notes and recalled context.
					</p>
				</div>

				<form
					className="flex flex-col gap-3 sm:flex-row"
					onSubmit={(event) => {
						event.preventDefault();
						void handleSearch();
					}}
				>
					<Input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search memories..."
						className="h-11 flex-1 rounded-xl bg-background px-4 text-sm"
					/>
					<Button
						type="submit"
						disabled={loading || searching || query.trim().length === 0}
						className="h-11 rounded-xl px-5"
					>
						{searching ? "Searching..." : "Search"}
					</Button>
				</form>

				{error ? (
					<p className="text-sm text-destructive">{error}</p>
				) : null}
			</div>
		</section>
	);
}
