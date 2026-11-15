import 'package:react_hono_flutter_template/features/auth/sign_in/domain/domain.dart';

class LoginRequestModel {
  const LoginRequestModel({
    required this.email,
    required this.password,
    required this.deviceId,
    required this.deviceType,
    this.devicePushToken,
  });

  factory LoginRequestModel.fromEntity(LoginParams params) {
    return LoginRequestModel(
      email: params.email,
      password: params.password,
      deviceId: params.deviceId,
      deviceType: params.deviceType,
      devicePushToken: params.devicePushToken,
    );
  }

  final String email;
  final String password;
  final String deviceId;
  final String deviceType;
  final String? devicePushToken;

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'password': password,
      'device_id': deviceId,
      'device_type': deviceType,
      if (devicePushToken != null) 'device_push_token': devicePushToken,
    };
  }
}

/// Backward compatibility alias
typedef LoginRequest = LoginRequestModel;
