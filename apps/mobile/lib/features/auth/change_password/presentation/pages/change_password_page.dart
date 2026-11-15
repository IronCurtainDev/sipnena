import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/presentation/widgets/widgets.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class ChangePasswordPage extends StatelessWidget {
  const ChangePasswordPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<ChangePasswordCubit>(),
      child: const ChangePasswordView(),
    );
  }
}

class ChangePasswordView extends StatefulWidget {
  const ChangePasswordView({super.key});

  @override
  State<ChangePasswordView> createState() => _ChangePasswordViewState();
}

class _ChangePasswordViewState extends State<ChangePasswordView> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _currentPasswordController;
  late final TextEditingController _newPasswordController;
  late final TextEditingController _confirmPasswordController;
  @override
  void initState() {
    super.initState();
    _currentPasswordController = TextEditingController();
    _newPasswordController = TextEditingController();
    _confirmPasswordController = TextEditingController();
  }

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<ChangePasswordCubit, ChangePasswordState>(
      listener: (context, state) async {
        if (state is ChangePasswordFailure) {
          await CommonDialog.alert(
            context,
            title: context.l10n.error,
            message: state.message,
          );
          return;
        }

        if (state is ChangePasswordSuccess) {
          await CommonDialog.alert(
            context,
            title: context.l10n.passwordChangedTitle,
            message: context.l10n.passwordChangedMessage,
          );
          if (context.mounted) {
            context.pop();
          }
        }
      },
      builder: (context, state) {
        final isLoading = state is ChangePasswordLoading;
        return PopScope(
          canPop: !isLoading,
          child: AbsorbPointer(
            absorbing: isLoading,
            child: Scaffold(
              appBar: CommonAppBar(
                onBackPress: () {
                  if (isLoading) return;
                  context.pop();
                },
                title: Text(
                  context.l10n.changePassword,
                  style: context.headline16(
                    fontWeight: FontWeight.w700,
                    color: context.themeService.commonTextColor,
                  ),
                ),
              ),
              body: Form(
                key: _formKey,
                child: ExtendedColumn(
                  padding: AppSpacing.horizontalLg24,
                  children: [
                    Gap.large24,
                    Center(
                      child: Text(
                        context.l10n.changePasswordDescription,
                        textAlign: TextAlign.center,
                        style: context.bodyRegular16(
                          color: context.themeService.blackColor,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ),
                    Gap.large24,
                    PasswordFormField(
                      controller: _currentPasswordController,
                      title: context.l10n.currentPassword,
                      hintText: '•••••••••••',
                      hintTextColor: context.themeService.hintTextColor,
                      autovalidateMode: AutovalidateMode.disabled,
                    ),
                    Gap.medium16,
                    PasswordFormField(
                      controller: _newPasswordController,
                      title: context.l10n.newPassword,
                      hintText: '•••••••••••',
                      hintTextColor: context.themeService.hintTextColor,
                      autovalidateMode: AutovalidateMode.disabled,
                    ),
                    Gap.medium16,
                    PasswordFormField(
                      controller: _confirmPasswordController,
                      title: context.l10n.retypeNewPassword,
                      hintText: '•••••••••••',
                      hintTextColor: context.themeService.hintTextColor,
                      autovalidateMode: AutovalidateMode.disabled,
                    ),
                    ValueListenableBuilder<TextEditingValue>(
                      valueListenable: _newPasswordController,
                      builder: (context, value, child) {
                        if (value.text.isEmpty) return const SizedBox.shrink();
                        return Column(
                          children: [
                            Gap.medium16,
                            PasswordValidationSection(
                              controller: _newPasswordController,
                            ),
                          ],
                        );
                      },
                    ),
                    const Spacer(),
                    Center(
                      child: CommonButton.text(
                        onPressed: () {
                          Pages.forgotPasswordChange.go(context);
                        },
                        label: context.l10n.forgotPassword,
                        textStyle: context.bodyMedium14(
                          fontWeight: FontWeight.w700,
                          color: context.themeService.blackColor,
                        ),
                      ),
                    ),
                    Gap.large24,
                    CommonButton.primary(
                      onPressed: _submit,
                      label: context.l10n.changePassword,
                      isLoading: isLoading,
                    ),
                    const RelativeGap(mainAxisExtent: 0.05),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Future<void> _submit() async {
    FocusScope.of(context).unfocus();

    await context.read<ChangePasswordCubit>().changePassword(
          currentPassword: _currentPasswordController.text,
          newPassword: _newPasswordController.text,
          newPasswordConfirmation: _confirmPasswordController.text,
          isPasswordValid: PasswordValidationSection.isPasswordValid(_newPasswordController.text),
        );
  }
}
