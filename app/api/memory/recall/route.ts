import { NextResponse } from "next/server";

export async function POST(request: Request) {
	await request.json().catch(() => null);

	return NextResponse.json({
		memories: [
			{ id: "1", text: "Example Memory 1" },
			{ id: "2", text: "Example Memory 2" },
		],
	});
}
