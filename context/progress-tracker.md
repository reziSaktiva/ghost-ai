# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- In progress (authentication milestone completed)

## Current Goal

- Continue editor persistence by adding API-backed project CRUD on top of Prisma foundation.

## Completed

- Feature spec `01-design-system` completed:
  - shadcn/ui installed and configured,
  - required primitives added (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea),
  - `lucide-react` installed,
  - reusable `cn()` helper available in `lib/utils.ts`,
  - dark theme tokens aligned for component usage.
- Feature spec `02-editor` base chrome completed:
  - created `components/editor/editor-navbar.tsx` with fixed top bar and sidebar toggle icons (`PanelLeftOpen` / `PanelLeftClose`),
  - created `components/editor/project-sidebar.tsx` as floating, slide-in left sidebar with `Tabs` (`My Projects`, `Shared`) and empty states,
  - added full-width `New Project` action at sidebar bottom with `Plus` icon,
  - created reusable dialog scaffold `components/editor/editor-dialog-pattern.tsx` with title, description, and footer actions,
  - wired `app/editor/page.tsx` to use the editor navbar and project sidebar shell state.
- Feature spec `03-auth` completed:
  - wrapped `app/layout.tsx` with `ClerkProvider` using Clerk dark theme and CSS-variable-based appearance variables,
  - added protected-first route guarding in root `proxy.ts` using existing sign-in/sign-up env routes as public paths,
  - implemented auth pages at `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx` with minimal two-panel desktop layout and form-only mobile behavior,
  - refined auth page UI to match the approved 50/50 split reference layout with darker left panel contrast, feature-list treatment, and updated Clerk card styling,
  - updated `app/page.tsx` to redirect authenticated users to `/editor` and others to `/sign-in`,
  - moved editor shell to `app/editor/page.tsx` and added Clerk `UserButton` to the editor navbar.
- Feature spec `04-project-dialogs` completed:
  - added editor home content with heading, description, and centered `New Project` trigger,
  - created dedicated hook `components/editor/use-project-dialogs.ts` to manage dialog, form, and loading state,
  - added project dialogs in `components/editor/project-dialogs.tsx` for create, rename, and delete flows,
  - implemented live slug preview based on typed project name (create and rename),
  - wired sidebar and home `New Project` buttons to open create dialog,
  - wired owner-only sidebar actions to open rename and delete dialogs,
  - added mobile sidebar backdrop scrim with outside-tap close behavior,
  - kept implementation on mock data only (no API calls or persistence).
- Feature spec `05-prisma` completed:
  - switched Prisma config to schema-folder mode (`schema: "prisma"`) to support model splitting under `prisma/models`,
  - added `ProjectStatus` enum plus `Project` model with Clerk owner mapping, optional metadata fields, and required indexes,
  - added `ProjectCollaborator` model with cascade delete relation, uniqueness on project/email, and required indexes,
  - created cached Prisma singleton in `lib/prisma.ts` with runtime branch:
    - `prisma+postgres://` => `accelerateUrl` + `withAccelerate()`,
    - non-accelerate URLs => direct `PrismaPg` adapter (`@prisma/adapter-pg`),
  - ran and applied migration `20260625064621_init_project_models`,
  - generated Prisma client successfully and verified app build passes.

## In Progress

- Implementing API-backed project persistence to replace mock editor state.

## Next Up

- Add project CRUD API routes with auth + ownership checks.
- Replace mock project lists in sidebar/dialog flows with database-backed data loading.
- Introduce initial query/mutation service helpers around `lib/prisma.ts` for editor project operations.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Add decisions that affect the system design or data model.

## Notes

- Validation checks passed:
  - `04-project-dialogs` wiring implemented against mock state in `/editor`,
  - create/rename/delete dialog transitions are connected from sidebar and editor home.
- Validation checks passed:
  - `npx prisma migrate dev --name init_project_models`,
  - `npx prisma generate`,
  - `npm run build` (successful build; only non-blocking Next lockfile patch warnings due restricted registry DNS in sandbox).
- Status update:
  - feature spec `04-project-dialogs` marked complete and ready for handoff.
  - feature spec `05-prisma` marked complete and ready for API persistence integration.

