// ignore_for_file: comment_references

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class _FirstLetterUppercaseFormatter extends TextInputFormatter {
  const _FirstLetterUppercaseFormatter();

  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    final text = newValue.text;
    if (text.isEmpty) return newValue;

    final first = text.characters.first;
    final upperFirst = first.toUpperCase();
    if (first == upperFirst) return newValue;

    final transformed = upperFirst + text.substring(first.length);
    return newValue.copyWith(
      text: transformed,
      selection: newValue.selection,
      composing: TextRange.empty,
    );
  }
}

/// The foundational text field widget following Atomic Design principles.
///
/// This is the **Atom** — the smallest, most basic form input component.
/// All specialized text fields (Password, Stepper, Description) are built
/// on top of this base widget using composition.
///
/// ## Design Philosophy
/// - **Single Responsibility**: Only handles core text input styling
/// - **Theme-Aware**: Uses [InputDecorationTheme] for consistent styling
/// - **Composable**: Specialized fields wrap this widget, not extend it
///
/// ## Example Usage
/// ```dart
/// CommonBaseTextField(
///   controller: _emailController,
///   hintText: 'Enter email',
///   title: 'Email Address',
///   keyboardType: TextInputType.emailAddress,
///   validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
/// )
/// ```
///
/// For specialized inputs, use:
/// - PasswordFormField for password inputs with visibility toggle
/// - StepperFormField for numeric inputs with increment/decrement
/// - DescriptionFormField for multi-line text areas
class CommonBaseTextField extends StatelessWidget {
  /// Creates a base text field.
  ///
  /// Throws [AssertionError] if [obscureText] is true and [maxLines] is not 1.
  const CommonBaseTextField({
    required this.controller,
    required this.hintText,
    super.key,
    this.title,
    this.suffixIcon,
    this.prefixIcon,
    this.obscureText = false,
    this.keyboardType,
    this.textInputAction,
    this.inputFormatters,
    this.validator,
    this.onChanged,
    this.onTap,
    this.onEditingComplete,
    this.onFieldSubmitted,
    this.autovalidateMode = AutovalidateMode.onUserInteraction,
    this.maxLines = 1,
    this.minLines,
    this.readOnly = false,
    this.enabled = true,
    this.focusNode,
    this.autofocus = false,
    this.textCapitalization = TextCapitalization.sentences,
    this.style,
    this.contentPadding,
    this.hintStyle,
    this.hintcolor,
    this.useFilledTextBorderColor = false,
    this.filledBorderColor,
    this.emptyBorderColor,
    this.hasError = false,
    this.isBorderless = false,
  }) : assert(
          !obscureText || maxLines == 1,
          'Obscured text fields must have maxLines = 1',
        );

  /// Controller for the text field value.
  final TextEditingController controller;

  /// Hint text displayed when the field is empty.
  final String hintText;

  /// Optional label displayed above the text field.
  final String? title;

  /// Widget displayed at the end of the text field.
  final Widget? suffixIcon;

  /// Widget displayed at the start of the text field.
  final Widget? prefixIcon;

  /// Whether to obscure the text (for passwords).
  final bool obscureText;

  /// The type of keyboard to display.
  final TextInputType? keyboardType;

  /// The action button on the keyboard.
  final TextInputAction? textInputAction;

  /// Input formatters to apply.
  final List<TextInputFormatter>? inputFormatters;

  /// Validation function.
  final String? Function(String?)? validator;

  /// Callback when text changes.
  final void Function(String)? onChanged;

  /// Callback when field is tapped.
  final VoidCallback? onTap;

  /// Callback when editing is complete.
  final VoidCallback? onEditingComplete;

  /// Callback when user submits (presses done/next on keyboard).
  ///
  /// Useful for navigating to the next field in a form.
  final void Function(String)? onFieldSubmitted;

  /// When to validate automatically.
  final AutovalidateMode autovalidateMode;

  /// Maximum number of lines.
  final int? maxLines;

  /// Minimum number of lines.
  final int? minLines;

  /// Whether the field is read-only.
  final bool readOnly;

  /// Whether the field is enabled.
  final bool enabled;

  /// Focus node for keyboard focus control.
  final FocusNode? focusNode;

  /// Whether to autofocus this field.
  final bool autofocus;

  /// Text capitalization mode.
  final TextCapitalization textCapitalization;

  /// Custom text style for the input content.
  final TextStyle? style;

  /// Custom content padding.
  final EdgeInsetsGeometry? contentPadding;

  /// Custom hint style.
  final TextStyle? hintStyle;

  /// Optional hint text color override.
  final Color? hintcolor;

  /// If true, border color changes based on whether the field has text.
  final bool useFilledTextBorderColor;

  /// Border color used when the input has non-empty text.
  final Color? filledBorderColor;

  /// Border color used when the input is empty.
  final Color? emptyBorderColor;

  /// Whether to force the input border into an error state.
  ///
  /// This is useful when validation feedback is shown outside the field
  /// (e.g. dialogs) but the field still needs red outline highlighting.
  final bool hasError;

  /// Whether to render the input without borders and background.
  final bool isBorderless;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final baseHintStyle = hintStyle ?? theme.inputDecorationTheme.hintStyle;
    final effectiveHintStyle = hintcolor != null ? (baseHintStyle?.copyWith(color: hintcolor) ?? TextStyle(color: hintcolor)) : baseHintStyle;
    final shouldForceFirstLetterUppercase = textCapitalization == TextCapitalization.sentences;
    final effectiveInputFormatters = [
      ...?inputFormatters,
      if (shouldForceFirstLetterUppercase) const _FirstLetterUppercaseFormatter(),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Title label
        if (title != null) TextFieldTitle(title: title!, hasError: hasError),

        ValueListenableBuilder<TextEditingValue>(
          valueListenable: controller,
          builder: (context, value, child) {
            final hasText = value.text.trim().isNotEmpty;
            final resolvedFilledColor = filledBorderColor ?? Colors.black;
            final resolvedEmptyColor = emptyBorderColor ?? const Color.fromRGBO(0, 0, 0, 0.5);
            final effectiveBorderColor = hasError ? theme.colorScheme.error : (hasText ? resolvedFilledColor : resolvedEmptyColor);

            final enabledBorder =
                (useFilledTextBorderColor || hasError) ? _withBorderColor(theme.inputDecorationTheme.enabledBorder, effectiveBorderColor) : null;
            final focusedBorder =
                (useFilledTextBorderColor || hasError) ? _withBorderColor(theme.inputDecorationTheme.focusedBorder, effectiveBorderColor) : null;

            return TextFormField(
              controller: controller,
              style: style,
              obscureText: obscureText,
              keyboardType: keyboardType,
              textInputAction: textInputAction,
              inputFormatters: effectiveInputFormatters,
              validator: validator,
              onChanged: onChanged,
              onTap: onTap,
              onEditingComplete: onEditingComplete,
              onFieldSubmitted: onFieldSubmitted,
              autovalidateMode: autovalidateMode,
              maxLines: obscureText ? 1 : maxLines,
              minLines: minLines,
              readOnly: readOnly,
              enabled: enabled,
              focusNode: focusNode,
              autofocus: autofocus,
              textCapitalization: textCapitalization,
              decoration: InputDecoration(
                hintText: hintText,
                hintStyle: effectiveHintStyle,
                suffixIcon: suffixIcon,
                prefixIcon: prefixIcon,
                contentPadding: contentPadding ?? (isBorderless ? EdgeInsets.zero : const EdgeInsets.symmetric(horizontal: 16, vertical: 12)),
                fillColor: isBorderless ? Colors.transparent : theme.inputDecorationTheme.fillColor,
                filled: true,
                isDense: isBorderless ? true : null,
                border: isBorderless
                    ? InputBorder.none
                    : (hasError
                        ? _withBorderColor(theme.inputDecorationTheme.border ?? theme.inputDecorationTheme.enabledBorder, theme.colorScheme.error)
                        : null),
                enabledBorder: isBorderless ? InputBorder.none : enabledBorder,
                focusedBorder: isBorderless ? InputBorder.none : focusedBorder,
              ),
            );
          },
        ),
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
}

class TextFieldTitle extends StatelessWidget {
  const TextFieldTitle({
    required this.title,
    required this.hasError,
    super.key,
  });

  final String title;
  final bool hasError;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Text(
        title,
        style: context.bodyRegular14(
          color: hasError ? Theme.of(context).colorScheme.error : null,
          fontWeight: FontWeight.w400,
        ),
      ),
    );
  }
}
