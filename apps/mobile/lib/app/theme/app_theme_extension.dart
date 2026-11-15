import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/app/theme/theme.dart';

/// Extension on [BuildContext] for easy access to theme properties.
///
/// This follows Flutter industry best practices by providing concise
/// access to [ThemeData], [TextTheme], and [ColorScheme].
///
/// ## Text Style Usage
/// ```dart
/// Instead of:
/// Text('Hello', style: Theme.of(context).textTheme.bodyMedium)
///
/// You can write:
/// Text('Hello', style: context.bodyMedium14())
///
/// With overrides:
/// Text('Hello', style: context.bodyMedium14(
///   color: context.colorScheme.error,
///   fontWeight: FontWeight.bold,
/// ))
/// ```
///
/// ## Color Usage
/// ```dart
/// color: Theme.of(context).colorScheme.primary
///
/// You can write:
/// color: context.colorScheme.primary
/// ```
///
/// ## Theme-Aware
/// All styles automatically update when the theme changes (light/dark mode).
extension ThemeExtension on BuildContext {
  // ─────────────────────────────────────────────────────────────────────
  // THEME ACCESS
  // ─────────────────────────────────────────────────────────────────────

  /// Access to the current [ThemeData].
  ThemeData get theme => Theme.of(this);

  /// Access to the current [TextTheme].
  TextTheme get textTheme => theme.textTheme;

  /// Access to the current [ColorScheme].
  ColorScheme get colorScheme => theme.colorScheme;

  /// Access to the [ThemeService] from the nearest [ThemeCubit].
  /// This will rebuild the widget when the theme changes if called inside build(),
  /// and safely falls back to [read] if accessed from callbacks or listeners.
  ThemeService get themeService {
    try {
      return watch<ThemeCubit>().themeService;
    } catch (_) {
      return read<ThemeCubit>().themeService;
    }
  }

  // ─────────────────────────────────────────────────────────────────────
  // SCREEN SIZE
  // ─────────────────────────────────────────────────────────────────────

  /// Screen size from MediaQuery.
  Size get screenSize => MediaQuery.sizeOf(this);

  /// Screen width.
  double get screenWidth => screenSize.width;

  /// Screen height.
  double get screenHeight => screenSize.height;

  /// Screen padding (safe area insets).
  EdgeInsets get screenPadding => MediaQuery.paddingOf(this);

  /// Screen view insets (e.g. keyboard).
  EdgeInsets get screenViewInsets => MediaQuery.viewInsetsOf(this);

  /// Whether the device is in landscape mode.
  bool get isLandscape => screenWidth > screenHeight;

  /// Whether the device is in portrait mode.
  bool get isPortrait => screenHeight > screenWidth;
}
