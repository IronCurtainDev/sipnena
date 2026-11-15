import 'package:react_hono_flutter_template/core/auth_core/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/core/auth_core/domain/repositories/repositories.dart';
import 'package:react_hono_flutter_template/core/core.dart';

/// Use case for getting the stored session.
class GetStoredSessionUseCase implements UseCase<AuthSession?, NoParams> {
  const GetStoredSessionUseCase(this._repository);

  final IAuthSessionRepository _repository;

  @override
  Future<Result<AuthSession?>> call(NoParams params) async {
    final session = await _repository.getStoredSession();
    return Result.success(session);
  }
}
