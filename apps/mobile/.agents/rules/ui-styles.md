---
trigger: always_on
---

# UI Development Rules

Follow these rules strictly when creating or modifying UI in the Starter app. These rules ensure consistency with the existing design system and utility infrastructure.

## 1. Component Usage (Facade Pattern)
Always prefer existing "Common" widgets over raw Flutter widgets. Use the static factory methods (Facade) when available.
- **Buttons**: Use `CommonButton.primary()`, `CommonButton.outline()`, or `CommonButton.text()`. 
    - *Avoid*: `ElevatedButton`, `OutlinedButton`, `TextButton`.
- **Inputs**: Use specialized fields from `lib/utils/widgets/form_fields/`: `EmailFormField`, `PasswordFormField`, `PhoneFormField`, `StepperFormField`, `DescriptionFormField`.
- **Images**: Use `CommonImage` for all images (network, asset, or file) to benefit from built-in loading and error states.
- **Dialogs/Sheets**: Use `CommonDialog` and `CommonBottomSheet`.
- **Dividers**: Prefer shared divider widgets if available in `lib/utils/widgets/`; otherwise use themed `Divider`/`VerticalDivider`.

## 2. Spacing and Layout
- **Fixed Gaps**: Use the `Gap` constants from `lib/utils/constants/spacing.dart` for consistent spacing.
  - *Usage*: `Gap.medium16`
    - *Avoid*: `SizedBox(height: 16)`, `Padding` for simple gaps, or raw `Gap(16)`.
- **Relative Gaps**: Use `RelativeGap(mainAxisExtent: 0.2)` for layout gaps that should be a percentage of screen size.
- **Padding**: Use `AppSpacing` tokens for `EdgeInsets`.
    - *Usage*: `AppSpacing.allMd16`, `AppSpacing.horizontalLg24`.
- **Alignment**: Use `ExtendedColumn` when you need built-in spacing/alignment behavior; otherwise use `Column`/`Row` with spacing tokens.

## 3. Theming and Styling
Use `ThemeExtension` on `BuildContext` from `lib/app/theme/app_theme_extension.dart` for all theme-related properties.
- **Context Shortcut**: Always use `context.theme`, `context.colorScheme`, and `context.textTheme`.
- **Text Styles**: ONLY use the extension methods on `context` defined in `lib/app/theme/app_text_styles.dart`. 
  - *Usage*: `context.bodyRegular16()`, `context.bodyMedium14()`, `context.bodyXSmall12()`.
  - *Headlines*: `context.headline32()`, `context.headline24()`, `context.headline20()`, `context.headline16()`.
  - *Labels/Buttons*: `context.buttonRegular16()`, `context.buttonSmall14()`, `context.buttonXSmall12()`.
  - *Tabs/Alerts*: `context.tab10()`, `context.alertDialogButton14()`.
    - *Restriction*: Never create inline `TextStyle` objects or use `GoogleFonts` directly in UI code.
    - *Fluent API*: Use the fluent API from `TextStyleFluentExtension` for minor styling overrides (e.g., `context.bodyMedium14().bold.italic`).
  - *Parameters*: Prefer passing properties directly into the extension methods when available (e.g., `context.bodyMedium14(color: context.colorScheme.primary)`).
- **Typography Scale**: Adhere to the `FontSize` and `FontFamily` definitions in `lib/app/theme/app_typography.dart`.
- **Colors**: ALWAYS use `context.colorScheme` and theme-driven values from `context.theme` / `context.themeService`.
    - *Avoid*: Never use hardcoded colors like `Colors.white`, `Colors.black`, or raw `Color(0x...)` in UI code.
    - *Theme Usage*: Use `context.colorScheme.surface` for backgrounds that are white in light mode, or `context.colorScheme.onPrimary` for text on primary colors.
  - *Custom Colors*: If a brand-specific color is needed, add it to the project theme source (theme config/service) before using it in UI.
- **Borders**: Use `AppRadius` constants from `lib/utils/constants/radius.dart`.
    - *Usage*: `AppRadius.md12`, `AppRadius.small8` (for `BorderRadius`).

## 4. Responsive Logic
- **Screen Metrics**: Use `context.screenWidth`, `context.screenHeight`, `context.isLandscape`, and `context.screenPadding`.
    - *Avoid*: `MediaQuery.of(context).size.width`.

## 5. Coding Style
- **Atomic Design**: Follow the Atomic Design principles found in `lib/utils/widgets/form_fields/`. Compose complex components (Molecules) from simpler ones (Atoms/Base components).
- **Widget Extraction**: DO NOT create private widget builder methods (e.g., `Widget _buildLabel(...)`). Instead, extract them into separate `StatelessWidget` classes and place them in a `widgets` folder within the feature's presentation layer (e.g., `lib/features/feature_name/presentation/widgets/`).
- **Lints**: Adhere to the rules in `analysis_options.yaml`. Always use `const` where possible.
- **L10n**: Use `context.l10n.keyName` for all user-facing strings.
- **Barrel Exports**: Use barrel files (`index.dart`, `widgets.dart`, `pages.dart`, etc.) to organize exports within directories. 
    - *Exports*: A directory should have a barrel file that exports all public components within it.
    - *Imports*: Prefer importing from the barrel file rather than individual files (e.g., `import 'package:react_hono_flutter_template/utils/utils.dart'` instead of multiple imports from `utils/widgets/...`).

## Example (Correct Pattern)
```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: Padding(
      padding: AppSpacing.allMd16,
      child: ExtendedColumn(
        children: [
          Text(context.l10n.welcome, style: context.headline24()),
          Gap.medium16,
          EmailFormField(controller: _emailController),
          Gap.small8,
          CommonButton.primary(
            onPressed: () => _handleSubmit(),
            label: context.l10n.submit,
          ),
        ],
      ),
    ),
  );
}
```