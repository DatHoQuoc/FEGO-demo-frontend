"use client";

import { useState } from "react";
import { MessageSquare, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types";

interface ConversationItemProps {
  conversation: Conversation;
  active?: boolean;
  onClick: () => void;
  onDelete?: () => void;
  onRename?: (newTitle: string) => void;
}

function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "Vua xong";
  if (diffMin < 60) return `${diffMin} phut truoc`;
  if (diffHr < 24) return `${diffHr} gio truoc`;
  if (diffDay < 7) return `${diffDay} ngay truoc`;
  return date.toLocaleDateString("vi-VN");
}

export function ConversationItem({
  conversation,
  active,
  onClick,
  onDelete,
  onRename,
}: ConversationItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(conversation.title);
  const [isHovered, setIsHovered] = useState(false);

  function handleRename() {
    if (editValue.trim() && onRename) {
      onRename(editValue.trim());
    }
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleRename();
    if (e.key === "Escape") {
      setEditValue(conversation.title);
      setIsEditing(false);
    }
  }

  return (
    <div
      className={cn(
        "group relative flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors cursor-pointer",
        active
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
      )}
      onClick={!isEditing ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !isEditing) onClick();
      }}
      aria-label={`Cuoc tro chuyen: ${conversation.title}`}
      aria-current={active ? "true" : undefined}
    >
      <MessageSquare className="size-4 shrink-0 opacity-50" />

      <div className="flex-1 overflow-hidden">
        {isEditing ? (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleRename}
              className="w-full rounded bg-background px-1.5 py-0.5 text-sm text-foreground outline-none ring-1 ring-border focus:ring-ring"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              onClick={(e) => {
                e.stopPropagation();
                handleRename();
              }}
            >
              <Check className="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              onClick={(e) => {
                e.stopPropagation();
                setEditValue(conversation.title);
                setIsEditing(false);
              }}
            >
              <X className="size-3" />
            </Button>
          </div>
        ) : (
          <>
            <p className="truncate font-medium">{conversation.title}</p>
            <p className="truncate text-xs opacity-50">
              {timeAgo(conversation.lastMessageAt)}
            </p>
          </>
        )}
      </div>

      {isHovered && !isEditing && (
        <div className="flex items-center gap-0.5">
          {onRename && (
            <Button
              variant="ghost"
              size="icon"
              className="size-6 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              aria-label="Doi ten"
            >
              <Pencil className="size-3" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="size-6 text-destructive opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              aria-label="Xoa"
            >
              <Trash2 className="size-3" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
