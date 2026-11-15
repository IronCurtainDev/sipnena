import 'package:equatable/equatable.dart';
import 'package:flutter/foundation.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';

part 'auth_event.dart';
part 'auth_state.dart';

/// Global BLoC for managing authentication state.
///
/// This BLoC tracks whether the user is authenticated or not.
/// It's a singleton that lives for the entire app lifecycle.
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc({
    required GetStoredSessionUseCase getStoredSessionUseCase,
    required LogoutUseCase logoutUseCase,
    required RefreshSessionUseCase refreshSessionUseCase,
    PusherService? pusherService,
  })  : _getStoredSessionUseCase = getStoredSessionUseCase,
        _logoutUseCase = logoutUseCase,
        _refreshSessionUseCase = refreshSessionUseCase,
        _pusherService = pusherService,
        super(const AuthInitial()) {
    on<AuthCheckRequested>(_onAuthCheckRequested);
    on<AuthSessionEstablished>(_onSessionEstablished);
    on<AuthLogoutRequested>(_onAuthLogoutRequested);
    on<AuthRefreshRequested>(_onAuthRefreshRequested);
  }

  final GetStoredSessionUseCase _getStoredSessionUseCase;
  final LogoutUseCase _logoutUseCase;
  final RefreshSessionUseCase _refreshSessionUseCase;
  final PusherService? _pusherService;

  Future<void> _onAuthCheckRequested(
    AuthCheckRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(const AuthLoading());

    final result = await _getStoredSessionUseCase(const NoParams());

    result.fold(
      onSuccess: (session) {
        if (session != null) {
          emit(AuthAuthenticated(session));
        } else {
          emit(const AuthUnauthenticated());
        }
      },
      onFailure: (_) => emit(const AuthUnauthenticated()),
    );
  }

  void _onSessionEstablished(
    AuthSessionEstablished event,
    Emitter<AuthState> emit,
  ) {
    emit(AuthAuthenticated(event.session));
  }

  Future<void> _onAuthLogoutRequested(
    AuthLogoutRequested event,
    Emitter<AuthState> emit,
  ) async {
    debugPrint('🚨 AuthBloc: _onAuthLogoutRequested received. Message: ${event.message}');
    final currentState = state;
    emit(AuthUnauthenticated(message: event.message));

    // Reset realtime pusher connections and channels on logout
    try {
      await _pusherService?.reset();
    } catch (_) {}

    if (currentState is AuthAuthenticated && currentState.session.accessToken.isNotEmpty) {
      final session = currentState.session;
      try {
        await _logoutUseCase(LogoutParams(token: session.accessToken));
      } catch (_) {
        // Ignore API logout errors
      }
    }
  }

  Future<void> _onAuthRefreshRequested(
    AuthRefreshRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(const AuthLoading());

    final result = await _refreshSessionUseCase(const NoParams());

    result.fold(
      onSuccess: (session) => emit(AuthAuthenticated(session)),
      onFailure: (_) => emit(const AuthUnauthenticated()),
    );
  }
}
