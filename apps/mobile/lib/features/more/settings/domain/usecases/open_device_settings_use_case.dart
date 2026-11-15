import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/settings/domain/repositories/i_device_settings_repository.dart';

class OpenDeviceSettingsParams extends Equatable {
  const OpenDeviceSettingsParams({this.openLocationSettings = false});

  final bool openLocationSettings;

  @override
  List<Object?> get props => [openLocationSettings];
}

class OpenDeviceSettingsUseCase implements UseCase<bool, OpenDeviceSettingsParams> {
  const OpenDeviceSettingsUseCase(this._deviceSettingsRepository);

  final IDeviceSettingsRepository _deviceSettingsRepository;

  @override
  Future<Result<bool>> call(OpenDeviceSettingsParams params) async {
    try {
      final success = params.openLocationSettings ? await _deviceSettingsRepository.openLocationSettings() : await _deviceSettingsRepository.openAppSettings();
      return Result.success(success);
    } catch (e) {
      return Result.failure(ServerFailure(e.toString()));
    }
  }
}
