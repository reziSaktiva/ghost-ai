"use client"

import { useMemo, useState } from "react"

export interface MockProject {
  id: string
  name: string
  slug: string
  role: "owner" | "collaborator"
}

type DialogKind = "create" | "rename" | "delete" | null

interface UseProjectDialogsOptions {
  onCreateProject: (project: MockProject) => void
  onRenameProject: (projectId: string, nextName: string, nextSlug: string) => void
  onDeleteProject: (projectId: string) => void
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function useProjectDialogs({
  onCreateProject,
  onRenameProject,
  onDeleteProject,
}: UseProjectDialogsOptions) {
  const [activeDialog, setActiveDialog] = useState<DialogKind>(null)
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null)
  const [projectName, setProjectName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const slugPreview = useMemo(() => {
    const slug = toSlug(projectName)
    return slug.length > 0 ? slug : "project-slug"
  }, [projectName])

  const closeDialog = () => {
    setActiveDialog(null)
    setSelectedProject(null)
    setProjectName("")
    setIsLoading(false)
  }

  const openCreateDialog = () => {
    setSelectedProject(null)
    setProjectName("")
    setActiveDialog("create")
  }

  const openRenameDialog = (project: MockProject) => {
    setSelectedProject(project)
    setProjectName(project.name)
    setActiveDialog("rename")
  }

  const openDeleteDialog = (project: MockProject) => {
    setSelectedProject(project)
    setProjectName("")
    setActiveDialog("delete")
  }

  const submitCreate = () => {
    const trimmedName = projectName.trim()
    const generatedSlug = toSlug(trimmedName)

    if (!trimmedName || !generatedSlug) {
      return
    }

    setIsLoading(true)

    onCreateProject({
      id: `mock-${Date.now()}`,
      name: trimmedName,
      slug: generatedSlug,
      role: "owner",
    })

    closeDialog()
  }

  const submitRename = () => {
    if (!selectedProject) {
      return
    }

    const trimmedName = projectName.trim()
    const generatedSlug = toSlug(trimmedName)

    if (!trimmedName || !generatedSlug) {
      return
    }

    setIsLoading(true)
    onRenameProject(selectedProject.id, trimmedName, generatedSlug)
    closeDialog()
  }

  const submitDelete = () => {
    if (!selectedProject) {
      return
    }

    setIsLoading(true)
    onDeleteProject(selectedProject.id)
    closeDialog()
  }

  return {
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
  }
}
