import { api } from "@/lib/api";
import type {
	MemoryRecord,
	RecallRequest,
	RememberRequest,
} from "@/types/memory";

export async function remember(text: string): Promise<MemoryRecord> {
	const payload: RememberRequest = { text };
	const response = await api.post<MemoryRecord>("/memory/remember", payload);
	return response.data;
}

export async function recall(query: string): Promise<MemoryRecord> {
	const payload: RecallRequest = { query };
	const response = await api.post<MemoryRecord>("/memory/recall", payload);
	return response.data;
}