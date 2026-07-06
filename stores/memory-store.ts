import { create } from "zustand";

import type {
	FastApiRememberResponse,
	MemoryApiResponse,
	MemoryRecord,
	MemoryServiceResponse,
} from "@/types/memory";
import type { ServerResult } from "@/lib/server/models";

type MemoryStore = {
	memories: MemoryRecord[];
	loading: boolean;
	remember: (text: string) => Promise<void>;
	recall: (query: string) => Promise<void>;
	clearMemories: () => void;
};

const isMemoryRecord = (value: unknown): value is MemoryRecord =>
	typeof value === "object" && value !== null;

/**
 * Normalise the recall response into a flat MemoryRecord[].
 * Handles the stub (empty array) and any future real response shapes.
 */
const normalizeMemories = (response: MemoryServiceResponse): MemoryRecord[] => {
	// Array of records — most common future case
	if (Array.isArray(response)) {
		return response.filter(isMemoryRecord);
	}

	// Wrapped response  { memories: [...] }  — matches MemoryApiResponse
	if (isMemoryRecord(response)) {
		const typedResponse = response as unknown as MemoryApiResponse;
		if (Array.isArray(typedResponse.memories)) {
			return typedResponse.memories.filter(isMemoryRecord);
		}
	}

	return [];
};

export const useMemoryStore = create<MemoryStore>((set) => ({
	memories: [],
	loading: false,
	remember: async (text) => {
		set({ loading: true });

		try {
			const httpResponse = await fetch("/api/memory/remember", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: text }),
				signal: AbortSignal.timeout(30_000),
			});

			if (!httpResponse.ok) {
				throw new Error(`Request failed with status ${httpResponse.status}`);
			}

			const result = (await httpResponse.json()) as ServerResult<FastApiRememberResponse>;

			if (!result.success) {
				throw new Error(result.error.message || "Failed to save memory");
			}

			if (!result.data || !result.data.success) {
				throw new Error(result.data?.message || "Failed to save memory");
			}
		} catch (err) {
			throw err;
		} finally {
			set({ loading: false });
		}
	},
	recall: async (query) => {
		set({ loading: true });

		try {
			const httpResponse = await fetch("/api/memory/recall", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query }),
				signal: AbortSignal.timeout(30_000),
			});

			if (!httpResponse.ok) {
				throw new Error(`Request failed with status ${httpResponse.status}`);
			}

			const result = (await httpResponse.json()) as ServerResult<MemoryServiceResponse>;

			if (!result.success) {
				throw new Error(result.error.message);
			}

			const nextMemories = normalizeMemories(result.data);
			set({ memories: nextMemories });
		} catch (err) {
			throw err;
		} finally {
			set({ loading: false });
		}
	},
	clearMemories: () => set({ memories: [], loading: false }),
}));