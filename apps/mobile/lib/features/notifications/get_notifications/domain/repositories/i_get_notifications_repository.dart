import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/domain/entities/get_notifications_params.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/domain/domain.dart';

abstract class IGetNotificationsRepository {
  Future<Result<({List<NotificationItem> items, Paginator paginator})>> getNotifications(
    GetNotificationsParams params,
  );
}
