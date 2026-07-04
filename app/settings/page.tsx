import { Separator } from "@/components/ui/separator";
import BackendUrlInput from "@/components/settings/BackendUrlCard";
import MemoryToggle from "@/components/settings/MemoryToggle";
import ModelSelector from "@/components/settings/ModelSelector";
import SaveSettingsButton from "@/components/settings/SaveSettingsButton";
import TemperatureSlider from "@/components/settings/TemperatureSlider";
import ThemeSelector from "@/components/settings/ThemeSelector";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";

export default function SettingsPage() {
  return (
    <main className="mx-auto flex w-full max-w-175 flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Settings"
        description="Configure your Forge workspace and assistant preferences."
      />

      <SectionCard
        title="Application Settings"
        description="Update backend, model, memory, and theme preferences."
      >
          <BackendUrlInput />
          <Separator />
          <ModelSelector />
          <Separator />
          <TemperatureSlider />
          <Separator />
          <MemoryToggle />
          <Separator />
          <ThemeSelector />
          <div className="flex justify-end pt-2">
            <SaveSettingsButton />
          </div>
      </SectionCard>
    </main>
  );
}