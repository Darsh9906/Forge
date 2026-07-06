import type { MemoryApiResponse } from "@/types/memory";

import {
	createServerSuccess,
	type ServerResult,
} from "./models";

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

/**
 * Resolve the FastAPI backend base URL.
 *
 * Reads PYTHON_API_URL (server-only, never sent to the browser) and falls
 * back to localhost:8000 for local development.
 * Mirrors the same helper used in lib/server/chat.ts so the two modules
 * always point to the same backend without duplicating the value.
 */
function getPythonApiUrl(): string {
	return (
		(process.env.PYTHON_API_URL ?? "").trim() || "http://localhost:8000"
	);
}

// ---------------------------------------------------------------------------
// rememberMemory
// ---------------------------------------------------------------------------

/**
 * POST /remember → FastAPI
 *
 * Sends the text to Cognee via the FastAPI /remember endpoint and returns the
 * existing ServerResult<{ success: boolean; message: string }> shape so the
 * route handler and the Zustand store require zero changes.
 *
 * Error mapping
 * ~~~~~~~~~~~~~
 * • Empty text          → INVALID_REQUEST (validated before the network call)
 * • FastAPI 4xx/5xx     → HTTP_<status> with FastAPI's detail message
 * • Connection refused  → BACKEND_UNAVAILABLE
 * • Timeout (30 s)      → TIMEOUT_ERROR
 * • Anything else       → INTERNAL_ERROR
 */
export async function rememberMemory(
	text: string,
): Promise<ServerResult<{ success: boolean; message: string }>> {
	// ── 1. Validate ──────────────────────────────────────────────────────────
	if (!text || text.trim().length === 0) {
		return {
			success: false,
			error: {
				code: "INVALID_REQUEST",
				message: "Memory text is required and cannot be empty.",
			},
		};
	}

	// ── 2. Call FastAPI /remember ─────────────────────────────────────────────
	const url = `${getPythonApiUrl()}/remember`;

	try {
		const httpResponse = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text }),
			signal: AbortSignal.timeout(30_000),
		});

		// ── 3. Handle non-2xx responses ───────────────────────────────────────
		if (!httpResponse.ok) {
			let detail = `FastAPI returned HTTP ${httpResponse.status}.`;
			try {
				const errBody = (await httpResponse.json()) as { detail?: string };
				if (typeof errBody.detail === "string" && errBody.detail.trim()) {
					detail = errBody.detail;
				}
			} catch {
				// Body was not JSON; keep default message.
			}
			return {
				success: false,
				error: { code: `HTTP_${httpResponse.status}`, message: detail },
			};
		}

		// ── 4. Parse success ──────────────────────────────────────────────────
		// FastAPI /remember returns { "success": true }
		const data = (await httpResponse.json()) as { success?: boolean };

		return createServerSuccess({
			success: data.success === true,
			message: "Memory saved successfully",
		});
	} catch (err: unknown) {
		// ── 5. Network / timeout errors ───────────────────────────────────────
		if (err instanceof DOMException && err.name === "TimeoutError") {
			return {
				success: false,
				error: {
					code: "TIMEOUT_ERROR",
					message: "The request to the memory backend timed out.",
				},
			};
		}

		if (err instanceof TypeError) {
			return {
				success: false,
				error: {
					code: "BACKEND_UNAVAILABLE",
					message:
						"Could not reach the memory backend. Make sure the FastAPI server is running on " +
						getPythonApiUrl(),
				},
			};
		}

		const message =
			err instanceof Error
				? err.message
				: "An unexpected error occurred while saving memory.";
		return {
			success: false,
			error: { code: "INTERNAL_ERROR", message },
		};
	}
}

// ---------------------------------------------------------------------------
// recallMemory
// ---------------------------------------------------------------------------

/**
 * Recall is handled implicitly by the FastAPI /chat endpoint.
 *
 * When the user sends a message, the FastAPI backend calls cognee.recall()
 * internally and injects the results into the Gemini prompt. There is no
 * standalone /recall endpoint to call from the Next.js layer.
 *
 * This function therefore returns an empty MemoryApiResponse. The Zustand
 * store's normalizeMemories() already handles this gracefully (produces []),
 * so the UI sees an empty memory list without error — which is the correct
 * UX when recall is managed server-side by the Python process.
 *
 * The function signature and return type are unchanged so the route handler
 * (app/api/memory/recall/route.ts) and the store require zero modification.
 */
export async function recallMemory(
	query: string,
): Promise<ServerResult<MemoryApiResponse>> {
	if (!query || query.trim().length === 0) {
		return createServerSuccess<MemoryApiResponse>({
			memories: [],
		});
	}

	// Return an empty response — recall is handled inside the FastAPI /chat
	// endpoint via cognee.recall() and does not need a separate round-trip
	// from the Next.js server layer.
	return createServerSuccess<MemoryApiResponse>({
		memories: [],
	});
}


