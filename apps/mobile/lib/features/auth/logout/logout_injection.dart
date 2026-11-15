import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/logout/data/datasources/logout_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/logout/data/datasources/logout_remote_data_source_impl.dart';
import 'package:react_hono_flutter_template/features/auth/logout/data/repositories/logout_repository_impl.dart';
import 'package:react_hono_flutter_template/features/auth/logout/domain/repositories/i_logout_repository.dart';
import 'package:react_hono_flutter_template/features/auth/logout/domain/usecases/logout_use_case.dart';
import 'package:react_hono_flutter_template/features/auth/logout/presentation/bloc/logout_cubit.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension LogoutInjection on GetIt {
  void registerLogoutFeature() {
    if (!isRegistered<AuthApiClient>()) {
      registerLazySingleton<AuthApiClient>(() => AuthApiClient(get<ApiClient>()));
    }

    registerFactory<LogoutRemoteDataSource>(
      () => LogoutRemoteDataSourceImpl(authApiClient: get<AuthApiClient>()),
    );

    registerSingletonWithDependencies<ILogoutRepository>(
      () => LogoutRepositoryImpl(
        remoteDataSource: get<LogoutRemoteDataSource>(),
        localDataSource: get<AuthLocalDataSource>(),
      ),
      dependsOn: [AuthLocalDataSource],
    );

    registerSingletonWithDependencies<LogoutUseCase>(
      () => LogoutUseCase(get<ILogoutRepository>()),
      dependsOn: [ILogoutRepository],
    );

    registerFactory<LogoutCubit>(
      () => LogoutCubit(logoutUseCase: get<LogoutUseCase>()),
    );
  }
}
