import 'dart:async';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:react_hono_flutter_template/core/push_notifications/data/datasources/push_notification_remote_data_source.dart';
import 'package:react_hono_flutter_template/core/push_notifications/domain/entities/push_message.dart';
import 'package:react_hono_flutter_template/core/push_notifications/domain/repositories/i_push_notification_repository.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Concrete implementation of [IPushNotificationRepository].
///
/// **Single Responsibility**:
/// Mediates between the remote push service (Firebase Cloud Messaging) and the application domain.
/// - Exposes streams of incoming and tapped push messages.
/// - Manages device push registration token resolution and refresh streams.
/// - Handles push permission requests and native foreground presentation options.
///
/// *Note: Local notification display and navigation routing are handled by dedicated services.*
class PushNotificationRepositoryImpl implements IPushNotificationRepository {
  /// Creates a new [PushNotificationRepositoryImpl] instance with the required remote data source.
  PushNotificationRepositoryImpl({
    required PushNotificationRemoteDataSource remoteDataSource,
  }) : _remoteDataSource = remoteDataSource;

  /// Tag used for prefixing log messages emitted by this repository.
  static const String _logTag = 'PushNotificationRepo';

  /// Remote data source wrapping Firebase Cloud Messaging (FCM).
  final PushNotificationRemoteDataSource _remoteDataSource;

  /// Broadcast controller for incoming push notifications received in the foreground.
  final StreamController<PushMessage> _messageReceivedController = StreamController<PushMessage>.broadcast();

  /// Broadcast controller for push notifications tapped by the user from the background.
  final StreamController<PushMessage> _messageOpenedController = StreamController<PushMessage>.broadcast();

  /// Holds active stream subscriptions to cancel when this repository is disposed.
  final List<StreamSubscription<dynamic>> _subscriptions = [];

  /// Prevents double-initialization of event listeners.
  bool _isInitialized = false;

  /// Stream of incoming push notifications received while the app is in the foreground.
  @override
  Stream<PushMessage> get onMessageReceived => _messageReceivedController.stream;

  /// Stream of push notifications tapped by the user when the app was in the background.
  @override
  Stream<PushMessage> get onMessageOpened => _messageOpenedController.stream;

  /// Stream of rotated FCM registration tokens.
  @override
  Stream<String> get onTokenRefresh => _remoteDataSource.onTokenRefresh;

  /// Initializes remote push notification listeners and iOS presentation options.
  @override
  Future<void> initialize() async {
    if (_isInitialized) return;
    _isInitialized = true;

    // 1. Listen for notification taps when the app is in the background
    _subscriptions
      ..add(
        _remoteDataSource.onMessageOpenedApp.listen((message) {
          final pushMessage = _toPushMessage(message);
          if (!_messageOpenedController.isClosed) {
            _messageOpenedController.add(pushMessage);
          }
        }),
      )

      // 2. Listen for incoming notifications while the app is in the foreground
      ..add(
        _remoteDataSource.onMessage.listen((message) {
          final pushMessage = _toPushMessage(message);
          if (!_messageReceivedController.isClosed) {
            _messageReceivedController.add(pushMessage);
          }
        }),
      );

    // 3. Request user permission for push notifications (iOS alerts/badges/sounds, Android 13+ POST_NOTIFICATIONS)
    await requestPermission();

    // 4. Enable native presentation options (sound, badge, alert) while in foreground on iOS
    if (!kIsWeb) {
      await _remoteDataSource.setForegroundNotificationPresentationOptions();
    }

    // 4. In debug mode, automatically resolve and print the FCM token for developer convenience
    if (kDebugMode) {
      unawaited(getDevicePushToken());
    }
  }

  /// Checks if the app was launched from a terminated cold-start state via a remote push notification.
  @override
  Future<PushMessage?> getInitialMessage() async {
    try {
      final initialMessage = await _remoteDataSource.getInitialMessage();
      if (initialMessage != null) {
        return _toPushMessage(initialMessage);
      }
    } on Object catch (error, stackTrace) {
      AppLogger.warning('Failed to inspect initial FCM message', tag: _logTag, error: error, stackTrace: stackTrace);
    }
    return null;
  }

  /// Requests user permission for push notifications (iOS alerts/badges/sounds, Android 13+ POST_NOTIFICATIONS).
  @override
  Future<bool> requestPermission() async {
    try {
      final settings = await _remoteDataSource.requestPermission();
      return settings.authorizationStatus == AuthorizationStatus.authorized || settings.authorizationStatus == AuthorizationStatus.provisional;
    } on Object catch (error, stackTrace) {
      AppLogger.error('Failed to request notification permission', tag: _logTag, error: error, stackTrace: stackTrace);
      return false;
    }
  }

  /// Resolves the device's FCM push token from Firebase.
  ///
  /// In debug mode, logs the token with emoji markers for developer convenience.
  @override
  Future<String> getDevicePushToken() async {
    final token = await _remoteDataSource.getToken();
    if (kDebugMode) {
      if (token.isNotEmpty) {
        debugPrint('[Device Push Token] $token');
        // This print is used for testing purposes to get the token
        AppLogger.info('🔑🔑🔑🔑🔑🔑🔑 [Device Push Token] $token', tag: _logTag);
      } else {
        // This print is used for testing purposes to get the token
        debugPrint('⚠️ [Device Push Token] Token resolved as empty');
        AppLogger.warning('⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️  [Device Push Token] Token resolved as empty', tag: _logTag);
      }
    }
    return token;
  }

  /// Maps a raw Firebase [RemoteMessage] to the clean domain [PushMessage] entity.
  PushMessage _toPushMessage(RemoteMessage message) {
    final title = message.notification?.title ?? message.data['title']?.toString();
    final body = message.notification?.body ?? message.data['body']?.toString();
    final uuid = _extractUuid(message.data);
    return PushMessage(
      uuid: uuid,
      title: title,
      body: body,
      data: message.data,
    );
  }

  /// Extracts the notification UUID from various common payload key formats.
  String? _extractUuid(Map<String, dynamic> data) {
    final value = data['uuid'] ?? data['notification_uuid'] ?? data['notificationUuid'];
    final uuid = value?.toString().trim();
    return (uuid == null || uuid.isEmpty) ? null : uuid;
  }

  /// Disposes active stream controllers and cancels all message subscriptions.
  @override
  Future<void> dispose() async {
    for (final subscription in _subscriptions) {
      await subscription.cancel();
    }
    _subscriptions.clear();
    if (!_messageReceivedController.isClosed) {
      await _messageReceivedController.close();
    }
    if (!_messageOpenedController.isClosed) {
      await _messageOpenedController.close();
    }
  }
}
