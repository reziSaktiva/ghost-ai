import { SignUp } from "@clerk/nextjs"
import { FileText, Share2, Sparkles } from "lucide-react"

const signInPath = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in"

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-base text-copy-primary">
      <section className="grid min-h-screen w-full lg:grid-cols-2">
        <div className="hidden bg-surface lg:flex lg:flex-col lg:justify-between lg:border-r lg:border-surface-border lg:px-14 lg:py-8">
          <div className="flex items-center gap-3">
            <span className="h-6 w-6 rounded-md bg-brand" aria-hidden />
            <span className="text-sm font-medium text-copy-primary">Ghost AI</span>
          </div>

          <div className="max-w-xl space-y-9">
            <div className="space-y-4">
              <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.03em] text-copy-primary">
                Design systems at the speed of thought.
              </h1>
              <p className="text-lg leading-relaxed text-copy-muted">
                Describe your architecture in plain English. Ghost AI maps it to
                a shared canvas your whole team can refine in real time.
              </p>
            </div>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 rounded-md border border-surface-border bg-subtle p-1.5">
                  <Sparkles className="h-4 w-4 text-brand" />
                </span>
                <div>
                  <p className="text-lg font-medium text-copy-primary">
                    AI Architecture Generation
                  </p>
                  <p className="text-sm text-copy-muted">
                    Describe your system, AI maps it to nodes and edges on a live
                    canvas.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 rounded-md border border-surface-border bg-subtle p-1.5">
                  <Share2 className="h-4 w-4 text-brand" />
                </span>
                <div>
                  <p className="text-lg font-medium text-copy-primary">
                    Real-time Collaboration
                  </p>
                  <p className="text-sm text-copy-muted">
                    Live cursors, presence indicators, and shared node editing
                    across your team.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 rounded-md border border-surface-border bg-subtle p-1.5">
                  <FileText className="h-4 w-4 text-brand" />
                </span>
                <div>
                  <p className="text-lg font-medium text-copy-primary">
                    Instant Spec Generation
                  </p>
                  <p className="text-sm text-copy-muted">
                    Export a complete Markdown technical spec directly from the
                    canvas graph.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <p className="text-xs text-copy-faint">
            © 2026 Ghost AI. All rights reserved.
          </p>
        </div>

        <div className="flex items-center justify-center bg-base px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <SignUp
              signInUrl={signInPath}
              fallbackRedirectUrl="/editor"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  cardBox:
                    "w-full rounded-3xl border border-surface-border bg-elevated/90 shadow-none",
                  headerTitle:
                    "text-3xl font-semibold tracking-[-0.02em] text-copy-primary",
                  headerSubtitle: "text-copy-muted",
                  socialButtonsBlockButton:
                    "rounded-xl border border-surface-border bg-transparent text-copy-primary hover:bg-subtle",
                  dividerLine: "bg-surface-border",
                  dividerText: "text-copy-faint",
                  formFieldLabel: "text-copy-primary",
                  formFieldInput:
                    "h-11 rounded-xl border border-surface-border bg-subtle text-copy-primary placeholder:text-copy-faint",
                  formButtonPrimary:
                    "h-11 rounded-xl border-0 bg-brand text-background hover:bg-brand/90",
                  footerActionText: "text-copy-muted",
                  footerActionLink: "text-brand hover:text-brand/90",
                  identityPreviewText: "text-copy-primary",
                  identityPreviewEditButton: "text-brand hover:text-brand/90",
                },
              }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
