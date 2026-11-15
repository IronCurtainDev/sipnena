import 'package:geolocator/geolocator.dart';
import 'package:react_hono_flutter_template/features/more/settings/data/datasources/device_settings_local_data_source.dart';

class DeviceSettingsLocalDataSourceImpl implements DeviceSettingsLocalDataSource {
  const DeviceSettingsLocalDataSourceImpl();

  @override
  Future<bool> openAppSettings() {
    return Geolocator.openAppSettings();
  }

  @override
  Future<bool> openLocationSettings() {
    return Geolocator.openLocationSettings();
  }
}
