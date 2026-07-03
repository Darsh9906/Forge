import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { MemoryRecord } from "@/types/memory";

type MemoryCardProps = {
	memory: MemoryRecord;
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
				return date.toLocaleString();
			}

			return String(value);
		}
	}

	return null;
}

export default function MemoryCard({ memory }: MemoryCardProps) {
	const text = getMemoryText(memory);
	const timestamp = getTimestamp(memory);

	return (
		<Card className="rounded-2xl border-border/60 bg-card shadow-sm">
			<CardHeader className="gap-2 border-b border-border/60 pb-4">
				<CardTitle className="text-sm font-medium text-muted-foreground">Memory</CardTitle>
				{timestamp ? (
					<CardDescription className="text-xs">{timestamp}</CardDescription>
				) : null}
			</CardHeader>
			<CardContent className="pt-4">
				<p className="whitespace-pre-wrap text-sm leading-6 text-foreground">{text}</p>
			</CardContent>
			<CardFooter className="justify-end border-t border-border/60 bg-muted/30 px-4 py-3">
				<Button type="button" variant="outline" size="sm" disabled className="gap-2 rounded-xl">
					<Trash2 className="size-4" />
					Delete
				</Button>
			</CardFooter>
		</Card>
	);
}
