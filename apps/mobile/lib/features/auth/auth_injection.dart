import 'package:hive/hive.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/auth_core/data/repositories/repositories.dart';
import 'package:react_hono_flutter_template/core/auth_core/domain/domain.dart';
import 'package:react_hono_flutter_template/core/auth_core/presentation/bloc/auth/auth_bloc.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/change_password_injection.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/forgot_password_injection.dart';
import 'package:react_hono_flutter_template/features/auth/logout/domain/usecases/logout_use_case.dart';
import 'package:react_hono_flutter_template/features/auth/logout/logout_injection.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/sign_in_injection.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/sign_up_injection.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/verify_email_injection.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/verify_resend_injection.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Extension on GetIt to register auth feature dependencies.
///
/// Registers data sources, repository, use cases, and BLoC/Cubits
/// for the authentication feature.
extension AuthInjection on GetIt {
  /// Registers all auth feature dependencies.
  Future<void> registerAuthFeature() async {
    // API Client
    registerLazySingleton<AuthApiClient>(
      () => AuthApiClient(get<ApiClient>()),
    );

    // Core Data Sources
    registerSingletonAsync<AuthLocalDataSource>(() async {
      await Hive.openBox<String>(
        get<AppSettings>().sessionSecretKey,
        encryptionCipher: get<HiveAesCipher>(),
      );
      return AuthLocalDataSourceImpl();
    });

    registerSingleton<AuthSessionRemoteDataSource>(
      AuthSessionRemoteDataSourceImpl(authApiClient: get<AuthApiClient>()),
    );

    // Core Repository
    registerSingletonWithDependencies<IAuthSessionRepository>(
      () => AuthSessionRepositoryImpl(
        localDataSource: get<AuthLocalDataSource>(),
        remoteDataSource: get<AuthSessionRemoteDataSource>(),
      ),
      dependsOn: [AuthLocalDataSource],
    );

    // Core Use Cases
    this
      ..registerSingletonWithDependencies<GetStoredSessionUseCase>(
        () => GetStoredSessionUseCase(get<IAuthSessionRepository>()),
        dependsOn: [IAuthSessionRepository],
      )
      ..registerSingletonWithDependencies<RefreshSessionUseCase>(
        () => RefreshSessionUseCase(get<IAuthSessionRepository>()),
        dependsOn: [IAuthSessionRepository],
      );

    // Register Sub-Features
    registerSignInFeature();
    registerSignUpFeature();
    registerVerifyEmailFeature();
    registerVerifyResendFeature();
    registerLogoutFeature();
    registerForgotPasswordFeature();
    registerChangePasswordFeature();

    // Auth BLoC (Core)
    registerSingletonWithDependencies<AuthBloc>(
      () => AuthBloc(
        getStoredSessionUseCase: get<GetStoredSessionUseCase>(),
        logoutUseCase: get<LogoutUseCase>(),
        refreshSessionUseCase: get<RefreshSessionUseCase>(),
        pusherService: isRegistered<PusherService>() ? get<PusherService>() : null,
      ),
      dependsOn: [GetStoredSessionUseCase, LogoutUseCase, RefreshSessionUseCase],
      dispose: (bloc) => bloc.close(),
    );
  }
}
