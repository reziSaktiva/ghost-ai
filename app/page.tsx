import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

/**
 * Routes users to the editor if authenticated, or to the sign-in page otherwise.
 */
export default async function Home() {
  const { isAuthenticated } = await auth()

  if (isAuthenticated) {
    redirect("/editor")
  }

  redirect("/sign-in")
}
