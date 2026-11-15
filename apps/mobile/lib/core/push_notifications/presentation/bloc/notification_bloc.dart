import 'dart:async';
import 'dart:convert';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/core/core.dart';

export 'notification_event.dart';
export 'notification_state.dart';

/// BLoC responsible for orchestrating push notification events,
/// managing foreground local display, and dispatching navigation states.
class NotificationBloc extends Bloc<NotificationEvent, NotificationState> {
  NotificationBloc({
    required InitializePushNotificationsUseCase initializePushNotificationsUseCase,
    required ShowLocalNotificationUseCase showLocalNotificationUseCase,
    required UpdateAppBadgeCountUseCase updateAppBadgeCountUseCase,
    required IPushNotificationRepository pushNotificationRepository,
    required ILocalNotificationRepository localNotificationRepository,
  })  : _initializePushNotificationsUseCase = initializePushNotificationsUseCase,
        _showLocalNotificationUseCase = showLocalNotificationUseCase,
        _updateAppBadgeCountUseCase = updateAppBadgeCountUseCase,
        _pushNotificationRepository = pushNotificationRepository,
        _localNotificationRepository = localNotificationRepository,
        super(const NotificationInitial()) {
    on<NotificationStarted>(_onStarted);
    on<RemoteMessageReceived>(_onRemoteMessageReceived);
    on<NotificationTapped>(_onNotificationTapped);
  }

  final InitializePushNotificationsUseCase _initializePushNotificationsUseCase;
  final ShowLocalNotificationUseCase _showLocalNotificationUseCase;
  final UpdateAppBadgeCountUseCase _updateAppBadgeCountUseCase;
  final IPushNotificationRepository _pushNotificationRepository;
  final ILocalNotificationRepository _localNotificationRepository;

  final List<StreamSubscription<dynamic>> _subscriptions = [];

  Future<void> _onStarted(
    NotificationStarted event,
    Emitter<NotificationState> emit,
  ) async {
    // 1. Initialize remote repository
    await _initializePushNotificationsUseCase();

    // 2. Initialize local notification repository with tap listener
    await _localNotificationRepository.initialize(
      onNotificationResponse: (payload) {
        if (payload == null || payload.isEmpty) return;
        try {
          final decoded = jsonDecode(payload);
          if (decoded is Map<String, dynamic>) {
            final uuid = decoded['uuid'] ?? decoded['notification_uuid'] ?? decoded['notificationUuid'];
            add(NotificationTapped(uuid: uuid?.toString(), data: decoded));
            return;
          }
        } catch (_) {}
        add(NotificationTapped(data: {'payload': payload}));
      },
    );

    // 3. Clear app icon badge count when opening the app
    unawaited(_updateAppBadgeCountUseCase(0));

    // 4. Listen for incoming foreground push notifications
    _subscriptions
      ..add(
        _pushNotificationRepository.onMessageReceived.listen((message) {
          add(RemoteMessageReceived(message));
        }),
      )

      // 4. Listen for background remote notification taps
      ..add(
        _pushNotificationRepository.onMessageOpened.listen((message) {
          add(NotificationTapped(uuid: message.uuid, data: message.data));
        }),
      );

    // 5. Inspect cold-start from remote push
    final initialRemote = await _pushNotificationRepository.getInitialMessage();
    if (initialRemote != null) {
      add(NotificationTapped(uuid: initialRemote.uuid, data: initialRemote.data));
    }

    // 6. Inspect cold-start from local notification
    final initialLocal = await _localNotificationRepository.getInitialPayload();
    if (initialLocal != null && initialLocal.isNotEmpty) {
      try {
        final decoded = jsonDecode(initialLocal);
        if (decoded is Map<String, dynamic>) {
          final uuid = decoded['uuid'] ?? decoded['notification_uuid'] ?? decoded['notificationUuid'];
          add(NotificationTapped(uuid: uuid?.toString(), data: decoded));
        } else {
          add(NotificationTapped(data: {'payload': initialLocal}));
        }
      } catch (_) {
        add(NotificationTapped(data: {'payload': initialLocal}));
      }
    }

    emit(const NotificationActive());
  }

  Future<void> _onRemoteMessageReceived(
    RemoteMessageReceived event,
    Emitter<NotificationState> emit,
  ) async {
    // Present local heads-up notification on Android
    await _showLocalNotificationUseCase(event.message);
    emit(NotificationActive(lastMessage: event.message));
  }

  void _onNotificationTapped(
    NotificationTapped event,
    Emitter<NotificationState> emit,
  ) {
    emit(NotificationNavigating(uuid: event.uuid, data: event.data));
    emit(const NotificationActive());
  }

  @override
  Future<void> close() async {
    for (final subscription in _subscriptions) {
      await subscription.cancel();
    }
    _subscriptions.clear();
    return super.close();
  }
}
