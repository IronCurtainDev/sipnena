import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notification_details/domain/repositories/i_get_notification_details_repository.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/domain/domain.dart';

class GetNotificationDetailsUseCase {
  const GetNotificationDetailsUseCase(this._repository);

  final IGetNotificationDetailsRepository _repository;

  Future<Result<NotificationItem>> call(String uuid) {
    return _repository.getNotification(uuid);
  }
}
