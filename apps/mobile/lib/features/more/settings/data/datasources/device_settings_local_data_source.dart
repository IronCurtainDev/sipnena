abstract interface class DeviceSettingsLocalDataSource {
  Future<bool> openAppSettings();
  Future<bool> openLocationSettings();
}
