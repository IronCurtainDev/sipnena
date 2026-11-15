import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/domain/repositories/i_change_password_repository.dart';

class ChangePasswordUseCase implements UseCase<void, ChangePasswordParams> {
  const ChangePasswordUseCase(this._repository);

  final IChangePasswordRepository _repository;

  @override
  Future<Result<void>> call(ChangePasswordParams params) {
    return _repository.changePassword(params);
  }
}
