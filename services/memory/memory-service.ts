import { api } from "@/lib/api";
import type {
	MemoryServiceResponse,
	RecallRequest,
	RememberRequest,
} from "@/types/memory";
import type { ServerResult } from "@/lib/server/models";

export async function remember(text: string): Promise<MemoryServiceResponse> {
	const payload: RememberRequest = { text };
	const response = await api.post<ServerResult<{ success: boolean; message: string }>>(
		"/memory/remember",
		payload,
	);
	const result = response.data;
	if (!result.success) {
		throw new Error(result.error.message);
	}
	return result.data;
}

export async function recall(query: string): Promise<MemoryServiceResponse> {
	const payload: RecallRequest = { query };
	const response = await api.post<ServerResult<MemoryServiceResponse>>(
		"/memory/recall",
		payload,
	);
	const result = response.data;
	if (!result.success) {
		throw new Error(result.error.message);
	}
	return result.data;
}