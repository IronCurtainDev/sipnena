// ignore_for_file: comment_references

import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A specialized text field for password input with visibility toggle.
///
/// This widget uses **Composition** over inheritance, wrapping [CommonBaseTextField]
/// with password-specific functionality.
///
/// ## Features
/// - 🔒 Obscured text by default
/// - 👁️ Visibility toggle button
/// - ✅ Built-in password validation option
/// - 🎨 Theme-aware icon colors
///
/// ## Example Usage
/// ```dart
/// PasswordFormField(
///   controller: _passwordController,
///   hintText: 'Enter your password',
///   title: 'Password',
///   validator: (value) {
///     if (value == null || value.length < 8) {
///       return 'Password must be at least 8 characters';
///     }
///     return null;
///   },
/// )
/// ```
///
/// ## Why Separate Widget?
/// Following **Single Responsibility Principle (SRP)**, this widget only handles:
/// 1. Obscuring text
/// 2. Visibility toggle state
///
/// This makes it:
/// - ✅ Easy to unit test
/// - ✅ Easy to modify without breaking other inputs
/// - ✅ Clear API for developers
///
/// See also:
/// - [CommonBaseTextField] for the underlying text field.
/// - [StepperFormField] for numeric inputs with increment/decrement.
class PasswordFormField extends StatefulWidget {
  /// Creates a password form field.
  ///
  /// If [validator] is null, a default validator is used that checks:
  /// - Non-empty input
  /// - Minimum length of [minLength] characters (default: 8)
  const PasswordFormField({
    required this.controller,
    required this.hintText,
    super.key,
    this.title,
    this.validator,
    this.minLength = 8,
    this.onChanged,
    this.autovalidateMode = AutovalidateMode.onUserInteraction,
    this.textInputAction,
    this.focusNode,
    this.onEditingComplete,
    this.enabled = true,
    this.hintTextColor,
    this.hasError = false,
  }) : assert(minLength > 0, 'minLength must be positive');

  /// Controller for the password value.
  final TextEditingController controller;

  /// Hint text displayed when empty.
  final String hintText;

  /// Optional label above the field.
  final String? title;

  /// Custom password validation function.
  ///
  /// If null, uses a default validator that checks for non-empty
  /// and minimum [minLength] characters.
  final String? Function(String?)? validator;

  /// Minimum password length for default validation.
  ///
  /// Defaults to 8 characters.
  final int minLength;

  /// Callback when password changes.
  final void Function(String)? onChanged;

  /// When to validate automatically.
  final AutovalidateMode autovalidateMode;

  /// Keyboard action button.
  final TextInputAction? textInputAction;

  /// Focus node for keyboard control.
  final FocusNode? focusNode;

  /// Callback when editing is complete.
  final VoidCallback? onEditingComplete;

  /// Whether the field is enabled.
  final bool enabled;

  /// Custom hint text color.
  final Color? hintTextColor;

  /// Whether to force error outline on the field.
  final bool hasError;

  @override
  State<PasswordFormField> createState() => _PasswordFormFieldState();
}

class _PasswordFormFieldState extends State<PasswordFormField> {
  /// Tracks whether password is currently visible.
  bool _isVisible = false;

  /// Toggles password visibility.
  void _toggleVisibility() {
    setState(() {
      _isVisible = !_isVisible;
    });
  }

  /// Default validator for password input.
  String? _defaultValidator(String? value) {
    final password = value?.trim() ?? '';

    if (password.isEmpty) {
      return 'Password is mandatory.';
    }

    if (password.length < widget.minLength) {
      return 'Password should contain minimum ${widget.minLength} characters.';
    }

    if (!RegExp('[0-9]').hasMatch(password)) {
      return 'Password should include at least one number.';
    }

    if (!RegExp('[^A-Za-z0-9]').hasMatch(password)) {
      return 'Password should include at least one special character.';
    }

    return null;
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return CommonBaseTextField(
      controller: widget.controller,
      hintText: widget.hintText,
      title: widget.title,
      obscureText: !_isVisible,
      validator: widget.validator ?? _defaultValidator,
      onChanged: widget.onChanged,
      autovalidateMode: widget.autovalidateMode,
      textInputAction: widget.textInputAction,
      focusNode: widget.focusNode,
      onEditingComplete: widget.onEditingComplete,
      enabled: widget.enabled,
      textCapitalization: TextCapitalization.none,
      keyboardType: TextInputType.visiblePassword,
      hintStyle: widget.hintTextColor != null ? TextStyle(color: widget.hintTextColor) : null,
      useFilledTextBorderColor: true,
      filledBorderColor: context.themeService.blackColor,
      emptyBorderColor: context.themeService.commonButtonColor,
      hasError: widget.hasError,
      suffixIcon: IconButton(
        icon: Image.asset(
          _isVisible ? AppImages.eyeOpen : AppImages.eyeClose,
          width: 24,
          height: 24,
          color: colorScheme.primary,
        ),
        onPressed: _toggleVisibility,
      ),
    );
  }
}

/// Factory extension for creating common password field configurations.
extension PasswordFormFieldFactories on PasswordFormField {
  /// Creates a password field with minimum length validation.
  static PasswordFormField withMinLength({
    required TextEditingController controller,
    int minLength = 8,
    String hintText = 'Enter password',
    String? title,
  }) {
    return PasswordFormField(
      controller: controller,
      hintText: hintText,
      title: title,
      validator: (value) {
        final password = value?.trim() ?? '';
        if (password.isEmpty) {
          return 'Password is mandatory.';
        }

        if (password.length < minLength) {
          return 'Password should contain minimum $minLength characters.';
        }

        if (!RegExp('[0-9]').hasMatch(password)) {
          return 'Password should include at least one number.';
        }

        if (!RegExp('[^A-Za-z0-9]').hasMatch(password)) {
          return 'Password should include at least one special character.';
        }

        return null;
      },
    );
  }
}
