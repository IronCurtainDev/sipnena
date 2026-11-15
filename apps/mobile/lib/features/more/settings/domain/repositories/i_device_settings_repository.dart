abstract interface class IDeviceSettingsRepository {
  Future<bool> openAppSettings();
  Future<bool> openLocationSettings();
}
