import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/core/connectivity/connectivity.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/l10n/gen/app_localizations.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  void initState() {
    // Trigger initial auth check
    GetIt.instance<AuthBloc>().add(const AuthCheckRequested());
    // Trigger push notification initialization and cold start checks
    if (GetIt.instance.isRegistered<NotificationBloc>()) {
      GetIt.instance<NotificationBloc>().add(const NotificationStarted());
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final authListener = BlocListener<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state is AuthUnauthenticated && state.message != null) {
          final router = GetIt.instance<AppRouter>();
          final navContext = router.navigatorKey.currentContext;

          if (navContext != null && navContext.mounted) {
            navContext.showErrorSnackBar(state.message!);
          }
        }
        GetIt.instance<AppRouter>().goRouter.refresh();
      },
      child: Builder(
        builder: (context) {
          return BlocListener<ThemeCubit, ThemeState>(
            listener: (context, themeState) {
              ThemeService.setSystemUIOverlayStyle(isDark: themeState.isDark);
            },
            child: BlocBuilder<ThemeCubit, ThemeState>(
              builder: (context, themeState) {
                final themeCubit = context.read<ThemeCubit>();
                return MaterialApp.router(
                  debugShowCheckedModeBanner: false,
                  onGenerateTitle: (context) => context.l10n.appName,
                  theme: themeCubit.lightTheme,
                  darkTheme: themeCubit.darkTheme,
                  themeMode: themeCubit.themeMode,
                  routerConfig: GetIt.instance<AppRouter>().goRouter,
                  localizationsDelegates: AppLocalizations.localizationsDelegates,
                  supportedLocales: AppLocalizations.supportedLocales,
                  builder: (context, child) => SafeArea(
                    bottom: Theme.of(context).platform != TargetPlatform.iOS,
                    top: false,
                    child: OverlayUtility(
                      child: ConnectivityOverlay(child: child ?? const SizedBox()),
                    ),
                  ),
                  // showPerformanceOverlay: true,
                );
              },
            ),
          );
        },
      ),
    );

    return MultiBlocProvider(
      providers: [
        BlocProvider.value(value: GetIt.instance<ThemeCubit>()),
        BlocProvider.value(value: GetIt.instance<AuthBloc>()),
        BlocProvider(create: (_) => GetIt.instance<ConnectivityCubit>()),
        if (GetIt.instance.isRegistered<NotificationBloc>()) BlocProvider.value(value: GetIt.instance<NotificationBloc>()),
      ],
      child: GetIt.instance.isRegistered<NotificationBloc>()
          ? BlocListener<NotificationBloc, NotificationState>(
              listener: (context, state) {
                if (state is NotificationNavigating) {
                  GetIt.instance<NotificationNavigationHandler>().handle(
                    state.uuid,
                    state.data,
                  );
                }
              },
              child: authListener,
            )
          : authListener,
    );
  }
}
