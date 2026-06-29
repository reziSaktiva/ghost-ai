"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectDialogs } from "@/components/editor/project-dialogs"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { Button } from "@/components/ui/button"
import { useProjectActions } from "@/hooks/use-project-actions"
import type { EditorProject } from "@/types/project"

interface EditorHomeShellProps {
  ownedProjects: EditorProject[]
  sharedProjects: EditorProject[]
}

export function EditorHomeShell({
  ownedProjects,
  sharedProjects,
}: EditorHomeShellProps) {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const {
    activeDialog,
    selectedProject,
    projectName,
    roomIdPreview,
    isLoading,
    setProjectName,
    closeDialog,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    submitCreate,
    submitRename,
    submitDelete,
  } = useProjectActions()

  const handleOpenProject = (project: EditorProject) => {
    router.push(`/editor/${project.id}`)
  }

  return (
    <main className="relative min-h-screen bg-base text-copy-primary">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((open) => !open)}
      />

      <section className="relative h-[calc(100vh-3.5rem)] overflow-hidden">
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          ownedProjects={ownedProjects}
          sharedProjects={sharedProjects}
          onOpenProject={(project) => router.push(`/editor/${project.id}`)}
          onCreateProject={openCreateDialog}
          onOpenProject={handleOpenProject}
          onRenameProject={openRenameDialog}
          onDeleteProject={openDeleteDialog}
        />

        <div className="flex h-full items-center justify-center bg-base/80 p-6">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-2xl font-semibold text-copy-primary">
              Create a project or open an existing one
            </h1>
            <p className="mt-3 text-sm text-copy-muted">
              Start a new architecture workspace, or choose a project from the
              sidebar.
            </p>
            <div className="mt-6 flex justify-center">
              <Button onClick={openCreateDialog}>
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ProjectDialogs
        activeDialog={activeDialog}
        selectedProject={selectedProject}
        projectName={projectName}
        roomIdPreview={roomIdPreview}
        isLoading={isLoading}
        onProjectNameChange={setProjectName}
        onClose={closeDialog}
        onCreateSubmit={submitCreate}
        onRenameSubmit={submitRename}
        onDeleteSubmit={submitDelete}
      />
    </main>
  )
}
