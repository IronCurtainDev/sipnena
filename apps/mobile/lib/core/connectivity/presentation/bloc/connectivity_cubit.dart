import 'dart:async';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/entities/connectivity_status.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/usecases/check_connectivity_usecase.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/usecases/get_cached_connectivity_usecase.dart';
import 'package:react_hono_flutter_template/core/connectivity/domain/usecases/watch_connectivity_usecase.dart';

part 'connectivity_state.dart';

class ConnectivityCubit extends Cubit<ConnectivityState> {
  ConnectivityCubit({
    required WatchConnectivityUseCase watchConnectivityUseCase,
    required GetCachedConnectivityUseCase getCachedConnectivityUseCase,
    CheckConnectivityUseCase? checkConnectivityUseCase,
  })  : _watchConnectivityUseCase = watchConnectivityUseCase,
        _checkConnectivityUseCase = checkConnectivityUseCase,
        super(
          getCachedConnectivityUseCase() ? const ConnectivityOnline() : const ConnectivityOffline(),
        ) {
    _subscription = _watchConnectivityUseCase().listen((status) {
      if (status == ConnectivityStatus.online) {
        emit(const ConnectivityOnline());
      } else {
        emit(const ConnectivityOffline());
      }
    });
  }

  final WatchConnectivityUseCase _watchConnectivityUseCase;
  final CheckConnectivityUseCase? _checkConnectivityUseCase;
  StreamSubscription<ConnectivityStatus>? _subscription;

  /// Manually probes connectivity (e.g. when user taps 'Try Again')
  Future<void> retry() async {
    if (_checkConnectivityUseCase != null) {
      final isOnline = await _checkConnectivityUseCase();
      emit(isOnline ? const ConnectivityOnline() : const ConnectivityOffline());
    }
  }

  @override
  Future<void> close() {
    _subscription?.cancel();
    return super.close();
  }
}
