import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/profile/delete_account/delete_account.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension DeleteAccountInjection on GetIt {
  void registerDeleteAccountFeature() {
    // Data Sources
    registerLazySingleton<DeleteAccountRemoteDataSource>(
      () => DeleteAccountRemoteDataSourceImpl(apiClient: get<AccountSettingsApiClient>()),
    );

    // Repositories
    registerLazySingleton<IDeleteAccountRepository>(
      () => DeleteAccountRepositoryImpl(
        authRepository: get<IAuthSessionRepository>(),
        remoteDataSource: get<DeleteAccountRemoteDataSource>(),
      ),
    );

    // Use Cases
    registerLazySingleton(
      () => DeleteAccountUseCase(get<IDeleteAccountRepository>()),
    );
  }
}
