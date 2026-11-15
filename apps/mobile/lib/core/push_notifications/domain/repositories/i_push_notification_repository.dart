import 'dart:async';

import 'package:react_hono_flutter_template/core/push_notifications/domain/entities/push_message.dart';

/// Pure domain contract for push notification lifecycle and incoming streams.
abstract interface class IPushNotificationRepository {
  /// Stream of incoming push notifications received while the app is in the foreground.
  Stream<PushMessage> get onMessageReceived;

  /// Stream of push notifications tapped by the user when the app was in the background.
  Stream<PushMessage> get onMessageOpened;

  /// Stream of rotated FCM registration tokens.
  Stream<String> get onTokenRefresh;

  /// Checks if the app was launched from a terminated cold-start state via a remote push notification.
  Future<PushMessage?> getInitialMessage();

  /// Initializes push notification listeners, stream subscriptions, and native presentation options.
  Future<void> initialize();

  /// Requests push notification permissions from the host platform.
  Future<bool> requestPermission();

  /// Resolves the device's FCM push token.
  Future<String> getDevicePushToken();

  /// Releases resources, subscriptions, and active stream controllers.
  Future<void> dispose();
}
