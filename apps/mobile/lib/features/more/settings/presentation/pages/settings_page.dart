import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/more/settings/presentation/bloc/bloc.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  Future<void> _onDeleteAccountPressed(BuildContext context) async {
    final deleteAccountCubit = context.read<DeleteAccountCubit>();

    if (deleteAccountCubit.state is DeleteAccountLoading) {
      return;
    }

    final confirmed = await CommonDialog.confirm(
      context,
      title: context.l10n.deleteAccount,
      message: context.l10n.deleteAccountConfirmMessage,
      confirmText: context.l10n.deleteAction,
      cancelText: context.l10n.cancel,
      isDangerous: true,
    );

    if (!confirmed || !mounted) {
      return;
    }

    await deleteAccountCubit.deleteAccount();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<DeleteAccountCubit>(),
      child: BlocConsumer<DeleteAccountCubit, DeleteAccountState>(
        listener: (context, state) {
          if (state is DeleteAccountFailure) {
            context.showErrorSnackBar(state.message);
            return;
          }

          if (state is DeleteAccountSuccess) {
            context.showSuccessSnackBar('Account deleted successfully');
            context.read<AuthBloc>().add(const AuthLogoutRequested());
          }
        },
        builder: (context, state) {
          final isDeleting = state is DeleteAccountLoading;
          final isDark = context.watch<ThemeCubit>().state.isDark;

          return Scaffold(
            appBar: CommonAppBar(
              title: Text(
                context.l10n.appSettings,
                style: context.headline16(
                  fontWeight: FontWeight.w700,
                  color: context.themeService.commonTextColor,
                ),
              ),
            ),
            body: ExtendedColumn(
              children: [
                Gap.medium16,
                MoreMenuButton(
                  title: context.l10n.deleteAccount,
                  icon: AppImages.delete,
                  color: context.themeService.coralColor,
                  textColor: context.themeService.coralColor,
                  onPressed: () => _onDeleteAccountPressed(context),
                ),
                Gap.medium12,
                MoreMenuButton(
                  title: context.l10n.permissionSettingsTitle,
                  icon: AppImages.key,
                  onPressed: () {
                    if (!isDeleting) {
                      Pages.permissionSettings.go(context);
                    }
                  },
                ),
                Gap.medium12,
                MoreMenuButton(
                  title: 'Change Theme to ${isDark ? 'Light' : 'Dark'} Mode',
                  iconData: isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
                  color: context.colorScheme.primary,
                  onPressed: () {
                    context.read<ThemeCubit>().toggle();
                    log('App theme is switched to the mode ${!isDark ? 'Light' : 'Dark'}');
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
