import 'package:react_hono_flutter_template/core/auth_core/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/domain/entities/entities.dart';

abstract interface class ISignUpRepository {
  Future<Result<AuthSession>> register(RegisterParams params);
}
