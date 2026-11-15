import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/delete_notifications/delete_notifications.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notification_details/domain/domain.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notification_details/presentation/bloc/notification_details_state.dart';
import 'package:react_hono_flutter_template/features/notifications/mark_as_read/mark_as_read.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/notifications_core.dart';

class NotificationDetailsCubit extends Cubit<NotificationDetailsState> {
  NotificationDetailsCubit({
    required GetNotificationDetailsUseCase getNotificationDetailsUseCase,
    required MarkNotificationAsReadUseCase markAsReadUseCase,
    required DeleteNotificationUseCase deleteNotificationUseCase,
  })  : _getNotificationDetailsUseCase = getNotificationDetailsUseCase,
        _markAsReadUseCase = markAsReadUseCase,
        _deleteNotificationUseCase = deleteNotificationUseCase,
        super(const NotificationDetailsInitial());

  final GetNotificationDetailsUseCase _getNotificationDetailsUseCase;
  final MarkNotificationAsReadUseCase _markAsReadUseCase;
  final DeleteNotificationUseCase _deleteNotificationUseCase;

  Future<void> loadNotification(String uuid, {NotificationItem? initialItem}) async {
    if (isClosed) return;

    if (initialItem != null) {
      emit(NotificationDetailsLoaded(notification: initialItem));
      if (!initialItem.isRead) {
        unawaited(_markAsReadUseCase(MarkAsReadParams(uuid: uuid)));
      }
    } else {
      emit(const NotificationDetailsLoading());
    }

    final result = await _getNotificationDetailsUseCase(uuid);
    if (isClosed) return;

    result.fold(
      onSuccess: (NotificationItem notification) {
        if (isClosed) return;
        emit(NotificationDetailsLoaded(notification: notification));
        if (initialItem == null && !notification.isRead) {
          unawaited(_markAsReadUseCase(MarkAsReadParams(uuid: uuid)));
        }
      },
      onFailure: (Failure failure) {
        if (isClosed) return;
        if (state is! NotificationDetailsLoaded) {
          emit(NotificationDetailsFailure(message: failure.message));
        }
      },
    );
  }

  Future<void> deleteNotification(
    String uuid, {
    String successMessage = 'Notification deleted successfully',
  }) async {
    if (isClosed) return;

    emit(const NotificationDetailsDeleting());
    final result = await _deleteNotificationUseCase(uuid);
    if (isClosed) return;

    result.fold(
      onSuccess: (_) {
        if (isClosed) return;
        emit(NotificationDetailsDeleteSuccess(message: successMessage));
      },
      onFailure: (Failure failure) {
        if (isClosed) return;
        emit(NotificationDetailsDeleteFailure(message: failure.message));
      },
    );
  }
}
