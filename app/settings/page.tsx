import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BackendUrlInput from "@/components/settings/BackendUrlCard";
import MemoryToggle from "@/components/settings/MemoryToggle";
import ModelSelector from "@/components/settings/ModelSelector";
import SaveSettingsButton from "@/components/settings/SaveSettingsButton";
import TemperatureSlider from "@/components/settings/TemperatureSlider";
import ThemeSelector from "@/components/settings/ThemeSelector";

export default function SettingsPage() {
  return (
    <main className="mx-auto flex w-full max-w-[700px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Configure your Forge workspace and assistant preferences.
        </p>
      </section>

      <Card className="border-border/60 bg-card shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>
            Update backend, model, memory, and theme preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>
    </main>
  );
}