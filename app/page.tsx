"use client"

import { useState } from "react"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <main className="relative min-h-screen bg-base text-copy-primary">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((open) => !open)}
      />

      <section className="relative h-[calc(100vh-3.5rem)] overflow-hidden">
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="h-full border border-dashed border-surface-border-subtle bg-base/80 p-6">
          <div className="flex h-full items-center justify-center rounded-2xl border border-surface-border bg-surface text-sm text-copy-muted">
            Editor canvas area
          </div>
        </div>
      </section>
    </main>
  )
}
