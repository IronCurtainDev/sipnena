import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_two/data/datasource/step_two_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_two/data/models/submit_step_two_request.dart';

class StepTwoRemoteDataSourceImpl implements StepTwoRemoteDataSource {
  StepTwoRemoteDataSourceImpl({required this.apiClient});

  // ignore: unused_field
  final OnboardingApiClient apiClient;

  @override
  Future<bool> submitStepTwo(SubmitStepTwoRequest request) async {
    // Mocked response for starter development
    await Future<void>.delayed(const Duration(milliseconds: 500));
    return true;
  }
}
