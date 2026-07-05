import type { SendMessageRequest, SendMessageResponse } from "@/types/chat";

import {
	createServerSuccess,
	type ServerResult,
} from "./models";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resolve the FastAPI backend base URL.
 *
 * Priority order:
 *   1. PYTHON_API_URL  – explicit server-side env var (never exposed to browser)
 *   2. Hard-coded fallback for local development
 *
 * Using a server-side-only variable (no NEXT_PUBLIC_ prefix) guarantees the
 * URL is never shipped in the client bundle.
 */
function getPythonApiUrl(): string {
	return (
		(process.env.PYTHON_API_URL ?? "").trim() || "http://localhost:8000"
	);
}

/**
 * Extract the latest user message from the messages array.
 *
 * The FastAPI /chat endpoint expects a single `message` string. We send the
 * most recent non-empty user turn so that Cognee recall is scoped to what
 * the user just asked, while the full conversation history is already stored
 * in Cognee memory via the /remember endpoint.
 */
function extractLatestUserMessage(
	request: SendMessageRequest,
): string | null {
	const userMessages = request.messages.filter(
		(m) => m.role === "user" && typeof m.content === "string" && m.content.trim() !== "",
	);
	return userMessages.at(-1)?.content ?? null;
}

// ---------------------------------------------------------------------------
// Main function
// ---------------------------------------------------------------------------

export async function sendChat(
	request: SendMessageRequest,
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
	const baseUrl = getPythonApiUrl();
	const url = `${baseUrl}/chat`;

	try {
		const httpResponse = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message: latestMessage }),
			// Abort the request if the FastAPI server does not respond in time.
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

		// ── 5. Parse the FastAPI success response ────────────────────────────
		// FastAPI /chat returns { "response": "..." }
		const data = (await httpResponse.json()) as { response?: string };

		const content =
			typeof data.response === "string" ? data.response : "";

		const response: SendMessageResponse = {
			// Map FastAPI's `response` field → SendMessageResponse's `content`
			// field. The store reads `response.content` first, so this is the
			// correct target property.
			content,
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
						getPythonApiUrl(),
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
