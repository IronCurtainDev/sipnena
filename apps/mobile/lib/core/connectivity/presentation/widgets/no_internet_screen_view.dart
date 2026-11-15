import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:react_hono_flutter_template/core/connectivity/presentation/bloc/connectivity_cubit.dart';
import 'package:react_hono_flutter_template/core/connectivity/presentation/widgets/no_internet_badge.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Full-screen declarative offline screen view matching Figma design 2.3.1.
/// Displays a solid opaque backdrop, centered [NoInternetBadge], localized title &
/// description, and action buttons ("Try Again" and "Go to Settings").
class NoInternetScreenView extends StatelessWidget {
  const NoInternetScreenView({
    super.key,
    this.onRetry,
    this.onOpenSettings,
  });

  final VoidCallback? onRetry;
  final VoidCallback? onOpenSettings;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () {},
      child: ColoredBox(
        color: context.colorScheme.surface,
        child: SafeArea(
          child: Padding(
            padding: AppSpacing.horizontalLg24,
            child: Column(
              children: [
                const Spacer(),
                const NoInternetBadge(),
                Gap.extraLarge32,
                Text(
                  context.l10n.noInternetConnection,
                  style: context.headline24().bold,
                  textAlign: TextAlign.center,
                ),
                Gap.medium16,
                Text(
                  context.l10n.noInternetLostConnectionMessage,
                  style: context.bodyRegular16(
                    color: context.themeService.commonTextColor,
                  ),
                  textAlign: TextAlign.center,
                ),
                const Spacer(),
                SizedBox(
                  width: double.infinity,
                  child: CommonButton.primary(
                    onPressed: onRetry ?? () => context.read<ConnectivityCubit>().retry(),
                    label: context.l10n.tryAgain,
                  ),
                ),
                Gap.medium16,
                SizedBox(
                  width: double.infinity,
                  child: CommonButton.outline(
                    onPressed: onOpenSettings ?? openAppSettings,
                    label: context.l10n.goToSettings,
                  ),
                ),
                Gap.large24,
              ],
            ),
          ),
        ),
      ),
    );
  }
}
