import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/features/notifications/notification_core/notifications_core.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class NotificationCard extends StatelessWidget {
  const NotificationCard({
    required this.notification,
    this.onTap,
    super.key,
  });

  final NotificationItem notification;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final isUnread = !notification.isRead;

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.only(bottom: AppSpacing.md12),
        padding: AppSpacing.allMd16,
        decoration: BoxDecoration(
          color: context.colorScheme.surface,
          borderRadius: AppRadius.large16,
          border: Border.all(
            color: context.colorScheme.outline.withValues(alpha: 0.25),
          ),
          boxShadow: [
            BoxShadow(
              color: context.colorScheme.shadow.withValues(alpha: 0.04),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    notification.title,
                    style: context.headline16(
                      fontWeight: isUnread ? FontWeight.w700 : FontWeight.w600,
                      color: context.colorScheme.onSurface,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                Gap.small8,
                Text(
                  notification.displayTime,
                  style: context.bodyXSmall12(
                    color: context.themeService.hintTextColor,
                  ),
                  maxLines: 1,
                ),
              ],
            ),
            Gap.small8,
            Text(
              notification.message,
              style: context.bodyRegular14(
                color: context.colorScheme.onSurface.withValues(alpha: 0.75),
                height: 1.4,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}
