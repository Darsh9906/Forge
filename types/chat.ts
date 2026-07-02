export interface ChatMessage {
	role: string;
	content: string;
}

export interface SendMessageRequest {
	messages: ChatMessage[];
	model?: string;
	temperature?: number;
	use_memory?: boolean;
}

export interface ChatCompletionChoice {
	message?: ChatMessage;
	delta?: Partial<ChatMessage>;
	[key: string]: unknown;
}

export interface SendMessageResponse {
	content?: string;
	message?: ChatMessage;
	choices?: ChatCompletionChoice[];
	[key: string]: unknown;
}