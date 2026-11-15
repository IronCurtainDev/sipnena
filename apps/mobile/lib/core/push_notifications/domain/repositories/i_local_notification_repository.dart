/// Pure domain contract for local device notification interactions.
abstract interface class ILocalNotificationRepository {
  /// Initializes notification channels and registers tap callback.
  Future<void> initialize({
    required void Function(String? payload) onNotificationResponse,
  });

  /// Displays a local heads-up notification in the system notification tray.
  Future<void> showNotification({
    required int id,
    String? title,
    String? body,
    String? payload,
    int? badgeCount,
  });

  /// Checks if the app was launched by tapping a local notification from a terminated state.
  Future<String?> getInitialPayload();

  /// Updates or clears the app icon badge count across platforms.
  Future<void> updateBadgeCount(int count);
}
