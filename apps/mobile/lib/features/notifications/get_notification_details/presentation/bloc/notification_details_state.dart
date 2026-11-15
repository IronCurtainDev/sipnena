import 'package:equatable/equatable.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/notifications_core.dart';

abstract class NotificationDetailsState extends Equatable {
  const NotificationDetailsState();

  @override
  List<Object?> get props => [];
}

class NotificationDetailsInitial extends NotificationDetailsState {
  const NotificationDetailsInitial();
}

class NotificationDetailsLoading extends NotificationDetailsState {
  const NotificationDetailsLoading();
}

class NotificationDetailsLoaded extends NotificationDetailsState {
  const NotificationDetailsLoaded({required this.notification});

  final NotificationItem notification;

  @override
  List<Object?> get props => [notification];
}

class NotificationDetailsFailure extends NotificationDetailsState {
  const NotificationDetailsFailure({required this.message});

  final String message;

  @override
  List<Object?> get props => [message];
}

class NotificationDetailsDeleting extends NotificationDetailsState {
  const NotificationDetailsDeleting();
}

class NotificationDetailsDeleteSuccess extends NotificationDetailsState {
  const NotificationDetailsDeleteSuccess({required this.message});

  final String message;

  @override
  List<Object?> get props => [message];
}

class NotificationDetailsDeleteFailure extends NotificationDetailsState {
  const NotificationDetailsDeleteFailure({required this.message});

  final String message;

  @override
  List<Object?> get props => [message];
}
