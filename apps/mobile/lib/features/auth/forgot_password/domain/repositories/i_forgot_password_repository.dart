import 'package:react_hono_flutter_template/core/core.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/domain/entities/entities.dart';

abstract interface class IForgotPasswordRepository {
  Future<Result<void>> forgotPassword(ForgotPasswordParams params);
}
