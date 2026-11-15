import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notification_details/data/datasources/get_notification_details_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/data/data.dart';

class GetNotificationDetailsRemoteDataSourceImpl implements GetNotificationDetailsRemoteDataSource {
  GetNotificationDetailsRemoteDataSourceImpl({required this.apiClient});

  // ignore: unused_field
  final NotificationApiClient apiClient;

  @override
  Future<NotificationModel> getNotification({required String uuid}) async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCallEnvelope(
    //   apiCall: () => apiClient.getNotification(uuid: uuid),
    //   fromApiResponse: (apiResponse) {
    //     final payload = apiResponse.data;
    //     if (payload is! Map<String, dynamic>) {
    //       throw ApiError(message: 'Notification details payload is missing');
    //     }
    //     return NotificationModel.fromJson(payload);
    //   },
    // );

    await Future<void>.delayed(const Duration(milliseconds: 300));
    return NotificationModel(
      id: 1,
      uuid: uuid,
      title: 'Welcome to Starter!',
      message: 'Explore our Clean Architecture and BLoC starter boilerplate template.',
      timeDuration: 'Just now',
      createdAt: '2026-10-06 12:00:00',
    );
  }
}
