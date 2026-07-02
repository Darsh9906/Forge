import { api } from "@/lib/api";
import type {
	MemoryServiceResponse,
	RecallRequest,
	RememberRequest,
} from "@/types/memory";

export async function remember(text: string): Promise<MemoryServiceResponse> {
	const payload: RememberRequest = { text };
	const response = await api.post<MemoryServiceResponse>("/memory/remember", payload);
	return response.data;
}

export async function recall(query: string): Promise<MemoryServiceResponse> {
	const payload: RecallRequest = { query };
	const response = await api.post<MemoryServiceResponse>("/memory/recall", payload);
	return response.data;
}