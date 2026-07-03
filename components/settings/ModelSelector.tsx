"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettingsStore } from "@/stores/settings-store";

const models = ["llama3", "gemma", "mistral", "deepseek"] as const;

export default function ModelSelector() {
	const selectedModel = useSettingsStore((state) => state.selectedModel);
	const setSelectedModel = useSettingsStore((state) => state.setSelectedModel);

	return (
		<div className="space-y-2">
			<label className="text-sm font-medium text-foreground">Model</label>
			<Select value={selectedModel} onValueChange={setSelectedModel}>
				<SelectTrigger className="h-11 rounded-xl bg-background px-4">
					<SelectValue placeholder="Select a model" />
				</SelectTrigger>
				<SelectContent>
					{models.map((model) => (
						<SelectItem key={model} value={model}>
							{model}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
