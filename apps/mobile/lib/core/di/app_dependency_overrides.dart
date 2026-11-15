import 'package:dio/dio.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/repositories/connectivity_repository.dart';
import 'package:react_hono_flutter_template/core/location/data/datasources/location_local_data_source.dart';
import 'package:react_hono_flutter_template/core/pusher/pusher_service.dart';
import 'package:react_hono_flutter_template/core/sharing/domain/repositories/i_share_repository.dart';
import 'package:react_hono_flutter_template/core/storage/secure_storage.dart';

/// Optional runtime dependency substitutions used by alternate app hosts.
///
/// Production startup uses the defaults. Integration hosts can replace only
/// external boundaries while keeping the app's normal repositories, parsers,
/// interceptors, Cubits, and routing graph.
class AppDependencyOverrides {
  const AppDependencyOverrides({
    this.dio,
    this.secureStorage,
    this.connectivityRepository,
    this.locationLocalDataSource,
    this.pusherService,
    this.shareRepository,
  });

  final Dio? dio;
  final SecureStorage? secureStorage;
  final ConnectivityRepository? connectivityRepository;
  final LocationLocalDataSource? locationLocalDataSource;
  final PusherService? pusherService;
  final IShareRepository? shareRepository;

  AppDependencyOverrides copyWith({
    SecureStorage? secureStorage,
  }) {
    return AppDependencyOverrides(
      dio: dio,
      secureStorage: secureStorage ?? this.secureStorage,
      connectivityRepository: connectivityRepository,
      locationLocalDataSource: locationLocalDataSource,
      shareRepository: shareRepository,
    );
  }
}
