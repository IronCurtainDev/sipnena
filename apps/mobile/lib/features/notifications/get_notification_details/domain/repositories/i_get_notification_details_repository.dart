import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/domain/domain.dart';

abstract class IGetNotificationDetailsRepository {
  Future<Result<NotificationItem>> getNotification(String uuid);
}
