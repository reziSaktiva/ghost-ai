import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

interface RouteContext {
  params: Promise<{
    projectId: string
  }>
}

interface RenameProjectBody {
  name?: unknown
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function unauthorizedResponse() {
  return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 })
}

function forbiddenResponse() {
  return NextResponse.json({ error: { message: "Forbidden" } }, { status: 403 })
}

function notFoundResponse() {
  return NextResponse.json({ error: { message: "Project not found" } }, { status: 404 })
}

function badRequestResponse(message: string) {
  return NextResponse.json({ error: { message } }, { status: 400 })
}

function internalServerErrorResponse() {
  return NextResponse.json(
    { error: { message: "Internal server error" } },
    { status: 500 },
  )
}

async function authorizeProjectOwner(projectId: string, userId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { ownerId: true },
  })

  if (!project) {
    return notFoundResponse()
  }

  if (project.ownerId !== userId) {
    return forbiddenResponse()
  }

  return null
}

export async function PATCH(request: Request, context: RouteContext) {
  const { userId } = await auth()

  if (!userId) {
    return unauthorizedResponse()
  }

  const { projectId } = await context.params

  if (!projectId) {
    return badRequestResponse("Project ID is required")
  }

  const ownershipError = await authorizeProjectOwner(projectId, userId)
  if (ownershipError) {
    return ownershipError
  }

  let payload: RenameProjectBody

  try {
    const body = await request.json()

    if (!isRecord(body)) {
      return badRequestResponse("Invalid JSON body")
    }

    payload = body as RenameProjectBody
  } catch {
    return badRequestResponse("Invalid JSON body")
  }

  if (typeof payload.name !== "string" || payload.name.trim().length === 0) {
    return badRequestResponse("Project name is required")
  }

  try {
    const project = await prisma.project.update({
      where: { id: projectId },
      data: { name: payload.name.trim() },
    })

    return NextResponse.json({ data: project }, { status: 200 })
  } catch {
    return internalServerErrorResponse()
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const { userId } = await auth()

  if (!userId) {
    return unauthorizedResponse()
  }

  const { projectId } = await context.params

  if (!projectId) {
    return badRequestResponse("Project ID is required")
  }

  const ownershipError = await authorizeProjectOwner(projectId, userId)
  if (ownershipError) {
    return ownershipError
  }

  try {
    await prisma.project.delete({
      where: { id: projectId },
    })

    return NextResponse.json({ data: { id: projectId } }, { status: 200 })
  } catch {
    return internalServerErrorResponse()
  }
}
