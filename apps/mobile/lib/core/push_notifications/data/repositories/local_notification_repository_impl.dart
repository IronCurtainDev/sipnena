import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:react_hono_flutter_template/core/push_notifications/data/datasources/push_notification_local_data_source.dart';
import 'package:react_hono_flutter_template/core/push_notifications/domain/repositories/i_local_notification_repository.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Implementation of [ILocalNotificationRepository] backed by [PushNotificationLocalDataSource].
class LocalNotificationRepositoryImpl implements ILocalNotificationRepository {
  LocalNotificationRepositoryImpl(this._localDataSource);

  static const String _logTag = 'LocalNotificationRepo';
  final PushNotificationLocalDataSource _localDataSource;

  @override
  Future<void> initialize({
    required void Function(String? payload) onNotificationResponse,
  }) async {
    if (kIsWeb) return;
    await _localDataSource.initialize(
      onNotificationResponse: onNotificationResponse,
    );
  }

  @override
  Future<void> showNotification({
    required int id,
    String? title,
    String? body,
    String? payload,
    int? badgeCount,
  }) async {
    if (kIsWeb) return;
    await _localDataSource.showNotification(
      id: id,
      title: title,
      body: body,
      payload: payload,
      badgeCount: badgeCount,
    );
  }

  @override
  Future<void> updateBadgeCount(int count) async {
    if (kIsWeb) return;
    await _localDataSource.updateBadgeCount(count);
  }

  @override
  Future<String?> getInitialPayload() async {
    if (kIsWeb) return null;
    try {
      final launchDetails = await _localDataSource.getNotificationAppLaunchDetails();
      if (launchDetails != null && launchDetails.didNotificationLaunchApp) {
        final payload = launchDetails.notificationResponse?.payload;
        if (payload != null && payload.isNotEmpty) {
          return payload;
        }
      }
    } on Object catch (error, stackTrace) {
      AppLogger.warning('Failed to inspect local notification launch details', tag: _logTag, error: error, stackTrace: stackTrace);
    }
    return null;
  }
}
