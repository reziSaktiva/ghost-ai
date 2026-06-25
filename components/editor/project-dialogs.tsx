"use client"

import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { EditorDialogPattern } from "@/components/editor/editor-dialog-pattern"
import type { MockProject } from "@/components/editor/use-project-dialogs"

interface ProjectDialogsProps {
  activeDialog: "create" | "rename" | "delete" | null
  selectedProject: MockProject | null
  projectName: string
  slugPreview: string
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
  slugPreview,
  isLoading,
  onProjectNameChange,
  onClose,
  onCreateSubmit,
  onRenameSubmit,
  onDeleteSubmit,
}: ProjectDialogsProps) {
  return (
    <>
      <Dialog open={activeDialog === "create"} onOpenChange={(open) => !open && onClose()}>
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
                disabled={isLoading || projectName.trim().length === 0}
              >
                Create project
              </Button>
            </>
          }
        >
          <div className="space-y-3">
            <label htmlFor="create-project-name" className="text-sm text-copy-secondary">
              Project name
            </label>
            <Input
              id="create-project-name"
              value={projectName}
              onChange={(event) => onProjectNameChange(event.target.value)}
              placeholder="My architecture workspace"
            />
            <p className="text-xs text-copy-muted">
              Slug preview: <span className="text-copy-primary">{slugPreview}</span>
            </p>
          </div>
        </EditorDialogPattern>
      </Dialog>

      <Dialog open={activeDialog === "rename"} onOpenChange={(open) => !open && onClose()}>
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
            />
            <p className="text-xs text-copy-muted">
              Updated slug: <span className="text-copy-primary">{slugPreview}</span>
            </p>
          </form>
        </EditorDialogPattern>
      </Dialog>

      <Dialog open={activeDialog === "delete"} onOpenChange={(open) => !open && onClose()}>
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
