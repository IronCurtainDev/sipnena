import 'package:flutter/foundation.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Logs the user out for protected backend 401 and 403 responses.
class TokenExpirationInterceptor extends Interceptor {
  DateTime? _lastLogoutTime;

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (!isBackendOrigin(err.requestOptions.uri, getIt<AppSettings>().baseUrl)) {
      return super.onError(err, handler);
    }

    // Never trigger logout recursion on the logout endpoint or public auth endpoints
    final path = err.requestOptions.path.toLowerCase();
    if (path.contains('logout') || path.contains('login') || path.contains('register')) {
      return super.onError(err, handler);
    }

    if (err.response?.statusCode == 401 || err.response?.statusCode == 403) {
      final now = DateTime.now();
      // Debounce logout requests to once every 5 seconds to prevent race conditions
      // from concurrent 401 responses.
      if (_lastLogoutTime == null || now.difference(_lastLogoutTime!).inSeconds > 5) {
        _lastLogoutTime = now;
        debugPrint('🚨 TokenExpirationInterceptor: Dispatching AuthLogoutRequested');
        // Lazy load AuthBloc to avoid circular dependency
        // Dispatch logout with a session expired message
        getIt<AuthBloc>().add(
          const AuthLogoutRequested(message: 'Session expired. Please login again.'),
        );
      } else {
        debugPrint('🚨 TokenExpirationInterceptor: Ignored duplicate 401 (debounced)');
      }
    }
    super.onError(err, handler);
  }
}
