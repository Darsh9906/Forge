import MemoryInput from "@/components/memory/MemoryInput";
import MemoryList from "@/components/memory/MemoryList";
import MemorySearch from "@/components/memory/MemorySearch";

export default function MemoryPage() {
  return (
    <div
      className="h-full overflow-y-auto w-full"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="mx-auto animate-forge-fade-in"
        style={{
          maxWidth: 900,
          padding: "clamp(24px, 5vw, 40px) clamp(12px, 4vw, 24px) 80px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Page title */}
        <div style={{ marginBottom: 12 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Memory
          </h1>
          <p style={{ fontSize: 13, color: "#606060", margin: "4px 0 0" }}>
            Search, store, and review what Forge knows.
          </p>
        </div>

        <MemorySearch />
        <MemoryInput />

        {/* Saved memories section */}
        <div>
          <div
            style={{
              padding: "0 2px 10px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#484848",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Saved memories
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.06)",
              }}
            />
          </div>
          <MemoryList />
        </div>
      </div>
    </div>
  );
}