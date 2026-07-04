import { cn } from "@/lib/utils";

type EmptyStateProps = {
	title: string;
	description?: string;
	className?: string;
};

export default function EmptyState({
	title,
	description,
	className,
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				"rounded-2xl border border-dashed border-border/70 bg-card px-4 py-10 text-center text-sm text-muted-foreground sm:px-6",
				className,
			)}
		>
			<div className="space-y-1">
				<p className="text-sm font-medium text-foreground">{title}</p>
				{description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
			</div>
		</div>
	);
}