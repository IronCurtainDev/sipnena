import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// API Client handling push notification endpoints (`/notification`).
class NotificationApiClient {
  const NotificationApiClient(this._apiClient);

  final ApiClient _apiClient;
  static const String _basePath = '/notification';

  /// Fetches paginated notifications from GET `/notification?page={page}`.
  Future<Response<dynamic>> getNotifications({required int page}) {
    return _apiClient.get(
      _basePath,
      queryParameters: {
        'page': page,
      },
    );
  }

  /// Fetches a single notification by UUID from GET `/notification/get-notification?uuid={uuid}`.
  Future<Response<dynamic>> getNotification({required String uuid}) {
    return _apiClient.get(
      '$_basePath/get-notification',
      queryParameters: {
        'uuid': uuid,
      },
    );
  }

  /// Marks a notification as read via POST `/notification/mark-as-read`.
  Future<Response<dynamic>> markAsRead({required String uuid}) {
    return _apiClient.post(
      '$_basePath/mark-as-read',
      data: {'uuid': uuid},
    );
  }

  /// Deletes a single notification via DELETE `/notification/delete`.
  Future<Response<dynamic>> deleteNotification({required String uuid}) {
    return _apiClient.delete(
      '$_basePath/delete',
      queryParameters: {
        'uuid': uuid,
      },
    );
  }
}
