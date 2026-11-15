import 'package:react_hono_flutter_template/core/core.dart';

/// Use case to resolve the device's FCM push token for registration.
class GetDevicePushTokenUseCase implements UseCase<String, NoParams> {
  const GetDevicePushTokenUseCase(this._repository);

  final IPushNotificationRepository _repository;

  @override
  Future<Result<String>> call(NoParams params) async {
    try {
      final token = await _repository.getDevicePushToken();
      return Result.success(token);
    } on Object catch (error) {
      return Result.failure(ServerFailure(error.toString()));
    }
  }
}
