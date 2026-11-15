import 'dart:convert';
import 'package:equatable/equatable.dart';

/// Transport-neutral representation of an event received from a realtime
/// channel.
///
/// This model has no dependency on any transport SDK; `PusherDriver` and
/// `SockudoDriver` each construct it directly from their own native/SDK
/// event types.
class PusherChannelEvent extends Equatable {
  const PusherChannelEvent({
    required this.channelName,
    required this.eventName,
    this.data,
    this.userId,
  });

  /// The name of the channel the event was broadcast on.
  final String channelName;

  /// The name of the event (e.g. 'notification.received', 'client-ping').
  final String eventName;

  /// The raw payload data (can be a Map, String, or null).
  final dynamic data;

  /// The user ID associated with presence channel events, if available.
  final String? userId;

  /// Returns [data] parsed as a `Map<String, dynamic>` if possible.
  Map<String, dynamic>? get tryJsonMap {
    if (data == null) return null;
    if (data is Map<String, dynamic>) {
      return data as Map<String, dynamic>;
    }
    if (data is Map) {
      return (data as Map).cast<String, dynamic>();
    }
    if (data is String) {
      final trimmed = (data as String).trim();
      if (trimmed.isEmpty) return null;
      try {
        final decoded = jsonDecode(trimmed);
        if (decoded is Map<String, dynamic>) {
          return decoded;
        }
        if (decoded is Map) {
          return decoded.cast<String, dynamic>();
        }
      } catch (_) {
        return null;
      }
    }
    return null;
  }

  @override
  List<Object?> get props => [channelName, eventName, data, userId];
}
