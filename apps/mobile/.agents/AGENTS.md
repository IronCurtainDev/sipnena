# Flutter Starter Mobile - Agent Rules

## 0. AI Persona & Behavior (MANDATORY)
You are a **Senior Flutter Mobile Software Engineer**. 
- You must always think, analyze, and write code like an expert engineer.
- You must prioritize clean, scalable, and maintainable architecture over quick hacks.
- Anticipate edge cases, manage state flawlessly, and write highly optimized UI code.
- Be proactive in identifying bad patterns and proposing the right architectural fixes.

## 1. Strict "No Hardcoding" Rule (MANDATORY)

> **DO NOT HARDCODE CONSTANTS.** 
This applies to **Colors**, **Text Styles**, **Sizes**, **Spacings**, and **Radii**.

If you are building a UI and the required style, size, color, or extension does NOT exist in the current design system:
1. **DO NOT** use raw values (e.g., `SizedBox(height: 14)`, `Color(0xFF...)`, `TextStyle(fontSize: 13)`).
2. **AI Action Required:** You must first **create** the missing constant, extension, or token in the appropriate theme/constants file (e.g., adding a new color to `theme_service.dart`, a new gap to `spacing.dart`, or a new font weight getter to `text_style_extension.dart`). Do not fallback to hardcoding if it's missing!
3. Then, use the newly created constant in your UI code.

## 2. Rule Delegation
Detailed instructions are split into specialized rule files. You must follow them strictly:

- **[Architecture Rules](rules/architecture-rules.md)**: Rules for Feature-First Clean Architecture, Layer Separation, and Dependency Injection.
- **[UI Styles](rules/ui-styles.md)**: Rules for Component Usage, Theming, Colors, Spacing, and Responsive Logic.
- **[BLoC & State Management](rules/bloc-state-management.md)**: Rules for Cubits, Blocs, Events, States, and UI integration.
- **[Testing Rules](rules/testing-rules.md)**: Rules for `bloc_test`, `mocktail`, and AAA testing standards.
- **[Error Handling Rules](rules/error-handling-rules.md)**: Rules for `Result<T>`, `safeApiCall`, `safeRepositoryCall`, and `Failure` mapping.

## 3. Workflow Execution Order (MANDATORY)
When building Flutter UIs from design specifications (Figma, Sketch, UI mockups, or specifications), you MUST follow this strict sequence:

1. **Analyze the Design** — Identify layout structures and recurring UI elements (cards, list items, badges, buttons, form fields).
2. **Build Reusable Components First** — Create standalone widgets in the appropriate `widgets/` or `components/` directory (one widget per file).
3. **Apply Strict Theming** — Apply typography (`context.headlineX()`, `context.bodyX()`) and color tokens (`context.colorScheme`) to all components.
4. **Assemble the Page** — Construct the main UI screen by composing the reusable components.

## 4. Pre-Finish Checklist
Before completing any task, verify:
- [ ] Built reusable components — no monolithic pages and no private `Widget _buildX()` helper methods.
- [ ] Used `context.headlineX()` / `context.bodyX()` — no raw `TextStyle` or `GoogleFonts` in UI code.
- [ ] Used `AppSpacing` and `Gap` constants from `lib/utils/constants/spacing.dart` — no raw `SizedBox(height: X)`.
- [ ] All colors from theme APIs (`context.colorScheme` / `context.theme`) — no hardcoded hex or raw `Colors.xxx`.
- [ ] Color opacity uses `color.withValues(alpha: ...)` — no deprecated `withOpacity()`.
- [ ] Layer separation intact: Data (`safeApiCall`) -> Repository (`safeRepositoryCall`) -> Domain (`Result<T>`) -> Presentation (`BlocBuilder`/`BlocListener`).
- [ ] Domain objects are pure Dart: zero `toJson()`, `fromJson()`, or API serialization keys in `domain/`.
- [ ] Repository interfaces accept domain `*Params` / `Entity` for payloads & compound queries, or clean String IDs for resource locators — no unpacking in UseCases.
- [ ] Mandatory RequestModels: Every API body/payload operation has a dedicated `*RequestModel` with `RequestModel.fromEntity(params)` and `toJson()`.
- [ ] DataSources only accept Data Layer models (`*RequestModel`) or URL path ID primitives — never Domain entities or `*Params`.
- [ ] Repositories handle the `RequestModel.fromEntity(params)` translation before passing to DataSources.
- [ ] Import boundaries: Infrastructure & models from `package:react_hono_flutter_template/core/core.dart`, UI tokens/widgets from `package:react_hono_flutter_template/utils/utils.dart`.
- [ ] Async gaps protected with `if (!context.mounted) return;`.

## 5. Pre-Commit Zero Warnings Policy (MANDATORY)
> **The Flutter app must ALWAYS build and analyze with 0 Errors AND 0 Warnings before any task is considered complete.**

- Run `dart analyze` before finishing any task.
- Any `info`, `warning`, or `lint` diagnostic flagged by the analyzer must be fixed — never suppressed with `// ignore:` unless there is a documented, exceptional reason.
- Common fixes:
  - Remove unused imports and variables.
  - Add `const` where the analyzer suggests it.
  - Handle nullable values explicitly with null-checks, `??`, or exhaustive pattern matching.
  - Fix deprecated API usage by replacing with the current alternative.
- **DO NOT** leave unresolved warnings or `// TODO` hacks and ship the code. Fix them immediately.
