import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/profile/delete_account/domain/repositories/repositories.dart';

class DeleteAccountUseCase implements UseCase<void, NoParams> {
  const DeleteAccountUseCase(this._repository);

  final IDeleteAccountRepository _repository;

  @override
  Future<Result<void>> call(NoParams params) async {
    return _repository.deleteAccount();
  }
}
