import { prisma } from "@/lib/prisma"
import type { EditorProject } from "@/types/project"

interface GetEditorProjectListsParams {
  userId: string
  collaboratorEmails: string[]
}

interface EditorProjectLists {
  ownedProjects: EditorProject[]
  sharedProjects: EditorProject[]
}

export async function getEditorProjectLists({
  userId,
  collaboratorEmails,
}: GetEditorProjectListsParams): Promise<EditorProjectLists> {
  const ownedProjectsPromise = prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
    },
  })

  const sharedProjectsPromise =
    collaboratorEmails.length > 0
      ? prisma.projectCollaborator.findMany({
          where: {
            collaboratorEmail: {
              in: collaboratorEmails,
            },
            project: {
              ownerId: {
                not: userId,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          select: {
            project: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        })
      : Promise.resolve([])

  const [ownedProjectsRaw, sharedProjectsRaw] = await Promise.all([
    ownedProjectsPromise,
    sharedProjectsPromise,
  ])

  const ownedProjects: EditorProject[] = ownedProjectsRaw.map((project) => ({
    id: project.id,
    name: project.name,
    role: "owner",
  }))

  const seen = new Set<string>()
  const sharedProjects: EditorProject[] = []

  for (const item of sharedProjectsRaw) {
    if (seen.has(item.project.id)) {
      continue
    }

    seen.add(item.project.id)
    sharedProjects.push({
      id: item.project.id,
      name: item.project.name,
      role: "collaborator",
    })
  }

  return {
    ownedProjects,
    sharedProjects,
  }
}
