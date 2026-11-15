import 'package:react_hono_flutter_template/core/core.dart';

class GetDeviceLocationUseCase implements UseCase<AppLocation, NoParams> {
  const GetDeviceLocationUseCase(this._repository);

  final ILocationRepository _repository;

  @override
  Future<Result<AppLocation>> call(NoParams params) async {
    try {
      final serviceEnabled = await _repository.isLocationServiceEnabled();
      if (!serviceEnabled) {
        return const Result.failure(ValidationFailure('Please enable location services on your device'));
      }

      var hasPermission = await _repository.checkPermission();
      if (!hasPermission) {
        hasPermission = await _repository.requestPermission();
      }

      if (!hasPermission) {
        return const Result.failure(ValidationFailure('Location permission was not granted'));
      }

      return await _repository.getCurrentLocation();
    } catch (e) {
      return Result.failure(ValidationFailure(e.toString()));
    }
  }
}
