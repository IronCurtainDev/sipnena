import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A reusable error state widget with an optional retry button.
class CommonErrorState extends StatelessWidget {
  const CommonErrorState({
    required this.message,
    super.key,
    this.title,
    this.icon = Icons.error_outline,
    this.retryLabel,
    this.onRetry,
  });

  /// The error message / details to display.
  final String message;

  /// An optional title for the error state.
  final String? title;

  /// An optional icon to display above the message.
  final IconData? icon;

  /// Label for the retry button (defaults to 'Retry' if onRetry is provided).
  final String? retryLabel;

  /// Callback when the retry button is pressed.
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: AppSpacing.allLg24,
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[
              Icon(
                icon,
                size: 64,
                color: context.themeService.coralColor.withValues(alpha: 0.8),
              ),
              Gap.medium16,
            ],
            if (title != null) ...[
              Text(
                title!,
                style: context.headline20(
                  color: context.themeService.commonTextColor,
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.center,
              ),
              Gap.small8,
            ],
            Text(
              message,
              style: context.bodyRegular16(
                color: context.themeService.hintTextColor,
              ),
              textAlign: TextAlign.center,
            ),
            if (onRetry != null) ...[
              Gap.medium16,
              CommonButton.outline(
                label: retryLabel ?? 'Retry',
                onPressed: onRetry,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
