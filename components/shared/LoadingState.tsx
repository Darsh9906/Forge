import { cn } from "@/lib/utils";

type LoadingStateProps = {
  className?: string;
  /** "dots" = typing indicator style, "skeleton" = content placeholder */
  variant?: "dots" | "skeleton";
  lines?: number;
};

export default function LoadingState({
  className,
  variant = "dots",
  lines = 3,
}: LoadingStateProps) {
  if (variant === "skeleton") {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="forge-skeleton"
            style={{
              height: 14,
              width: i === lines - 1 ? "60%" : "100%",
              borderRadius: 6,
            }}
          />
        ))}
      </div>
    );
  }

  // Dots
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="forge-dot" />
      <div className="forge-dot" />
      <div className="forge-dot" />
    </div>
  );
}