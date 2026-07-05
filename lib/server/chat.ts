import { GoogleGenAI } from "@google/genai";

import type { SendMessageRequest, SendMessageResponse } from "@/types/chat";

import {
	createServerSuccess,
	type ServerResult,
} from "./models";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Map the frontend role names ("user" / "assistant") to the Gemini role names
 * ("user" / "model"). Any other role is treated as "user".
 */
function toGeminiRole(role: string): "user" | "model" {
	return role === "assistant" ? "model" : "user";
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

	// ── 2. Validate env ─────────────────────────────────────────────────────
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey || apiKey.trim() === "") {
		return {
			success: false,
			error: {
				code: "CONFIGURATION_ERROR",
				message:
					"Gemini API key is not configured. Set the GEMINI_API_KEY environment variable.",
			},
		};
	}

	const model =
		(process.env.GEMINI_MODEL ?? "").trim() || "gemini-2.0-flash";

	// ── 3. Build the contents array ─────────────────────────────────────────
	// Gemini requires the conversation to start with a "user" turn.
	// Filter out any leading "model" messages to satisfy that constraint.
	const contents = request.messages
		.filter((m) => typeof m.content === "string" && m.content.trim() !== "")
		.map((m) => ({
			role: toGeminiRole(m.role),
			parts: [{ text: m.content }],
		}));

	if (contents.length === 0) {
		return {
			success: false,
			error: {
				code: "INVALID_REQUEST",
				message: "At least one non-empty message is required.",
			},
		};
	}

	// ── 4. Call Gemini ───────────────────────────────────────────────────────
	try {
		const ai = new GoogleGenAI({ apiKey });

		const geminiResponse = await ai.models.generateContent({
			model,
			contents,
		});

		const text = geminiResponse.text ?? "";

		const response: SendMessageResponse = {
			content: text,
		};

		return createServerSuccess(response);
	} catch (err: unknown) {
		// Surface a clean error without exposing the API key or internal stack.
		const isApiError =
			err instanceof Error && err.constructor.name === "ApiError";

		if (isApiError) {
			// Try to extract a human-readable message from the JSON payload
			// that @google/genai surfaces as err.message.
			let userMessage = "Gemini API request failed.";
			try {
				const parsed = JSON.parse((err as Error).message) as {
					error?: { message?: string };
				};
				if (typeof parsed?.error?.message === "string") {
					userMessage = parsed.error.message;
				}
			} catch {
				// err.message wasn't JSON – use it directly.
				userMessage = (err as Error).message;
			}

			return {
				success: false,
				error: {
					code: "GEMINI_API_ERROR",
					message: userMessage,
				},
			};
		}

		// Generic / unexpected error
		const message =
			err instanceof Error
				? err.message
				: "An unexpected error occurred while contacting Gemini.";

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


