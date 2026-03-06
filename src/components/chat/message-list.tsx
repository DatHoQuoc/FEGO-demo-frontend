"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/components/chat/message-bubble";
import { Triangle } from "lucide-react";
import type { Message } from "@/types";

type IntentionType = "observe" | "hint" | "solution" | "check";

interface MessageListProps {
  messages: Message[];
  onHintClick?: (hint: string) => void;
  onQuickReply?: (text: string) => void;
  onHighlight?: (element: string) => void;
  onSummaryAction?: (action: "similar" | "save" | "close") => void;
  onIntentionSelect?: (intention: IntentionType) => void;
}

export function MessageList({
  messages,
  onHintClick,
  onQuickReply,
  onHighlight,
  onSummaryAction,
  onIntentionSelect,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-secondary">
          <Triangle className="size-8 text-primary" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Chao mung den voi VisualEdu
          </h2>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            Nhap de bai hinh hoc de bat dau. He thong se phan tich va tao hinh
            minh hoa 3D tuong tac cho ban.
          </p>
        </div>
        <div className="mt-4 grid max-w-lg grid-cols-2 gap-3">
          {[
            "Cho hinh chop S.ABCD co day la hinh vuong canh a",
            "Tinh khoang cach tu diem den mat phang",
            "Goc giua hai mat phang trong hinh chop tu giac deu",
            "The tich khoi chop co day la hinh binh hanh",
          ].map((hint) => (
            <button
              key={hint}
              onClick={() => onHintClick?.(hint)}
              className="rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-left text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {hint}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 md:px-6">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onQuickReply={onQuickReply}
              onHighlight={onHighlight}
              onSummaryAction={onSummaryAction}
              onIntentionSelect={onIntentionSelect}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
