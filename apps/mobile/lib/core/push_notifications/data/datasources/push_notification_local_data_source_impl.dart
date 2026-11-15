import 'dart:async';

import 'package:app_badge_plus/app_badge_plus.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:react_hono_flutter_template/core/push_notifications/data/datasources/push_notification_local_data_source.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class PushNotificationLocalDataSourceImpl implements PushNotificationLocalDataSource {
  PushNotificationLocalDataSourceImpl({
    FlutterLocalNotificationsPlugin? localNotifications,
  }) : _localNotifications = localNotifications ?? FlutterLocalNotificationsPlugin();

  static const String _logTag = 'PushNotificationLocalDS';
  static const AndroidNotificationChannel _channel = AndroidNotificationChannel(
    'high_importance_channel',
    'High Importance Notifications',
    description: 'This channel is used for important notifications.',
    importance: Importance.high,
  );

  final FlutterLocalNotificationsPlugin _localNotifications;

  @override
  Future<void> initialize({
    required void Function(String? payload) onNotificationResponse,
  }) async {
    const initializationSettings = InitializationSettings(
      android: AndroidInitializationSettings('@drawable/ic_notification'),
      iOS: DarwinInitializationSettings(),
    );

    await _localNotifications.initialize(
      settings: initializationSettings,
      onDidReceiveNotificationResponse: (response) => onNotificationResponse(response.payload),
    );

    final androidPlugin = _localNotifications.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
    await androidPlugin?.createNotificationChannel(_channel);
    await androidPlugin?.requestNotificationsPermission();
  }

  @override
  Future<void> showNotification({
    required int id,
    String? title,
    String? body,
    String? payload,
    int? badgeCount,
  }) async {
    try {
      await _localNotifications.show(
        id: id & 0x7FFFFFFF, // Guarantee positive 31-bit integer for Android NotificationManager
        title: title,
        body: body,
        notificationDetails: NotificationDetails(
          android: AndroidNotificationDetails(
            _channel.id,
            _channel.name,
            channelDescription: _channel.description,
            icon: '@drawable/ic_notification',
            largeIcon: const DrawableResourceAndroidBitmap('@mipmap/ic_launcher'),
            number: badgeCount,
            importance: Importance.high,
            priority: Priority.high,
          ),
          iOS: DarwinNotificationDetails(
            presentAlert: true,
            presentBadge: true,
            presentSound: true,
            badgeNumber: badgeCount,
          ),
        ),
        payload: payload,
      );
    } on Object catch (error, stackTrace) {
      AppLogger.error('Failed to show local notification', tag: _logTag, error: error, stackTrace: stackTrace);
    }
  }

  @override
  Future<NotificationAppLaunchDetails?> getNotificationAppLaunchDetails() {
    return _localNotifications.getNotificationAppLaunchDetails();
  }

  @override
  Future<void> updateBadgeCount(int count) async {
    try {
      if (await AppBadgePlus.isSupported()) {
        await AppBadgePlus.updateBadge(count);
      }
    } on Object catch (error, stackTrace) {
      AppLogger.warning('Failed to update app badge count', tag: _logTag, error: error, stackTrace: stackTrace);
    }
  }
}
