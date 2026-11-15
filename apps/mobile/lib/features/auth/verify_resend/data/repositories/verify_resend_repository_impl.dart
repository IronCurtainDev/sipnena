import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/data/datasources/verify_resend_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/domain/repositories/i_verify_resend_repository.dart';

class VerifyResendRepositoryImpl implements IVerifyResendRepository {
  const VerifyResendRepositoryImpl({
    required this.remoteDataSource,
  });

  final VerifyResendRemoteDataSource remoteDataSource;

  @override
  Future<Result<void>> resendVerificationCode() {
    return safeRepositoryCall(remoteDataSource.resendVerificationCode);
  }
}
