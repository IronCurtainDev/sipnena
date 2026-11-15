import 'package:react_hono_flutter_template/core/auth_core/domain/domain.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_three/data/datasource/step_three_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_three/data/models/submit_step_three_request.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_three/domain/entities/submit_step_three_params.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_three/domain/repositories/i_step_three_repository.dart';

class StepThreeRepositoryImpl implements IStepThreeRepository {
  StepThreeRepositoryImpl(this._remoteDataSource, this._authSessionRepository);

  final StepThreeRemoteDataSource _remoteDataSource;
  final IAuthSessionRepository _authSessionRepository;

  @override
  Future<Result<AuthSession>> submitStepThree(SubmitStepThreeParams params) async {
    return safeRepositoryCall(() async {
      final request = SubmitStepThreeRequest.fromEntity(params);
      await _remoteDataSource.submitStepThree(request);
      final sessionResult = await _authSessionRepository.refreshSession();
      return sessionResult.fold(
        onSuccess: (session) => session,
        onFailure: (failure) => throw ServerException(failure.message),
      );
    });
  }
}
