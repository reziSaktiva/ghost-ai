import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

/**
 * Root layout component that integrates Clerk authentication and renders the app structure with conditional sign-in controls.
 *
 * @returns The root layout element
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <header>
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
