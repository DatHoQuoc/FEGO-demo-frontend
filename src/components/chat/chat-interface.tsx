"use client";

import { useState, useCallback } from "react";
import { MessageList } from "@/components/chat/message-list";
import { ProblemInputForm } from "@/components/chat/problem-input-form";
import type { Message, ProblemInput } from "@/types";

type IntentionType = "observe" | "hint" | "solution" | "check";

interface ChatInterfaceProps {
  conversationId?: string;
  messages: Message[];
  onSendMessage: (data: ProblemInput) => Promise<void>;
  loading?: boolean;
  onQuickReply?: (text: string) => void;
  onHighlight?: (element: string) => void;
  onSummaryAction?: (action: "similar" | "save" | "close") => void;
  onIntentionSelect?: (intention: IntentionType) => void;
}

export function ChatInterface({
  messages,
  onSendMessage,
  loading,
  onQuickReply,
  onHighlight,
  onSummaryAction,
  onIntentionSelect,
}: ChatInterfaceProps) {
  const [prefill, setPrefill] = useState("");

  const handleHintClick = useCallback((hint: string) => {
    setPrefill(hint);
  }, []);

  const handleSubmit = useCallback(
    async (data: ProblemInput) => {
      setPrefill("");
      await onSendMessage(data);
    },
    [onSendMessage]
  );

  // Handle quick reply - could be from AIMessageBlock or hints
  const handleQuickReply = useCallback(
    (text: string) => {
      if (onQuickReply) {
        onQuickReply(text);
      } else {
        // Default: prefill the input
        setPrefill(text);
      }
    },
    [onQuickReply]
  );

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <MessageList
        messages={messages}
        onHintClick={handleHintClick}
        onQuickReply={handleQuickReply}
        onHighlight={onHighlight}
        onSummaryAction={onSummaryAction}
        onIntentionSelect={onIntentionSelect}
      />
      <ProblemInputForm
        onSubmit={handleSubmit}
        loading={loading}
        prefillText={prefill}
      />
    </div>
  );
}
