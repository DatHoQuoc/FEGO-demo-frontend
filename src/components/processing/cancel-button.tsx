"use client";

import { useState } from "react";
import { StopCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CancelButtonProps {
  onCancel: () => Promise<void>;
  disabled?: boolean;
}

export function CancelButton({ onCancel, disabled }: CancelButtonProps) {
  const [open, setOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  async function handleCancel() {
    setCancelling(true);
    try {
      await onCancel();
    } finally {
      setCancelling(false);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border text-muted-foreground hover:text-foreground"
          disabled={disabled}
        >
          <StopCircle className="size-4" />
          <span>Huy</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Huy xu ly?</DialogTitle>
          <DialogDescription>
            Ban co chac muon huy qua trinh xu ly nay? Hanh dong nay khong the hoan tac.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={cancelling}
          >
            Tiep tuc xu ly
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={cancelling}
            className="gap-2"
          >
            {cancelling && <Loader2 className="size-4 animate-spin" />}
            Huy bo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
