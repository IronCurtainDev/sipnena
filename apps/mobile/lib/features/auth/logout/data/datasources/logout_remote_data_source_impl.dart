import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/logout/data/datasources/logout_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/logout/data/models/logout_request_model.dart';

class LogoutRemoteDataSourceImpl implements LogoutRemoteDataSource {
  const LogoutRemoteDataSourceImpl({
    required AuthApiClient authApiClient,
  }) : _client = authApiClient;

  // ignore: unused_field
  final AuthApiClient _client;

  @override
  Future<void> logout(LogoutRequestModel request) async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCallVoid(
    //   apiCall: _client.logout,
    // );

    await Future<void>.delayed(const Duration(milliseconds: 300));
  }
}
