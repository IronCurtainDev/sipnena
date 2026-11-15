import 'package:react_hono_flutter_template/core/connectivity/domain/repositories/connectivity_repository.dart';

/// Use case to manually check and probe network connectivity.
class CheckConnectivityUseCase {
  const CheckConnectivityUseCase(this._repository);

  final ConnectivityRepository _repository;

  Future<bool> call() {
    return _repository.checkConnectivity();
  }
}
