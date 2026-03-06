"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Bot, AlertCircle, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AIMessageBlock, IntentionCheck } from "@/components/conversation";
import { cn } from "@/lib/utils";
import type { Message } from "@/types";

type IntentionType = "observe" | "hint" | "solution" | "check";

interface MessageBubbleProps {
  message: Message;
  onQuickReply?: (text: string) => void;
  onHighlight?: (element: string) => void;
  onSummaryAction?: (action: "similar" | "save" | "close") => void;
  onIntentionSelect?: (intention: IntentionType) => void;
}

export function MessageBubble({
  message,
  onQuickReply,
  onHighlight,
  onSummaryAction,
  onIntentionSelect,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState<string>("");
  const isUser = message.role === "user";

  // Check if this is an IntentionCheck message
  const isIntentionCheck = !isUser && message.content === "__INTENTION_CHECK__";

  // Check if AI message has special keywords that should use AIMessageBlock
  const hasSpecialKeywords =
    !isUser &&
    !isIntentionCheck &&
    (message.content.includes("VẼ:") ||
      message.content.includes("GIẢI THÍCH:") ||
      message.content.includes("KIẾN THỨC:") ||
      message.content.includes("CÂU HỎI:") ||
      message.content.includes("GỢI Ý:") ||
      message.content.includes("LỖI:") ||
      message.content.includes("ĐÚNG:") ||
      message.content.includes("TỔNG KẾT:"));

  // Format time on client only to avoid hydration mismatch
  useEffect(() => {
    setTimeString(
      message.timestamp.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [message.timestamp]);

  async function handleCopy() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cn(
        "group flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <Avatar className="mt-0.5 size-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="size-4" />
          </AvatarFallback>
        </Avatar>
      )}

      {/* Content */}
      <div
        className={cn("flex max-w-[85%] flex-col gap-1", isUser && "items-end")}
      >
        {/* Render IntentionCheck component */}
        {isIntentionCheck ? (
          <IntentionCheck onSelect={onIntentionSelect} />
        ) : /* Render AI messages with special keywords using AIMessageBlock */
        hasSpecialKeywords ? (
          <AIMessageBlock
            message={message.content}
            onQuickReply={onQuickReply}
            onHighlight={onHighlight}
            onSummaryAction={onSummaryAction}
          />
        ) : (
          <div
            className={cn(
              "relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
              isUser
                ? "rounded-br-md bg-primary text-primary-foreground"
                : "rounded-bl-md bg-card text-card-foreground border border-border"
            )}
          >
            {/* Image preview */}
            {message.imageUrl && (
              <div className="mb-2 overflow-hidden rounded-lg">
                <img
                  src={message.imageUrl}
                  alt="Hinh anh de bai"
                  className="max-h-48 w-auto rounded-lg object-cover"
                />
              </div>
            )}

            {/* Message content */}
            <p className="whitespace-pre-wrap">{message.content}</p>

            {/* Status indicator */}
            {message.status === "sending" && (
              <Loader2 className="mt-1 size-3 animate-spin opacity-50" />
            )}
            {message.status === "error" && (
              <div className="mt-1 flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="size-3" />
                <span>Loi gui tin nhan</span>
              </div>
            )}
          </div>
        )}

        {/* Metadata row */}
        <div
          className={cn(
            "flex items-center gap-2 px-1",
            isUser ? "flex-row-reverse" : "flex-row"
          )}
        >
          {timeString && (
            <span className="text-[10px] text-muted-foreground">
              {timeString}
            </span>
          )}

          {/* Copy button */}
          {!isUser && (
            <Button
              variant="ghost"
              size="icon"
              className="size-5 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleCopy}
              aria-label="Sao chep"
            >
              {copied ? (
                <Check className="size-3 text-success" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
