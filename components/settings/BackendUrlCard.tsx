"use client";

import { Input } from "@/components/ui/input";
import { useSettingsStore } from "@/stores/settings-store";

export default function BackendUrlInput() {
	const backendUrl = useSettingsStore((state) => state.backendUrl);
	const setBackendUrl = useSettingsStore((state) => state.setBackendUrl);

	return (
		<div className="space-y-2">
			<label className="text-sm font-medium text-foreground">Backend URL</label>
			<Input
				type="url"
				value={backendUrl}
				onChange={(event) => setBackendUrl(event.target.value)}
				placeholder="https://api.example.com"
				className="h-11 rounded-xl bg-background px-4"
			/>
		</div>
	);
}
