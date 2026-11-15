import 'package:react_hono_flutter_template/core/connectivity/data/datasources/connectivity_local_datasource.dart';
import 'package:react_hono_flutter_template/core/connectivity/data/repositories/connectivity_repository_impl.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/repositories/connectivity_repository.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/usecases/check_connectivity_usecase.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/usecases/get_cached_connectivity_usecase.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/usecases/watch_connectivity_usecase.dart';
import 'package:react_hono_flutter_template/core/connectivity/presentation/bloc/connectivity_cubit.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension ConnectivityInjection on GetIt {
  void registerConnectivity({ConnectivityRepository? repository}) {
    if (repository == null) {
      registerLazySingleton<ConnectivityLocalDataSource>(
        ConnectivityLocalDataSourceImpl.new,
      );
      registerSingleton<ConnectivityRepository>(
        ConnectivityRepositoryImpl(
          localDataSource: GetIt.instance<ConnectivityLocalDataSource>(),
        ),
        dispose: (repository) {
          if (repository is ConnectivityRepositoryImpl) {
            repository.dispose();
          }
        },
      );
    } else {
      registerSingleton<ConnectivityRepository>(repository);
    }

    // Use Cases
    registerLazySingleton<GetCachedConnectivityUseCase>(
      () => GetCachedConnectivityUseCase(GetIt.instance<ConnectivityRepository>()),
    );
    registerLazySingleton<WatchConnectivityUseCase>(
      () => WatchConnectivityUseCase(GetIt.instance<ConnectivityRepository>()),
    );
    registerLazySingleton<CheckConnectivityUseCase>(
      () => CheckConnectivityUseCase(GetIt.instance<ConnectivityRepository>()),
    );

    // Blocs / Cubits
    registerFactory<ConnectivityCubit>(
      () => ConnectivityCubit(
        watchConnectivityUseCase: GetIt.instance<WatchConnectivityUseCase>(),
        getCachedConnectivityUseCase: GetIt.instance<GetCachedConnectivityUseCase>(),
        checkConnectivityUseCase: GetIt.instance<CheckConnectivityUseCase>(),
      ),
    );
  }
}
