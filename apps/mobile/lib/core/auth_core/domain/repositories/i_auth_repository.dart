import 'package:react_hono_flutter_template/core/auth_core/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/core/core.dart';

/// Abstract repository interface for authentication session operations.
///
/// This defines the contract that data layer must implement.
/// Domain layer only knows about this interface, not the implementation.
abstract interface class IAuthSessionRepository {
  /// Gets the current session from local storage.
  Future<AuthSession?> getStoredSession();

  /// Saves the session to local storage.
  Future<void> saveSession(AuthSession session);

  /// Deletes the stored session.
  Future<void> deleteSession();

  /// Refreshes the session by fetching the latest profile from API.
  /// Returns updated session on success, or failure if session invalid.
  Future<Result<AuthSession>> refreshSession();
}
