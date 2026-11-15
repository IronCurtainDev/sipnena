// ignore_for_file: comment_references

import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/utils/widgets/form_fields/base_text_field.dart';

/// A specialized multi-line text field for longer text input.
///
/// This widget is optimized for descriptions, notes, comments, or any
/// text that may span multiple lines.
///
/// ## Features
/// - 📝 Multi-line input (3 lines minimum by default)
/// - 📏 Optional character counter
/// - 📐 Expands vertically as user types
/// - 🎨 Theme-aware styling
///
/// ## Example Usage
/// ```dart
/// DescriptionFormField(
///   controller: _descriptionController,
///   hintText: 'Enter a detailed description...',
///   title: 'Description',
///   maxLength: 500,
///   showCounter: true,
/// )
/// ```
///
/// ## Why Separate Widget?
/// Multi-line fields have different UX considerations:
/// - Different height constraints
/// - Often need character counters
/// - May have different validation rules (min/max length)
///
/// See also:
/// - [CommonBaseTextField] for the underlying text field.
/// - [PasswordFormField] for password inputs.
class DescriptionFormField extends StatelessWidget {
  /// Creates a description form field.
  const DescriptionFormField({
    required this.controller,
    required this.hintText,
    super.key,
    this.title,
    this.minLines = 3,
    this.maxLines,
    this.maxLength,
    this.hintTextColor,
    this.showCounter = false,
    this.validator,
    this.onChanged,
    this.autovalidateMode = AutovalidateMode.onUserInteraction,
    this.enabled = true,
    this.focusNode,
    this.useFilledTextBorderColor = false,
    this.filledBorderColor,
    this.emptyBorderColor,
  });

  /// Controller for the text value.
  final TextEditingController controller;

  /// Hint text displayed when empty.
  final String hintText;

  /// Optional hint text color.
  final Color? hintTextColor;

  /// Optional label above the field.
  final String? title;

  /// Minimum number of lines to display.
  final int minLines;

  /// Maximum number of lines (null for unlimited).
  final int? maxLines;

  /// Maximum character length (null for unlimited).
  final int? maxLength;

  /// Whether to show character counter.
  final bool showCounter;

  /// Validation function.
  final String? Function(String?)? validator;

  /// Callback when text changes.
  final void Function(String)? onChanged;

  /// When to validate automatically.
  final AutovalidateMode autovalidateMode;

  /// Whether the field is enabled.
  final bool enabled;

  /// Focus node for keyboard control.
  final FocusNode? focusNode;

  /// If true, border color changes based on whether the field has text.
  final bool useFilledTextBorderColor;

  /// Border color used when the input has non-empty text.
  final Color? filledBorderColor;

  /// Border color used when the input is empty.
  final Color? emptyBorderColor;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Title label
        if (title != null)
          Padding(
            padding: const EdgeInsets.only(bottom: 6),
            child: Text(
              title!,
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w500,
              ),
            ),
          ),

        // Multi-line text field
        ValueListenableBuilder<TextEditingValue>(
          valueListenable: controller,
          builder: (context, value, child) {
            final hasText = value.text.trim().isNotEmpty;
            final resolvedFilledColor = filledBorderColor ?? Colors.black;
            final resolvedEmptyColor = emptyBorderColor ?? const Color.fromRGBO(0, 0, 0, 0.5);
            final effectiveBorderColor = hasText ? resolvedFilledColor : resolvedEmptyColor;

            final enabledBorder = useFilledTextBorderColor ? _withBorderColor(theme.inputDecorationTheme.enabledBorder, effectiveBorderColor) : null;
            final focusedBorder = useFilledTextBorderColor ? _withBorderColor(theme.inputDecorationTheme.focusedBorder, effectiveBorderColor) : null;

            return TextFormField(
              controller: controller,
              minLines: minLines,
              maxLines: maxLines,
              maxLength: showCounter ? maxLength : null,
              validator: _buildValidator(),
              onChanged: onChanged,
              autovalidateMode: autovalidateMode,
              enabled: enabled,
              focusNode: focusNode,
              keyboardType: TextInputType.multiline,
              textInputAction: TextInputAction.newline,
              decoration: InputDecoration(
                hintText: hintText,
                hintStyle: hintTextColor != null ? TextStyle(color: hintTextColor) : null,
                alignLabelWithHint: true,
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 16,
                ),
                counterText: showCounter ? null : '',
                enabledBorder: enabledBorder,
                focusedBorder: focusedBorder,
              ),
            );
          },
        ),

        // Custom counter (if maxLength set but showCounter is false)
        if (maxLength != null && !showCounter) CustomCounter(controller: controller, maxLength: maxLength),
      ],
    );
  }

  InputBorder _withBorderColor(InputBorder? inputBorder, Color color) {
    if (inputBorder is OutlineInputBorder) {
      return inputBorder.copyWith(
        borderSide: inputBorder.borderSide.copyWith(color: color),
      );
    }

    if (inputBorder is UnderlineInputBorder) {
      return inputBorder.copyWith(
        borderSide: inputBorder.borderSide.copyWith(color: color),
      );
    }

    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(16),
      borderSide: BorderSide(color: color),
    );
  }

  /// Builds the validator, combining maxLength validation with custom validator.
  String? Function(String?) _buildValidator() {
    return (value) {
      // Check max length if specified
      if (maxLength != null && (value?.length ?? 0) > maxLength!) {
        return 'Maximum $maxLength characters allowed';
      }

      // Run custom validator if provided
      return validator?.call(value);
    };
  }
}

class CustomCounter extends StatelessWidget {
  const CustomCounter({
    required this.controller,
    this.maxLength,
    super.key,
  });

  final TextEditingController controller;
  final int? maxLength;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ValueListenableBuilder<TextEditingValue>(
      valueListenable: controller,
      builder: (context, value, child) {
        final currentLength = value.text.length;
        final isOverLimit = currentLength > (maxLength ?? double.infinity);

        return Padding(
          padding: const EdgeInsets.only(top: 4),
          child: Text(
            '$currentLength / $maxLength',
            style: theme.textTheme.bodySmall?.copyWith(
              color: isOverLimit ? theme.colorScheme.error : theme.colorScheme.onSurface.withValues(alpha: 0.6),
            ),
          ),
        );
      },
    );
  }
}
