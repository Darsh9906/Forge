/**
 * lib/env.ts — Server-side environment variable validation
 * =========================================================
 * Validated once at module-load time using Zod.
 * This file MUST only be imported from server-side code
 * (lib/server/*, app/api/*, Next.js route handlers).
 *
 * None of these variables carry the NEXT_PUBLIC_ prefix,
 * so they are NEVER bundled into the browser.
 */

import { z } from "zod";

const envSchema = z.object({
	/**
	 * Base URL of the FastAPI backend.
	 * Set in .env.local for local dev and in your deployment
	 * environment (Vercel / Railway / Render / etc.) for production.
	 *
	 * Default: http://localhost:8000  (FastAPI dev server)
	 */
	PYTHON_API_URL: z
		.string()
		.url("PYTHON_API_URL must be a valid URL (e.g. http://localhost:8000)")
		.default("http://localhost:8000"),

	/**
	 * Google Gemini API key — consumed by the Python FastAPI process.
	 * Kept here so Next.js startup can surface a clear error if it is missing
	 * rather than failing silently at runtime.
	 *
	 * Set to z.string().optional() if you do not want startup to fail when the
	 * key is absent (e.g. running in a CI environment without GPU access).
	 */
	GEMINI_API_KEY: z
		.string()
		.min(1, "GEMINI_API_KEY must not be empty"),

	/**
	 * Gemini model identifier passed to the Python backend.
	 * Default matches the Python app.py default.
	 */
	GEMINI_MODEL: z
		.string()
		.default("gemini-2.0-flash"),
});

const parsedEnv = envSchema.safeParse({
	PYTHON_API_URL: process.env.PYTHON_API_URL,
	GEMINI_API_KEY: process.env.GEMINI_API_KEY,
	GEMINI_MODEL:   process.env.GEMINI_MODEL,
});

if (!parsedEnv.success) {
	const issues = parsedEnv.error.issues
		.map((i) => `  • ${i.path.join(".")}: ${i.message}`)
		.join("\n");
	throw new Error(
		`[Forge AI] Invalid server environment variables:\n${issues}\n` +
		`Check your .env.local file.`,
	);
}

/**
 * Typed, validated server-side environment.
 * Import this instead of reading process.env directly.
 *
 * @example
 * import { env } from "@/lib/env";
 * const url = env.PYTHON_API_URL;
 */
export const env = parsedEnv.data;