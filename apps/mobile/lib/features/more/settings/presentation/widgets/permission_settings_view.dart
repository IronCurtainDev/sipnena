import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/more/settings/presentation/bloc/bloc.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class PermissionSettingsView extends StatefulWidget {
  const PermissionSettingsView({super.key});

  @override
  State<PermissionSettingsView> createState() => _PermissionSettingsViewState();
}

class _PermissionSettingsViewState extends State<PermissionSettingsView> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed && mounted) {
      context.read<PermissionSettingsCubit>().refreshStatus();
    }
  }

  Future<void> _handleActionRequired(
    BuildContext context,
    LocationAccessActionRequired action,
    PermissionSettingsCubit cubit,
  ) async {
    switch (action) {
      case LocationAccessActionRequired.openAppSettingsToDisable:
        final confirmed = await CommonDialog.confirm(
          context,
          title: context.l10n.disableLocationPermissionTitle,
          message: context.l10n.disableLocationPermissionMessage,
          confirmText: context.l10n.settings,
          cancelText: context.l10n.cancel,
        );
        cubit.clearActionRequired();
        if (confirmed) {
          await cubit.openSettings();
        }
      case LocationAccessActionRequired.openAppSettingsToEnable:
        final confirmed = await CommonDialog.confirm(
          context,
          title: context.l10n.locationPermissionDeniedTitle,
          message: context.l10n.locationPermissionDeniedMessage,
          confirmText: context.l10n.settings,
          cancelText: context.l10n.cancel,
        );
        cubit.clearActionRequired();
        if (confirmed) {
          await cubit.openSettings();
        }
      case LocationAccessActionRequired.enableLocationServices:
        final confirmed = await CommonDialog.confirm(
          context,
          title: context.l10n.locationServiceDisabledTitle,
          message: context.l10n.locationServiceDisabledMessage,
          confirmText: context.l10n.settings,
          cancelText: context.l10n.cancel,
        );
        cubit.clearActionRequired();
        if (confirmed) {
          await cubit.openSettings(openLocationSettings: true);
        }
      case LocationAccessActionRequired.none:
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final cubit = context.read<PermissionSettingsCubit>();

    return BlocConsumer<PermissionSettingsCubit, PermissionSettingsState>(
      listenWhen: (previous, current) => previous.actionRequired != current.actionRequired,
      listener: (context, state) {
        if (state.actionRequired != LocationAccessActionRequired.none) {
          _handleActionRequired(context, state.actionRequired, cubit);
        }
      },
      builder: (context, state) {
        return Scaffold(
          appBar: CommonAppBar(
            title: Text(
              context.l10n.permissionSettingsTitle,
              style: context.headline16(
                fontWeight: FontWeight.w700,
                color: context.themeService.commonTextColor,
              ),
            ),
          ),
          body: ExtendedColumn(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg24,
              vertical: AppSpacing.md16,
            ),
            children: [
              LocationPermissionCard(
                enabled: state.isLocationActive,
                onChanged: (value) {
                  cubit.onLocationToggled(targetValue: value);
                },
              ),
              Gap.medium16,
              Text(
                context.l10n.onboardingStepThreeDescription,
                style: context.bodyRegular14(
                  color: context.themeService.hintTextColor,
                ),
              ),
              const Spacer(),
              CommonButton.outline(
                onPressed: cubit.openSettings,
                label: context.l10n.checkSettings,
              ),
              Gap.medium16,
            ],
          ),
        );
      },
    );
  }
}
