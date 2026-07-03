import type { MemoryServiceResponse } from "@/types/memory";

import { recall, remember } from "@/services/memory/memory-service";

export async function rememberMemory(
	text: string,
): Promise<MemoryServiceResponse> {
	return remember(text);
}

export async function recallMemory(
	query: string,
): Promise<MemoryServiceResponse> {
	return recall(query);
}
