import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/domain/entities/get_notifications_params.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/domain/repositories/i_get_notifications_repository.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/domain/domain.dart';

class GetNotificationsUseCase {
  const GetNotificationsUseCase(this._repository);

  final IGetNotificationsRepository _repository;

  Future<Result<({List<NotificationItem> items, Paginator paginator})>> call(GetNotificationsParams params) {
    return _repository.getNotifications(params);
  }
}
