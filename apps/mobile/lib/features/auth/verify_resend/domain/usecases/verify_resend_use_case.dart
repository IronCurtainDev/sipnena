import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/domain/repositories/i_verify_resend_repository.dart';

/// Use case for resending verification email with a code.
class VerifyResendEmailUseCase implements UseCase<void, NoParams> {
  const VerifyResendEmailUseCase(this._repository);

  final IVerifyResendRepository _repository;

  @override
  Future<Result<void>> call(NoParams params) {
    return _repository.resendVerificationCode();
  }
}
