"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/chat/image-uploader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ProblemInput } from "@/types";

interface ProblemInputFormProps {
  onSubmit: (data: ProblemInput) => Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  prefillText?: string;
}

export function ProblemInputForm({
  onSubmit,
  disabled,
  loading,
  prefillText,
}: ProblemInputFormProps) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // When a hint is clicked, fill the textarea
  useEffect(() => {
    if (prefillText) {
      setText(prefillText);
      // Resize textarea
      setTimeout(() => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto";
          textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
          textarea.focus();
        }
      }, 0);
    }
  }, [prefillText]);

  const canSubmit = (text.trim().length >= 1 || image !== null) && !loading && !disabled;

  const handleResize = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, []);

  async function handleSubmit() {
    if (!canSubmit) return;

    await onSubmit({
      text: text.trim() || undefined,
      image: image || undefined,
      type: "geometry",
    });

    setText("");
    setImage(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="border-t border-border bg-background px-4 pb-4 pt-3">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-secondary/50 px-3 py-2 transition-colors focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20">
          {/* Image uploader */}
          <ImageUploader
            onImageSelect={setImage}
            onImageClear={() => setImage(null)}
            selectedImage={image}
          />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleResize();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Nhap de bai hinh hoc hoac tai anh len..."
            disabled={disabled || loading}
            rows={1}
            className={cn(
              "flex-1 resize-none border-0 bg-transparent py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50",
              "scrollbar-thin scrollbar-thumb-border"
            )}
            style={{ maxHeight: "160px" }}
            aria-label="Nhap de bai"
          />

          {/* Send button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                className={cn(
                  "size-9 shrink-0 rounded-full transition-all",
                  canSubmit
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground"
                )}
                disabled={!canSubmit}
                onClick={handleSubmit}
                aria-label="Gui (Enter)"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ArrowUp className="size-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Gui (Enter)</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          VisualEdu co the tao ra ket qua khong chinh xac. Hay kiem tra lai ket qua.
        </p>
      </div>
    </div>
  );
}
