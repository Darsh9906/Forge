import { create } from "zustand";

import type {
	ChatMessage,
	SendMessageRequest,
	SendMessageResponse,
} from "@/types/chat";
import type { ServerResult } from "@/lib/server/models";

type ChatStore = {
	messages: ChatMessage[];
	loading: boolean;
	currentModel: string;
	addMessage: (message: ChatMessage) => void;
	clearChat: () => void;
	sendMessage: (
		message: ChatMessage,
		options?: Omit<SendMessageRequest, "messages">,
	) => Promise<void>;
};

const getAssistantMessage = (
	response: SendMessageResponse,
): ChatMessage | null => {
	if (typeof response.content === "string" && response.content.length > 0) {
		return { role: "assistant", content: response.content };
	}
	return null;
};

export const useChatStore = create<ChatStore>((set, get) => ({
	messages: [],
	loading: false,
	currentModel: "",
	addMessage: (message) =>
		set((state) => ({
			messages: [...state.messages, message],
		})),
	clearChat: () =>
		set({
			messages: [],
			loading: false,
			currentModel: "",
		}),
	sendMessage: async (message, options) => {
		set({ loading: true });
		set((state) => ({ messages: [...state.messages, message] }));

		const requestModel = options?.model ?? get().currentModel;

		if (requestModel) {
			set({ currentModel: requestModel });
		}

		try {
			const request: SendMessageRequest = {
				messages: [...get().messages],
				model: requestModel || undefined,
				temperature: options?.temperature,
				use_memory: options?.use_memory,
			};

			const httpResponse = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(request),
				signal: AbortSignal.timeout(30_000),
			});

			if (!httpResponse.ok) {
				throw new Error(`Request failed with status ${httpResponse.status}`);
			}

			const result = (await httpResponse.json()) as ServerResult<SendMessageResponse>;

			if (!result.success) {
				throw new Error(result.error.message);
			}

			const assistantMessage = getAssistantMessage(result.data);
			if (assistantMessage) {
				set((state) => ({ messages: [...state.messages, assistantMessage] }));
			}
		} catch (err) {
			throw err;
		} finally {
			set({ loading: false });
		}
	},
}));