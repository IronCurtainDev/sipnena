import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/core/pusher/internal/pusher_driver.dart';
import 'package:react_hono_flutter_template/core/pusher/internal/realtime_driver.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Clean coordinator implementation of [PusherService].
///
/// Decouples callers from native SDK mechanics by delegating transport
/// to [RealtimeDriver] and subscription bookkeeping to [PusherChannelRegistry].
class PusherServiceImpl with Loggable implements PusherService {
  PusherServiceImpl({
    required AppSettings appSettings,
    required BroadcastingApiClient broadcastingApiClient,
    PusherChannelsFlutter? pusherClient,
    RealtimeDriver? driver,
    PusherChannelRegistry? channelRegistry,
  })  : _driver = driver ??
            PusherDriver(
              appSettings: appSettings,
              broadcastingApiClient: broadcastingApiClient,
              pusherClient: pusherClient,
            ),
        _registry = channelRegistry ?? PusherChannelRegistry() {
    _driver.eventStream.listen(_registry.dispatch);
  }

  @override
  String get logTag => 'PusherService';

  final RealtimeDriver _driver;
  final PusherChannelRegistry _registry;
  bool _isDisposed = false;

  /// The selected [RealtimeDriver], exposed for testing.
  @visibleForTesting
  RealtimeDriver get debugDriver => _driver;

  @override
  Stream<PusherConnectionState> get connectionStateStream => _driver.connectionStateStream;

  @override
  PusherConnectionState get currentConnectionState => _driver.currentConnectionState;

  @override
  Future<void> initialize() => _driver.initialize();

  @override
  Future<void> connect() => _driver.connect();

  @override
  Future<void> disconnect() => _driver.disconnect();

  @override
  Future<String?> getSocketId() => _driver.getSocketId();

  @override
  Stream<PusherChannelEvent> watchChannel(
    String channelName, {
    String? eventName,
  }) {
    late StreamController<PusherChannelEvent> controller;
    StreamSubscription<PusherChannelEvent>? subscription;

    controller = StreamController<PusherChannelEvent>.broadcast(
      onListen: () async {
        await subscribe(channelName: channelName);
        subscription = _driver.eventStream.where((event) {
          final matchesChannel = event.channelName == channelName;
          final matchesEvent = eventName == null || event.eventName == eventName;
          return matchesChannel && matchesEvent;
        }).listen(
          controller.add,
          onError: controller.addError,
        );
      },
      onCancel: () async {
        await subscription?.cancel();
        await unsubscribe(channelName: channelName);
      },
    );

    return controller.stream;
  }

  @override
  Future<void> subscribe({
    required String channelName,
    void Function(PusherChannelEvent event)? onEvent,
    void Function(dynamic error)? onSubscriptionError,
    void Function(dynamic data)? onSubscriptionSucceeded,
  }) async {
    final isFirstSubscriber = _registry.addSubscriber(channelName, onEvent);
    if (isFirstSubscriber) {
      await _driver.subscribe(
        channelName: channelName,
        onSubscriptionError: onSubscriptionError,
        onSubscriptionSucceeded: onSubscriptionSucceeded,
      );
    } else {
      onSubscriptionSucceeded?.call(null);
    }
  }

  @override
  Future<void> unsubscribe({required String channelName}) async {
    final shouldUnsubscribeNative = _registry.removeSubscriber(channelName);
    if (shouldUnsubscribeNative) {
      await _driver.unsubscribe(channelName);
    }
  }

  @override
  Stream<PusherChannelEvent> eventStream({
    required String channelName,
    String? eventName,
  }) {
    return _driver.eventStream.where((event) {
      final matchesChannel = event.channelName == channelName;
      final matchesEvent = eventName == null || event.eventName == eventName;
      return matchesChannel && matchesEvent;
    });
  }

  @override
  Future<void> reset() async {
    logInfo('Resetting PusherService: clearing active channels and disconnecting');
    for (final channel in _registry.activeChannels) {
      await _driver.unsubscribe(channel);
    }
    _registry.clear();
    await disconnect();
  }

  @override
  Future<void> dispose() async {
    if (_isDisposed) return;
    _isDisposed = true;
    await reset();
    await _driver.dispose();
  }
}
