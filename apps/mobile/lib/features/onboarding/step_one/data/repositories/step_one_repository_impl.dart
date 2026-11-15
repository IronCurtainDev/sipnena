import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_one/data/datasource/step_one_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_one/data/models/submit_step_one_request.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_one/domain/entities/complete_onboarding_params.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_one/domain/repositories/i_step_one_repository.dart';

class StepOneRepositoryImpl implements IStepOneRepository {
  const StepOneRepositoryImpl(this._remoteDataSource);

  final StepOneRemoteDataSource _remoteDataSource;

  @override
  Future<Result<UserProfile>> completeOnboarding(CompleteOnboardingParams params) async {
    return safeRepositoryCall(() async {
      final request = SubmitStepOneRequest.fromEntity(params);
      final model = await _remoteDataSource.updateDetails(request);
      return model.toEntity();
    });
  }
}
