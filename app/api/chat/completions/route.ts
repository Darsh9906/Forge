import { NextResponse } from "next/server";

import { sendChatCompletion } from "@/lib/server/chat";
import type { SendMessageRequest } from "@/types/chat";

export async function POST(request: Request) {
	const body = (await request.json().catch(() => ({}))) as SendMessageRequest;

	const result = await sendChatCompletion(body);

	return NextResponse.json(result);
}

