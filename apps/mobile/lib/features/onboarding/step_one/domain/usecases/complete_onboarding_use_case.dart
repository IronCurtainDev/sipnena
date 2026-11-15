import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_one/domain/entities/complete_onboarding_params.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_one/domain/repositories/i_step_one_repository.dart';

/// Use case for completing the onboarding process.
class CompleteOnboardingUseCase implements UseCase<UserProfile, CompleteOnboardingParams> {
  const CompleteOnboardingUseCase(this._repository);

  final IStepOneRepository _repository;

  @override
  Future<Result<UserProfile>> call(CompleteOnboardingParams params) {
    return _repository.completeOnboarding(params);
  }
}
