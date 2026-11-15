import 'dart:developer';

import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A class that represents a Dio client for making HTTP requests.
class ApiClient {
  /// An injected [dio] keeps its adapter; app options and interceptors still apply.
  ApiClient({Dio? dio, List<Interceptor> interceptors = const [], bool enableLogging = true}) {
    final settings = GetIt.instance<AppSettings>();
    _dio = dio ?? Dio();
    _dio.options.baseUrl = settings.baseUrl;
    _dio.options.connectTimeout = const Duration(seconds: 5);
    _dio.options.receiveTimeout = const Duration(seconds: 20);
    _dio.options.headers = {
      'accept': 'application/json',
    };
    _dio.options.listFormat = ListFormat.multiCompatible;
    _dio.interceptors.addAll(interceptors);
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          if (isBackendOrigin(options.uri, settings.baseUrl)) {
            options.headers.putIfAbsent('x-api-key', () => settings.apiKey);
          } else {
            options.headers.removeWhere((name, _) {
              final header = name.toLowerCase();
              return header == 'x-api-key' || header == 'x-access-token';
            });
          }
          handler.next(options);
        },
      ),
    );
    _dio.interceptors.add(ConnectivityInterceptor());
    if (enableLogging) {
      _dio.interceptors.add(AwesomeDioInterceptor(logger: log));
    }
  }

  late Dio _dio;

  /// Closes the owned transport when an application dependency scope ends.
  void close({bool force = true}) => _dio.close(force: force);

  /// Sends a GET request to the specified [path] with optional [queryParameters] and [options].
  Future<Response<dynamic>> get(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async =>
      _dio.get(
        path,
        queryParameters: queryParameters,
        options: options,
      );

  /// Sends a POST request to the specified [path] with optional [data], [queryParameters], and [options].
  Future<Response<dynamic>> post(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    void Function(int count, int total)? onSendProgress,
  }) async =>
      _dio.post(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
        onSendProgress: onSendProgress,
      );

  /// Sends a PUT request to the specified [path] with optional [data], [queryParameters], and [options].
  Future<Response<dynamic>> put(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async =>
      _dio.put(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );

  /// Sends a DELETE request to the specified [path] with optional [data], [queryParameters], and [options].
  Future<Response<dynamic>> delete(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async =>
      _dio.delete(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );

  /// Downloads content from the specified [urlPath] to the [savePath].
  Future<Response<dynamic>> download(
    String urlPath,
    dynamic savePath, {
    ProgressCallback? onReceiveProgress,
    Map<String, dynamic>? queryParameters,
    CancelToken? cancelToken,
    bool deleteOnError = true,
    String lengthHeader = Headers.contentLengthHeader,
    Object? data,
    Options? options,
  }) async =>
      _dio.download(
        urlPath,
        savePath,
        onReceiveProgress: onReceiveProgress,
        queryParameters: queryParameters,
        cancelToken: cancelToken,
        deleteOnError: deleteOnError,
        lengthHeader: lengthHeader,
        data: data,
        options: options,
      );
}
