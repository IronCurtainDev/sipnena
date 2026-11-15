import 'package:dio/dio.dart';
import 'package:react_hono_flutter_template/features/onboarding/step_one/domain/entities/complete_onboarding_params.dart';

class SubmitStepOneRequest {
  const SubmitStepOneRequest({
    required this.firstName,
    required this.lastName,
    required this.phoneNumber,
    required this.countryCode,
    required this.imagePath,
  });

  factory SubmitStepOneRequest.fromEntity(CompleteOnboardingParams params) {
    return SubmitStepOneRequest(
      firstName: params.firstName,
      lastName: params.lastName,
      phoneNumber: params.phoneNumber,
      countryCode: params.countryCode,
      imagePath: params.imagePath,
    );
  }

  final String firstName;
  final String lastName;
  final String phoneNumber;
  final String countryCode;
  final String imagePath;

  Future<Map<String, dynamic>> toFormDataMap() async {
    final formDataMap = <String, dynamic>{
      'first_name': firstName,
      'last_name': lastName,
      'phone': phoneNumber,
      'dial_code': countryCode,
    };

    final trimmedImagePath = imagePath.trim();
    if (trimmedImagePath.isEmpty) {
      throw Exception('Profile image is required');
    }

    if (!trimmedImagePath.startsWith('http://') && !trimmedImagePath.startsWith('https://')) {
      formDataMap['image'] = await MultipartFile.fromFile(
        trimmedImagePath,
        filename: trimmedImagePath.split('/').last,
      );
    }

    return formDataMap;
  }
}
