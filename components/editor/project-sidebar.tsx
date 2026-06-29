"use client"

import { Pencil, Plus, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { EditorProject } from "@/types/project"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  ownedProjects: EditorProject[]
  sharedProjects: EditorProject[]
  onCreateProject: () => void
  onOpenProject: (project: EditorProject) => void
  onRenameProject: (project: EditorProject) => void
  onDeleteProject: (project: EditorProject) => void
}

function EmptyProjectsState({ label }: { label: string }) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-surface-border-subtle bg-subtle px-4 text-center text-sm text-copy-muted">
      {label}
    </div>
  )
}

function ProjectList({
  projects,
  onOpenProject,
  onRenameProject,
  onDeleteProject,
}: {
  projects: EditorProject[]
  onOpenProject: (project: EditorProject) => void
  onRenameProject: (project: EditorProject) => void
  onDeleteProject: (project: EditorProject) => void
}) {
  if (projects.length === 0) {
    return <EmptyProjectsState label="No projects yet. Create one to get started." />
  }

  return (
    <div className="space-y-2">
      {projects.map((project) => {
        return (
          <div
            key={project.id}
            className="flex items-center gap-2 rounded-xl border border-surface-border bg-subtle px-3 py-2"
          >
            <button
              onClick={() => onOpenProject(project)}
              className="min-w-0 flex-1 text-left"
              aria-label={`Open ${project.name}`}
            >
              <p className="truncate text-sm font-medium text-copy-primary">
                {project.name}
              </p>
              <p className="truncate text-xs text-copy-muted">{project.id}</p>
            </button>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onRenameProject(project)}
                aria-label={`Rename ${project.name}`}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onDeleteProject(project)}
                aria-label={`Delete ${project.name}`}
              >
                <Trash2 className="h-4 w-4 text-state-error" />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ProjectSidebar({
  isOpen,
  onClose,
  ownedProjects,
  sharedProjects,
  onCreateProject,
  onOpenProject,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-bg-base/70 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-3 left-3 top-15 z-50 flex w-72 flex-col rounded-2xl border border-border-subtle bg-bg-surface/95 backdrop-blur-xl transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]"
        )}
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-border-default px-4">
          <h2 className="text-sm font-medium text-text-primary">Projects</h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close project sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="my-projects" className="flex-1">
          <TabsList className="w-full bg-subtle">
            <TabsTrigger value="my-projects" className="flex-1">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">
              Shared
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="mt-4">
            <ProjectList
              projects={ownedProjects}
              onOpenProject={onOpenProject}
              onRenameProject={onRenameProject}
              onDeleteProject={onDeleteProject}
            />
          </TabsContent>

          <TabsContent value="shared" className="mt-4">
            {sharedProjects.length === 0 ? (
              <EmptyProjectsState label="No shared projects available yet." />
            ) : (
              <div className="space-y-2">
                {sharedProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => onOpenProject(project)}
                    className="w-full rounded-xl border border-surface-border bg-subtle px-3 py-2 text-left"
                    aria-label={`Open ${project.name}`}
                  >
                    <p className="truncate text-sm font-medium text-copy-primary">
                      {project.name}
                    </p>
                    <p className="truncate text-xs text-copy-muted">{project.id}</p>
                  </button>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-4 border-t border-surface-border pt-4">
          <Button className="w-full" onClick={onCreateProject}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}
