import 'package:react_hono_flutter_template/features/auth/forgot_password/data/models/models.dart';

abstract interface class ForgotPasswordRemoteDataSource {
  Future<void> forgotPassword(ForgotPasswordRequestModel request);
}
