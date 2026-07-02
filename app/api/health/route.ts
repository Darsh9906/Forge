import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

import { api } from "@/lib/api";
import { env } from "@/lib/env";

export async function GET() {
	try {
		const response = await api.get(`${env.NEXT_PUBLIC_API_URL}/health`);

		return NextResponse.json(response.data, { status: response.status });
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			return NextResponse.json(error.response.data, {
				status: error.response.status,
			});
		}

		return NextResponse.json(
			{ success: false, message: "Backend unavailable" },
			{ status: 500 },
		);
	}
}
