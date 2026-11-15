import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A common empty state widget to be used throughout the app when there is no data to display.
class CommonEmptyState extends StatelessWidget {
  const CommonEmptyState({
    required this.title,
    super.key,
    this.subtitle,
    this.icon,
    this.illustration,
    this.actionLabel,
    this.onActionPressed,
    this.padding,
    this.iconSize = 34,
  });

  /// The main title of the empty state.
  final String title;

  /// An optional subtitle providing more context.
  final String? subtitle;

  /// An optional icon to display above the text.
  final IconData? icon;

  /// An optional custom illustration widget to display above the text.
  final Widget? illustration;

  /// An optional label for an action button.
  final String? actionLabel;

  /// Callback when the action button is pressed.
  final VoidCallback? onActionPressed;

  /// Optional padding around the empty state content.
  final EdgeInsetsGeometry? padding;

  /// The size of the icon. Defaults to 34.
  final double iconSize;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding ?? AppSpacing.allLg24,
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (illustration != null) ...[
              illustration!,
              Gap.large24,
            ] else if (icon != null) ...[
              Icon(
                icon,
                size: iconSize,
                color: context.colorScheme.onSurface.withValues(alpha: 0.5),
              ),
              Gap.large24,
            ],
            Text(
              title,
              style: context.buttonRegular16(color: context.themeService.hintTextColor),
              textAlign: TextAlign.center,
            ),
            if (subtitle != null) ...[
              Gap.small8,
              Text(
                subtitle!,
                style: context.bodyRegular16(
                  color: context.colorScheme.onSurface.withValues(alpha: 0.7),
                ),
                textAlign: TextAlign.center,
              ),
            ],
            if (actionLabel != null && onActionPressed != null) ...[
              Gap.large24,
              CommonButton.primary(
                label: actionLabel,
                onPressed: onActionPressed,
              ),
            ],
          ],
        ),
      ),
    );
  }
}

/// A common "No items found" indicator widget for lists, search results, and paginated views.
class CommonNoItemsFound extends StatelessWidget {
  const CommonNoItemsFound({
    required this.title,
    super.key,
    this.subtitle,
    this.icon = Icons.search_off_rounded,
    this.illustration,
    this.actionLabel,
    this.onActionPressed,
    this.padding,
    this.iconSize = 40,
  });

  /// The title text, e.g. "No bookings found".
  final String title;

  /// Optional subtitle providing additional guidance or explanation.
  final String? subtitle;

  /// Optional icon, defaults to [Icons.search_off_rounded]. Set to null if using [illustration].
  final IconData? icon;

  /// Optional custom illustration widget to display above the text.
  final Widget? illustration;

  /// Optional action button label.
  final String? actionLabel;

  /// Optional action button callback.
  final VoidCallback? onActionPressed;

  /// Custom padding around the content. Defaults to [AppSpacing.allLg24].
  final EdgeInsetsGeometry? padding;

  /// Size of the icon. Defaults to 40.
  final double iconSize;

  @override
  Widget build(BuildContext context) {
    return CommonEmptyState(
      title: title,
      subtitle: subtitle,
      icon: icon,
      illustration: illustration,
      actionLabel: actionLabel,
      onActionPressed: onActionPressed,
      padding: padding,
      iconSize: iconSize,
    );
  }
}
