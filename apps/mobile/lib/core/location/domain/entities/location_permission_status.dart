enum LocationPermissionStatus {
  denied,
  deniedForever,
  whileInUse,
  always,
  unableToDetermine;

  bool get isGranted => this == whileInUse || this == always;
  bool get isPermanentlyDenied => this == deniedForever;
}
