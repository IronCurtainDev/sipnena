import 'package:hive_flutter/hive_flutter.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/core/di/app_dependency_overrides.dart';
import 'package:react_hono_flutter_template/core/di/core_injection.dart';
import 'package:react_hono_flutter_template/core/storage/storage.dart';
import 'package:react_hono_flutter_template/core/user/user.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/more/more.dart';
import 'package:react_hono_flutter_template/features/onboarding/onboarding.dart';
import 'package:react_hono_flutter_template/features/profile/profile.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Returns the instance of the GetIt service locator.
///
/// The GetIt service locator is a singleton class that provides a convenient way to access
/// and manage dependencies in your application. This getter method returns the instance
/// of the GetIt service locator.
GetIt get getIt => GetIt.instance;

/// Sets up the application by registering necessary dependencies and initializing services.
///
/// The [environment] parameter specifies the application environment.
/// The [hiveCipher] is the AES cipher used to open encrypted Hive boxes.
/// It registers classes as singletons using the GetIt service locator.
///
/// Registration order matters - core services first, then features in dependency order.
Future<void> setup({
  required AppEnvironment environment,
  required HiveAesCipher hiveCipher,
  Map<String, String> settingsOverrides = const {},
  AppDependencyOverrides dependencyOverrides = const AppDependencyOverrides(),
  bool registerPushNotifications = true,
  bool enableNetworkLogging = true,
}) async {
  await getIt.reset();

  // 1. Core Services (AppSettings, ApiClient, Theme, Router, HiveAesCipher)
  await getIt.registerCoreServices(
    environment: environment,
    hiveCipher: hiveCipher,
    settingsOverrides: settingsOverrides,
    dependencyOverrides: dependencyOverrides,
    registerPushNotifications: registerPushNotifications,
    enableNetworkLogging: enableNetworkLogging,
  );

  // 2. Auth Feature (DataSources, Repository, UseCases, BLoC/Cubits)
  await getIt.registerAuthFeature();

  // 2.5 Core User Services
  getIt
    ..registerUserServices()

    // 3. Profile Feature (DataSource, Repository, UseCases, BLoC)
    // 4. Onboarding Feature (Repository, UseCase)

    ..registerProfileFeature()
    ..registerOnboardingFeature()
    ..registerMoreFeature()
    ..registerNotificationsFeature()
    ..registerLazySingleton<AppRoutePolicy>(
      () => AppRoutePolicy(
        getIt<AuthBloc>(),
        preferences: getIt<AppPreferences>(),
      ),
    )
    ..registerLazySingleton<NotificationNavigationHandler>(
      () => NotificationNavigationHandler(
        getIt<AppRouter>(),
        getIt<AuthBloc>(),
      ),
    );

  // Wait for all async registrations to complete
  await getIt.allReady();
}

/// Initializes Hive for Flutter and returns the [HiveAesCipher] used to open
/// encrypted boxes. The encryption key is generated on first launch and
/// persisted in [SecureStorage] so that existing encrypted boxes remain
/// readable across app launches.
Future<HiveAesCipher> hiveInit({SecureStorage? storage}) async {
  await Hive.initFlutter();
  return getOrCreateHiveCipher(storage ?? SecureStorageImpl());
}
