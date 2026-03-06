"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Pencil,
  ChevronDown,
  ChevronUp,
  Check,
  AlertTriangle,
  BookOpen,
  Eye,
  Lightbulb,
  PenLine,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// ============================================================
// TYPES
// ============================================================

type IntentionType = "observe" | "hint" | "solution" | "check";

type BlockType =
  | "VE"
  | "GIAI_THICH"
  | "KIEN_THUC"
  | "CAU_HOI"
  | "GOI_Y"
  | "LOI"
  | "DUNG"
  | "HIGHLIGHT"
  | "TONG_KET";

interface ParsedBlock {
  type: BlockType;
  content: string;
}

interface SummaryData {
  result: string;
  selfRate?: string;
  knowledge: string[];
  errors: string[];
  suggestion: string;
}

// ============================================================
// 1. AIMessageBlock Component
// ============================================================

interface AIMessageBlockProps {
  message: string;
  onHighlight?: (element: string) => void;
  onQuickReply?: (text: string) => void;
  onSummaryAction?: (action: "similar" | "save" | "close") => void;
}

const KEYWORD_MAP: Record<string, BlockType> = {
  "VẼ:": "VE",
  "GIẢI THÍCH:": "GIAI_THICH",
  "KIẾN THỨC:": "KIEN_THUC",
  "CÂU HỎI:": "CAU_HOI",
  "GỢI Ý:": "GOI_Y",
  "LỖI:": "LOI",
  "ĐÚNG:": "DUNG",
  "HIGHLIGHT:": "HIGHLIGHT",
  "TỔNG KẾT:": "TONG_KET",
};

function parseMessage(message: string): ParsedBlock[] {
  const keywords = Object.keys(KEYWORD_MAP);
  const blocks: ParsedBlock[] = [];

  // Create regex pattern to split by keywords
  const pattern = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");

  const parts = message.split(pattern).filter(Boolean);

  let currentType: BlockType | null = null;
  let currentContent = "";

  for (const part of parts) {
    if (KEYWORD_MAP[part]) {
      // Save previous block if exists
      if (currentType && currentContent.trim()) {
        blocks.push({ type: currentType, content: currentContent.trim() });
      }
      currentType = KEYWORD_MAP[part];
      currentContent = "";
    } else if (currentType) {
      currentContent += part;
    }
  }

  // Save last block
  if (currentType && currentContent.trim()) {
    blocks.push({ type: currentType, content: currentContent.trim() });
  }

  return blocks;
}

function extractQuickReplies(text: string): { text: string; replies: string[] } {
  const replies: string[] = [];
  const cleanText = text.replace(/\[([^\]]+)\]/g, (_, match) => {
    replies.push(match);
    return "";
  });
  return { text: cleanText.trim(), replies };
}

function parseSummary(content: string): SummaryData | null {
  try {
    // Try to extract JSON-like content
    const match = content.match(/\{[\s\S]*\}/);
    if (match) {
      // Clean up the quasi-JSON format
      const jsonStr = match[0]
        .replace(/'/g, '"')
        .replace(/(\w+):/g, '"$1":')
        .replace(/,\s*}/g, "}");
      return JSON.parse(jsonStr);
    }
  } catch {
    // Fallback: parse as plain text
  }
  return {
    result: content,
    knowledge: [],
    errors: [],
    suggestion: "",
  };
}

// Drawing block with typewriter animation
function DrawingBlock({ content }: { content: string }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const lines = content.split("\n").filter(Boolean);

  useEffect(() => {
    setVisibleLines([]);
    let index = 0;
    const interval = setInterval(() => {
      if (index < lines.length) {
        setVisibleLines((prev) => [...prev, lines[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [content]);

  return (
    <div className="rounded-2xl bg-primary p-4 font-mono text-sm text-primary-foreground">
      <div className="mb-2 flex items-center gap-2 text-xs text-primary-foreground/70">
        <Pencil className="h-4 w-4" />
        <span>Dang ve...</span>
      </div>
      <div className="space-y-1">
        {visibleLines.map((line, i) => (
          <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

// Explanation block - normal chat bubble
function ExplanationBlock({ content }: { content: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-card-foreground">
      <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
    </div>
  );
}

// Knowledge block with yellow background
function KnowledgeBlock({ content }: { content: string }) {
  return (
    <div className="rounded-2xl bg-[#FFF9E6] p-4 dark:bg-[#3D3520]">
      <div className="mb-2 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Kien thuc</span>
      </div>
      <p className="ml-6 text-sm text-amber-900 dark:text-amber-100">{content}</p>
    </div>
  );
}

// Question block with quick reply buttons
function QuestionBlock({
  content,
  onQuickReply,
}: {
  content: string;
  onQuickReply?: (text: string) => void;
}) {
  const { text, replies } = extractQuickReplies(content);

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border bg-card p-4 text-card-foreground">
        <p className="text-sm">{text}</p>
      </div>
      {replies.length > 0 && (
        <div className="flex flex-wrap gap-2 pl-2">
          {replies.map((reply, i) => (
            <button
              key={i}
              onClick={() => onQuickReply?.(reply)}
              className="rounded-full border border-secondary bg-transparent px-4 py-1.5 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
            >
              {reply}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Hint block - collapsible
function HintBlock({ content }: { content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "cursor-pointer rounded-2xl border border-secondary/30 transition-colors",
        isOpen ? "bg-[#F0F7FF] dark:bg-[#1E3A5F]" : "bg-card"
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-secondary">Goi y — nhan de mo</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-secondary" />
        ) : (
          <ChevronDown className="h-4 w-4 text-secondary" />
        )}
      </div>
      {isOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 border-t border-secondary/20 p-4 duration-200">
          <p className="text-sm text-secondary-foreground dark:text-foreground">{content}</p>
        </div>
      )}
    </div>
  );
}

// Error block
function ErrorBlock({ content }: { content: string }) {
  return (
    <div className="rounded-2xl border-l-[3px] border-l-destructive bg-[#FFF0F0] p-4 dark:bg-[#3D2020]">
      <div className="mb-2 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <span className="text-xs font-medium text-destructive">Loi</span>
      </div>
      <p className="ml-6 text-sm text-red-900 dark:text-red-100">{content}</p>
    </div>
  );
}

// Correct block
function CorrectBlock({ content }: { content: string }) {
  return (
    <div className="rounded-2xl border-l-[3px] border-l-success bg-[#F0FFF4] p-4 dark:bg-[#1A3D2A]">
      <div className="mb-2 flex items-center gap-2">
        <Check className="h-4 w-4 text-success" />
        <span className="text-xs font-medium text-success">Dung</span>
      </div>
      <p className="ml-6 text-sm text-green-900 dark:text-green-100">{content}</p>
    </div>
  );
}

// Summary block
function SummaryBlock({
  content,
  onAction,
}: {
  content: string;
  onAction?: (action: "similar" | "save" | "close") => void;
}) {
  const summary = parseSummary(content);

  return (
    <div className="rounded-2xl bg-card p-5 shadow-md">
      <h3 className="mb-4 text-base font-semibold text-card-foreground">Tong ket</h3>

      <div className="space-y-3 text-sm">
        {summary?.result && (
          <div>
            <span className="font-medium text-muted-foreground">Ket qua:</span>{" "}
            <span className="text-card-foreground">{summary.result}</span>
            {summary.selfRate && (
              <span className="ml-2 text-secondary">({summary.selfRate})</span>
            )}
          </div>
        )}

        {summary?.knowledge && summary.knowledge.length > 0 && (
          <div>
            <span className="font-medium text-muted-foreground">Kien thuc da dung:</span>
            <ul className="ml-4 mt-1 list-inside list-disc text-card-foreground">
              {summary.knowledge.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </div>
        )}

        {summary?.errors && summary.errors.length > 0 && (
          <div>
            <span className="font-medium text-destructive">Loi:</span>
            <ul className="ml-4 mt-1 list-inside list-disc text-destructive">
              {summary.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        {summary?.suggestion && (
          <div>
            <span className="font-medium text-muted-foreground">De xuat:</span>{" "}
            <span className="text-secondary">{summary.suggestion}</span>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => onAction?.("similar")}>
          Lam bai tuong tu
        </Button>
        <Button size="sm" variant="outline" onClick={() => onAction?.("save")}>
          Luu lai
        </Button>
        <Button size="sm" variant="secondary" onClick={() => onAction?.("close")}>
          Dong
        </Button>
      </div>
    </div>
  );
}

export function AIMessageBlock({
  message,
  onHighlight,
  onQuickReply,
  onSummaryAction,
}: AIMessageBlockProps) {
  const blocks = parseMessage(message);

  // Handle HIGHLIGHT blocks - don't render, just call callback
  useEffect(() => {
    blocks
      .filter((b) => b.type === "HIGHLIGHT")
      .forEach((b) => onHighlight?.(b.content));
  }, [message, onHighlight]);

  const visibleBlocks = blocks.filter((b) => b.type !== "HIGHLIGHT");

  return (
    <div className="flex max-w-[85%] flex-col gap-3">
      {visibleBlocks.map((block, i) => {
        switch (block.type) {
          case "VE":
            return <DrawingBlock key={i} content={block.content} />;
          case "GIAI_THICH":
            return <ExplanationBlock key={i} content={block.content} />;
          case "KIEN_THUC":
            return <KnowledgeBlock key={i} content={block.content} />;
          case "CAU_HOI":
            return <QuestionBlock key={i} content={block.content} onQuickReply={onQuickReply} />;
          case "GOI_Y":
            return <HintBlock key={i} content={block.content} />;
          case "LOI":
            return <ErrorBlock key={i} content={block.content} />;
          case "DUNG":
            return <CorrectBlock key={i} content={block.content} />;
          case "TONG_KET":
            return <SummaryBlock key={i} content={block.content} onAction={onSummaryAction} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

// ============================================================
// 2. IntentionCheck Component
// ============================================================

interface IntentionOption {
  id: IntentionType;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const INTENTION_OPTIONS: IntentionOption[] = [
  {
    id: "observe",
    icon: <Eye className="h-5 w-5" />,
    title: "Chi dung hinh 3D de quan sat",
    subtitle: "Xem hinh tu moi goc do, khong co loi giai",
  },
  {
    id: "hint",
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Goi y huong di tung buoc",
    subtitle: "AI hoi nguoc, ban tu suy nghi",
  },
  {
    id: "solution",
    icon: <BookOpen className="h-5 w-5" />,
    title: "Xem toan bo loi giai",
    subtitle: "Tung buoc co giai thich chi tiet",
  },
  {
    id: "check",
    icon: <PenLine className="h-5 w-5" />,
    title: "Minh da co loi giai — kiem tra giup minh",
    subtitle: "AI phan tich loi tu duy cua ban",
  },
];

interface IntentionCheckProps {
  onSelect?: (type: IntentionType) => void;
  preselected?: IntentionType;
  locked?: boolean;
}

export function IntentionCheck({ onSelect, preselected, locked = false }: IntentionCheckProps) {
  const [selected, setSelected] = useState<IntentionType | null>(preselected || null);
  const [confirmed, setConfirmed] = useState(locked);

  const handleSelect = useCallback(
    (id: IntentionType) => {
      if (confirmed) return;
      setSelected(id);
    },
    [confirmed]
  );

  const handleConfirm = useCallback(() => {
    if (!selected) return;
    setConfirmed(true);
    onSelect?.(selected);
  }, [selected, onSelect]);

  const selectedOption = INTENTION_OPTIONS.find((o) => o.id === selected);

  return (
    <div className="max-w-md rounded-2xl bg-card p-5 shadow-lg">
      <h3 className="mb-1 text-base font-semibold text-card-foreground">
        Ban muon duoc ho tro o muc nao?
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">Chon mot trong bon cach duoi day</p>

      <div className="space-y-2">
        {INTENTION_OPTIONS.map((option) => {
          const isSelected = selected === option.id;
          const isFaded = confirmed && !isSelected;

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={confirmed}
              className={cn(
                "relative w-full rounded-xl border p-4 text-left transition-all",
                isSelected
                  ? "border-secondary bg-secondary/10"
                  : "border-border bg-transparent hover:-translate-y-0.5 hover:border-secondary/50 hover:shadow-sm",
                isFaded && "opacity-50",
                confirmed && "cursor-default"
              )}
            >
              {isSelected && (
                <div className="absolute right-3 top-3">
                  <Check className="h-5 w-5 text-secondary" />
                </div>
              )}
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5",
                    isSelected ? "text-secondary" : "text-muted-foreground"
                  )}
                >
                  {option.icon}
                </div>
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      isSelected ? "text-secondary" : "text-card-foreground"
                    )}
                  >
                    {option.title}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{option.subtitle}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {!confirmed && selected && (
        <Button
          onClick={handleConfirm}
          className="mt-4 w-full gap-2"
          size="lg"
        >
          Bat dau
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}

      {confirmed && selectedOption && (
        <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
          Da chon: <span className="font-medium text-foreground">{selectedOption.title}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 3. MockConversationDemo Component
// ============================================================

interface ChatMessage {
  role: "student" | "ai";
  content: string;
  isIntentionCheck?: boolean;
  intentionType?: IntentionType;
}

const TAB_CONFIG = [
  { id: "observe" as const, label: "Quan sat", icon: <Eye className="h-4 w-4" /> },
  { id: "hint" as const, label: "Goi y", icon: <Lightbulb className="h-4 w-4" /> },
  { id: "solution" as const, label: "Loi giai", icon: <BookOpen className="h-4 w-4" /> },
  { id: "check" as const, label: "Kiem tra", icon: <PenLine className="h-4 w-4" /> },
];

// Shared opening for all tabs
const SHARED_OPENING: ChatMessage[] = [
  {
    role: "student",
    content:
      "Cho hinh chop S.ABCD co day la hinh vuong canh a, SA vuong goc voi day. Tinh goc giua SC va mat phang day.",
  },
  {
    role: "ai",
    content:
      'GIẢI THÍCH: Minh hieu de nhu sau: Hinh chop S.ABCD co day ABCD la hinh vuong canh a, canh SA vuong goc voi mat phang day. Can tim goc giua duong thang SC va mat phang (ABCD). Dung khong?',
  },
  { role: "student", content: "Dung roi" },
];

// Tab-specific conversations
const TAB_CONVERSATIONS: Record<IntentionType, ChatMessage[]> = {
  observe: [
    { role: "ai", content: "", isIntentionCheck: true, intentionType: "observe" },
    {
      role: "ai",
      content:
        "VẼ: Dung day ABCD hinh vuong canh a\nVẼ: Dung SA vuong goc day\nVẼ: Noi S voi B, C, D\nHIGHLIGHT: Canh SC",
    },
    {
      role: "ai",
      content:
        "GIẢI THÍCH: Ban co the keo de xoay hinh tu moi goc. Thu nhin tu tren xuong de thay day, hoac nhin ngang de thay SA thang dung.",
    },
    {
      role: "ai",
      content: "CÂU HỎI: Ban muon kham pha them khong? [Xoay 3D] [Thu nhanh khac] [Xem tong ket]",
    },
    {
      role: "ai",
      content:
        "TỔNG KẾT: {result: 'Quan sat hoan thanh', knowledge: ['Hinh chop dung', 'SA ⊥ mp(ABCD)'], errors: [], suggestion: 'Thu tu giai hoac xem goi y tung buoc'}",
    },
  ],
  hint: [
    { role: "ai", content: "", isIntentionCheck: true, intentionType: "hint" },
    {
      role: "ai",
      content:
        "VẼ: Dung hinh chop S.ABCD, highlight SC\nKIẾN THỨC: Goc giua duong thang va mat phang = goc giua duong thang do voi hinh chieu cua no\nCÂU HỎI: Hinh chieu cua SC xuong day la doan nao? [AC] [BC] [AB] [Chua biet]",
    },
    { role: "student", content: "AC" },
    {
      role: "ai",
      content:
        "ĐÚNG: Chinh xac! SC chieu xuong day la AC.\nHIGHLIGHT: Doan AC\nCÂU HỎI: Vay goc can tinh la goc nao trong tam giac SAC? [Goc SCA] [Goc SAC] [Goc ASC]",
    },
    { role: "student", content: "Goc SCA" },
    {
      role: "ai",
      content:
        "ĐÚNG: Dung roi!\nKIẾN THỨC: Duong cheo hinh vuong canh a = a√2\nCÂU HỎI: Vay AC = bao nhieu? [a√2] [a√3] [2a]",
    },
    { role: "student", content: "a√2" },
    {
      role: "ai",
      content:
        "ĐÚNG: Hoan hao!\nGIẢI THÍCH: tan(SCA) = SA/AC = a/(a√2) = 1/√2\n→ Goc SCA = arctan(1/√2) ≈ 35°16'",
    },
    {
      role: "ai",
      content: "CÂU HỎI: Ban da xong bai nay, xem tong ket khong? [Xem tong ket] [Hoi them]",
    },
    { role: "student", content: "Xem tong ket" },
    {
      role: "ai",
      content:
        "TỔNG KẾT: {result: '3/3 buoc dung', selfRate: '70%', knowledge: ['Hinh chieu duong thang ⚠️', 'Duong cheo hinh vuong ✅', 'arctan co ban ✅'], errors: [], suggestion: 'Thu bai: Goc giua 2 mat phang — Do kho ↑'}",
    },
  ],
  solution: [
    { role: "ai", content: "", isIntentionCheck: true, intentionType: "solution" },
    { role: "ai", content: "VẼ: Dung hinh chop S.ABCD day du" },
    {
      role: "ai",
      content:
        "GIẢI THÍCH: Buoc 1 — Xac dinh hinh chieu cua SC\nVi SA ⊥ mp(ABCD), hinh chieu cua SC xuong day la AC.\nHIGHLIGHT: Canh AC",
    },
    {
      role: "ai",
      content:
        "GIẢI THÍCH: Buoc 2 — Tinh AC\nABCD la hinh vuong canh a → AC = a√2\nHIGHLIGHT: Duong cheo AC",
    },
    {
      role: "ai",
      content:
        "GIẢI THÍCH: Buoc 3 — Xac dinh goc\nGoc(SC, mp) = goc SCA\nHIGHLIGHT: Goc tai C",
    },
    {
      role: "ai",
      content:
        "GIẢI THÍCH: Buoc 4 — Tinh goc SCA\ntan(SCA) = SA/AC = a/a√2 = 1/√2\n→ Goc SCA = arctan(1/√2) ≈ 35°16'",
    },
    {
      role: "ai",
      content: "CÂU HỎI: Xem tong ket nhe? [Xem tong ket] [Hoi them ve bai nay]",
    },
    {
      role: "ai",
      content:
        "TỔNG KẾT: {result: 'Da xem loi giai', knowledge: ['Hinh chieu duong thang', 'Duong cheo hinh vuong', 'arctan'], errors: [], suggestion: 'Lan sau thu che do goi y de tu luc hon'}",
    },
  ],
  check: [
    { role: "ai", content: "", isIntentionCheck: true, intentionType: "check" },
    {
      role: "ai",
      content: "GIẢI THÍCH: Gui loi giai cua ban len nhe, go hoac chup anh deu duoc.",
    },
    {
      role: "student",
      content:
        "Goc giua SC va day = goc SCB vi SB la hinh chieu cua SC. tan(SCB) = SA/SB...",
    },
    {
      role: "ai",
      content:
        "ĐÚNG: Buoc 1 — Nhan ra can tim hinh chieu ✓\nLỖI: Buoc 2 — Xac dinh hinh chieu la SB ✗\nLoai loi: Sai tu duy khong gian\nBan dang hinh dung SC chieu theo huong ngang thay vi thang dung.",
    },
    {
      role: "ai",
      content:
        "HIGHLIGHT: Diem S chieu xuong A\nGIẢI THÍCH: Vi SA ⊥ day, hinh chieu cua S xuong day chinh la A — khong phai B.\nCÂU HỎI: Vay hinh chieu cua SC la doan nao? [AC] [BC] [AB]",
    },
    { role: "student", content: "AC" },
    { role: "ai", content: "ĐÚNG: Dung roi! Ban da tu sua duoc loi." },
    {
      role: "ai",
      content: "CÂU HỎI: Xem tong ket khong? [Xem tong ket] [Lam lai tu dau]",
    },
    {
      role: "ai",
      content:
        "TỔNG KẾT: {result: '3/4 buoc dung', knowledge: ['Hinh chieu duong thang ⚠️'], errors: ['Sai tu duy khong gian — buoc xac dinh hinh chieu'], suggestion: 'Luyen them: Hinh chieu trong hinh chop — Do kho tuong duong'}",
    },
  ],
};

// Student message bubble
function StudentBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-xs rounded-2xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
        {content}
      </div>
    </div>
  );
}

// AI message wrapper
function AIBubble({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-start">{children}</div>;
}

export function MockConversationDemo() {
  const [activeTab, setActiveTab] = useState<IntentionType>("observe");

  const messages = [...SHARED_OPENING, ...TAB_CONVERSATIONS[activeTab]];

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Tab bar */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-secondary text-secondary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <ScrollArea className="flex-1">
        <div className="mx-auto max-w-2xl space-y-4 p-4">
          {messages.map((msg, i) => {
            if (msg.role === "student") {
              return <StudentBubble key={i} content={msg.content} />;
            }

            if (msg.isIntentionCheck) {
              return (
                <AIBubble key={i}>
                  <IntentionCheck preselected={msg.intentionType} locked />
                </AIBubble>
              );
            }

            return (
              <AIBubble key={i}>
                <AIMessageBlock
                  message={msg.content}
                  onHighlight={(el) => console.log("Highlight:", el)}
                  onQuickReply={(text) => console.log("Quick reply:", text)}
                  onSummaryAction={(action) => console.log("Summary action:", action)}
                />
              </AIBubble>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
