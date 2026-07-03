"use client";

import MemoryCard from "@/components/memory/MemoryCard";
import { Separator } from "@/components/ui/separator";
import { useMemoryStore } from "@/stores/memory-store";

export default function MemoryList() {
	const memories = useMemoryStore((state) => state.memories);

	if (memories.length === 0) {
		return (
			<div className="rounded-2xl border border-dashed border-border/70 bg-card px-4 py-10 text-center text-sm text-muted-foreground sm:px-6">
				No memories found.
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{memories.map((memory, index) => (
				<div key={index} className="space-y-4">
					<MemoryCard memory={memory} />
					{index < memories.length - 1 ? <Separator /> : null}
				</div>
			))}
		</div>
	);
}
