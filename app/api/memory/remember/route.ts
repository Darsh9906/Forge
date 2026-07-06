import { NextResponse } from "next/server";

import { rememberMemory } from "@/lib/server/memory";
import type { RememberRequest } from "@/types/memory";

export async function POST(request: Request) {
	const body = (await request.json().catch(() => ({}))) as RememberRequest;

	const result = await rememberMemory(body.message);

	return NextResponse.json(result);
}
