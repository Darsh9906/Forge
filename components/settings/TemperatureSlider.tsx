"use client";

import { Slider } from "@/components/ui/slider";
import { useSettingsStore } from "@/stores/settings-store";

export default function TemperatureSlider() {
	const temperature = useSettingsStore((state) => state.temperature);
	const setTemperature = useSettingsStore((state) => state.setTemperature);

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between gap-4">
				<label className="text-sm font-medium text-foreground">Temperature</label>
				<span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
					{temperature.toFixed(1)}
				</span>
			</div>
			<Slider
				min={0}
				max={1}
				step={0.1}
				value={[temperature]}
				onValueChange={(value) => setTemperature(value[0] ?? 0)}
				className="py-2"
			/>
		</div>
	);
}
