import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/delete_notifications/data/datasources/delete_notifications_remote_data_source.dart';

class DeleteNotificationsRemoteDataSourceImpl implements DeleteNotificationsRemoteDataSource {
  DeleteNotificationsRemoteDataSourceImpl({required this.apiClient});

  // ignore: unused_field
  final NotificationApiClient apiClient;

  @override
  Future<void> deleteNotification({required String uuid}) async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCallEnvelope(
    //   apiCall: () => apiClient.deleteNotification(uuid: uuid),
    //   fromApiResponse: (_) {},
    // );

    await Future<void>.delayed(const Duration(milliseconds: 300));
  }
}
