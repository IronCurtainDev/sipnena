import 'package:react_hono_flutter_template/core/auth_core/data/datasources/datasources.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/data/datasources/verify_email_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/data/datasources/verify_email_remote_data_source_impl.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/data/repositories/verify_email_repository_impl.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/domain/repositories/i_verify_email_repository.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/domain/usecases/verify_email_use_case.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/presentation/bloc/verification_cubit.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension VerifyEmailInjection on GetIt {
  void registerVerifyEmailFeature() {
    if (!isRegistered<AuthApiClient>()) {
      registerLazySingleton<AuthApiClient>(() => AuthApiClient(get<ApiClient>()));
    }

    registerFactory<VerifyEmailRemoteDataSource>(
      () => VerifyEmailRemoteDataSourceImpl(authApiClient: get<AuthApiClient>()),
    );

    registerSingletonWithDependencies<IVerifyEmailRepository>(
      () => VerifyEmailRepositoryImpl(
        remoteDataSource: get<VerifyEmailRemoteDataSource>(),
        localDataSource: get<AuthLocalDataSource>(),
      ),
      dependsOn: [AuthLocalDataSource],
    );

    registerSingletonWithDependencies<VerifyEmailUseCase>(
      () => VerifyEmailUseCase(get<IVerifyEmailRepository>()),
      dependsOn: [IVerifyEmailRepository],
    );
    registerFactory<VerificationCubit>(
      () => VerificationCubit(verifyEmailUseCase: get<VerifyEmailUseCase>()),
    );
  }
}
