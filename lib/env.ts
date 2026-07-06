import { z } from "zod";

const envSchema = z.object({
  PYTHON_API_URL: z
    .string()
    .url("PYTHON_API_URL must be a valid URL"),
});

const parsedEnv = envSchema.safeParse({
  PYTHON_API_URL: process.env.PYTHON_API_URL,
});

if (!parsedEnv.success) {
  throw new Error(parsedEnv.error.message);
}

export const env = parsedEnv.data;