import 'package:react_hono_flutter_template/core/core.dart';

abstract interface class IVerifyResendRepository {
  Future<Result<void>> resendVerificationCode();
}
