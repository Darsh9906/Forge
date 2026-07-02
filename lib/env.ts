import { z } from "zod";

const envSchema = z.object({
	NEXT_PUBLIC_API_URL: z.string().min(1, "NEXT_PUBLIC_API_URL is required"),
});

const parsedEnv = envSchema.safeParse({
	NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!parsedEnv.success) {
	throw new Error(
		parsedEnv.error.issues[0]?.message ?? "Invalid environment variables",
	);
}

export const env = parsedEnv.data;