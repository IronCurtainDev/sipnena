import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/more/contact_us/contact_us.dart';
import 'package:react_hono_flutter_template/features/more/legal_content/legal_content.dart';
import 'package:react_hono_flutter_template/features/more/settings/settings.dart';
import 'package:react_hono_flutter_template/features/profile/profile.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension MoreInjection on GetIt {
  void registerMoreFeature() {
    // API Clients
    if (!isRegistered<ContactApiClient>()) {
      registerLazySingleton<ContactApiClient>(
        () => ContactApiClient(get<ApiClient>()),
      );
    }

    if (!isRegistered<LegalContentApiClient>()) {
      registerLazySingleton<LegalContentApiClient>(
        () => LegalContentApiClient(get<ApiClient>()),
      );
    }

    // Contact Us Sub-feature
    if (!isRegistered<ContactRemoteDataSource>()) {
      registerLazySingleton<ContactRemoteDataSource>(
        () => ContactRemoteDataSourceImpl(contactApiClient: get<ContactApiClient>()),
      );
    }

    if (!isRegistered<IContactRepository>()) {
      registerLazySingleton<IContactRepository>(
        () => ContactRepositoryImpl(remoteDataSource: get<ContactRemoteDataSource>()),
      );
    }

    if (!isRegistered<GetContactUseCase>()) {
      registerFactory<GetContactUseCase>(
        () => GetContactUseCase(get<IContactRepository>()),
      );
    }

    if (!isRegistered<SendContactMessageUseCase>()) {
      registerFactory<SendContactMessageUseCase>(
        () => SendContactMessageUseCase(get<IContactRepository>()),
      );
    }

    if (!isRegistered<ContactCubit>()) {
      registerFactory<ContactCubit>(
        () => ContactCubit(getContactUseCase: get<GetContactUseCase>()),
      );
    }

    if (!isRegistered<ContactMessageCubit>()) {
      registerFactory<ContactMessageCubit>(
        () => ContactMessageCubit(sendContactMessageUseCase: get<SendContactMessageUseCase>()),
      );
    }

    // Legal Content Sub-feature
    if (!isRegistered<LegalContentRemoteDataSource>()) {
      registerLazySingleton<LegalContentRemoteDataSource>(
        () => LegalContentRemoteDataSourceImpl(legalContentApiClient: get<LegalContentApiClient>()),
      );
    }

    if (!isRegistered<ILegalContentRepository>()) {
      registerLazySingleton<ILegalContentRepository>(
        () => LegalContentRepositoryImpl(remoteDataSource: get<LegalContentRemoteDataSource>()),
      );
    }

    if (!isRegistered<GetLegalContentUseCase>()) {
      registerFactory<GetLegalContentUseCase>(
        () => GetLegalContentUseCase(get<ILegalContentRepository>()),
      );
    }

    if (!isRegistered<LegalContentCubit>()) {
      registerFactory<LegalContentCubit>(
        () => LegalContentCubit(getLegalContentUseCase: get<GetLegalContentUseCase>()),
      );
    }

    // Settings Sub-feature
    if (!isRegistered<DeleteAccountCubit>()) {
      registerFactory<DeleteAccountCubit>(
        () => DeleteAccountCubit(deleteAccountUseCase: get<DeleteAccountUseCase>()),
      );
    }

    if (!isRegistered<GetLocationPermissionStatusUseCase>()) {
      registerFactory<GetLocationPermissionStatusUseCase>(
        () => GetLocationPermissionStatusUseCase(get<ILocationRepository>()),
      );
    }

    if (!isRegistered<RequestLocationAccessUseCase>()) {
      registerFactory<RequestLocationAccessUseCase>(
        () => RequestLocationAccessUseCase(get<ILocationRepository>()),
      );
    }

    if (!isRegistered<DeviceSettingsLocalDataSource>()) {
      registerLazySingleton<DeviceSettingsLocalDataSource>(
        DeviceSettingsLocalDataSourceImpl.new,
      );
    }

    if (!isRegistered<IDeviceSettingsRepository>()) {
      registerLazySingleton<IDeviceSettingsRepository>(
        () => DeviceSettingsRepositoryImpl(get<DeviceSettingsLocalDataSource>()),
      );
    }

    if (!isRegistered<OpenDeviceSettingsUseCase>()) {
      registerFactory<OpenDeviceSettingsUseCase>(
        () => OpenDeviceSettingsUseCase(get<IDeviceSettingsRepository>()),
      );
    }

    if (!isRegistered<PermissionSettingsCubit>()) {
      registerFactory<PermissionSettingsCubit>(
        () => PermissionSettingsCubit(
          getLocationPermissionStatusUseCase: get<GetLocationPermissionStatusUseCase>(),
          requestLocationAccessUseCase: get<RequestLocationAccessUseCase>(),
          openDeviceSettingsUseCase: get<OpenDeviceSettingsUseCase>(),
        ),
      );
    }
  }
}
