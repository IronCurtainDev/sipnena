// ignore_for_file: comment_references

import 'package:country_picker/country_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A specialized form field for phone number input with country code picker.
///
/// This widget provides a complete phone number input solution following
/// the Atomic Design pattern as a Molecule component.
///
/// ## Features
/// - 📱 Country code picker with search functionality
/// - 🔢 Numeric-only input with length limiting
/// - ✅ Built-in and custom validation support
/// - 🎨 Fully theme-aware design
/// - 🌍 Favorite countries support
///
/// ## Example Usage
/// ```dart
/// PhoneFormField(
///   phoneNumberController: _phoneController,
///   phoneFocusNode: _phoneFocusNode,
///   title: 'Phone Number',
///   initialCountryCode: '+1',
///   onCountryCodeChanged: (code) => setState(() => _countryCode = code),
///   onChanged: (value) => print('Phone: $value'),
///   phoneNumberValidator: (value) {
///     if (value == null || value.length < 10) {
///       return 'Please enter a valid phone number';
///     }
///     return null;
///   },
/// )
/// ```
///
/// ## Why Separate Widget?
/// Phone input has unique requirements:
/// - Country code selection
/// - Phone-specific formatting
/// - E.164 format considerations
///
/// ## References
/// - [country_picker](https://pub.dev/packages/country_picker)
/// - [E.164 Phone Format](https://en.wikipedia.org/wiki/E.164)
///
/// See also:
/// - [CommonBaseTextField] for general text input.
/// - [PasswordFormField] for password inputs.
class PhoneFormField extends StatefulWidget {
  /// Creates a phone number input field with country code picker.
  ///
  /// [maxPhoneLength] must be positive and greater than [minPhoneLength].
  const PhoneFormField({
    required this.phoneNumberController,
    required this.phoneFocusNode,
    super.key,
    this.title,
    this.initialCountryCode = '+61',
    this.phoneNumberValidator,
    this.phoneNumberHintText = 'Enter phone number',
    this.onCountryCodeChanged,
    this.onChanged,
    this.favoriteCountries = const ['AU'],
    this.maxPhoneLength = 13,
    this.minPhoneLength = 6,
    this.enabled = true,
    this.hintcolor,
    this.countryCodeColor,
    this.autovalidateMode = AutovalidateMode.onUserInteraction,
    this.useFilledTextBorderColor = false,
    this.filledBorderColor,
    this.emptyBorderColor,
  })  : assert(maxPhoneLength > 0, 'maxPhoneLength must be positive'),
        assert(
          minPhoneLength >= 0 && minPhoneLength <= maxPhoneLength,
          'minPhoneLength must be between 0 and maxPhoneLength',
        );

  /// Controller for the phone number text field.
  final TextEditingController phoneNumberController;

  /// Focus node for managing keyboard focus.
  final FocusNode phoneFocusNode;

  /// Optional label displayed above the field.
  final String? title;

  /// Initial country code to display (e.g., '+61' for Australia).
  ///
  /// Must include the '+' prefix.
  final String initialCountryCode;

  /// Custom validator for the phone number field.
  ///
  /// If null, a default validator is used that checks:
  /// - Non-empty input
  /// - Digits only
  /// - Minimum length
  final String? Function(String?)? phoneNumberValidator;

  /// Hint text displayed when the field is empty.
  final String phoneNumberHintText;

  /// Callback fired when the country code is changed.
  final void Function(String)? onCountryCodeChanged;

  /// Callback fired when the phone number text changes.
  final void Function(String)? onChanged;

  /// List of ISO country codes to show as favorites.
  ///
  /// These countries appear at the top of the picker.
  /// Example: `['US', 'GB', 'AU']`
  final List<String> favoriteCountries;

  /// Maximum length for phone number input.
  ///
  /// Defaults to 13 digits to accommodate most international formats.
  final int maxPhoneLength;

  /// Minimum length for a valid phone number.
  ///
  /// Used by the default validator. Defaults to 6.
  final int minPhoneLength;

  /// Whether the field accepts input.
  final bool enabled;

  /// Optional hint text color for the phone number input.
  final Color? hintcolor;

  /// Optional color for country code text (e.g., +61).
  final Color? countryCodeColor;

  /// When to validate automatically.
  final AutovalidateMode autovalidateMode;

  /// If true, border color changes based on whether text is empty.
  final bool useFilledTextBorderColor;

  /// Border color used when the input has non-empty text.
  final Color? filledBorderColor;

  /// Border color used when the input is empty.
  final Color? emptyBorderColor;

  @override
  State<PhoneFormField> createState() => _PhoneFormFieldState();
}

class _PhoneFormFieldState extends State<PhoneFormField> {
  /// Currently selected country code with '+' prefix.
  late String _countryCode;
  bool _hasCountrySelection = false;

  @override
  void initState() {
    super.initState();
    _countryCode = widget.initialCountryCode;
  }

  @override
  void didUpdateWidget(PhoneFormField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.initialCountryCode != widget.initialCountryCode) {
      _countryCode = widget.initialCountryCode;
    }
  }

  /// Opens the country picker bottom sheet.
  void _showCountryPicker() {
    if (!widget.enabled) return;

    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final textTheme = theme.textTheme;

    showCountryPicker(
      context: context,
      showPhoneCode: true,
      favorite: widget.favoriteCountries,
      onSelect: _onCountrySelected,
      countryListTheme: CountryListThemeData(
        bottomSheetHeight: MediaQuery.sizeOf(context).height * 0.7,
        backgroundColor: colorScheme.surface,
        textStyle: textTheme.bodyMedium?.copyWith(
          color: colorScheme.onSurface,
        ),
        searchTextStyle: textTheme.bodyMedium?.copyWith(
          color: colorScheme.onSurface,
        ),
        inputDecoration: InputDecoration(
          hintText: 'Search country',
          hintStyle: textTheme.bodyMedium?.copyWith(
            color: colorScheme.onSurface.withValues(alpha: 0.5),
          ),
          prefixIcon: Icon(
            Icons.search,
            color: colorScheme.onSurface.withValues(alpha: 0.5),
          ),
          enabledBorder: UnderlineInputBorder(
            borderSide: BorderSide(color: colorScheme.outline),
          ),
          focusedBorder: UnderlineInputBorder(
            borderSide: BorderSide(color: colorScheme.primary),
          ),
        ),
      ),
    );
  }

  /// Handles country selection from the picker.
  void _onCountrySelected(Country country) {
    setState(() {
      _countryCode = '+${country.phoneCode}';
      _hasCountrySelection = true;
    });
    widget.onCountryCodeChanged?.call(_countryCode);
  }

  /// Default validator for phone number input.
  String? _defaultValidator(String? value) {
    if (value == null || value.isEmpty) {
      return 'Enter your contact number';
    }

    final numberRegExp = RegExp(r'^[0-9]+$');
    if (!numberRegExp.hasMatch(value)) {
      return 'Enter digits only';
    }

    if (value.length < widget.minPhoneLength) {
      return 'Phone number is too short';
    }

    return null;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final inputTheme = theme.inputDecorationTheme;
    final defaultEmptyBorderColor = inputTheme.enabledBorder?.borderSide.color ?? colorScheme.outline;
    final filledColor = widget.filledBorderColor ?? colorScheme.onSurface;
    final emptyColor = widget.emptyBorderColor ?? defaultEmptyBorderColor;
    final borderColor = widget.useFilledTextBorderColor && _hasCountrySelection ? filledColor : emptyColor;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Title label
        if (widget.title != null) PhoneFieldTitle(title: widget.title!),

        Gap.small8,

        // Phone input row
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Country Code Picker
            CountryCodePicker(
              colorScheme: colorScheme,
              borderColor: borderColor,
              countryCode: _countryCode,
              enabled: widget.enabled,
              hasCountrySelection: _hasCountrySelection,
              countryCodeColor: widget.countryCodeColor,
              onTap: _showCountryPicker,
            ),
            Gap.medium12,
            // Phone Number Input
            Expanded(
              child: PhoneNumberInput(
                controller: widget.phoneNumberController,
                focusNode: widget.phoneFocusNode,
                hintText: widget.phoneNumberHintText,
                hintColor: widget.hintcolor,
                enabled: widget.enabled,
                autovalidateMode: widget.autovalidateMode,
                validator: widget.phoneNumberValidator ?? _defaultValidator,
                onChanged: widget.onChanged,
                maxPhoneLength: widget.maxPhoneLength,
                useFilledTextBorderColor: widget.useFilledTextBorderColor,
                filledBorderColor: widget.filledBorderColor,
                emptyBorderColor: widget.emptyBorderColor,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class PhoneFieldTitle extends StatelessWidget {
  const PhoneFieldTitle({required this.title, super.key});

  final String title;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 2),
      child: Text(
        title,
        style: theme.textTheme.bodyMedium?.copyWith(
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}

class CountryCodePicker extends StatelessWidget {
  const CountryCodePicker({
    required this.colorScheme,
    required this.borderColor,
    required this.countryCode,
    required this.enabled,
    required this.hasCountrySelection,
    required this.onTap,
    this.countryCodeColor,
    super.key,
  });

  final ColorScheme colorScheme;
  final Color borderColor;
  final String countryCode;
  final bool enabled;
  final bool hasCountrySelection;
  final VoidCallback onTap;
  final Color? countryCodeColor;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 100,
        height: 48,
        decoration: BoxDecoration(
          color: colorScheme.surface,
          borderRadius: AppRadius.medium12,
          border: Border.all(color: borderColor),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  countryCode,
                  style: context.bodyRegular16(
                    fontWeight: FontWeight.w400,
                    color: enabled
                        ? (hasCountrySelection ? colorScheme.onSurface : (countryCodeColor ?? colorScheme.onSurface))
                        : colorScheme.onSurface.withValues(alpha: 0.38),
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              Icon(
                Icons.arrow_drop_down,
                size: 24,
                color: enabled ? colorScheme.onSurface : colorScheme.onSurface.withValues(alpha: 0.38),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class PhoneNumberInput extends StatelessWidget {
  const PhoneNumberInput({
    required this.controller,
    required this.focusNode,
    required this.hintText,
    required this.enabled,
    required this.autovalidateMode,
    required this.validator,
    required this.maxPhoneLength,
    required this.useFilledTextBorderColor,
    this.hintColor,
    this.onChanged,
    this.filledBorderColor,
    this.emptyBorderColor,
    super.key,
  });

  final TextEditingController controller;
  final FocusNode focusNode;
  final String hintText;
  final Color? hintColor;
  final bool enabled;
  final AutovalidateMode autovalidateMode;
  final String? Function(String?) validator;
  final void Function(String)? onChanged;
  final int maxPhoneLength;
  final bool useFilledTextBorderColor;
  final Color? filledBorderColor;
  final Color? emptyBorderColor;

  @override
  Widget build(BuildContext context) {
    return CommonBaseTextField(
      controller: controller,
      focusNode: focusNode,
      hintText: hintText,
      hintcolor: hintColor,
      keyboardType: TextInputType.phone,
      textCapitalization: TextCapitalization.none,
      enabled: enabled,
      autovalidateMode: autovalidateMode,
      validator: validator,
      onChanged: onChanged,
      inputFormatters: [
        FilteringTextInputFormatter.digitsOnly,
        LengthLimitingTextInputFormatter(maxPhoneLength),
      ],
      useFilledTextBorderColor: useFilledTextBorderColor,
      filledBorderColor: filledBorderColor,
      emptyBorderColor: emptyBorderColor,
    );
  }
}
