import 'package:react_hono_flutter_template/core/auth_core/domain/entities/entities.dart';
import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/domain/entities/entities.dart';

abstract interface class ISignInRepository {
  Future<Result<AuthSession>> login(LoginParams params);
}
