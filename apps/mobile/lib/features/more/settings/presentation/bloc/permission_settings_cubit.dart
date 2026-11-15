import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/settings/domain/domain.dart';
import 'package:react_hono_flutter_template/features/more/settings/presentation/bloc/permission_settings_state.dart';

class PermissionSettingsCubit extends Cubit<PermissionSettingsState> {
  PermissionSettingsCubit({
    required GetLocationPermissionStatusUseCase getLocationPermissionStatusUseCase,
    required RequestLocationAccessUseCase requestLocationAccessUseCase,
    required OpenDeviceSettingsUseCase openDeviceSettingsUseCase,
  })  : _getLocationPermissionStatusUseCase = getLocationPermissionStatusUseCase,
        _requestLocationAccessUseCase = requestLocationAccessUseCase,
        _openDeviceSettingsUseCase = openDeviceSettingsUseCase,
        super(const PermissionSettingsState());

  final GetLocationPermissionStatusUseCase _getLocationPermissionStatusUseCase;
  final RequestLocationAccessUseCase _requestLocationAccessUseCase;
  final OpenDeviceSettingsUseCase _openDeviceSettingsUseCase;

  Future<void> refreshStatus() async {
    final result = await _getLocationPermissionStatusUseCase(const NoParams());

    result.fold(
      onSuccess: (accessStatus) {
        emit(
          state.copyWith(
            status: PermissionSettingsStatus.ready,
            isLocationActive: accessStatus.isEnabled,
            actionRequired: LocationAccessActionRequired.none,
          ),
        );
      },
      onFailure: (failure) {
        emit(
          state.copyWith(
            status: PermissionSettingsStatus.failure,
            errorMessage: failure.message,
          ),
        );
      },
    );
  }

  Future<void> onLocationToggled({required bool targetValue}) async {
    if (!targetValue) {
      // Apps cannot programmatically revoke OS location permissions on mobile platforms.
      // Provide an honest route to device settings while keeping the actual permission state accurate.
      emit(
        state.copyWith(
          actionRequired: LocationAccessActionRequired.openAppSettingsToDisable,
        ),
      );
      return;
    }

    emit(state.copyWith(status: PermissionSettingsStatus.loading));

    final statusResult = await _getLocationPermissionStatusUseCase(const NoParams());
    final currentStatus = statusResult.fold(
      onSuccess: (status) => status,
      onFailure: (_) => LocationAccessStatus.permissionDenied,
    );

    if (currentStatus == LocationAccessStatus.serviceDisabled) {
      emit(
        state.copyWith(
          status: PermissionSettingsStatus.ready,
          isLocationActive: false,
          actionRequired: LocationAccessActionRequired.enableLocationServices,
        ),
      );
      return;
    }

    if (currentStatus == LocationAccessStatus.permissionPermanentlyDenied) {
      emit(
        state.copyWith(
          status: PermissionSettingsStatus.ready,
          isLocationActive: false,
          actionRequired: LocationAccessActionRequired.openAppSettingsToEnable,
        ),
      );
      return;
    }

    final requestResult = await _requestLocationAccessUseCase(const NoParams());
    requestResult.fold(
      onSuccess: (newStatus) {
        if (newStatus.isEnabled) {
          emit(
            state.copyWith(
              status: PermissionSettingsStatus.ready,
              isLocationActive: true,
              actionRequired: LocationAccessActionRequired.none,
            ),
          );
        } else if (newStatus == LocationAccessStatus.permissionPermanentlyDenied) {
          emit(
            state.copyWith(
              status: PermissionSettingsStatus.ready,
              isLocationActive: false,
              actionRequired: LocationAccessActionRequired.openAppSettingsToEnable,
            ),
          );
        } else {
          emit(
            state.copyWith(
              status: PermissionSettingsStatus.ready,
              isLocationActive: false,
              actionRequired: LocationAccessActionRequired.none,
            ),
          );
        }
      },
      onFailure: (failure) {
        emit(
          state.copyWith(
            status: PermissionSettingsStatus.ready,
            isLocationActive: false,
            errorMessage: failure.message,
          ),
        );
      },
    );
  }

  Future<void> openSettings({bool openLocationSettings = false}) async {
    await _openDeviceSettingsUseCase(
      OpenDeviceSettingsParams(openLocationSettings: openLocationSettings),
    );
  }

  void clearActionRequired() {
    if (state.actionRequired != LocationAccessActionRequired.none) {
      emit(state.copyWith(actionRequired: LocationAccessActionRequired.none));
    }
  }
}
