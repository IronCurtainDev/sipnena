import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/l10n/gen/app_localizations.dart';
import 'package:react_hono_flutter_template/utils/extensions/extensions.dart';

/// A utility class for showing platform-adaptive common dialogs.
///
/// Uses [AlertDialog.adaptive] and [showAdaptiveDialog] to present
/// native Cupertino dialogs on iOS/macOS and Material dialogs on Android.
///
/// ## Usage
/// ```dart
/// // Confirmation dialog
/// final confirmed = await CommonDialog.confirm(
///   context,
///   title: 'Delete Item',
///   message: 'Are you sure you want to delete this item?',
/// );
///
/// // Alert dialog
/// await CommonDialog.alert(
///   context,
///   title: 'Error',
///   message: 'Something went wrong.',
/// );
/// ```
class CommonDialog {
  CommonDialog._();

  /// Shows a confirmation dialog with Yes/No buttons.
  ///
  /// Returns `true` if confirmed, `false` if cancelled.
  /// Adapts to the platform (Cupertino on iOS/macOS, Material on Android).
  static Future<bool> confirm(
    BuildContext context, {
    required String title,
    required String message,
    String? confirmText,
    String? cancelText,
    bool isDangerous = false,
    Color? confirmColor,
    Color? cancelColor,
    TextAlign textAlign = TextAlign.center,
    CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center,
  }) async {
    final isCupertino = Theme.of(context).platform == TargetPlatform.iOS || Theme.of(context).platform == TargetPlatform.macOS;

    final result = await showAdaptiveDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (dialogContext) => AlertDialog.adaptive(
        title: Text(title, textAlign: textAlign),
        content: Text(message, textAlign: textAlign),
        actions: isCupertino
            ? [
                CupertinoDialogAction(
                  onPressed: () => Navigator.of(dialogContext).pop(false),
                  child: Text(
                    cancelText ?? AppLocalizations.of(dialogContext)!.no,
                    style: cancelColor != null ? TextStyle(color: cancelColor) : null,
                  ),
                ),
                CupertinoDialogAction(
                  isDestructiveAction: isDangerous,
                  isDefaultAction: true,
                  onPressed: () => Navigator.of(dialogContext).pop(true),
                  child: Text(
                    confirmText ?? AppLocalizations.of(dialogContext)!.yes,
                    style: (!isDangerous && confirmColor != null) ? TextStyle(color: confirmColor) : null,
                  ),
                ),
              ]
            : [
                TextButton(
                  onPressed: () => Navigator.of(dialogContext).pop(false),
                  style: cancelColor != null ? TextButton.styleFrom(foregroundColor: cancelColor) : null,
                  child: Text(cancelText ?? AppLocalizations.of(dialogContext)!.no),
                ),
                TextButton(
                  onPressed: () => Navigator.of(dialogContext).pop(true),
                  style: TextButton.styleFrom(
                    foregroundColor: isDangerous ? dialogContext.colorScheme.error : (confirmColor ?? dialogContext.colorScheme.primary),
                  ),
                  child: Text(confirmText ?? dialogContext.l10n.yes),
                ),
              ],
      ),
    );
    return result ?? false;
  }

  /// Shows a simple alert dialog with an OK button.
  ///
  /// The dialog is not dismissible by tapping outside - user must tap the button.
  /// Colors automatically adapt to the current theme (light/dark mode) and platform.
  static Future<void> alert(
    BuildContext context, {
    required String title,
    required String message,
    String? buttonText,
    Color? buttonColor,
    VoidCallback? onConfirm,
    bool alignContentWithButton = false,
  }) async {
    final isCupertino = Theme.of(context).platform == TargetPlatform.iOS || Theme.of(context).platform == TargetPlatform.macOS;

    await showAdaptiveDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (dialogContext) => AlertDialog.adaptive(
        title: Text(title),
        content: Text(message),
        actions: isCupertino
            ? [
                CupertinoDialogAction(
                  isDefaultAction: true,
                  onPressed: () {
                    Navigator.of(dialogContext).pop();
                    onConfirm?.call();
                  },
                  child: Text(
                    buttonText ?? AppLocalizations.of(dialogContext)!.ok,
                    style: buttonColor != null ? TextStyle(color: buttonColor) : null,
                  ),
                ),
              ]
            : [
                TextButton(
                  onPressed: () {
                    Navigator.of(dialogContext).pop();
                    onConfirm?.call();
                  },
                  style: buttonColor != null ? TextButton.styleFrom(foregroundColor: buttonColor) : null,
                  child: Text(buttonText ?? AppLocalizations.of(dialogContext)!.ok),
                ),
              ],
      ),
    );
  }
}
