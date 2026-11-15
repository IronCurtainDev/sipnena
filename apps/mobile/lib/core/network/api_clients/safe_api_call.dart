import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A utility function to execute an API call and handle the standard `ApiResponse`
/// parsing, error throwing, and standard exceptions.
///
/// **Problem Solved:**
/// The backend always wraps responses in an `ApiResponse` envelope (with `status`,
/// `message`, and `data` fields). Without this utility, every data source method
/// must manually extract the JSON, check `isFailure`, map data, and catch network
/// errors (DioExceptions) to throw an `ApiError`. This causes massive duplication.
///
/// **Benefits:**
/// 1. **DRY Principle**: Centralizes `ApiResponse` unwrapping and JSON extraction.
/// 2. **Consistent Error Mapping**: Maps `DioException` and backend-thrown failures
///    consistently into `ApiError` so the Repositories can seamlessly map them to `Failure`s.
/// 3. **Type Safety**: Automatically maps the extracted JSON `data` map via [fromJson].
///
/// **Before (Without `safeApiCall`):**
/// ```dart
/// Future<AuthSessionModel> getProfile() async {
///   try {
///     final response = await _client.getProfile();
///     final apiResponse = ApiResponse.fromJson(response.data as Map<String, dynamic>);
///     if (apiResponse.isFailure) {
///       throw ApiError(message: apiResponse.message);
///     }
///     return AuthSessionModel.fromJson(apiResponse.data as Map<String, dynamic>? ?? {});
///   } on DioException catch (e) {
///     return onError(e);
///   } catch (e) {
///     throw ApiError(message: e.toString());
///   }
/// }
/// ```
///
/// **After (With `safeApiCall`):**
/// ```dart
/// Future<AuthSessionModel> getProfile() {
///   return safeApiCall(
///     apiCall: _client.getProfile,
///     fromJson: AuthSessionModel.fromJson,
///   );
/// }
/// ```
Future<T> safeApiCall<T>({
  required Future<Response<dynamic>> Function() apiCall,
  required T Function(Map<String, dynamic>) fromJson,
}) async {
  try {
    final response = await apiCall();
    final dataMap = response.data is Map ? Map<String, dynamic>.from(response.data as Map) : <String, dynamic>{};
    final apiResponse = ApiResponse.fromJson(dataMap);

    if (apiResponse.isFailure) {
      throw ApiError.fromJson(
        dataMap,
        statusCode: response.statusCode ?? 0,
      );
    }

    return fromJson(apiResponse.data as Map<String, dynamic>? ?? {});
  } on DioException catch (e) {
    return onError(e);
  } catch (e) {
    if (e is ApiError) {
      rethrow;
    }
    throw ApiError(message: e.toString());
  }
}

/// A utility function to execute an API call and parse the full [ApiResponse]
/// envelope. Useful for endpoints where payload and paginator metadata are both
/// required by the caller.
Future<T> safeApiCallEnvelope<T>({
  required Future<Response<dynamic>> Function() apiCall,
  required T Function(ApiResponse) fromApiResponse,
}) async {
  try {
    final response = await apiCall();
    final dataMap = response.data is Map ? Map<String, dynamic>.from(response.data as Map) : <String, dynamic>{};
    final apiResponse = ApiResponse.fromJson(dataMap);

    if (apiResponse.isFailure) {
      throw ApiError.fromJson(
        dataMap,
        statusCode: response.statusCode ?? 0,
      );
    }

    return fromApiResponse(apiResponse);
  } on DioException catch (e) {
    return onError(e);
  } catch (e) {
    if (e is ApiError) {
      rethrow;
    }
    throw ApiError(message: e.toString());
  }
}

/// A utility function to execute an API call and parse a paginated list response.
///
/// Automatically unwraps [ApiResponse.data] into `List<T>` using [fromJson]
/// and pairs it with [ApiResponse.paginator].
Future<({List<T> items, Paginator paginator})> safeApiCallPaginated<T>({
  required Future<Response<dynamic>> Function() apiCall,
  required T Function(Map<String, dynamic>) fromJson,
}) async {
  return safeApiCallEnvelope(
    apiCall: apiCall,
    fromApiResponse: (apiResponse) {
      final payloadList = apiResponse.data is List ? apiResponse.data as List<dynamic> : const <dynamic>[];
      final items = payloadList.map((e) => fromJson(e is Map ? Map<String, dynamic>.from(e) : <String, dynamic>{})).toList();

      final paginator = apiResponse.paginator;
      if (paginator == null) {
        throw ApiError(message: 'Paginator is missing in response');
      }

      return (items: items, paginator: paginator);
    },
  );
}

/// A utility function to execute an API call that does not return data.
Future<void> safeApiCallVoid({
  required Future<Response<dynamic>> Function() apiCall,
}) async {
  try {
    final response = await apiCall();

    // Some endpoints might return empty response body, e.g. 204 No Content
    if (response.data != null && response.data is Map) {
      final dataMap = Map<String, dynamic>.from(response.data as Map);
      final apiResponse = ApiResponse.fromJson(dataMap);

      if (apiResponse.isFailure) {
        throw ApiError.fromJson(
          dataMap,
          statusCode: response.statusCode ?? 0,
        );
      }
    }
  } on DioException catch (e) {
    return onError(e);
  } catch (e) {
    if (e is ApiError) {
      rethrow;
    }
    throw ApiError(message: e.toString());
  }
}
