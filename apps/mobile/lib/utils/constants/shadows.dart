import 'package:flutter/widgets.dart';

/// App-wide shadow constants for consistent elevation and depth.
class AppShadows {
  AppShadows._();

  /// Standard card shadow used for floating containers like search bars.
  /// Allows optional custom colors while defaulting to standard shadow tones.
  static List<BoxShadow> cardShadow({
    Color? shadow1Color,
    Color? shadow2Color,
  }) =>
      [
        BoxShadow(
          color: shadow1Color ?? const Color.fromRGBO(151, 151, 151, 0.4),
          spreadRadius: 0.2,
        ),
        BoxShadow(
          color: shadow2Color ?? const Color.fromRGBO(0, 0, 0, 0.12),
          blurRadius: 10,
          spreadRadius: -4,
          offset: const Offset(0, 8),
        ),
      ];

  /// Shadow for bottom sheets and top-projecting panels.
  /// Provides standard top-lift shadow with optional custom color override.
  static List<BoxShadow> topSheetShadow({
    Color? color,
  }) =>
      [
        BoxShadow(
          color: color ?? const Color.fromRGBO(0, 0, 0, 0.25),
          blurRadius: 15,
          spreadRadius: 2,
          offset: const Offset(0, -5),
        ),
      ];
}
