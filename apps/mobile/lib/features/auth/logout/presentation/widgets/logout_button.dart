import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/app/app_test_keys.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/auth/logout/presentation/bloc/logout_state.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class LogoutButton extends StatelessWidget {
  const LogoutButton({
    super.key,
    this.label,
    this.isIcon = false,
    this.backgroundColor,
  });

  final String? label;
  final bool isIcon;
  final Color? backgroundColor;

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      key: AppTestKeys.logout,
      create: (context) => GetIt.instance<LogoutCubit>(),
      child: BlocConsumer<LogoutCubit, LogoutState>(
        listener: (context, state) {
          if (state is LogoutFailure) {
            context.showErrorSnackBar(state.message);
          } else if (state is LogoutSuccess) {
            Future.delayed(const Duration(milliseconds: 500), () {
              if (context.mounted) {
                context.read<AuthBloc>().add(const AuthLogoutRequested());
              }
            });
          }
        },
        builder: (context, state) {
          final authState = context.read<AuthBloc>().state;
          final token = authState is AuthAuthenticated ? authState.session.accessToken : '';

          final VoidCallback? onPressed = state is LogoutLoading
              ? null
              : () async {
                  final confirmed = await CommonDialog.confirm(
                    context,
                    title: context.l10n.logoutConfirmTitle,
                    message: context.l10n.logoutConfirmMessage,
                    isDangerous: true,
                  );
                  if (confirmed && context.mounted) {
                    await context.read<LogoutCubit>().logout(token: token);
                  }
                };

          if (isIcon) {
            return GestureDetector(
              onTap: onPressed,
              child: Container(
                width: AppSpacing.iconButton44,
                height: AppSpacing.iconButton44,
                decoration: BoxDecoration(
                  color: backgroundColor ?? context.themeService.whiteColor,
                  borderRadius: AppRadius.large16,
                ),
                child: state is LogoutLoading
                    ? const CommonCircularLoader().paddingAll(AppSpacing.md12)
                    : const CommonImage(
                        url: AppImages.logout,
                        width: AppSpacing.md16,
                        height: AppSpacing.md16,
                      ).paddingAll(AppSpacing.md12),
              ),
            );
          }

          return CommonButton.outline(
            label: label ?? context.l10n.logout,
            onPressed: onPressed,
            isLoading: state is LogoutLoading,
          );
        },
      ),
    );
  }
}
