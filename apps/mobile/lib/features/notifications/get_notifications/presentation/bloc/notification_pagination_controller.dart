import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/domain/entities/get_notifications_params.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/domain/usecases/get_notifications_use_case.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/notifications_core.dart';

class NotificationPaginationController extends BasePaginationController<NotificationItem> {
  NotificationPaginationController({required this.getNotificationsUseCase});

  final GetNotificationsUseCase getNotificationsUseCase;

  @override
  Future<({List<NotificationItem> items, Paginator paginator})> fetchApi(int pageKey) async {
    final result = await getNotificationsUseCase(GetNotificationsParams(page: pageKey));
    return result.fold(
      onSuccess: (({List<NotificationItem> items, Paginator paginator}) data) => data,
      onFailure: (Failure failure) {
        throw Exception(failure.message);
      },
    );
  }
}
