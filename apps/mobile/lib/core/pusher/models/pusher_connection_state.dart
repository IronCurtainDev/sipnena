/// Represents the connection states of the Pusher client.
enum PusherConnectionState {
  initial,
  connecting,
  connected,
  disconnecting,
  disconnected,
  reconnecting,
  failed;

  /// Whether the client is currently connected.
  bool get isConnected => this == PusherConnectionState.connected;

  /// Whether the client is currently establishing a connection.
  bool get isConnecting => this == PusherConnectionState.connecting || this == PusherConnectionState.reconnecting;

  /// Whether the client is disconnected or in a failed state.
  bool get isDisconnected => this == PusherConnectionState.disconnected || this == PusherConnectionState.failed;

  /// Parses a string representation into a [PusherConnectionState].
  static PusherConnectionState fromString(String state) {
    switch (state.toUpperCase()) {
      case 'INITIALIZED':
        return PusherConnectionState.initial;
      case 'CONNECTED':
        return PusherConnectionState.connected;
      case 'CONNECTING':
        return PusherConnectionState.connecting;
      case 'DISCONNECTING':
        return PusherConnectionState.disconnecting;
      case 'DISCONNECTED':
        return PusherConnectionState.disconnected;
      case 'RECONNECTING':
      case 'UNAVAILABLE':
        return PusherConnectionState.reconnecting;
      case 'FAILED':
        return PusherConnectionState.failed;
      default:
        return PusherConnectionState.disconnected;
    }
  }
}
