import 'dart:async';

import 'package:firebase_messaging/firebase_messaging.dart';

/// Contract for interacting with the Firebase Cloud Messaging native SDK.
abstract interface class PushNotificationRemoteDataSource {
  /// Stream of messages received while the app is in the foreground.
  Stream<RemoteMessage> get onMessage;

  /// Stream of messages received when the app is opened from the background via notification tap.
  Stream<RemoteMessage> get onMessageOpenedApp;

  /// Stream of rotated registration tokens.
  Stream<String> get onTokenRefresh;

  /// Gets the message that launched the app from a terminated state, if any.
  Future<RemoteMessage?> getInitialMessage();

  /// Requests user permission to display alerts, badges, and sounds.
  Future<NotificationSettings> requestPermission();

  /// Resolves the APNs device token on iOS with quick retries.
  Future<String?> getApnsToken({
    Duration timeout = const Duration(seconds: 1),
    int retryCount = 3,
    Duration retryDelay = const Duration(milliseconds: 300),
  });

  /// Resolves the FCM registration token.
  Future<String> getToken({
    Duration timeout = const Duration(seconds: 4),
  });

  /// Sets foreground notification presentation options for Apple platforms.
  Future<void> setForegroundNotificationPresentationOptions();
}
