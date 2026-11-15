import 'package:react_hono_flutter_template/core/auth_core/data/models/models.dart';
import 'package:react_hono_flutter_template/features/auth/sign_up/data/models/register_request.dart';

abstract interface class SignUpRemoteDataSource {
  Future<AuthSessionModel> register(RegisterRequest params);
}
