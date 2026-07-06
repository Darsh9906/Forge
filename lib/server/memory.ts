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

		// ── 4. Parse success ──────────────────────────────────────────────────
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
 * POST /recall → FastAPI
 *
 * Request flow:
 *   Browser → fetch("/api/memory/recall") → app/api/memory/recall/route.ts
 *           → recallMemory() → FastAPI POST /recall
 *
 * Calls cognee.recall(query) on the FastAPI backend and returns the matching
 * memory records.
 *
 * Error mapping
 * ~~~~~~~~~~~~~
 * • Empty query         → Returns empty list immediately (bypasses network)
 * • FastAPI 4xx/5xx     → HTTP_<status> with FastAPI's detail message
 * • Connection refused  → BACKEND_UNAVAILABLE
 * • Timeout (30 s)      → TIMEOUT_ERROR
 * • Anything else       → INTERNAL_ERROR
 */
export async function recallMemory(
	query: string,
): Promise<ServerResult<MemoryApiResponse>> {
	// ── 1. Empty query optimization ──────────────────────────────────────────
	if (!query || query.trim().length === 0) {
		return createServerSuccess<MemoryApiResponse>({
			memories: [],
		});
	}

	// ── 2. Call FastAPI /recall ───────────────────────────────────────────────
	const url = `${env.PYTHON_API_URL}/recall`;

	try {
		const httpResponse = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query: query.trim() }),
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
		// FastAPI /recall returns { "memories": [...] }
		const data = (await httpResponse.json()) as MemoryApiResponse;

		return createServerSuccess(data);
	} catch (err: unknown) {
		// ── 5. Network / timeout errors ───────────────────────────────────────
		if (err instanceof DOMException && err.name === "TimeoutError") {
			return {
				success: false,
				error: {
					code: "TIMEOUT_ERROR",
					message: "The request to the recall backend timed out.",
				},
			};
		}

		if (err instanceof TypeError) {
			return {
				success: false,
				error: {
					code: "BACKEND_UNAVAILABLE",
					message:
						"Could not reach the recall backend. Make sure the FastAPI server is running on " +
						env.PYTHON_API_URL,
				},
			};
		}

		const message =
			err instanceof Error
				? err.message
				: "An unexpected error occurred while recalling memory.";
		return {
			success: false,
			error: { code: "INTERNAL_ERROR", message },
		};
	}
}
