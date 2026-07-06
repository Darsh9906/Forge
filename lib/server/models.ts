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
