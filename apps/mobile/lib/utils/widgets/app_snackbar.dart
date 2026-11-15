// ignore_for_file: unnecessary_breaks

import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/app/theme/app_theme_extension.dart';

enum AppSnackBarType {
  success,
  error,
  warning,
  info,
}

class AppSnackBar {
  AppSnackBar._();

  static void success(
    BuildContext context, {
    required String message,
  }) {
    _show(
      context,
      message: message,
      type: AppSnackBarType.success,
    );
  }

  static void error(
    BuildContext context, {
    required String message,
  }) {
    _show(
      context,
      message: message,
      type: AppSnackBarType.error,
    );
  }

  static void warning(
    BuildContext context, {
    required String message,
  }) {
    _show(
      context,
      message: message,
      type: AppSnackBarType.warning,
    );
  }

  static void info(
    BuildContext context, {
    required String message,
  }) {
    _show(
      context,
      message: message,
      type: AppSnackBarType.info,
    );
  }

  static void _show(
    BuildContext context, {
    required String message,
    required AppSnackBarType type,
  }) {
    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(
        SnackBar(
          behavior: SnackBarBehavior.floating,
          elevation: 0,
          backgroundColor: Colors.transparent,
          duration: const Duration(seconds: 3),
          margin: const EdgeInsets.all(16),
          content: _SnackBarContent(
            message: message,
            type: type,
          ),
        ),
      );
  }
}

class _SnackBarContent extends StatelessWidget {
  const _SnackBarContent({
    required this.message,
    required this.type,
  });

  final String message;
  final AppSnackBarType type;

  @override
  Widget build(BuildContext context) {
    late final Color background;
    late final Color iconColor;
    late final IconData icon;

    switch (type) {
      case AppSnackBarType.success:
        background = context.themeService.successColor;
        iconColor = Colors.white;
        icon = Icons.check_circle_rounded;
        break;

      case AppSnackBarType.error:
        background = context.colorScheme.error;
        iconColor = Colors.white;
        icon = Icons.cancel_rounded;
        break;

      case AppSnackBarType.warning:
        background = context.themeService.warningColor;
        iconColor = Colors.white;
        icon = Icons.warning_amber_rounded;
        break;

      case AppSnackBarType.info:
        background = const Color(0xFF2563EB);
        iconColor = Colors.white;
        icon = Icons.info_rounded;
        break;
    }

    return Material(
      color: background,
      borderRadius: BorderRadius.circular(16),
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 18,
          vertical: 14,
        ),
        child: Row(
          children: [
            Icon(
              icon,
              color: iconColor,
              size: 26,
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Text(
                message,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                  fontSize: 15,
                  height: 1.3,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
