import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/delete_notifications/data/datasources/delete_notifications_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/notifications/delete_notifications/domain/repositories/i_delete_notifications_repository.dart';

class DeleteNotificationsRepositoryImpl implements IDeleteNotificationsRepository {
  DeleteNotificationsRepositoryImpl(this._remoteDataSource);

  final DeleteNotificationsRemoteDataSource _remoteDataSource;

  @override
  Future<Result<void>> deleteNotification(String uuid) async {
    return safeRepositoryCall(
      () async {
        await _remoteDataSource.deleteNotification(uuid: uuid);
      },
      requireRemote: true,
      remoteDataSource: _remoteDataSource,
    );
  }
}
