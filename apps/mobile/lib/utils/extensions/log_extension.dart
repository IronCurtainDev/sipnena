import 'dart:developer' as developer;

import 'package:flutter/foundation.dart';

/// Signature for custom log handlers, useful for testing or third-party adapters.
typedef LogHandler = void Function({
  required String message,
  required int level,
  required String tag,
  Object? error,
  StackTrace? stackTrace,
});

/// Centralized logging utility.
///
/// Wraps [developer.log] to ensure consistent tags, log levels,
/// and support for future crash-reporting tools (e.g. Firebase Crashlytics).
class AppLogger {
  AppLogger._();

  /// Optional custom handler for intercepting logs (e.g. in unit tests or external loggers).
  @visibleForTesting
  static LogHandler? customHandler;

  /// Log level constants matching standard logging conventions.
  static const int levelDebug = 500;
  static const int levelInfo = 800;
  static const int levelWarning = 900;
  static const int levelError = 1000;

  /// Internal dispatch to either [customHandler] or [developer.log].
  static void _log({
    required String message,
    required int level,
    required String tag,
    Object? error,
    StackTrace? stackTrace,
  }) {
    if (customHandler != null) {
      customHandler!(
        message: message,
        level: level,
        tag: tag,
        error: error,
        stackTrace: stackTrace,
      );
      return;
    }

    developer.log(
      message,
      name: tag,
      error: error,
      stackTrace: stackTrace,
      level: level,
    );
  }

  /// Logs an error with optional [error] exception and [stackTrace].
  static void error(
    String message, {
    Object? error,
    StackTrace? stackTrace,
    String tag = 'App',
  }) {
    final formattedMessage = error != null ? '$message: $error' : message;
    _log(
      message: formattedMessage,
      level: levelError,
      tag: tag,
      error: error,
      stackTrace: stackTrace,
    );
  }

  /// Logs a warning with optional [error] and [stackTrace].
  static void warning(
    String message, {
    Object? error,
    StackTrace? stackTrace,
    String tag = 'App',
  }) {
    final formattedMessage = error != null ? '$message: $error' : message;
    _log(
      message: formattedMessage,
      level: levelWarning,
      tag: tag,
      error: error,
      stackTrace: stackTrace,
    );
  }

  /// Logs an informational message.
  static void info(
    String message, {
    String tag = 'App',
  }) {
    _log(
      message: message,
      level: levelInfo,
      tag: tag,
    );
  }

  /// Logs a debug message (only active in debug mode).
  static void debug(
    String message, {
    String tag = 'App',
  }) {
    if (kDebugMode) {
      _log(
        message: message,
        level: levelDebug,
        tag: tag,
      );
    }
  }
}

/// Mixin providing convenient logging methods to any class.
///
/// Automatically uses [logTag] (defaults to [runtimeType]) as the logging tag.
mixin Loggable {
  /// The tag/name used in logs. Defaults to [runtimeType].
  ///
  /// Can be overridden in subclasses for custom tags (e.g. `'PusherService'`).
  String get logTag => runtimeType.toString();

  /// Logs an error with optional [error] and [stackTrace].
  void logError(
    String message, [
    Object? error,
    StackTrace? stackTrace,
  ]) {
    AppLogger.error(
      message,
      error: error,
      stackTrace: stackTrace,
      tag: logTag,
    );
  }

  /// Logs a warning with optional [error] and [stackTrace].
  void logWarning(
    String message, [
    Object? error,
    StackTrace? stackTrace,
  ]) {
    AppLogger.warning(
      message,
      error: error,
      stackTrace: stackTrace,
      tag: logTag,
    );
  }

  /// Logs an informational message.
  void logInfo(String message) {
    AppLogger.info(
      message,
      tag: logTag,
    );
  }

  /// Logs a debug message (only in debug mode).
  void logDebug(String message) {
    AppLogger.debug(
      message,
      tag: logTag,
    );
  }
}
