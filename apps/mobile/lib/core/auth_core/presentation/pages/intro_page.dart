import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class IntroPage extends StatefulWidget {
  const IntroPage({super.key});

  @override
  State<IntroPage> createState() => _IntroPageState();
}

class _IntroPageState extends State<IntroPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: AppSpacing.allLg24,
          child: Column(
            children: [
              const Spacer(),
              const AppLogo(
                aspectRatio: 2.5,
              ),
              Gap.large24,
              Text(
                'Flutter Starter',
                style: context.headline24(fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              Gap.small8,
              Text(
                context.l10n.introTagline,
                style: context.bodyRegular16(color: context.colorScheme.onSurfaceVariant),
                textAlign: TextAlign.center,
              ),
              const Spacer(),
              CommonButton.primary(
                key: AppTestKeys.introSignUp,
                onPressed: () {
                  Pages.signUp.go(context);
                },
                label: context.l10n.introSignUp,
              ),
              Gap.medium16,
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  Text(
                    context.l10n.alreadyHaveAccount,
                    style: context.bodyMedium14(color: context.colorScheme.onSurface),
                  ),
                  CommonButton.text(
                    key: AppTestKeys.introSignIn,
                    onPressed: () {
                      Pages.signIn.go(context);
                    },
                    padding: AppSpacing.zero,
                    label: context.l10n.introSignIn,
                    textStyle: context.bodyMedium14(color: context.colorScheme.primary).bold,
                  ),
                ],
              ),
              Gap.medium16,
            ],
          ),
        ),
      ),
    );
  }
}
