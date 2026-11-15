import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/core/push_notifications/domain/entities/push_message.dart';

/// Base class for all push notification events.
sealed class NotificationEvent extends Equatable {
  const NotificationEvent();

  @override
  List<Object?> get props => [];
}

/// Dispatched to initialize remote and local notification listeners, channels, and cold starts.
final class NotificationStarted extends NotificationEvent {
  const NotificationStarted();
}

/// Dispatched when an incoming push notification is received while the app is in foreground.
final class RemoteMessageReceived extends NotificationEvent {
  const RemoteMessageReceived(this.message);

  final PushMessage message;

  @override
  List<Object?> get props => [message];
}

/// Dispatched when a notification is tapped by the user (from background, cold start, or local heads-up banner).
final class NotificationTapped extends NotificationEvent {
  const NotificationTapped({this.uuid, this.data = const {}});

  final String? uuid;
  final Map<String, dynamic> data;

  @override
  List<Object?> get props => [uuid, data];
}
