import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/data/datasources/verify_resend_remote_data_source.dart';

class VerifyResendRemoteDataSourceImpl implements VerifyResendRemoteDataSource {
  const VerifyResendRemoteDataSourceImpl({
    required AuthApiClient authApiClient,
  }) : _client = authApiClient;

  // ignore: unused_field
  final AuthApiClient _client;

  @override
  Future<void> resendVerificationCode() async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCallVoid(
    //   apiCall: _client.resendVerificationCode,
    // );

    await Future<void>.delayed(const Duration(milliseconds: 500));
  }
}
