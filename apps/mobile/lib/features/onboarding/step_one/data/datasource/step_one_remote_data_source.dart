import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_one/data/models/submit_step_one_request.dart';

abstract interface class StepOneRemoteDataSource {
  Future<UserProfileModel> updateDetails(SubmitStepOneRequest request);
}
