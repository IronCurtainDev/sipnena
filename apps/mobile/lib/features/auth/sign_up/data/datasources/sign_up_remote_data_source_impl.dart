import 'package:react_hono_flutter_template/core/auth_core/data/models/models.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/data/datasources/sign_up_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/data/models/register_request.dart';

class SignUpRemoteDataSourceImpl implements SignUpRemoteDataSource {
  const SignUpRemoteDataSourceImpl({
    required AuthApiClient authApiClient,
  }) : _client = authApiClient;

  // ignore: unused_field
  final AuthApiClient _client;

  @override
  Future<AuthSessionModel> register(RegisterRequest request) async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCall(
    //   apiCall: () => _client.register(request.toJson()),
    //   fromJson: AuthSessionModel.fromJson,
    // );

    await Future<void>.delayed(const Duration(milliseconds: 500));
    return AuthSessionModel(
      userId: '1',
      uuid: 'mock-user-uuid-1',
      email: request.email,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      accessToken: 'mock_access_token_12345',
      createdAt: DateTime.now(),
    );
  }
}
