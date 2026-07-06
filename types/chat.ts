// ---------------------------------------------------------------------------
// Chat — matches FastAPI  POST /chat  (python/app.py)
// ---------------------------------------------------------------------------

/** A single turn in the conversation (role + text). */
export interface ChatMessage {
	role: string;
	content: string;
}

/**
 * What the browser sends to the Next.js route handler  POST /api/chat.
 *
 * The route handler extracts only the latest user message and forwards it
 * to FastAPI as  { message: string }.  The extra fields below are consumed
 * at the Next.js layer and never reach FastAPI.
 */
export interface ChatRouteRequest {
	messages: ChatMessage[];
	model?: string;       // Next.js layer only — FastAPI ignores
	temperature?: number; // Next.js layer only — FastAPI ignores
	use_memory?: boolean; // Next.js layer only — FastAPI ignores
}

/**
 * What sendChat() forwards to FastAPI  POST /chat.
 * Matches  ChatRequest  Pydantic model in python/app.py.
 */
export interface FastApiChatRequest {
	message: string;
}

/**
 * What FastAPI returns from  POST /chat.
 * Matches  ChatResponse  Pydantic model in python/app.py.
 */
export interface FastApiChatResponse {
	response: string;
}

/**
 * What the Next.js route handler returns to the browser.
 * sendChat() maps FastAPI's  `response`  field onto  `content`
 * so the store can read result.data.content directly.
 */
export interface ChatResponse {
	content: string;
}

// ---------------------------------------------------------------------------
// Keep SendMessageRequest / SendMessageResponse as aliases so existing
// component and store imports do not need to change.
// ---------------------------------------------------------------------------
export type SendMessageRequest = ChatRouteRequest;
export type SendMessageResponse = ChatResponse;