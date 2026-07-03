import type { SendMessageRequest, SendMessageResponse } from "@/types/chat";

import { sendMessage } from "@/services/chat/chat-service";

export async function sendChatCompletion(
	request: SendMessageRequest,
): Promise<SendMessageResponse> {
	return sendMessage(request);
}
