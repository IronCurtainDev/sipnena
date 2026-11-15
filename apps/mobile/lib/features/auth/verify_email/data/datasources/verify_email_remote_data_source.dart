import 'package:react_hono_flutter_template/core/auth_core/data/models/models.dart';
import 'package:react_hono_flutter_template/features/auth/verify_email/data/models/models.dart';

abstract interface class VerifyEmailRemoteDataSource {
  Future<AuthSessionModel> verifyEmail(VerifyEmailRequestModel request);
}
