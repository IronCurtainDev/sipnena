import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/features.dart';

class StepOneRemoteDataSourceImpl implements StepOneRemoteDataSource {
  StepOneRemoteDataSourceImpl({required this.apiClient});

  // ignore: unused_field
  final OnboardingApiClient apiClient;

  @override
  Future<UserProfileModel> updateDetails(SubmitStepOneRequest request) async {
    // Real API call commented out for UI/offline starter development:
    // final formDataMap = await request.toFormDataMap();
    // return safeApiCall(
    //   apiCall: () => apiClient.updateProfileSteps(FormData.fromMap(formDataMap)),
    //   fromJson: UserProfileModel.fromJson,
    // );

    await Future<void>.delayed(const Duration(milliseconds: 500));
    return UserProfileModel(
      uuid: 'mock-user-uuid-1',
      firstName: request.firstName,
      lastName: request.lastName,
      fullName: '${request.firstName} ${request.lastName}',
      dialCode: request.countryCode,
      phoneNumber: request.phoneNumber,
      isEmailVerified: true,
      isProfileCompleted: true,
    );
  }
}
