import 'package:react_hono_flutter_template/core/auth_core/domain/domain.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_three/domain/entities/submit_step_three_params.dart';

abstract interface class IStepThreeRepository {
  Future<Result<AuthSession>> submitStepThree(SubmitStepThreeParams params);
}
