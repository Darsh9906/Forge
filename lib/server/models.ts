import { isAxiosError } from "axios";

import type { ApiErrorResponse } from "@/types/api";

export type ServerSuccess<T> = {
	success: true;
	data: T;
};

export type ServerError = {
	success: false;
	error: {
		code: string;
		message: string;
	};
};

export type ServerResult<T> = ServerSuccess<T> | ServerError;

export function createServerSuccess<T>(data: T): ServerSuccess<T> {
	return { success: true, data };
}

export function createServerError(
	error: unknown,
	fallbackCode: string,
	fallbackMessage: string,
): ServerError {
	if (isAxiosError(error)) {
		const responseError = error.response?.data as ApiErrorResponse | undefined;
		const code =
			typeof (responseError as { code?: unknown } | undefined)?.code === "string"
				? ((responseError as { code: string }).code)
				: error.response?.status
					? `HTTP_${error.response.status}`
					: fallbackCode;
		const message =
			typeof responseError?.message === "string" && responseError.message.trim().length > 0
				? responseError.message
				: fallbackMessage;

		return {
			success: false,
			error: {
				code,
				message,
			},
		};
	}

	if (error instanceof Error) {
		return {
			success: false,
			error: {
				code: fallbackCode,
				message: error.message || fallbackMessage,
			},
		};
	}

	return {
		success: false,
		error: {
			code: fallbackCode,
			message: fallbackMessage,
		},
	};
}
