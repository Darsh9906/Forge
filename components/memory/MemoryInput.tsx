"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import SectionCard from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { rememberSchema, type RememberFormValues } from "@/lib/schemas/forms";
import { useMemoryStore } from "@/stores/memory-store";

export default function MemoryInput() {
	const [saving, setSaving] = useState(false);
	const remember = useMemoryStore((state) => state.remember);
	const loading = useMemoryStore((state) => state.loading);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<RememberFormValues>({
		resolver: zodResolver(rememberSchema),
		defaultValues: { text: "" },
		mode: "onChange",
	});

	const onSubmit = async (data: RememberFormValues) => {
		if (saving) return;

		setSaving(true);

		try {
			await remember(data.text.trim());
			reset();
			toast.success("Memory saved", {
				description: "Your note has been stored for later recall.",
			});
		} catch {
			toast.error("Failed to save memory", {
				description: "Unable to remember this yet. Please try again.",
			});
		} finally {
			setSaving(false);
		}
	};

	return (
		<SectionCard
			title="Remember something"
			description="Capture a note to store for later recall."
			bodyClassName="space-y-4"
		>
			<form
				className="flex flex-col gap-3"
				onSubmit={(e) => void handleSubmit(onSubmit)(e)}
			>
				<div className="flex flex-col gap-1">
					<Textarea
						{...register("text")}
						placeholder="Write a memory..."
						rows={7}
						className="min-h-40 rounded-xl bg-background px-4 py-3 text-sm leading-6"
					/>
					{errors.text && (
						<p className="text-xs text-destructive">{errors.text.message}</p>
					)}
				</div>
				<div className="flex items-center justify-end gap-3">
					<Button
						type="submit"
						disabled={loading || saving || !isValid}
						className="h-11 rounded-xl px-5"
					>
						{saving ? (
							<>
								<Loader2 className="size-4 animate-spin" />
								Saving...
							</>
						) : (
							"Remember"
						)}
					</Button>
				</div>
			</form>
		</SectionCard>
	);
}

