export interface RememberRequest {
	text: string;
}

export interface RecallRequest {
	query: string;
}

export interface MemoryRecord {
	[key: string]: unknown;
}

export interface MemoryApiResponse {
	memory?: MemoryRecord;
	memories?: MemoryRecord[];
	data?: MemoryRecord | MemoryRecord[];
	result?: MemoryRecord | MemoryRecord[];
	[key: string]: unknown;
}

export type MemoryServiceResponse = MemoryRecord | MemoryRecord[] | MemoryApiResponse;