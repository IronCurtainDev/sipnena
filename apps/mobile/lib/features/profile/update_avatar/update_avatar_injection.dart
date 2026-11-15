import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/profile/update_avatar/update_avatar.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension UpdateAvatarInjection on GetIt {
  void registerUpdateAvatarFeature() {
    // Data Sources
    registerLazySingleton<UpdateAvatarRemoteDataSource>(
      () => UpdateAvatarRemoteDataSourceImpl(profileApiClient: get<ProfileApiClient>()),
    );

    // Repositories
    registerLazySingleton<IUpdateAvatarRepository>(
      () => UpdateAvatarRepositoryImpl(
        remoteDataSource: get<UpdateAvatarRemoteDataSource>(),
      ),
    );

    // Use Cases
    registerLazySingleton(
      () => UploadAvatarUseCase(
        repository: get<IUpdateAvatarRepository>(),
        authRepository: get<IAuthSessionRepository>(),
      ),
    );

    // BLoCs / Cubits
    registerFactory(
      () => UpdateAvatarCubit(
        uploadAvatarUseCase: get<UploadAvatarUseCase>(),
      ),
    );
  }
}
