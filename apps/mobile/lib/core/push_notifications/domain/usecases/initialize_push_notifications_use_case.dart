import 'package:react_hono_flutter_template/core/core.dart';

/// Use case to initialize remote push notification listeners, stream subscriptions, and native presentation options.
class InitializePushNotificationsUseCase implements UseCase<void, NoParams> {
  const InitializePushNotificationsUseCase(this._repository);

  final IPushNotificationRepository _repository;

  @override
  Future<Result<void>> call([NoParams params = const NoParams()]) async {
    try {
      await _repository.initialize();
      return const Result.success(null);
    } on Object catch (error) {
      return Result.failure(ServerFailure(error.toString()));
    }
  }
}
