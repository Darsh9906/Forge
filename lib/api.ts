import axios from "axios";

import { env } from "@/lib/env";
import { useSettingsStore } from "@/stores/settings-store";

export const api = axios.create({
	baseURL: env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 30_000,
});

api.interceptors.request.use(
	(config) => {
		// Pick up the current backendUrl from the settings store on every request
		// so that changes made in the Settings page take effect immediately
		const { backendUrl } = useSettingsStore.getState();
		if (backendUrl) {
			config.baseURL = backendUrl;
		}

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