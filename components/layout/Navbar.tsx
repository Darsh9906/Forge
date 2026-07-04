"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { SidebarNav } from "@/components/layout/Sidebar";

export function Navbar() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<>
			<header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border/60 bg-background/90 px-4 backdrop-blur sm:px-6">
				{/* Hamburger — mobile only */}
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					aria-label="Open navigation"
					onClick={() => setDrawerOpen(true)}
				>
					<MenuIcon className="size-5" />
				</Button>

				{/* Brand — visible on mobile (desktop brand is in the fixed sidebar) */}
				<div className="flex items-center gap-2 font-semibold tracking-tight md:hidden">
					<span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs">
						F
					</span>
					<span>Forge</span>
				</div>

				<div className="flex-1" />

				<Button variant="outline" size="sm" type="button">
					Theme
				</Button>
			</header>

			{/* Mobile sidebar drawer */}
			<Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
				<SheetContent side="left" className="w-72 px-5 py-6">
					<SheetHeader className="mb-4 px-0">
						<SheetTitle className="flex items-center gap-2 font-semibold tracking-tight">
							<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">
								F
							</span>
							Forge
						</SheetTitle>
					</SheetHeader>
					<SidebarNav onNavigate={() => setDrawerOpen(false)} />
				</SheetContent>
			</Sheet>
		</>
	);
}

