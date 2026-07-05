import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  className?: string;
};

export default function ErrorState({
  title = "Something went wrong",
  description = "Please try again or refresh the page.",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center text-center animate-forge-fade-in", className)}
      style={{ padding: "40px 24px", gap: 14 }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "rgba(224,82,82,0.08)",
          border: "1px solid rgba(224,82,82,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AlertTriangle size={18} style={{ color: "#e05252" }} />
      </div>
      <div>
        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#b8b8b8",
            margin: 0,
          }}
        >
          {title}
        </p>
        {description && (
          <p
            style={{
              fontSize: 12,
              color: "#606060",
              margin: "4px 0 0",
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}