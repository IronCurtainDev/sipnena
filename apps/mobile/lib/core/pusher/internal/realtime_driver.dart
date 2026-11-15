import 'package:react_hono_flutter_template/core/pusher/models/pusher_channel_event.dart';
import 'package:react_hono_flutter_template/core/pusher/models/pusher_connection_state.dart';

/// Transport-neutral contract implemented by both `PusherDriver` (native
/// Pusher Cloud) and `SockudoDriver` (local Sockudo E2E), so
/// `PusherServiceImpl` can select either without changing its own
/// subscription bookkeeping.
abstract interface class RealtimeDriver {
  /// Stream of all incoming channel events across every subscribed channel.
  Stream<PusherChannelEvent> get eventStream;

  /// Stream of connection state updates.
  Stream<PusherConnectionState> get connectionStateStream;

  /// Current connection state.
  PusherConnectionState get currentConnectionState;

  /// Initializes the underlying client instance.
  Future<void> initialize();

  /// Connects to the realtime WebSocket server.
  Future<void> connect();

  /// Disconnects from the realtime WebSocket server.
  Future<void> disconnect();

  /// Subscribes to a native channel.
  Future<void> subscribe({
    required String channelName,
    void Function(dynamic error)? onSubscriptionError,
    void Function(dynamic data)? onSubscriptionSucceeded,
  });

  /// Unsubscribes from a native channel.
  Future<void> unsubscribe(String channelName);

  /// Retrieves the active socket ID.
  Future<String?> getSocketId();

  /// Closes internal stream controllers and releases the underlying client.
  Future<void> dispose();
}
