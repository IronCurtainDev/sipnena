import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';
import 'package:react_hono_flutter_template/core/di/injection_container.dart';
import 'package:react_hono_flutter_template/features/notifications/notifications.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class NotificationListPage extends StatelessWidget {
  const NotificationListPage({super.key});

  void _onTapNotification(BuildContext context, NotificationItem notification) {
    if (notification.uuid.isNotEmpty) {
      context.read<GetNotificationsCubit>().markAsRead(notification.uuid);
    }

    Pages.notificationDetails.push(
      context,
      extra: notification,
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<GetNotificationsCubit>(),
      child: Builder(
        builder: (context) {
          final cubit = context.read<GetNotificationsCubit>();
          final pagingController = cubit.paginationController.pagingController;

          return Scaffold(
            appBar: CommonAppBar(
              title: Text(
                context.l10n.notificationsTitle,
                style: context.headline16(
                  fontWeight: FontWeight.w700,
                  color: context.themeService.commonTextColor,
                ),
              ),
            ),
            body: RefreshIndicator(
              onRefresh: () async {
                cubit.refresh();
              },
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.md22,
                  vertical: AppSpacing.md12,
                ),
                child: ValueListenableBuilder<PagingState<int, NotificationItem>>(
                  valueListenable: pagingController,
                  builder: (context, state, _) => PagedListView<int, NotificationItem>(
                    state: state,
                    fetchNextPage: pagingController.fetchNextPage,
                    builderDelegate: CommonPagedChildBuilderDelegate<NotificationItem>(
                      itemBuilder: (context, item, index) => NotificationCard(
                        notification: item,
                        onTap: () => _onTapNotification(context, item),
                      ),
                      shimmer: const NotificationsListShimmer(),
                      noItemsTitle: context.l10n.noNotificationsYet,
                      noItemsIcon: Icons.notifications_off_outlined,
                      firstPageErrorMessage: pagingController.error?.toString(),
                      onRetry: pagingController.refresh,
                    ),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
