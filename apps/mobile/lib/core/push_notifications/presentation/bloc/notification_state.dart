import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/core/push_notifications/domain/entities/push_message.dart';

/// Base class for all push notification states.
sealed class NotificationState extends Equatable {
  const NotificationState();

  @override
  List<Object?> get props => [];
}

/// Initial uninitialized state.
final class NotificationInitial extends NotificationState {
  const NotificationInitial();
}

/// Active state when listeners are attached and listening.
final class NotificationActive extends NotificationState {
  const NotificationActive({this.lastMessage});

  final PushMessage? lastMessage;

  @override
  List<Object?> get props => [lastMessage];
}

/// State emitted to trigger a navigation side effect when a notification is tapped.
final class NotificationNavigating extends NotificationState {
  const NotificationNavigating({this.uuid, this.data = const {}});

  final String? uuid;
  final Map<String, dynamic> data;

  @override
  List<Object?> get props => [uuid, data];
}
