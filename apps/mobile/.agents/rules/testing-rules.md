# Testing Rules

## 1. Scope of Testing
- **Enforcement Scope**: Apply these rules strictly to new files and files touched during a task.
- **Domain Layer**: New or modified UseCases must have unit tests for success and failure paths.
- **Presentation Layer**: New or modified Bloc/Cubit classes must be tested using `bloc_test` for expected transitions (loading/success/failure where applicable).
- **Data Layer**: New or modified repositories must include tests that verify exception-to-failure mapping behavior.
- **Legacy Code**: Existing untouched modules are migrated incrementally when they are changed.

## 2. Mocking Strategy
- Strictly use `mocktail` for all mocking.
- Never make network calls in tests.
- Always use `registerFallbackValue` in `setUpAll` if your tests use `any()` with custom classes.

## 3. Test Structure
- Follow the AAA (Arrange, Act, Assert) pattern.
- Use `group` blocks to logically separate method tests.
- Use descriptive test names (e.g., `'emits [Loading, Success] when login is successful'`).
