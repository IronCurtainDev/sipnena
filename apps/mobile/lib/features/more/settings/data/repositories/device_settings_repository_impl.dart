import 'package:react_hono_flutter_template/features/more/settings/data/datasources/device_settings_local_data_source.dart';
import 'package:react_hono_flutter_template/features/more/settings/domain/repositories/i_device_settings_repository.dart';

class DeviceSettingsRepositoryImpl implements IDeviceSettingsRepository {
  const DeviceSettingsRepositoryImpl(this._localDataSource);

  final DeviceSettingsLocalDataSource _localDataSource;

  @override
  Future<bool> openAppSettings() {
    return _localDataSource.openAppSettings();
  }

  @override
  Future<bool> openLocationSettings() {
    return _localDataSource.openLocationSettings();
  }
}
