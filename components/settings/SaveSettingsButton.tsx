"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function SaveSettingsButton() {
	return (
		<Button
			type="button"
			onClick={() => toast("Settings Saved")}
			className="h-11 rounded-xl px-5"
		>
			Save Settings
		</Button>
	);
}
