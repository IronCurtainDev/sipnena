import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/app/app_test_keys.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class TermsAndPrivacyCheckbox extends StatelessWidget {
  const TermsAndPrivacyCheckbox({
    required this.isAgreedNotifier,
    super.key,
  });

  final ValueNotifier<bool> isAgreedNotifier;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          height: 24,
          width: 24,
          child: ValueListenableBuilder<bool>(
            valueListenable: isAgreedNotifier,
            builder: (context, isAgreed, child) {
              return Checkbox(
                key: AppTestKeys.signUpTerms,
                value: isAgreed,
                onChanged: (value) {
                  isAgreedNotifier.value = value ?? false;
                },
              );
            },
          ),
        ),
        Gap.small8,
        Expanded(
          child: Text.rich(
            TextSpan(
              text: context.l10n.agreeTo,
              style: context.bodyMedium14(),
              children: [
                TextSpan(
                  text: context.l10n.termsOfService,
                  style: context.bodyMedium14().bold,
                  recognizer: TapGestureRecognizer()
                    ..onTap = () {
                      Pages.terms.push(context);
                    },
                ),
                TextSpan(text: context.l10n.and),
                TextSpan(
                  text: context.l10n.privacyPolicy,
                  style: context.bodyMedium14().bold,
                  recognizer: TapGestureRecognizer()
                    ..onTap = () {
                      Pages.privacy.push(context);
                    },
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
