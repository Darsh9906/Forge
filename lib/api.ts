import axios from "axios";

import { env } from "@/lib/env";

export const api = axios.create({
	baseURL: env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => config,
	(error) => Promise.reject(error),
);

api.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error),
);