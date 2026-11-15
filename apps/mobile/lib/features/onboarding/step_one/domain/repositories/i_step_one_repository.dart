import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_one/domain/entities/complete_onboarding_params.dart';

abstract interface class IStepOneRepository {
  Future<Result<UserProfile>> completeOnboarding(CompleteOnboardingParams params);
}
