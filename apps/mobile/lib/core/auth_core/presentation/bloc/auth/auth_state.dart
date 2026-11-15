part of 'auth_bloc.dart';

/// States for the global auth state.
sealed class AuthState extends Equatable {
  const AuthState();

  bool get isInitialized => this is! AuthInitial && this is! AuthLoading;
  bool get isAuthenticated => this is AuthAuthenticated;
  AuthSession? get session => switch (this) {
        AuthAuthenticated(:final session) => session,
        _ => null,
      };
  bool get isEmailVerified => session?.isEmailVerified ?? false;
  bool get isProfileCompleted => session?.isProfileCompleted ?? false;

  @override
  List<Object?> get props => [];
}

/// Initial state, checking for stored session.
final class AuthInitial extends AuthState {
  const AuthInitial();
}

/// Checking stored session.
final class AuthLoading extends AuthState {
  const AuthLoading();
}

/// User is authenticated.
final class AuthAuthenticated extends AuthState {
  const AuthAuthenticated(this.session);

  @override
  final AuthSession session;

  @override
  List<Object?> get props => [session];
}

/// User is not authenticated.
final class AuthUnauthenticated extends AuthState {
  const AuthUnauthenticated({this.message});

  final String? message;

  @override
  List<Object?> get props => [message];
}
