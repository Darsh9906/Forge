import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

type SettingsSnapshot = {
	theme: ThemeMode;
	selectedModel: string;
	temperature: number;
	useMemory: boolean;
};

type SettingsState = {
	readonly theme: ThemeMode;
	readonly selectedModel: string;
	readonly temperature: number;
	readonly useMemory: boolean;
	setTheme: (theme: ThemeMode) => void;
	setSelectedModel: (selectedModel: string) => void;
	setTemperature: (temperature: number) => void;
	setUseMemory: (useMemory: boolean) => void;
};

const DEFAULT_SETTINGS: SettingsSnapshot = {
	theme: "dark",
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
	selectedModel: normalizeSelectedModel(state.selectedModel),
	temperature: normalizeTemperature(state.temperature),
	useMemory: normalizeUseMemory(state.useMemory),
});

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			theme: DEFAULT_SETTINGS.theme,
			selectedModel: DEFAULT_SETTINGS.selectedModel,
			temperature: DEFAULT_SETTINGS.temperature,
			useMemory: DEFAULT_SETTINGS.useMemory,
			setTheme: (theme) => set({ theme: normalizeTheme(theme) }),
			setSelectedModel: (selectedModel) =>
				set({ selectedModel: normalizeSelectedModel(selectedModel) }),
			setTemperature: (temperature) =>
				set({ temperature: normalizeTemperature(temperature) }),
			setUseMemory: (useMemory) => set({ useMemory }),
		}),
		{
			name: "forge-settings",
			version: 2,
			storage,
			partialize: (state) =>
				normalizeSettings({
					theme: state.theme,
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