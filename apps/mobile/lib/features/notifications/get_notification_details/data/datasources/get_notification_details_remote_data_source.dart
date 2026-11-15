import 'package:react_hono_flutter_template/features/notifications/notification_core/data/data.dart';

abstract class GetNotificationDetailsRemoteDataSource {
  Future<NotificationModel> getNotification({required String uuid});
}
