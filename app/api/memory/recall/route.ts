import { NextResponse } from "next/server";

import { recallMemory } from "@/lib/server/memory";
import type { RecallRequest } from "@/types/memory";

export async function POST(request: Request) {
	const body = (await request.json().catch(() => ({}))) as RecallRequest;

	const result = await recallMemory(body.query);

	return NextResponse.json(result);
}
