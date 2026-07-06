import type {
	ChatMessage,
	ChatRouteRequest,
	FastApiChatRequest,
	FastApiChatResponse,
	SendMessageResponse,
} from "@/types/chat";

import { env } from "@/lib/env";
import {
	createServerSuccess,
	type ServerResult,
} from "./models";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extract the latest user message from the messages array.
 *
 * FastAPI /chat expects a single `message` string. We send the most recent
 * non-empty user turn so that Cognee recall is scoped to what the user just
 * asked, while the full conversation history is already captured in Cognee
 * memory via the /remember endpoint.
 */
function extractLatestUserMessage(
	request: ChatRouteRequest,
): string | null {
	const userMessages = request.messages.filter(
		(m: ChatMessage) => m.role === "user" && typeof m.content === "string" && m.content.trim() !== "",
	);
	return userMessages.at(-1)?.content ?? null;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Send a chat message through the Next.js server to FastAPI.
 *
 * Request flow:
 *   Browser → fetch("/api/chat") → app/api/chat/route.ts → sendChat() → FastAPI
 *
 * The FastAPI URL is read exclusively from env.PYTHON_API_URL (server-side,
 * never bundled into the browser).
 */
export async function sendChat(
	request: ChatRouteRequest,
): Promise<ServerResult<SendMessageResponse>> {
	// ── 1. Validate request ─────────────────────────────────────────────────
	if (!request.messages || !Array.isArray(request.messages)) {
		return {
			success: false,
			error: {
				code: "INVALID_REQUEST",
				message: "Messages list is required and must be an array.",
			},
		};
	}

	// ── 2. Extract the user's latest message ────────────────────────────────
	const latestMessage = extractLatestUserMessage(request);
	if (!latestMessage) {
		return {
			success: false,
			error: {
				code: "INVALID_REQUEST",
				message: "At least one non-empty user message is required.",
			},
		};
	}

	// ── 3. Call the FastAPI /chat endpoint ───────────────────────────────────
	const url = `${env.PYTHON_API_URL}/chat`;

	try {
		const body: FastApiChatRequest = { message: latestMessage };
		const httpResponse = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
			signal: AbortSignal.timeout(30_000),
		});

		// ── 4. Handle non-2xx HTTP errors from FastAPI ──────────────────────
		if (!httpResponse.ok) {
			// FastAPI returns { "detail": "..." } for HTTPExceptions.
			let detail = `FastAPI returned HTTP ${httpResponse.status}.`;
			try {
				const errBody = (await httpResponse.json()) as {
					detail?: string;
				};
				if (typeof errBody.detail === "string" && errBody.detail.trim()) {
					detail = errBody.detail;
				}
			} catch {
				// Body was not JSON; keep the default message.
			}

			return {
				success: false,
				error: {
					code: `HTTP_${httpResponse.status}`,
					message: detail,
				},
			};
		}

		// FastAPI /chat returns { "response": "..." }  (FastApiChatResponse)
		const data = (await httpResponse.json()) as FastApiChatResponse;

		const response: SendMessageResponse = {
			// Map FastAPI's `response` field → SendMessageResponse's `content`
			content: typeof data.response === "string" ? data.response : "",
		};

		return createServerSuccess(response);
	} catch (err: unknown) {
		// ── 6. Handle network / timeout errors ───────────────────────────────
		if (err instanceof DOMException && err.name === "TimeoutError") {
			return {
				success: false,
				error: {
					code: "TIMEOUT_ERROR",
					message: "The request to the AI backend timed out. Please try again.",
				},
			};
		}

		// fetch() throws a TypeError when the connection is refused or the
		// hostname cannot be resolved (i.e. the FastAPI server is not running).
		if (err instanceof TypeError) {
			return {
				success: false,
				error: {
					code: "BACKEND_UNAVAILABLE",
					message:
						"Could not reach the AI backend. Make sure the FastAPI server is running on " +
						env.PYTHON_API_URL,
				},
			};
		}

		const message =
			err instanceof Error
				? err.message
				: "An unexpected error occurred while contacting the AI backend.";

		return {
			success: false,
			error: {
				code: "INTERNAL_ERROR",
				message,
			},
		};
	}
}

export const sendChatCompletion = sendChat;
