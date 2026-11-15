import 'package:react_hono_flutter_template/features/auth/forgot_password/domain/domain.dart';

class ForgotPasswordRequestModel {
  const ForgotPasswordRequestModel({required this.email});

  factory ForgotPasswordRequestModel.fromEntity(ForgotPasswordParams params) {
    return ForgotPasswordRequestModel(email: params.email);
  }

  final String email;

  Map<String, dynamic> toJson() {
    return {
      'email': email,
    };
  }
}

/// Backward compatibility alias
typedef ForgotPasswordRequest = ForgotPasswordRequestModel;
