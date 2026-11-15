import 'package:geolocator/geolocator.dart';
import 'package:react_hono_flutter_template/core/location/data/datasources/location_local_data_source.dart';

class LocationLocalDataSourceImpl implements LocationLocalDataSource {
  const LocationLocalDataSourceImpl({required this.timeLimit});

  final Duration timeLimit;

  @override
  Future<bool> isLocationServiceEnabled() {
    return Geolocator.isLocationServiceEnabled();
  }

  @override
  Future<LocationPermission> checkPermission() {
    return Geolocator.checkPermission();
  }

  @override
  Future<LocationPermission> requestPermission() {
    return Geolocator.requestPermission();
  }

  @override
  Future<Position> getCurrentPosition() {
    return Geolocator.getCurrentPosition(
      locationSettings: LocationSettings(
        accuracy: LocationAccuracy.high,
        timeLimit: timeLimit,
      ),
    );
  }
}
