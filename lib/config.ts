const fallbackAppName = "Forge";

function readEnv(name: string): string {
	const value = process.env[name];
	return typeof value === "string" ? value.trim() : "";
}

export const API_URL = readEnv("NEXT_PUBLIC_API_URL");
export const APP_NAME = readEnv("NEXT_PUBLIC_APP_NAME") || fallbackAppName;