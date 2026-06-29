import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

interface CreateProjectBody {
  id?: unknown
  name?: unknown
}

function unauthorizedResponse() {
  return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 })
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

function conflictResponse(message: string) {
  return NextResponse.json({ error: { message } }, { status: 409 })
}

function resolveProjectName(payload: CreateProjectBody) {
  if (typeof payload.name !== "string") {
    return "Untitled Project"
  }

  const trimmedName = payload.name.trim()

  return trimmedName.length > 0 ? trimmedName : "Untitled Project"
}

function resolveProjectId(payload: CreateProjectBody) {
  if (typeof payload.id !== "string") {
    return null
  }

  const normalizedId = payload.id.trim().toLowerCase()

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalizedId)) {
    return null
  }

  if (normalizedId.length < 3 || normalizedId.length > 80) {
    return null
  }

  return normalizedId
}

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return unauthorizedResponse()
  }

  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json({ data: projects }, { status: 200 })
  } catch {
    return internalServerErrorResponse()
  }
}

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return unauthorizedResponse()
  }

  let payload: CreateProjectBody = {}

  try {
    const parsed = await request.json()
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return badRequestResponse("Invalid JSON body")
    }
    payload = parsed as CreateProjectBody
  } catch {
    return badRequestResponse("Invalid JSON body")
  }

  const projectId = resolveProjectId(payload)
  if (payload.id !== undefined && projectId === null) {
    return badRequestResponse("Invalid project ID")
  }

  try {
    const project = await prisma.project.create({
      data: {
        id: projectId ?? undefined,
        ownerId: userId,
        name: resolveProjectName(payload),
      },
    })

    return NextResponse.json({ data: project }, { status: 201 })
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return conflictResponse("Project ID already exists")
    }
    return internalServerErrorResponse()
  }
}
