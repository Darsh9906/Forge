import { create } from "zustand";

import { sendMessage as sendChatMessage } from "@/services/chat/chat-service";
import type {
	ChatMessage,
	SendMessageRequest,
	SendMessageResponse,
} from "@/types/chat";

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

	if (typeof response.message?.content === "string") {
		return { role: "assistant", content: response.message.content };
	}

	const firstChoice = response.choices?.[0];
	const choiceContent = firstChoice?.message?.content ?? firstChoice?.delta?.content;

	if (typeof choiceContent === "string" && choiceContent.length > 0) {
		return { role: "assistant", content: choiceContent };
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

			const response = await sendChatMessage(request);
			const assistantMessage = getAssistantMessage(response);

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