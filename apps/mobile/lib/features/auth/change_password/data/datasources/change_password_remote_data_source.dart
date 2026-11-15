import 'package:react_hono_flutter_template/features/auth/change_password/data/models/change_password_request.dart';

abstract interface class ChangePasswordRemoteDataSource {
  Future<void> changePassword(ChangePasswordRequest request);
}
