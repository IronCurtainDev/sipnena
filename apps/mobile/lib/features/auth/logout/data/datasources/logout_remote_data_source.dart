import 'package:react_hono_flutter_template/features/auth/logout/data/models/logout_request_model.dart';

abstract interface class LogoutRemoteDataSource {
  Future<void> logout(LogoutRequestModel request);
}
