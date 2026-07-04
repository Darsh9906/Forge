import MemoryInput from "@/components/memory/MemoryInput";
import MemoryList from "@/components/memory/MemoryList";
import MemorySearch from "@/components/memory/MemorySearch";
import PageHeader from "@/components/shared/PageHeader";
import SectionCard from "@/components/shared/SectionCard";

export default function MemoryPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Memory"
        description="Search, store, and review memories from a clean workspace."
      />

      <div className="grid gap-6">
        <MemorySearch />
        <MemoryInput />
        <SectionCard
          title="Saved memories"
          description="Results from your latest search or saved memory list."
        >
          <MemoryList />
        </SectionCard>
      </div>
    </main>
  );
}