import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { env } from "@/lib/env";

export type ThemeMode = "light" | "dark" | "system";

type SettingsSnapshot = {
	theme: ThemeMode;
	backendUrl: string;
	selectedModel: string;
	temperature: number;
	useMemory: boolean;
};

type SettingsState = {
	readonly theme: ThemeMode;
	readonly backendUrl: string;
	readonly selectedModel: string;
	readonly temperature: number;
	readonly useMemory: boolean;
	setTheme: (theme: ThemeMode) => void;
	setBackendUrl: (backendUrl: string) => void;
	setSelectedModel: (selectedModel: string) => void;
	setTemperature: (temperature: number) => void;
	setUseMemory: (useMemory: boolean) => void;
};

const DEFAULT_SETTINGS: SettingsSnapshot = {
	theme: "dark",
	backendUrl: env.NEXT_PUBLIC_API_URL,
	selectedModel: "",
	temperature: 0.7,
	useMemory: true,
};

const storage =
	typeof window === "undefined" ? undefined : createJSONStorage(() => localStorage);

const normalizeTheme = (theme: unknown): ThemeMode =>
	theme === "light" || theme === "dark" || theme === "system"
		? theme
		: DEFAULT_SETTINGS.theme;

const normalizeBackendUrl = (backendUrl: unknown): string => {
	if (typeof backendUrl !== "string") {
		return DEFAULT_SETTINGS.backendUrl;
	}

	const trimmedUrl = backendUrl.trim();
	return trimmedUrl.length > 0 ? trimmedUrl : DEFAULT_SETTINGS.backendUrl;
};

const normalizeSelectedModel = (selectedModel: unknown): string =>
	typeof selectedModel === "string" ? selectedModel.trim() : DEFAULT_SETTINGS.selectedModel;

const normalizeTemperature = (temperature: unknown): number => {
	if (typeof temperature !== "number" || Number.isNaN(temperature)) {
		return DEFAULT_SETTINGS.temperature;
	}

	return Math.min(1, Math.max(0, temperature));
};

const normalizeUseMemory = (useMemory: unknown): boolean =>
	typeof useMemory === "boolean" ? useMemory : DEFAULT_SETTINGS.useMemory;

const normalizeSettings = (
	state: Partial<SettingsSnapshot>,
): SettingsSnapshot => ({
	theme: normalizeTheme(state.theme),
	backendUrl: normalizeBackendUrl(state.backendUrl),
	selectedModel: normalizeSelectedModel(state.selectedModel),
	temperature: normalizeTemperature(state.temperature),
	useMemory: normalizeUseMemory(state.useMemory),
});

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			theme: DEFAULT_SETTINGS.theme,
			backendUrl: DEFAULT_SETTINGS.backendUrl,
			selectedModel: DEFAULT_SETTINGS.selectedModel,
			temperature: DEFAULT_SETTINGS.temperature,
			useMemory: DEFAULT_SETTINGS.useMemory,
			setTheme: (theme) => set({ theme: normalizeTheme(theme) }),
			setBackendUrl: (backendUrl) => set({ backendUrl: normalizeBackendUrl(backendUrl) }),
			setSelectedModel: (selectedModel) =>
				set({ selectedModel: normalizeSelectedModel(selectedModel) }),
			setTemperature: (temperature) =>
				set({ temperature: normalizeTemperature(temperature) }),
			setUseMemory: (useMemory) => set({ useMemory }),
		}),
		{
			name: "forge-settings",
			version: 1,
			storage,
			partialize: (state) =>
				normalizeSettings({
					theme: state.theme,
					backendUrl: state.backendUrl,
					selectedModel: state.selectedModel,
					temperature: state.temperature,
					useMemory: state.useMemory,
				}),
			merge: (persistedState, currentState) => ({
				...currentState,
				...normalizeSettings(persistedState as Partial<SettingsSnapshot>),
			}),
		},
	),
);