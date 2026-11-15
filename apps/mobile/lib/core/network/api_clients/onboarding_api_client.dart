import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class OnboardingApiClient {
  const OnboardingApiClient(this._apiClient);

  final ApiClient _apiClient;
  static const String _basePath = '/rider/profile-setup';

  Future<Response<dynamic>> updateProfileSteps(FormData data) {
    return _apiClient.post('$_basePath/profile-steps/update', data: data);
  }

  Future<Response<dynamic>> uploadDrivingLicenseDetails(FormData data) {
    return _apiClient.post('$_basePath/upload-driving-licence-details', data: data);
  }
}
