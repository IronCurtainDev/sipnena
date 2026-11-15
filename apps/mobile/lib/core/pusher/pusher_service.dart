import 'package:react_hono_flutter_template/core/pusher/models/pusher_channel_event.dart';
import 'package:react_hono_flutter_template/core/pusher/models/pusher_connection_state.dart';

/// Contract interface for real-time WebSocket communication.
abstract interface class PusherService {
  /// Initializes the Pusher client instance.
  Future<void> initialize();

  /// Connects to the real-time WebSocket server.
  Future<void> connect();

  /// Disconnects from the real-time WebSocket server.
  Future<void> disconnect();

  /// Returns a self-managing stream for [channelName] and optional [eventName].
  ///
  /// Automatically subscribes to the channel upon first listener and
  /// automatically unsubscribes when all listeners cancel.
  Stream<PusherChannelEvent> watchChannel(
    String channelName, {
    String? eventName,
  });

  /// Broadcast stream of connection state updates.
  Stream<PusherConnectionState> get connectionStateStream;

  /// Current connection state.
  PusherConnectionState get currentConnectionState;

  /// Retrieves the active socket ID.
  Future<String?> getSocketId();

  /// Disconnects and clears all active channel subscriptions.
  Future<void> reset();

  /// Disposes resources.
  Future<void> dispose();

  /// Legacy manual subscribe method.
  Future<void> subscribe({
    required String channelName,
    void Function(PusherChannelEvent event)? onEvent,
    void Function(dynamic error)? onSubscriptionError,
    void Function(dynamic data)? onSubscriptionSucceeded,
  });

  /// Legacy manual unsubscribe method.
  Future<void> unsubscribe({required String channelName});

  /// Legacy event stream method.
  Stream<PusherChannelEvent> eventStream({
    required String channelName,
    String? eventName,
  });
}
