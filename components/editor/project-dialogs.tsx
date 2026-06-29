"use client"

import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { EditorDialogPattern } from "@/components/editor/editor-dialog-pattern"
import type { EditorProject } from "@/types/project"

interface ProjectDialogsProps {
  activeDialog: "create" | "rename" | "delete" | null
  selectedProject: EditorProject | null
  projectName: string
  roomIdPreview: string
  isLoading: boolean
  onProjectNameChange: (value: string) => void
  onClose: () => void
  onCreateSubmit: () => void
  onRenameSubmit: () => void
  onDeleteSubmit: () => void
}

export function ProjectDialogs({
  activeDialog,
  selectedProject,
  projectName,
  roomIdPreview,
  isLoading,
  onProjectNameChange,
  onClose,
  onCreateSubmit,
  onRenameSubmit,
  onDeleteSubmit,
}: ProjectDialogsProps) {
  const handleOpenChange = (open: boolean) => {
    if (open || isLoading) {
      return
    }

    onClose()
  }

  return (
    <>
      <Dialog open={activeDialog === "create"} onOpenChange={handleOpenChange}>
        <EditorDialogPattern
          title="Create project"
          description="Name your architecture workspace before you start."
          footerActions={
            <>
              <Button variant="ghost" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                onClick={onCreateSubmit}
                disabled={isLoading}
              >
                Create project
              </Button>
            </>
          }
        >
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault()
              onCreateSubmit()
            }}
          >
            <label htmlFor="create-project-name" className="text-sm text-copy-secondary">
              Project name
            </label>
            <Input
              id="create-project-name"
              value={projectName}
              onChange={(event) => onProjectNameChange(event.target.value)}
              placeholder="My architecture workspace"
              autoFocus
              className="h-10 rounded-xl border-surface-border bg-subtle text-copy-primary placeholder:text-copy-muted focus-visible:border-brand focus-visible:ring-brand/30"
            />
            <p className="text-xs text-copy-muted">
              Room ID preview:{" "}
              <span className="text-copy-primary">{roomIdPreview}</span>
            </p>
          </form>
        </EditorDialogPattern>
      </Dialog>

      <Dialog open={activeDialog === "rename"} onOpenChange={handleOpenChange}>
        <EditorDialogPattern
          title="Rename project"
          description={
            selectedProject
              ? `Current project name: ${selectedProject.name}`
              : "Update your project name."
          }
          footerActions={
            <>
              <Button variant="ghost" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                onClick={onRenameSubmit}
                disabled={isLoading || projectName.trim().length === 0}
              >
                Save changes
              </Button>
            </>
          }
        >
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault()
              onRenameSubmit()
            }}
          >
            <label htmlFor="rename-project-name" className="text-sm text-copy-secondary">
              Project name
            </label>
            <Input
              id="rename-project-name"
              value={projectName}
              onChange={(event) => onProjectNameChange(event.target.value)}
              placeholder="Project name"
              autoFocus
              className="h-10 rounded-xl border-surface-border bg-subtle text-copy-primary placeholder:text-copy-muted focus-visible:border-brand focus-visible:ring-brand/30"
            />
            <p className="text-xs text-copy-muted">
              Project ID remains unchanged after rename.
            </p>
          </form>
        </EditorDialogPattern>
      </Dialog>

      <Dialog open={activeDialog === "delete"} onOpenChange={handleOpenChange}>
        <EditorDialogPattern
          title="Delete project"
          description={
            selectedProject
              ? `Delete "${selectedProject.name}" permanently? This action cannot be undone.`
              : "Delete this project permanently? This action cannot be undone."
          }
          footerActions={
            <>
              <Button variant="ghost" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={onDeleteSubmit} disabled={isLoading}>
                Delete project
              </Button>
            </>
          }
        />
      </Dialog>
    </>
  )
}
