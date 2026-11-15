import 'package:react_hono_flutter_template/features/auth/verify_email/domain/domain.dart';

class VerifyEmailRequestModel {
  const VerifyEmailRequestModel({required this.code});

  factory VerifyEmailRequestModel.fromEntity(VerifyEmailParams params) {
    return VerifyEmailRequestModel(code: params.code);
  }

  final String code;

  Map<String, dynamic> toJson() {
    return {
      'code': code,
    };
  }
}

/// Backward compatibility alias
typedef VerifyEmailRequest = VerifyEmailRequestModel;
