import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:otp_autofill/otp_autofill.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/presentation/bloc/verification_state.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Code verification page - placeholder for BLoC migration.
class CodeVerificationPage extends StatelessWidget {
  const CodeVerificationPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<VerificationCubit>(),
      child: const CodeVerificationView(),
    );
  }
}

class CodeVerificationView extends StatefulWidget {
  const CodeVerificationView({super.key});

  @override
  State<CodeVerificationView> createState() => _CodeVerificationViewState();
}

class _CodeVerificationViewState extends State<CodeVerificationView> {
  late final OTPTextEditController _codeController;

  @override
  void initState() {
    _codeController = OTPTextEditController(
      codeLength: 4,
      onCodeReceive: (code) {
        if (mounted) {
          // Optional: Auto-verify on receive
        }
      },
    );

    if (Platform.isAndroid) {
      _codeController.startListenUserConsent(
        (code) {
          final exp = RegExp(r'(\d{4})');
          return exp.stringMatch(code ?? '') ?? '';
        },
      );
    }
    super.initState();
  }

  @override
  void dispose() {
    _codeController
      ..stopListen()
      ..dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<VerificationCubit, VerificationState>(
      listener: (context, state) {
        if (state is VerificationSuccess) {
          getIt<AuthBloc>().add(AuthSessionEstablished(state.session));
        } else if (state is VerificationFailure) {
          CommonDialog.alert(
            context,
            title: context.l10n.error,
            message: state.message,
            alignContentWithButton: true,
          );
        }
      },
      child: BlocBuilder<VerificationCubit, VerificationState>(
        builder: (context, state) {
          final isLoading = state is VerificationLoading;
          final hasError = state is VerificationFailure;
          final authState = context.read<AuthBloc>().state;
          final verificationEmail = authState is AuthAuthenticated ? authState.session.email : '';

          return AbsorbPointer(
            absorbing: isLoading,
            child: Scaffold(
              backgroundColor: context.colorScheme.surface,
              appBar: CommonAppBar(
                backgroundColor: context.themeService.transparent,
                actions: [
                  LogoutButton(
                    isIcon: true,
                    backgroundColor: context.themeService.whiteColor,
                  ).paddingHorizontal16,
                ],
              ),
              body: SafeArea(
                child: ExtendedColumn(
                  padding: AppSpacing.allMd16,
                  children: [
                    Gap.medium16,
                    const Center(
                      child: AppLogo(aspectRatio: 3.5),
                    ),
                    Gap.large24,
                    Center(
                      child: Text(
                        context.l10n.enterVerificationCode,
                        textAlign: TextAlign.center,
                        style: context.headline24(fontWeight: FontWeight.bold),
                      ),
                    ),
                    Gap.small8,
                    Center(
                      child: Text.rich(
                        TextSpan(
                          text: context.l10n.verificationCodeSent,
                          children: [
                            if (verificationEmail.isNotEmpty) TextSpan(text: ' $verificationEmail'),
                          ],
                        ),
                        textAlign: TextAlign.center,
                        style: context.bodyMedium14(color: context.colorScheme.onSurfaceVariant),
                      ),
                    ),
                    Gap.extraLarge32,
                    Center(
                      child: OtpFormField(
                        key: AppTestKeys.verificationCode,
                        autofocus: true,
                        controller: _codeController,
                        hasError: hasError,
                        onChanged: (_) => context.read<VerificationCubit>().reset(),
                      ),
                    ),
                    const Spacer(),
                    ListenableBuilder(
                      listenable: _codeController,
                      builder: (context, child) {
                        final isCodeFilled = _codeController.text.length == 4;
                        return CommonButton.primary(
                          label: context.l10n.verification,
                          isLoading: isLoading,
                          backgroundColor: isCodeFilled ? null : context.themeService.commonButtonColor,
                          onPressed: _submit,
                        );
                      },
                    ),
                    Gap.medium16,
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          context.l10n.didntReceiveCode,
                          textAlign: TextAlign.center,
                          style: context.bodyMedium14(),
                        ),
                        Gap.small8,
                        const VerificationResendButton(),
                      ],
                    ),
                    const RelativeGap(mainAxisExtent: 0.02),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  void _submit() {
    if (_codeController.text.length != 4) return;
    FocusScope.of(context).unfocus();

    context.read<VerificationCubit>().verifyEmail(
          code: _codeController.text,
        );
  }
}
