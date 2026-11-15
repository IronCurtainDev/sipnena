import 'package:hive_flutter/hive_flutter.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/core/connectivity/connectivity.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/core/di/app_dependency_overrides.dart';
import 'package:react_hono_flutter_template/core/storage/storage.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Extension on GetIt to register core application services.
///
/// Core services include app settings, states, network client,
/// theme provider, and router.
extension CoreInjection on GetIt {
  /// Registers all core application dependencies.
  Future<void> registerCoreServices({
    required AppEnvironment environment,
    required HiveAesCipher hiveCipher,
    Map<String, String> settingsOverrides = const {},
    AppDependencyOverrides dependencyOverrides = const AppDependencyOverrides(),
    bool registerPushNotifications = true,
    bool enableNetworkLogging = true,
  }) async {
    final secureStorage = dependencyOverrides.secureStorage ?? SecureStorageImpl();
    await secureStorage.clearOnFirstInstall();

    registerConnectivity(repository: dependencyOverrides.connectivityRepository);
    registerSingleton<AppSettings>(AppSettings(environment, overrides: settingsOverrides));
    registerSingleton<HiveAesCipher>(hiveCipher);
    if (registerPushNotifications) {
      registerLazySingleton<PushNotificationRemoteDataSource>(
        PushNotificationRemoteDataSourceImpl.new,
      );
      registerLazySingleton<PushNotificationLocalDataSource>(
        PushNotificationLocalDataSourceImpl.new,
      );
      registerLazySingleton<IPushNotificationRepository>(
        () => PushNotificationRepositoryImpl(
          remoteDataSource: get<PushNotificationRemoteDataSource>(),
        ),
        dispose: (repo) => repo.dispose(),
      );
      registerLazySingleton<ILocalNotificationRepository>(
        () => LocalNotificationRepositoryImpl(
          get<PushNotificationLocalDataSource>(),
        ),
      );
      registerFactory<GetDevicePushTokenUseCase>(
        () => GetDevicePushTokenUseCase(get<IPushNotificationRepository>()),
      );
      registerFactory<InitializePushNotificationsUseCase>(
        () => InitializePushNotificationsUseCase(get<IPushNotificationRepository>()),
      );
      registerFactory<ShowLocalNotificationUseCase>(
        () => ShowLocalNotificationUseCase(get<ILocalNotificationRepository>()),
      );
      registerFactory<UpdateAppBadgeCountUseCase>(
        () => UpdateAppBadgeCountUseCase(get<ILocalNotificationRepository>()),
      );
      registerLazySingleton<NotificationBloc>(
        () => NotificationBloc(
          initializePushNotificationsUseCase: get<InitializePushNotificationsUseCase>(),
          showLocalNotificationUseCase: get<ShowLocalNotificationUseCase>(),
          updateAppBadgeCountUseCase: get<UpdateAppBadgeCountUseCase>(),
          pushNotificationRepository: get<IPushNotificationRepository>(),
          localNotificationRepository: get<ILocalNotificationRepository>(),
        ),
        dispose: (bloc) => bloc.close(),
      );
    }
    registerSingleton<SecureStorage>(secureStorage);
    registerSingleton<SharePlatformDataSource>(
      const SharePlatformDataSourceImpl(),
    );
    registerSingleton<IShareRepository>(
      dependencyOverrides.shareRepository ?? ShareRepositoryImpl(get<SharePlatformDataSource>()),
    );
    registerFactory<ShareFileUseCase>(
      () => ShareFileUseCase(get<IShareRepository>()),
    );
    registerSingleton<LocationLocalDataSource>(
      dependencyOverrides.locationLocalDataSource ?? LocationLocalDataSourceImpl(timeLimit: get<AppSettings>().locationFetchTimeout),
    );
    registerSingleton<ILocationRepository>(
      LocationRepositoryImpl(get<LocationLocalDataSource>()),
    );
    registerFactory<GetDeviceLocationUseCase>(
      () => GetDeviceLocationUseCase(get<ILocationRepository>()),
    );
    await Hive.openBox<bool>(AppPreferencesImpl.boxName);
    registerSingleton<AppPreferences>(AppPreferencesImpl());

    // Network - API Client with Smart AuthInterceptor
    // Automatically adds auth tokens to all endpoints except public ones
    registerLazySingleton<ApiClient>(
      () => ApiClient(
        dio: dependencyOverrides.dio,
        interceptors: [
          AuthInterceptor(), // Auto-adds tokens, skips login/register/forgot-password
          TokenExpirationInterceptor(), // Handles 401 Unauthorized
        ],
        enableLogging: enableNetworkLogging,
      ),
      dispose: (client) => client.close(),
    );

    // =========================================================================
    // Realtime Service (Pusher)
    // Commented out by default for this starter boilerplate.
    // Uncomment this block if your application requires real-time WebSocket communication:
    // =========================================================================
    // registerLazySingleton<BroadcastingApiClient>(
    //   () => BroadcastingApiClient(get<ApiClient>(), get<AppSettings>()),
    // );
    // final pusherOverride = dependencyOverrides.pusherService;
    // if (pusherOverride == null) {
    //   registerLazySingleton<PusherService>(
    //     () => PusherServiceImpl(
    //       appSettings: get<AppSettings>(),
    //       broadcastingApiClient: get<BroadcastingApiClient>(),
    //     ),
    //     dispose: (service) => service.dispose(),
    //   );
    // } else {
    //   registerSingleton<PusherService>(
    //     pusherOverride,
    //     dispose: (service) => service.dispose(),
    //   );
    // }

    // Theme Service
    registerSingletonAsync<ThemeCubit>(
      () async {
        await Hive.openBox<bool>('themeMode');
        final isDark = Hive.box<bool>('themeMode').get('isDark') ?? false;
        ThemeService.setSystemUIOverlayStyle(isDark: isDark);
        return ThemeCubit(isDark: isDark);
      },
      dispose: (cubit) => cubit.close(),
    );

    // App Router
    registerLazySingleton<AppRouter>(
      AppRouter.new,
      dispose: (router) => router.goRouter.dispose(),
    );
  }
}
