import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/logout/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/features/auth/logout/domain/repositories/i_logout_repository.dart';

class LogoutUseCase implements UseCase<void, LogoutParams> {
  const LogoutUseCase(this._repository);

  final ILogoutRepository _repository;

  @override
  Future<Result<void>> call(LogoutParams params) {
    return _repository.logout(params);
  }
}
