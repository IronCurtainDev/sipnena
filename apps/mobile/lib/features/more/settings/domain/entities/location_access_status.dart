enum LocationAccessStatus {
  enabled,
  serviceDisabled,
  permissionDenied,
  permissionPermanentlyDenied;

  bool get isEnabled => this == enabled;
}
