"use client";

import MemoryCard from "@/components/memory/MemoryCard";
import EmptyState from "@/components/shared/EmptyState";
import { Separator } from "@/components/ui/separator";
import { useMemoryStore } from "@/stores/memory-store";

export default function MemoryList() {
	const memories = useMemoryStore((state) => state.memories);

	if (memories.length === 0) {
		return (
			<EmptyState title="No memories found." />
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
