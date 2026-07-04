import { cn } from "@/lib/utils";

type LoadingStateProps = {
	className?: string;
};

export default function LoadingState({ className }: LoadingStateProps) {
	return (
		<div className={cn("inline-flex items-center gap-1.5", className)}>
			<span className="h-2 w-2 animate-bounce rounded-full bg-current/70 [animation-delay:-0.2s]" />
			<span className="h-2 w-2 animate-bounce rounded-full bg-current/70 [animation-delay:-0.1s]" />
			<span className="h-2 w-2 animate-bounce rounded-full bg-current/70" />
		</div>
	);
}