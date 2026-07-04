"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export const navigationItems = [
	{ href: "/", label: "Home" },
	{ href: "/chat", label: "Chat" },
	{ href: "/memory", label: "Memory" },
	{ href: "/settings", label: "Settings" },
] as const;

/** Shared nav list — used in both the desktop sidebar and the mobile drawer. */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
	const pathname = usePathname();

	return (
		<nav className="flex flex-col gap-1">
			{navigationItems.map((item) => {
				const isActive =
					item.href === "/"
						? pathname === "/"
						: pathname.startsWith(item.href);
				return (
					<Button
						key={item.href}
						asChild
						variant={isActive ? "secondary" : "ghost"}
						className="justify-start"
						onClick={onNavigate}
					>
						<Link href={item.href}>{item.label}</Link>
					</Button>
				);
			})}
		</nav>
	);
}

/** Desktop-only fixed sidebar — hidden on mobile. */
export function Sidebar() {
	return (
		<aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border/60 bg-muted/30 px-5 py-6 md:flex">
			<div className="mb-6 flex items-center gap-2 font-semibold tracking-tight">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">
					F
				</span>
				<span>Forge</span>
			</div>
			<SidebarNav />
		</aside>
	);
}

