# BLoC & State Management Rules

## 1. Bloc vs Cubit
- Use **Cubit** when the state flow is simple and action-driven (load, refresh, submit, toggle, select).
- Use **Bloc** when event streams are complex (multiple event sources, advanced debouncing/throttling, or orchestration-heavy flows).
- For new feature flows and touched files, default to BLoC/Cubit instead of ad-hoc local state.

## 2. State Definitions
- State classes must be immutable and use `equatable` or `freezed`.
- Prefer clear state shapes, for example: `initial`, `loading`, `success`, and `failure`.
- Include user-safe error messages in failure states; do not expose raw exception text to the UI.

## 3. Event Definitions
- Name events by user intent or system trigger, e.g., `ProfileRequested`, `SubmitPressed`, `LocationPermissionChecked`.
- Keep events focused and small. One event should represent one intention.
- Put mapping/orchestration logic in Bloc handlers, not in widgets.

## 4. UI Integration
- Use `BlocBuilder` for rendering UI from state.
- Use `BlocListener` for one-off side effects such as navigation, dialogs, and snackbars.
- Use `BlocConsumer` only when a widget needs both state rendering and side effects.
- Keep side effects out of `build()` methods.

## 5. Dependency Injection
- Resolve Blocs/Cubits through `get_it` and inject UseCases/repositories via constructors.
- Do not instantiate repositories/data sources directly in presentation widgets.

## 6. setState Policy (Hybrid)
- In new feature flows and touched feature logic, avoid `setState` and use BLoC/Cubit state transitions.
- Existing legacy pages may keep `setState` temporarily for local UI behavior until they are refactored.
- Do not introduce new long-lived business logic in `setState` blocks.
