import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:react_hono_flutter_template/core/connectivity/presentation/bloc/connectivity_cubit.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class NoInternetDialogContent extends StatelessWidget {
  const NoInternetDialogContent({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<ConnectivityCubit, ConnectivityState>(
      listenWhen: (previous, current) => previous is ConnectivityOffline && current is ConnectivityOnline,
      listener: (context, connectivityState) => Navigator.of(context).pop(),
      child: Column(
        children: [
          Text(
            context.l10n.noInternetConnectionMessage,
            textAlign: TextAlign.center,
            style: context.bodyRegular16(color: context.colorScheme.onSurface),
          ),
          Gap.large24,
          SizedBox(
            width: double.infinity,
            child: CommonButton.primary(
              onPressed: () {},
              label: context.l10n.tryAgain,
            ),
          ),
          Gap.medium16,
          SizedBox(
            width: double.infinity,
            child: CommonButton.outline(
              onPressed: openAppSettings,
              label: context.l10n.checkSettings,
            ),
          ),
        ],
      ),
    );
  }
}
