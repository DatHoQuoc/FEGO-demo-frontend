"use client";

import { Triangle } from "lucide-react";
import { TokenDisplay } from "@/components/user/token-display";
import { UserMenu } from "@/components/user/user-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import type { User } from "@/types";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';


interface TopBarProps {
  onMenuClick?: () => void;
  onMenuMouseEnter?: () => void;
  user: User;
  onLogout: () => void;
  className?: string;
}

export function TopBar({
  onMenuClick,
  onMenuMouseEnter,
  user,
  onLogout,
  className,
}: TopBarProps) {
  const router = useRouter();


  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-background/95 px-5 backdrop-blur-sm",
        className
      )}
    >
      {/* Left — Logo + brand */}
      <div className="flex items-center gap-3">
        {/* Logo button — hovering this triggers sidebar */}
        <button
          className="group flex items-center gap-2.5 rounded-lg px-1 py-1 transition-opacity hover:opacity-80 focus:outline-none"
          onClick={() => {
            router.push('/navigation');
            onMenuClick?.();
          }}
          onMouseEnter={onMenuMouseEnter}
          aria-label="Toggle menu"
        >
          <div className="relative flex size-8 items-center justify-center rounded-lg bg-primary shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Triangle className="size-[14px] fill-primary-foreground text-primary-foreground" />
            {/* Subtle glow on hover */}
            <span className="absolute inset-0 rounded-lg opacity-0 shadow-[0_0_12px_2px] shadow-primary transition-opacity duration-200 group-hover:opacity-40" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            VisualEdu
          </span>
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-border/70" />

        {/* Breadcrumb / context label */}
        <span className="hidden text-xs font-medium text-muted-foreground sm:block">
          Workspace
        </span>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-1.5">
        <TokenDisplay tokens={user.tokens} maxTokens={user.maxTokens} />

        <div className="h-5 w-px bg-border/70 mx-1" />

        <ThemeToggle />
        <UserMenu user={user} onLogout={onLogout} />
      </div>
    </header>
  );
}