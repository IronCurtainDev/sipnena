import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/presentation/bloc/get_notifications_state.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/presentation/bloc/notification_pagination_controller.dart';
import 'package:react_hono_flutter_template/features/notifications/mark_as_read/mark_as_read.dart';

class GetNotificationsCubit extends Cubit<GetNotificationsState> {
  GetNotificationsCubit({
    required this.paginationController,
    required MarkNotificationAsReadUseCase markNotificationAsReadUseCase,
    required UpdateAppBadgeCountUseCase updateAppBadgeCountUseCase,
  })  : _markNotificationAsReadUseCase = markNotificationAsReadUseCase,
        _updateAppBadgeCountUseCase = updateAppBadgeCountUseCase,
        super(const GetNotificationsInitial()) {
    clearBadgeCount();
  }

  final NotificationPaginationController paginationController;
  final MarkNotificationAsReadUseCase _markNotificationAsReadUseCase;
  final UpdateAppBadgeCountUseCase _updateAppBadgeCountUseCase;

  void refresh() {
    paginationController.triggerRefresh();
  }

  Future<void> markAsRead(String uuid) async {
    if (uuid.isEmpty) return;
    await _markNotificationAsReadUseCase(MarkAsReadParams(uuid: uuid));
  }

  Future<void> clearBadgeCount() async {
    await _updateAppBadgeCountUseCase(0);
  }

  @override
  Future<void> close() {
    paginationController.dispose();
    return super.close();
  }
}
