import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_two/domain/entities/submit_step_two_params.dart';

abstract interface class IStepTwoRepository {
  Future<Result<bool>> submitStepTwo(SubmitStepTwoParams params);
}
