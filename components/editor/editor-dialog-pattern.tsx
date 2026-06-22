import * as React from "react"

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface EditorDialogPatternProps {
  title: React.ReactNode
  description?: React.ReactNode
  footerActions?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function EditorDialogPattern({
  title,
  description,
  footerActions,
  children,
  className,
}: EditorDialogPatternProps) {
  return (
    <DialogContent
      className={cn(
        "max-w-md rounded-3xl border border-surface-border bg-elevated p-0 text-copy-primary shadow-2xl ring-0",
        className
      )}
      showCloseButton={false}
    >
      <DialogHeader className="gap-2 px-6 pt-6">
        <DialogTitle className="text-lg font-semibold text-copy-primary">
          {title}
        </DialogTitle>
        {description ? (
          <DialogDescription className="text-sm text-copy-muted">
            {description}
          </DialogDescription>
        ) : null}
      </DialogHeader>

      {children ? <div className="px-6 py-4">{children}</div> : null}

      {footerActions ? (
        <DialogFooter className="rounded-b-3xl border-surface-border bg-subtle/70 px-6 py-4">
          {footerActions}
        </DialogFooter>
      ) : null}
    </DialogContent>
  )
}
