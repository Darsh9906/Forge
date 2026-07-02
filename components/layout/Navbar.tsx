import { Button } from "@/components/ui/button";

export function Navbar() {
	return (
		<header className="flex h-16 items-center justify-between border-b border-border/60 bg-background/90 px-4 backdrop-blur sm:px-6 lg:px-8">
			<div className="flex items-center gap-2 font-semibold tracking-tight">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
					F
				</span>
				<span>Forge</span>
			</div>
			<Button variant="outline" size="sm" type="button">
				Theme
			</Button>
		</header>
	);
}
