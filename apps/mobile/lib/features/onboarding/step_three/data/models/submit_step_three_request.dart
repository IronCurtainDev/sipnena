import 'package:react_hono_flutter_template/features/onboarding/step_three/domain/entities/submit_step_three_params.dart';

class SubmitStepThreeRequest {
  const SubmitStepThreeRequest({
    required this.occupation,
  });

  factory SubmitStepThreeRequest.fromEntity(SubmitStepThreeParams params) {
    return SubmitStepThreeRequest(
      occupation: params.occupation,
    );
  }

  final String occupation;

  Map<String, dynamic> toJson() => {
        'occupation': occupation,
      };
}
