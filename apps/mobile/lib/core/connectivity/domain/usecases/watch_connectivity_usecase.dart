import 'package:react_hono_flutter_template/core/connectivity/domain/entities/connectivity_status.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/repositories/connectivity_repository.dart';

class WatchConnectivityUseCase {
  const WatchConnectivityUseCase(this._repository);

  final ConnectivityRepository _repository;

  Stream<ConnectivityStatus> call() {
    return _repository.onConnectivityChanged;
  }
}
