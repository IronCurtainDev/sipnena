import 'dart:async';

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:path_provider/path_provider.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/core/di/app_dependency_overrides.dart';
import 'package:react_hono_flutter_template/core/di/injection_container.dart';
import 'package:react_hono_flutter_template/core/storage/storage.dart';
import 'package:react_hono_flutter_template/firebase_options_live.dart' as live_firebase;
import 'package:react_hono_flutter_template/firebase_options_sandbox.dart' as sandbox_firebase;
import 'package:react_hono_flutter_template/utils/utils.dart';

// Re-export getIt for convenient access throughout the app
export 'package:react_hono_flutter_template/core/di/injection_container.dart' show getIt;

/// Controls optional native startup work and dependency substitutions.
///
/// The default value reproduces normal production startup. Alternate hosts,
/// including device tests, can disable native SDKs and replace only external
/// boundaries without importing test libraries into application code.
class AppBootstrapOptions {
  const AppBootstrapOptions({
    this.initializeFirebase = true,
    this.registerBackgroundMessaging = true,
    this.initializeStripe = false,
    this.initializePushNotifications = true,
    this.preserveNativeSplash = true,
    this.enableNetworkLogging = true,
    this.configureErrorHandling = true,
    this.dotenvFile,
    this.settingsOverrides = const {},
    this.dependencyOverrides = const AppDependencyOverrides(),
  });

  final bool initializeFirebase;
  final bool registerBackgroundMessaging;
  final bool initializeStripe;
  final bool initializePushNotifications;
  final bool preserveNativeSplash;
  final bool enableNetworkLogging;
  final bool configureErrorHandling;
  final String? dotenvFile;
  final Map<String, String> settingsOverrides;
  final AppDependencyOverrides dependencyOverrides;
}

/// Boots up the application by initializing necessary components and running the provided builder function.
///
/// The [builder] function is responsible for creating the root widget of the application.
/// The [environment] parameter specifies the environment in which the application is running.
/// This function sets up error handling, initializes Flutter bindings, and registers singletons for various services.
Future<void> bootstrap(
  FutureOr<Widget> Function() builder, {
  required AppEnvironment environment,
  AppBootstrapOptions options = const AppBootstrapOptions(),
}) async {
  final app = await prepareApp(
    builder,
    environment: environment,
    options: options,
  );
  runApp(app);
}

/// Prepares the application and returns its root widget without mounting it.
Future<Widget> prepareApp(
  FutureOr<Widget> Function() builder, {
  required AppEnvironment environment,
  AppBootstrapOptions options = const AppBootstrapOptions(),
}) async {
  if (options.configureErrorHandling) {
    ErrorWidget.builder = (FlutterErrorDetails details) {
      return Material(
        child: Center(
          child: Builder(
            builder: (context) {
              return Text(
                context.l10n.genericError,
                style: context.bodyRegular16(color: Colors.red),
              );
            },
          ),
        ),
      );
    };
    FlutterError.onError = (details) {
      debugPrintStack(stackTrace: details.stack, label: details.exceptionAsString(), maxFrames: 10);
    };
  }
  final widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  if (options.preserveNativeSplash) {
    FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);
  }
  if (options.initializeFirebase) {
    final firebaseOptions = switch (environment) {
      AppEnvironment.development || AppEnvironment.staging => sandbox_firebase.DefaultFirebaseOptions.currentPlatform,
      AppEnvironment.production => live_firebase.DefaultFirebaseOptions.currentPlatform,
    };
    await Firebase.initializeApp(options: firebaseOptions);
    if (options.registerBackgroundMessaging) {
      FirebaseMessaging.onBackgroundMessage(firebaseMessagingBackgroundHandler);
    }
  }
  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  await loadEnvFile(environment, fileName: options.dotenvFile);

  final appSettings = AppSettings(environment, overrides: options.settingsOverrides);
  if (options.initializeStripe && appSettings.stripePublishableKey.isNotEmpty) {
    Stripe.publishableKey = appSettings.stripePublishableKey;
    await Stripe.instance.applySettings();
  }

  final secureStorage = options.dependencyOverrides.secureStorage ?? SecureStorageImpl();
  final hiveCipher = await hiveInit(storage: secureStorage);

  final docsDir = await getApplicationDocumentsDirectory();
  HydratedBloc.storage = await HydratedStorage.build(
    storageDirectory: kIsWeb ? HydratedStorageDirectory.web : HydratedStorageDirectory(docsDir.path),
  );

  await setup(
    environment: environment,
    hiveCipher: hiveCipher,
    settingsOverrides: options.settingsOverrides,
    dependencyOverrides: options.dependencyOverrides.copyWith(secureStorage: secureStorage),
    registerPushNotifications: options.initializePushNotifications,
    enableNetworkLogging: options.enableNetworkLogging,
  );
  return await builder();
}

/// Loads the `.env` file that matches the current [environment].
Future<void> loadEnvFile(AppEnvironment environment, {String? fileName}) async {
  final envFile = fileName ??
      switch (environment) {
        AppEnvironment.development => 'env/.env.development',
        AppEnvironment.production => 'env/.env.production',
        AppEnvironment.staging => 'env/.env.staging',
      };

  await dotenv.load(fileName: envFile);
}
