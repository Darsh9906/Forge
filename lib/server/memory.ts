import type { MemoryApiResponse } from "@/types/memory";

import {
	createServerSuccess,
	type ServerResult,
} from "./models";

export async function rememberMemory(
	text: string,
): Promise<ServerResult<{ success: boolean; message: string }>> {
	if (!text || text.trim().length === 0) {
		return {
			success: false,
			error: {
				code: "INVALID_REQUEST",
				message: "Memory text is required and cannot be empty.",
			},
		};
	}

	return createServerSuccess({
		success: true,
		message: "Memory saved successfully",
	});
}

export async function recallMemory(
	query: string,
): Promise<ServerResult<MemoryApiResponse>> {
	if (!query || query.trim().length === 0) {
		return {
			success: false,
			error: {
				code: "INVALID_REQUEST",
				message: "Search query is required and cannot be empty.",
			},
		};
	}

	const response: MemoryApiResponse = {
		memories: [
			{ id: "1", text: "Example Memory 1" },
			{ id: "2", text: "Example Memory 2" },
		],
	};

	return createServerSuccess(response);
}

