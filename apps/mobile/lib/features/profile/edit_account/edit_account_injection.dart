import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/profile/edit_account/edit_account.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension EditAccountInjection on GetIt {
  void registerEditAccountFeature() {
    // Data Sources
    registerLazySingleton<EditAccountRemoteDataSource>(
      () => EditAccountRemoteDataSourceImpl(
        profileApiClient: get<ProfileApiClient>(),
      ),
    );

    // Repositories
    registerLazySingleton<IEditAccountRepository>(
      () => EditAccountRepositoryImpl(
        authRepository: get<IAuthSessionRepository>(),
        remoteDataSource: get<EditAccountRemoteDataSource>(),
      ),
    );

    // Use Cases
    registerLazySingleton(
      () => UpdateAccountUseCase(get<IEditAccountRepository>()),
    );

    // BLoCs / Cubits
    registerFactory(
      () => EditAccountCubit(
        updateAccountUseCase: get<UpdateAccountUseCase>(),
      ),
    );
  }
}
