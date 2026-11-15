import 'dart:async';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:react_hono_flutter_template/core/push_notifications/data/datasources/push_notification_remote_data_source.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class PushNotificationRemoteDataSourceImpl implements PushNotificationRemoteDataSource {
  PushNotificationRemoteDataSourceImpl({
    FirebaseMessaging? messaging,
  }) : _messaging = messaging ?? FirebaseMessaging.instance;

  static const String _logTag = 'PushNotificationRemoteDS';
  final FirebaseMessaging _messaging;

  @override
  Stream<RemoteMessage> get onMessage => FirebaseMessaging.onMessage;

  @override
  Stream<RemoteMessage> get onMessageOpenedApp => FirebaseMessaging.onMessageOpenedApp;

  @override
  Stream<String> get onTokenRefresh => _messaging.onTokenRefresh;

  @override
  Future<RemoteMessage?> getInitialMessage() => _messaging.getInitialMessage();

  @override
  Future<NotificationSettings> requestPermission() => _messaging.requestPermission();

  @override
  Future<String?> getApnsToken({
    Duration timeout = const Duration(seconds: 1),
    int retryCount = 3,
    Duration retryDelay = const Duration(milliseconds: 300),
  }) async {
    for (var attempt = 0; attempt < retryCount; attempt++) {
      try {
        final token = await _messaging.getAPNSToken().timeout(timeout);
        if (token != null && token.isNotEmpty) {
          return token;
        }
      } on TimeoutException {
        AppLogger.debug('APNs token attempt $attempt timed out, retrying...', tag: _logTag);
      } catch (error) {
        AppLogger.debug('APNs token attempt $attempt error: $error', tag: _logTag);
      }
      if (attempt < retryCount - 1) {
        await Future<void>.delayed(retryDelay);
      }
    }
    return null;
  }

  @override
  Future<String> getToken({
    Duration timeout = const Duration(seconds: 4),
  }) async {
    try {
      if (!kIsWeb && defaultTargetPlatform == TargetPlatform.iOS) {
        final apnsToken = await getApnsToken();
        if (apnsToken == null) {
          AppLogger.warning('APNs token unavailable; attempting direct FCM token resolution', tag: _logTag);
        } else {
          AppLogger.debug('APNs token verified: $apnsToken', tag: _logTag);
        }
      }

      final token = await _messaging.getToken().timeout(timeout);
      return token ?? '';
    } on TimeoutException {
      AppLogger.warning('Timed out requesting push token from FCM', tag: _logTag);
      return '';
    } catch (error, stackTrace) {
      AppLogger.error('Failed to get FCM token', tag: _logTag, error: error, stackTrace: stackTrace);
      return '';
    }
  }

  @override
  Future<void> setForegroundNotificationPresentationOptions() {
    return _messaging.setForegroundNotificationPresentationOptions(
      alert: true,
      badge: true,
      sound: true,
    );
  }
}

@pragma('vm:entry-point')
Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  AppLogger.debug('Handling background message: ${message.messageId}', tag: 'FirebaseBackground');
}
