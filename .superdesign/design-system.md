# SipNena design system — Lanka Grove (student app)

Student/parent LMS for Sri Lanka, **grades 6–11** (ages ~11–17). Lanka Grove palette retargeted as a **school learning app**, not adult marketing SaaS or “AI startup” UI.

Style source: Superdesign `nature-inspired-style`, adapted. Sinhala / Tamil / English must stay readable (Noto only).

## Product context

- **JTBD**: Help a student find today’s lesson fast, finish it, and take a short quiz — with parents able to pay/approve without confusion.
- **Surfaces**: Landing → language → auth → **home → courses → lesson → quiz** → checkout → profile.
- **Tone**: Plain school language, calm confidence. Never invent metrics or unfinished features.

## Brand

- **Name**: SipNena (text wordmark only)
- **Forbidden**: Sparkles, Wand, Bot, Brain, BookOpen-as-logo, GraduationCap-as-logo, emoji marks, initials-in-circle logos, purple/indigo “AI” gradients, soft blue SaaS washes (`blue-50`, `indigo-50`, blur orbs)
- **Primary (Forest)**: `#01472E`
- **Primary hover**: `#013825`
- **Sage**: `#CCD5AE`
- **Olive wash**: `#E9EDC9`
- **Cream page**: `#FEFAE0`
- **Moss**: `#A3B18A`
- **Ink**: `#01472E`
- **Muted**: `#4A5D4E`
- **Surface**: `#FFFFFF`
- **Border**: Forest at 12% opacity
- **Parent / warning (clay)**: text `#9A3412` on `#FFF7ED` — approval states only, never brand chrome

## Student-platform rules (hard)

- Body text ≥ **16px**; section titles clear and short
- Primary taps ≥ **48px** tall; bottom nav / CTAs thumb-friendly
- **Home = next lesson first** — one clear Continue CTA above the fold
- Progress as plain numbers/bars, not decorative score rings or fake AI insights
- Playlists, syllabus, settings = **simple lists**, not nested white card stacks
- Cards only when they wrap a real control or selectable course/lesson
- No icon-in-circle benefit rows; no pill-badge clusters in the first viewport
- No blue/indigo leftover classes — only Forest / Sage / Olive / Cream / clay
- One job per section: one headline, one short support line
- Hero (marketing): wordmark, one headline, one sentence, one CTA group, one real study visual

## Typography

- **Only**: Noto Sans + Noto Sans Sinhala / Tamil (self-hosted)
- Do not introduce Anton, Inter, Instrument Serif, Geist, or display faces
- Headings: extrabold, Forest ink; body: relaxed muted Forest

## Layout

- Page bg cream; section bands olive with ~1.5–2rem top radius
- Learning chrome quiet; video/quiz content dominates
- Nav: sticky cream/white, wordmark left, language switcher, one primary action
- Checkout/parents: Forest primary + clay warnings only

## Motion

- Calm fade-rise ~0.6–0.8s; honor `prefers-reduced-motion`
- No parallax toys on product screens

## Iconography

- Lucide only for functional actions (play, back, menu, check, close, search, download)
- Prefer text labels; never AI metaphors
- Brand = **SipNena** wordmark

## Design-system fidelity

Use ONLY these fonts, colors, spacing, and component styles. Do not introduce fonts, colors, or visual styles not listed here.
