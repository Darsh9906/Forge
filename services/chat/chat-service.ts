import { api } from "@/lib/api";
import type { SendMessageRequest, SendMessageResponse } from "@/types/chat";
import type { ServerResult } from "@/lib/server/models";

export async function sendMessage(
	request: SendMessageRequest,
): Promise<SendMessageResponse> {
	const response = await api.post<ServerResult<SendMessageResponse>>(
		"/chat/completions",
		request,
	);
	const result = response.data;
	if (!result.success) {
		throw new Error(result.error.message);
	}
	return result.data;
}