import 'package:react_hono_flutter_template/core/core.dart';

abstract interface class IUserRepository {
  Future<Result<UserProfile>> getUserProfile();
}
