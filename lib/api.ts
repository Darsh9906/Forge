import axios from "axios";

import { env } from "@/lib/env";

export const api = axios.create({
	baseURL: env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 30_000,
});

api.interceptors.request.use(
	(config) => {
		const authToken = undefined;

		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

api.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error),
);