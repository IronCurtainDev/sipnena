import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_three/data/datasource/step_three_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_three/data/models/submit_step_three_request.dart';

class StepThreeRemoteDataSourceImpl implements StepThreeRemoteDataSource {
  StepThreeRemoteDataSourceImpl({required this.apiClient});

  // ignore: unused_field
  final OnboardingApiClient apiClient;

  @override
  Future<bool> submitStepThree(SubmitStepThreeRequest request) async {
    // Mocked response for starter development
    await Future<void>.delayed(const Duration(milliseconds: 500));
    return true;
  }
}
