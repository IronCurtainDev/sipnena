import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/notifications/notifications.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

extension NotificationsInjection on GetIt {
  void registerNotificationsFeature() {
    // API Client
    registerLazySingleton<NotificationApiClient>(
      () => NotificationApiClient(get()),
    );

    // 1. Get Notifications Sub-Feature
    registerLazySingleton<GetNotificationsRemoteDataSource>(
      () => GetNotificationsRemoteDataSourceImpl(apiClient: get()),
    );
    registerLazySingleton<IGetNotificationsRepository>(
      () => GetNotificationsRepositoryImpl(get<GetNotificationsRemoteDataSource>()),
    );
    registerFactory<GetNotificationsUseCase>(
      () => GetNotificationsUseCase(get<IGetNotificationsRepository>()),
    );
    registerFactory<NotificationPaginationController>(
      () => NotificationPaginationController(
        getNotificationsUseCase: get<GetNotificationsUseCase>(),
      ),
    );
    registerFactory<GetNotificationsCubit>(
      () => GetNotificationsCubit(
        paginationController: get<NotificationPaginationController>(),
        markNotificationAsReadUseCase: get<MarkNotificationAsReadUseCase>(),
        updateAppBadgeCountUseCase: get<UpdateAppBadgeCountUseCase>(),
      ),
    );

    // 2. Mark As Read Sub-Feature (Data & Domain)
    registerLazySingleton<MarkAsReadRemoteDataSource>(
      () => MarkAsReadRemoteDataSourceImpl(apiClient: get()),
    );
    registerLazySingleton<IMarkAsReadRepository>(
      () => MarkAsReadRepositoryImpl(get<MarkAsReadRemoteDataSource>()),
    );
    registerFactory<MarkNotificationAsReadUseCase>(
      () => MarkNotificationAsReadUseCase(get<IMarkAsReadRepository>()),
    );

    // 3. Delete Notifications Sub-Feature (Data & Domain)
    registerLazySingleton<DeleteNotificationsRemoteDataSource>(
      () => DeleteNotificationsRemoteDataSourceImpl(apiClient: get()),
    );
    registerLazySingleton<IDeleteNotificationsRepository>(
      () => DeleteNotificationsRepositoryImpl(
        get<DeleteNotificationsRemoteDataSource>(),
      ),
    );
    registerFactory<DeleteNotificationUseCase>(
      () => DeleteNotificationUseCase(
        get<IDeleteNotificationsRepository>(),
      ),
    );

    // 4. Get Notification Details Sub-Feature (Data, Domain & Presentation)
    registerLazySingleton<GetNotificationDetailsRemoteDataSource>(
      () => GetNotificationDetailsRemoteDataSourceImpl(apiClient: get()),
    );
    registerLazySingleton<IGetNotificationDetailsRepository>(
      () => GetNotificationDetailsRepositoryImpl(
        get<GetNotificationDetailsRemoteDataSource>(),
      ),
    );
    registerFactory<GetNotificationDetailsUseCase>(
      () => GetNotificationDetailsUseCase(
        get<IGetNotificationDetailsRepository>(),
      ),
    );
    registerFactory<NotificationDetailsCubit>(
      () => NotificationDetailsCubit(
        getNotificationDetailsUseCase: get<GetNotificationDetailsUseCase>(),
        markAsReadUseCase: get<MarkNotificationAsReadUseCase>(),
        deleteNotificationUseCase: get<DeleteNotificationUseCase>(),
      ),
    );
  }
}
