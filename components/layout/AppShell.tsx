import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

type AppShellProps = {
	children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
	return (
		<div className="h-dvh bg-background">
			{/* Fixed desktop sidebar */}
			<Sidebar />

			{/* Right column: offset to clear the fixed sidebar on desktop */}
			<div className="flex h-full flex-col md:pl-64">
				<Navbar />

				{/* Main scrollable region — grows to fill remaining viewport height */}
				<main className="flex-1 overflow-y-auto">
					{children}
				</main>
			</div>
		</div>
	);
}

