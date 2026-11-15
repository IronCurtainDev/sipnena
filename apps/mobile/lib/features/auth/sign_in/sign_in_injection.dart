import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/data/datasources/sign_in_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/data/datasources/sign_in_remote_data_source_impl.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/data/repositories/sign_in_repository_impl.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/domain/repositories/i_sign_in_repository.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/domain/usecases/login_use_case.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/presentation/bloc/login_cubit.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension SignInInjection on GetIt {
  void registerSignInFeature() {
    if (!isRegistered<AuthApiClient>()) {
      registerLazySingleton<AuthApiClient>(() => AuthApiClient(get<ApiClient>()));
    }

    registerFactory<SignInRemoteDataSource>(
      () => SignInRemoteDataSourceImpl(authApiClient: get<AuthApiClient>()),
    );

    registerSingletonWithDependencies<ISignInRepository>(
      () => SignInRepositoryImpl(
        remoteDataSource: get<SignInRemoteDataSource>(),
        localDataSource: get<AuthLocalDataSource>(),
      ),
      dependsOn: [AuthLocalDataSource],
    );

    registerSingletonWithDependencies<LoginUseCase>(
      () => LoginUseCase(get<ISignInRepository>()),
      dependsOn: [ISignInRepository],
    );
    registerFactory<LoginCubit>(
      () => LoginCubit(
        loginUseCase: get<LoginUseCase>(),
        getDevicePushTokenUseCase: isRegistered<GetDevicePushTokenUseCase>() ? get<GetDevicePushTokenUseCase>() : null,
      ),
    );
  }
}
