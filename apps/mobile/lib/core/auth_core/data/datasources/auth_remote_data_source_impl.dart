import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';

class AuthSessionRemoteDataSourceImpl implements AuthSessionRemoteDataSource {
  const AuthSessionRemoteDataSourceImpl({
    required AuthApiClient authApiClient,
  }) : _authClient = authApiClient;

  // ignore: unused_field
  final AuthApiClient _authClient;

  @override
  Future<AuthSessionModel> getProfile() async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCall(
    //   apiCall: _authClient.getProfile,
    //   fromJson: AuthSessionModel.fromJson,
    // );

    await Future<void>.delayed(const Duration(milliseconds: 300));
    return AuthSessionModel(
      userId: '1',
      uuid: 'mock-user-uuid-1',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      accessToken: 'mock_access_token_12345',
      createdAt: DateTime.now(),
      isEmailVerified: true,
      isProfileCompleted: true,
    );
  }
}
