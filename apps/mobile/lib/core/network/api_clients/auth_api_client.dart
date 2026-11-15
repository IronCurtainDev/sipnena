import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class AuthApiClient {
  const AuthApiClient(this._client);
  final ApiClient _client;
  static const String _basePath = '';

  Future<Response<dynamic>> login(Map<String, dynamic> data) {
    return _client.post(
      '$_basePath/login',
      data: data,
    );
  }

  Future<Response<dynamic>> register(Map<String, dynamic> data) {
    return _client.post(
      '$_basePath/register',
      data: data,
    );
  }

  Future<Response<dynamic>> logout() {
    return _client.get('$_basePath/logout');
  }

  Future<Response<dynamic>> getProfile() {
    return _client.get('$_basePath/profile');
  }

  Future<Response<dynamic>> verifyEmail(Map<String, dynamic> data) {
    return _client.post(
      '$_basePath/verification/verify',
      data: data,
    );
  }

  Future<Response<dynamic>> resendVerificationCode({String? token}) {
    return _client.post(
      '$_basePath/verification/resend',
      options: token != null ? Options(headers: {'Authorization': 'Bearer $token'}) : null,
    );
  }

  Future<Response<dynamic>> forgotPassword(Map<String, dynamic> data) {
    return _client.post(
      '$_basePath/password/email',
      data: data,
    );
  }

  Future<Response<dynamic>> changePassword(Map<String, dynamic> data) {
    return _client.post(
      '$_basePath/password/change',
      data: data,
    );
  }
}
