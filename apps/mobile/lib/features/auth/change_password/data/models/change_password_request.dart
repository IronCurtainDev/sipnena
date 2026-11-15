import 'package:react_hono_flutter_template/features/auth/change_password/domain/domain.dart';

class ChangePasswordRequestModel {
  const ChangePasswordRequestModel({
    required this.currentPassword,
    required this.newPassword,
    required this.newPasswordConfirmation,
  });

  factory ChangePasswordRequestModel.fromEntity(ChangePasswordParams params) {
    return ChangePasswordRequestModel(
      currentPassword: params.currentPassword,
      newPassword: params.newPassword,
      newPasswordConfirmation: params.newPasswordConfirmation,
    );
  }

  final String currentPassword;
  final String newPassword;
  final String newPasswordConfirmation;

  Map<String, dynamic> toJson() {
    return {
      'current_password': currentPassword,
      'new_password': newPassword,
      'new_password_confirmation': newPasswordConfirmation,
    };
  }
}

/// Backward compatibility alias
typedef ChangePasswordRequest = ChangePasswordRequestModel;
