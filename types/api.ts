export interface HealthResponse {
	status: string;
}

export interface ApiErrorResponse {
	message?: string;
	[key: string]: unknown;
}