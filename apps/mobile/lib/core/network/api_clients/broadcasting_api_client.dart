import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// API client for Laravel Broadcasting channel authorization (`/broadcasting/auth`).
class BroadcastingApiClient {
  const BroadcastingApiClient(this._apiClient, [this._appSettings, this._authLocalDataSource]);

  final ApiClient _apiClient;
  final AppSettings? _appSettings;
  final AuthLocalDataSource? _authLocalDataSource;

  AuthLocalDataSource? get _resolvedAuthLocalDataSource {
    if (_authLocalDataSource != null) return _authLocalDataSource;
    if (GetIt.instance.isRegistered<AuthLocalDataSource>()) {
      return GetIt.instance<AuthLocalDataSource>();
    }
    return null;
  }

  /// Authorizes private/presence channel access via `POST /broadcasting/auth`.
  ///
  /// The underlying [ApiClient] with [AuthInterceptor] automatically attaches:
  /// - `x-access-token` (the active session token)
  /// - `x-api-key`
  /// - `Accept: application/json`
  Future<Response<dynamic>> authorizeChannel({
    required String socketId,
    required String channelName,
  }) async {
    final endpoint = (_appSettings != null && _appSettings.pusherAuthEndpoint.isNotEmpty) ? _appSettings.pusherAuthEndpoint : '/broadcasting/auth';
    final resolvedEndpoint = Uri.parse(endpoint).hasScheme || endpoint.startsWith('/') ? endpoint : '/$endpoint';

    final session = await _resolvedAuthLocalDataSource?.getSession();
    final token = session?.accessToken;

    return _apiClient.post(
      resolvedEndpoint,
      data: {
        'socket_id': socketId,
        'channel_name': channelName,
      },
      options: Options(
        contentType: Headers.jsonContentType,
        headers: {
          if (token != null && token.isNotEmpty) 'Authorization': 'Bearer $token',
        },
      ),
    );
  }
}
