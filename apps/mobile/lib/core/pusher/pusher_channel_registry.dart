import 'package:react_hono_flutter_template/core/pusher/models/pusher_channel_event.dart';
import 'package:react_hono_flutter_template/utils/utils.dart';

/// Manages channel subscriptions, listener counts, and callback routing.
///
/// Ensures thread-safe reference counting so multiple subscribers can listen
/// to the same channel without duplicating native subscriptions or prematurely
/// severing active connections.
class PusherChannelRegistry with Loggable {
  @override
  String get logTag => 'PusherChannelRegistry';

  final Map<String, int> _subscriberCounts = {};
  final Map<String, Set<void Function(PusherChannelEvent)>> _callbacks = {};

  /// Registers a subscriber for [channelName] and optional [onEvent] callback.
  ///
  /// Returns `true` if this is the first subscriber (meaning native subscription
  /// is required at the plugin level).
  bool addSubscriber(
    String channelName, [
    void Function(PusherChannelEvent event)? onEvent,
  ]) {
    if (onEvent != null) {
      _callbacks.putIfAbsent(channelName, () => <void Function(PusherChannelEvent)>{}).add(onEvent);
    }
    final count = _subscriberCounts[channelName] ?? 0;
    _subscriberCounts[channelName] = count + 1;
    return count == 0;
  }

  /// Removes a subscriber for [channelName].
  ///
  /// Returns `true` if no subscribers remain (meaning native unsubscription
  /// is required at the plugin level).
  bool removeSubscriber(String channelName) {
    final count = _subscriberCounts[channelName] ?? 0;
    if (count <= 1) {
      _subscriberCounts.remove(channelName);
      _callbacks.remove(channelName);
      return true;
    }
    _subscriberCounts[channelName] = count - 1;
    return false;
  }

  /// Dispatches an incoming [event] to all registered callbacks for its channel.
  void dispatch(PusherChannelEvent event) {
    final callbacks = _callbacks[event.channelName];
    if (callbacks == null || callbacks.isEmpty) return;

    for (final callback in List.of(callbacks)) {
      try {
        callback(event);
      } catch (e, stackTrace) {
        logError('Error invoking channel callback for ${event.channelName}', e, stackTrace);
      }
    }
  }

  /// Returns the current active subscriber count for [channelName].
  int subscriberCount(String channelName) => _subscriberCounts[channelName] ?? 0;

  /// Returns a snapshot of all currently active channel names.
  List<String> get activeChannels => List<String>.unmodifiable(_subscriberCounts.keys);

  /// Clears all channel counts and callback registrations.
  void clear() {
    _subscriberCounts.clear();
    _callbacks.clear();
  }
}
