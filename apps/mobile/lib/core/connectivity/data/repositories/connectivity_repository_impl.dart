import 'dart:async';
import 'dart:developer';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:react_hono_flutter_template/core/connectivity/data/datasources/connectivity_local_datasource.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/entities/connectivity_status.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/repositories/connectivity_repository.dart';

/// Implementation of [ConnectivityRepository] using [ConnectivityLocalDataSource].
class ConnectivityRepositoryImpl implements ConnectivityRepository {
  ConnectivityRepositoryImpl({
    required ConnectivityLocalDataSource localDataSource,
  }) : _localDataSource = localDataSource {
    _localDataSource.checkConnectivity().then((results) {
      _isConnectedCached = _isConnected(results);
      _controller.add(_isConnectedCached ? ConnectivityStatus.online : ConnectivityStatus.offline);
    });

    _subscription = _localDataSource.onConnectivityChanged.listen(
      (results) {
        _isConnectedCached = _isConnected(results);
        log(
          'Connectivity changed: $_isConnectedCached (results: $results)',
          name: 'ConnectivityRepositoryImpl',
        );
        _controller.add(_isConnectedCached ? ConnectivityStatus.online : ConnectivityStatus.offline);
      },
    );
  }

  final ConnectivityLocalDataSource _localDataSource;
  final StreamController<ConnectivityStatus> _controller = StreamController<ConnectivityStatus>.broadcast();
  StreamSubscription<List<ConnectivityResult>>? _subscription;

  bool _isConnectedCached = true;

  @override
  bool get isConnected => _isConnectedCached;

  @override
  Stream<ConnectivityStatus> get onConnectivityChanged => _controller.stream;

  @override
  Future<bool> checkConnectivity() async {
    try {
      final results = await _localDataSource.checkConnectivity();
      _isConnectedCached = _isConnected(results);
      _controller.add(_isConnectedCached ? ConnectivityStatus.online : ConnectivityStatus.offline);
      return _isConnectedCached;
    } catch (e) {
      log('Error checking connectivity: $e', name: 'ConnectivityRepositoryImpl');
      return true; // Default to true on error to not block user
    }
  }

  bool _isConnected(List<ConnectivityResult> results) {
    return results.any((r) => r != ConnectivityResult.none);
  }

  void dispose() {
    _subscription?.cancel();
    _controller.close();
  }
}
