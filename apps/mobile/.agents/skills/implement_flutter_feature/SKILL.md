---
name: implement_flutter_feature
description: Use this skill when asked to create a new feature, UI screen, or implement anything in the Flutter frontend codebase.
---

# Flutter Feature Implementation Guidelines

When implementing a new feature in the Flutter Starter project, strictly adhere to the following architecture, state management, UI, and localization guidelines.

## 1. Clean Architecture (Strict)

Every feature MUST follow Clean Architecture principles and be organized into the proper directory structure:
* **`presentation/`**: Contains UI pages (`pages/`), atomic reusable components (`widgets/`), and state management (`bloc/` or `cubit/`). Does NOT contain any business logic or direct API/data calls.
* **`domain/`**: Contains Entities, Repository Interfaces (abstract classes), and UseCases.
  * **Domain Purity**: Domain objects (`entities`, usecase `*Params`) are pure Dart and must **NEVER** contain `toJson()`, `fromJson()`, or API-specific serialization keys.
  * **Direct Forwarding**: Repository interfaces must accept domain `*Params` / `Entity` directly. UseCases must forward them as whole objects without unpacking into primitive arguments.
* **`data/`**: Contains Models (DTOs with `fromJson`/`toJson`), Data Sources (API calls using `safeApiCall`), and Repository implementations (wrapping data calls with `safeRepositoryCall`).
  * **DataSource Isolation**: DataSources must NEVER accept Domain entities or `*Params`. They only accept Data Layer models (e.g. `*RequestModel`, `*Request`) or primitives.
  * **Repository Adapter**: Repository implementations map Domain `*Params` $\rightarrow$ Data `*RequestModel` (e.g., `RequestModel.fromEntity(params)`) and Data models $\rightarrow$ Domain entities (`model.toEntity()`).

## 2. State Management (BLoC / Cubit)

* **Strictly use BLoC or Cubit** for state management:
  - Use **Cubit** for simple flows (fetching data, submitting forms, toggling states).
  - Use **Bloc** for complex event pipelines (debouncing, multi-event streams, real-time location/pusher updates).
* **Hybrid `setState` policy:** In new feature flows and touched feature logic, do NOT use `setState`; manage state through BLoC/Cubit states. Existing legacy `setState` usage in untouched files can be refactored incrementally when modified.
* **Immutable States:** State classes must use `equatable` or `freezed` for value equality and immutability.
* Break down UIs into focused widgets that consume specific parts of state using `BlocBuilder` or `BlocSelector`. Use `BlocListener` for one-off side effects (navigation, snackbars, dialogs) and ensure async gap safety (`if (!context.mounted) return;`).

## 3. Theming & Colors (No Hardcoding)

* **NEVER hardcode colors** (e.g., `Colors.red`, `Colors.white`, or `Color(0xFF...)`).
* All colors, typography, and spacing must be pulled from project theme APIs:
  - Colors: `context.colorScheme` and `context.themeService`.
  - Color Opacity (Flutter 3.27+): Use `color.withValues(alpha: 0.5)` instead of `withOpacity`.
  - Typography: `context.headlineX()` / `context.bodyX()` extension methods from `app_text_styles.dart`.
  - Spacing & Margins: `Gap.medium16`, `Gap.small8`, `AppSpacing.allMd16`, `AppSpacing.horizontalLg24`.
  - Radii: `AppRadius.md12`, `AppRadius.small8`.
* If a new brand color is needed, add it to the theme system before using it in UI code.

## 4. UI Components (Reuse Common Widgets)

* Strictly use predefined common widgets located in `lib/utils/widgets/` to maintain UI consistency:
  - **App Bars:** Use `CommonAppBar`.
  - **Buttons:** Use `CommonButton.primary()`, `CommonButton.outline()`, or `CommonButton.text()`.
  - **Form Fields:** Use `EmailFormField`, `PasswordFormField`, `PhoneFormField`, `StepperFormField`, `DescriptionFormField`.
  - **Images & Avatars:** Use `CommonImage` and `ProfileAvatar`.
  - **Feedback & Dialogs:** Use `CommonDialog`, `CommonBottomSheet`, `LocationPermissionCard`, and `CommonShimmer`.
  - **Layout & Structure:** Use `ExtendedColumn` and `RelativeGap` where appropriate.
* **Widget Extraction (No Helper Methods):** DO NOT create private helper methods that return `Widget` (e.g., `Widget _buildHeader() {...}`). Instead, extract them into separate `StatelessWidget` classes in `presentation/widgets/`.
* **One Widget Per File:** Every extracted widget belongs in its own file and should be exported through `presentation/widgets/widgets.dart` or `index.dart`.

## 5. Code Quality, Imports & Formatting

* **Imports:** 
  - Cross-feature infrastructure, storage, network, error models, and usecase wrappers: `import 'package:react_hono_flutter_template/core/core.dart';`.
  - Common UI widgets, formatters, tokens, and theme extensions: `import 'package:react_hono_flutter_template/utils/utils.dart';`.
  - Always keep imports sorted and remove unused imports.
* **Scoped Formatting & Fixing:** Ensure all modified files end with a newline.
  - **IMPORTANT:** Only run `dart format` or `dart fix --apply` on the specific feature directory you are modifying (e.g., `dart format lib/features/rides/` or `dart format lib/features/auth/`).
  - **NEVER** run formatting or fixing batch commands across the entire repository to avoid polluting git history.

## 6. Localization (Strict L10n)

* **NEVER hardcode user-facing text** in the UI.
* Add all new strings to `lib/l10n/arb/app_en.arb`.
* Access strings in the UI using `context.l10n.keyName`.

---

## Step-by-Step Feature Workflow

1. **Domain Layer**:
   - Define pure Entity classes and use case `*Params` (pure Dart, zero `toJson()`/`fromJson()`).
   - Define abstract Repository interface accepting domain `*Params` / `Entity` directly and returning `Future<Result<T>>`.
   - Implement UseCases forwarding whole `*Params` directly to the repository (no unpacking into primitives).
2. **Data Layer**:
   - Implement Data Transfer Objects (`*RequestModel`, `*DTO`) with `toJson()` and `RequestModel.fromEntity(params)` / `toEntity()`.
   - Implement Remote DataSource using `safeApiCall` for HTTP/API calls consuming Data models or primitives (never Domain entities).
   - Implement Repository calling DataSource wrapped in `safeRepositoryCall` and performing domain $\leftrightarrow$ data mapping.
3. **State Management**:
   - Define BLoC/Cubit Events and States (extending `Equatable`).
   - Handle UseCases with Dart 3 pattern matching (`switch (result) { case ResultSuccess(:final data) => ... case ResultFailure(:final failure) => ... }`).
4. **Presentation Layer**:
   - Add localized strings to `lib/l10n/arb/app_en.arb`.
   - Build UI pages using `BlocBuilder`/`BlocListener` and reusable widgets from `lib/utils/widgets/`.
   - Extract atomic components into `presentation/widgets/`.
5. **Dependency Injection**:
   - Create `feature_name_injection.dart` registering DataSources, Repositories, UseCases, and Blocs.
   - Register the feature injection in `lib/core/di/injection_container.dart`.
6. **Verification & Quality Gate**:
   - Run `dart analyze lib/features/<feature_name>` to verify 0 errors and 0 warnings.
   - Run scoped tests with `flutter test test/features/<feature_name>`.
