import 'package:react_hono_flutter_template/app/controller/router.dart';
import 'package:react_hono_flutter_template/core/storage/storage.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';

/// Encapsulates routing policies, auth state mapping, and tutorial flags.
class AppRoutePolicy {
  AppRoutePolicy(
    this._authBloc, {
    AppPreferences? preferences,
  }) : _preferences = preferences ?? AppPreferencesImpl();

  final AuthBloc _authBloc;
  final AppPreferences _preferences;
  bool _isSplashCompleted = false;

  bool get isSplashCompleted => _isSplashCompleted;

  void markSplashCompleted() {
    _isSplashCompleted = true;
  }

  bool get isTutorialShown => _preferences.isTutorialShown;

  void markTutorialShown() {
    _preferences.setTutorialShown(value: true);
  }

  /// Determines the application route auth state cleanly.
  AppRouteAuthState determineAuthState() {
    if (!_isSplashCompleted) return AppRouteAuthState.notInitialized;

    final auth = _authBloc.state;

    if (!auth.isInitialized) return AppRouteAuthState.notInitialized;
    if (!auth.isAuthenticated) return AppRouteAuthState.notLoggedIn;
    if (!auth.isEmailVerified) return AppRouteAuthState.notVerified;

    if (!auth.isProfileCompleted) return AppRouteAuthState.notCompleted;

    if (!isTutorialShown) return AppRouteAuthState.isGoingToTutorial;

    return AppRouteAuthState.authenticated;
  }
}
