import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/app/app_test_keys.dart';
import 'package:react_hono_flutter_template/features/features.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class MorePage extends StatelessWidget {
  const MorePage({super.key});

  @override
  Widget build(BuildContext context) {
    void logout() {
      context.read<AuthBloc>().add(const AuthLogoutRequested());
    }

    final primaryColor = context.colorScheme.primary;

    return Scaffold(
      appBar: const CommonAppBar(
        title: 'More',
        showBackButton: false,
      ),
      body: ExtendedColumn(
        children: [
          Gap.large24,
          MoreMenuButton(
            title: 'Account',
            icon: AppImages.profile,
            color: primaryColor,
            onPressed: () => Pages.account.go(context),
          ),
          Gap.medium12,
          MoreMenuButton(
            title: context.l10n.termsConditions,
            icon: AppImages.terms,
            color: primaryColor,
            onPressed: () => Pages.terms.go(context),
          ),
          Gap.medium12,
          MoreMenuButton(
            title: context.l10n.privacyPolicy,
            icon: AppImages.privacy,
            color: primaryColor,
            onPressed: () => Pages.privacy.go(context),
          ),
          Gap.medium12,
          MoreMenuButton(
            title: context.l10n.aboutUs,
            icon: AppImages.about,
            color: primaryColor,
            onPressed: () => Pages.about.go(context),
          ),
          Gap.medium12,
          MoreMenuButton(
            key: AppTestKeys.contactMenu,
            title: context.l10n.contactUs,
            icon: AppImages.contact,
            color: primaryColor,
            onPressed: () => Pages.contact.go(context),
          ),
          Gap.medium12,
          MoreMenuButton(
            title: context.l10n.notificationsTitle,
            icon: AppImages.notification,
            color: primaryColor,
            onPressed: () => Pages.notification.push(context),
          ),
          Gap.medium12,
          MoreMenuButton(
            title: context.l10n.appSettings,
            icon: AppImages.settings,
            color: primaryColor,
            onPressed: () => Pages.settings.go(context),
          ),
          Gap.doubleLarge40,
          MoreMenuButton(
            key: AppTestKeys.logout,
            title: context.l10n.logOut,
            textColor: context.themeService.coralColor,
            icon: AppImages.logout,
            color: context.themeService.coralColor,
            onPressed: () async {
              final confirmed = await CommonDialog.confirm(
                context,
                title: context.l10n.logoutConfirmTitle,
                message: context.l10n.logoutConfirmMessage,
                isDangerous: true,
              );
              if (confirmed) {
                logout();
              }
            },
          ),
          Gap.extraLarge32,
        ],
      ),
    );
  }
}
