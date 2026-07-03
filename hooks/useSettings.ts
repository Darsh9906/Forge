"use client";

import { useSettingsStore } from "@/stores/settings-store";

export function useSettings() {
  const theme = useSettingsStore((state) => state.theme);
  const backendUrl = useSettingsStore((state) => state.backendUrl);
  const selectedModel = useSettingsStore((state) => state.selectedModel);
  const temperature = useSettingsStore((state) => state.temperature);
  const useMemory = useSettingsStore((state) => state.useMemory);

  const setTheme = useSettingsStore((state) => state.setTheme);
  const setBackendUrl = useSettingsStore((state) => state.setBackendUrl);
  const setSelectedModel = useSettingsStore((state) => state.setSelectedModel);
  const setTemperature = useSettingsStore((state) => state.setTemperature);
  const setUseMemory = useSettingsStore((state) => state.setUseMemory);

  return {
    theme,
    backendUrl,
    selectedModel,
    temperature,
    useMemory,

    setTheme,
    setBackendUrl,
    setSelectedModel,
    setTemperature,
    setUseMemory,
  };
}