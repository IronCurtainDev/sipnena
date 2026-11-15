import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/data/datasources/get_notifications_remote_data_source.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notifications/data/models/get_notifications_request_model.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/data/data.dart';

class GetNotificationsRemoteDataSourceImpl implements GetNotificationsRemoteDataSource {
  GetNotificationsRemoteDataSourceImpl({required this.apiClient});

  // ignore: unused_field
  final NotificationApiClient apiClient;

  @override
  Future<({List<NotificationModel> items, Paginator paginator})> getNotifications(
    GetNotificationsRequestModel request,
  ) async {
    // Real API call commented out for UI/offline starter development:
    // return safeApiCallPaginated(
    //   apiCall: () => apiClient.getNotifications(page: request.page),
    //   fromJson: NotificationModel.fromJson,
    // );

    await Future<void>.delayed(const Duration(milliseconds: 300));

    if (request.page > 1) {
      return (
        items: <NotificationModel>[],
        paginator: Paginator(
          currentPage: request.page,
          perPage: 10,
          from: 0,
          to: 0,
          total: 3,
          lastPage: 1,
        ),
      );
    }

    final items = [
      const NotificationModel(
        id: 1,
        uuid: 'mock-notif-1',
        title: 'Welcome to Starter!',
        message: 'Explore our Clean Architecture and BLoC starter boilerplate template.',
        timeDuration: 'Just now',
        createdAt: '2026-10-06 12:00:00',
      ),
      const NotificationModel(
        id: 2,
        uuid: 'mock-notif-2',
        title: 'System Update',
        message: 'Your app is up to date with the latest features and security improvements.',
        timeDuration: '2 hours ago',
        createdAt: '2026-10-06 10:00:00',
      ),
      const NotificationModel(
        id: 3,
        uuid: 'mock-notif-3',
        title: 'Account Verified',
        message: 'Your email address has been successfully verified.',
        timeDuration: '1 day ago',
        createdAt: '2026-10-05 15:30:00',
      ),
    ];

    return (
      items: items,
      paginator: Paginator(
        currentPage: 1,
        perPage: 10,
        from: 1,
        to: 3,
        total: 3,
        lastPage: 1,
      ),
    );
  }
}
