import 'package:flutter/material.dart';
import 'package:pinput/pinput.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/utils/constants/radius.dart';

class OtpFormField extends StatelessWidget {
  const OtpFormField({
    required this.controller,
    this.autofocus = false,
    this.hasError = false,
    this.onChanged,
    super.key,
  });

  final TextEditingController controller;
  final bool autofocus;
  final bool hasError;
  final void Function(String)? onChanged;

  @override
  Widget build(BuildContext context) {
    final defaultPinTheme = PinTheme(
      width: 60,
      height: 60,
      textStyle: context.headline18().copyWith(
            color: context.colorScheme.onSurface,
          ),
      decoration: BoxDecoration(
        color: context.colorScheme.surface,
        borderRadius: AppRadius.large16,
      ),
    );

    final focusedPinTheme = defaultPinTheme.copyWith(
      decoration: BoxDecoration(
        color: context.colorScheme.surface,
        borderRadius: AppRadius.large16,
        border: Border.all(
          color: context.themeService.blackColor,
        ),
      ),
    );

    final submittedPinTheme = defaultPinTheme.copyWith(
      decoration: BoxDecoration(
        color: context.colorScheme.surface,
        borderRadius: AppRadius.large16,
        border: Border.all(
          color: context.themeService.blackColor,
        ),
      ),
    );

    final followingPinTheme = defaultPinTheme.copyWith(
      decoration: BoxDecoration(
        color: Colors.transparent,
        borderRadius: AppRadius.large16,
        border: Border.all(
          color: context.colorScheme.outlineVariant, // Replaced raw color
        ),
      ),
    );

    final errorPinTheme = defaultPinTheme.copyWith(
      decoration: BoxDecoration(
        color: context.colorScheme.surface,
        borderRadius: AppRadius.large16,
        border: Border.all(
          color: context.colorScheme.error,
        ),
      ),
    );

    return Pinput(
      autofocus: autofocus,
      controller: controller,
      onChanged: onChanged,
      forceErrorState: hasError,
      errorPinTheme: errorPinTheme,
      defaultPinTheme: hasError ? errorPinTheme : defaultPinTheme,
      focusedPinTheme: hasError ? errorPinTheme : focusedPinTheme,
      submittedPinTheme: hasError ? errorPinTheme : submittedPinTheme,
      followingPinTheme: hasError ? errorPinTheme : followingPinTheme,
      preFilledWidget: Text(
        '*',
        style: defaultPinTheme.textStyle?.copyWith(
          color: context.themeService.hintTextColor, // Replaced raw color
        ),
      ),
    );
  }
}
