import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_two/domain/entities/submit_step_two_params.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_two/domain/repositories/i_step_two_repository.dart';

class SubmitStepTwoUseCase implements UseCase<bool, SubmitStepTwoParams> {
  const SubmitStepTwoUseCase(this._repository);

  final IStepTwoRepository _repository;

  @override
  Future<Result<bool>> call(SubmitStepTwoParams params) async {
    return _repository.submitStepTwo(params);
  }
}
