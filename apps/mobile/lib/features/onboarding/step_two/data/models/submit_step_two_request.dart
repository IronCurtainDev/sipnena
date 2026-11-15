import 'package:react_hono_flutter_template/features/onboarding/step_two/domain/entities/submit_step_two_params.dart';

class SubmitStepTwoRequest {
  const SubmitStepTwoRequest({
    required this.address,
  });

  factory SubmitStepTwoRequest.fromEntity(SubmitStepTwoParams params) {
    return SubmitStepTwoRequest(
      address: params.address,
    );
  }

  final String address;

  Map<String, dynamic> toJson() => {
        'address': address,
      };
}
