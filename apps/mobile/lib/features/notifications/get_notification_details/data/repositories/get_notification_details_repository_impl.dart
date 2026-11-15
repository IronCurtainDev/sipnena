import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notification_details/data/datasources/get_notification_details_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notification_details/domain/repositories/i_get_notification_details_repository.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/domain/domain.dart';

class GetNotificationDetailsRepositoryImpl implements IGetNotificationDetailsRepository {
  GetNotificationDetailsRepositoryImpl(this._remoteDataSource);

  final GetNotificationDetailsRemoteDataSource _remoteDataSource;

  @override
  Future<Result<NotificationItem>> getNotification(String uuid) async {
    return safeRepositoryCall(
      () async {
        final model = await _remoteDataSource.getNotification(uuid: uuid);
        return model.toEntity();
      },
      requireRemote: true,
      remoteDataSource: _remoteDataSource,
    );
  }
}
