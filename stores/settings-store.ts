import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { env } from "@/lib/env";

export type ThemeMode = "light" | "dark" | "system";

type SettingsState = {
	theme: ThemeMode;
	backendUrl: string;
	selectedModel: string;
	temperature: number;
	useMemory: boolean;
	setTheme: (theme: ThemeMode) => void;
	setBackendUrl: (backendUrl: string) => void;
	setSelectedModel: (selectedModel: string) => void;
	setTemperature: (temperature: number) => void;
	setUseMemory: (useMemory: boolean) => void;
};

const storage =
	typeof window === "undefined" ? undefined : createJSONStorage(() => localStorage);

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			theme: "dark",
			backendUrl: env.NEXT_PUBLIC_API_URL,
			selectedModel: "",
			temperature: 0.7,
			useMemory: true,
			setTheme: (theme) => set({ theme }),
			setBackendUrl: (backendUrl) => set({ backendUrl }),
			setSelectedModel: (selectedModel) => set({ selectedModel }),
			setTemperature: (temperature) => set({ temperature }),
			setUseMemory: (useMemory) => set({ useMemory }),
		}),
		{
			name: "forge-settings",
			storage,
			partialize: (state) => ({
				theme: state.theme,
				backendUrl: state.backendUrl,
				selectedModel: state.selectedModel,
				temperature: state.temperature,
				useMemory: state.useMemory,
			}),
		},
	),
);