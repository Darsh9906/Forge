import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

type AppShellProps = {
	children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
	return (
		<div className="flex min-h-[calc(100dvh-0px)] flex-col bg-background md:flex-row">
			<Sidebar />
			<div className="flex min-w-0 flex-1 flex-col">
				<Navbar />
				<main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
			</div>
		</div>
	);
}
