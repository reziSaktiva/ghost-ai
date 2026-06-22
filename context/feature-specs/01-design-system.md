Read `AGENTS.md` before starting.

We're adding the design system and UI primitive components.

install and configure `shadcn/ui`.

add these shadcn components: 
- Button
- Card
- Dialog
- Input
- Tabs
- Textarea
- ScollArea

Do not modify the generated `component/ui/*` files after installation.

Also install `lucide-react`.

Create `lib/utils.ts` with a reusable `cn()` helper for merging Tailwind Classes.

Ensure all components match the existing dark theme in `globals.css`.

### Check when done
- All compomponents import without errors
- `cn()` works properly
- No default light styling appears