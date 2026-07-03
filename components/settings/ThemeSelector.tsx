"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettingsStore, type ThemeMode } from "@/stores/settings-store";

const themes: ThemeMode[] = ["light", "dark", "system"];

export default function ThemeSelector() {
	const theme = useSettingsStore((state) => state.theme);
	const setTheme = useSettingsStore((state) => state.setTheme);

	return (
		<div className="space-y-2">
			<label className="text-sm font-medium text-foreground">Theme</label>
			<Select value={theme} onValueChange={(value) => setTheme(value as ThemeMode)}>
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
