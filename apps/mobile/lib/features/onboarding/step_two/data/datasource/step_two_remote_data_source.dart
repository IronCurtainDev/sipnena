import 'package:react_hono_flutter_template/features/onboarding/step_two/data/models/submit_step_two_request.dart';

abstract interface class StepTwoRemoteDataSource {
  Future<bool> submitStepTwo(SubmitStepTwoRequest request);
}
