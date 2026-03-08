"use client"

import { useState } from "react"
import { LogOut, User, Bell, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface QueueTopBarProps {
  activeTab: "queue" | "stats"
}

const notifications = [
  { id: 1, message: "Bai #252 vua vao hang doi", detail: "Hinh cau · 8 phut truoc" },
  { id: 2, message: "Bai #253 vua vao hang doi", detail: "Hinh lang tru · 15 phut truoc" },
  { id: 3, message: "Bai #248 da duoc Thay Minh phe duyet", detail: "1 gio truoc" },
]

export function QueueTopBar({ activeTab }: QueueTopBarProps) {
  const [notificationOpen, setNotificationOpen] = useState(false)
  const router = useRouter();
  return (
    <header className="h-14 bg-[#1D3557] flex items-center justify-between px-6 shrink-0">
      {/* Left - Logo + Dashboard Label */}
      <div className="flex items-center gap-3" onClick={() => {
            router.push('/navigation');
          }}>
         <Image
            src="/images/logo.svg"        // path inside /public folder
            alt="VisualEdu Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
        <span className="text-white/80 text-sm">Moderator Dashboard</span>
      </div>

      {/* Center - Tabs */}
      <div className="flex items-center gap-1">
        <Link 
          href="/moderator"
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === "queue" 
              ? "text-white" 
              : "text-white/60 hover:text-white/80"
          }`}
        >
          Hang doi
          {activeTab === "queue" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A8DADC]" />
          )}
        </Link>
        <Link 
          href="/moderator/stats"
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === "stats" 
              ? "text-white" 
              : "text-white/60 hover:text-white/80"
          }`}
        >
          Thong ke cua toi
          {activeTab === "stats" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A8DADC]" />
          )}
        </Link>
        
        {/* Demo Links */}
        <div className="h-4 w-px bg-white/20 mx-2" />
        <Link 
          href="/moderator/notifications"
          className="px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white/80 transition-colors bg-white/5 rounded"
        >
          Demo: Thong bao
        </Link>
        <Link 
          href="/moderator/badges"
          className="px-3 py-1.5 text-xs font-medium text-white/50 hover:text-white/80 transition-colors bg-white/5 rounded"
        >
          Demo: Badges
        </Link>
      </div>

      {/* Right - Session Timer, Notifications, User + Logout */}
      <div className="flex items-center gap-4">
        {/* Session Timer */}
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <Clock className="h-4 w-4" />
          <span>Phien lam viec: 2 gio 15 phut</span>
        </div>

        {/* Notification Bell */}
        <DropdownMenu open={notificationOpen} onOpenChange={setNotificationOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white/80 hover:bg-white/10 hover:text-white relative p-2"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#E63946] text-white text-xs border-0">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white border-[#A8DADC]">
            {notifications.map((notif) => (
              <DropdownMenuItem key={notif.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <span className="text-sm text-[#1D3557] font-medium">{notif.message}</span>
                <span className="text-xs text-[#457B9D]">{notif.detail}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#457B9D] flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="text-white text-sm">Nguyễn Văn A</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-white/80 hover:bg-white/10 hover:text-white gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Dang xuat</span>
        </Button>
      </div>
    </header>
  )
}
