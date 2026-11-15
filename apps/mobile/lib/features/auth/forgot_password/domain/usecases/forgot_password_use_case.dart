import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/domain/repositories/i_forgot_password_repository.dart';

/// Use case for sending a forgot password request.
class ForgotPasswordUseCase implements UseCase<void, ForgotPasswordParams> {
  const ForgotPasswordUseCase(this._repository);

  final IForgotPasswordRepository _repository;

  @override
  Future<Result<void>> call(ForgotPasswordParams params) {
    return _repository.forgotPassword(params);
  }
}
