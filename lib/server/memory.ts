import type {
	FastApiRememberResponse,
	MemoryApiResponse,
} from "@/types/memory";

import { env } from "@/lib/env";
import {
	createServerSuccess,
	type ServerResult,
} from "./models";

// ---------------------------------------------------------------------------
// rememberMemory
// ---------------------------------------------------------------------------

/**
 * POST /remember → FastAPI
 *
 * Request flow:
 *   Browser → fetch("/api/memory/remember") → app/api/memory/remember/route.ts
 *           → rememberMemory() → FastAPI POST /remember
 *
 * The FastAPI URL is read exclusively from env.PYTHON_API_URL (server-side,
 * never bundled into the browser).
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
	message: string,
): Promise<ServerResult<FastApiRememberResponse>> {
	// ── 1. Validate ──────────────────────────────────────────────────────────
	if (!message || message.trim().length === 0) {
		return {
			success: false,
			error: {
				code: "INVALID_REQUEST",
				message: "Memory message is required and cannot be empty.",
			},
		};
	}

	// ── 2. Call FastAPI /remember ─────────────────────────────────────────────
	const url = `${env.PYTHON_API_URL}/remember`;

	try {
		const httpResponse = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message }),
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

		// FastAPI /remember returns { "success": bool, "message": str }
		const data = (await httpResponse.json()) as FastApiRememberResponse;

		return createServerSuccess(data);
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
						env.PYTHON_API_URL,
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
 * POST /recall → (stub — FastAPI has no standalone recall endpoint yet)
 *
 * Request flow intent:
 *   Browser → fetch("/api/memory/recall") → app/api/memory/recall/route.ts
 *           → recallMemory() → FastAPI POST /recall  ← NOT YET IMPLEMENTED
 *
 * Current behaviour:
 *   FastAPI's cognee.recall() is called internally inside POST /chat and
 *   injects relevant memories into the Gemini prompt automatically. There is
 *   no separate /recall endpoint exposed by the Python server.
 *
 *   This function therefore returns an empty memory list. The Memory page's
 *   search feature will show no results until a real /recall endpoint is
 *   added to FastAPI and this stub is replaced.
 *
 * TODO: Add POST /recall to python/app.py, then replace this stub with a
 *       real fetch call to `${env.PYTHON_API_URL}/recall`.
 */
export async function recallMemory(
	_query: string,
): Promise<ServerResult<MemoryApiResponse>> {
	// Stub: return empty list until FastAPI exposes a /recall endpoint.
	return createServerSuccess<MemoryApiResponse>({
		memories: [],
	});
}
