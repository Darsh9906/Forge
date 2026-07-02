import { create } from "zustand";

import { remember as rememberMemory, recall as recallMemory } from "@/services/memory-service";
import type {
	MemoryApiResponse,
	MemoryRecord,
	MemoryServiceResponse,
} from "@/types/memory";

type MemoryStore = {
	memories: MemoryRecord[];
	loading: boolean;
	remember: (text: string) => Promise<void>;
	recall: (query: string) => Promise<void>;
	clearMemories: () => void;
};

const isMemoryRecord = (value: unknown): value is MemoryRecord =>
	typeof value === "object" && value !== null;

const normalizeMemories = (response: MemoryServiceResponse): MemoryRecord[] => {
	if (Array.isArray(response)) {
		return response.filter(isMemoryRecord);
	}

	if (!isMemoryRecord(response)) {
		return [];
	}

	const typedResponse = response as MemoryApiResponse;

	if (Array.isArray(typedResponse.memories)) {
		return typedResponse.memories.filter(isMemoryRecord);
	}

	if (Array.isArray(typedResponse.data)) {
		return typedResponse.data.filter(isMemoryRecord);
	}

	if (Array.isArray(typedResponse.result)) {
		return typedResponse.result.filter(isMemoryRecord);
	}

	if (isMemoryRecord(typedResponse.memory)) {
		return [typedResponse.memory];
	}

	if (isMemoryRecord(typedResponse.data)) {
		return [typedResponse.data];
	}

	if (isMemoryRecord(typedResponse.result)) {
		return [typedResponse.result];
	}

	return [typedResponse];
};

export const useMemoryStore = create<MemoryStore>((set) => ({
	memories: [],
	loading: false,
	remember: async (text) => {
		set({ loading: true });

		try {
			const response = await rememberMemory(text);
			const nextMemories = normalizeMemories(response);

			if (nextMemories.length > 0) {
				set((state) => ({ memories: [...state.memories, ...nextMemories] }));
			}
		} finally {
			set({ loading: false });
		}
	},
	recall: async (query) => {
		set({ loading: true });

		try {
			const response = await recallMemory(query);
			const nextMemories = normalizeMemories(response);

			set({ memories: nextMemories });
		} finally {
			set({ loading: false });
		}
	},
	clearMemories: () => set({ memories: [], loading: false }),
}));