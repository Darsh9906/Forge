import { z } from "zod";

/**
 * Schema for the main chat message input.
 * - Trims whitespace before validating length so " " is treated as empty.
 */
export const chatSchema = z.object({
	message: z
		.string()
		.trim()
		.min(1, "Message is required")
		.max(4000, "Message must be at most 4000 characters"),
});

export type ChatFormValues = z.infer<typeof chatSchema>;

/**
 * Schema for the memory "Remember" input.
 * - Trims whitespace before validating length so " " is treated as empty.
 */
export const rememberSchema = z.object({
	text: z
		.string()
		.trim()
		.min(1, "Memory text is required")
		.max(2000, "Memory must be at most 2000 characters"),
});

export type RememberFormValues = z.infer<typeof rememberSchema>;

/**
 * Schema for the memory search query input.
 * - Trims whitespace before validating length so " " is treated as empty.
 * - Max 500 characters is a reasonable upper bound for a search query.
 */
export const searchSchema = z.object({
	query: z
		.string()
		.trim()
		.min(1, "Search query is required")
		.max(500, "Search query must be at most 500 characters"),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
