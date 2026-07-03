import { recall, remember } from "@/services/memory/memory-service";
import type { MemoryServiceResponse } from "@/types/memory";

import {
	createServerError,
	createServerSuccess,
	type ServerResult,
} from "./models";

export async function rememberMemory(
	text: string,
): Promise<ServerResult<MemoryServiceResponse>> {
	try {
		const data = await remember(text);
		return createServerSuccess(data);
	} catch (error) {
		return createServerError(
			error,
			"MEMORY_REMEMBER_UNAVAILABLE",
			"Unable to save memory.",
		);
	}
}

export async function recallMemory(
	query: string,
): Promise<ServerResult<MemoryServiceResponse>> {
	try {
		const data = await recall(query);
		return createServerSuccess(data);
	} catch (error) {
		return createServerError(
			error,
			"MEMORY_RECALL_UNAVAILABLE",
			"Unable to recall memory.",
		);
	}
}
