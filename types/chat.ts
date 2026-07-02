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

export interface SendMessageResponse {
	[key: string]: unknown;
}