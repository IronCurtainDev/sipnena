import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/presentation/widgets/widgets.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class SignUpPage extends StatelessWidget {
  const SignUpPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => getIt<SignUpCubit>(),
      child: const SignUpView(),
    );
  }
}

class SignUpView extends StatefulWidget {
  const SignUpView({super.key});

  @override
  State<SignUpView> createState() => _SignUpViewState();
}

class _SignUpViewState extends State<SignUpView> {
  late final TextEditingController _emailController;
  late final TextEditingController _passwordController;
  final ValueNotifier<bool> _isAgreed = ValueNotifier<bool>(false);

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _isAgreed.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<SignUpCubit, SignUpState>(
      listener: (context, state) async {
        if (state is SignUpFailure) {
          if (state.isEmailAlreadyRegistered) {
            final shouldSignIn = await CommonDialog.confirm(
              context,
              title: context.l10n.emailAlreadyRegisteredTitle,
              message: context.l10n.emailAlreadyRegisteredMessage,
              confirmText: context.l10n.signIn,
              cancelText: context.l10n.cancel,
              textAlign: TextAlign.start,
            );
            if (shouldSignIn && context.mounted) {
              Pages.signIn.go(context);
            }
          } else {
            await CommonDialog.alert(
              context,
              title: context.l10n.signUpFailed,
              message: state.message,
              alignContentWithButton: true,
            );
          }
        } else if (state is SignUpSuccess) {
          // Notify global auth bloc that session was established
          getIt<AuthBloc>().add(AuthSessionEstablished(state.session));
        }
      },
      builder: (context, state) {
        final isLoading = state is SignUpLoading;
        final hasError = state is SignUpFailure;
        return AbsorbPointer(
          absorbing: isLoading,
          child: Scaffold(
            backgroundColor: context.colorScheme.surface,
            appBar: CommonAppBar(
              backgroundColor: context.themeService.transparent,
              leading: LeadingButton(
                icon: Icons.arrow_back_ios,
                onPressed: () {
                  Pages.intro.go(context);
                },
              ),
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
                    context.l10n.signUpTitle,
                    style: context.headline24(fontWeight: FontWeight.bold),
                  ),
                  Gap.large24,
                  EmailFormField(
                    key: AppTestKeys.signUpEmail,
                    title: context.l10n.email,
                    controller: _emailController,
                    hintText: 'user@example.com',
                    hintTextColor: context.themeService.hintTextColor,
                    autovalidateMode: AutovalidateMode.disabled,
                    hasError: hasError,
                    onChanged: (_) => context.read<SignUpCubit>().clearError(),
                  ),
                  Gap.medium16,
                  PasswordFormField(
                    key: AppTestKeys.signUpPassword,
                    title: context.l10n.password,
                    controller: _passwordController,
                    hintText: '• • • • • • • •',
                    hintTextColor: context.themeService.hintTextColor,
                    autovalidateMode: AutovalidateMode.disabled,
                    hasError: hasError,
                    onChanged: (_) => context.read<SignUpCubit>().clearError(),
                  ),
                  Gap.large24,
                  TermsAndPrivacyCheckbox(isAgreedNotifier: _isAgreed),
                  const Spacer(),
                  ListenableBuilder(
                    listenable: Listenable.merge([_emailController, _passwordController, _isAgreed]),
                    builder: (context, child) {
                      final isFormFilled = AppValidators.validateEmail(_emailController.text, context) == null &&
                          AppValidators.validatePassword(_passwordController.text, context) == null &&
                          _isAgreed.value;

                      return CommonButton.primary(
                        key: AppTestKeys.signUpSubmit,
                        label: context.l10n.signUp,
                        isLoading: isLoading,
                        backgroundColor: isFormFilled ? null : context.themeService.commonButtonColor,
                        onPressed: _submit,
                      );
                    },
                  ),
                  Gap.medium16,
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      Text(context.l10n.alreadyHaveAccount, style: context.bodyMedium14()),
                      CommonButton.text(
                        onPressed: () => Pages.signIn.go(context),
                        padding: EdgeInsets.zero,
                        label: context.l10n.signIn,
                        textStyle: context.bodyMedium14(color: Theme.of(context).colorScheme.primary).bold,
                      ),
                    ],
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
    FocusScope.of(context).unfocus();

    if (!_isAgreed.value) {
      await CommonDialog.alert(
        context,
        title: context.l10n.error,
        message: 'Please agree to the Terms of Service and Privacy Policy.',
      );
      return;
    }

    if (!context.mounted) return;
    await context.read<SignUpCubit>().signUp(
          email: _emailController.text,
          password: _passwordController.text,
        );
  }
}
