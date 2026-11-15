import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/data/datasources/verify_resend_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/data/datasources/verify_resend_remote_data_source_impl.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/data/repositories/verify_resend_repository_impl.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/domain/repositories/i_verify_resend_repository.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/domain/usecases/verify_resend_use_case.dart';
import 'package:react_hono_flutter_template/features/auth/verify_resend/presentation/bloc/verification_resend_cubit.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension VerifyResendInjection on GetIt {
  void registerVerifyResendFeature() {
    if (!isRegistered<AuthApiClient>()) {
      registerLazySingleton<AuthApiClient>(() => AuthApiClient(get<ApiClient>()));
    }

    registerFactory<VerifyResendRemoteDataSource>(
      () => VerifyResendRemoteDataSourceImpl(authApiClient: get<AuthApiClient>()),
    );

    registerLazySingleton<IVerifyResendRepository>(
      () => VerifyResendRepositoryImpl(
        remoteDataSource: get<VerifyResendRemoteDataSource>(),
      ),
    );

    registerLazySingleton<VerifyResendEmailUseCase>(
      () => VerifyResendEmailUseCase(get<IVerifyResendRepository>()),
    );
    registerFactory<VerificationResendCubit>(
      () => VerificationResendCubit(resendVerificationCodeUseCase: get<VerifyResendEmailUseCase>()),
    );
  }
}
