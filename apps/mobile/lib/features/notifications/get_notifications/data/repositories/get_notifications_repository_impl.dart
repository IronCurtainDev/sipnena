import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/data/datasources/get_notifications_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/data/models/get_notifications_request_model.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/domain/entities/get_notifications_params.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/domain/repositories/i_get_notifications_repository.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/domain/domain.dart';

class GetNotificationsRepositoryImpl implements IGetNotificationsRepository {
  GetNotificationsRepositoryImpl(this._remoteDataSource);

  final GetNotificationsRemoteDataSource _remoteDataSource;

  @override
  Future<Result<({List<NotificationItem> items, Paginator paginator})>> getNotifications(
    GetNotificationsParams params,
  ) async {
    return safeRepositoryCall(
      () async {
        final response = await _remoteDataSource.getNotifications(
          GetNotificationsRequestModel.fromEntity(params),
        );
        return (
          items: response.items.map((model) => model.toEntity()).toList(),
          paginator: response.paginator,
        );
      },
      requireRemote: true,
      remoteDataSource: _remoteDataSource,
    );
  }
}
