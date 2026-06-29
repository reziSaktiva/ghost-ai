import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { EditorHomeShell } from "@/components/editor/editor-home-shell"
import { getEditorProjectLists } from "@/lib/project-data"

const signInRoute = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in"

export default async function EditorPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect(signInRoute)
  }

  const user = await currentUser()
  const collaboratorEmails = user
    ? user.emailAddresses
        .map((entry) => entry.emailAddress.toLowerCase())
        .filter((value) => value.length > 0)
    : []

  const { ownedProjects, sharedProjects } = await getEditorProjectLists({
    userId,
    collaboratorEmails,
  })

  return (
    <EditorHomeShell
      ownedProjects={ownedProjects}
      sharedProjects={sharedProjects}
    />
  )
}
