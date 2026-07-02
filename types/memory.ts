export interface RememberRequest {
	text: string;
}

export interface RecallRequest {
	query: string;
}

export interface MemoryRecord {
	[key: string]: unknown;
}