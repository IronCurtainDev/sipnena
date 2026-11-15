import 'dart:math';

import 'package:intl/intl.dart';

/// Core extensions for primitive types and common collections.
///
/// This file contains:
/// 1. [StringExtensions] - Validation and formatting.
/// 2. [ListExtensions] - Safe access.
/// 3. [DateTimeExtensions] - Formatting and comparisons.

// -----------------------------------------------------------------------------
// STRING EXTENSIONS
// -----------------------------------------------------------------------------

extension StringExtensions on String? {
  /// Returns this string if not null, otherwise returns [defaultValue] or empty string.
  ///
  /// Example:
  /// ```dart
  /// String? name;
  /// print(name.orEmpty); // ""
  /// print(name.orEmpty('Guest')); // "Guest"
  /// ```
  String orEmpty([String defaultValue = '']) => this ?? defaultValue;

  /// Returns true if the string is null or empty.
  bool get isNullOrEmpty => this == null || this!.isEmpty;

  /// Returns true if the string is NOT null and NOT empty.
  bool get isNotNullOrEmpty => this != null && this!.isNotEmpty;

  /// Normalizes an image URL by forcing https:// instead of http://.
  /// Returns null if the string is empty or null.
  String? get normalizeImageUrl {
    final trimmed = this?.trim();
    if (trimmed == null || trimmed.isEmpty) {
      return null;
    }
    if (trimmed.startsWith('http://')) {
      return trimmed.replaceFirst('http://', 'https://');
    }
    return trimmed;
  }

  /// Formats an API expiry date (yyyy-MM-dd, dd-MM-yyyy, ISO 8601, etc.) to a display date (dd/MM/yyyy).
  /// Returns the original string if parsing fails or if it's already formatted.
  String get formatExpiryForDisplay {
    final trimmed = this?.trim() ?? '';
    if (trimmed.isEmpty) {
      return '';
    }

    try {
      // Already display format (dd/MM/yyyy)
      if (RegExp(r'^\d{2}/\d{2}/\d{4}$').hasMatch(trimmed)) {
        return trimmed;
      }

      // dd-MM-yyyy format
      if (RegExp(r'^\d{2}-\d{2}-\d{4}$').hasMatch(trimmed)) {
        final parsed = DateFormat('dd-MM-yyyy').parseStrict(trimmed);
        return DateFormat('dd/MM/yyyy').format(parsed);
      }

      // yyyy-MM-dd format
      if (RegExp(r'^\d{4}-\d{2}-\d{2}$').hasMatch(trimmed)) {
        final parsed = DateFormat('yyyy-MM-dd').parseStrict(trimmed);
        return DateFormat('dd/MM/yyyy').format(parsed);
      }

      // yyyy/MM/dd format
      if (RegExp(r'^\d{4}/\d{2}/\d{2}$').hasMatch(trimmed)) {
        final parsed = DateFormat('yyyy/MM/dd').parseStrict(trimmed);
        return DateFormat('dd/MM/yyyy').format(parsed);
      }

      // Single-digit day/month: d/M/yyyy or d-M-yyyy
      if (RegExp(r'^\d{1,2}[/-]\d{1,2}[/-]\d{4}$').hasMatch(trimmed)) {
        final parts = trimmed.split(RegExp('[/-]'));
        if (parts.length == 3) {
          final day = parts[0].padLeft(2, '0');
          final month = parts[1].padLeft(2, '0');
          final year = parts[2];
          return '$day/$month/$year';
        }
      }

      // ISO 8601 or standard datetime string
      final dateTime = DateTime.tryParse(trimmed);
      if (dateTime != null) {
        return DateFormat('dd/MM/yyyy').format(dateTime);
      }
    } catch (_) {
      return trimmed;
    }
    return trimmed;
  }

  /// Parses an expiry date from any common representation (dd/MM/yyyy, dd-MM-yyyy, yyyy-MM-dd, etc.)
  /// to the backend API format (d/m/Y -> dd/MM/yyyy).
  /// Returns null if parsing fails or string is empty.
  String? get toApiExpiryDate {
    final trimmed = this?.trim();
    if (trimmed == null || trimmed.isEmpty) {
      return null;
    }

    try {
      if (RegExp(r'^\d{2}/\d{2}/\d{4}$').hasMatch(trimmed)) {
        final parsed = DateFormat('dd/MM/yyyy').parseStrict(trimmed);
        return DateFormat('dd/MM/yyyy').format(parsed);
      }

      if (RegExp(r'^\d{2}-\d{2}-\d{4}$').hasMatch(trimmed)) {
        final parsed = DateFormat('dd-MM-yyyy').parseStrict(trimmed);
        return DateFormat('dd/MM/yyyy').format(parsed);
      }

      // Single-digit day/month: d/M/yyyy or d-M-yyyy
      if (RegExp(r'^\d{1,2}[/-]\d{1,2}[/-]\d{4}$').hasMatch(trimmed)) {
        final parts = trimmed.split(RegExp('[/-]'));
        if (parts.length == 3) {
          final day = parts[0].padLeft(2, '0');
          final month = parts[1].padLeft(2, '0');
          final year = parts[2];
          return '$day/$month/$year';
        }
      }

      final dateTime = DateTime.tryParse(trimmed);
      if (dateTime != null) {
        return DateFormat('dd/MM/yyyy').format(dateTime);
      }

      final parsed = DateFormat('dd/MM/yyyy').parse(trimmed);
      return DateFormat('dd/MM/yyyy').format(parsed);
    } catch (_) {
      return null;
    }
  }

  /// Formats a currency string (e.g. "AUD 25.00" or "25.00") to display format ("$25.00").
  /// Returns empty string if null or empty.
  String get toDisplayCurrency {
    final trimmed = this?.trim() ?? '';
    if (trimmed.isEmpty) return '';
    if (trimmed.startsWith('AUD')) {
      return trimmed.replaceFirst('AUD', r'$').replaceAll(RegExp(r'\$\s+'), r'$');
    }
    return trimmed.startsWith(r'$') ? trimmed : '\$$trimmed';
  }
}

extension StringUtils on String {
  /// Returns the string with the first letter capitalized.
  ///
  /// Example:
  /// ```dart
  /// 'hello'.capitalize // 'Hello'
  /// ```
  String get capitalize {
    if (isEmpty) return this;
    return '${this[0].toUpperCase()}${substring(1)}';
  }

  /// Validates if the string is a valid email format.
  ///
  /// Example:
  /// ```dart
  /// 'test@example.com'.isValidEmail // true
  /// 'invalid-email'.isValidEmail // false
  /// ```
  bool get isValidEmail {
    return RegExp(
      r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+",
    ).hasMatch(this);
  }

  /// Checks if string is a valid password.
  ///
  /// Rule: Min 8 characters, at least one letter and one number.
  bool get isValidPassword {
    if (isEmpty) return false;
    final hasLetter = RegExp('[a-zA-Z]').hasMatch(this);
    final hasNumber = RegExp('[0-9]').hasMatch(this);
    return length >= 8 && hasLetter && hasNumber;
  }

  /// Capitalizes the first letter of every word.
  String get toTitleCase {
    if (isEmpty) return this;
    return split(' ').map((word) => word.capitalize).join(' ');
  }

  /// Removes all whitespace from the string.
  String get removeWhitespace => replaceAll(' ', '');

  /// Limits the string to [length] characters and adds "..." if truncated.
  String limit(int length) {
    if (this.length <= length) return this;
    return '${substring(0, length)}...';
  }

  /// Parses string to int, returns 0 if format is invalid.
  int get toInt => int.tryParse(this) ?? 0;

  /// Parses string to double, returns 0.0 if format is invalid.
  double get toDouble => double.tryParse(this) ?? 0.0;

  /// Strips HTML tags and decodes common HTML entities, converting paragraphs
  /// and line breaks into formatted plain text.
  String get stripHtml {
    if (isEmpty) return this;
    return replaceAll(RegExp(r'<br\s*/?>', caseSensitive: false), '\n')
        .replaceAll(
          RegExp('</?(?:p|div|h[1-6])[^>]*>', caseSensitive: false),
          '\n\n',
        )
        .replaceAll(RegExp('<li[^>]*>', caseSensitive: false), '\n• ')
        .replaceAll(RegExp('<[^>]+>'), '')
        .replaceAll('&nbsp;', ' ')
        .replaceAll('&amp;', '&')
        .replaceAll('&quot;', '"')
        .replaceAll('&#39;', "'")
        .replaceAll('&apos;', "'")
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&mdash;', '—')
        .replaceAll('&ndash;', '–')
        .replaceAll(RegExp(r'\n{3,}'), '\n\n')
        .trim();
  }
}

// -----------------------------------------------------------------------------
// LIST EXTENSIONS
// -----------------------------------------------------------------------------

extension ListExtensions<T> on List<T>? {
  /// Safely returns the element at [index] or null if index is out of bounds.
  ///
  /// Example:
  /// ```dart
  /// final list = [1, 2];
  /// list.safeElementAt(0); // 1
  /// list.safeElementAt(5); // null
  /// ```
  T? safeElementAt(int index) {
    if (this == null) return null;
    if (index < 0 || index >= this!.length) return null;
    return this![index];
  }

  /// Returns true if the list is null or empty.
  bool get isNullOrEmpty => this == null || this!.isEmpty;
}

extension IterableExtension<T> on Iterable<T> {
  /// Returns a random element from the list.
  T get random => elementAt(Random().nextInt(length));

  /// Returns the first element matching [test], or null if none found.
  T? firstWhereOrNull(bool Function(T) test) {
    for (final element in this) {
      if (test(element)) return element;
    }
    return null;
  }
}

extension ListSortingExtension<T> on List<T> {
  /// Returns a new list sorted by [selector].
  List<T> sortedBy(Comparable<dynamic> Function(T) selector, {bool descending = false}) {
    final list = List<T>.from(this)
      ..sort((a, b) {
        final aValue = selector(a);
        final bValue = selector(b);
        return descending ? bValue.compareTo(aValue) : aValue.compareTo(bValue);
      });
    return list;
  }
}

extension NumericIterableExtension on Iterable<num> {
  /// Returns the sum of all elements.
  num get sum => fold(0, (a, b) => a + b);

  /// Returns the average of all elements.
  double get average => isEmpty ? 0 : sum / length;
}

// -----------------------------------------------------------------------------
// DATE EXTENSIONS
// -----------------------------------------------------------------------------

extension DateTimeExtensions on DateTime {
  /// Formatting extension using [DateFormat].
  ///
  /// Example:
  /// ```dart
  /// DateTime.now().format('dd MMM yyyy'); // "02 Jan 2026"
  /// ```
  String format(String pattern, {String? locale}) {
    return DateFormat(pattern, locale).format(this);
  }

  /// Returns true if the date is today.
  bool get isToday {
    final now = DateTime.now();
    return year == now.year && month == now.month && day == now.day;
  }

  /// Returns true if the date is yesterday.
  bool get isYesterday {
    final now = DateTime.now();
    final yesterday = now.subtract(const Duration(days: 1));
    return year == yesterday.year && month == yesterday.month && day == yesterday.day;
  }

  /// Formats the date with ordinal suffix (e.g., "1st January 2026").
  ///
  /// The rest of the date uses 'MMMM yyyy' pattern by default.
  String get formatWithSuffix {
    var suffix = 'th';
    if (day == 1 || day == 21 || day == 31) {
      suffix = 'st';
    } else if (day == 2 || day == 22) {
      suffix = 'nd';
    } else if (day == 3 || day == 23) {
      suffix = 'rd';
    }
    return '$day$suffix ${DateFormat('MMMM yyyy').format(this)}';
  }
}

// -----------------------------------------------------------------------------
// DATE STRING EXTENSIONS
// -----------------------------------------------------------------------------

extension DateStringExtensions on String {
  /// Converts a date string to [DateTime].
  ///
  /// Returns null if the string cannot be parsed.
  /// Supports ISO 8601 formats (e.g., "2026-01-06T12:00:00").
  DateTime? get toDateTime => DateTime.tryParse(this);

  /// Formats a date string to a specific [pattern].
  ///
  /// Example:
  /// ```dart
  /// "2026-01-06".formatDate("dd MMM yyyy"); // "06 Jan 2026"
  /// "invalid".formatDate("dd MMM yyyy"); // "invalid"
  /// ```
  ///
  /// Formats date string to given pattern in the user device's local timezone.
  ///
  /// ```dart
  /// "2026-01-06".formatDate("dd MMM yyyy"); // "06 Jan 2026"
  /// "invalid".formatDate("dd MMM yyyy"); // "invalid"
  /// ```
  ///
  /// If parsing fails, returns the original string.
  String formatDate(String pattern, {String? locale}) {
    final trimmed = trim();
    if (trimmed.isEmpty) return this;
    final date = DateTime.tryParse(trimmed);
    if (date == null) return this;
    return DateFormat(pattern, locale).format(date.toLocal());
  }

  /// Formats the date string with ordinal suffix in the user device's local timezone.
  ///
  /// Returns original string if parsing fails.
  String get formatWithSuffix {
    final trimmed = trim();
    if (trimmed.isEmpty) return this;
    final date = DateTime.tryParse(trimmed);
    if (date == null) return this;
    return date.toLocal().formatWithSuffix;
  }
}
