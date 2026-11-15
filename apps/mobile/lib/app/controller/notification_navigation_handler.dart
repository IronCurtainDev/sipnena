import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:react_hono_flutter_template/app/controller/router.dart';
import 'package:react_hono_flutter_template/core/auth_core/presentation/bloc/auth/auth_bloc.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

class NotificationNavigationHandler {
  const NotificationNavigationHandler(
    this._appRouter,
    this._authBloc,
  );

  final AppRouter _appRouter;
  final AuthBloc _authBloc;

  /// Handles notification taps for the starter application:
  /// Navigates to NotificationDetailsPage if a UUID is present,
  /// or NotificationListPage by default.
  Future<void> handle(String? notificationUuid, [Map<String, dynamic>? data]) async {
    debugPrint(
      'Notification opened (app brought to foreground). '
      'uuid: $notificationUuid, data: $data',
    );

    if (!_authBloc.state.isAuthenticated) return;

    if (notificationUuid != null && notificationUuid.isNotEmpty) {
      unawaited(
        _appRouter.goRouter.pushNamed(
          Pages.notificationDetails.toPathName(),
          extra: {
            'uuid': notificationUuid,
            ...?data,
          },
        ),
      );
      return;
    }

    // Default: navigate to NotificationListPage
    unawaited(
      _appRouter.goRouter.pushNamed(
        Pages.notification.toPathName(),
      ),
    );
  }

  @visibleForTesting
  bool get isAuthenticated => _authBloc.state.isAuthenticated;

  @visibleForTesting
  AppRouter get appRouter => _appRouter;

  @visibleForTesting
  AuthBloc get authBloc => _authBloc;
}
