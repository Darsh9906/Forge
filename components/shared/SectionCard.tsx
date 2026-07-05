import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionCardProps = {
  title?: string;
  description?: string;
  className?: string;
  bodyClassName?: string;
  children?: ReactNode;
  headerSlot?: ReactNode;
};

export default function SectionCard({
  title,
  description,
  className,
  bodyClassName,
  children,
  headerSlot,
}: SectionCardProps) {
  return (
    <div className={cn("forge-card", className)} style={{ overflow: "hidden" }}>
      {(title || description || headerSlot) && (
        <div
          style={{
            padding: "18px 20px 14px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#b8b8b8",
                  margin: 0,
                  letterSpacing: "0.01em",
                }}
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                style={{
                  fontSize: 12,
                  color: "#606060",
                  margin: "2px 0 0",
                  lineHeight: 1.4,
                }}
              >
                {description}
              </p>
            )}
          </div>
          {headerSlot}
        </div>
      )}
      <div className={cn("", bodyClassName)} style={{ padding: "18px 20px" }}>
        {children}
      </div>
    </div>
  );
}