import LoadingState from "@/components/shared/LoadingState";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex w-full max-w-[80%] flex-col gap-1.5">
        <span className="px-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Forge
        </span>
        <div className="inline-flex items-center rounded-2xl rounded-bl-sm border border-border/60 bg-muted/80 px-4 py-3 shadow-sm">
          <LoadingState className="text-muted-foreground/70" />
          <span className="sr-only">Typing</span>
        </div>
      </div>
    </div>
  );
}