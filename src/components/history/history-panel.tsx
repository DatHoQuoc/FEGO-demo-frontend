"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConversationItem } from "@/components/history/conversation-item";
import type { Conversation } from "@/types";

interface HistoryPanelProps {
  conversations: Conversation[];
  currentId?: string;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string, newTitle: string) => void;
}

interface GroupedConversations {
  label: string;
  conversations: Conversation[];
}

function groupByDate(
  conversations: Conversation[],
  now: Date
): GroupedConversations[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const last7Days = new Date(today.getTime() - 7 * 86400000);
  const last30Days = new Date(today.getTime() - 30 * 86400000);

  const groups: GroupedConversations[] = [
    { label: "Hom nay", conversations: [] },
    { label: "Hom qua", conversations: [] },
    { label: "7 ngay truoc", conversations: [] },
    { label: "30 ngay truoc", conversations: [] },
    { label: "Truoc do", conversations: [] },
  ];

  const sorted = [...conversations].sort(
    (a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
  );

  for (const conv of sorted) {
    const d = conv.lastMessageAt;
    if (d >= today) groups[0].conversations.push(conv);
    else if (d >= yesterday) groups[1].conversations.push(conv);
    else if (d >= last7Days) groups[2].conversations.push(conv);
    else if (d >= last30Days) groups[3].conversations.push(conv);
    else groups[4].conversations.push(conv);
  }

  return groups.filter((g) => g.conversations.length > 0);
}

export function HistoryPanel({
  conversations,
  currentId,
  onSelect,
  onDelete,
  onRename,
}: HistoryPanelProps) {
  const [mounted, setMounted] = useState(false);
  const [groups, setGroups] = useState<GroupedConversations[]>([]);

  useEffect(() => {
    setMounted(true);
    setGroups(groupByDate(conversations, new Date()));
  }, [conversations]);

  if (!mounted) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <p className="text-center text-sm text-muted-foreground">
          Dang tai...
        </p>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <p className="text-center text-sm text-muted-foreground">
          Chua co cuoc tro chuyen nao
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-4 px-2 py-2">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="mb-1 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.conversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  active={conv.id === currentId}
                  onClick={() => onSelect(conv.id)}
                  onDelete={onDelete ? () => onDelete(conv.id) : undefined}
                  onRename={
                    onRename
                      ? (newTitle: string) => onRename(conv.id, newTitle)
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
