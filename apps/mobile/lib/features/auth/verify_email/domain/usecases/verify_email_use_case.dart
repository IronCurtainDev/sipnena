import 'package:react_hono_flutter_template/core/auth_core/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/domain/repositories/i_verify_email_repository.dart';

/// Use case for verifying email with a code.
class VerifyEmailUseCase implements UseCase<AuthSession, VerifyEmailParams> {
  const VerifyEmailUseCase(this._repository);

  final IVerifyEmailRepository _repository;

  @override
  Future<Result<AuthSession>> call(VerifyEmailParams params) {
    return _repository.verifyEmail(params);
  }
}
