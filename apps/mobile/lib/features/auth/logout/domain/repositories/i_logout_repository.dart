import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/logout/domain/entities/entities.dart';

abstract interface class ILogoutRepository {
  Future<Result<void>> logout(LogoutParams params);
}
