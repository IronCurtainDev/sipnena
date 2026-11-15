import 'dart:async';
import 'dart:convert';

import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/core/pusher/internal/realtime_driver.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Low-level driver isolating all native [PusherChannelsFlutter] plugin interaction.
///
/// Encapsulates platform channels, SDK callbacks, and authorizer HTTP bridge.
class PusherDriver with Loggable implements RealtimeDriver {
  PusherDriver({
    required AppSettings appSettings,
    required BroadcastingApiClient broadcastingApiClient,
    PusherChannelsFlutter? pusherClient,
  })  : _appSettings = appSettings,
        _broadcastingApiClient = broadcastingApiClient,
        _pusher = pusherClient ?? PusherChannelsFlutter.getInstance();

  @override
  String get logTag => 'PusherDriver';

  final AppSettings _appSettings;
  final BroadcastingApiClient _broadcastingApiClient;
  final PusherChannelsFlutter _pusher;

  final StreamController<PusherChannelEvent> _eventController = StreamController<PusherChannelEvent>.broadcast();
  final StreamController<PusherConnectionState> _connectionStateController = StreamController<PusherConnectionState>.broadcast();

  PusherConnectionState _currentConnectionState = PusherConnectionState.disconnected;
  bool _isInitialized = false;

  /// Stream of all incoming channel events.
  @override
  Stream<PusherChannelEvent> get eventStream => _eventController.stream;

  /// Stream of connection state updates.
  @override
  Stream<PusherConnectionState> get connectionStateStream => _connectionStateController.stream;

  /// Current connection state.
  @override
  PusherConnectionState get currentConnectionState => _currentConnectionState;

  /// Initializes the native Pusher client instance.
  @override
  Future<void> initialize() async {
    if (_isInitialized) return;

    final apiKey = _appSettings.pusherAppKey;
    final cluster = _appSettings.pusherCluster;

    if (apiKey.isEmpty) {
      logWarning('Pusher app key is not configured.');
      return;
    }

    try {
      logInfo('Initializing Pusher client ($cluster)');
      await _pusher.init(
        apiKey: apiKey,
        cluster: cluster,
        useTLS: true,
        logToConsole: true,
        onAuthorizer: _handleAuthorizer,
        onConnectionStateChange: _handleConnectionStateChange,
        onError: _handleError,
        onEvent: _handleGlobalEvent,
      );
      _isInitialized = true;
    } on Object catch (e, stackTrace) {
      logError('Error initializing Pusher', e, stackTrace);
    }
  }

  /// Connects to the Pusher WebSocket server.
  @override
  Future<void> connect() async {
    try {
      if (!_isInitialized) await initialize();
      await _pusher.connect();
    } on Object catch (e, stackTrace) {
      logError('Error connecting to Pusher', e, stackTrace);
    }
  }

  /// Disconnects from the Pusher WebSocket server.
  @override
  Future<void> disconnect() async {
    if (!_isInitialized) {
      _handleConnectionStateChange('DISCONNECTED', _currentConnectionState.name);
      return;
    }

    try {
      await _pusher.disconnect();
      _handleConnectionStateChange('DISCONNECTED', _currentConnectionState.name);
    } on Object catch (e, stackTrace) {
      logError('Error disconnecting from Pusher', e, stackTrace);
    }
  }

  /// Subscribes to a native Pusher channel.
  @override
  Future<void> subscribe({
    required String channelName,
    void Function(dynamic error)? onSubscriptionError,
    void Function(dynamic data)? onSubscriptionSucceeded,
  }) async {
    try {
      if (!_isInitialized) await initialize();
      if (!_currentConnectionState.isConnected && !_currentConnectionState.isConnecting) {
        await connect();
      }

      await _pusher.subscribe(
        channelName: channelName,
        onSubscriptionError: (dynamic message, dynamic error) {
          logWarning('Subscription error on $channelName: $message ($error)');
          onSubscriptionError?.call(error ?? message);
        },
        onSubscriptionSucceeded: (dynamic data) {
          logInfo('Subscription succeeded on $channelName');
          onSubscriptionSucceeded?.call(data);
        },
      );
    } on Object catch (e, stackTrace) {
      logError('Error subscribing to $channelName', e, stackTrace);
      onSubscriptionError?.call(e);
    }
  }

  /// Unsubscribes from a native Pusher channel.
  @override
  Future<void> unsubscribe(String channelName) async {
    try {
      await _pusher.unsubscribe(channelName: channelName);
    } on Object catch (e, stackTrace) {
      logError('Error unsubscribing from $channelName', e, stackTrace);
    }
  }

  /// Retrieves the active socket ID.
  @override
  Future<String?> getSocketId() async {
    try {
      return await _pusher.getSocketId();
    } on Object catch (e, stackTrace) {
      logError('Error getting socket ID', e, stackTrace);
      return null;
    }
  }

  /// Closes internal stream controllers.
  @override
  Future<void> dispose() async {
    await disconnect();
    await _eventController.close();
    await _connectionStateController.close();
  }

  Future<dynamic> _handleAuthorizer(
    String channelName,
    String socketId,
    dynamic options,
  ) async {
    try {
      final response = await _broadcastingApiClient.authorizeChannel(
        socketId: socketId,
        channelName: channelName,
      );

      dynamic authData;
      if (response.data is Map<String, dynamic>) {
        authData = response.data;
      } else if (response.data is Map) {
        authData = (response.data as Map).cast<String, dynamic>();
      } else if (response.data is String) {
        final str = (response.data as String).trim();
        if (str.isNotEmpty) {
          try {
            authData = jsonDecode(str);
          } catch (_) {
            logWarning('Failed to decode authorizer response JSON: $str');
          }
        }
      }

      if (authData is Map<String, dynamic>) {
        final authString = authData['auth'];
        if (authString is String && authString.isNotEmpty) {
          return authData;
        }
      }

      logWarning(
        'Channel authorizer ($channelName) returned invalid/empty auth payload from backend. '
        'Returning null to avoid native plugin crash.',
      );
      return null;
    } on Object catch (e, stackTrace) {
      logError('Pusher authorizer failed for channel $channelName', e, stackTrace);
      return null;
    }
  }

  void _handleConnectionStateChange(String currentState, String previousState) {
    final mappedState = PusherConnectionState.fromString(currentState);
    _currentConnectionState = mappedState;
    if (!_connectionStateController.isClosed) {
      _connectionStateController.add(mappedState);
    }
    logInfo('Pusher state: $previousState -> $currentState ($mappedState)');
  }

  void _handleError(String message, int? code, dynamic error) {
    logError('Pusher error: $message (code: $code, error: $error)');
  }

  void _handleGlobalEvent(PusherEvent rawEvent) {
    if (!_eventController.isClosed) {
      _eventController.add(
        PusherChannelEvent(
          channelName: rawEvent.channelName,
          eventName: rawEvent.eventName,
          data: rawEvent.data,
          userId: rawEvent.userId,
        ),
      );
    }
  }
}
