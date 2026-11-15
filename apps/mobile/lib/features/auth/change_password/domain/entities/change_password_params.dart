import 'package:equatable/equatable.dart';

/// Parameters for changing a user's password.
class ChangePasswordParams extends Equatable {
  const ChangePasswordParams({
    required this.currentPassword,
    required this.newPassword,
    required this.newPasswordConfirmation,
  });

  final String currentPassword;
  final String newPassword;
  final String newPasswordConfirmation;

  @override
  List<Object?> get props => [currentPassword, newPassword, newPasswordConfirmation];
}
