import 'package:react_hono_flutter_template/core/connectivity/domain/entities/connectivity_status.dart';

/// Repository interface for checking and monitoring network connectivity.
abstract class ConnectivityRepository {
  /// Returns the current cached connectivity status synchronously.
  /// Useful for high-frequency checks like API interceptors.
  bool get isConnected;

  /// Stream that emits the current [ConnectivityStatus].
  Stream<ConnectivityStatus> get onConnectivityChanged;

  /// Checks the current connectivity status asynchronously.
  Future<bool> checkConnectivity();
}
