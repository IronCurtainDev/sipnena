import 'dart:convert';

import 'package:equatable/equatable.dart';

class NotificationItem extends Equatable {
  const NotificationItem({
    required this.id,
    required this.uuid,
    required this.title,
    required this.message,
    this.scheduledAt,
    this.scheduledTimezone,
    this.sentAt,
    this.notifiableType,
    this.badgeCount = 0,
    this.notifiableId = 0,
    this.timeDuration = '',
    this.createdAt = '',
    this.updatedAt = '',
    this.data,
    this.androidConfig,
    this.apnsConfig,
    this.readAt,
    this.topic,
    this.deletedAt,
    this.actualTime = '',
  });

  final int id;
  final String uuid;
  final String title;
  final String message;
  final String? scheduledAt;
  final String? scheduledTimezone;
  final String? sentAt;
  final String? notifiableType;
  final int badgeCount;
  final int notifiableId;
  final String timeDuration;
  final String createdAt;
  final String updatedAt;
  final String? data;
  final String? androidConfig;
  final String? apnsConfig;
  final String? readAt;
  final String? topic;
  final String? deletedAt;
  final String actualTime;

  bool get isRead => readAt != null && readAt!.trim().isNotEmpty;

  String get displayTime {
    if (timeDuration.trim().isNotEmpty) return timeDuration.trim();
    if (actualTime.trim().isNotEmpty) return actualTime.trim();
    return createdAt.trim();
  }

  Map<String, dynamic>? get parsedData {
    if (data == null || data!.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(data!);
      if (decoded is Map<String, dynamic>) return decoded;
      if (decoded is Map) return decoded.cast<String, dynamic>();
    } catch (_) {
      try {
        final content = data!.trim();
        if (content.startsWith('{') && content.endsWith('}')) {
          final inner = content.substring(1, content.length - 1);
          final result = <String, dynamic>{};
          for (final pair in inner.split(',')) {
            final parts = pair.split(':');
            if (parts.length >= 2) {
              final key = parts[0].trim().replaceAll('"', '').replaceAll("'", '');
              final val = parts.sublist(1).join(':').trim().replaceAll('"', '').replaceAll("'", '');
              result[key] = val;
            }
          }
          if (result.isNotEmpty) return result;
        }
      } catch (_) {}
    }
    return null;
  }

  String? get bookingUuid {
    final map = parsedData;
    if (map == null) return null;
    final value = map['booking_uuid'] ?? map['bookingUuid'] ?? map['trip_uuid'] ?? map['tripUuid'];
    return value?.toString();
  }

  String? get notificationType => parsedData?['type']?.toString();

  String? get destinationPath => parsedData?['path']?.toString() ?? parsedData?['navigate_to']?.toString();

  bool get isRideComplete {
    if (notificationType == 'ride_complete') return true;
    final path = destinationPath;
    if (path != null && path.contains('/rate')) return true;
    final screen = parsedData?['screen']?.toString();
    if (screen == '5.0') return true;
    return false;
  }

  NotificationItem copyWith({
    int? id,
    String? uuid,
    String? title,
    String? message,
    String? scheduledAt,
    String? scheduledTimezone,
    String? sentAt,
    String? notifiableType,
    int? badgeCount,
    int? notifiableId,
    String? timeDuration,
    String? createdAt,
    String? updatedAt,
    String? data,
    String? androidConfig,
    String? apnsConfig,
    String? readAt,
    String? topic,
    String? deletedAt,
    String? actualTime,
  }) {
    return NotificationItem(
      id: id ?? this.id,
      uuid: uuid ?? this.uuid,
      title: title ?? this.title,
      message: message ?? this.message,
      scheduledAt: scheduledAt ?? this.scheduledAt,
      scheduledTimezone: scheduledTimezone ?? this.scheduledTimezone,
      sentAt: sentAt ?? this.sentAt,
      notifiableType: notifiableType ?? this.notifiableType,
      badgeCount: badgeCount ?? this.badgeCount,
      notifiableId: notifiableId ?? this.notifiableId,
      timeDuration: timeDuration ?? this.timeDuration,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      data: data ?? this.data,
      androidConfig: androidConfig ?? this.androidConfig,
      apnsConfig: apnsConfig ?? this.apnsConfig,
      readAt: readAt ?? this.readAt,
      topic: topic ?? this.topic,
      deletedAt: deletedAt ?? this.deletedAt,
      actualTime: actualTime ?? this.actualTime,
    );
  }

  @override
  List<Object?> get props => [
        id,
        uuid,
        title,
        message,
        scheduledAt,
        scheduledTimezone,
        sentAt,
        notifiableType,
        badgeCount,
        notifiableId,
        timeDuration,
        createdAt,
        updatedAt,
        data,
        androidConfig,
        apnsConfig,
        readAt,
        topic,
        deletedAt,
        actualTime,
      ];
}
