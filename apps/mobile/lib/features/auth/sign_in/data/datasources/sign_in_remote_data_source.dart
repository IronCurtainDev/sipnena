import 'package:react_hono_flutter_template/core/auth_core/data/models/models.dart';
import 'package:react_hono_flutter_template/features/auth/sign_in/data/models/login_request.dart';

abstract interface class SignInRemoteDataSource {
  Future<AuthSessionModel> login(LoginRequest params);
}
