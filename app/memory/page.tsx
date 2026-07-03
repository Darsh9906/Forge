import MemoryInput from "@/components/memory/MemoryInput";
import MemoryList from "@/components/memory/MemoryList";
import MemorySearch from "@/components/memory/MemorySearch";

export default function MemoryPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Memory</h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Search, store, and review memories from a clean workspace.
        </p>
      </section>

      <div className="grid gap-6">
        <MemorySearch />
        <MemoryInput />
        <section className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">Saved memories</h2>
            <p className="text-sm text-muted-foreground">
              Results from your latest search or saved memory list.
            </p>
          </div>
          <MemoryList />
        </section>
      </div>
    </main>
  );
}