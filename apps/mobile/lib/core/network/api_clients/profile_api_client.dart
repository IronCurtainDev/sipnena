import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// API Client for Profile related endpoints.
class ProfileApiClient {
  const ProfileApiClient(this._apiClient);

  final ApiClient _apiClient;

  Future<Response<dynamic>> uploadAvatar(FormData data) {
    return _apiClient.post(
      '/avatar',
      data: data,
    );
  }

  Future<Response<dynamic>> updateAccount(FormData data) {
    return _apiClient.post(
      '/rider/account/update',
      data: data,
    );
  }
}
