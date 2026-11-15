import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    WidgetsBinding.instance.addPostFrameCallback((_) => init());
    super.initState();
  }

  /// Initializes the application.
  ///
  /// This method checks for an existing session, fetches the user profile,
  /// and sets up the initial application state.
  Future<void> init() async {
    FlutterNativeSplash.remove();

    // ========================================================================
    // GUIDELINES:
    // 1. AuthRefreshRequested triggers the RefreshSessionUseCase.
    // 2. The use case checks for stored session and fetches profile from API.
    // 3. If successful, AuthBloc emits AuthAuthenticated.
    // 4. If failed (no session or API error), AuthBloc emits AuthUnauthenticated.
    // ========================================================================

    // Ensure a pleasant minimum splash display time concurrently with auth check
    final splashDelay = Future<void>.delayed(const Duration(milliseconds: 1500));

    final authBloc = getIt<AuthBloc>();
    Future<void> checkAuth() async {
      if (authBloc.state is AuthInitial || authBloc.state is AuthLoading) {
        authBloc.add(const AuthRefreshRequested());
        await authBloc.stream.firstWhere(
          (state) => state is AuthAuthenticated || state is AuthUnauthenticated,
        );
      }
    }

    await Future.wait([splashDelay, checkAuth()]);

    if (!mounted) return;
    getIt<AppRoutePolicy>().markSplashCompleted();
    GetIt.instance<AppRouter>().goRouter.refresh();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Padding(
              padding: EdgeInsets.all(16),
              child: AppLogo(aspectRatio: 2.5),
            ),
            Gap.medium16,
            BlocBuilder<AuthBloc, AuthState>(
              bloc: getIt<AuthBloc>(),
              builder: (context, state) {
                // if (state is AuthLoading) {
                //   return const Column(
                //     mainAxisSize: MainAxisSize.min,
                //     children: [
                //       SizedBox(
                //         width: 24,
                //         height: 24,
                //         child: CircularProgressIndicator(),
                //       ),
                //     ],
                //   );
                // }
                return const SizedBox.shrink();
              },
            ),
          ],
        ),
      ),
    );
  }
}
