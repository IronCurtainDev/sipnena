import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:react_hono_flutter_template/core/core.dart';

/// Use case that displays a local heads-up notification banner
/// when an incoming push notification arrives while the app is in foreground on Android.
class ShowLocalNotificationUseCase implements UseCase<void, PushMessage> {
  const ShowLocalNotificationUseCase(this._localNotificationRepository);

  final ILocalNotificationRepository _localNotificationRepository;

  @override
  Future<Result<void>> call(PushMessage message) async {
    // Only Android requires manual local heads-up presentation during foreground
    if (kIsWeb || defaultTargetPlatform != TargetPlatform.android) {
      return const Result.success(null);
    }

    final title = message.title;
    final body = message.body;
    if (title == null && body == null) {
      return const Result.success(null);
    }

    try {
      final id = (message.uuid?.hashCode ?? message.hashCode) & 0x7FFFFFFF;
      final rawBadge = message.data['badge'] ?? message.data['badge_count'];
      final badgeCount = rawBadge != null ? int.tryParse(rawBadge.toString()) : null;

      await _localNotificationRepository.showNotification(
        id: id,
        title: title,
        body: body,
        payload: jsonEncode(message.data),
        badgeCount: badgeCount,
      );
      return const Result.success(null);
    } on Object catch (error) {
      return Result.failure(ServerFailure(error.toString()));
    }
  }
}
