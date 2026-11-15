import 'package:flutter/material.dart';
import 'package:react_hono_flutter_template/app/app.dart';
import 'package:react_hono_flutter_template/bootstrap.dart';
import 'package:react_hono_flutter_template/features/features.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// The prefix for shell routes. Use this constant wherever the home path prefix is needed.
const String homeRoutePrefix = '/shell';

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>();

class AppRouter {
  AppRouter({AppRoutePolicy? routePolicy}) : _routePolicy = routePolicy ?? getIt<AppRoutePolicy>();

  final AppRoutePolicy _routePolicy;

  GoRouter get goRouter => _goRouter;
  GlobalKey<NavigatorState> get navigatorKey => _rootNavigatorKey;

  late final GoRouter _goRouter = GoRouter(
    initialLocation: Pages.splash.toPath(),
    overridePlatformDefaultLocation: true,
    navigatorKey: _rootNavigatorKey,

    /// Enable debug logging for diagnostics.
    debugLogDiagnostics: true,
    routes: [
      GoRoute(
        path: Pages.splash.toPath(),
        name: Pages.splash.toPathName(),
        pageBuilder: (context, state) => const MaterialPage(child: SplashPage()),
      ),
      GoRoute(
        path: Pages.intro.toPath(),
        name: Pages.intro.toPathName(),
        pageBuilder: (context, state) => MaterialPage(
          key: state.pageKey,
          child: const IntroPage(),
        ),
        routes: [
          GoRoute(
            path: Pages.signIn.toPath(isSubRoute: true),
            name: Pages.signIn.toPathName(),
            pageBuilder: (context, state) => MaterialPage(
              key: state.pageKey,
              child: const SignInPage(),
            ),
            routes: [
              GoRoute(
                path: Pages.forgotPassword.toPath(isSubRoute: true),
                name: Pages.forgotPassword.toPathName(),
                pageBuilder: (context, state) => MaterialPage(
                  key: state.pageKey,
                  child: const ForgotPasswordPage(),
                ),
              ),
            ],
          ),
          GoRoute(
            path: Pages.signUp.toPath(isSubRoute: true),
            name: Pages.signUp.toPathName(),
            pageBuilder: (context, state) => MaterialPage(
              key: state.pageKey,
              child: const SignUpPage(),
            ),
          ),
        ],
      ),
      GoRoute(
        path: Pages.verify.toPath(),
        name: Pages.verify.toPathName(),
        pageBuilder: (context, state) => MaterialPage(
          key: state.pageKey,
          child: const CodeVerificationPage(),
        ),
      ),
      GoRoute(
        path: Pages.tutorials.toPath(),
        name: Pages.tutorials.toPathName(),
        pageBuilder: (context, state) => MaterialPage(
          key: state.pageKey,
          child: const TutorialPage(),
        ),
      ),
      GoRoute(
        path: Pages.completeAccount.toPath(),
        name: Pages.completeAccount.toPathName(),
        pageBuilder: (context, state) => MaterialPage(
          key: state.pageKey,
          child: const OnboardingFlow(),
        ),
      ),
      StatefulShellRoute.indexedStack(
        builder: (context, state, statefulNavigationShell) => ShellController(
          navigationShell: statefulNavigationShell,
        ),
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: Pages.home.toPath(pathPrefix: homeRoutePrefix),
                name: Pages.home.toPathName(),
                pageBuilder: (context, state) => NoTransitionPage(
                  key: state.pageKey,
                  child: const StarterPlaceholderPage(title: 'Home'),
                ),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: Pages.chat.toPath(pathPrefix: homeRoutePrefix),
                name: Pages.chat.toPathName(),
                pageBuilder: (context, state) => NoTransitionPage(
                  key: state.pageKey,
                  child: const StarterPlaceholderPage(title: 'Chat'),
                ),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: Pages.explore.toPath(pathPrefix: homeRoutePrefix),
                name: Pages.explore.toPathName(),
                pageBuilder: (context, state) => NoTransitionPage(
                  key: state.pageKey,
                  child: const StarterPlaceholderPage(title: 'Explore'),
                ),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: Pages.more.toPath(pathPrefix: homeRoutePrefix),
                name: Pages.more.toPathName(),
                pageBuilder: (context, state) => NoTransitionPage(
                  key: state.pageKey,
                  child: const MorePage(),
                ),
                routes: [
                  GoRoute(
                    path: Pages.account.toPath(isSubRoute: true),
                    name: Pages.account.toPathName(),
                    parentNavigatorKey: _rootNavigatorKey,
                    pageBuilder: (context, state) => MaterialPage(
                      key: state.pageKey,
                      child: const AccountPage(),
                    ),
                    routes: [
                      GoRoute(
                        path: Pages.editAccount.toPath(isSubRoute: true),
                        name: Pages.editAccount.toPathName(),
                        parentNavigatorKey: _rootNavigatorKey,
                        pageBuilder: (context, state) => MaterialPage(
                          key: state.pageKey,
                          child: const EditAccountPage(),
                        ),
                      ),
                      GoRoute(
                        path: Pages.changePassword.toPath(isSubRoute: true),
                        name: Pages.changePassword.toPathName(),
                        parentNavigatorKey: _rootNavigatorKey,
                        pageBuilder: (context, state) => MaterialPage(
                          key: state.pageKey,
                          child: const ChangePasswordPage(),
                        ),
                        routes: [
                          GoRoute(
                            path: Pages.forgotPasswordChange.toPath(isSubRoute: true),
                            name: Pages.forgotPasswordChange.toPathName(),
                            parentNavigatorKey: _rootNavigatorKey,
                            pageBuilder: (context, state) => MaterialPage(
                              key: state.pageKey,
                              child: const ForgotPasswordPage(),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  GoRoute(
                    path: Pages.settings.toPath(isSubRoute: true),
                    name: Pages.settings.toPathName(),
                    parentNavigatorKey: _rootNavigatorKey,
                    pageBuilder: (context, state) => MaterialPage(
                      key: state.pageKey,
                      child: const SettingsPage(),
                    ),
                    routes: [
                      GoRoute(
                        path: Pages.permissionSettings.toPath(isSubRoute: true),
                        name: Pages.permissionSettings.toPathName(),
                        parentNavigatorKey: _rootNavigatorKey,
                        pageBuilder: (context, state) => MaterialPage(
                          key: state.pageKey,
                          child: const PermissionSettingsPage(),
                        ),
                      ),
                    ],
                  ),
                  GoRoute(
                    path: Pages.terms.toPath(isSubRoute: true),
                    name: Pages.terms.toPathName(),
                    parentNavigatorKey: _rootNavigatorKey,
                    pageBuilder: (context, state) => MaterialPage(
                      key: state.pageKey,
                      child: const LegalContentPage(
                        type: LegalContentType.termsAndConditions,
                      ),
                    ),
                  ),
                  GoRoute(
                    path: Pages.privacy.toPath(isSubRoute: true),
                    name: Pages.privacy.toPathName(),
                    parentNavigatorKey: _rootNavigatorKey,
                    pageBuilder: (context, state) => MaterialPage(
                      key: state.pageKey,
                      child: const LegalContentPage(
                        type: LegalContentType.privacyPolicy,
                      ),
                    ),
                  ),
                  GoRoute(
                    path: Pages.about.toPath(isSubRoute: true),
                    name: Pages.about.toPathName(),
                    parentNavigatorKey: _rootNavigatorKey,
                    pageBuilder: (context, state) => MaterialPage(
                      key: state.pageKey,
                      child: const LegalContentPage(
                        type: LegalContentType.aboutUs,
                      ),
                    ),
                  ),
                  GoRoute(
                    path: Pages.notification.toPath(isSubRoute: true),
                    name: Pages.notification.toPathName(),
                    parentNavigatorKey: _rootNavigatorKey,
                    pageBuilder: (context, state) => MaterialPage(
                      key: state.pageKey,
                      child: const NotificationListPage(),
                    ),
                    routes: [
                      GoRoute(
                        path: Pages.notificationDetails.toPath(isSubRoute: true),
                        name: Pages.notificationDetails.toPathName(),
                        parentNavigatorKey: _rootNavigatorKey,
                        pageBuilder: (context, state) {
                          final extra = state.extra;
                          NotificationItem? initialNotification;
                          String? uuid;
                          String? title;
                          String? time;
                          String? description;

                          if (extra is NotificationItem) {
                            initialNotification = extra;
                            uuid = extra.uuid;
                            title = extra.title;
                            time = extra.displayTime;
                            description = extra.message;
                          } else if (extra is Map<String, dynamic>) {
                            uuid = extra['uuid'] as String?;
                            title = extra['title'] as String?;
                            time = extra['time'] as String?;
                            description = extra['description'] as String?;
                          }

                          return MaterialPage(
                            key: state.pageKey,
                            child: NotificationDetailsPage(
                              uuid: uuid,
                              initialNotification: initialNotification,
                              title: title,
                              time: time,
                              description: description,
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                  GoRoute(
                    path: Pages.contact.toPath(isSubRoute: true),
                    name: Pages.contact.toPathName(),
                    parentNavigatorKey: _rootNavigatorKey,
                    pageBuilder: (context, state) => MaterialPage(
                      key: state.pageKey,
                      child: const ContactUsPage(),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
    redirect: (context, state) {
      final currentState = _routePolicy.determineAuthState();

      final termsPath = state.namedLocation(Pages.terms.toPathName());
      final privacyPath = state.namedLocation(Pages.privacy.toPathName());

      // Keep legal pages accessible before authentication.
      if (currentState == AppRouteAuthState.notLoggedIn && (state.matchedLocation == termsPath || state.matchedLocation == privacyPath)) {
        return null;
      }

      // Define routing rules map
      final routingRules = {
        AppRouteAuthState.notInitialized: Pages.splash,
        AppRouteAuthState.notLoggedIn: Pages.intro,
        AppRouteAuthState.notVerified: Pages.verify,
        AppRouteAuthState.notCompleted: Pages.completeAccount,
        AppRouteAuthState.isGoingToTutorial: Pages.tutorials,
        AppRouteAuthState.authenticated: Pages.home,
      };

      // Get target page for current auth state
      final targetPage = routingRules[currentState] ?? Pages.splash;

      // For authenticated state, only check if path starts with homePrefix
      // For other states, ensure exact path match
      if (currentState == AppRouteAuthState.authenticated) {
        if (!state.matchedLocation.startsWith(homeRoutePrefix)) {
          final targetPath = state.namedLocation(targetPage.toPathName());
          return targetPath;
        }
      } else {
        final targetPath = state.namedLocation(targetPage.toPathName());
        if (!state.matchedLocation.startsWith(targetPath)) {
          return targetPath;
        }
      }

      return null;
    },
  );
}

enum AppRouteAuthState {
  notInitialized,
  notLoggedIn,
  notVerified,
  notCompleted,
  isGoingToTutorial,
  authenticated,
}
