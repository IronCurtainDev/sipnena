import 'dart:developer';
import 'package:react_hono_flutter_template/core/connectivity/connectivity.dart';
import 'package:react_hono_flutter_template/utils/utils.dart'; // Ensure GetIt is imported

/// Interceptor that checks for internet connectivity before making an API call.
///
/// If no connectivity is detected it rejects the request with a [DioException]
/// before it even leaves the device.
class ConnectivityInterceptor extends Interceptor {
  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) {
    final getCachedConnectivity = GetIt.instance<GetCachedConnectivityUseCase>();

    if (!getCachedConnectivity()) {
      log(
        'No internet connectivity. Rejecting request: ${options.path}',
        name: 'ConnectivityInterceptor',
      );
      return handler.reject(
        DioException(
          requestOptions: options,
          error: 'No internet connection',
          type: DioExceptionType.connectionError,
        ),
      );
    }

    return handler.next(options);
  }
}
