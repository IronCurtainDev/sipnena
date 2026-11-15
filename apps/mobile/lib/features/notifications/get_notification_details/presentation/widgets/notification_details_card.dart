import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class NotificationDetailsCard extends StatelessWidget {
  const NotificationDetailsCard({
    required this.title,
    required this.time,
    required this.message,
    super.key,
  });

  final String title;
  final String time;
  final String message;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg24,
        vertical: AppSpacing.md22,
      ),
      child: Container(
        width: double.infinity,
        padding: AppSpacing.allLg24,
        decoration: BoxDecoration(
          color: context.colorScheme.surface,
          borderRadius: AppRadius.extraLarge24,
          border: Border.all(
            color: context.colorScheme.outline.withValues(alpha: 0.15),
          ),
          boxShadow: [
            BoxShadow(
              color: context.colorScheme.shadow.withValues(alpha: 0.04),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: context.headline16(
                fontWeight: FontWeight.w700,
                color: context.themeService.commonTextColor,
              ),
            ),
            Gap.small8,
            Text(
              time,
              style: context.bodyXSmall12(
                color: context.themeService.hintTextColor,
              ),
            ),
            Gap.medium16,
            Text(
              message,
              style: context.bodyRegular16(
                color: context.themeService.blackColor.withAlpha(178),
                height: 1.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
