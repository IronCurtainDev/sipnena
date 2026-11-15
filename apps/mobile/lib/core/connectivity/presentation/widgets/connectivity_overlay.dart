import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/core/auth_core/presentation/bloc/auth/auth_bloc.dart';
import 'package:react_hono_flutter_template/core/connectivity/presentation/bloc/connectivity_cubit.dart';
import 'package:react_hono_flutter_template/core/connectivity/presentation/widgets/no_internet_screen_view.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// A widget that presents a full-screen offline overlay when the device is
/// offline and the app has finished initializing.
class ConnectivityOverlay extends StatelessWidget {
  const ConnectivityOverlay({required this.child, super.key});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final settings = GetIt.instance<AppSettings>();

    if (!settings.showOfflineOverlay) {
      return child;
    }

    final isInitialized = context.select<AuthBloc, bool>(
      (bloc) => bloc.state.isInitialized,
    );
    final isOffline = context.select<ConnectivityCubit, bool>(
      (cubit) => cubit.state is ConnectivityOffline,
    );

    final showOffline = isInitialized && isOffline;

    return Stack(
      fit: StackFit.expand,
      children: [
        Offstage(
          offstage: showOffline,
          child: child,
        ),
        if (showOffline)
          const Positioned.fill(
            child: NoInternetScreenView(),
          ),
      ],
    );
  }
}
