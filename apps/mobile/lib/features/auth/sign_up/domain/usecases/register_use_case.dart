import 'package:react_hono_flutter_template/core/auth_core/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/domain/repositories/i_sign_up_repository.dart';

/// Use case for registering a new user.
class RegisterUseCase implements UseCase<AuthSession, RegisterParams> {
  const RegisterUseCase(this._repository);

  final ISignUpRepository _repository;

  @override
  Future<Result<AuthSession>> call(RegisterParams params) {
    return _repository.register(params);
  }
}
