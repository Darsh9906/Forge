import { api } from "@/lib/api";
import type { HealthResponse } from "@/types/api";
import type { ServerResult } from "@/lib/server/models";

export async function getHealth(): Promise<HealthResponse> {
	const response = await api.get<ServerResult<HealthResponse>>("/health");
	const result = response.data;
	if (!result.success) {
		throw new Error(result.error.message);
	}
	return result.data;
}