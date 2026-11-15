import 'package:react_hono_flutter_template/core/auth_core/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/domain/repositories/i_sign_in_repository.dart';

/// Use case for logging in a user.
class LoginUseCase implements UseCase<AuthSession, LoginParams> {
  const LoginUseCase(this._repository);

  final ISignInRepository _repository;

  @override
  Future<Result<AuthSession>> call(LoginParams params) {
    return _repository.login(params);
  }
}
