import BackendUrlInput from "@/components/settings/BackendUrlCard";
import MemoryToggle from "@/components/settings/MemoryToggle";
import ModelSelector from "@/components/settings/ModelSelector";
import SaveSettingsButton from "@/components/settings/SaveSettingsButton";
import TemperatureSlider from "@/components/settings/TemperatureSlider";
import ThemeSelector from "@/components/settings/ThemeSelector";
import SectionCard from "@/components/shared/SectionCard";

export default function SettingsPage() {
  return (
    <div
      className="h-full overflow-y-auto"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: 680, padding: "40px 24px 80px" }}
      >
        {/* Page title */}
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Settings
          </h1>
          <p style={{ fontSize: 13, color: "#606060", margin: "4px 0 0" }}>
            Configure your Forge workspace and assistant preferences.
          </p>
        </div>

        <SectionCard
          title="Application Settings"
          description="Backend, model, memory, and theme preferences."
          bodyClassName="flex flex-col gap-0"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <BackendUrlInput />
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
            <ModelSelector />
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
            <TemperatureSlider />
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
            <MemoryToggle />
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />
            <ThemeSelector />
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 4 }}>
              <SaveSettingsButton />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}