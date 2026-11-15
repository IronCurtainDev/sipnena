import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/core/di/injection_container.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notification_details/presentation/bloc/notification_details_cubit.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notification_details/presentation/bloc/notification_details_state.dart';
import 'package:react_hono_flutter_template/features/notifications/get_notification_details/presentation/widgets/widgets.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/notifications_core.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class NotificationDetailsPage extends StatelessWidget {
  const NotificationDetailsPage({
    this.uuid,
    this.initialNotification,
    this.title,
    this.time,
    this.description,
    super.key,
  });

  final String? uuid;
  final NotificationItem? initialNotification;
  final String? title;
  final String? time;
  final String? description;

  String get _effectiveUuid => uuid ?? initialNotification?.uuid ?? '';

  Future<void> _onDeleteTap(BuildContext context) async {
    final confirmed = await CommonDialog.confirm(
      context,
      title: context.l10n.deleteNotification,
      message: context.l10n.deleteNotificationConfirmMessage,
      isDangerous: true,
      confirmText: context.l10n.deleteAction,
    );

    if (confirmed && context.mounted) {
      final targetUuid = _effectiveUuid;
      if (targetUuid.isNotEmpty) {
        await context.read<NotificationDetailsCubit>().deleteNotification(targetUuid);
      } else {
        context.pop();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<NotificationDetailsCubit>()
        ..loadNotification(
          _effectiveUuid,
          initialItem: initialNotification,
        ),
      child: BlocConsumer<NotificationDetailsCubit, NotificationDetailsState>(
        listener: (context, state) {
          if (state is NotificationDetailsDeleteSuccess) {
            context
              ..showSuccessSnackBar(state.message)
              ..pop();
          } else if (state is NotificationDetailsDeleteFailure) {
            context.showErrorSnackBar(state.message);
          }
        },
        builder: (context, state) {
          final isDeleting = state is NotificationDetailsDeleting;

          return Scaffold(
            appBar: CommonAppBar(
              title: Text(
                context.l10n.notificationDetailsTitle,
                style: context.headline16(
                  fontWeight: FontWeight.w700,
                  color: context.themeService.commonTextColor,
                ),
              ),
              actions: [
                GestureDetector(
                  onTap: isDeleting ? null : () => _onDeleteTap(context),
                  child: Image.asset(AppImages.delete, width: 24, height: 24, color: context.themeService.coralColor),
                ).paddingHorizontal16,
              ],
            ),
            body: Builder(
              builder: (context) {
                if (state is NotificationDetailsLoading && initialNotification == null && title == null) {
                  return const Center(child: CommonCircularLoader());
                }

                if (state is NotificationDetailsFailure && initialNotification == null && title == null) {
                  return CommonErrorState(
                    message: state.message,
                    onRetry: () {
                      final targetUuid = _effectiveUuid;
                      if (targetUuid.isNotEmpty) {
                        context.read<NotificationDetailsCubit>().loadNotification(targetUuid);
                      }
                    },
                  );
                }

                final notification = state is NotificationDetailsLoaded ? state.notification : initialNotification;
                final displayTitle = notification?.title ?? title ?? '';
                final displayTime = notification?.displayTime ?? time ?? '';
                final displayMessage = notification?.message ?? description ?? '';

                return NotificationDetailsCard(
                  title: displayTitle,
                  time: displayTime,
                  message: displayMessage,
                );
              },
            ),
          );
        },
      ),
    );
  }
}
