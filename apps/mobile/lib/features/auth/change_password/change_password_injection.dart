import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/data/datasources/change_password_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/data/datasources/change_password_remote_data_source_impl.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/data/repositories/change_password_repository_impl.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/domain/repositories/i_change_password_repository.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/domain/usecases/change_password_use_case.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/presentation/bloc/change_password_cubit.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension ChangePasswordInjection on GetIt {
  void registerChangePasswordFeature() {
    if (!isRegistered<AuthApiClient>()) {
      registerLazySingleton<AuthApiClient>(() => AuthApiClient(get<ApiClient>()));
    }

    registerFactory<ChangePasswordRemoteDataSource>(
      () => ChangePasswordRemoteDataSourceImpl(authApiClient: get<AuthApiClient>()),
    );

    registerSingletonWithDependencies<IChangePasswordRepository>(
      () => ChangePasswordRepositoryImpl(
        remoteDataSource: get<ChangePasswordRemoteDataSource>(),
        localDataSource: get<AuthLocalDataSource>(),
      ),
      dependsOn: [AuthLocalDataSource],
    );

    registerSingletonWithDependencies<ChangePasswordUseCase>(
      () => ChangePasswordUseCase(get<IChangePasswordRepository>()),
      dependsOn: [IChangePasswordRepository],
    );
    registerFactory<ChangePasswordCubit>(
      () => ChangePasswordCubit(changePasswordUseCase: get<ChangePasswordUseCase>()),
    );
  }
}
