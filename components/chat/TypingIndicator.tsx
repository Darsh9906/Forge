export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex w-full max-w-[80%] flex-col gap-1.5">
        <span className="px-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Forge
        </span>
        <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border/60 bg-muted/80 px-4 py-3 shadow-sm">
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/70 [animation-delay:-0.2s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/70 [animation-delay:-0.1s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/70" />
          <span className="sr-only">Typing</span>
        </div>
      </div>
    </div>
  );
}