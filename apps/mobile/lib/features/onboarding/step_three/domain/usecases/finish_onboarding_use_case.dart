import 'package:react_hono_flutter_template/core/auth_core/domain/domain.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_three/domain/entities/submit_step_three_params.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_three/domain/repositories/i_step_three_repository.dart';

/// Use case for completing step three, finishing onboarding, and updating the authenticated session.
class FinishOnboardingUseCase implements UseCase<AuthSession, SubmitStepThreeParams> {
  const FinishOnboardingUseCase(this._repository);

  final IStepThreeRepository _repository;

  @override
  Future<Result<AuthSession>> call(SubmitStepThreeParams params) async {
    return _repository.submitStepThree(params);
  }
}
