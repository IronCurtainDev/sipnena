import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/data/datasources/forgot_password_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/data/models/models.dart';

class ForgotPasswordRemoteDataSourceImpl implements ForgotPasswordRemoteDataSource {
  const ForgotPasswordRemoteDataSourceImpl({
    required AuthApiClient authApiClient,
  }) : _client = authApiClient;

  // ignore: unused_field
  final AuthApiClient _client;

  @override
  Future<void> forgotPassword(ForgotPasswordRequestModel request) async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCallVoid(
    //   apiCall: () => _client.forgotPassword(request.toJson()),
    // );

    await Future<void>.delayed(const Duration(milliseconds: 500));
  }
}
