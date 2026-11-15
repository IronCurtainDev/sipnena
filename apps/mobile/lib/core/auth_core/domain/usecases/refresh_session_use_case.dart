import 'package:react_hono_flutter_template/core/auth_core/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/core/auth_core/domain/repositories/repositories.dart';
import 'package:react_hono_flutter_template/core/core.dart';

/// Use case for refreshing the session by fetching the latest profile from API.
///
/// This validates the stored session by making a network request.
/// If successful, the session is updated; otherwise, it's considered invalid.
class RefreshSessionUseCase implements UseCase<AuthSession, NoParams> {
  const RefreshSessionUseCase(this._repository);

  final IAuthSessionRepository _repository;

  @override
  Future<Result<AuthSession>> call(NoParams params) async {
    return _repository.refreshSession();
  }
}
