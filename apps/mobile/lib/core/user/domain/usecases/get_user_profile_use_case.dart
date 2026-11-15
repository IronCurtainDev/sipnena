import 'package:react_hono_flutter_template/core/core.dart';

class GetUserProfileUseCase implements UseCase<UserProfile, NoParams> {
  const GetUserProfileUseCase(this._repository);

  final IUserRepository _repository;

  @override
  Future<Result<UserProfile>> call(NoParams params) async {
    return _repository.getUserProfile();
  }
}
