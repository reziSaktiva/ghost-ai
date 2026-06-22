"use client"

import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

function EmptyProjectsState({ label }: { label: string }) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-surface-border-subtle bg-subtle px-4 text-center text-sm text-copy-muted">
      {label}
    </div>
  )
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      className={[
        "absolute top-16 bottom-4 left-4 z-20 flex w-[320px] flex-col rounded-2xl border border-surface-border bg-elevated/95 p-4 shadow-2xl backdrop-blur-sm transition-transform duration-200 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+2rem)]",
      ].join(" ")}
      aria-hidden={!isOpen}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-copy-primary">Projects</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close project sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="flex-1">
        <TabsList className="w-full bg-subtle">
          <TabsTrigger value="my-projects" className="flex-1">
            My Projects
          </TabsTrigger>
          <TabsTrigger value="shared" className="flex-1">
            Shared
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-projects" className="mt-4">
          <EmptyProjectsState label="No projects yet. Create one to get started." />
        </TabsContent>

        <TabsContent value="shared" className="mt-4">
          <EmptyProjectsState label="No shared projects available yet." />
        </TabsContent>
      </Tabs>

      <div className="mt-4 border-t border-surface-border pt-4">
        <Button className="w-full">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}
