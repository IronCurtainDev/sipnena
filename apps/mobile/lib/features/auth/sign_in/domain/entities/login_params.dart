import 'package:equatable/equatable.dart';

/// Parameters for user login.
class LoginParams extends Equatable {
  const LoginParams({
    required this.email,
    required this.password,
    required this.deviceId,
    required this.deviceType,
    this.devicePushToken,
  });

  final String email;
  final String password;
  final String deviceId;
  final String deviceType;
  final String? devicePushToken;

  @override
  List<Object?> get props => [email, password, deviceId, deviceType, devicePushToken];
}
