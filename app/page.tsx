import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const signInRoute = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in"

export default async function Home() {
  const { isAuthenticated } = await auth()

  if (isAuthenticated) {
    redirect("/editor")
  }

  redirect(signInRoute)
}
