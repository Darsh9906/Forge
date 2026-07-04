"use client";

import { useTheme } from "next-themes";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettingsStore, type ThemeMode } from "@/stores/settings-store";

const themes: ThemeMode[] = ["light", "dark", "system"];

export default function ThemeSelector() {
	const theme = useSettingsStore((state) => state.theme);
	const setThemeInStore = useSettingsStore((state) => state.setTheme);
	const { setTheme: setNextTheme } = useTheme();

	const handleChange = (value: string) => {
		const next = value as ThemeMode;
		setThemeInStore(next);
		setNextTheme(next);
	};

	return (
		<div className="space-y-2">
			<label className="text-sm font-medium text-foreground">Theme</label>
			<Select value={theme} onValueChange={handleChange}>
				<SelectTrigger className="h-11 rounded-xl bg-background px-4">
					<SelectValue placeholder="Select a theme" />
				</SelectTrigger>
				<SelectContent>
					{themes.map((themeOption) => (
						<SelectItem key={themeOption} value={themeOption}>
							{themeOption[0].toUpperCase() + themeOption.slice(1)}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
