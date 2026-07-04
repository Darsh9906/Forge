import { cn } from "@/lib/utils";

type ErrorStateProps = {
	message: string;
	className?: string;
};

export default function ErrorState({ message, className }: ErrorStateProps) {
	return <p className={cn("text-sm text-destructive", className)}>{message}</p>;
}