import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/domain/repositories/repositories.dart';

class UpdateAccountUseCase implements UseCase<UserProfile, UpdateAccountParams> {
  const UpdateAccountUseCase(this._repository);

  final IEditAccountRepository _repository;

  @override
  Future<Result<UserProfile>> call(UpdateAccountParams params) {
    return _repository.updateAccount(params);
  }
}
