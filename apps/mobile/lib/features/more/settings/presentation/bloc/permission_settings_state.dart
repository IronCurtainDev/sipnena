import 'package:equatable/equatable.dart';

enum PermissionSettingsStatus {
  initial,
  loading,
  ready,
  failure,
}

enum LocationAccessActionRequired {
  none,
  enableLocationServices,
  openAppSettingsToEnable,
  openAppSettingsToDisable,
}

class PermissionSettingsState extends Equatable {
  const PermissionSettingsState({
    this.status = PermissionSettingsStatus.initial,
    this.isLocationActive = false,
    this.actionRequired = LocationAccessActionRequired.none,
    this.errorMessage,
  });

  final PermissionSettingsStatus status;
  final bool isLocationActive;
  final LocationAccessActionRequired actionRequired;
  final String? errorMessage;

  PermissionSettingsState copyWith({
    PermissionSettingsStatus? status,
    bool? isLocationActive,
    LocationAccessActionRequired? actionRequired,
    String? errorMessage,
  }) {
    return PermissionSettingsState(
      status: status ?? this.status,
      isLocationActive: isLocationActive ?? this.isLocationActive,
      actionRequired: actionRequired ?? this.actionRequired,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }

  @override
  List<Object?> get props => [
        status,
        isLocationActive,
        actionRequired,
        errorMessage,
      ];
}
