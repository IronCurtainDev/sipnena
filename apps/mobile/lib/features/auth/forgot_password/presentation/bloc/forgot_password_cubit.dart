import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:react_hono_flutter_template/features/auth/auth.dart';
import 'package:react_hono_flutter_template/features/auth/forgot_password/presentation/bloc/forgot_password_state.dart';

class ForgotPasswordCubit extends Cubit<ForgotPasswordState> {
  ForgotPasswordCubit({
    required ForgotPasswordUseCase forgotPasswordUseCase,
  })  : _forgotPasswordUseCase = forgotPasswordUseCase,
        super(const ForgotPasswordInitial());

  final ForgotPasswordUseCase _forgotPasswordUseCase;

  Future<void> forgotPassword({
    required String email,
  }) async {
    emit(const ForgotPasswordLoading());

    final result = await _forgotPasswordUseCase(
      ForgotPasswordParams(email: email),
    );

    result.fold(
      onFailure: (failure) => emit(ForgotPasswordFailure(failure.message)),
      onSuccess: (success) => emit(const ForgotPasswordSuccess(success: true)), // You can modify this to emit a more meaningful state if needed
    );
  }
}
