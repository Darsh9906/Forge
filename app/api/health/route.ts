import { NextResponse } from "next/server";

import { createServerSuccess } from "@/lib/server/models";
import type { HealthResponse } from "@/types/api";

export async function GET() {
	const data: HealthResponse = { status: "ok" };
	return NextResponse.json(createServerSuccess(data));
}

