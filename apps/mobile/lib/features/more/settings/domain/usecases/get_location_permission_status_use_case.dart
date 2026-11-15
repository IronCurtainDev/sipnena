import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/settings/domain/entities/location_access_status.dart';

class GetLocationPermissionStatusUseCase implements UseCase<LocationAccessStatus, NoParams> {
  const GetLocationPermissionStatusUseCase(this._locationRepository);

  final ILocationRepository _locationRepository;

  @override
  Future<Result<LocationAccessStatus>> call(NoParams params) async {
    try {
      final serviceEnabled = await _locationRepository.isLocationServiceEnabled();
      if (!serviceEnabled) {
        return const Result.success(LocationAccessStatus.serviceDisabled);
      }

      final permission = await _locationRepository.getPermissionStatus();
      if (permission.isGranted) {
        return const Result.success(LocationAccessStatus.enabled);
      } else if (permission.isPermanentlyDenied) {
        return const Result.success(LocationAccessStatus.permissionPermanentlyDenied);
      } else {
        return const Result.success(LocationAccessStatus.permissionDenied);
      }
    } catch (e) {
      return Result.failure(ServerFailure(e.toString()));
    }
  }
}
