import 'package:react_hono_flutter_template/core/user/user.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension UserInjection on GetIt {
  void registerUserServices() {
    registerSingletonWithDependencies<IUserRepository>(
      () => UserRepositoryImpl(authRepository: get<IAuthSessionRepository>()),
      dependsOn: [IAuthSessionRepository],
    );

    registerFactory<GetUserProfileUseCase>(
      () => GetUserProfileUseCase(get<IUserRepository>()),
    );
  }
}
