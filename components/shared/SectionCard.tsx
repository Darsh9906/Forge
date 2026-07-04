import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SectionCardProps = {
	title?: string;
	description?: string;
	children: ReactNode;
	className?: string;
	headerClassName?: string;
	bodyClassName?: string;
};

export default function SectionCard({
	title,
	description,
	children,
	className,
	headerClassName,
	bodyClassName,
}: SectionCardProps) {
	return (
		<Card className={cn("border-border/60 bg-card shadow-sm", className)}>
			<div className="space-y-4 p-4 sm:p-6">
				{title || description ? (
					<div className={cn("space-y-1", headerClassName)}>
						{title ? <h2 className="text-lg font-semibold tracking-tight">{title}</h2> : null}
						{description ? (
							<p className="text-sm text-muted-foreground">{description}</p>
						) : null}
					</div>
				) : null}
				<div className={cn("space-y-6", bodyClassName)}>{children}</div>
			</div>
		</Card>
	);
}