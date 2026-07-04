import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
	title: string;
	description?: string;
	actions?: ReactNode;
	className?: string;
};

export default function PageHeader({
	title,
	description,
	actions,
	className,
}: PageHeaderProps) {
	return (
		<section className={cn("space-y-2", className)}>
			<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-2">
					<h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
					{description ? (
						<p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
							{description}
						</p>
					) : null}
				</div>
				{actions ? <div className="flex items-center gap-2">{actions}</div> : null}
			</div>
		</section>
	);
}