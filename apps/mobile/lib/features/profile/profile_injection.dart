import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/profile/profile.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Extension on GetIt to register profile feature dependencies.
///
/// Registers data source, repository, use cases, and Cubit
/// for the profile feature.
extension ProfileInjection on GetIt {
  /// Registers all profile feature dependencies.
  void registerProfileFeature() {
    // API Client
    registerLazySingleton<AccountSettingsApiClient>(
      () => AccountSettingsApiClient(get<ApiClient>()),
    );
    registerLazySingleton<ProfileApiClient>(
      () => ProfileApiClient(get<ApiClient>()),
    );

    // Profile Cubit (Factory - per-screen instance)
    // registerFactory<ProfileCubit>(
    //   () => ProfileCubit(
    //     getProfileUseCase: get<GetProfileUseCase>(),
    //     deleteProfileUseCase: get<DeleteProfileUseCase>(),
    //   ),
    // );

    // Sub-features
    registerUpdateAvatarFeature();
    registerDeleteAccountFeature();
    registerEditAccountFeature();
  }
}
