import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// API Client for Account Settings related endpoints.
class AccountSettingsApiClient {
  const AccountSettingsApiClient(this._apiClient);

  final ApiClient _apiClient;

  Future<Response<dynamic>> deleteProfile() {
    return _apiClient.post('/delete-profile');
  }
}
