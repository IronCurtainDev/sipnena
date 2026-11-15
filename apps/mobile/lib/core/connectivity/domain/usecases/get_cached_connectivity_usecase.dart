import 'package:react_hono_flutter_template/core/connectivity/domain/repositories/connectivity_repository.dart';

class GetCachedConnectivityUseCase {
  const GetCachedConnectivityUseCase(this._repository);

  final ConnectivityRepository _repository;

  bool call() {
    return _repository.isConnected;
  }
}
