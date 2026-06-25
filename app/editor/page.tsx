"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectDialogs } from "@/components/editor/project-dialogs"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import {
  type MockProject,
  useProjectDialogs,
} from "@/components/editor/use-project-dialogs"
import { Button } from "@/components/ui/button"

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [projects, setProjects] = useState<MockProject[]>([
    {
      id: "mock-1",
      name: "Ghost AI Core",
      slug: "ghost-ai-core",
      role: "owner",
    },
    {
      id: "mock-2",
      name: "Realtime Collaboration Upgrade",
      slug: "realtime-collaboration-upgrade",
      role: "owner",
    },
    {
      id: "mock-3",
      name: "Architecture Ops Shared Workspace",
      slug: "architecture-ops-shared-workspace",
      role: "collaborator",
    },
  ])

  const {
    activeDialog,
    selectedProject,
    projectName,
    slugPreview,
    isLoading,
    setProjectName,
    closeDialog,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    submitCreate,
    submitRename,
    submitDelete,
  } = useProjectDialogs({
    onCreateProject: (project) => {
      setProjects((currentProjects) => [project, ...currentProjects])
    },
    onRenameProject: (projectId, nextName, nextSlug) => {
      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                name: nextName,
                slug: nextSlug,
              }
            : project
        )
      )
    },
    onDeleteProject: (projectId) => {
      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== projectId)
      )
    },
  })

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
          projects={projects}
          onCreateProject={openCreateDialog}
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
        slugPreview={slugPreview}
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
