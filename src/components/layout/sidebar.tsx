"use client";

import { Plus, PanelLeftClose, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HistoryPanel } from "@/components/history/history-panel";
import { JobStatusPanel } from "@/components/processing/job-status-panel";
import { cn } from "@/lib/utils";
import type { Conversation, Job } from "@/types";

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId?: string;
  onConversationSelect: (id: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onToggle: () => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string, newTitle: string) => void;
  jobs?: Job[];
  onJobClick?: (jobId: string) => void;
}

export function Sidebar({
  conversations,
  currentConversationId,
  onConversationSelect,
  onNewChat,
  isOpen,
  onToggle,
  onDelete,
  onRename,
  jobs = [],
  onJobClick,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = searchQuery
    ? conversations.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-border bg-sidebar-bg transition-transform duration-300 ease-in-out md:relative md:z-auto",
          isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden md:border-0"
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between border-b border-border p-3">
          <Button
            onClick={onNewChat}
            className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            size="sm"
          >
            <Plus className="size-4" />
            <span>Tro chuyen moi</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 size-8 shrink-0 text-muted-foreground hover:text-foreground"
            onClick={onToggle}
            aria-label="Dong sidebar"
          >
            <PanelLeftClose className="size-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="border-b border-border px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tim kiem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 bg-secondary pl-8 text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Job status */}
        {jobs.length > 0 && (
          <div className="border-b border-border">
            <JobStatusPanel jobs={jobs} onJobClick={onJobClick} />
          </div>
        )}

        {/* Conversation list */}
        <HistoryPanel
          conversations={filtered}
          currentId={currentConversationId}
          onSelect={onConversationSelect}
          onDelete={onDelete}
          onRename={onRename}
        />
      </aside>
    </>
  );
}
