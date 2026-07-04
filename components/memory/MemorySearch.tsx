"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import SectionCard from "@/components/shared/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchSchema, type SearchFormValues } from "@/lib/schemas/forms";
import { useMemoryStore } from "@/stores/memory-store";

export default function MemorySearch() {
	const [searching, setSearching] = useState(false);
	const recall = useMemoryStore((state) => state.recall);
	const loading = useMemoryStore((state) => state.loading);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<SearchFormValues>({
		resolver: zodResolver(searchSchema),
		defaultValues: { query: "" },
		mode: "onChange",
	});

	const onSubmit = async (data: SearchFormValues) => {
		if (searching) return;

		setSearching(true);

		try {
			await recall(data.query.trim());
			toast.success("Search complete", {
				description: "Memories matching your query are now shown below.",
			});
		} catch {
			toast.error("Search failed", {
				description: "Unable to search memories right now. Please try again.",
			});
		} finally {
			setSearching(false);
		}
	};

	return (
		<SectionCard
			title="Search memories"
			description="Find previous notes and recalled context."
			bodyClassName="space-y-4"
		>
			<form
				className="flex flex-col gap-3 sm:flex-row"
				onSubmit={(e) => void handleSubmit(onSubmit)(e)}
			>
				<div className="flex flex-1 flex-col gap-1">
					<Input
						{...register("query")}
						placeholder="Search memories..."
						className="h-11 flex-1 rounded-xl bg-background px-4 text-sm"
					/>
					{errors.query && (
						<p className="text-xs text-destructive">{errors.query.message}</p>
					)}
				</div>
				<Button
					type="submit"
					disabled={loading || searching || !isValid}
					className="h-11 rounded-xl px-5"
				>
					{searching ? (
						<>
							<Loader2 className="size-4 animate-spin" />
							Searching...
						</>
					) : (
						"Search"
					)}
				</Button>
			</form>
		</SectionCard>
	);
}

