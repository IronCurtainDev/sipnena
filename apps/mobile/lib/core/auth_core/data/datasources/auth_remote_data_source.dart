import 'package:react_hono_flutter_template/core/auth_core/data/models/models.dart';

/// Remote data source for authentication session operations.
abstract interface class AuthSessionRemoteDataSource {
  /// Logs out the current user.

  /// Fetches the current user's profile.
  Future<AuthSessionModel> getProfile();
}
