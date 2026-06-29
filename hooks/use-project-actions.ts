"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import type { EditorProject } from "@/types/project"

type DialogKind = "create" | "rename" | "delete" | null

interface CreateProjectResponse {
  data: {
    id: string
    name: string
  }
}

function slugify(value: string) {
  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

  return normalized.length > 0 ? normalized : "untitled-project"
}

function generateShortSuffix() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().slice(0, 8)
  }

  return Math.random().toString(36).slice(2, 10)
}

export function useProjectActions() {
  const router = useRouter()
  const pathname = usePathname()

  const [activeDialog, setActiveDialog] = useState<DialogKind>(null)
  const [selectedProject, setSelectedProject] = useState<EditorProject | null>(null)
  const [projectName, setProjectName] = useState("")
  const [createSuffix, setCreateSuffix] = useState(generateShortSuffix())
  const [isLoading, setIsLoading] = useState(false)

  const roomIdPreview = useMemo(() => {
    const baseName = projectName.trim().length > 0 ? projectName : "Untitled Project"
    return `${slugify(baseName)}-${createSuffix}`
  }, [createSuffix, projectName])

  const closeDialog = () => {
    setActiveDialog(null)
    setSelectedProject(null)
    setProjectName("")
    setIsLoading(false)
  }

  const openCreateDialog = () => {
    setCreateSuffix(generateShortSuffix())
    setProjectName("")
    setSelectedProject(null)
    setActiveDialog("create")
  }

  const openRenameDialog = (project: EditorProject) => {
    setSelectedProject(project)
    setProjectName(project.name)
    setActiveDialog("rename")
  }

  const openDeleteDialog = (project: EditorProject) => {
    setSelectedProject(project)
    setProjectName("")
    setActiveDialog("delete")
  }

  const submitCreate = async () => {
    if (isLoading) {
      return
    }

    setIsLoading(true)

    const nextName = projectName.trim()
    const roomId = roomIdPreview

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: roomId,
          name: nextName.length > 0 ? nextName : "Untitled Project",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create project")
      }

      const payload = (await response.json()) as CreateProjectResponse
      closeDialog()
      router.push(`/editor/${payload.data.id}`)
    } catch {
      setIsLoading(false)
    }
  }

  const submitRename = async () => {
    if (isLoading || !selectedProject) {
      return
    }

    const nextName = projectName.trim()
    if (nextName.length === 0) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nextName }),
      })

      if (!response.ok) {
        throw new Error("Failed to rename project")
      }

      closeDialog()
      router.refresh()
    } catch {
      setIsLoading(false)
    }
  }

  const submitDelete = async () => {
    if (isLoading || !selectedProject) {
      return
    }

    setIsLoading(true)

    const deletedProjectId = selectedProject.id

    try {
      const response = await fetch(`/api/projects/${deletedProjectId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      closeDialog()

      if (pathname === `/editor/${deletedProjectId}`) {
        router.replace("/editor")
        return
      }

      router.refresh()
    } catch {
      setIsLoading(false)
    }
  }

  return {
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
  }
}
