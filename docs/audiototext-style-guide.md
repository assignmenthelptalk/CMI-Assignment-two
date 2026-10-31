# AudioToText.com — Colours & Styling

## Colours
| Role | Value |
|---|---|
| Primary blue (CTA band, Sign In, active tab, borders) | `#3370FF` rgb(51,112,255) |
| Heading text / dark navy (footer bg, headings) | `#111827` rgb(17,24,39) |
| Body base text | `#020817` rgb(2,8,23) |
| Body copy grey | `#4B5563` rgb(75,85,99) |
| Secondary text | `#374151` / `#6B7280` / `#9CA3AF` |
| Page / card background | `#FFFFFF`; header `rgba(255,255,255,.8)` with blur |
| Section tint | `#F3F4F6` rgb(243,244,246) |
| Borders | `#E2E8F0`, `#E5E7EB`, `#D1D5DB`; footer rule `#1F2937` |
| Icon accents | Blue `#3B82F6`, Purple `#A855F7`, Green `#22C55E`, Pink `#EC4899`, Orange (feature icon, ~`#F97316`) |

**Gradients**: logo text blue→purple (footer logo lighter blue→purple); icon circles are blue→purple, purple→pink, pink→orange, orange→red, green, pink→red, indigo; hero/section backgrounds use very pale blue/lavender diagonal washes; thin dividers `linear-gradient(to right, transparent, #3370FF, transparent)`.

## Typography
- Font: system sans stack (`ui-sans-serif, system-ui, sans-serif`, Tailwind default) — rendered as Segoe UI-style
- H1 36px / 700 · H2 30px / 700 · card titles 18px / 600–700 · body 16px / 400 · small 14px (400/500/600) · badges 12px / 700
- Hero subtitle 18–20px / 400, grey

## Shape & effects
- Radius: pills `9999px` (badges, tabs, icon circles 50%), cards `12px`, buttons/inputs `8px`, small `6px`
- Shadows: soft Tailwind `shadow-md` (`0 4px 6px -1px rgba(0,0,0,.1)`) on cards, header and icon circles
- Layout: centred, max ~1100px content, 2-col feature/use-case cards, 4-col "how it works"
- Buttons: Sign In = solid #3370FF, white text, 8px radius; CTA = white button with blue text on blue band; FAQ tabs = pill, active filled blue

## Sections (top→bottom)
Sticky blurred header → Hero + upload dropzone + 3 trust pills → "Why Choose" 6 feature cards → "How it works" 4 steps → Use cases (4 cards) → FAQ accordion with tabs → blue CTA band → dark footer.
