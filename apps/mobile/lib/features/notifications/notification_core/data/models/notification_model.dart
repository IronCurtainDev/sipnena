import 'dart:convert';

import 'package:react_hono_flutter_template/features/notifications/notification_core/domain/entities/notification_item.dart';

class NotificationModel {
  const NotificationModel({
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

  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    final rawData = json['data'];
    String? dataString;
    if (rawData is Map || rawData is List) {
      dataString = jsonEncode(rawData);
    } else if (rawData != null) {
      dataString = rawData.toString();
    }

    return NotificationModel(
      id: _parseInt(json['id']),
      uuid: (json['uuid'] as String?) ?? '',
      title: (json['title'] as String?) ?? '',
      message: (json['message'] as String?) ?? '',
      scheduledAt: json['scheduled_at'] as String?,
      scheduledTimezone: json['scheduled_timezone'] as String?,
      sentAt: json['sent_at'] as String?,
      notifiableType: json['notifiable_type'] as String?,
      badgeCount: _parseInt(json['badge_count']),
      notifiableId: _parseInt(json['notifiable_id']),
      timeDuration: (json['TimeDuration'] as String?) ?? '',
      createdAt: (json['created_at'] as String?) ?? '',
      updatedAt: (json['updated_at'] as String?) ?? '',
      data: dataString,
      androidConfig: json['android_config']?.toString(),
      apnsConfig: json['apns_config']?.toString(),
      readAt: json['read_at'] as String?,
      topic: json['topic'] as String?,
      deletedAt: json['deleted_at'] as String?,
      actualTime: (json['ActualTime'] as String?) ?? '',
    );
  }

  static int _parseInt(dynamic value) {
    if (value is int) return value;
    if (value is String) return int.tryParse(value) ?? 0;
    return 0;
  }

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

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'uuid': uuid,
      'title': title,
      'message': message,
      'scheduled_at': scheduledAt,
      'scheduled_timezone': scheduledTimezone,
      'sent_at': sentAt,
      'notifiable_type': notifiableType,
      'badge_count': badgeCount,
      'notifiable_id': notifiableId,
      'TimeDuration': timeDuration,
      'created_at': createdAt,
      'updated_at': updatedAt,
      'data': data,
      'android_config': androidConfig,
      'apns_config': apnsConfig,
      'read_at': readAt,
      'topic': topic,
      'deleted_at': deletedAt,
      'ActualTime': actualTime,
    };
  }

  NotificationItem toEntity() {
    return NotificationItem(
      id: id,
      uuid: uuid,
      title: title,
      message: message,
      scheduledAt: scheduledAt,
      scheduledTimezone: scheduledTimezone,
      sentAt: sentAt,
      notifiableType: notifiableType,
      badgeCount: badgeCount,
      notifiableId: notifiableId,
      timeDuration: timeDuration,
      createdAt: createdAt,
      updatedAt: updatedAt,
      data: data,
      androidConfig: androidConfig,
      apnsConfig: apnsConfig,
      readAt: readAt,
      topic: topic,
      deletedAt: deletedAt,
      actualTime: actualTime,
    );
  }
}
