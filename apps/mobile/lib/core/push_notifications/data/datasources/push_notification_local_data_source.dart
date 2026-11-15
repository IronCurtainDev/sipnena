import 'dart:async';

import 'package:flutter_local_notifications/flutter_local_notifications.dart';

/// Contract for interacting with the device's local notification manager.
abstract interface class PushNotificationLocalDataSource {
  /// Initializes notification channels and registers tap listener.
  Future<void> initialize({
    required void Function(String? payload) onNotificationResponse,
  });

  /// Displays a heads-up notification in the system notification tray.
  Future<void> showNotification({
    required int id,
    String? title,
    String? body,
    String? payload,
    int? badgeCount,
  });

  /// Checks if the app was launched by tapping a local notification.
  Future<NotificationAppLaunchDetails?> getNotificationAppLaunchDetails();

  /// Updates or clears the app icon badge count across platforms.
  Future<void> updateBadgeCount(int count);
}
