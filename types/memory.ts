// ---------------------------------------------------------------------------
// Memory — matches FastAPI  POST /remember  (python/app.py)
// ---------------------------------------------------------------------------

/**
 * Request body for  POST /remember.
 * Matches  RememberRequest  Pydantic model in python/app.py.
 */
export interface RememberRequest {
	message: string;
}

/**
 * Response body from FastAPI  POST /remember.
 * Matches  RememberResponse  Pydantic model in python/app.py.
 */
export interface FastApiRememberResponse {
	success: boolean;
	message: string; // human-readable confirmation string
}

// ---------------------------------------------------------------------------
// Recall — matches FastAPI  POST /recall  (python/app.py)
// (Stub — endpoint not yet implemented in FastAPI)
// ---------------------------------------------------------------------------

/**
 * Request body for  POST /recall.
 * Intended to match a future  RecallRequest  Pydantic model in python/app.py.
 */
export interface RecallRequest {
	query: string;
}

/**
 * Shape of a single memory record returned by cognee.recall().
 * The exact fields depend on the Cognee version; use an open index signature
 * until the FastAPI /recall endpoint is implemented and stabilised.
 */
export interface MemoryRecord {
	[key: string]: unknown;
}

/**
 * Response body from FastAPI  POST /recall  (future endpoint).
 * Matches the planned  RecallResponse  Pydantic model.
 */
export interface MemoryApiResponse {
	memories: MemoryRecord[];
}

export type MemoryServiceResponse = MemoryRecord | MemoryRecord[] | MemoryApiResponse;