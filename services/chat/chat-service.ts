import { api } from "@/lib/api";
import type { SendMessageRequest, SendMessageResponse } from "@/types/chat";

export async function sendMessage(
	request: SendMessageRequest,
): Promise<SendMessageResponse> {
	const response = await api.post<SendMessageResponse>(
		"/chat/completions",
		request,
	);
	return response.data;
}