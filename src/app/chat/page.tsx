"use client";

import { useState, useCallback, useRef } from "react";
import { TopBar } from "@/components/layout/top-bar";
import { Sidebar } from "@/components/layout/sidebar";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ProcessingScreen } from "@/components/processing/processing-screen";
import { GeometryViewer } from "@/components/3d/geometry-viewer";
import type {
  User,
  Conversation,
  Message,
  ProblemInput,
  ProcessingStage,
  Job,
} from "@/types";

// Layout states
type LayoutMode = "chat" | "split-processing" | "split-3d";

// Conversation flow states
type ConversationState =
  | "idle"
  | "awaiting_confirmation"
  | "awaiting_intention"
  | "branch_active";

type IntentionType = "observe" | "hint" | "solution" | "check";

const BRANCH_CONVERSATIONS: Record<
  IntentionType,
  Array<{ role: "assistant"; content: string }>
> = {
  observe: [
    {
      role: "assistant",
      content:
        "VẼ: Dung day ABCD hinh vuong canh a\nVẼ: Dung SA vuong goc day\nVẼ: Noi S voi B, C, D\nHIGHLIGHT: Canh SC",
    },
    {
      role: "assistant",
      content:
        "GIẢI THÍCH: Ban co the keo de xoay hinh tu moi goc. Thu nhin tu tren xuong de thay day, hoac nhin ngang de thay SA thang dung.",
    },
    {
      role: "assistant",
      content:
        "CÂU HỎI: Ban muon kham pha them khong? [Xoay 3D] [Thu nhanh khac] [Xem tong ket]",
    },
  ],
  hint: [
    {
      role: "assistant",
      content:
        "VẼ: Dung hinh chop S.ABCD, highlight SC\nKIẾN THỨC: Goc giua duong thang va mat phang = goc giua duong thang do voi hinh chieu cua no\nCÂU HỎI: Hinh chieu cua SC xuong day la doan nao? [AC] [BC] [AB] [Chua biet]",
    },
  ],
  solution: [
    { role: "assistant", content: "VẼ: Dung hinh chop S.ABCD day du" },
    {
      role: "assistant",
      content:
        "GIẢI THÍCH: Buoc 1 — Xac dinh hinh chieu cua SC\nVi SA ⊥ mp(ABCD), hinh chieu cua SC xuong day la AC.\nHIGHLIGHT: Canh AC",
    },
    {
      role: "assistant",
      content:
        "GIẢI THÍCH: Buoc 2 — Tinh AC\nABCD la hinh vuong canh a → AC = a√2\nHIGHLIGHT: Duong cheo AC",
    },
    {
      role: "assistant",
      content:
        "GIẢI THÍCH: Buoc 3 — Xac dinh goc\nGoc(SC, mp) = goc SCA\nHIGHLIGHT: Goc tai C",
    },
    {
      role: "assistant",
      content:
        "GIẢI THÍCH: Buoc 4 — Tinh goc SCA\ntan(SCA) = SA/AC = a/a√2 = 1/√2\n→ Goc SCA = arctan(1/√2) ≈ 35°16'",
    },
    {
      role: "assistant",
      content:
        "CÂU HỎI: Xem tong ket nhe? [Xem tong ket] [Hoi them ve bai nay]",
    },
  ],
  check: [
    {
      role: "assistant",
      content:
        "GIẢI THÍCH: Gui loi giai cua ban len nhe, go hoac chup anh deu duoc.",
    },
  ],
};

const MOCK_USER: User = {
  id: "u1",
  name: "Nguyen Van A",
  email: "nguyenvana@edu.vn",
  tokens: 1250,
  maxTokens: 5000,
  tier: "pro",
};

const DEFAULT_STAGES: ProcessingStage[] = [
  { id: "s1", label: "Phan tich de bai", status: "pending" },
  { id: "s2", label: "Tim he toa do", status: "pending" },
  { id: "s3", label: "Xay dung hinh hoc", status: "pending" },
  { id: "s4", label: "Kiem tra", status: "pending" },
  { id: "s5", label: "Ve hinh 3D", status: "pending" },
];

const STAGE_MESSAGES = [
  "Dang phan tich de bai",
  "Dang tim he toa do phu hop",
  "Dang xay dung hinh hoc",
  "Dang kiem tra ket qua",
  "Dang ve hinh 3D",
];

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function createSampleConversations(): Conversation[] {
  const now = new Date();
  return [
    {
      id: "c1",
      userId: "u1",
      title: "Hinh chop S.ABCD day hinh vuong",
      messages: [],
      createdAt: new Date(now.getTime() - 3600000),
      updatedAt: new Date(now.getTime() - 3600000),
      lastMessageAt: new Date(now.getTime() - 3600000),
    },
    {
      id: "c2",
      userId: "u1",
      title: "Khoang cach tu diem den mat phang",
      messages: [],
      createdAt: new Date(now.getTime() - 7200000),
      updatedAt: new Date(now.getTime() - 7200000),
      lastMessageAt: new Date(now.getTime() - 7200000),
    },
    {
      id: "c3",
      userId: "u1",
      title: "Goc giua hai mat phang",
      messages: [],
      createdAt: new Date(now.getTime() - 86400000 * 2),
      updatedAt: new Date(now.getTime() - 86400000 * 2),
      lastMessageAt: new Date(now.getTime() - 86400000 * 2),
    },
    {
      id: "c4",
      userId: "u1",
      title: "The tich khoi lang tru",
      messages: [],
      createdAt: new Date(now.getTime() - 86400000 * 5),
      updatedAt: new Date(now.getTime() - 86400000 * 5),
      lastMessageAt: new Date(now.getTime() - 86400000 * 5),
    },
  ];
}

export default function HomePage() {
  // Layout
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("chat");
  const [sidebarHovered, setSidebarHovered] = useState(false);

  // Conversations
  const [conversations, setConversations] = useState<Conversation[]>(
    createSampleConversations
  );
  const [currentConversationId, setCurrentConversationId] = useState<
    string | undefined
  >(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  // Conversation flow
  const [conversationState, setConversationState] =
    useState<ConversationState>("idle");
  const [selectedIntention, setSelectedIntention] =
    useState<IntentionType | null>(null);
  const [pendingProblem, setPendingProblem] = useState<string>("");

  // Processing
  const [progress, setProgress] = useState(0);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [stages, setStages] = useState<ProcessingStage[]>(DEFAULT_STAGES);
  const [estimatedSeconds] = useState(12);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Jobs
  const [jobs, setJobs] = useState<Job[]>([]);
  const currentJobIdRef = useRef<string | null>(null);
  const processingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ---- Handlers ----

  const handleNewChat = useCallback(() => {
    const id = generateId();
    const newConv: Conversation = {
      id,
      userId: "u1",
      title: "Cuoc tro chuyen moi",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      lastMessageAt: new Date(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setCurrentConversationId(id);
    setMessages([]);
    setLayoutMode("chat");
    setConversationState("idle");
    setSelectedIntention(null);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setCurrentConversationId(id);
    setMessages([]);
    setLayoutMode("chat");
    setConversationState("idle");
    setSelectedIntention(null);
  }, []);

  const handleDeleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (currentConversationId === id) {
        setCurrentConversationId(undefined);
        setMessages([]);
        setLayoutMode("chat");
      }
    },
    [currentConversationId]
  );

  const handleRenameConversation = useCallback(
    (id: string, newTitle: string) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, title: newTitle, updatedAt: new Date() } : c
        )
      );
    },
    []
  );

  const startProcessingSimulation = useCallback(
    (intention?: IntentionType) => {
      setLayoutMode("split-processing");
      setProgress(0);
      setCurrentStageIdx(0);
      setElapsedSeconds(0);

      const freshStages: ProcessingStage[] = DEFAULT_STAGES.map((s, i) => ({
        ...s,
        status: i === 0 ? ("active" as const) : ("pending" as const),
      }));
      setStages(freshStages);

      const jobId = generateId();
      currentJobIdRef.current = jobId;
      const newJob: Job = {
        jobId,
        conversationId: currentConversationId || "",
        status: "processing",
        progress: 0,
        currentStage: 0,
        stages: freshStages,
        estimatedSeconds: 25,
        elapsedSeconds: 0,
        createdAt: new Date(),
      };
      setJobs((prev) => [newJob, ...prev]);

      let elapsed = 0;
      let stageIdx = 0;

      processingTimerRef.current = setInterval(() => {
        elapsed += 1;
        setElapsedSeconds(elapsed);

        const totalStages = DEFAULT_STAGES.length;
        const newProgress = Math.min(100, (elapsed / 12) * 100);
        setProgress(newProgress);

        const newStageIdx = Math.min(
          totalStages - 1,
          Math.floor((elapsed / 12) * totalStages)
        );
        if (newStageIdx !== stageIdx) {
          stageIdx = newStageIdx;
          setCurrentStageIdx(stageIdx);
          setStages((prev) =>
            prev.map((s, i) => ({
              ...s,
              status:
                i < stageIdx
                  ? ("complete" as const)
                  : i === stageIdx
                    ? ("active" as const)
                    : ("pending" as const),
            }))
          );
        }

        setJobs((prev) =>
          prev.map((j) =>
            j.jobId === jobId
              ? {
                  ...j,
                  progress: newProgress,
                  currentStage: stageIdx,
                  elapsedSeconds: elapsed,
                  stages: DEFAULT_STAGES.map((s, i) => ({
                    ...s,
                    status:
                      i < stageIdx
                        ? ("complete" as const)
                        : i === stageIdx
                          ? ("active" as const)
                          : ("pending" as const),
                  })),
                }
              : j
          )
        );

        if (elapsed >= 12) {
          if (processingTimerRef.current)
            clearInterval(processingTimerRef.current);

          setStages((prev) =>
            prev.map((s) => ({ ...s, status: "complete" as const }))
          );
          setProgress(100);

          setJobs((prev) =>
            prev.map((j) =>
              j.jobId === jobId
                ? {
                    ...j,
                    status: "complete" as const,
                    progress: 100,
                    stages: DEFAULT_STAGES.map((s) => ({
                      ...s,
                      status: "complete" as const,
                    })),
                  }
                : j
            )
          );

          setTimeout(() => {
            currentJobIdRef.current = null;

            // Switch right panel from processing → 3D viewer
            setLayoutMode("split-3d");

            const branchIntent = intention || selectedIntention;
            const branchMessages = branchIntent
              ? BRANCH_CONVERSATIONS[branchIntent]
              : [];

            let delay = 0;
            branchMessages.forEach((msg) => {
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev.filter((m) => m.status !== "sending"),
                  {
                    id: generateId(),
                    conversationId: currentConversationId || "",
                    role: "assistant",
                    content: msg.content,
                    timestamp: new Date(),
                    status: "sent",
                  },
                ]);
              }, delay);
              delay += 800;
            });

            if (!branchIntent) {
              setMessages((prev) => [
                ...prev.filter(
                  (m) => m.status !== "sending" || m.role !== "assistant"
                ),
                {
                  id: generateId(),
                  conversationId: currentConversationId || "",
                  role: "assistant",
                  content:
                    "VẼ: Dung day ABCD hinh vuong canh a\nVẼ: Dung SA vuong goc day tai A\nVẼ: Noi S voi B, C, D\nGIẢI THÍCH: Da hoan thanh phan tich hinh chop S.ABCD.\nCÂU HỎI: Ban muon lam gi tiep theo? [Tinh goc SC va day] [Tinh khoang cach] [Xem them vi du]",
                  timestamp: new Date(),
                  status: "sent",
                },
              ]);
            }
          }, 800);
        }
      }, 1000);
    },
    [currentConversationId, selectedIntention]
  );

  const handleBranchResponse = useCallback(
    (text: string, convId: string) => {
      const lowerText = text.toLowerCase();

      setTimeout(() => {
        let aiResponse: string;

        if (selectedIntention === "hint") {
          if (lowerText.includes("ac")) {
            aiResponse =
              "ĐÚNG: Chinh xac! SC chieu xuong day la AC.\nHIGHLIGHT: Doan AC\nCÂU HỎI: Vay goc can tinh la goc nao trong tam giac SAC? [Goc SCA] [Goc SAC] [Goc ASC]";
          } else if (lowerText.includes("sca") || lowerText.includes("goc sca")) {
            aiResponse =
              "ĐÚNG: Dung roi!\nKIẾN THỨC: Duong cheo hinh vuong canh a = a√2\nCÂU HỎI: Vay AC = bao nhieu? [a√2] [a√3] [2a]";
          } else if (lowerText.includes("√2") || lowerText.includes("a√2")) {
            aiResponse =
              "ĐÚNG: Hoan hao!\nGIẢI THÍCH: tan(SCA) = SA/AC = a/(a√2) = 1/√2\n→ Goc SCA = arctan(1/√2) ≈ 35°16'\nCÂU HỎI: Ban da xong bai nay, xem tong ket khong? [Xem tong ket] [Hoi them]";
          } else if (
            lowerText.includes("tong ket") ||
            lowerText.includes("xem tong ket")
          ) {
            aiResponse =
              "TỔNG KẾT: {result: '3/3 buoc dung', selfRate: '70%', knowledge: ['Hinh chieu duong thang ⚠️', 'Duong cheo hinh vuong ✅', 'arctan co ban ✅'], errors: [], suggestion: 'Thu bai: Goc giua 2 mat phang — Do kho ↑'}";
          } else {
            aiResponse =
              "LỖI: Cau tra loi chua chinh xac. Thu lai nhe!\nCÂU HỎI: Hinh chieu cua SC xuong day la doan nao? [AC] [BC] [AB]";
          }
        } else if (selectedIntention === "check") {
          if (lowerText.includes("sb") || lowerText.includes("scb")) {
            aiResponse =
              "ĐÚNG: Buoc 1 — Nhan ra can tim hinh chieu ✓\nLỖI: Buoc 2 — Xac dinh hinh chieu la SB ✗\nGIẢI THÍCH: Vi SA ⊥ day, hinh chieu cua S xuong day chinh la A — khong phai B.\nCÂU HỎI: Vay hinh chieu cua SC la doan nao? [AC] [BC] [AB]";
          } else if (lowerText.includes("ac")) {
            aiResponse =
              "ĐÚNG: Dung roi! Ban da tu sua duoc loi.\nCÂU HỎI: Xem tong ket khong? [Xem tong ket] [Lam lai tu dau]";
          } else if (lowerText.includes("tong ket")) {
            aiResponse =
              "TỔNG KẾT: {result: '3/4 buoc dung', knowledge: ['Hinh chieu duong thang ⚠️'], errors: ['Sai tu duy khong gian — buoc xac dinh hinh chieu'], suggestion: 'Luyen them: Hinh chieu trong hinh chop — Do kho tuong duong'}";
          } else {
            aiResponse =
              "GIẢI THÍCH: Hay giai thich chi tiet loi giai cua ban de minh kiem tra nhe.";
          }
        } else if (selectedIntention === "observe") {
          if (
            lowerText.includes("tong ket") ||
            lowerText.includes("xem tong ket")
          ) {
            aiResponse =
              "TỔNG KẾT: {result: 'Quan sat hoan thanh', knowledge: ['Hinh chop dung', 'SA ⊥ mp(ABCD)'], errors: [], suggestion: 'Thu tu giai hoac xem goi y tung buoc'}";
          } else {
            aiResponse =
              "GIẢI THÍCH: Ban co the tiep tuc xoay va quan sat hinh. Nhan vao cac canh de xem thong tin chi tiet.\nCÂU HỎI: Ban muon lam gi tiep? [Xem tong ket] [Thu nhanh khac]";
          }
        } else {
          if (lowerText.includes("tong ket")) {
            aiResponse =
              "TỔNG KẾT: {result: 'Da xem loi giai', knowledge: ['Hinh chieu duong thang', 'Duong cheo hinh vuong', 'arctan'], errors: [], suggestion: 'Lan sau thu che do goi y de tu luc hon'}";
          } else {
            aiResponse =
              "GIẢI THÍCH: Ban co cau hoi gi them ve loi giai khong?\nCÂU HỎI: [Xem tong ket] [Hoi them]";
          }
        }

        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            conversationId: convId,
            role: "assistant",
            content: aiResponse,
            timestamp: new Date(),
            status: "sent",
          },
        ]);
      }, 800);
    },
    [selectedIntention]
  );

  const handleSendMessage = useCallback(
    async (data: ProblemInput) => {
      setChatLoading(true);

      let convId = currentConversationId;
      if (!convId) {
        convId = generateId();
        const title = data.text?.slice(0, 40) || "De bai hinh hoc";
        setConversations((prev) => [
          {
            id: convId!,
            userId: "u1",
            title,
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            lastMessageAt: new Date(),
          },
          ...prev,
        ]);
        setCurrentConversationId(convId);
      }

      const userMsg: Message = {
        id: generateId(),
        conversationId: convId,
        role: "user",
        content: data.text || "[Hinh anh da tai len]",
        timestamp: new Date(),
        imageUrl: data.image ? URL.createObjectURL(data.image) : undefined,
        status: "sent",
      };
      setMessages((prev) => [...prev, userMsg]);

      if (data.text) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? { ...c, title: data.text!.slice(0, 40), lastMessageAt: new Date() }
              : c
          )
        );
      }

      if (conversationState === "idle") {
        setPendingProblem(data.text || "");
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: generateId(),
              conversationId: convId!,
              role: "assistant",
              content: `GIẢI THÍCH: Minh hieu de nhu sau: ${data.text?.slice(0, 80) || "Bai toan hinh hoc"}... Dung khong?`,
              timestamp: new Date(),
              status: "sent",
            },
          ]);
          setConversationState("awaiting_confirmation");
          setChatLoading(false);
        }, 1000);
      } else if (conversationState === "awaiting_confirmation") {
        const userText = (data.text || "").toLowerCase();
        if (
          userText.includes("dung") ||
          userText.includes("ok") ||
          userText.includes("yes") ||
          userText.includes("đúng")
        ) {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: generateId(),
                conversationId: convId!,
                role: "assistant",
                content: "__INTENTION_CHECK__",
                timestamp: new Date(),
                status: "sent",
              },
            ]);
            setConversationState("awaiting_intention");
            setChatLoading(false);
          }, 500);
        } else {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: generateId(),
                conversationId: convId!,
                role: "assistant",
                content:
                  "GIẢI THÍCH: Vui long nhap lai de bai chinh xac de minh co the ho tro ban tot hon.",
                timestamp: new Date(),
                status: "sent",
              },
            ]);
            setConversationState("idle");
            setChatLoading(false);
          }, 500);
        }
      } else if (conversationState === "branch_active") {
        handleBranchResponse(data.text || "", convId);
        setChatLoading(false);
      } else {
        setChatLoading(false);
      }
    },
    [currentConversationId, conversationState, handleBranchResponse]
  );

  // Triggered after user picks a branch — THIS is when split view starts
  const handleIntentionSelect = useCallback(
    (intention: IntentionType) => {
      setSelectedIntention(intention);
      setConversationState("branch_active");
      startProcessingSimulation(intention);
    },
    [startProcessingSimulation]
  );

  const handleCancelProcessing = useCallback(async () => {
    if (processingTimerRef.current) clearInterval(processingTimerRef.current);
    setLayoutMode("chat");

    if (currentJobIdRef.current) {
      setJobs((prev) =>
        prev.map((j) =>
          j.jobId === currentJobIdRef.current
            ? { ...j, status: "cancelled" as const }
            : j
        )
      );
      currentJobIdRef.current = null;
    }

    setMessages((prev) =>
      prev.filter((m) => !(m.role === "assistant" && m.status === "sending"))
    );
  }, []);

  const handleLogout = useCallback(() => {}, []);

  const handleQuickReply = useCallback(
    (text: string) => {
      handleSendMessage({ text, type: "geometry" });
    },
    [handleSendMessage]
  );

  const handleHighlight = useCallback((_element: string) => {}, []);
  const handleSummaryAction = useCallback(
    (_action: "similar" | "save" | "close") => {},
    []
  );

  const isSplit =
    layoutMode === "split-processing" || layoutMode === "split-3d";

  const [viewerExpanded, setViewerExpanded] = useState(false);

  return (
    <div className="flex h-dvh flex-col bg-background overflow-hidden">
      {/* Top bar */}
      <TopBar
        onMenuClick={() => setSidebarHovered((prev) => !prev)}
        onMenuMouseEnter={() => setSidebarHovered(true)}
        user={MOCK_USER}
        onLogout={handleLogout}
      />

      {/* Sidebar overlay — triggered by hovering the menu icon in TopBar */}
      {sidebarHovered && (
        <div
          className="absolute bottom-0 left-0 z-50 top-14"
          onMouseLeave={() => setSidebarHovered(false)}
        >
          <div
            className="h-full shadow-2xl"
            style={{ backgroundColor: "hsl(var(--background))" }}
          >
            <Sidebar
              conversations={conversations}
              currentConversationId={currentConversationId}
              onConversationSelect={(id) => {
                handleSelectConversation(id);
                setSidebarHovered(false);
              }}
              onNewChat={() => {
                handleNewChat();
                setSidebarHovered(false);
              }}
              isOpen={true}
              onToggle={() => setSidebarHovered(false)}
              onDelete={handleDeleteConversation}
              onRename={handleRenameConversation}
              jobs={jobs}
              onJobClick={(jobId) => {
                const job = jobs.find((j) => j.jobId === jobId);
                if (
                  job &&
                  (job.status === "processing" || job.status === "queued")
                ) {
                  setLayoutMode("split-processing");
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Main content — full width always, split internally */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat panel — hidden when viewer is expanded */}
        <div
          className={`
            flex flex-col overflow-hidden transition-all duration-500 ease-in-out
            ${!isSplit ? "w-full" : viewerExpanded ? "w-0 opacity-0 pointer-events-none" : "w-[40%] border-r border-border"}
          `}
        >
          <ChatInterface
            conversationId={currentConversationId}
            messages={messages}
            onSendMessage={handleSendMessage}
            loading={chatLoading}
            onQuickReply={handleQuickReply}
            onHighlight={handleHighlight}
            onSummaryAction={handleSummaryAction}
            onIntentionSelect={handleIntentionSelect}
          />
        </div>

        {/* Right panel — processing or 3D viewer */}
        <div
          className={`
            flex flex-col overflow-hidden transition-all duration-500 ease-in-out
            ${!isSplit ? "w-0 opacity-0" : viewerExpanded ? "w-full" : "w-[60%]"}
          `}
        >
          {layoutMode === "split-processing" && (
            <div className="flex h-full w-full items-center justify-center bg-background">
              <ProcessingScreen
                progress={progress}
                currentStage={currentStageIdx}
                stages={stages}
                statusMessage={STAGE_MESSAGES[currentStageIdx] || "Dang xu ly"}
                estimatedSeconds={estimatedSeconds}
                elapsedSeconds={elapsedSeconds}
                onCancel={handleCancelProcessing}
              />
            </div>
          )}

          {layoutMode === "split-3d" && (
            <div className="h-full w-full">
              <GeometryViewer
                intention={selectedIntention}
                isExpanded={viewerExpanded}
                onToggleExpand={() => setViewerExpanded((prev) => !prev)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}