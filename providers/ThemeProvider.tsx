"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

import { useSettingsStore } from "@/stores/settings-store";

function ThemeSync() {
	const storedTheme = useSettingsStore((state) => state.theme);
	const { setTheme } = useTheme();

	useEffect(() => {
		setTheme(storedTheme);
	}, [storedTheme, setTheme]);

	return null;
}

type ThemeProviderProps = {
	children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="dark"
			enableSystem
			disableTransitionOnChange
		>
			<ThemeSync />
			{children}
		</NextThemesProvider>
	);
}
