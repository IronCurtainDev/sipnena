import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_two/data/datasource/step_two_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_two/data/models/submit_step_two_request.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_two/domain/entities/submit_step_two_params.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_two/domain/repositories/i_step_two_repository.dart';

class StepTwoRepositoryImpl implements IStepTwoRepository {
  StepTwoRepositoryImpl(this._remoteDataSource);

  final StepTwoRemoteDataSource _remoteDataSource;

  @override
  Future<Result<bool>> submitStepTwo(SubmitStepTwoParams params) async {
    return safeRepositoryCall(() async {
      final request = SubmitStepTwoRequest.fromEntity(params);
      return _remoteDataSource.submitStepTwo(request);
    });
  }
}
