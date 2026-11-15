---
trigger: always_on
---

# Architecture & Development Rules

These rules dictate the structural foundation, architecture, and dependency management for the application.

## 1. Feature-First Clean Architecture
The application follows **Feature-First Clean Architecture**. We group code by feature, not by layer.
- **Enforcement Scope**: Apply these rules strictly to all new files and files touched during a task.
- **Feature Granularity**: Prefer cohesive feature modules (e.g., `features/home`, `features/auth`, `features/more`, `features/profile`). Split into sub-features only when the flow is large enough to justify the extra structure.
- **Shared Logic**: Cross-feature domain entities or state should reside in `lib/core/` rather than creating tight couplings between feature directories.
- **Dependency Direction**: Modules must depend inward toward the domain layer. Presentation and Data layers depend on Domain; Domain depends on nothing outside Dart/core.

## 2. Structural Layer Separation
The codebase is structured into three primary spaces:

### A. Core Layer (`lib/core/`)
Hosts cross-feature infrastructure and domain foundations:
- `auth_core/`: Global authentication token management and credentials.
- `connectivity/`: Internet connection monitoring and state.
- `di/`: Global service locator (`injection_container.dart`) using `get_it`.
- `error/`: Failure definitions (`failures.dart`) and exception types (`exceptions.dart`).
- `network/`: Dio/Http clients, interceptors, and `safeApiCall`.
- `notifications/`: Push notification services.
- `pagination/`: Paging state models and abstractions.
- `pusher/`: Real-time WebSocket / Pusher channel clients.
- `storage/`: Encrypted/local key-value storage.
- `tracking/`: Driver location tracking and geofence handlers.
- `usecases/`: Base usecase abstractions, `Result<T>`, and `safeRepositoryCall`.
- `user/`: Global driver profile entity and core user session.

### B. Utilities & Presentation Layer (`lib/utils/`)
Hosts shared presentation elements, tokens, and UI helpers:
- `constants/`: Design tokens (`AppSpacing`, `AppRadius`, `Gap`, `AppColors`).
- `extensions/`: Flutter/Dart convenience extensions (context, dates, strings, numbers).
- `formatters/`: Input and display formatters (currency, phone, date).
- `helpers/`: Non-infrastructure helper utilities.
- `widgets/`: Reusable facade widgets (`CommonAppBar`, `CommonButton`, `ProfileAvatar`, `LocationPermissionCard`, `CommonShimmer`, `CommonDialog`, `CommonBottomSheet`, `form_fields/`).

### C. Feature Modules (`lib/features/<feature_name>/`)
Each feature isolates its own three Clean Architecture layers:
- **Data Layer (`data/`)**: Contains `datasources/` (API calls via `safeApiCall`), `models/` (JSON DTOs and RequestModels), and `repositories/` (Implements domain interfaces using `safeRepositoryCall`).
- **Domain Layer (`domain/`)**: Contains `entities/` (Pure business objects), `repositories/` (Abstract interfaces), and `usecases/` (Single-responsibility business operations returning `Future<Result<T>>`).
- **Presentation Layer (`presentation/`)**: Contains `bloc/` or `cubit/` (State management), `pages/` (Screen layouts), and `widgets/` (Atomic UI components).

### 2.1 Domain Purity (Zero API/Serialization Logic in Domain)
- **Pure Dart Only**: All classes in `domain/` (entities and use case `*Params`) must be pure Dart objects (typically extending `Equatable`).
- **NO `toJson()` / `fromJson()`**: Domain objects must NEVER contain `toJson()`, `fromJson()`, or backend/network-specific field keys (e.g., snake_case API payload names). They must remain completely agnostic of transport serialization formats (JSON, Protobuf, query params).
- **Business Naming**: Naming in domain must represent business concepts, not API request payloads.

### 2.2 Repository Contract Integrity (No Unpacking in UseCases & Pragmatic Identifier Primitives)
- **Direct Resource Identifiers**: Pure resource identifiers/locators (e.g., REST URL path parameters such as `String id`, `String uuid`, `String bookingUuid`, `String cardId`) are clean domain primitives and SHOULD be passed directly as primitive arguments without wrapping them in artificial single-field `*Params` classes:
  ```dart
  // ✅ CORRECT: Clean identifier primitive for resource locators
  abstract interface class INotificationRepository {
    Future<Result<NotificationDetail>> getNotification(String uuid);
    Future<Result<bool>> deleteNotification(String uuid);
  }
  ```
- **Compound Arguments & Action Payloads Require `*Params`**: Any operation that conveys business intent payloads, POST/PUT bodies, query filters, or multiple parameters must use a dedicated domain `*Params` / `Entity` object:
  ```dart
  // ✅ CORRECT: Compound arguments / payloads use dedicated Params
  abstract interface class IDriverRepository {
    Future<Result<bool>> updateStatus(UpdateStatusParams params);
  }

  // ❌ FORBIDDEN: Unpacking compound params into loose primitives
  abstract interface class IDriverRepository {
    Future<Result<bool>> updateStatus({required String status, bool isOnline});
  }
  ```
- **UseCases Must Simply Delegate**: A UseCase must NEVER unpack a `*Params` object into loose primitive arguments when calling the repository. It must forward the object directly: `_repository.operation(params)`. Similarly, a UseCase operating on an identifier forwards the identifier directly: `_repository.deleteCard(cardId)`.

### 2.3 Data Layer Isolation & Mandatory Request Models
- **Mandatory Data Request Models for Payloads**: Every API operation that sends request bodies, form data, or query filters MUST define a dedicated Data Layer model (e.g., `*RequestModel` / `*Request`) with a `RequestModel.fromEntity(params)` factory and `toJson()` / `toFormData()` serialization.
- **Primitives Strictly Limited to Path IDs**: Primitives in DataSource signatures are strictly limited to REST URL path parameters (e.g., `String id`, `String tripUuid`). Any payload, query map, or multi-field data must be modeled as a RequestModel.
- **DataSources Must NEVER Accept Domain Objects**: DataSources must strictly accept Data Layer models (or URL path ID primitives). DataSources must NEVER import or accept Domain entities or `*Params`.
- **Repository Implementation is the Sole Adapter**: The `*RepositoryImpl` is responsible for translating between Domain and Data:
  1. **Incoming**: Maps Domain `*Params` to Data `*RequestModel` via `RequestModel.fromEntity(params)` before passing to the DataSource.
  2. **Outgoing**: Maps Data response models (`Model.toEntity()`) back to Domain entities before returning `Result.success(entity)`.

## 3. Dependency Injection
- **Strictly use `get_it`**: All dependencies (UseCases, Repositories, DataSources, API Clients, Blocs) must be registered and resolved using `GetIt.instance`.
- **Feature Injection Files**: Every feature must have a dedicated injection file (e.g., `auth_injection.dart`) defining `initAuthInjection(GetIt sl)`.
- **Global Container Registration**: Call each feature's injection init function inside `lib/core/di/injection_container.dart`.
- **Injection Order**: Register DataSources -> Repositories -> UseCases -> Blocs/Cubits.

## 4. Routing
- **Strictly use `go_router`**: All navigation must be handled using declarative routing.
- **Named Navigation**: Use `context.goNamed()` or `context.pushNamed()` configured in the router definition (`lib/app/controller/router.dart`).
- **Avoid Imperative Pushes**: Do not use raw `Navigator.of(context).push()`.

## 5. Barrel Exports
- **Submodule Index Files**: Use barrel files (`index.dart`, `widgets.dart`, `pages.dart`, `<feature_name>.dart`) to organize and encapsulate exports within directories.
- **Core & Utils Aggregation**:
  - `lib/core/core.dart`: Aggregates and exports all core modules.
  - `lib/utils/utils.dart`: Aggregates and exports all UI tokens, helpers, and common widgets.
- **Import Strategy**: Import through barrel files (e.g., `import 'package:react_hono_flutter_template/core/core.dart';` and `import 'package:react_hono_flutter_template/utils/utils.dart';`) instead of deep, fragile relative paths.

## 6. Widget Extraction & Atomic Design
- **No Helper Methods**: DO NOT create private widget builder methods inside widgets (e.g., `Widget _buildRowItem(...)`).
- **StatelessWidget Extraction**: Extract them into standalone `StatelessWidget` classes placed in `presentation/widgets/`.
- **One Widget Per File**: Maintain one widget per file for testability, clean diffs, and reusable compilation.
