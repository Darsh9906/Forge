"use client";

import { Switch } from "@/components/ui/switch";
import { useSettingsStore } from "@/stores/settings-store";

export default function MemoryToggle() {
	const useMemory = useSettingsStore((state) => state.useMemory);
	const setUseMemory = useSettingsStore((state) => state.setUseMemory);

	return (
		<div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background px-4 py-3">
			<div className="space-y-1">
				<label className="text-sm font-medium text-foreground">Use Memory</label>
				<p className="text-sm text-muted-foreground">Enable memory-aware responses.</p>
			</div>
			<Switch checked={useMemory} onCheckedChange={setUseMemory} />
		</div>
	);
}
