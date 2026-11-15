import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/presentation/bloc/forgot_password_state.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Forgot password page - placeholder for BLoC migration.
class ForgotPasswordPage extends StatelessWidget {
  const ForgotPasswordPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => ForgotPasswordCubit(
        forgotPasswordUseCase: getIt<ForgotPasswordUseCase>(),
      ),
      child: const ForgotPasswordView(),
    );
  }
}

class ForgotPasswordView extends StatefulWidget {
  const ForgotPasswordView({super.key});

  @override
  State<ForgotPasswordView> createState() => _ForgotPasswordViewState();
}

class _ForgotPasswordViewState extends State<ForgotPasswordView> {
  late final TextEditingController _emailController;
  late final ValueNotifier<bool> _showEmailErrorOutline;

  @override
  void initState() {
    _emailController = TextEditingController();
    _showEmailErrorOutline = ValueNotifier(false);
    super.initState();
    _emailController.addListener(_clearErrorOnType);
  }

  void _clearErrorOnType() {
    if (_showEmailErrorOutline.value && AppValidators.validateEmail(_emailController.text, context) == null) {
      _showEmailErrorOutline.value = false;
    }
  }

  @override
  void dispose() {
    _emailController
      ..removeListener(_clearErrorOnType)
      ..dispose();
    _showEmailErrorOutline.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<ForgotPasswordCubit, ForgotPasswordState>(
      listener: (context, state) async {
        if (state is ForgotPasswordFailure) {
          if (!context.mounted) return;
          await CommonDialog.alert(
            context,
            title: context.l10n.error,
            message: state.message,
          );
        } else if (state is ForgotPasswordSuccess) {
          if (!context.mounted) return;
          await CommonDialog.alert(
            context,
            title: context.l10n.checkEmail,
            message: context.l10n.passwordResetSent,
          );
          if (!context.mounted) return;
          Navigator.of(context).pop();
        }
      },
      builder: (context, state) {
        final isLoading = state is ForgotPasswordLoading;
        return AbsorbPointer(
          absorbing: isLoading,
          child: Scaffold(
            backgroundColor: context.colorScheme.surface,
            appBar: CommonAppBar(
              leading: LeadingButton(
                icon: Icons.arrow_back_ios,
                onPressed: () {
                  context.pop();
                },
              ),
              backgroundColor: context.themeService.transparent,
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
                  Text(
                    context.l10n.forgotPassword,
                    style: context.headline24(fontWeight: FontWeight.bold),
                  ),
                  Gap.small8,
                  Text(
                    context.l10n.enterEmailReset,
                    style: context.bodyMedium14(color: context.colorScheme.onSurfaceVariant),
                  ),
                  Gap.large24,
                  ValueListenableBuilder<bool>(
                    valueListenable: _showEmailErrorOutline,
                    builder: (context, hasError, child) {
                      return EmailFormField(
                        title: context.l10n.email,
                        controller: _emailController,
                        hintText: 'user@example.com',
                        hintTextColor: context.themeService.hintTextColor,
                        autovalidateMode: AutovalidateMode.disabled,
                        hasError: hasError,
                      );
                    },
                  ),
                  const Spacer(),
                  ListenableBuilder(
                    listenable: _emailController,
                    builder: (context, child) {
                      final isEmailFilled = _emailController.text.trim().isNotEmpty;
                      return CommonButton.primary(
                        label: context.l10n.sendVerificationLink,
                        isLoading: isLoading,
                        backgroundColor: isEmailFilled ? null : context.themeService.commonButtonColor,
                        onPressed: _submit,
                      );
                    },
                  ),
                  const RelativeGap(mainAxisExtent: 0.02),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Future<void> _submit() async {
    final emailError = AppValidators.validateEmail(_emailController.text, context);
    if (emailError != null) {
      _showEmailErrorOutline.value = true;
      final emailDialogTitle = emailError == context.l10n.errorInvalidEmailAddress ? context.l10n.validEmailAddressRequired : context.l10n.error;
      await CommonDialog.alert(
        context,
        title: emailDialogTitle,
        message: emailError,
      );
      return;
    }

    if (!mounted) return;
    FocusScope.of(context).unfocus();

    await context.read<ForgotPasswordCubit>().forgotPassword(
          email: _emailController.text.trim(),
        );
  }
}
