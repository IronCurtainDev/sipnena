import 'package:flutter/widgets.dart';

/// App-wide static color constants for elements outside the widget tree
/// (such as static Canvas bitmap painters, native overlays, or raw shaders).
///
/// **Note**: Whenever [BuildContext] is available in UI widgets, prefer
/// `context.colorScheme` or `context.themeService` instead of raw constants.
class AppColors {
  AppColors._();

  // ─────────────────────────────────────────────────────────────────────
  // MAP MARKER / CANVAS BITMAP PALETTE
  // ─────────────────────────────────────────────────────────────────────

  /// Dark slate color used for map pin backgrounds and ETA text.
  static const Color mapMarkerDark = Color(0xFF2A2D35);

  /// Translucent soft halo color surrounding map markers (~0.28 alpha).
  static const Color mapMarkerHalo = Color(0x472A2D35);

  /// Ambient shadow layer 1 for map marker pins.
  static const Color mapMarkerShadow1 = Color(0x26000000);

  /// Ambient shadow layer 2 for map marker pins.
  static const Color mapMarkerShadow2 = Color(0x1F000000);

  /// Semi-transparent neutral divider/border tint for map overlays.
  static const Color mapOverlayBorder = Color(0x0F000000);
}
