import 'package:geolocator/geolocator.dart';
import 'package:react_hono_flutter_template/core/core.dart';

class LocationRepositoryImpl implements ILocationRepository {
  const LocationRepositoryImpl(this._localDataSource);

  final LocationLocalDataSource _localDataSource;

  @override
  Future<bool> isLocationServiceEnabled() async {
    return _localDataSource.isLocationServiceEnabled();
  }

  @override
  Future<bool> checkPermission() async {
    final serviceEnabled = await isLocationServiceEnabled();
    if (!serviceEnabled) {
      return false;
    }
    final permission = await _localDataSource.checkPermission();
    return permission == LocationPermission.whileInUse || permission == LocationPermission.always;
  }

  @override
  Future<bool> requestPermission() async {
    final permission = await _localDataSource.requestPermission();
    return permission == LocationPermission.whileInUse || permission == LocationPermission.always;
  }

  @override
  Future<LocationPermissionStatus> getPermissionStatus() async {
    final permission = await _localDataSource.checkPermission();
    return _mapPermission(permission);
  }

  @override
  Future<LocationPermissionStatus> requestPermissionStatus() async {
    final permission = await _localDataSource.requestPermission();
    return _mapPermission(permission);
  }

  LocationPermissionStatus _mapPermission(LocationPermission permission) {
    switch (permission) {
      case LocationPermission.denied:
        return LocationPermissionStatus.denied;
      case LocationPermission.deniedForever:
        return LocationPermissionStatus.deniedForever;
      case LocationPermission.whileInUse:
        return LocationPermissionStatus.whileInUse;
      case LocationPermission.always:
        return LocationPermissionStatus.always;
      case LocationPermission.unableToDetermine:
        return LocationPermissionStatus.unableToDetermine;
    }
  }

  @override
  Future<Result<AppLocation>> getCurrentLocation() async {
    try {
      final position = await _localDataSource.getCurrentPosition();
      return Result.success(AppLocation(latitude: position.latitude, longitude: position.longitude));
    } catch (e) {
      return const Result.failure(ValidationFailure('Unable to get current location'));
    }
  }
}
