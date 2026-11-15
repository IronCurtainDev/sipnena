import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/data/models/get_notifications_request_model.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/data/data.dart';

abstract class GetNotificationsRemoteDataSource {
  Future<({List<NotificationModel> items, Paginator paginator})> getNotifications(
    GetNotificationsRequestModel request,
  );
}
