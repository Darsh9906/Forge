type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({
  role,
  content,
}: MessageBubbleProps) {
  const isUser = role === "user";
  const roleLabel = isUser ? "You" : "Forge";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex w-full max-w-[80%] flex-col gap-1.5">
        <span className={`px-1 text-xs font-medium uppercase tracking-[0.2em] ${isUser ? "text-primary/80 text-right" : "text-muted-foreground"}`}>
          {roleLabel}
        </span>
        <div
          className={`rounded-2xl px-4 py-3 whitespace-pre-wrap shadow-sm ${
            isUser
              ? "ml-auto rounded-br-sm bg-primary text-primary-foreground"
              : "rounded-bl-sm border border-border/60 bg-muted/80 text-foreground"
          }`}
        >
          <p className="text-sm leading-6">{content}</p>
        </div>
      </div>
    </div>
  );
}