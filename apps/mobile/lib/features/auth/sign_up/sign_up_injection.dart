import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/data/datasources/sign_up_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/data/datasources/sign_up_remote_data_source_impl.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/data/repositories/sign_up_repository_impl.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/domain/repositories/i_sign_up_repository.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/domain/usecases/register_use_case.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/presentation/bloc/sign_up_cubit.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension SignUpInjection on GetIt {
  void registerSignUpFeature() {
    if (!isRegistered<AuthApiClient>()) {
      registerLazySingleton<AuthApiClient>(() => AuthApiClient(get<ApiClient>()));
    }

    registerFactory<SignUpRemoteDataSource>(
      () => SignUpRemoteDataSourceImpl(authApiClient: get<AuthApiClient>()),
    );

    registerSingletonWithDependencies<ISignUpRepository>(
      () => SignUpRepositoryImpl(
        remoteDataSource: get<SignUpRemoteDataSource>(),
        localDataSource: get<AuthLocalDataSource>(),
      ),
      dependsOn: [AuthLocalDataSource],
    );

    registerSingletonWithDependencies<RegisterUseCase>(
      () => RegisterUseCase(get<ISignUpRepository>()),
      dependsOn: [ISignUpRepository],
    );
    registerFactory<SignUpCubit>(
      () => SignUpCubit(
        registerUseCase: get<RegisterUseCase>(),
        getDevicePushTokenUseCase: isRegistered<GetDevicePushTokenUseCase>() ? get<GetDevicePushTokenUseCase>() : null,
      ),
    );
  }
}
