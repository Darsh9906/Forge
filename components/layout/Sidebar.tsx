import Link from "next/link";

import { Button } from "@/components/ui/button";

const navigationItems = [
	{ href: "/", label: "Home" },
	{ href: "/chat", label: "Chat" },
	{ href: "/memory", label: "Memory" },
	{ href: "/settings", label: "Settings" },
] as const;

export function Sidebar() {
	return (
		<aside className="border-b border-border/60 bg-muted/30 px-4 py-4 md:min-h-dvh md:w-64 md:border-b-0 md:border-r md:px-5 md:py-6">
			<nav className="flex flex-row flex-wrap gap-2 md:flex-col">
				{navigationItems.map((item) => (
					<Button
						key={item.href}
						asChild
						variant="ghost"
						className="justify-start"
					>
						<Link href={item.href}>{item.label}</Link>
					</Button>
				))}
			</nav>
		</aside>
	);
}
