import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Provides [ThemeData] builders for light and dark themes with a modern White & Teal aesthetic.
///
/// **Important**: Don't make colors public.
/// Always access through [Theme] using [BuildContext] (e.g. `context.colorScheme.primary`).
class ThemeService {
  ThemeService({required this.isDark});

  final bool isDark;

  // ─────────────────────────────────────────────────────────────────────
  // TEAL BRAND PALETTE
  // ─────────────────────────────────────────────────────────────────────
  static const Color _tealPrimary = Color(0xFF0D9488); // Teal 600
  static const Color _tealPrimaryLight = Color(0xFF14B8A6); // Teal 500
  static const Color _tealPrimaryDark = Color(0xFF2DD4BF); // Teal 400 (vibrant for dark mode)
  static const Color _tealSecondaryLight = Color(0xFFCCFBF1); // Teal 100
  static const Color _tealSecondaryDark = Color(0xFF134E4A); // Teal 900
  static const Color _tealTertiaryLight = Color(0xFF0F766E); // Teal 700
  static const Color _tealTertiaryDark = Color(0xFF5EEAD4); // Teal 300

  // ─────────────────────────────────────────────────────────────────────
  // SURFACE & BACKGROUND
  // ─────────────────────────────────────────────────────────────────────
  static const Color _lightBgColor = Color(0xFFFFFFFF);
  static const Color _lightSurfaceColor = Color(0xFFFFFFFF);
  static const Color _lightSurfaceContainer = Color(0xFFF0FDFA); // Subtle teal-tinted white

  static const Color _darkBgColor = Color(0xFF0B171B); // Deep teal-charcoal background
  static const Color _darkSurfaceColor = Color(0xFF132A2E); // Elevated dark surface
  static const Color _darkSurfaceContainer = Color(0xFF173338);

  // ─────────────────────────────────────────────────────────────────────
  // TEXT & CONTENT
  // ─────────────────────────────────────────────────────────────────────
  static const Color _lightTextColor = Color(0xFF0F172A); // Slate 900
  static const Color _darkTextColor = Color(0xFFF0FDFA); // Minty off-white
  static const Color _lightMutedTextColor = Color(0xFF64748B); // Slate 500
  static const Color _darkMutedTextColor = Color(0xFF94A3B8); // Slate 400

  // ─────────────────────────────────────────────────────────────────────
  // SEMANTIC & SYSTEM COLORS
  // ─────────────────────────────────────────────────────────────────────
  static const Color _errorColor = Color(0xFFEF4444);
  static const Color _errorDarkColor = Color(0xFFF87171);
  static const Color _successColor = Color(0xFF10B981);
  static const Color _warningColor = Color(0xFFF59E0B);
  static const Color _infoColor = Color(0xFF0284C7);

  // Borders & Outlines
  static const Color _lightOutline = Color(0xFFCBD5E1);
  static const Color _darkOutline = Color(0xFF26464A);

  // ─────────────────────────────────────────────────────────────────────
  // PUBLIC GETTERS FOR EXTENSIONS
  // ─────────────────────────────────────────────────────────────────────
  Color get commonTextColor => isDark ? _darkTextColor : _lightTextColor;
  Color get whiteColor => isDark ? _darkSurfaceColor : Colors.white;
  Color get blackColor => isDark ? _darkTextColor : _lightTextColor;
  Color get commonButtonColor => isDark ? const Color(0xFF1E3A3E) : const Color(0xFFE2E8F0);
  Color get hintTextColor => isDark ? _darkMutedTextColor : _lightMutedTextColor;
  Color get transparent => Colors.transparent;

  Color get shimmersColor => isDark ? const Color(0xFF1A353A) : const Color(0xFFE0F2F1);
  Color get shimmersBgColor => isDark ? _darkBgColor : _lightSurfaceContainer;
  Color get successColor => _successColor;
  Color get successLightBgColor => isDark ? const Color(0xFF064E3B) : const Color(0xFFECFDF5);
  Color get successBorderColor => isDark ? const Color(0xFF047857) : const Color(0xFFA7F3D0);
  Color get warningColor => _warningColor;
  Color get warningLightBgColor => isDark ? const Color(0xFF78350F) : const Color(0xFFFFFBEB);
  Color get warningBorderColor => isDark ? const Color(0xFFB45309) : const Color(0xFFFDE68A);
  Color get coralColor => _errorColor;
  Color get coralLightColor => isDark ? const Color(0xFF7F1D1D) : const Color(0xFFFEF2F2);
  Color get coralBorderColor => isDark ? const Color(0xFFB91C1C) : const Color(0xFFFECACA);
  Color get infoColor => _infoColor;
  Color get infoLightBgColor => isDark ? const Color(0xFF0C4A6E) : const Color(0xFFF0F9FF);
  Color get cardBorderColor => isDark ? _darkOutline : _lightOutline;
  Color get chipBorderColor => isDark ? _darkOutline : _lightOutline;
  Color get containerBgColor => isDark ? _darkSurfaceColor : _lightSurfaceContainer;
  Color get containerBorderColor => isDark ? _darkOutline : const Color(0xFFCCFBF1);

  // ─────────────────────────────────────────────────────────────────────
  // LIGHT THEME DATA
  // ─────────────────────────────────────────────────────────────────────
  ThemeData lightThemeData() {
    return ThemeData(
      brightness: Brightness.light,
      scaffoldBackgroundColor: _lightBgColor,
      colorScheme: ColorScheme.fromSeed(
        seedColor: _tealPrimary,
        primary: _tealPrimary,
        onPrimary: Colors.white,
        primaryContainer: _tealSecondaryLight,
        onPrimaryContainer: _tealTertiaryLight,
        secondary: _tealPrimaryLight,
        onSecondary: Colors.white,
        secondaryContainer: const Color(0xFFE6FFFA),
        onSecondaryContainer: _tealTertiaryLight,
        tertiary: _tealTertiaryLight,
        onTertiary: Colors.white,
        surface: _lightSurfaceColor,
        onSurface: _lightTextColor,
        surfaceContainer: _lightSurfaceContainer,
        shadow: const Color(0x0D000000),
        outline: _lightOutline,
        error: _errorColor,
      ),
      textTheme: AppTypography.textTheme(_lightTextColor),
      fontFamily: AppTypography.fontFamily,
      elevatedButtonTheme: _elevatedButtonThemeData(),
      outlinedButtonTheme: _outlinedButtonThemeData(),
      textButtonTheme: _textButtonThemeData(),
      inputDecorationTheme: _inputDecorationTheme(),
      appBarTheme: _appBarTheme(),
      iconTheme: _iconThemeData(),
      bottomNavigationBarTheme: _bottomNavigationBarThemeData(),
      tabBarTheme: const TabBarThemeData(
        labelColor: _tealPrimary,
        unselectedLabelColor: _lightMutedTextColor,
        indicatorColor: _tealPrimary,
      ),
    );
  }

  // ─────────────────────────────────────────────────────────────────────
  // DARK THEME DATA
  // ─────────────────────────────────────────────────────────────────────
  ThemeData darkThemeData() {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: _darkBgColor,
      colorScheme: ColorScheme.fromSeed(
        brightness: Brightness.dark,
        seedColor: _tealPrimaryDark,
        primary: _tealPrimaryDark,
        onPrimary: const Color(0xFF042F2E),
        primaryContainer: _tealSecondaryDark,
        onPrimaryContainer: _tealSecondaryLight,
        secondary: _tealPrimaryLight,
        onSecondary: const Color(0xFF042F2E),
        secondaryContainer: const Color(0xFF115E59),
        onSecondaryContainer: const Color(0xFFE6FFFA),
        tertiary: _tealTertiaryDark,
        onTertiary: const Color(0xFF042F2E),
        surface: _darkSurfaceColor,
        onSurface: _darkTextColor,
        surfaceContainer: _darkSurfaceContainer,
        shadow: const Color(0x33000000),
        outline: _darkOutline,
        error: _errorDarkColor,
      ),
      textTheme: AppTypography.textTheme(_darkTextColor),
      fontFamily: AppTypography.fontFamily,
      elevatedButtonTheme: _elevatedButtonThemeData(),
      outlinedButtonTheme: _outlinedButtonThemeData(),
      textButtonTheme: _textButtonThemeData(),
      inputDecorationTheme: _inputDecorationTheme(),
      appBarTheme: _appBarTheme(),
      iconTheme: _iconThemeData(),
      bottomNavigationBarTheme: _bottomNavigationBarThemeData(),
      tabBarTheme: const TabBarThemeData(
        labelColor: _tealPrimaryDark,
        unselectedLabelColor: _darkMutedTextColor,
        indicatorColor: _tealPrimaryDark,
      ),
    );
  }

  ElevatedButtonThemeData _elevatedButtonThemeData() {
    final bgColor = isDark ? _tealPrimaryDark : _tealPrimary;
    final fgColor = isDark ? const Color(0xFF042F2E) : Colors.white;

    return ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        foregroundColor: fgColor,
        backgroundColor: bgColor,
        elevation: 0,
        textStyle: platypi(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: fgColor,
        ),
        padding: const EdgeInsets.symmetric(
          vertical: 16,
          horizontal: 24,
        ),
        shape: const RoundedRectangleBorder(
          borderRadius: AppRadius.large16,
        ),
        minimumSize: const Size(double.infinity, 48),
      ),
    );
  }

  OutlinedButtonThemeData _outlinedButtonThemeData() {
    final primary = isDark ? _tealPrimaryDark : _tealPrimary;

    return OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: primary,
        backgroundColor: isDark ? _darkSurfaceColor : Colors.white,
        elevation: 0,
        side: BorderSide(color: primary, width: 1.5),
        textStyle: platypi(
          fontSize: 16,
          fontWeight: FontWeight.w700,
          color: primary,
        ),
        padding: const EdgeInsets.symmetric(
          vertical: 16,
          horizontal: 24,
        ),
        shape: const RoundedRectangleBorder(
          borderRadius: AppRadius.large16,
        ),
        minimumSize: const Size(double.infinity, 48),
      ),
    );
  }

  TextButtonThemeData _textButtonThemeData() {
    final primary = isDark ? _tealPrimaryDark : _tealPrimary;

    return TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: primary,
        elevation: 0,
        textStyle: platypi(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: primary,
        ),
        padding: const EdgeInsets.symmetric(
          vertical: 8,
          horizontal: 12,
        ),
        shape: const RoundedRectangleBorder(
          borderRadius: AppRadius.medium12,
        ),
        maximumSize: const Size(double.infinity, 48),
      ),
    );
  }

  InputDecorationTheme _inputDecorationTheme() {
    final outline = isDark ? _darkOutline : _lightOutline;
    final activeTeal = isDark ? _tealPrimaryDark : _tealPrimary;
    final fill = isDark ? _darkSurfaceColor : _lightSurfaceContainer;
    final hint = isDark ? _darkMutedTextColor : _lightMutedTextColor;

    return InputDecorationTheme(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide(color: outline),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide(color: outline),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide(color: activeTeal, width: 1.5),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: _errorColor),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: _errorColor, width: 1.5),
      ),
      contentPadding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      disabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide(color: outline.withValues(alpha: 0.5)),
      ),
      filled: true,
      fillColor: fill,
      hintStyle: platypi(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        height: 1.286,
        color: hint,
      ),
      labelStyle: platypi(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: hint,
      ),
      floatingLabelBehavior: FloatingLabelBehavior.never,
    );
  }

  AppBarTheme _appBarTheme() {
    final fg = isDark ? _darkTextColor : _lightTextColor;
    final bg = isDark ? _darkBgColor : Colors.white;

    return AppBarTheme(
      foregroundColor: fg,
      backgroundColor: bg,
      centerTitle: true,
      elevation: 0,
      scrolledUnderElevation: 0,
      iconTheme: IconThemeData(color: fg),
      titleTextStyle: platypi(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        color: fg,
      ),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          bottom: Radius.circular(16),
        ),
      ),
    );
  }

  IconThemeData _iconThemeData() {
    return IconThemeData(
      color: isDark ? _darkTextColor : _lightTextColor,
    );
  }

  BottomNavigationBarThemeData _bottomNavigationBarThemeData() {
    return BottomNavigationBarThemeData(
      backgroundColor: isDark ? _darkSurfaceColor : Colors.white,
      type: BottomNavigationBarType.fixed,
      elevation: 8,
      selectedItemColor: isDark ? _tealPrimaryDark : _tealPrimary,
      unselectedItemColor: isDark ? _darkMutedTextColor : _lightMutedTextColor,
      showUnselectedLabels: true,
    );
  }

  static void setSystemUIOverlayStyle({bool isDark = false}) {
    if (isDark) {
      SystemChrome.setSystemUIOverlayStyle(
        const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.light,
          systemNavigationBarColor: _darkBgColor,
          systemNavigationBarIconBrightness: Brightness.light,
        ),
      );
    } else {
      SystemChrome.setSystemUIOverlayStyle(
        const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.dark,
          systemNavigationBarColor: Colors.white,
          systemNavigationBarIconBrightness: Brightness.dark,
        ),
      );
    }
  }
}
