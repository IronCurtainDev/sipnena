# Error Handling & Logging Rules

## 1. No Raw Print Statements
- **NEVER** use `print()` in production code.
- For temporary local debugging, use `debugPrint()` (from `flutter/foundation.dart`) or `log()` (from `dart:developer`) to avoid console truncation and ensure it integrates with DevTools.
- For permanent logging (e.g., error tracking), rely on a dedicated logger package (like `logger` or `talker`) or structured crashlytics rather than spamming the console.

## 2. Repository Error Mapping
- The **Data Layer** (Repositories) is the ONLY layer that should deal with raw exceptions (`ServerException`, `SocketException`, `PlatformException`).
- Repositories MUST catch these exceptions and map them to domain-level `Failure` objects (e.g., `ServerFailure`, `NetworkFailure`).
- The **Domain Layer** (UseCases) and **Presentation Layer** (Blocs) should NEVER see a raw `Exception`. They only deal with the project's custom sealed `Result<T>` type (`Success<T>` / `Failure<T>` from `package:react_hono_flutter_template/core/usecases/result.dart`). Do NOT use `Either` or import external functional libraries like `dartz` or `fpdart`.

## 3. UI Error Presentation
- Blocs should emit Failure states containing user-friendly messages, not raw technical stack traces.
- The UI must listen for Failure states and present them using standardized components (e.g., `CommonDialog.alert` or `AppSnackBar`).
