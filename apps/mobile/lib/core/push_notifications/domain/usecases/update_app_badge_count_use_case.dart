import 'package:react_hono_flutter_template/core/core.dart';

/// Pure domain use case to update or clear the device app icon badge counter.
class UpdateAppBadgeCountUseCase implements UseCase<void, int> {
  const UpdateAppBadgeCountUseCase(this._repository);

  final ILocalNotificationRepository _repository;

  @override
  Future<Result<void>> call(int count) async {
    try {
      await _repository.updateBadgeCount(count);
      return const Result.success(null);
    } on Object catch (error) {
      return Result.failure(ServerFailure(error.toString()));
    }
  }
}
