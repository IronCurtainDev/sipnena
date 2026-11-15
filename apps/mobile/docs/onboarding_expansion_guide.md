# Developer Guide: Expanding the Onboarding Flow

This guide provides a detailed technical walkthrough for adding new steps to the multi-stage onboarding process in the `starter-clean-bloc` boilerplate.

## Overview of the Onboarding Architecture

The onboarding flow uses a modular, step-driven Clean Architecture pattern:
1. **Flow Controller (`OnboardingStepCubit`)**: Manages the active step index and overall step transitions (`lib/features/onboarding/onboarding_core/presentation/bloc/onboarding_step_cubit.dart`).
2. **Flow View (`OnboardingFlow`)**: Uses a `PageView` and indicator to display individual step screens (`lib/features/onboarding/onboarding_core/presentation/pages/onboarding_flow.dart`).
3. **Step Modules (`step_one`, `step_two`, etc.)**: Each step is an isolated feature module containing its own data, domain, and presentation (Cubit, pages, widgets).

---

## Step-by-Step Instructions for Adding a New Step

### 1. Create the Step Module
Create a new directory for your step under `lib/features/onboarding/step_five/` following Clean Architecture:
```text
step_five/
├── data/
│   ├── datasources/
│   ├── models/
│   └── repositories/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
└── presentation/
    ├── bloc/
    ├── pages/
    └── widgets/
```

### 2. Define the Domain UseCase
Define any payload entities and use cases required to persist or validate step data:

```dart
class CompleteStepFiveParams extends Equatable {
  const CompleteStepFiveParams({required this.data});
  final String data;

  @override
  List<Object?> get props => [data];
}

abstract interface class IStepFiveRepository {
  Future<Result<bool>> submitStepFive(CompleteStepFiveParams params);
}

class CompleteStepFiveUseCase implements UseCase<Result<bool>, CompleteStepFiveParams> {
  const CompleteStepFiveUseCase(this._repository);
  final IStepFiveRepository _repository;

  @override
  Future<Result<bool>> call(CompleteStepFiveParams params) {
    return _repository.submitStepFive(params);
  }
}
```

### 3. Create the Step UI Page
Create the step page widget in `lib/features/onboarding/step_five/presentation/pages/step_five.dart`:

```dart
class StepFive extends StatelessWidget {
  const StepFive({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Step specific inputs and widgets
      ],
    );
  }
}
```

### 4. Register in OnboardingFlow
Mount the new step inside `OnboardingFlow` (`lib/features/onboarding/onboarding_core/presentation/pages/onboarding_flow.dart`) in the `PageView` children list and update the total step count indicator.

---

## Technical References
- **Flow State Management**: `lib/features/onboarding/onboarding_core/presentation/bloc/onboarding_step_cubit.dart`
- **Flow Container**: `lib/features/onboarding/onboarding_core/presentation/pages/onboarding_flow.dart`
- **Dependency Registration**: `lib/features/onboarding/onboarding_core/onboarding_injection.dart`
