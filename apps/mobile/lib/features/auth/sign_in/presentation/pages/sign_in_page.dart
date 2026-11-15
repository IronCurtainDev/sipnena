import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class SignInPage extends StatelessWidget {
  const SignInPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => getIt<LoginCubit>(),
      child: const SignInView(),
    );
  }
}

class SignInView extends StatefulWidget {
  const SignInView({super.key});

  @override
  State<SignInView> createState() => _SignInViewState();
}

class _SignInViewState extends State<SignInView> {
  late final TextEditingController _emailController;
  late final TextEditingController _passwordController;

  @override
  void initState() {
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<LoginCubit, LoginState>(
      listener: (context, state) async {
        if (state is LoginFailure) {
          await CommonDialog.alert(
            context,
            title: context.l10n.signInFailed,
            message: state.message,
            alignContentWithButton: true,
          );
        } else if (state is LoginSuccess) {
          // Notify global auth bloc that session was established
          getIt<AuthBloc>().add(AuthSessionEstablished(state.session));
        }
      },
      builder: (context, state) {
        final isLoading = state is LoginLoading;
        final hasError = state is LoginFailure;
        return AbsorbPointer(
          absorbing: isLoading,
          child: Scaffold(
            backgroundColor: context.colorScheme.surface,
            appBar: CommonAppBar(
              leading: LeadingButton(
                icon: Icons.arrow_back_ios,
                onPressed: () {
                  Pages.intro.go(context);
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
                    context.l10n.signIn,
                    style: context.headline24(fontWeight: FontWeight.bold),
                  ),
                  Gap.extraSmall4,
                  Text(
                    context.l10n.enterEmailHint,
                    style: context.bodyMedium14(color: context.colorScheme.onSurfaceVariant),
                  ),
                  Gap.large24,
                  EmailFormField(
                    key: AppTestKeys.signInEmail,
                    title: context.l10n.email,
                    controller: _emailController,
                    hintText: 'user@example.com',
                    hintTextColor: context.themeService.hintTextColor,
                    autovalidateMode: AutovalidateMode.disabled,
                    hasError: hasError,
                    onChanged: (_) => context.read<LoginCubit>().reset(),
                  ),
                  Gap.medium16,
                  PasswordFormField(
                    key: AppTestKeys.signInPassword,
                    title: context.l10n.password,
                    controller: _passwordController,
                    hintTextColor: context.themeService.hintTextColor,
                    hintText: '• • • • • • • •',
                    autovalidateMode: AutovalidateMode.disabled,
                    hasError: hasError,
                    onChanged: (_) => context.read<LoginCubit>().reset(),
                  ),
                  Align(
                    alignment: Alignment.centerRight,
                    child: CommonButton.text(
                      onPressed: () {
                        Pages.forgotPassword.go(context);
                      },
                      label: context.l10n.forgotPasswordQuestion,
                      textStyle: context.bodyRegular14(
                        fontWeight: FontWeight.w600,
                        color: context.colorScheme.primary,
                      ),
                    ),
                  ),
                  const Spacer(),
                  ListenableBuilder(
                    listenable: Listenable.merge([_emailController, _passwordController]),
                    builder: (context, child) {
                      final isFormFilled = AppValidators.validateEmail(_emailController.text, context) == null &&
                          AppValidators.validatePassword(_passwordController.text, context) == null;
                      return CommonButton.primary(
                        key: AppTestKeys.signInSubmit,
                        label: context.l10n.signIn,
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
                      Text(
                        context.l10n.dontHaveAccount,
                        style: context.bodyMedium14(),
                      ),
                      CommonButton.text(
                        onPressed: () {
                          Pages.signUp.go(context);
                        },
                        padding: EdgeInsets.zero,
                        label: context.l10n.introSignUp,
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

    if (!context.mounted) return;
    await context.read<LoginCubit>().login(
          email: _emailController.text,
          password: _passwordController.text,
        );
  }
}
