import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/data/datasources/forgot_password_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/data/datasources/forgot_password_remote_data_source_impl.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/data/repositories/forgot_password_repository_impl.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/domain/repositories/i_forgot_password_repository.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/domain/usecases/forgot_password_use_case.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/presentation/bloc/forgot_password_cubit.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension ForgotPasswordInjection on GetIt {
  void registerForgotPasswordFeature() {
    if (!isRegistered<AuthApiClient>()) {
      registerLazySingleton<AuthApiClient>(() => AuthApiClient(get<ApiClient>()));
    }

    registerFactory<ForgotPasswordRemoteDataSource>(
      () => ForgotPasswordRemoteDataSourceImpl(authApiClient: get<AuthApiClient>()),
    );

    registerSingletonWithDependencies<IForgotPasswordRepository>(
      () => ForgotPasswordRepositoryImpl(
        remoteDataSource: get<ForgotPasswordRemoteDataSource>(),
        localDataSource: get<AuthLocalDataSource>(),
      ),
      dependsOn: [AuthLocalDataSource],
    );

    registerSingletonWithDependencies<ForgotPasswordUseCase>(
      () => ForgotPasswordUseCase(get<IForgotPasswordRepository>()),
      dependsOn: [IForgotPasswordRepository],
    );
    registerFactory<ForgotPasswordCubit>(
      () => ForgotPasswordCubit(forgotPasswordUseCase: get<ForgotPasswordUseCase>()),
    );
  }
}
