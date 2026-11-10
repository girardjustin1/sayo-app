# Astryx-first rules for SAYO screens

The owner's verdict on the first pass: "everything looks sloppy; the text doesn't look clean anywhere".
Cause: most visible surfaces were hand-built with custom CSS (cards, chips, tiles, tab bar, decision
blocks) instead of Astryx components, and the themes overrode Astryx's tuned metrics. The themes are
now fixed (Astryx radius, spacing and type scale; brand = colour + fonts only). Screens must follow.

## Rules
1. **Use an Astryx component for every visible surface.** Read its docs first:
   `pnpm -s astryx component <Name> --dense`. Never guess props.
2. **No custom metrics.** No hand-set `font-size`, `line-height`, `padding`, `border-radius`, or
   `gap` in CSS or inline styles. Use `Text type/size/weight`, `Heading level`, stack `gap`/`padding`
   steps, and component props. Raw colours: tokens only (`var(--color-…)`, `var(--sayo-…)`).
3. **Type hierarchy per screen:** at most one `Display` (brand headline). Then `Heading level={2|3}`,
   `Text` (body), `Text type="supporting"` (secondary). Body copy is never smaller than `supporting`.
4. **Spacing:** screen content `padding={5}` (20px) horizontally; sections `gap={5}`; inside a card
   `gap={2}`–`gap={3}`. Cards use their default padding (do not pass a different `padding` unless 0).
5. **Delete replaced CSS.** When a custom class is replaced, remove its rules from `src/styles/*.css`.
   Custom CSS is allowed only where Astryx has nothing: phone chrome (`chrome.tsx`), PIN dots/keypad,
   lock-screen wallpaper, brand gradient panels, generated avatars, the mobile chat composer.

## Mapping
| Hand-built today | Use instead |
|---|---|
| `sayo-card`, `cm-card`, `cm-soft`, div with border + radius | `Card` (`variant="muted"` for soft panels; colour variants only for categories) |
| tappable card / tile / topic grid button | `ClickableCard` or `SelectableCard` (selection) |
| chip rows, filter pills | `Token` (filter/selected) or `ToggleButtonGroup`/`SegmentedControl` (single choice) |
| quick replies under a chat bubble | `Button variant="secondary" size="sm"` in an `HStack wrap="wrap" gap={2}` |
| list of rows (settings, reviews, services list) | `List` + `ListItem` (`label`, `description`, `startContent`, `endContent`) |
| icon in a coloured square | `Icon` inside `Avatar` / `Thumbnail`, or plain `Icon color="accent"` |
| status/notice box | `Banner` (`status` info/warning/error/success) |
| empty state | `EmptyState` |
| modal / confirm | `AlertDialog` (confirm) or `BottomSheet` (mobile sheet) |
| decision / outcome block | `Card` + `Badge` (`CareDecisionTag`) |
| small status pill | `Badge` |
| text link | `Link` |

## Done means
- `pnpm -s typecheck` passes.
- `node scripts/audit-layout.mjs user-<group> <direction>` reports 0 issues for your stories in all
  three directions (sister, clear, unmuted). It needs `playwright-core`; run it from
  `/private/tmp/claude-501/-Users-girardjustin-Documents-NFL-Claude-bot-4-sunny/6a9b431d-0c67-4cf8-a9a1-b24ded68a554/scratchpad/tracer/` (copy the script there).
- You looked at a screenshot of every story in `sister` and spot-checked `clear` and `unmuted`.
- `grep -c` of custom classNames in your folder is near zero, and your CSS file has shrunk.
