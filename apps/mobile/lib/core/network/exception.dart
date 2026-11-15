import 'dart:convert';

import 'package:react_hono_flutter_template/utils/utils.dart';

/// Custom exception class for API errors.
class ApiError implements Exception {
  ApiError({
    required this.message,
    this.statusCode = 500,
    this.code,
  });

  /// Constructs an [ApiError] object from a JSON map.
  factory ApiError.fromJson(Map<String, dynamic> json, {int statusCode = 0}) {
    String? message;
    if (json['message'] is String && (json['message'] as String).trim().isNotEmpty) {
      message = json['message'] as String;
    } else if (json['error'] is Map) {
      final errorMap = json['error'] as Map<String, dynamic>;
      if (errorMap['message'] is String && (errorMap['message'] as String).trim().isNotEmpty) {
        message = errorMap['message'] as String;
      }
    } else if (json['errors'] is Map) {
      final errors = json['errors'] as Map<String, dynamic>;
      final firstVal = errors.values.firstOrNull;
      if (firstVal is List && firstVal.isNotEmpty) {
        message = firstVal.first.toString();
      } else if (firstVal is String) {
        message = firstVal;
      }
    }

    final rawMessage = message ?? 'Unknown Error';
    final cleanMessage = isTechnicalMessage(rawMessage) ? 'An unexpected error occurred. Please try again.' : rawMessage;

    String? code;
    final payload = json['payload'];
    if (payload is Map && payload['code'] is String) {
      final rawCode = payload['code'] as String;
      if (rawCode.trim().isNotEmpty) code = rawCode.trim();
    } else if (json['code'] is String) {
      final rawCode = json['code'] as String;
      if (rawCode.trim().isNotEmpty) code = rawCode.trim();
    }

    return ApiError(
      message: cleanMessage,
      statusCode: statusCode,
      code: code,
    );
  }

  static bool isTechnicalMessage(String? msg) {
    if (msg == null || msg.trim().isEmpty) return false;
    final lower = msg.toLowerCase();
    return msg.contains('SQLSTATE') ||
        lower.contains('integrity constraint violation') ||
        lower.contains('duplicate entry') ||
        lower.contains('pdoexception') ||
        lower.contains('queryexception') ||
        lower.contains('connection: mysql') ||
        lower.contains('connection: pgsql') ||
        lower.contains('syntax error') ||
        lower.contains('stack trace:') ||
        lower.contains('fatal error');
  }

  String message;
  int statusCode;
  String? code;

  /// Converts the [ApiError] object to a JSON map.
  Map<String, dynamic> toJson() => <String, dynamic>{
        'message': message,
        if (code != null) 'payload': {'code': code},
      };

  /// Creates a clone of the [ApiError] object.
  ApiError clone() => ApiError.fromJson(toJson(), statusCode: statusCode);

  @override
  String toString() => errorMessage;

  /// Returns the error message as a string.
  String get errorMessage {
    if (isTechnicalMessage(message)) {
      return 'An unexpected error occurred. Please try again.';
    }
    return message.trim().replaceFirst(RegExp(r'\s*\(?\d{3}\)?$'), '');
  }
}

/// Handles the error and converts it into an [ApiError] object.
///
/// If the error is a [DioException], it checks if the response data is a map.
/// If it is, it throws an [ApiError] object by parsing the response data.
/// If it's not a map, it throws an [ApiError] object with a default message and status code.
///
/// If the error is not a [DioException], it throws an [ApiError] object with the error message and status code.
///
/// If any exception occurs during the error handling process, it throws an [ApiError] object with the exception message and status code.
T onError<T>(Exception e) {
  try {
    if (e is DioException) {
      if (e.type == DioExceptionType.connectionTimeout || e.type == DioExceptionType.receiveTimeout || e.type == DioExceptionType.sendTimeout) {
        throw ApiError(message: 'timeout', statusCode: 408);
      }
      if (e.type == DioExceptionType.connectionError) {
        if (e.error == 'No internet connection') {
          // Thrown by our ConnectivityInterceptor
          throw ApiError(message: 'You are currently offline, please check your network connection', statusCode: 503);
        } else {
          // Thrown by Dio natively (Server down, DNS failure, etc.)
          throw ApiError(message: 'Unable to connect to the server. The server might be down.', statusCode: 503);
        }
      }

      final data = e.response?.data;
      if (data is Map) {
        throw ApiError.fromJson(
          Map<String, dynamic>.from(data),
          statusCode: e.response?.statusCode ?? 0,
        );
      } else if (data is String && data.trim().isNotEmpty) {
        dynamic decoded;
        try {
          decoded = jsonDecode(data);
        } catch (_) {}
        if (decoded is Map) {
          throw ApiError.fromJson(
            Map<String, dynamic>.from(decoded),
            statusCode: e.response?.statusCode ?? 0,
          );
        }
        final raw = data.trim();
        throw ApiError(
          message: ApiError.isTechnicalMessage(raw) ? 'An unexpected error occurred. Please try again.' : raw,
          statusCode: e.response?.statusCode ?? 400,
        );
      } else {
        throw ApiError(
          message: e.message ?? 'Unknown Error',
          statusCode: e.response?.statusCode ?? 400,
        );
      }
    } else {
      throw ApiError(message: e.toString(), statusCode: 400);
    }
  } on ApiError {
    rethrow;
  } catch (e) {
    throw ApiError(message: e.toString(), statusCode: 400);
  }
}
