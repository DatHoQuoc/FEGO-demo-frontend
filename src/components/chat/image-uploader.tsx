"use client";

import { useCallback, useRef } from "react";
import { ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  onImageClear: () => void;
  selectedImage: File | null;
  maxSizeBytes?: number;
  acceptedFormats?: string[];
}

const MAX_SIZE_DEFAULT = 5 * 1024 * 1024; // 5MB
const ACCEPTED_DEFAULT = ["image/png", "image/jpeg", "image/jpg"];

export function ImageUploader({
  onImageSelect,
  onImageClear,
  selectedImage,
  maxSizeBytes = MAX_SIZE_DEFAULT,
  acceptedFormats = ACCEPTED_DEFAULT,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!acceptedFormats.includes(file.type)) {
        toast.error("Dinh dang anh khong hop le. Chi chap nhan PNG, JPEG.");
        return;
      }

      if (file.size > maxSizeBytes) {
        toast.error(
          `Kich thuoc anh qua lon. Toi da ${Math.floor(maxSizeBytes / 1024 / 1024)}MB.`
        );
        return;
      }

      onImageSelect(file);
      // Reset input so same file can be re-selected
      if (inputRef.current) inputRef.current.value = "";
    },
    [acceptedFormats, maxSizeBytes, onImageSelect]
  );

  return (
    <div className="flex items-center">
      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats.join(",")}
        onChange={handleFileChange}
        className="hidden"
        aria-label="Tai anh len"
      />

      {selectedImage ? (
        <div className="relative">
          <div className="size-10 overflow-hidden rounded-lg border border-border">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Anh da chon"
              className="size-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute -right-1 -top-1 size-4 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/80"
            onClick={onImageClear}
            aria-label="Xoa anh"
          >
            <X className="size-2.5" />
          </Button>
        </div>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 text-muted-foreground hover:text-foreground"
              onClick={() => inputRef.current?.click()}
              aria-label="Tai hinh anh len"
            >
              <ImageIcon className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Tai anh de bai len</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
