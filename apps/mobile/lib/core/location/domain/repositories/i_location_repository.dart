import 'package:react_hono_flutter_template/core/core.dart';

abstract interface class ILocationRepository {
  Future<bool> isLocationServiceEnabled();
  Future<bool> checkPermission();
  Future<bool> requestPermission();
  Future<LocationPermissionStatus> getPermissionStatus();
  Future<LocationPermissionStatus> requestPermissionStatus();
  Future<Result<AppLocation>> getCurrentLocation();
}
