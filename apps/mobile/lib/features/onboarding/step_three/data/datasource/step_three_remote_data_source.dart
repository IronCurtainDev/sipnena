import 'package:react_hono_flutter_template/features/onboarding/step_three/data/models/submit_step_three_request.dart';

abstract interface class StepThreeRemoteDataSource {
  Future<bool> submitStepThree(SubmitStepThreeRequest request);
}
