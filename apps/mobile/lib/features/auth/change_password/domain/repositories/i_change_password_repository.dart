import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/change_password/domain/entities/entities.dart';

abstract interface class IChangePasswordRepository {
  Future<Result<void>> changePassword(ChangePasswordParams params);
}
