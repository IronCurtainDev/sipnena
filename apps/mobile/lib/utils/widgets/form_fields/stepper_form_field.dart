// ignore_for_file: comment_references

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A specialized numeric input field with increment/decrement buttons.
///
/// This widget provides a stepper-style input for numeric values, commonly
/// used for quantity selection, counters, or any integer input.
///
/// ## Features
/// - ⬆️ Increment button (+)
/// - ⬇️ Decrement button (-)
/// - 🔢 Numeric keyboard
/// - 📏 Configurable step size
/// - 🎯 Min/max value constraints
/// - 🎨 Theme-aware styling
///
/// ## Example Usage
/// ```dart
/// StepperFormField(
///   controller: _quantityController,
///   hintText: '0',
///   title: 'Quantity',
///   step: 1,
///   minValue: 0,
///   maxValue: 100,
///   onChanged: (value) => print('New value: $value'),
/// )
/// ```
///
/// ## Why Separate Widget?
/// The stepper logic (increment, decrement, clamping) is completely different
/// from password or description fields. Separating it:
/// - ✅ Removes complex if-else from a "God Widget"
/// - ✅ Makes the stepper behavior easy to test
/// - ✅ Allows independent modifications
///
/// See also:
/// - [CommonBaseTextField] for the underlying text field.
/// - [PasswordFormField] for password inputs.
class StepperFormField extends StatefulWidget {
  /// Creates a stepper form field.
  const StepperFormField({
    required this.controller,
    super.key,
    this.hintText = '0',
    this.title,
    this.step = 1,
    this.minValue = 0,
    this.maxValue = 999999,
    this.onChanged,
    this.enabled = true,
    this.validator,
    this.hintTextColor,
  });

  /// Controller for the numeric value.
  final TextEditingController controller;

  /// Hint text displayed when empty.
  final String hintText;

  /// Optional label above the field.
  final String? title;

  /// The increment/decrement step value.
  final int step;

  /// Minimum allowed value.
  final int minValue;

  /// Maximum allowed value.
  final int maxValue;

  /// Callback when value changes.
  final void Function(int)? onChanged;

  /// Whether the field is enabled.
  final bool enabled;

  /// Custom validation function.
  final String? Function(String?)? validator;

  /// Custom hint text color.
  final Color? hintTextColor;

  @override
  State<StepperFormField> createState() => _StepperFormFieldState();
}

class _StepperFormFieldState extends State<StepperFormField> {
  /// Current numeric value.
  int _value = 0;

  @override
  void initState() {
    super.initState();
    _initializeValue();
    widget.controller.addListener(_onControllerChange);
  }

  @override
  void dispose() {
    widget.controller.removeListener(_onControllerChange);
    super.dispose();
  }

  /// Initialize value from controller text.
  void _initializeValue() {
    _value = int.tryParse(widget.controller.text) ?? widget.minValue;
    _value = _value.clamp(widget.minValue, widget.maxValue);
  }

  /// Sync internal value when controller changes externally.
  void _onControllerChange() {
    final newValue = int.tryParse(widget.controller.text);
    if (newValue != null && newValue != _value) {
      setState(() {
        _value = newValue.clamp(widget.minValue, widget.maxValue);
      });
    }
  }

  /// Increment the value by step.
  void _increment() {
    if (!widget.enabled) return;

    final newValue = (_value + widget.step).clamp(widget.minValue, widget.maxValue);
    _updateValue(newValue);
  }

  /// Decrement the value by step.
  void _decrement() {
    if (!widget.enabled) return;

    final newValue = (_value - widget.step).clamp(widget.minValue, widget.maxValue);
    _updateValue(newValue);
  }

  /// Update the value and notify listeners.
  void _updateValue(int newValue) {
    setState(() {
      _value = newValue;
      widget.controller.text = _value.toString();
    });
    widget.onChanged?.call(_value);
  }

  @override
  Widget build(BuildContext context) {
    return CommonBaseTextField(
      controller: widget.controller,
      hintText: widget.hintText,
      title: widget.title,
      readOnly: true, // Users must use buttons
      enabled: widget.enabled,
      keyboardType: TextInputType.number,
      textCapitalization: TextCapitalization.none,
      validator: widget.validator,
      hintStyle: widget.hintTextColor != null ? TextStyle(color: widget.hintTextColor) : null,
      inputFormatters: [FilteringTextInputFormatter.digitsOnly],
      suffixIcon: StepperButtons(
        enabled: widget.enabled,
        value: _value,
        maxValue: widget.maxValue,
        minValue: widget.minValue,
        onIncrement: _increment,
        onDecrement: _decrement,
      ),
    );
  }
}

class StepperButtons extends StatelessWidget {
  const StepperButtons({
    required this.enabled,
    required this.value,
    required this.maxValue,
    required this.minValue,
    required this.onIncrement,
    required this.onDecrement,
    super.key,
  });

  final bool enabled;
  final int value;
  final int maxValue;
  final int minValue;
  final VoidCallback onIncrement;
  final VoidCallback onDecrement;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final iconColor = enabled ? colorScheme.primary : colorScheme.onSurface.withValues(alpha: 0.38);

    return SizedBox(
      width: 40,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          // Increment button
          InkWell(
            onTap: onIncrement,
            borderRadius: AppRadius.extraSmall4,
            child: Icon(
              Icons.expand_less,
              color: value >= maxValue ? colorScheme.onSurface.withValues(alpha: 0.38) : iconColor,
              size: 24,
            ),
          ),

          // Decrement button
          InkWell(
            onTap: onDecrement,
            borderRadius: AppRadius.extraSmall4,
            child: Icon(
              Icons.expand_more,
              color: value <= minValue ? colorScheme.onSurface.withValues(alpha: 0.38) : iconColor,
              size: 24,
            ),
          ),
        ],
      ),
    );
  }
}
