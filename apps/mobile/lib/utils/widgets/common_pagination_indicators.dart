import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A reusable loading indicator displayed at the bottom of a paginated list
/// when fetching the next page.
class CommonNewPageProgressIndicator extends StatelessWidget {
  const CommonNewPageProgressIndicator({
    super.key,
    this.padding = AppSpacing.allMd16,
  });

  /// The padding around the circular loader. Defaults to [AppSpacing.allMd16].
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: padding,
        child: const CommonCircularLoader(),
      ),
    );
  }
}

/// A compact retry indicator displayed at the bottom of a paginated list
/// when fetching the next page encounters an error.
class CommonNewPageErrorIndicator extends StatelessWidget {
  const CommonNewPageErrorIndicator({
    super.key,
    this.onRetry,
    this.message,
    this.padding = AppSpacing.allMd16,
  });

  /// Callback to retry fetching the failed page.
  final VoidCallback? onRetry;

  /// Optional custom error message.
  final String? message;

  /// The padding around the error indicator. Defaults to [AppSpacing.allMd16].
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: padding,
        child: InkWell(
          borderRadius: AppRadius.small8,
          onTap: onRetry,
          child: Padding(
            padding: AppSpacing.allSm8,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  Icons.refresh_rounded,
                  size: 18,
                  color: context.colorScheme.error,
                ),
                Gap.small8,
                Text(
                  message ?? context.l10n.genericError,
                  style: context.bodyMedium14(color: context.colorScheme.error),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
