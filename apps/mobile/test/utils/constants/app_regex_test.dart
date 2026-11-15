import 'package:flutter_test/flutter_test.dart';
import 'package:react_hono_flutter_template/utils/constants/app_regex.dart';

void main() {
  group('AppRegex.email', () {
    test('accepts a valid email address', () {
      const email = 'developer@example.com';

      final isValid = AppRegex.email.hasMatch(email);

      expect(isValid, isTrue);
    });

    test('rejects an address without a top-level domain', () {
      const email = 'developer@example';

      final isValid = AppRegex.email.hasMatch(email);

      expect(isValid, isFalse);
    });
  });

  group('AppRegex.digitsOnly', () {
    test('accepts a string containing only digits', () {
      const value = '94771234567';

      final isValid = AppRegex.digitsOnly.hasMatch(value);

      expect(isValid, isTrue);
    });

    test('rejects punctuation in a numeric string', () {
      const value = '+94 77 123 4567';

      final isValid = AppRegex.digitsOnly.hasMatch(value);

      expect(isValid, isFalse);
    });
  });
}
