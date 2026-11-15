import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';

part 'change_password_state.dart';

class ChangePasswordCubit extends Cubit<ChangePasswordState> {
  ChangePasswordCubit({
    required ChangePasswordUseCase changePasswordUseCase,
  })  : _changePasswordUseCase = changePasswordUseCase,
        super(const ChangePasswordInitial());

  final ChangePasswordUseCase _changePasswordUseCase;

  Future<void> changePassword({
    required String currentPassword,
    required String newPassword,
    required String newPasswordConfirmation,
    required bool isPasswordValid,
  }) async {
    emit(const ChangePasswordLoading());

    if (currentPassword.isEmpty) {
      emit(const ChangePasswordFailure('Please enter your current password to continue.'));
      return;
    }

    if (newPassword.isEmpty) {
      emit(const ChangePasswordFailure('Please enter a new password.'));
      return;
    }

    if (newPassword == currentPassword) {
      emit(const ChangePasswordFailure('You cannot use your current password as the new password. Please choose a different one.'));
      return;
    }

    if (!isPasswordValid) {
      emit(const ChangePasswordFailure('Please ensure your new password meets all the required security criteria shown above.'));
      return;
    }

    if (newPasswordConfirmation.isEmpty) {
      emit(const ChangePasswordFailure('Please confirm your new password.'));
      return;
    }

    if (newPasswordConfirmation != newPassword) {
      emit(const ChangePasswordFailure('The new password and confirmation password do not match. Please try again.'));
      return;
    }

    final result = await _changePasswordUseCase(
      ChangePasswordParams(
        currentPassword: currentPassword,
        newPassword: newPassword,
        newPasswordConfirmation: newPasswordConfirmation,
      ),
    );

    result.fold(
      onFailure: (failure) => emit(ChangePasswordFailure(failure.message)),
      onSuccess: (_) => emit(const ChangePasswordSuccess()),
    );
  }

  void reset() => emit(const ChangePasswordInitial());
}
