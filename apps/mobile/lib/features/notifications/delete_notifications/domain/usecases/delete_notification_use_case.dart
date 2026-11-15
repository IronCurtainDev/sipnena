import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/delete_notifications/domain/repositories/i_delete_notifications_repository.dart';

class DeleteNotificationUseCase {
  const DeleteNotificationUseCase(this._repository);

  final IDeleteNotificationsRepository _repository;

  Future<Result<void>> call(String uuid) {
    return _repository.deleteNotification(uuid);
  }
}
