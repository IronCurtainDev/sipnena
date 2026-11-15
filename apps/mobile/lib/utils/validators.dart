import 'package:flutter/widgets.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class AppValidators {
  static String? validateEmail(String value, BuildContext context) {
    final email = value.trim();
    if (email.isEmpty) {
      return context.l10n.errorEnterEmail;
    }

    if (!AppRegex.email.hasMatch(email)) {
      return context.l10n.errorInvalidEmailAddress;
    }

    return null;
  }

  static String? validatePassword(String value, BuildContext context) {
    final password = value.trim();
    if (password.isEmpty) {
      return context.l10n.errorEnterPassword;
    }

    if (password.length < 8) {
      return context.l10n.errorPasswordMinLength(8);
    }

    if (!AppRegex.number.hasMatch(password)) {
      return context.l10n.errorPasswordNumber;
    }

    if (!AppRegex.specialChar.hasMatch(password)) {
      return context.l10n.errorPasswordSpecialCharacter;
    }

    return null;
  }

  static String? validatePhoneNumber({
    required String? value,
    required String countryCode,
    required BuildContext context,
  }) {
    final phone = value?.trim() ?? '';
    if (phone.isEmpty) {
      return context.l10n.phoneNumberRequired;
    }

    if (!AppRegex.digitsOnly.hasMatch(phone)) {
      return context.l10n.phoneNumberDigitsOnly;
    }

    final isAus = countryCode == '+61' || countryCode == '61';
    if (isAus && phone.length != 9) {
      return context.l10n.phoneNumberAusLength;
    }

    if (!isAus && phone.length < 6) {
      return context.l10n.phoneNumberTooShort;
    }

    return null;
  }
}
