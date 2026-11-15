import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/presentation/widgets/validation_display_card.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class PasswordValidationSection extends StatelessWidget {
  const PasswordValidationSection({
    required this.controller,
    super.key,
  });

  final TextEditingController controller;

  static bool isPasswordValid(String value) {
    return value.length >= 8 &&
        AppRegex.uppercase.hasMatch(value) &&
        AppRegex.lowercase.hasMatch(value) &&
        AppRegex.number.hasMatch(value) &&
        AppRegex.specialChar.hasMatch(value);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: AppSpacing.allMd16,
      decoration: BoxDecoration(
        color: context.themeService.containerBgColor,
        borderRadius: AppRadius.medium12,
        border: Border.all(color: context.themeService.containerBorderColor),
      ),
      child: ValueListenableBuilder<TextEditingValue>(
        valueListenable: controller,
        builder: (context, value, child) {
          final text = value.text;
          final hasMinLength = text.length >= 8;
          final hasUppercase = AppRegex.uppercase.hasMatch(text);
          final hasLowercase = AppRegex.lowercase.hasMatch(text);
          final hasNumber = AppRegex.number.hasMatch(text);
          final hasSpecialChar = AppRegex.specialChar.hasMatch(text);

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Password Must Contain',
                style: context.bodyMedium14(fontWeight: FontWeight.w700),
              ),
              Gap.small8,
              ValidationItem(text: 'At least 8 characters', isValid: hasMinLength),
              ValidationItem(text: 'One uppercase letter', isValid: hasUppercase),
              ValidationItem(text: 'One lowercase letter', isValid: hasLowercase),
              ValidationItem(text: 'One number', isValid: hasNumber),
              ValidationItem(text: 'One special character', isValid: hasSpecialChar),
            ],
          );
        },
      ),
    );
  }
}
