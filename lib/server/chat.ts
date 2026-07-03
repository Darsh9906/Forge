import { sendMessage } from "@/services/chat/chat-service";
import type { SendMessageRequest, SendMessageResponse } from "@/types/chat";

import {
	createServerError,
	createServerSuccess,
	type ServerResult,
} from "./models";

export async function sendChat(
	request: SendMessageRequest,
): Promise<ServerResult<SendMessageResponse>> {
	try {
		const data = await sendMessage(request);
		return createServerSuccess(data);
	} catch (error) {
		return createServerError(
			error,
			"CHAT_UNAVAILABLE",
			"Unable to send chat completion.",
		);
	}
}

export const sendChatCompletion = sendChat;
