import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/data/datasources/change_password_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/data/models/change_password_request.dart';

class ChangePasswordRemoteDataSourceImpl implements ChangePasswordRemoteDataSource {
  const ChangePasswordRemoteDataSourceImpl({
    required AuthApiClient authApiClient,
  }) : _client = authApiClient;

  // ignore: unused_field
  final AuthApiClient _client;

  @override
  Future<void> changePassword(ChangePasswordRequest request) async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCallVoid(
    //   apiCall: () => _client.changePassword(request.toJson()),
    // );

    await Future<void>.delayed(const Duration(milliseconds: 500));
  }
}
